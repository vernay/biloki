'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FREE_TRIAL_DAYS_LABEL } from '@/lib/pricing-config';

export default function LandingPage() {
  const t = useTranslations('landingPage');
  const common = useTranslations('common');
  
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setFormData({ nom: '', email: '', telephone: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {common('back')}
          </Link>
          <img src="/logos/biloki-logo-full.svg" alt="Biloki" className="h-8" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-20 pb-16 px-6 bg-gradient-to-br from-white via-white to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-100 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            ✨ {t('badge')}
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {t('heroTitle')} <span className="text-primary">{t('heroHighlight')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 px-8 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
            >
              {t('bookFreeDemo')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              {t('noCommitment')}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              {t('demoIn15Min')}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              {t('noTrainingRequired')}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLÈMES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            {t('problemsTitle')}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '📧',
                title: t('problems.messaging.title'),
                desc: t('problems.messaging.desc')
              },
              {
                icon: '📅',
                title: t('problems.calendars.title'),
                desc: t('problems.calendars.desc')
              },
              {
                icon: '👥',
                title: t('problems.providers.title'),
                desc: t('problems.providers.desc')
              },
              {
                icon: '💰',
                title: t('problems.billing.title'),
                desc: t('problems.billing.desc')
              },
              {
                icon: '🔐',
                title: t('problems.access.title'),
                desc: t('problems.access.desc')
              },
              {
                icon: '📊',
                title: t('problems.reporting.title'),
                desc: t('problems.reporting.desc')
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-20 px-6 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            {t('solutionsTitle')} <span className="text-primary">{t('solutionsTitleHighlight')}</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '💬',
                title: t('solutions.messaging.title'),
                desc: t('solutions.messaging.desc')
              },
              {
                icon: '📡',
                title: t('solutions.ota.title'),
                desc: t('solutions.ota.desc')
              },
              {
                icon: '🤖',
                title: t('solutions.automation.title'),
                desc: t('solutions.automation.desc')
              },
              {
                icon: '💳',
                title: t('solutions.billing.title'),
                desc: t('solutions.billing.desc')
              },
              {
                icon: '🔓',
                title: t('solutions.locks.title'),
                desc: t('solutions.locks.desc')
              },
              {
                icon: '📈',
                title: t('solutions.dashboard.title'),
                desc: t('solutions.dashboard.desc')
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border-2 border-primary shadow-sm">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GÉRER VOS SÉJOURS SANS EFFORT */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
            {t('manageTitle')} <span className="text-primary">{t('manageTitleHighlight')}</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('managerInterface')}</h3>
                <img src="/images/interfaces/gestionnaire.png" alt={t('managerInterface')} className="w-full rounded-xl shadow-lg border border-gray-200" />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('tenantInterface')}</h3>
                <img src="/images/interfaces/locataire.png" alt={t('tenantInterface')} className="w-full rounded-xl shadow-lg border border-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS & PROOF */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t('statsTitle')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
            <div>
              <div className="text-5xl font-black text-primary mb-2">{t('stats.concierges.value')}</div>
              <p className="text-gray-700 font-semibold">{t('stats.concierges.label')}</p>
            </div>
            <div>
              <div className="text-5xl font-black text-primary mb-2">{t('stats.properties.value')}</div>
              <p className="text-gray-700 font-semibold">{t('stats.properties.label')}</p>
            </div>
            <div>
              <div className="text-5xl font-black text-primary mb-2">{t('stats.timeSaved.value')}</div>
              <p className="text-gray-700 font-semibold">{t('stats.timeSaved.label')}</p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border border-blue-100">
            <div className="flex gap-4 mb-4">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-lg text-gray-900 mb-4 italic">
              "{t('testimonial.quote')}"
            </p>
            <p className="font-bold text-gray-900">{t('testimonial.author')}</p>
            <p className="text-sm text-gray-600">{t('testimonial.role')}</p>
          </div>
        </div>
      </section>

      {/* DEMO FORM */}
      <section id="demo" className="py-20 px-6 bg-primary">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-3 text-center">
            {t('demoTitle')}
          </h2>
          <p className="text-white/90 text-center mb-10 text-lg">
            {t('demoDescription')}
          </p>

          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold text-center">
                  ✅ {t('form.successMessage')}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('form.fullName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    placeholder={t('form.namePlaceholder')}
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('form.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t('form.emailPlaceholder')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.phone')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  placeholder={t('form.phonePlaceholder')}
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-4 px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {loading ? t('form.sending') : t('form.submitButton')}
              </button>

              <p className="text-center text-xs text-gray-600">
                {t('form.disclaimer')}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Quick */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">{t('faqTitle')}</h2>

          <div className="space-y-4">
            {[
              {
                q: t('faq.integration.q'),
                a: t('faq.integration.a')
              },
              {
                q: t('faq.trial.q'),
                a: t('faq.trial.a', { days: FREE_TRIAL_DAYS_LABEL })
              },
              {
                q: t('faq.ota.q'),
                a: t('faq.ota.a')
              },
              {
                q: t('faq.security.q'),
                a: t('faq.security.a')
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-700 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-primary rounded-[48px] text-center text-white p-12 md:p-16 shadow-xl">
          <h2 className="text-4xl font-bold mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {t('ctaDescription')}
          </p>
          <a
            href="#demo"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 text-lg shadow-md"
          >
            {t('bookFreeDemo')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8 px-6 text-center text-gray-600 text-sm">
        <p>{t('footerCopyright')}</p>
      </footer>
    </main>
  );
}
