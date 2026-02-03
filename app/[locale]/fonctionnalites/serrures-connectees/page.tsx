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

        {/* Wizard */}
        <SmartLockWizard />
      </div>
    </main>
  );
}
