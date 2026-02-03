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
    id: 'pms',
    translationKey: 'pms',
    videoSrc: '/videos/guide-digital.mov'
  },
  {
    id: 'serrures',
    translationKey: 'serrures',
    videoSrc: '/videos/serrure.mov'
  },
  {
    id: 'interfaces',
    translationKey: 'interfaces',
    videoSrc: '/videos/Affectation des prestataires.mov'
  },
  {
    id: 'guide-digital',
    translationKey: 'guideDigital',
    videoSrc: '/videos/guide-digital.mov'
  },
  {
    id: 'comptabilite',
    translationKey: 'comptabilite',
    videoSrc: '/videos/Rapport financier.mov'
  },
  {
    id: 'ventes-extras',
    translationKey: 'ventesExtras',
    videoSrc: '/videos/ventes-extras.mov'
  },
  {
    id: 'marketplace',
    translationKey: 'marketplace',
    videoSrc: '/videos/Messagerie unifiée.mov'
  },
  {
    id: 'multi-langue',
    translationKey: 'multiLangue',
    videoSrc: '/videos/guide-digital.mov'
  }
];

const iconMap: { [key: string]: React.ReactNode } = {
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
  comptabilite: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'ventes-extras': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  marketplace: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'multi-langue': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

export default function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState('channel-manager');
  const [hasUserClicked, setHasUserClicked] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('features');
  const activeFeature = FEATURES.find(f => f.id === selectedFeature) || FEATURES[0];
  
  // Auto-scroll vers la vidéo SEULEMENT si l'utilisateur a cliqué
  useEffect(() => {
    if (hasUserClicked && videoRef.current && window.innerWidth < 768) {
      setTimeout(() => {
        videoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 0);
    }
  }, [selectedFeature, hasUserClicked]);

  const handleFeatureClick = (featureId: string) => {
    setSelectedFeature(featureId);
    setHasUserClicked(true);
  };

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

        {/* Mobile Layout: Accordion style with video below each card */}
        <div className="md:hidden space-y-2">
          {FEATURES.map((feature) => (
            <div key={feature.id}>
              {/* Card */}
              <button
                onClick={() => handleFeatureClick(feature.id)}
                className={`w-full text-left p-3 md:p-4 rounded-lg border-2 transition-all duration-200 group text-sm md:text-base ${
                  selectedFeature === feature.id
                    ? 'border-primary bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-primary hover:shadow-md hover:bg-gray-50'
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
                  {/* Play icon on the right */}
                  <div className={`p-2 rounded-lg flex-shrink-0 transition-all duration-200 ${
                    selectedFeature === feature.id
                      ? 'bg-primary text-white rotate-90'
                      : 'bg-gray-100 text-primary group-hover:bg-primary group-hover:text-white'
                  }`}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 3v18l14-9L5 3z"/>
                    </svg>
                  </div>
                </div>
              </button>

              {/* Video shown when this card is selected */}
              {selectedFeature === feature.id && (
                <div ref={videoRef} className="w-full h-auto max-h-96 mt-2">
                  <VideoPlayer
                    src={feature.videoSrc}
                    poster={feature.videoPoster}
                    className="w-full h-full rounded-xl overflow-hidden shadow-xl"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
