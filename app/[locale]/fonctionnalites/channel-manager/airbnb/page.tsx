'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n/config';
import { getPrimaryColor, getPrimaryDarkColor } from '@/lib/design-config';

export default function AirbnbConnectionPage() {
  const t = useTranslations('featuresPages.airbnb');
  const common = useTranslations('common');
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

  const bulletKeys = ['sync', 'rates', 'avoid'] as const;
  const benefitKeys = ['sync', 'rates', 'visibility', 'control'] as const;
  const benefitTones = [
    'bg-gradient-to-br from-[#ffe4e6] to-[#fff7ed]',
    'bg-gradient-to-br from-[#e0f2fe] to-[#ecfeff]',
    'bg-gradient-to-br from-[#dcfce7] to-[#f0fdf4]',
    'bg-gradient-to-br from-[#ede9fe] to-[#f5f3ff]',
  ];
  const stepKeys = ['connect', 'import', 'sync'] as const;
  const statKeys = ['setup', 'updates', 'channels'] as const;
  const faqKeys = ['setup', 'sync', 'requirements', 'support'] as const;

  const stats = statKeys.map((key) => ({
    value: t(`stats.items.${key}.value`),
    label: t(`stats.items.${key}.label`),
  }));

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-[#e7f2ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">
                {t('hero.kicker')}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-4">
                {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
              </h1>
              <p className="text-xl text-gray-600 mt-5 max-w-2xl">
                {t('description')}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={withLocale('/reserver-demo')}
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-white font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition"
                >
                  {t('hero.ctaPrimary')}
                </Link>
                <Link
                  href={withLocale('/commencer-gratuitement')}
                  className="inline-flex items-center justify-center rounded-xl border border-primary px-6 py-3 text-primary font-semibold hover:bg-blue-50 transition"
                >
                  {t('hero.ctaSecondary')}
                </Link>
              </div>
              <div className="mt-8 grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                {bulletKeys.map((key) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    <span>{t(`hero.bullets.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[32px] bg-white/80 p-6 shadow-2xl border border-white/60">
                <div className="rounded-3xl border border-[var(--biloki-blue)] bg-white overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#f7fbff] to-white">
                    <Image
                      src="/images/logo-partenaires/Airbnb.webp"
                      alt="Airbnb"
                      width={200}
                      height={200}
                      quality={100}
                      className="h-7 w-auto object-contain"
                      priority
                    />
                    <span className="text-xs font-semibold text-primary">{t('hero.badge')}</span>
                  </div>
                  <div className="aspect-[4/3] bg-white flex items-center justify-center">
                    <img
                      src="/images/connexions-ota/Biloki-Airbnb.svg"
                      alt={t('sections.trust.visual')}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-[var(--biloki-blue)] bg-blue-50/60 px-4 py-3 text-center">
                      <p className="text-lg font-bold text-primary">{stat.value}</p>
                      <p className="text-[11px] uppercase tracking-wide text-primary/80">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="mb-16 md:mb-20 rounded-[36px] bg-primary px-6 sm:px-8 py-8 md:p-12 relative overflow-hidden">
          <Image
            src="/images/logo-partenaires/Airbnb.webp"
            alt="Airbnb"
            width={200}
            height={200}
            quality={100}
            className="absolute right-8 top-4 h-16 w-auto opacity-90 hidden md:block object-contain"
            loading="lazy"
            decoding="async"
          />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {t('benefits.title')}
              </h2>
              <p className="text-lg text-white/80 max-w-2xl">
                {t('benefits.subtitle')}
              </p>
            </div>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {benefitKeys.map((key, index) => (
              <div
                key={key}
                className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/95 p-7 shadow-[0_24px_50px_-40px_rgba(15,23,42,0.6)] transition hover:-translate-y-1"
              >
                <div className="absolute -left-8 bottom-0 h-16 w-16 rounded-full bg-primary/10" aria-hidden="true" />
                <div className="h-1.5 w-10 rounded-full bg-primary/80 mb-4" />
                <h3 className="text-xl font-bold italic text-primary mb-2">
                  {t(`benefits.items.${key}.title`)}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t(`benefits.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {t('steps.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {stepKeys.map((key, index) => (
              <div key={key} className="rounded-3xl border border-[#e3eef9] bg-[#f8fbff] p-7">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {t('steps.stepLabel', { number: index + 1 })}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">
                  {t(`steps.items.${key}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`steps.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 rounded-[32px] border border-[#e3eef9] bg-white p-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('sections.highlight.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('sections.highlight.description')}
              </p>
              <Link
                href={withLocale('/reserver-demo')}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                {common('bookDemo')}
                <span aria-hidden="true">{'>'}</span>
              </Link>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-[#f8fbff] to-[#e9f5ff] p-8 border border-[#e3eef9]">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                {t('sections.highlight.badge')}
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-4">
                {t('sections.highlight.quote')}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            {t('faq.title')}
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqKeys.map((key) => (
              <details key={key} className="rounded-2xl border border-[#e3eef9] bg-white p-6 group">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{t(`faq.items.${key}.question`)}</span>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {t(`faq.items.${key}.answer`)}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-8 sm:p-12 text-white text-center bg-primary">
          <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href={withLocale('/reserver-demo')}
              className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              {common('bookDemo')}
            </Link>
            <Link
              href={withLocale('/commencer-gratuitement')}
              className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              {common('startFreeTrial')}
            </Link>
          </div>
        </div>

        <div className="pt-10 pb-6 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={withLocale('/fonctionnalites/channel-manager')}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-primary font-semibold shadow-sm transition hover:bg-primary/10 hover:-translate-y-0.5"
            >
              {t('links.channelManager')}
              <span aria-hidden="true">{'>'}</span>
            </Link>
            <Link
              href={withLocale('/fonctionnalites/channel-manager/booking')}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-primary font-semibold shadow-sm transition hover:bg-primary/10 hover:-translate-y-0.5"
            >
              {t('links.booking')}
              <span aria-hidden="true">{'>'}</span>
            </Link>
            <Link
              href={withLocale('/fonctionnalites/channel-manager/calendriers')}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-primary font-semibold shadow-sm transition hover:bg-primary/10 hover:-translate-y-0.5"
            >
              {t('links.calendars')}
              <span aria-hidden="true">{'>'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
