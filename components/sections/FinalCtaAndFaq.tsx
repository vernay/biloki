'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

const localeContent = {
  fr: {
    ctaTitle: 'Prêt à simplifier votre gestion ?',
    ctaButton: 'Essayez maintenant',
    ctaNote: 'Essai gratuit de 30 jours, sans carte de crédit !',
    faqTitle: 'Vous avez des questions ?',
    faqItems: [
      {
        q: 'Biloki est-il adapté à ma gestion ?',
        a: 'Oui. Biloki est conçu pour les gestionnaires, propriétaires, conciergeries et petites équipes qui veulent centraliser réservations, calendriers, messages et opérations sans multiplier les outils.',
      },
      {
        q: 'Puis-je tester gratuitement ?',
        a: 'Oui. Vous pouvez commencer un essai gratuit de 30 jours sans carte bancaire. Une fois inscrit, vous accédez à l’ensemble de la plateforme pour évaluer le produit en conditions réelles.',
      },
      {
        q: 'Biloki se connecte-t-il à mes plateformes ?',
        a: 'Oui. Biloki s’intègre avec les principales OTA et outils du marché pour synchroniser vos disponibilités, réservations et messages depuis un seul tableau de bord.',
      },
      {
        q: 'La migration est-elle compliquée ?',
        a: 'Pas avec Biloki. Notre équipe vous accompagne pour revoir votre configuration, importer vos données et vous aider à démarrer rapidement avec un workflow simple et robuste.',
      },
      {
        q: 'Quel est le support disponible ?',
        a: 'Vous bénéficiez d’un accompagnement dédié, d’une onboarding clair, et d’une équipe à l’écoute pour vous aider à configurer, utiliser et optimiser votre gestion au quotidien.',
      },
    ],
  },
  en: {
    ctaTitle: 'Ready to simplify your management?',
    ctaButton: 'Try it now',
    ctaNote: '14-day free trial, no credit card required!',
    faqTitle: 'Do you have questions?',
    faqItems: [
      {
        q: 'Is Biloki suitable for my management?',
        a: 'Yes. Biloki is designed for managers, owners, concierge teams, and small businesses that need to centralize bookings, calendars, messages, and operations without multiplying tools.',
      },
      {
        q: 'Can I try it for free?',
        a: 'Yes. You can start a 14-day free trial with no credit card required. You get access to the full platform to evaluate it in real conditions.',
      },
      {
        q: 'Does Biloki connect to my channels?',
        a: 'Yes. Biloki integrates with major OTAs and market tools to sync availability, bookings, and guest messages from a single dashboard.',
      },
      {
        q: 'Is migration complicated?',
        a: 'Not with Biloki. Our team helps you review your setup, import your data, and get started quickly with a simple and reliable workflow.',
      },
      {
        q: 'What support is available?',
        a: 'You get onboarding guidance, expert support, and help to configure, adopt, and optimize your daily operations.',
      },
    ],
  },
  es: {
    ctaTitle: '¿Listo para simplificar tu gestión?',
    ctaButton: 'Pruébalo ahora',
    ctaNote: 'Prueba gratuita de 14 días, ¡sin tarjeta de crédito!',
    faqTitle: '¿Tienes preguntas?',
    faqItems: [
      {
        q: '¿Biloki es adecuado para mi gestión?',
        a: 'Sí. Biloki está pensado para gestores, propietarios, equipos de gestión y pequeñas empresas que quieren centralizar reservas, calendarios, mensajes y operaciones sin multiplicar herramientas.',
      },
      {
        q: '¿Puedo probarlo gratis?',
        a: 'Sí. Puedes iniciar una prueba gratuita de 14 días sin tarjeta bancaria. Tendrás acceso a la plataforma completa para evaluarla en condiciones reales.',
      },
      {
        q: '¿Biloki se conecta con mis canales?',
        a: 'Sí. Biloki se integra con las principales OTA y herramientas del mercado para sincronizar disponibilidad, reservas y mensajes desde un único panel.',
      },
      {
        q: '¿La migración es complicada?',
        a: 'No con Biloki. Nuestro equipo te acompaña para revisar tu configuración, importar datos y empezar rápidamente con un flujo sencillo y fiable.',
      },
      {
        q: '¿Qué tipo de soporte ofrecen?',
        a: 'Recibirás acompañamiento de onboarding, ayuda en la configuración y un equipo atento para optimizar tu gestión diaria.',
      },
    ],
  },
  pt: {
    ctaTitle: 'Pronto para simplificar sua gestão?',
    ctaButton: 'Teste agora',
    ctaNote: 'Teste gratuito de 14 dias, sem cartão de crédito!',
    faqTitle: 'Tem dúvidas?',
    faqItems: [
      {
        q: 'O Biloki é adequado para a minha gestão?',
        a: 'Sim. O Biloki foi pensado para gestores, proprietários, equipes de concierge e pequenas empresas que querem centralizar reservas, calendários, mensagens e operações sem multiplicar ferramentas.',
      },
      {
        q: 'Posso testar gratuitamente?',
        a: 'Sim. Você pode começar um teste gratuito de 14 dias sem cartão de crédito. Acesso completo à plataforma para avaliar o produto em condições reais.',
      },
      {
        q: 'O Biloki se conecta às minhas plataformas?',
        a: 'Sim. O Biloki integra as principais OTA e ferramentas do mercado para sincronizar disponibilidade, reservas e mensagens em um único painel.',
      },
      {
        q: 'A migração é complicada?',
        a: 'Não com o Biloki. Nossa equipe acompanha a revisão da sua configuração, a importação dos dados e a sua entrada em operação com um fluxo simples e confiável.',
      },
      {
        q: 'Qual suporte está disponível?',
        a: 'Você conta com orientação de onboarding, suporte na configuração e uma equipe atenta para otimizar a sua gestão diária.',
      },
    ],
  },
} as const;

export default function FinalCtaAndFaq() {
  const locale = useLocale();
  const content = localeContent[locale as keyof typeof localeContent] ?? localeContent.fr;

  return (
    <section className="px-4 pb-16 pt-8 md:px-8 md:pb-20 md:pt-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="rounded-[2rem] bg-[#01A4FF] px-6 py-12 text-center text-white shadow-[0_24px_70px_rgba(1,164,255,0.2)] md:px-10 md:py-16">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-[-0.04em] md:text-5xl">
            {content.ctaTitle}
          </h2>

          <div className="mt-8 flex justify-center">
            <Link
              href={`/${locale}/reserver-demo`}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-[#01A4FF] shadow-sm transition hover:scale-[1.01] hover:bg-slate-50"
            >
              {content.ctaButton}
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/90 md:text-base">{content.ctaNote}</p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <h3 className="text-center text-3xl font-bold tracking-[-0.04em] text-slate-900 md:text-4xl">
            {content.faqTitle}
          </h3>

          <div className="mt-8 space-y-4">
            {content.faqItems.map((item, index) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md md:p-5"
                open={index === 0}
              >
                <summary className="cursor-pointer list-none text-left text-base font-semibold text-slate-900 md:text-lg">
                  <span className="flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-600 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 pr-8 text-sm leading-relaxed text-slate-600 md:text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
