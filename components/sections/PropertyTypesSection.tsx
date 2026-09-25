'use client';

import { useState, JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const ICONS: Record<string, JSX.Element> = {
  seasonal: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10h14V10" />
    </svg>
  ),
  guestHouses: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 6v12H3V9l9-6z" />
    </svg>
  ),
  gites: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V10l8-7 8 7v11M9 21v-8h6v8" />
    </svg>
  ),
  camping: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l8 16H4l8-16zM9 14h6" />
    </svg>
  ),
  agritourism: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
    </svg>
  ),
};

const CATEGORY_KEYS = ['seasonal', 'guestHouses', 'gites', 'camping', 'agritourism'] as const;

const IMAGES: Record<(typeof CATEGORY_KEYS)[number], string> = {
  seasonal: '/images/Page réservation/franco-debartolo-kUd6KkVfbCY-unsplash.jpg',
  guestHouses: '/images/Page réservation/cristina-gottardi-CSpjU6hYo_0-unsplash.jpg',
  gites: '/images/Page réservation/danilo-rios-AgK_XAqSbfk-unsplash.jpg',
  camping: '/images/Page réservation/garrett-parker-DlkF4-dbCOU-unsplash.jpg',
  agritourism: '/images/Page réservation/johannes-plenio-RwHv7LgeC7s-unsplash.jpg',
};

export default function PropertyTypesSection() {
  const t = useTranslations('propertyTypes');
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeKey = CATEGORY_KEYS[activeIndex];

  return (
    <section className="bg-blue-50/60 px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-900 md:mb-12 md:text-4xl">
          {t('title')}
        </h2>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr] lg:items-start">
          {/* Colonne gauche - liste des catégories */}
          <div className="flex flex-col gap-3">
            {CATEGORY_KEYS.map((key, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={key}
                  onClick={() => setActiveIndex(index)}
                  className={`flex w-full items-center gap-3 rounded-full px-5 py-4 text-left text-base font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#01A4FF] text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                      isActive ? 'bg-white text-[#01A4FF]' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {ICONS[key]}
                  </span>
                  {t(`categories.${key}`)}
                </button>
              );
            })}
          </div>

          {/* Colonne droite - image + description */}
          <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm">
            <div className="relative h-[260px] w-full overflow-hidden rounded-[1.6rem] sm:h-[320px] md:h-[380px]">
              <Image
                src={IMAGES[activeKey]}
                alt={t(`categories.${activeKey}`)}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            </div>
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between md:p-6">
              <p className="text-sm text-slate-600 md:text-base">
                {t(`descriptions.${activeKey}`)}
              </p>
              <Link
                href={`/${locale}/reserver-demo`}
                className="inline-flex w-fit items-center justify-center whitespace-nowrap rounded-full bg-[#01A4FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0194e6]"
              >
                {t('cta')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
