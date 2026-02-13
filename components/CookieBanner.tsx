'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const CONSENT_KEY = 'biloki_cookie_consent';

export default function CookieBanner() {
  const t = useTranslations('cookieBanner');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setIsVisible(true);
    }
  }, []);

  const setConsent = (value: 'accepted' | 'refused' | 'custom') => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CONSENT_KEY, value);
    document.cookie = `${CONSENT_KEY}=${value}; Max-Age=31536000; Path=/; SameSite=Lax`;
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-6">
        <div className="rounded-lg bg-white shadow-2xl border border-gray-200 p-6 md:p-8 flex flex-col gap-6">
          <div className="space-y-3 text-sm text-gray-700">
            <p>{t('message')}</p>
            <p>{t('consentTitle')}</p>
            <p>{t('consentNote')}</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/mentions-legales" className="text-primary font-semibold hover:underline">
                {t('privacyPolicy')}
              </Link>
              <Link href="/cookies" className="text-primary font-semibold hover:underline">
                {t('cookieDeclaration')}
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <button
              type="button"
              onClick={() => setConsent('custom')}
              className="w-full md:w-auto px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              {t('choose')}
            </button>
            <button
              type="button"
              onClick={() => setConsent('refused')}
              className="w-full md:w-auto px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              {t('refuse')}
            </button>
            <button
              type="button"
              onClick={() => setConsent('accepted')}
              className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition"
            >
              {t('acceptAll')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
