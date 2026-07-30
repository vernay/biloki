'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export default function CompleterContent() {
  const t = useTranslations('subscribeCompletePage');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    role: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ prenom: '', nom: '', email: '', telephone: '', entreprise: '', role: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href={`/${locale}/s-abonner`} className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8 font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('back')}
        </Link>

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full mb-6 text-sm font-semibold">
            {t('badge')}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>
          <p className="text-gray-600 mb-8">{t('description')}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">{t('form.firstName')} *</label>
                <input
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('form.firstNamePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">{t('form.lastName')} *</label>
                <input
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('form.lastNamePlaceholder')}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">{t('form.email')} *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('form.emailPlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">{t('form.phone')}</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('form.phonePlaceholder')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">{t('form.company')} *</label>
              <input
                name="entreprise"
                value={formData.entreprise}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('form.companyPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">{t('form.role')} *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              >
                <option value="">{t('form.selectRole')}</option>
                <option value="gestionnaire">{t('form.roles.manager')}</option>
                <option value="proprietaire-particulier">{t('form.roles.owner')}</option>
                <option value="autre">{t('form.roles.other')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">{t('form.message')}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder={t('form.messagePlaceholder')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('form.processing')}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  {t('form.submit')}
                </>
              )}
            </button>

            {submitted && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center font-semibold">
                ✓ {t('success')}
              </div>
            )}
          </form>

          <p className="text-center text-gray-600 text-sm mt-8">
            {t('privacy')}
          </p>
        </div>
      </div>
    </main>
  );
}
