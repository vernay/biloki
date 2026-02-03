'use client';

import { useTranslations } from 'next-intl';
import { CONTACT_EMAIL } from '@/lib/config';

export default function CGVPage() {
  const t = useTranslations('legalPages.cgv');

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-sm font-semibold text-primary">{t('badge')}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('title')}</h1>
          <p className="text-sm text-gray-600">{t('version')}</p>
        </header>

        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 sm:p-10 space-y-10">
          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section1Title')}</h2>
            <p>{t('section1Content')}</p>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section2Title')}</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>{t('section2Items.platform')}</li>
              <li>{t('section2Items.services')}</li>
              <li>{t('section2Items.contract')}</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section3Title')}</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>{t('section3Items.access')}</li>
              <li>{t('section3Items.maintenance')}</li>
              <li>{t('section3Items.support')}</li>
              <li>{t('section3Items.additional')}</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section4Title')}</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>{t('section4Items.prices')}</li>
              <li>{t('section4Items.billing')}</li>
              <li>{t('section4Items.delay')}</li>
              <li>{t('section4Items.evolution')}</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section5Title')}</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>{t('section5Items.info')}</li>
              <li>{t('section5Items.compliance')}</li>
              <li>{t('section5Items.rights')}</li>
              <li>{t('section5Items.security')}</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section6Title')}</h2>
            <p>{t('section6Content')}</p>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section7Title')}</h2>
            <p>{t('section7Content')}</p>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section8Title')}</h2>
            <p>{t('section8Content')}</p>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section9Title')}</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>{t('section9Items.compliance')}</li>
              <li>{t('section9Items.processor')}</li>
              <li>{t('section9Items.measures')}</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section10Title')}</h2>
            <p>{t('section10Content')}</p>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section11Title')}</h2>
            <p>{t('section11Content')}</p>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section12Title')}</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>{t('section12Items.duration')}</li>
              <li>{t('section12Items.termination')}</li>
              <li>{t('section12Items.consequences')}</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section13Title')}</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>{t('section13Items.obligation')}</li>
              <li>{t('section13Items.limit')}</li>
              <li>{t('section13Items.exclusion')}</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section14Title')}</h2>
            <p>{t('section14Content')}</p>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section15Title')}</h2>
            <p>{t('section15Content')}</p>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section16Title')}</h2>
            <p>{t('section16Content')}</p>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{t('section17Title')}</h2>
            <p>
              {t('section17Content')}{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
