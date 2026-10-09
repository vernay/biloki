'use client';

import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function ReserverDemoContent() {
  const t = useTranslations('demoPage');
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Content */}
        <div className="mt-24 md:mt-24 lg:mt-28">
          <div className="grid gap-6 md:grid-cols-2 md:items-stretch md:gap-10">
            {/* Left Side - Info Biloki */}
            <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-10">
              {/* Logo */}
              <div className="mb-8 flex justify-start">
                <img src="/logos/biloki-logo-full.svg" alt="Biloki" className="h-9 md:h-10" />
              </div>

              {/* Team & Title */}
              <div className="mb-6">
                <p className="mb-2 text-sm font-semibold text-gray-500">{t('salesTeam')}</p>
                <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                  {t('demoName')}
                </h2>

                <div className="mb-6 flex items-center gap-2 text-gray-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">{t('duration')}</span>
                </div>
              </div>

              {/* Description */}
              <p className="mb-8 leading-relaxed text-gray-700">
                {t('demoDescription')}
              </p>

              {/* Features List */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-gray-700">{t('features.discover')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-gray-700">{t('features.analysis')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-gray-700">{t('features.qa')}</p>
                </div>
              </div>
            </div>

            {/* Right Side - HubSpot Meetings (dates proposées directement) */}
            <div className="h-full">
              <div
                className="meetings-iframe-container h-full min-h-[640px]"
                data-src="https://meetings-eu1.hubspot.com/gregoire-vernay?embed=true"
              />
            </div>
          </div>
        </div>

        {/* Skip step */}
        <p className="mt-8 text-center text-sm text-gray-600">
          {t('skipPrefix')}{' '}
          <Link href={`/${locale}/commencer-gratuitement`} className="font-semibold text-primary hover:underline">
            {t('skipLinkText')}
          </Link>
        </p>

      </div>
    </main>
  );
}
