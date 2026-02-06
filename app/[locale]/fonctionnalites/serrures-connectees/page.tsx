'use client';

import { useTranslations } from 'next-intl';
import SmartLockWizard from '@/components/sections/SmartLockWizard';
import { SMART_LOCK_PARTNERS, SMART_LOCK_HERO_IMAGE } from '@/lib/locks-config';

export default function SmartLocksPage() {
  const t = useTranslations('smartLocksPage');
  const common = useTranslations('common');

  const partners = SMART_LOCK_PARTNERS.map((partner) => ({
    ...partner,
    name: t(`partners.items.${partner.key}`),
  }));

  const needs = t.raw('needs.items') as Array<{
    title: string;
    description: string;
    icon: 'access' | 'mobile' | 'automation' | 'security' | 'multi' | 'install';
  }>;

  const heroBullets = t.raw('heroBullets') as string[];
  const steps = t.raw('howItWorks.steps') as Array<{ title: string; description: string }>;

  const icons = {
    access: (
      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    mobile: (
      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    automation: (
      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    security: (
      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l7 4v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V7l7-4z" />
      </svg>
    ),
    multi: (
      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4h-1m-4 6H2v-2a4 4 0 014-4h4m6-4a4 4 0 11-8 0 4 4 0 018 0zm6 4a3 3 0 10-6 0 3 3 0 006 0z" />
      </svg>
    ),
    install: (
      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {t('title')} <span className="text-primary">{t('titleHighlight')}</span> {t('heroTitleSuffix')}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                {t('heroDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="/commencer-gratuitement"
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-white px-6 py-3 font-semibold shadow-md hover:bg-primary/90 transition"
                >
                  {common('startFree')}
                </a>
                <a
                  href="/reserver-demo"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 hover:border-primary hover:text-primary transition"
                >
                  {t('heroSecondaryCta')}
                </a>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                {heroBullets.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-3.5 w-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full">
              <div className="aspect-[4/3] w-full rounded-2xl border border-primary/10 bg-white/70 shadow-sm overflow-hidden">
                <img
                  src={SMART_LOCK_HERO_IMAGE.src}
                  alt={t('heroImageAlt')}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Needs */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('needs.title')}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t('needs.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {needs.map((item, index) => (
              <div key={index} className="rounded-2xl border border-gray-100 bg-slate-50/70 p-6 shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  {icons[item.icon]}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t('partners.title')}
            </h2>
            <p className="text-white/90 max-w-3xl mx-auto">
              {t('partners.description')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {partners.map((partner) => (
              <div key={partner.key} className="flex items-center justify-center rounded-xl border border-white/20 bg-white p-4 shadow-md">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 w-28 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
            {t('howItWorks.title')}
          </h2>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-slate-50/70 p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SmartLockWizard />
        </div>
      </section>
    </main>
  );
}
