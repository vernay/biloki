'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { CONTACT_EMAIL, SUPPORT_PHONE } from '@/lib/config';
import RelatedPages from '@/components/ui/RelatedPages';
import { useLocale } from 'next-intl';
import { trackContactFormSubmit } from '@/lib/tracking';

export default function ContactContent() {
  const t = useTranslations('contactPage');
  const tCommon = useTranslations('common');
  const relatedT = useTranslations('relatedPages');
  const locale = useLocale();
  const formattedSupportPhone = (() => {
    const digits = SUPPORT_PHONE.replace(/\D/g, '');
    const normalized = digits.startsWith('33') ? `0${digits.slice(2)}` : digits;
    const withLeadingZero = normalized.startsWith('0') ? normalized : `0${normalized}`;
    return withLeadingZero.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
  })();

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    raison: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Track contact form submission
        trackContactFormSubmit(formData.raison || 'general', 'contact_page');
        
        setSubmitted(true);
        setFormData({
          prenom: '',
          nom: '',
          email: '',
          telephone: '',
          entreprise: '',
          raison: '',
          message: ''
        });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert('Error: ' + (data.error || 'Unable to send message'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const faqItems = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
  ];

  // JSON-LD pour SEO FAQ
  useEffect(() => {
    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqJsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [faqItems]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Back button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary mb-12 font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {tCommon('back')}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Email Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">{t('email')}</h3>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="block text-center text-primary hover:text-blue-600 font-semibold text-lg transition"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="text-sm text-gray-600 text-center mt-2">{t('responseTime')}</p>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">{t('phone')}</h3>
              <a
                href={`tel:${SUPPORT_PHONE}`}
                className="block text-center text-primary hover:text-blue-600 font-semibold text-lg transition"
              >
                {formattedSupportPhone}
              </a>
              <p className="text-sm text-gray-600 text-center mt-2">{t('availableDuring')}</p>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">{t('hours')}</h3>
              <p className="text-center text-gray-700 font-semibold">
                {t('weekDays')}
              </p>
              <p className="text-center text-primary font-semibold text-lg">
                {t('workHours')}
              </p>
              <p className="text-sm text-gray-600 text-center mt-2">{t('timezone')}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('formTitle')}</h2>
            <p className="text-gray-600 mb-8">{t('formDescription')}</p>

            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
                <p className="text-green-800 font-semibold">✓ {t('messageSent')}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="prenom" className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('firstName')} *
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="nom" className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('lastName')} *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('emailLabel')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="telephone" className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('phoneLabel')} *
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="entreprise" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('company')}
                </label>
                <input
                  type="text"
                  id="entreprise"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="raison" className="block text-sm font-semibold text-gray-900 mb-2">
                  Raison du contact *
                </label>
                <select
                  id="raison"
                  name="raison"
                  value={formData.raison}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
                  required
                >
                  <option value="">Sélectionnez une option...</option>
                  <option value="Demande de démo">Demande de démo</option>
                  <option value="Support technique">Support technique</option>
                  <option value="Question générale">Question générale</option>
                  <option value="Demande de partenariat API">Demande de partenariat API</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? tCommon('sending') : tCommon('sendMessage')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('faqTitle')}</h2>
            <p className="text-lg text-gray-600">{t('faqDescription')}</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
                <summary className="flex items-center justify-between font-bold text-gray-900 text-lg">
                  <span>{item.q}</span>
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-gray-600 mt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Pages connexes pour SEO */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
        <RelatedPages
          title={tCommon('relatedPages')}
          links={[
            {
              href: `/${locale}/tarifs`,
              title: relatedT('pricing.title'),
              description: relatedT('pricing.description')
            },
            {
              href: `/${locale}/reserver-demo`,
              title: relatedT('demo.title'),
              description: relatedT('demo.description')
            },
            {
              href: `/${locale}/commencer-gratuitement`,
              title: relatedT('trial.title'),
              description: relatedT('trial.description')
            },
            {
              href: `/${locale}/fonctionnalites/pms`,
              title: relatedT('pms.title'),
              description: relatedT('pms.description')
            },
            {
              href: `/${locale}/blog`,
              title: relatedT('blog.title'),
              description: relatedT('blog.description')
            },
            {
              href: `/${locale}/equipe`,
              title: 'Notre équipe',
              description: 'Découvrez les personnes derrière Biloki'
            }
          ]}
        />
      </section>
    </main>
  );
}
