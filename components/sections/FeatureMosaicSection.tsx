'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Box, Lock, Search, Settings, Sparkles, TrendingUp, Waves } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

type MosaicCard = {
  title: string;
  description: string;
  image?: string;
  accent: string;
  className: string;
  icon: React.ReactNode;
};

export default function FeatureMosaicSection() {
  const t = useTranslations('benefits');

  const cards: MosaicCard[] = [
    {
      title: t('item1.title'),
      description: t('item1.description'),
      image: '/images/modules/Coucher de soleil.jpg',
      accent: 'from-[#0f172a]/80 to-[#0f172a]/20',
      className: 'lg:col-span-2 lg:row-span-2 min-h-[360px]',
      icon: <Box className="h-4 w-4" />,
    },
    {
      title: t('item2.title'),
      description: t('item2.description'),
      image: '/images/connexions-ota/milan-malfait-ivTKnx8rLII-unsplash.jpg',
      accent: 'from-sky-950/75 to-sky-500/20',
      className: 'min-h-[180px]',
      icon: <Settings className="h-4 w-4" />,
    },
    {
      title: t('item3.title'),
      description: t('item3.description'),
      image: '/images/1%C3%A8re%20page%20photos/Es%20vedra.jpg',
      accent: 'from-emerald-950/80 to-emerald-500/20',
      className: 'min-h-[180px]',
      icon: <Waves className="h-4 w-4" />,
    },
    {
      title: t('item5.title'),
      description: t('item5.description'),
      image: '/images/footer/luca-bravo-zAjdgNXsMeg-unsplash.jpg',
      accent: 'from-amber-950/75 to-amber-500/20',
      className: 'lg:col-span-1 lg:row-span-2 min-h-[260px]',
      icon: <Lock className="h-4 w-4" />,
    },
    {
      title: t('item6.title'),
      description: t('item6.description'),
      accent: 'from-slate-900/90 to-slate-700/50',
      className: 'min-h-[180px]',
      icon: <Search className="h-4 w-4" />,
    },
    {
      title: t('item4.title'),
      description: t('item4.description'),
      image: '/images/connexions-ota/milan-malfait-ivTKnx8rLII-unsplash.jpg',
      accent: 'from-[#7c2d12]/75 to-[#ea580c]/30',
      className: 'lg:col-span-2 lg:row-span-2 min-h-[260px]',
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: t('cta'),
      description: t('subtitle'),
      accent: 'from-primary/90 to-sky-500/70',
      className: 'min-h-[180px]',
      icon: <Sparkles className="h-4 w-4" />,
    },
  ];

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 md:mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            {t('title')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {t('subtitle')}
          </h2>
        </div>

        <div className="grid gap-4 md:gap-5 lg:grid-cols-3 lg:auto-rows-[180px]">
          {cards.map((card) => (
            <article
              key={card.title}
              className={`relative list-none overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-50 shadow-[0_18px_45px_rgba(15,23,42,0.08)] ${card.className}`}
            >
              <div className="relative h-full rounded-[inherit] p-2 md:p-3">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />

                <div className="relative h-full overflow-hidden rounded-[22px]">
                  {card.image ? (
                    <div className="absolute inset-0">
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.accent}`} />
                    </div>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.accent}`} />
                  )}

                  <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6 lg:p-7">
                    <div className="w-fit rounded-xl border border-white/20 bg-white/10 p-2 text-white/95 backdrop-blur-sm">
                      {card.icon}
                    </div>

                    <div className="max-w-md">
                      <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] md:text-2xl">
                        {card.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/88 md:text-base">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}