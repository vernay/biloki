'use client';

import { JSX } from "react";
import { useTranslations } from "next-intl";

const iconKeys: Record<string, JSX.Element> = {
  channelManager: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  pms: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  serrures: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  interfaces: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  guideDigital: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  comptabilite: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ),
  ventesExtras: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12l-1.5 9h-9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 11h6m-6 3h4" />
      <circle cx="9" cy="19" r="1.25" />
      <circle cx="15" cy="19" r="1.25" />
    </svg>
  ),
  marketplace: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  )
};

const itemKeys = [
  { key: 'channelManager', link: '/fonctionnalites/channel-manager/calendriers' },
  { key: 'pms', link: '/fonctionnalites/pms' },
  { key: 'serrures', link: '/fonctionnalites/serrures-connectees' },
  { key: 'interfaces', link: '/fonctionnalites/4-interfaces' },
  { key: 'guideDigital', link: '/fonctionnalites/ia-automatisation' },
  { key: 'comptabilite', link: '/fonctionnalites/pms#facturation-commissions' },
  { key: 'ventesExtras', link: '/fonctionnalites/pms#ventes-extras' },
  { key: 'marketplace', link: '/fonctionnalites/marketplace-api' },
];

export default function OverviewSection() {
  const t = useTranslations('overview');
  const tCommon = useTranslations('common');

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
          {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
        </h2>
        <p className="text-lg text-gray-600 text-center mt-4 max-w-3xl mx-auto">
          {t('description')}
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemKeys.map((item, index) => (
            <a 
              key={item.key} 
              href={item.link}
              className="bg-primary rounded-2xl p-6 shadow-sm flex flex-col h-full hover:bg-primary-dark hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group overflow-hidden relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Gradient animé en arrière-plan */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm text-primary">
                  {iconKeys[item.key]}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {t(`items.${item.key}.title`)}
                </h3>
              </div>
              <p className="text-white/90 mt-4 text-sm leading-relaxed flex-grow whitespace-pre-wrap relative z-10">
                {t(`items.${item.key}.desc`)}
              </p>
              {item.link && (
                <div className="mt-4 pt-4 border-t border-white/20 relative z-10">
                  <span className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                    {tCommon('learnMore')}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
