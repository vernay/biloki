'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

declare global {
  interface Window {
    hbspt?: any;
  }
}

export default function ConnexionsAPIPage() {
  const t = useTranslations('apiPage');
  const common = useTranslations('common');

  useEffect(() => {
    // Load HubSpot script
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    script.async = true;
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: 'eu1',
          portalId: '48192046',
          formId: '2e53ea17-c6f7-4e33-ad78-2dc48c3c7cdd',
          target: '#hubspot-form-api'
        });
      }
    };
    document.body.appendChild(script);

    // Load Calendly script
    const calendlyScript = document.createElement('script');
    calendlyScript.src = 'https://assets.calendly.com/assets/external/widget.js';
    calendlyScript.async = true;
    document.body.appendChild(calendlyScript);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logos/biloki-logo-full.svg" alt="Biloki" className="h-16 md:h-20" />
        </div>

        {/* Back button */}
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary mb-12 font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {common('back')}
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Info */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Logo */}
            <div className="flex justify-start mb-8">
              <img src="/logos/biloki-logo-full.svg" alt="Biloki" className="h-12" />
            </div>

            {/* Team & Title */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-600 mb-2">{t('technicalTeam')}</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('integrationTitle')}</h2>
              
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">{t('duration')}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-8">
              {t('integrationDesc')}
            </p>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-700">{t('feature1')}</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-700">{t('feature2')}</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-700">{t('feature3')}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div 
              id="hubspot-form-api"
              style={{ minWidth: '100%' }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
