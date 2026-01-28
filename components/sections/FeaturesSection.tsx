'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import VideoPlayer from '@/components/ui/VideoPlayer';

interface Feature {
  id: string;
  translationKey: string;
  videoSrc: string;
  videoPoster?: string;
}

const FEATURES: Feature[] = [
  {
    id: 'channel-manager',
    translationKey: 'channelManager',
    videoSrc: '/videos/Messagerie unifiée.mov'
  },
  {
    id: 'planification',
    translationKey: 'planification',
    videoSrc: '/videos/Affectation des prestataires.mov'
  },
  {
    id: 'guide-digital',
    translationKey: 'guideDigital',
    videoSrc: '/videos/guide-digital.mov'
  },
  {
    id: 'messagerie',
    translationKey: 'messagerie',
    videoSrc: '/videos/Messagerie unifiée.mov'
  },
  {
    id: 'serrure',
    translationKey: 'serrure',
    videoSrc: '/videos/serrure.mov'
  },
  {
    id: 'ventes-extras',
    translationKey: 'ventesExtras',
    videoSrc: '/videos/ventes-extras.mov'
  },
  {
    id: 'dashboard',
    translationKey: 'dashboard',
    videoSrc: '/videos/Rapport financier.mov'
  },
  {
    id: 'avis',
    translationKey: 'avis',
    videoSrc: '/videos/avis.mov'
  }
];

const iconMap: { [key: string]: React.ReactNode } = {
  'channel-manager': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  messagerie: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'guide-digital': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  serrure: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'ventes-extras': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  planification: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  avis: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  dashboard: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

export default function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState('channel-manager');
  const videoRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('features');
  const activeFeature = FEATURES.find(f => f.id === selectedFeature) || FEATURES[0];
  
  // Diviser les features en deux groupes pour mobile
  const firstHalf = FEATURES.slice(0, Math.ceil(FEATURES.length / 2));
  const secondHalf = FEATURES.slice(Math.ceil(FEATURES.length / 2));

  // Scroll vers la vidéo quand on change de feature sur mobile
  useEffect(() => {
    if (window.innerWidth < 768 && videoRef.current) {
      setTimeout(() => {
        videoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [selectedFeature]);

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 lg:py-32">
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

        {/* Desktop Layout: Cards left + Video right */}
        <div className="hidden md:grid md:grid-cols-5 gap-6 md:gap-8 lg:gap-10">
          {/* Left: ALL Feature Cards */}
          <div className="md:col-span-2 space-y-2 md:space-y-3">
            {FEATURES.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className={`w-full text-left p-3 md:p-4 rounded-lg border-2 transition-all duration-200 group text-sm md:text-base ${
                  selectedFeature === feature.id
                    ? 'border-primary bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-primary hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-2 md:gap-3">
                  <div className={`p-2 rounded-lg flex-shrink-0 transition-all duration-200 ${
                    selectedFeature === feature.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-primary group-hover:bg-primary group-hover:text-white'
                  }`}>
                    {iconMap[feature.id]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900">{t(`items.${feature.translationKey}.title`)}</h3>
                    <p className="text-gray-600 text-xs hidden md:block">{t(`items.${feature.translationKey}.description`)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Video Player */}
          <div className="md:col-span-3">
            <div className="w-full h-auto max-h-96">
              <VideoPlayer
                src={activeFeature.videoSrc}
                poster={activeFeature.videoPoster}
                className="w-full h-full rounded-xl overflow-hidden shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout: Cards - Video - Cards */}
        <div className="md:hidden grid gap-6">
          {/* First half of cards */}
          <div className="space-y-2">
            {firstHalf.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className={`w-full text-left p-3 md:p-4 rounded-lg border-2 transition-all duration-200 group text-sm md:text-base ${
                  selectedFeature === feature.id
                    ? 'border-primary bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-primary hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-2 md:gap-3">
                  <div className={`p-2 rounded-lg flex-shrink-0 transition-all duration-200 ${
                    selectedFeature === feature.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-primary group-hover:bg-primary group-hover:text-white'
                  }`}>
                    {iconMap[feature.id]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900">{t(`items.${feature.translationKey}.title`)}</h3>
                    <p className="text-gray-600 text-xs">{t(`items.${feature.translationKey}.description`)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Video in the middle on mobile */}
          <div ref={videoRef} className="w-full h-auto max-h-96">
            <VideoPlayer
              src={activeFeature.videoSrc}
              poster={activeFeature.videoPoster}
              className="w-full h-full rounded-xl overflow-hidden shadow-xl"
            />
          </div>

          {/* Second half of cards */}
          <div className="space-y-2">
            {secondHalf.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className={`w-full text-left p-3 md:p-4 rounded-lg border-2 transition-all duration-200 group text-sm md:text-base ${
                  selectedFeature === feature.id
                    ? 'border-primary bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-primary hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-2 md:gap-3">
                  <div className={`p-2 rounded-lg flex-shrink-0 transition-all duration-200 ${
                    selectedFeature === feature.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-primary group-hover:bg-primary group-hover:text-white'
                  }`}>
                    {iconMap[feature.id]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900">{t(`items.${feature.translationKey}.title`)}</h3>
                    <p className="text-gray-600 text-xs">{t(`items.${feature.translationKey}.description`)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
