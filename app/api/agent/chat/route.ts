import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SUPPORTED_LOCALES = ['fr', 'en', 'es', 'pt'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function detectLocale(locale?: string): SupportedLocale {
  if (typeof locale === 'string' && SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    return locale as SupportedLocale;
  }
  return 'fr';
}

function buildFallbackActions(locale: SupportedLocale) {
  const labels = {
    fr: {
      demo: 'Réserver une démo',
      pricing: 'Voir les tarifs',
      contact: 'Nous contacter',
    },
    en: {
      demo: 'Book a demo',
      pricing: 'See pricing',
      contact: 'Contact us',
    },
    es: {
      demo: 'Reservar una demo',
      pricing: 'Ver precios',
      contact: 'Contactarnos',
    },
    pt: {
      demo: 'Agendar demo',
      pricing: 'Ver preços',
      contact: 'Fale conosco',
    },
  }[locale];

  return [
    { label: labels.demo, url: `/${locale}/reserver-demo`, type: 'primary' as const },
    { label: labels.pricing, url: `/${locale}/tarifs`, type: 'secondary' as const },
  ];
}

function normalizeReply(text: string) {
  return text
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/\bwww\.[^\s]+/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    if (!message) {
      return NextResponse.json({ error: 'Message manquant' }, { status: 400 });
    }

    const locale = detectLocale(typeof body?.locale === 'string' ? body.locale : undefined);
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        error: 'OPENAI_API_KEY manquante',
        reply: 'Le service de chat est temporairement indisponible. Réessayez plus tard.',
        lead: {},
        actions: buildFallbackActions(locale),
      }, { status: 500 });
    }

    const systemPrompt = `Tu es le conseiller commercial de Biloki. Réponds en français, concis et orienté conversion. N'invente pas de fonctionnalité. Si tu ne sais pas, dis-le simplement et propose une démo ou un contact.`;
    const userPrompt = `Locale: ${locale}\n\nMessage utilisateur: ${message}`;

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        input: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
        max_output_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      return NextResponse.json({
        error: 'Erreur OpenAI',
        details: errorBody || 'OpenAI request failed',
        reply: 'Le service de chat est temporairement indisponible. Réessayez plus tard.',
        lead: {},
        actions: buildFallbackActions(locale),
      }, { status: 500 });
    }

    const data = await response.json();
    const outputText =
      typeof data?.output_text === 'string' && data.output_text.trim()
        ? data.output_text
        : data?.output?.[0]?.content?.[0]?.text || '{}';

    let parsed: { reply?: string; lead?: Record<string, unknown>; actions?: Array<{ label: string; url: string; type?: 'primary' | 'secondary' }> } = {};
    try {
      parsed = JSON.parse(outputText);
    } catch {
      parsed = { reply: outputText };
    }

    const reply = normalizeReply(parsed.reply || 'Je peux vous aider à découvrir Biloki.');

    return NextResponse.json({
      reply,
      lead: parsed.lead || {},
      actions: parsed.actions?.length ? parsed.actions : buildFallbackActions(locale),
    });
  } catch (error) {
    console.error('Erreur API agent chat:', error);
    return NextResponse.json({
      error: 'Erreur interne du serveur',
      reply: 'Le service de chat est temporairement indisponible. Réessayez plus tard.',
      lead: {},
      actions: buildFallbackActions('fr'),
    }, { status: 500 });
  }
}
