'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

type PressItem = {
  id: number;
  url: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  date?: string;
};

const PRESS_ITEMS: PressItem[] = [
  {
    id: 1,
    url: 'https://www.bfmtv.com/economie/professionnels/focus-entreprises/biloki-le-logiciel-tout-en-un-qui-simplifie-le-quotidien-des-conciergeries_AB-202609300014.html',
    logo: '/images/logo-partenaires/bfm-business-logo.jpg',
    logoWidth: 200,
    logoHeight: 136,
    date: '2026-09-30',
  },
  {
    id: 2,
    url: 'https://connect.scale-rentals.com/fr/concierge-platform/biloki',
    logo: '/images/logo-partenaires/scale-france-logo.png',
    logoWidth: 150,
    logoHeight: 56,
  },
  {
    id: 3,
    url: 'https://agence-api.ouest-france.fr/pays-de-la-loire/loire-atlantique/electronique-la-societe-nantaise-biloki-se-lance-sur-le-marche-de-la-serrure-connectee-4400e462-3bfd-4868-a512-82204f72da19',
    logo: '/images/logo-partenaires/ouest-france-logo.webp',
    logoWidth: 150,
    logoHeight: 50,
    date: '2024-12-19',
  },
];

export default function PressMentions() {
  const t = useTranslations('pressMentions');
  const locale = useLocale();
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-black text-slate-900 md:text-5xl">
          {t('title')}
        </h2>

        <div className="mt-8 border-t border-slate-200 md:mt-10">
          {PRESS_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-3 border-b border-slate-200 py-6 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-8"
            >
              <div className="flex w-full flex-shrink-0 items-center sm:w-48">
                <Image
                  src={item.logo}
                  alt={t(`items.${item.id}.source`)}
                  width={item.logoWidth}
                  height={item.logoHeight}
                  className="h-14 w-auto object-contain"
                />
              </div>
              <div>
                <p className="text-base text-slate-800 md:text-lg">
                  {t(`items.${item.id}.headline`)}
                </p>
                {item.date ? (
                  <p className="mt-1 text-sm text-slate-500">
                    {dateFormatter.format(new Date(item.date))}
                  </p>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
