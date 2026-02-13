'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { locales, type Locale } from '@/lib/i18n/config';

export default function ChannelManagerPage() {
  const t = useTranslations('featuresPages.channelManager');
  const pathname = usePathname();
  const pathLocale = pathname.split('/')[1] as Locale;
  const locale = locales.includes(pathLocale) ? pathLocale : 'fr';

  const withLocale = (href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return href;
    }
    if (href === '/') {
      return `/${locale}`;
    }
    if (href.startsWith(`/${locale}/`) || href === `/${locale}`) {
      return href;
    }
    return `/${locale}${href}`;
  };

  const bullets = t.raw('hero.bullets') as string[];
  const stats = t.raw('hero.stats') as { value: string; label: string }[];
  const steps = t.raw('sections.steps.items') as { title: string; description: string }[];
  const faqItems = t.raw('faq.items') as { q: string; a: string }[];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };


  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="pt-20 md:pt-28 pb-12 md:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-4">
                {t('hero.kicker')}
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                {(() => {
                  const title = t('hero.title');
                  const words = title.trim().split(/\s+/);
                  if (words.length < 2) {
                    return title;
                  }
                  const splitIndex = Math.ceil(words.length / 2);
                  const first = words.slice(0, splitIndex).join(' ');
                  const second = words.slice(splitIndex).join(' ');
                  return (
                    <>
                      <span className="text-gray-900">{first}</span>{' '}
                      <span className="text-primary">{second}</span>
                    </>
                  );
                })()}
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                {t('hero.description')}
              </p>

              <div className="grid gap-4">
                {bullets.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-2xl bg-white/80 border border-[var(--biloki-blue)] px-5 py-4 shadow-sm">
                    <span className="mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-gray-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={withLocale('/reserver-demo')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-white font-semibold hover:opacity-90 transition"
                >
                  {t('hero.ctaPrimary')}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href={withLocale('/commencer-gratuitement')}
                  className="inline-flex items-center justify-center rounded-xl border border-primary px-6 py-3 text-primary font-semibold hover:bg-blue-50 transition"
                >
                  {t('hero.ctaSecondary')}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[32px] bg-white/80 p-8 shadow-2xl">
                <div className="aspect-[4/3] rounded-3xl border border-[var(--biloki-blue)] bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/Calendrier.png"
                    alt={t('sections.placeholders.heroVisual')}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="rounded-2xl border border-[var(--biloki-blue)] bg-blue-50/60 px-4 py-3">
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-xs uppercase tracking-wide text-primary/80">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / logos */}
      <section className="px-4 sm:px-6 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto rounded-[32px] border border-[var(--biloki-blue)] bg-white/70 p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('sections.trusted.title')}</h2>
              <p className="text-gray-600 max-w-xl">{t('sections.trusted.description')}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-[360px]">
              {[
                { src: '/images/logo-partenaires/Airbnb.webp', alt: 'Airbnb' },
                { src: '/images/logo-partenaires/Booking.com.png', alt: 'Booking.com' },
                { src: '/images/logo-partenaires/vrbo.png', alt: 'Vrbo' },
                { src: '/images/logo-partenaires/Expedia.png', alt: 'Expedia' },
              ].map((logo) => (
                <div key={logo.alt} className="rounded-2xl border border-[var(--biloki-blue)] bg-white py-6 flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-10 w-28 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="px-4 sm:px-6 pb-12 md:pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="rounded-[32px] border border-[var(--biloki-blue)] bg-white/70 p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('sections.why.title')}</h2>
            <p className="text-gray-600 mb-6">{t('sections.why.description')}</p>
            <div className="space-y-4">
              {(t.raw('sections.why.points') as string[]).map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="h-5 w-5 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-[var(--biloki-blue)] bg-white p-8 shadow-lg flex items-center justify-center">
            <img
              src="/images/PMS.png"
              alt={t('sections.placeholders.screenshot')}
              className="h-full w-full max-h-[420px] object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            {t('sections.steps.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <>
                    <div className="hidden md:flex absolute -right-7 top-1/2 -translate-y-1/2 items-center" aria-hidden="true">
                      <svg className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 6l6 6-6 6" />
                      </svg>
                    </div>
                    <div className="md:hidden absolute left-1/2 -bottom-6 -translate-x-1/2 flex flex-col items-center" aria-hidden="true">
                      <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 13l6 6 6-6" />
                      </svg>
                    </div>
                  </>
                )}
                <div className="rounded-[28px] border border-[var(--biloki-blue)] bg-white/95 p-7 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.6)] h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                      {t('sections.steps.stepLabel', { number: index + 1 })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
            {t('faq.title')}
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="rounded-2xl border border-[var(--biloki-blue)] bg-white shadow-sm">
                <button
                  type="button"
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                  aria-expanded={openFaqIndex === index}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-900">{item.q}</span>
                  <svg
                    className={`h-5 w-5 text-primary transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openFaqIndex === index ? (
                  <div className="px-6 pb-5 text-gray-600">
                    {item.a}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={withLocale('/fonctionnalites/channel-manager/airbnb')}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-primary font-semibold shadow-sm transition hover:bg-primary/10 hover:-translate-y-0.5"
            >
              Connexion Airbnb
              <span aria-hidden="true">{'>'}</span>
            </Link>
            <Link
              href={withLocale('/fonctionnalites/channel-manager/booking')}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-primary font-semibold shadow-sm transition hover:bg-primary/10 hover:-translate-y-0.5"
            >
              Connexion Booking
              <span aria-hidden="true">{'>'}</span>
            </Link>
            <Link
              href={withLocale('/fonctionnalites/channel-manager/calendriers')}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-primary font-semibold shadow-sm transition hover:bg-primary/10 hover:-translate-y-0.5"
            >
              Synchroniser vos calendriers
              <span aria-hidden="true">{'>'}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
