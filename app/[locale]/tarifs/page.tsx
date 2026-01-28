'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculatePrice, getTierRange, BillingPeriod, CUSTOM_PRICING_THRESHOLD, VAT_RATE, MODULES } from '@/lib/pricing-config';
import { COLORS } from '@/lib/design-config';

export default function TarifsPage() {
  const t = useTranslations('pricingPage');
  const common = useTranslations('common');
  const trialT = useTranslations('trialPage');
  const locale = useLocale();
  
  const [logements, setLogements] = useState(5);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [isParticulier, setIsParticulier] = useState(false);
  const [addComptabilite, setAddComptabilite] = useState(false);
  const [addVentesAdditionnelles, setAddVentesAdditionnelles] = useState(false);
  const [logementsVentesAdditionnelles, setLogementsVentesAdditionnelles] = useState(1);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    role: '',
    logements: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const priceData = calculatePrice(logements, billingPeriod, {
    addComptabilite,
    addVentesAdditionnelles,
    ventesLogements: logementsVentesAdditionnelles,
    isParticulier
  });
  const isCustomPricing = logements > CUSTOM_PRICING_THRESHOLD;
  const factor = isParticulier ? 1 + VAT_RATE : 1;
  
  // Utiliser les données de la config centralisée
  const baseMonthly = priceData?.totalMonth ?? 0;
  const comptaMonthly = priceData?.totalComptabilite ?? 0;
  const ventesMonthly = priceData?.totalVentes ?? 0;
  const totalMonthly = baseMonthly + comptaMonthly + ventesMonthly;
  const total = billingPeriod === 'annual' ? totalMonthly * 12 : totalMonthly;
  const moduleComptabiliteUnit = MODULES.comptabilite.pricePerUnit * factor;
  const moduleVentesUnit = MODULES.ventesAdditionnelles.pricePerUnit * factor;
  const pricePerLogementDisplay = isCustomPricing ? null : priceData ? priceData.pricePerMonth * factor : null;
  const totalDisplay = isCustomPricing ? null : total * factor;
  const totalMonthlyDisplay = isCustomPricing ? null : totalMonthly * factor;
  const lastUpdate = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date());

  const vatLabel = isParticulier ? t('incl') : t('excl');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        role: '',
        logements: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

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
                <span className="text-3xl">💰</span>
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
                  onChange={(e) => setLogements(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  style={{
                    background: `linear-gradient(to right, ${COLORS.primary} 0%, ${COLORS.primary} ${((logements - 1) / 249) * 100}%, #e5e7eb ${((logements - 1) / 249) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <input
                  type="number"
                  min="1"
                  value={logements}
                  onChange={(e) => {
                    setLogements(Number(e.target.value));
                  }}
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

            {/* Modules additionnels */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                {t('additionalOptions')}
              </label>
              <div className="space-y-4">
                <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-primary transition">
                  <input
                    type="checkbox"
                    checked={addComptabilite}
                    onChange={(e) => setAddComptabilite(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-900">{t('accountingModule')}</p>
                        <p className="text-sm text-gray-600">{t('accountingDesc')}</p>
                      </div>
                        <span className="font-semibold text-primary whitespace-nowrap">+{moduleComptabiliteUnit.toFixed(2)}€ {t('perPropertyPerMonth')} {vatLabel}</span>
                    </div>
                    {addComptabilite && (
                      <p className="text-sm text-gray-600 mt-2">{t('appliedTo', { count: logements })}</p>
                    )}
                  </div>
                </label>

                <div className="p-4 border rounded-lg hover:border-primary transition">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addVentesAdditionnelles}
                      onChange={(e) => setAddVentesAdditionnelles(e.target.checked)}
                      className="mt-1 w-5 h-5 accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-900">{t('salesModule')}</p>
                          <p className="text-sm text-gray-600">{t('salesDesc')}</p>
                        </div>
                        <span className="font-semibold text-primary whitespace-nowrap">+{moduleVentesUnit.toFixed(2)}€ {t('perPropertyPerMonth')} {vatLabel}</span>
                      </div>

                      {addVentesAdditionnelles && (
                        <div className="mt-3 flex items-center gap-3">
                          <label className="text-sm text-gray-700 font-semibold">{t('propertiesConcerned')} :</label>
                          <input
                            type="number"
                            min={1}
                            max={logements}
                            value={logementsVentesAdditionnelles}
                            onChange={(e) => setLogementsVentesAdditionnelles(Math.max(1, Math.min(logements, Number(e.target.value) || 1)))}
                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <span className="text-sm text-gray-600">/ {logements} {logements > 1 ? common('properties') : common('property')}</span>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-white rounded-lg p-6 border-2 border-primary">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Par logement */}
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-3">
                    {t('perProperty')}
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
                    ) : priceData ? (
                      <>
                        <p className="text-3xl md:text-4xl font-black text-primary">
                          {pricePerLogementDisplay?.toFixed(2)}€
                        </p>
                        <p className="text-sm text-gray-600">{t('perMonthLabel')} {vatLabel}</p>
                      </>
                    ) : null}
                  </div>
                </div>

                {/* Total */}
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-3">
                    {t('totalEstimated')} {billingPeriod === 'monthly' ? `${t('perMonth')} (${vatLabel})` : `${t('annualPayment')} (${vatLabel})`}
                  </p>
                  <div className="space-y-2">
                    {isCustomPricing ? (
                      <>
                        <p className="text-3xl md:text-4xl font-black text-primary">
                          {t('customQuote')}
                        </p>
                        <p className="text-sm text-gray-600">
                          {logements > 1 ? t('forPropertiesPlural', { count: logements }) : t('forProperties', { count: logements })}
                        </p>
                      </>
                    ) : priceData ? (
                      <>
                        <p className="text-3xl md:text-4xl font-black text-primary">
                          {totalDisplay?.toFixed(2)}€
                        </p>
                        <p className="text-sm text-gray-600">
                          {billingPeriod === 'monthly'
                            ? `${logements > 1 ? t('forPropertiesPlural', { count: logements }) : t('forProperties', { count: logements })} ${t('modulesIncluded')}`
                            : `${t('annualPayment')} ${vatLabel} ${logements > 1 ? t('forPropertiesPlural', { count: logements }) : t('forProperties', { count: logements })} ${t('modulesIncluded')}`}
                        </p>
                        {billingPeriod === 'annual' && (
                          <p className="text-xs text-gray-500">{t('annualDiscountNote')}</p>
                        )}
                      </>
                    ) : null}
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
              
              <div className="space-y-6">
                {/* Forfait Base */}
                <div>
                  <h4 className="font-bold text-primary mb-4">📦 {t('basePlan')}</h4>
                  <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                    {Object.values(t.raw('baseFeatures') as Record<string, string>).map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-primary font-bold mt-0.5">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module Comptabilité */}
                <div>
                  <h4 className="font-bold text-primary mb-4">📊 {t('accountingModule')} <span className="text-sm text-gray-600">(+{moduleComptabiliteUnit.toFixed(2)}€ {t('perPropertyPerMonth')})</span></h4>
                  <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                    {Object.values(t.raw('accountingFeatures') as Record<string, string>).map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-primary font-bold mt-0.5">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module Ventes */}
                <div>
                  <h4 className="font-bold text-primary mb-4">🛍️ {t('salesModule')} <span className="text-sm text-gray-600">(+{moduleVentesUnit.toFixed(2)}€ {t('perPropertyPerMonth')})</span></h4>
                  <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                    {Object.values(t.raw('salesFeatures') as Record<string, string>).map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-primary font-bold mt-0.5">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support et Services */}
                <div>
                  <h4 className="font-bold text-primary mb-4">🤝 {t('supportServices')}</h4>
                  <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                    {Object.values(t.raw('supportFeatures') as Record<string, string>).map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-primary font-bold mt-0.5">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full bg-white rounded-2xl shadow-2xl p-6 md:p-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('formTitle')}</h3>
            
            {/* Success Message */}
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold text-center text-sm">
                  ✅ {t('formSuccess')}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Prénom & Nom */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-2">
                    {trialT('form.firstName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-2">
                    {trialT('form.lastName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  {trialT('form.email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-2">
                  {trialT('form.phone')}
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm"
                />
              </div>

              {/* Role & Logements */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                    {trialT('form.youAre')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white text-sm"
                  >
                    <option value="">{trialT('form.select')}</option>
                    <option value="gestionnaire">{trialT('form.manager')}</option>
                    <option value="proprietaire">{trialT('form.owner')}</option>
                    <option value="autre">{trialT('form.other')}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="logements" className="block text-sm font-semibold text-gray-700 mb-2">
                    {trialT('form.numberOfProperties')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="logements"
                    name="logements"
                    value={formData.logements}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white text-sm"
                  >
                    <option value="">{trialT('form.select')}</option>
                    <option value="1-3">{trialT('form.range1_3')}</option>
                    <option value="4-10">{trialT('form.range4_10')}</option>
                    <option value="11-50">{trialT('form.range11_50')}</option>
                    <option value="51-100">{trialT('form.range51_100')}</option>
                    <option value="100+">{trialT('form.range100plus')}</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  {trialT('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder={trialT('form.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {loading ? t('loading') : t('getPricing')}
              </button>

              {/* Reassurance Text */}
              <div className="flex items-center justify-center gap-6 text-xs text-gray-600 pt-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('transparentPricing')}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                  </svg>
                  {t('monthlyBilling')}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('infoNoCommitment')}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}