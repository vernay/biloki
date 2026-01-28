'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { calculatePrice, BillingPeriod, VAT_RATE, MODULES } from '@/lib/pricing-config';

export default function SAbonnerPage() {
  const t = useTranslations('subscribePage');
  const common = useTranslations('common');
  
  const [logements, setLogements] = useState(5);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [isParticulier, setIsParticulier] = useState(false);
  const [addComptabilite, setAddComptabilite] = useState(false);
  const [addVentesAdditionnelles, setAddVentesAdditionnelles] = useState(false);
  const [logementVentesAdditionnelles, setLogementVentesAdditionnelles] = useState(1);

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    role: '',
    entreprise: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const priceData = calculatePrice(logements, billingPeriod, {
    addComptabilite,
    addVentesAdditionnelles,
    ventesLogements: logementVentesAdditionnelles,
    isParticulier
  });
  const factor = isParticulier ? 1 + VAT_RATE : 1;

  // Utiliser les données de la config centralisée
  const basePriceMonthly = priceData?.totalMonth ?? 0;
  const basePrice = billingPeriod === 'annual' ? basePriceMonthly * 12 : basePriceMonthly;
  const comptabilitePrice = priceData?.totalComptabilite ?? 0;
  const ventesAddPrice = priceData?.totalVentes ?? 0;
  const totalPrice = basePrice + comptabilitePrice + ventesAddPrice;
  const basePriceDisplay = basePrice * factor;
  const comptabilitePriceDisplay = comptabilitePrice * factor;
  const ventesAddPriceDisplay = ventesAddPrice * factor;
  const totalPriceDisplay = totalPrice * factor;
  const moduleComptaUnit = MODULES.comptabilite.pricePerUnit * factor;
  const moduleVentesUnit = MODULES.ventesAdditionnelles.pricePerUnit * factor;
  const taxLabel = isParticulier ? t('ttc') : t('ht');

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
        entreprise: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const features = [
    t('features.pms'),
    t('features.channelManager'),
    t('features.pricing'),
    t('features.ota'),
    t('features.messaging'),
    t('features.locks'),
    t('features.reporting'),
    t('features.interfaces'),
    t('features.api'),
    t('features.support'),
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary mb-12 font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {common('back')}
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-primary px-4 py-2 rounded-full mb-6 font-semibold text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t('badge')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Configurateur */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('priceConfigurator')}</h2>

              {/* Nombre de logements */}
              <div className="mb-10">
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  {t('numberOfProperties')} : <span className="text-primary text-2xl font-bold">{logements}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={logements}
                  onChange={(e) => setLogements(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1</span>
                  <span>50</span>
                  <span>100</span>
                  <span>200</span>
                </div>
              </div>

              {/* Ou input direct */}
              <div className="mb-10">
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={logements}
                  onChange={(e) => setLogements(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder={t('enterDirectly')}
                />
              </div>

              {/* Billing Period */}
              <div className="mb-10 pb-10 border-b border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-4">{t('billing')}</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      billingPeriod === 'monthly'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {t('monthly')}
                  </button>
                  <button
                    onClick={() => setBillingPeriod('annual')}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all relative ${
                      billingPeriod === 'annual'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {t('annual')}
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {t('annualSavings')}
                    </span>
                  </button>
                </div>
              </div>

              {/* Type de client */}
              <div className="mb-10 pb-10 border-b border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-4">{t('clientType')}</label>
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

              {/* Fonctionnalités incluses */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('includedFeatures')}</h3>
                <ul className="space-y-3">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Options supplémentaires */}
              <div className="border-t border-gray-200 pt-10">
                <h3 className="text-lg font-bold text-gray-900 mb-6">{t('additionalOptions')}</h3>

                {/* Option 1: Comptabilité */}
                <div className="mb-6 p-4 rounded-xl border-2 border-gray-200 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={addComptabilite}
                          onChange={(e) => setAddComptabilite(e.target.checked)}
                          className="w-5 h-5 accent-primary"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{t('accountingModule')}</h4>
                          <p className="text-sm text-gray-600">{t('accountingDesc')}</p>
                        </div>
                      </label>
                    </div>
                    <span className="font-bold text-primary whitespace-nowrap ml-4">
                      +{moduleComptaUnit.toFixed(2)}€ /log/mois {taxLabel}
                    </span>
                  </div>
                  {addComptabilite && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
                      {t('applyToAll', { count: logements })} = 
                      <span className="font-semibold text-primary"> {(logements * moduleComptaUnit).toFixed(2)}€ /mois {taxLabel}</span>
                    </div>
                  )}
                </div>

                {/* Option 2: Ventes additionnelles */}
                <div className="p-4 rounded-xl border-2 border-gray-200 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <label className="flex items-center gap-3 cursor-pointer mb-3">
                        <input
                          type="checkbox"
                          checked={addVentesAdditionnelles}
                          onChange={(e) => setAddVentesAdditionnelles(e.target.checked)}
                          className="w-5 h-5 accent-primary"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{t('salesModule')}</h4>
                          <p className="text-sm text-gray-600">{t('salesDesc')}</p>
                        </div>
                      </label>
                      {addVentesAdditionnelles && (
                        <div className="ml-8 mt-3 flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                          <label className="text-sm font-semibold text-gray-700">{t('propertiesWithModule')} :</label>
                          <input
                            type="number"
                            min="1"
                            max={logements}
                            value={logementVentesAdditionnelles}
                            onChange={(e) => setLogementVentesAdditionnelles(parseInt(e.target.value) || 1)}
                            className="w-20 px-3 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-primary"
                          />
                          <span className="text-sm text-gray-600">{t('of')} {logements}</span>
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-primary whitespace-nowrap ml-4">
                      +{moduleVentesUnit.toFixed(2)}€ /log/mois {taxLabel}
                    </span>
                  </div>
                  {addVentesAdditionnelles && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
                      {t('applyTo', { count: logementVentesAdditionnelles })} = 
                      <span className="font-semibold text-primary"> {(logementVentesAdditionnelles * moduleVentesUnit).toFixed(2)}€ /mois {taxLabel}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Résumé et Formulaire */}
          <div className="lg:col-span-1">
            {/* Résumé des prix */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">{t('orderSummary')}</h3>

              <div className="space-y-4 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>{t('propertiesCount', { count: logements })}</span>
                  <span className="font-semibold text-gray-900">{basePriceDisplay.toFixed(2)}€ {taxLabel}</span>
                </div>

                {addComptabilite && (
                  <div className="flex justify-between text-gray-700">
                    <span>{t('module')} {t('accountingLabel')}</span>
                    <span className="font-semibold text-gray-900">+{comptabilitePriceDisplay.toFixed(2)}€ {taxLabel}</span>
                  </div>
                )}

                {addVentesAdditionnelles && (
                  <div className="flex justify-between text-gray-700">
                    <span>{t('module')} {t('salesLabel')} ({logementVentesAdditionnelles} {t('propertiesLabel')})</span>
                    <span className="font-semibold text-gray-900">+{ventesAddPriceDisplay.toFixed(2)}€ {taxLabel}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between mb-6 pt-6">
                <span className="text-lg font-bold text-gray-900">{t('total')}</span>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{totalPriceDisplay.toFixed(2)}€ {taxLabel}</div>
                  <p className="text-sm text-gray-600">
                    {billingPeriod === 'monthly' ? t('perMonthLabel') : t('perYearLabel')} {taxLabel}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 text-sm text-gray-700 border border-green-200">
                <p className="font-semibold text-green-800">{t('firstMonthFree')}</p>
                <p>{billingPeriod === 'monthly' ? t('payFromSecondMonth') : t('payFromSecondMonthAnnual')}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700 mb-6">
                <p className="font-semibold text-gray-900 mb-2">{t('noCardRequired')}</p>
                <p>{t('securePayment')}</p>
              </div>

              <a
                href="/s-abonner/completer"
                className="inline-flex items-center justify-center w-full py-3 bg-primary text-white font-semibold rounded-lg hover:shadow-md hover:scale-[1.01] transition-all duration-300"
              >
                {t('completeRegistration')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
