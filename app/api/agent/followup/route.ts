import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { IMPORTANT_URLS } from '@/lib/ai-agent-config';
import { RESEND_FROM_EMAIL } from '@/lib/config';
import { listDueFollowups, markFollowupSent } from '@/lib/agent/lead-store';

const SUPPORTED_LOCALES = ['fr', 'en', 'es', 'pt'] as const;

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

type FollowupCopy = {
  subject: string;
  title: string;
  body: string;
  ctaDemo: string;
  ctaPricing: string;
};

function addLocaleToUrl(url: string, locale: SupportedLocale): string {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  const normalized = url.startsWith('/') ? url : `/${url}`;
  return `/${locale}${normalized}`;
}

function getCopy(locale: SupportedLocale): FollowupCopy {
  const copy: Record<SupportedLocale, FollowupCopy> = {
    fr: {
      subject: 'On peut vous aider à finaliser ? ',
      title: 'Votre demande Biloki',
      body: 'Je reviens vers vous suite à votre échange sur notre site. Souhaitez-vous qu’on avance sur votre besoin ? Vous pouvez réserver une démo ou consulter les tarifs en un clic.',
      ctaDemo: 'Réserver une démo',
      ctaPricing: 'Voir les tarifs',
    },
    en: {
      subject: 'Can we help you finalize?',
      title: 'Your Biloki request',
      body: 'Following up on your chat on our website. Would you like to move forward? You can book a demo or review pricing in one click.',
      ctaDemo: 'Book a demo',
      ctaPricing: 'See pricing',
    },
    es: {
      subject: '¿Te ayudamos a finalizar?',
      title: 'Tu solicitud Biloki',
      body: 'Seguimos tu conversación en nuestro sitio. ¿Quieres avanzar? Puedes reservar una demo o ver precios en un clic.',
      ctaDemo: 'Reservar una demo',
      ctaPricing: 'Ver precios',
    },
    pt: {
      subject: 'Podemos ajudar a finalizar?',
      title: 'Seu pedido Biloki',
      body: 'Voltando ao seu chat no nosso site. Quer avançar? Você pode agendar uma demo ou ver preços em um clique.',
      ctaDemo: 'Agendar demo',
      ctaPricing: 'Ver preços',
    },
  };
  return copy[locale];
}

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.CRON_SECRET;
    const auth = request.headers.get('authorization');
    if (secret && auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY manquante' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const due = await listDueFollowups();

    let sent = 0;
    const errors: Array<{ sessionId: string; error: string }> = [];

    for (const lead of due) {
      const locale = (SUPPORTED_LOCALES.includes(lead.locale as SupportedLocale)
        ? lead.locale
        : 'fr') as SupportedLocale;

      const copy = getCopy(locale);
      const demoUrl = addLocaleToUrl(IMPORTANT_URLS.demo, locale);
      const pricingUrl = addLocaleToUrl(IMPORTANT_URLS.pricing, locale);

      try {
        const html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
            <h2 style="margin: 0 0 12px;">${copy.title}</h2>
            <p style="margin: 0 0 16px;">${copy.body}</p>
            <p style="margin: 0 0 16px;">
              <a href="${demoUrl}" style="display: inline-block; margin-right: 8px; padding: 10px 16px; background: #0ea5e9; color: #fff; text-decoration: none; border-radius: 8px;">${copy.ctaDemo}</a>
              <a href="${pricingUrl}" style="display: inline-block; padding: 10px 16px; background: #f3f4f6; color: #111; text-decoration: none; border-radius: 8px;">${copy.ctaPricing}</a>
            </p>
          </div>
        `;

        const result = await resend.emails.send({
          from: RESEND_FROM_EMAIL,
          to: lead.lead.email as string,
          subject: copy.subject,
          html,
        });

        if (result.error) {
          errors.push({ sessionId: lead.sessionId, error: String(result.error) });
          continue;
        }

        await markFollowupSent(lead.sessionId);
        sent += 1;
      } catch (err) {
        errors.push({ sessionId: lead.sessionId, error: String(err) });
      }
    }

    return NextResponse.json({ sent, errors, totalDue: due.length });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur interne du serveur', details: String(error) },
      { status: 500 }
    );
  }
}
