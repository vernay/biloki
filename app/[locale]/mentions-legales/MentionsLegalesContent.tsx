'use client';

import { useTranslations } from 'next-intl';

export default function MentionsLegalesContent() {
  const t = useTranslations('legalPages.legalNotice');

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-sm font-semibold text-primary">{t('badge')}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('title')}</h1>
          <p className="text-sm text-gray-600">{t('subtitle')}</p>
        </header>

        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 sm:p-10 space-y-10">
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('badge')}</h2>
            <p>{t('intro')}</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section1Title')}</h2>
            <p className="whitespace-pre-line">{t('section1Content')}</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section2Title')}</h2>
            <p className="whitespace-pre-line">{t('section2Content')}</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section3Title')}</h2>
            <p className="whitespace-pre-line">{t('section3Content')}</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section4Title')}</h2>
            <p className="whitespace-pre-line">{t('section4Content')}</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section5Title')}</h2>
            <p>{t('section5Content')}</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section6Title')}</h2>
            <p>{t('section6Content')}</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section7Title')}</h2>
            <p>{t('section7Content')}</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section8Title')}</h2>
            <p>{t('section8Content')}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
