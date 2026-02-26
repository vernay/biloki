'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { FREE_TRIAL_DAYS_LABEL } from '@/lib/pricing-config';
import RelatedPages from '@/components/ui/RelatedPages';

export default function CommencerGratuitementContent() {
  const t = useTranslations('trialPage');
  const common = useTranslations('common');
  const relatedT = useTranslations('relatedPages');
  const locale = useLocale();
  
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

    // Simulate form submission
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
      // Reset after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const features = [
    t('features.fullAccess'),
    t('features.calendarIntegration'),
    t('features.simplifiedBookings'),
    t('features.dedicatedSupport')
  ];

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('title')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t('subtitle')}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('enjoyTitle')}
              </h2>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {/* Success Message */}
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold text-center text-sm">
                  ✅ {t('successMessage')}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Prenom & Nom */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('form.firstName')} <span className="text-red-500">*</span>
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
                    {t('form.lastName')} <span className="text-red-500">*</span>
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
                  {t('form.email')} <span className="text-red-500">*</span>
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

              {/* Telephone */}
              <div>
                <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.phone')}
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

              {/* Row 3: Role & Logements */}
              <div className="grid grid-cols-2 gap-4">
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

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder={t('form.messagePlaceholder')}
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
                {loading ? t('form.starting') : t('form.startTrial')}
              </button>

              {/* Reassurance Text */}
              <div className="flex items-center justify-center gap-6 text-xs text-gray-600 pt-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {FREE_TRIAL_DAYS_LABEL}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  {t('features.noCard')}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('features.noCommitment')}
                </div>
              </div>
            </form>
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
              href: `/${locale}/fonctionnalites/pms`,
              title: relatedT('pms.title'),
              description: relatedT('pms.description')
            },
            {
              href: `/${locale}/fonctionnalites/channel-manager`,
              title: relatedT('channelManager.title'),
              description: relatedT('channelManager.description')
            },
            {
              href: `/${locale}/reserver-demo`,
              title: relatedT('demo.title'),
              description: relatedT('demo.description')
            },
            {
              href: `/${locale}/connexions-api`,
              title: relatedT('apiConnections.title'),
              description: relatedT('apiConnections.description')
            },
            {
              href: `/${locale}/blog`,
              title: relatedT('blog.title'),
              description: relatedT('blog.description')
            }
          ]}
          className="mt-16"
        />
      </div>
    </main>
  );
}
