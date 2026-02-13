'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculatePrice, getTierRange, BillingPeriod, CUSTOM_PRICING_THRESHOLD, VAT_RATE } from '@/lib/pricing-config';
import { COLORS } from '@/lib/design-config';
import WebappLink from '@/components/ui/WebappLink';

export default function TarifsPage() {
  const t = useTranslations('pricingPage');
  const common = useTranslations('common');
  const trialT = useTranslations('trialPage');
  const locale = useLocale();
  
  const [logements, setLogements] = useState(5);
  const [logementsInput, setLogementsInput] = useState('5');
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [isParticulier, setIsParticulier] = useState(false);

  const monthlyData = calculatePrice(logements, 'monthly', {
    isParticulier
  });
  const annualData = calculatePrice(logements, 'annual', {
    isParticulier
  });
  const isCustomPricing = logements > CUSTOM_PRICING_THRESHOLD || !monthlyData || !annualData;
  const factor = isParticulier ? 1 + VAT_RATE : 1;
  
  // Utiliser les données de la config centralisée
  const totalMonthly = monthlyData?.totalMonth ?? 0;
  const totalAnnualDiscounted = (annualData?.totalMonth ?? 0) * 12;
  const totalAnnualFull = totalMonthly * 12;
  const totalMonthlyForDisplay = billingPeriod === 'annual' ? (annualData?.totalMonth ?? 0) : totalMonthly;
  
  const totalMonthlyDisplay = isCustomPricing ? null : totalMonthlyForDisplay * factor;
  const totalAnnualDisplay = isCustomPricing
    ? null
    : (billingPeriod === 'annual' ? totalAnnualDiscounted : totalAnnualFull) * factor;
  const lastUpdate = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date());

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary mb-12 font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {common('back')}
        </a>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-primary px-4 py-2 rounded-full mb-6 font-semibold text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('title')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t('subtitle')}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
          <p className="mt-3 text-sm text-gray-500">{t('lastUpdate')} {lastUpdate}</p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Pricing Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="mb-8 pb-6 border-b">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-primary">{t('whatIsMyPrice')}</h2>
              </div>
              <p className="text-sm text-gray-600">{t('priceExclVat')}</p>
            </div>

            {/* Number of Logements */}
            <div className="mb-8">
              <label htmlFor="logements" className="block text-sm font-semibold text-gray-700 mb-4">
                {t('numberOfProperties')}
              </label>
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="range"
                  id="logements"
                  min="1"
                  max="250"
                  value={logements}
                  onChange={(e) => {
                    const next = Math.max(1, Number(e.target.value));
                    setLogements(next);
                    setLogementsInput(String(next));
                  }}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  style={{
                    background: `linear-gradient(to right, ${COLORS.primary} 0%, ${COLORS.primary} ${((logements - 1) / 249) * 100}%, #e5e7eb ${((logements - 1) / 249) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <input
                  type="number"
                  id="logements-input"
                  min="1"
                  value={logementsInput}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (raw === '') {
                      setLogementsInput('');
                      return;
                    }
                    const val = Number(raw);
                    if (!isNaN(val)) {
                      setLogementsInput(raw);
                      setLogements(Math.max(1, val));
                    }
                  }}
                  onBlur={() => {
                    const val = Number(logementsInput);
                    if (!logementsInput || isNaN(val)) {
                      setLogements(1);
                      setLogementsInput('1');
                      return;
                    }
                    const clamped = Math.max(1, val);
                    setLogements(clamped);
                    setLogementsInput(String(clamped));
                  }}
                  aria-label={t('numberOfProperties')}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold"
                />
              </div>
              <p className="text-sm text-gray-600">
                {getTierRange(logements)}
              </p>
            </div>

            {/* Billing Period */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                {t('billingPeriod')}
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`w-full p-4 rounded-lg border-2 transition text-left ${
                    billingPeriod === 'monthly'
                      ? 'border-primary bg-blue-50'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{t('monthly')}</span>
                    {billingPeriod === 'monthly' && (
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => setBillingPeriod('annual')}
                  className={`w-full p-4 rounded-lg border-2 transition text-left ${
                    billingPeriod === 'annual'
                      ? 'border-primary bg-blue-50'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                >
                    <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-gray-900 block">{t('annual')}</span>
                      <span className="text-xs text-green-600 font-semibold">{t('annualDiscount')}</span>
                    </div>
                    {billingPeriod === 'annual' && (
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Type de client */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {t('clientType')}
              </label>
              <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsParticulier(false)}
                  className={`px-4 py-2 text-sm font-semibold transition ${
                    !isParticulier ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t('professional')}
                </button>
                <button
                  type="button"
                  onClick={() => setIsParticulier(true)}
                  className={`px-4 py-2 text-sm font-semibold transition border-l ${
                    isParticulier ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t('individual')}
                </button>
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-white rounded-lg p-6 border-2 border-primary">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Total mensuel */}
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-3">
                    {t('totalEstimated')} ({t('perMonth')})
                  </p>
                  <div className="space-y-2">
                    {isCustomPricing ? (
                      <>
                        <p className="text-3xl md:text-4xl font-black text-primary">
                          {t('customQuote')}
                        </p>
                        <p className="text-sm text-gray-600">
                          {t('customPricing')}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-3xl md:text-4xl font-black text-primary">
                          {totalMonthlyDisplay?.toFixed(2)}€
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Total annuel */}
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-3">
                    {t('totalEstimated')} ({t('annualPayment')})
                  </p>
                  <div className="space-y-2">
                    {isCustomPricing ? (
                      <>
                        <p className="text-3xl md:text-4xl font-black text-primary">
                          {t('customQuote')}
                        </p>
                        <p className="text-sm text-gray-600">
                          {t('customPricing')}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-3xl md:text-4xl font-black text-primary">
                          {totalAnnualDisplay?.toFixed(2)}€
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {isCustomPricing && (
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600 mb-4">{t('customQuoteMessage')}</p>
                  <a
                    href="/commencer-gratuitement"
                    className="inline-block bg-primary text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition"
                  >
                    {t('requestQuote')}
                  </a>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="mt-6 text-xs text-gray-600 space-y-2">
              <p>✓ {t('infoVat')}</p>
              <p>✓ {t('infoDegressive')}</p>
              <p>✓ {t('infoNoCommitment')}</p>
              <p>✓ {t('infoAnnualPayment')}</p>
            </div>

            {/* Fonctionnalités incluses */}
            <div className="mt-10 pt-10 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">{t('includedFeatures')}</h3>

              <ul className="space-y-3">
                {(t.raw('keyFeatures') as string[]).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700 font-semibold">+{t('moreFeatures')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - CTA */}
          <div className="w-full bg-primary rounded-2xl shadow-2xl p-8 md:p-12 text-center sticky top-8">
            <div className="mb-8">
              <div className="inline-block p-4 bg-white/20 rounded-full mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">
                {t('readyToStart') || 'Prêt à commencer ?'}
              </h3>
              <p className="text-lg text-white/95 mb-8">
                {t('startFreeToday') || 'Démarrez gratuitement aujourd\'hui et découvrez toutes les fonctionnalités de Biloki pendant 14 jours.'}
              </p>
            </div>

            <div className="space-y-4">
              <WebappLink
                type="register"
                className="block w-full bg-white text-primary font-bold py-4 px-8 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
              >
                {common('startFreeTrial')}
              </WebappLink>
              
              <div className="flex items-center justify-center gap-6 text-sm text-white/90 pt-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('noCreditCard') || 'Sans carte bancaire'}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  {t('cancelAnytime') || 'Annulation libre'}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-white/80 mb-4">
                {t('needHelp') || 'Besoin d\'aide pour choisir ?'}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors text-sm font-semibold"
              >
                {common('contactUs')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}