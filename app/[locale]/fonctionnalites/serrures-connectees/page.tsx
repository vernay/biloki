'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import SmartLockWizard from '@/components/sections/SmartLockWizard';

export default function SmartLocksPage() {
  const t = useTranslations('smartLocksPage');
  const common = useTranslations('common');

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logos/biloki-logo-full.svg" alt="Biloki" className="h-16 md:h-20" />
        </div>

        {/* Back button */}
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-[#04a4ff] mb-12 font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {common('back')}
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t('title')} <span className="text-[#04a4ff]">{t('titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Partners intro */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Marques partenaires compatibles
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Connexion entre l&apos;application de la serrure et Biloki pour permettre aux locataires
                d&apos;ouvrir la porte directement via leur app.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-4">
                <img
                  src="/images/logo-partenaires/nuki.png"
                  alt="Nuki"
                  className="h-10 w-28 object-contain"
                />
              </div>
              <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-4">
                <img
                  src="/images/logo-partenaires/Igloohome.png"
                  alt="Igloohome"
                  className="h-10 w-28 object-contain"
                />
              </div>
              <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-4">
                <img
                  src="/images/logo-partenaires/YaleJPG.jpg"
                  alt="Yale"
                  className="h-10 w-28 object-contain"
                />
              </div>
              <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-4">
                <img
                  src="/images/logo-partenaires/August.webp"
                  alt="August"
                  className="h-10 w-28 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wizard */}
        <SmartLockWizard />
      </div>
    </main>
  );
}
