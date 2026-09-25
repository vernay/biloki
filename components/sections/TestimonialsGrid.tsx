'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const PHOTOS = [
  '/images/T%C3%A9moignage/Claire.png',
  '/images/T%C3%A9moignage/Kevin.jpeg',
  null,
  '/images/T%C3%A9moignage/Am%C3%A9lie.JPG',
];

export default function TestimonialsGrid() {
  const t = useTranslations('testimonialsGrid');

  const items = [1, 2, 3, 4].map((id, index) => ({
    quote: t(`items.${id}.quote`),
    name: t(`items.${id}.name`),
    role: t(`items.${id}.role`),
    photo: PHOTOS[index],
  }));

  return (
    <section className="bg-blue-50/60 px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="text-3xl font-black text-slate-900 md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-base text-slate-600 md:text-lg">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex items-start gap-5 rounded-2xl bg-white p-6 shadow-sm md:p-8"
            >
              <div className="flex-1">
                <p className="text-slate-800">&laquo; {item.quote} &raquo;</p>
                <p className="mt-4 font-semibold text-slate-900">{item.name}</p>
                <p className="text-sm text-slate-500">{item.role}</p>
              </div>
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl md:h-20 md:w-20">
                {item.photo ? (
                  <Image
                    src={item.photo}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center bg-blue-500 text-2xl font-bold text-white"
                    aria-hidden="true"
                  >
                    {item.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
