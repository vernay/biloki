'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ConnexionsAPIPage() {
  const t = useTranslations('apiPage');
  const common = useTranslations('common');
  
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    objectif: '',
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
      const payload = {
        firstName: formData.prenom,
        lastName: formData.nom,
        email: formData.email,
        phone: formData.telephone,
        company: formData.entreprise,
        integrationObjective: formData.objectif,
        conversation: `Demande de connexion API\n\nObjectif: ${formData.objectif}\n\nMessage:\n${formData.message}`,
        source: 'formulaire_connexions_api',
        locale: 'fr',
        requestType: 'Demande de partenariat API',
      };

      console.log('📤 Envoi demande connexion API:', payload);

      const response = await fetch('/api/hubspot/create-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('📥 Réponse HubSpot:', result);

      if (response.ok) {
        console.log('✅ Demande envoyée avec succès');
        setSubmitted(true);
        setFormData({
          prenom: '',
          nom: '',
          email: '',
          telephone: '',
          entreprise: '',
          objectif: '',
          message: ''
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error('❌ Erreur lors de l\'envoi:', result);
        alert('Erreur lors de l\'envoi du formulaire');
      }
    } catch (error) {
      console.error('❌ Erreur:', error);
      alert('Erreur lors de l\'envoi du formulaire');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logos/biloki-logo-full.svg" alt="Biloki" className="h-16 md:h-20" />
        </div>

        {/* Back button */}
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary mb-12 font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {common('back')}
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Info */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Logo */}
            <div className="flex justify-start mb-8">
              <img src="/logos/biloki-logo-full.svg" alt="Biloki" className="h-12" />
            </div>

            {/* Team & Title */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-600 mb-2">{t('technicalTeam')}</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('integrationTitle')}</h2>
              
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">{t('duration')}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-8">
              {t('integrationDesc')}
            </p>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-700">{t('feature1')}</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-700">{t('feature2')}</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-700">{t('feature3')}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Demander une connexion API</h3>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
                <p className="text-green-800 font-semibold">✓ Votre demande a été envoyée avec succès ! Notre équipe vous contactera rapidement.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prenom" className="block text-sm font-semibold text-gray-900 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="nom" className="block text-sm font-semibold text-gray-900 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="telephone" className="block text-sm font-semibold text-gray-900 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="entreprise" className="block text-sm font-semibold text-gray-900 mb-2">
                  Entreprise
                </label>
                <input
                  type="text"
                  id="entreprise"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="objectif" className="block text-sm font-semibold text-gray-900 mb-2">
                  Objectif de la demande *
                </label>
                <select
                  id="objectif"
                  name="objectif"
                  value={formData.objectif}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                  required
                >
                  <option value="">Sélectionnez un objectif...</option>
                  <option value="Intégration Channel Manager">Intégration Channel Manager</option>
                  <option value="Intégration PMS">Intégration PMS</option>
                  <option value="Intégration OTA">Intégration OTA</option>
                  <option value="Intégration comptabilité">Intégration comptabilité</option>
                  <option value="Intégration paiement">Intégration paiement</option>
                  <option value="Intégration serrures">Intégration serrures connectées</option>
                  <option value="Autre intégration">Autre type d'intégration</option>
                  <option value="Devenir partenaire">Devenir partenaire API</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Décrivez votre projet d'intégration..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer la demande'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
