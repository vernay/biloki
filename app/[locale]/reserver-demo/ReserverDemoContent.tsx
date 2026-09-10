'use client';

import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import RelatedPages from '@/components/ui/RelatedPages';

export default function ReserverDemoContent() {
  const t = useTranslations('demoPage');
  const common = useTranslations('common');
  const relatedT = useTranslations('relatedPages');
  const locale = useLocale();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <Link href={`/${locale}`} className="mt-24 flex items-center gap-2 text-gray-600 hover:text-primary mb-12 font-semibold md:mt-24 lg:mt-28">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {common('back')}
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Info Biloki */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Logo */}
            <div className="flex justify-start mb-8">
              <img src="/logos/biloki-logo-full.svg" alt="Biloki" className="h-12" />
            </div>

            {/* Team & Title */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-600 mb-2">{t('salesTeam')}</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('demoName')}</h2>
              
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">{t('duration')}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-8">
              {t('demoDescription')}
            </p>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-700">{t('features.discover')}</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-700">{t('features.analysis')}</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-700">{t('features.qa')}</p>
              </div>
            </div>
          </div>

          {/* Right Side - HubSpot Meetings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div
              className="meetings-iframe-container"
              data-src="https://meetings-eu1.hubspot.com/gregoire-vernay?embed=true"
            />
          </div>
        </div>

        {/* Pages connexes pour SEO */}
        <RelatedPages
          title={common('relatedPages')}
          links={[
            {
              href: `/${locale}/tarifs`,
              title: relatedT('pricing.title'),
              description: relatedT('pricing.description')
            },
            {
              href: `/${locale}/commencer-gratuitement`,
              title: relatedT('trial.title'),
              description: relatedT('trial.description')
            },
            {
              href: `/${locale}/fonctionnalites/reservations`,
              title: relatedT('pms.title'),
              description: relatedT('pms.description')
            },
            {
              href: `/${locale}/fonctionnalites/channel-manager`,
              title: relatedT('channelManager.title'),
              description: relatedT('channelManager.description')
            },
            {
              href: `/${locale}/contact`,
              title: relatedT('contact.title'),
              description: relatedT('contact.description')
            },
            {
              href: `/${locale}/equipe`,
              title: relatedT('team.title'),
              description: relatedT('team.description')
            }
          ]}
          className="mt-16"
        />
      </div>
    </main>
  );
}
