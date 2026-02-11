'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function ReserverDemoPage() {
  const t = useTranslations('demoPage');
  const common = useTranslations('common');
  
  const [formData, setFormData] = useState({
    email: '',
    language: '',
    role: '',
    logements: ''
  });
  const [showCalendly, setShowCalendly] = useState(false);

  const parsePropertyCount = (value: string): number | undefined => {
    if (!value) return undefined;
    if (value.includes('-')) {
      const parts = value.split('-');
      const upper = Number.parseInt(parts[1], 10);
      return Number.isNaN(upper) ? undefined : upper;
    }
    if (value.endsWith('+')) {
      const base = Number.parseInt(value.replace('+', ''), 10);
      return Number.isNaN(base) ? undefined : base;
    }
    const num = Number.parseInt(value, 10);
    return Number.isNaN(num) ? undefined : num;
  };

  useEffect(() => {
    // Charger le script Calendly seulement si le formulaire est soumis
    if (showCalendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [showCalendly]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const propertyCount = parsePropertyCount(formData.logements);

    try {
      await fetch('/api/hubspot/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          language: formData.language,
          role: formData.role,
          propertyCount,
          source: 'reserver_demo',
        }),
      });
    } catch (error) {
      console.error('Erreur HubSpot:', error);
    }
    setShowCalendly(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logos/biloki-logo-full.svg" alt="Biloki" className="h-16 md:h-20" />
        </div>

        {/* Back button */}
        <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary mb-12 font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {common('back')}
        </a>

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

          {/* Right Side - Form or Calendly */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {!showCalendly ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('yourInfo')}</h3>
                
                {/* Email + Langue */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('form.email')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white text-sm"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="language" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('form.language')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white text-sm"
                    >
                      <option value="">{t('form.select')}</option>
                      <option value="fr">Francais</option>
                      <option value="en">English</option>
                      <option value="es">Espanol</option>
                      <option value="pt">Portugues</option>
                    </select>
                  </div>
                </div>

                {/* Role & Logements */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('form.youAre')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white text-sm"
                    >
                      <option value="">{t('form.select')}</option>
                      <option value="gestionnaire">{t('form.manager')}</option>
                      <option value="proprietaire">{t('form.owner')}</option>
                      <option value="autre">{t('form.other')}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="logements" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('form.numberOfProperties')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="logements"
                      name="logements"
                      value={formData.logements}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white text-sm"
                    >
                      <option value="">{t('form.select')}</option>
                      <option value="1-3">{t('form.range1_3')}</option>
                      <option value="4-10">{t('form.range4_10')}</option>
                      <option value="11-50">{t('form.range11_50')}</option>
                      <option value="51-100">{t('form.range51_100')}</option>
                      <option value="100+">{t('form.range100plus')}</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 text-base mt-4"
                >
                  {t('form.continue')}
                </button>
              </form>
            ) : (
              <div 
                className="calendly-inline-widget"
                data-url={`https://calendly.com/g-vernay-biloki/demonstration-biloki?hide_event_type_details=1&email=${encodeURIComponent(formData.email)}&a1=${encodeURIComponent(formData.language)}`}
                style={{ minWidth: '100%', height: '650px' }}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
