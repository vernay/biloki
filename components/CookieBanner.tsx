'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const CONSENT_KEY = 'biloki_cookie_consent';
const OPEN_EVENT = 'biloki:open-cookie-banner';
// 13 mois, conformément aux recommandations de la CNIL
const CONSENT_MAX_AGE_SECONDS = 13 * 30 * 24 * 60 * 60;

interface CookieConsent {
  analytics: boolean;
  ads: boolean;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>;
  }
}

function updateGtagConsent(consent: CookieConsent) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push([
    'consent',
    'update',
    {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.ads ? 'granted' : 'denied',
      ad_user_data: consent.ads ? 'granted' : 'denied',
      ad_personalization: consent.ads ? 'granted' : 'denied',
    },
  ]);
}

function readStoredConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(CONSENT_KEY);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored);
    if (typeof parsed.analytics === 'boolean' && typeof parsed.ads === 'boolean') {
      return parsed;
    }
  } catch {
    // Anciennes valeurs ('accepted' | 'refused' | 'custom') : on redemande le consentement
  }
  return null;
}

function persistConsent(consent: CookieConsent) {
  if (typeof window === 'undefined') return;
  const value = JSON.stringify(consent);
  window.localStorage.setItem(CONSENT_KEY, value);
  document.cookie = `${CONSENT_KEY}=${encodeURIComponent(value)}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
  updateGtagConsent(consent);
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function CookieBanner() {
  const t = useTranslations('cookieBanner');
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent>({ analytics: false, ads: false });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = readStoredConsent();
    if (!stored) {
      setIsVisible(true);
    } else {
      setPreferences(stored);
    }

    const handleReopen = () => {
      setPreferences(readStoredConsent() ?? { analytics: false, ads: false });
      setShowPreferences(true);
      setIsVisible(true);
    };
    window.addEventListener(OPEN_EVENT, handleReopen);
    return () => window.removeEventListener(OPEN_EVENT, handleReopen);
  }, []);

  const closeWith = (consent: CookieConsent) => {
    persistConsent(consent);
    setPreferences(consent);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const acceptAll = () => closeWith({ analytics: true, ads: true });
  const refuseAll = () => closeWith({ analytics: false, ads: false });
  const savePreferences = () => closeWith(preferences);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-6">
        <div className="rounded-lg bg-white shadow-2xl border border-gray-200 p-6 md:p-8 flex flex-col gap-6">
          {!showPreferences ? (
            <>
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
                  onClick={() => setShowPreferences(true)}
                  className="w-full md:w-auto px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  {t('choose')}
                </button>
                <button
                  type="button"
                  onClick={refuseAll}
                  className="w-full md:w-auto px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  {t('refuse')}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition"
                >
                  {t('acceptAll')}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4 text-sm text-gray-700">
                <p className="font-semibold text-base text-gray-900">{t('consentTitle')}</p>
                <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="font-semibold text-gray-900">{t('analyticsLabel')}</p>
                    <p className="text-gray-600">{t('analyticsDescription')}</p>
                  </div>
                  <Toggle
                    checked={preferences.analytics}
                    onChange={(value) => setPreferences((prev) => ({ ...prev, analytics: value }))}
                    label={t('analyticsLabel')}
                  />
                </div>
                <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="font-semibold text-gray-900">{t('adsLabel')}</p>
                    <p className="text-gray-600">{t('adsDescription')}</p>
                  </div>
                  <Toggle
                    checked={preferences.ads}
                    onChange={(value) => setPreferences((prev) => ({ ...prev, ads: value }))}
                    label={t('adsLabel')}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  className="w-full md:w-auto px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  {t('back')}
                </button>
                <button
                  type="button"
                  onClick={savePreferences}
                  className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition"
                >
                  {t('savePreferences')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
