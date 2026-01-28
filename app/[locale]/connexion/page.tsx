'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ConnexionPage() {
  const t = useTranslations('loginPage');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Simulate login
    setTimeout(() => {
      setLoading(false);
      setMessage(t('successMessage'));
      setEmail('');
      setPassword('');
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src="/logos/logo.svg" alt="Biloki" className="h-24 md:h-32" />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('description')}
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-semibold text-center text-sm">
              {message}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              {t('email')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder={t('emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              {t('password')} <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder={t('passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-primary" />
              <span className="text-gray-700">{t('rememberMe')}</span>
            </label>
            <a href="#" className="text-primary hover:underline font-semibold">
              {t('forgotPassword')}
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t('loggingIn') : t('loginButton')}
          </button>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600">{t('or')}</span>
            </div>
          </div>

          {/* Sign up link */}
          <div className="text-center text-sm">
            <p className="text-gray-600">
              {t('noAccount')}{' '}
              <Link href="/commencer-gratuitement" className="text-primary hover:underline font-bold">
                {t('createAccount')}
              </Link>
            </p>
          </div>
        </form>

        {/* Support link */}
        <div className="text-center mt-8">
          <Link href="/contact" className="text-sm text-gray-600 hover:text-primary font-semibold">
            {t('needHelp')}
          </Link>
        </div>
      </div>
    </main>
  );
}
