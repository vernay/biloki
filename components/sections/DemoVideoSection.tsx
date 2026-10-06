'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function DemoVideoSection() {
  const t = useTranslations('demoVideo');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Ne télécharge la vidéo (2,8 Mo) que lorsque la section approche du
  // viewport, pour éviter de pénaliser le chargement initial de la page.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;
    // Forcer l'attribut muted en JS : requis par les navigateurs pour autoriser l'autoplay.
    video.muted = true;
    video.load();
    video.play().catch(() => {
      // Autoplay bloqué par le navigateur : l'utilisateur pourra lancer la lecture manuellement.
    });
  }, [shouldLoad]);

  return (
    <section className="px-4 pb-10 sm:px-6 md:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2.5rem] bg-slate-50 px-6 py-12 text-center shadow-sm md:px-12 md:py-16">
          <h2 className="text-2xl font-black text-slate-900 md:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            {t('subtitle')}
          </p>

          <div
            ref={containerRef}
            className="mx-auto mt-8 w-full max-w-xs overflow-hidden rounded-[2rem] bg-black shadow-xl md:max-w-sm"
          >
            <video
              ref={videoRef}
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/videos/biloki-demo-poster.jpg"
              className="h-auto w-full"
            >
              {shouldLoad ? <source src="/videos/biloki-demo.mp4" type="video/mp4" /> : null}
            </video>
          </div>

          <Link
            href={`/${locale}/reserver-demo`}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#01A4FF] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#0194e6] md:px-8 md:py-4 md:text-base"
          >
            {tCommon('bookDemo')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
