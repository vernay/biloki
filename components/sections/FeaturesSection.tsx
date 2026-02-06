'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface Feature {
  id: string;
  translationKey: string;
}

const FEATURES: Feature[] = [
  {
    id: 'channel-manager',
    translationKey: 'channelManager',
  },
  {
    id: 'pms',
    translationKey: 'pms',
  },
  {
    id: 'serrures',
    translationKey: 'serrures',
  },
  {
    id: 'interfaces',
    translationKey: 'interfaces',
  },
  {
    id: 'guide-digital',
    translationKey: 'guideDigital',
  },
  {
    id: 'multi-langue',
    translationKey: 'multiLangue',
  }
];

const iconMap: { [key: string]: ReactNode } = {
  'channel-manager': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  pms: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  serrures: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  interfaces: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'guide-digital': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'multi-langue': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

export default function FeaturesSection() {
  const t = useTranslations('features');

  return (
    <section className="w-full bg-gradient-to-b from-white via-white to-gray-50 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Feature Blocks */}
        <div className="space-y-16 md:space-y-20">
          {FEATURES.map((feature, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={feature.id}
                className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center"
              >
                <motion.div
                  className={isReversed ? 'md:order-2' : ''}
                  initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3 text-primary">
                    <span className="p-2.5 rounded-xl bg-primary/10 text-primary">
                      {iconMap[feature.id]}
                    </span>
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                      {t(`items.${feature.translationKey}.kicker`)}
                    </p>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-4">
                    {t(`items.${feature.translationKey}.title`)}
                  </h3>
                  <p className="text-gray-600 mt-3 text-base md:text-lg">
                    {t(`items.${feature.translationKey}.description`)}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {(t.raw(`items.${feature.translationKey}.bullets`) as string[]).map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-3 text-gray-700">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  className={isReversed ? 'md:order-1' : ''}
                  initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                >
                  <div className="relative rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-white p-4">
                    <div className="aspect-[4/3] rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-sm">
                      {t('imagePlaceholder')}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
