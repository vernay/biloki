'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function QuatreInterfacesPage() {
  const t = useTranslations('featuresPages.fourInterfaces');
  const common = useTranslations('common');

  const interfaces = [
    { key: 'manager', color: 'primary', bgClass: 'bg-primary', image: '/images/interfaces/gestionnaire.png' },
    { key: 'owner', color: 'sky-400', bgClass: 'bg-sky-400', image: '/images/interfaces/proprietaire.png' },
    { key: 'provider', color: 'green-500', bgClass: 'bg-green-500', image: '/images/interfaces/prestataire.png' },
    { key: 'guest', color: 'orange-500', bgClass: 'bg-orange-500', image: '/images/interfaces/locataire.png' },
  ];

  const icons = {
    manager: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    owner: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    provider: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    guest: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Interfaces */}
      {interfaces.map((iface, index) => {
        const features = t.raw(`${iface.key}.features`) as string[];
        const isReversed = index % 2 === 1;
        
        return (
          <section 
            key={iface.key} 
            id={iface.key === 'guest' ? 'locataire' : iface.key === 'owner' ? 'proprietaire' : iface.key}
            className={`py-16 px-6 ${isReversed ? 'bg-white' : ''}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${isReversed ? 'md:grid-flow-dense' : ''}`}>
                <div className={isReversed ? 'md:col-start-2' : ''}>
                  <div className={`inline-flex items-center gap-2 ${iface.bgClass} text-white px-4 py-2 rounded-full text-sm font-semibold mb-6`}>
                    {icons[iface.key as keyof typeof icons]}
                    {t(`${iface.key}.badge`)}
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {t(`${iface.key}.title`)}
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {t(`${iface.key}.description`)}
                  </p>
                  <ul className="space-y-3">
                    {features.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className={`w-6 h-6 text-${iface.color} mt-0.5 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/reserver-demo"
                      className={`inline-flex items-center justify-center gap-2 ${iface.bgClass} text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300`}
                    >
                      {common('bookDemo')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <Link
                      href="/commencer-gratuitement"
                      className={`inline-flex items-center justify-center gap-2 bg-white text-${iface.color} font-semibold py-3 px-6 rounded-lg border-2 border-${iface.color} hover:bg-blue-50 transition-all duration-300`}
                    >
                      {common('startFreeTrial')}
                    </Link>
                  </div>
                </div>
                <div className={isReversed ? 'md:col-start-1 md:row-start-1' : ''}>
                  <img 
                    src={iface.image} 
                    alt={t(`${iface.key}.badge`)}
                    className="rounded-2xl shadow-2xl w-full max-w-xs md:max-w-sm lg:max-w-md max-h-[420px] md:max-h-[480px] lg:max-h-[520px] mx-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-primary rounded-[48px] shadow-xl p-10 text-white">
          <h2 className="text-4xl font-bold mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reserver-demo"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              {common('bookDemo')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/commencer-gratuitement"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              {common('startFreeTrial')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
