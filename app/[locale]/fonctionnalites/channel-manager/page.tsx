'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ChannelManagerPage() {
  const t = useTranslations('featuresPages.channelManager');
  const bullets = t.raw('hero.bullets') as string[];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Hero */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
            {t('hero.description')}
          </p>

          <div className="max-w-3xl mx-auto grid gap-4 text-left">
            {bullets.map((item, index) => (
              <div key={index} className="flex items-start gap-3 rounded-2xl bg-white/80 border border-blue-100 px-5 py-4 shadow-sm">
                <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub menus */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
            {t('subSections.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('subSections.ota.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('subSections.ota.description')}
              </p>
              <Link
                href="/fonctionnalites/channel-manager/ota"
                className="mt-auto inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                {t('subSections.ota.cta')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('subSections.calendars.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('subSections.calendars.description')}
              </p>
              <Link
                href="/fonctionnalites/channel-manager/calendriers"
                className="mt-auto inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                {t('subSections.calendars.cta')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
