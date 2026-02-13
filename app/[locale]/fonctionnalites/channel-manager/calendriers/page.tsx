'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n/config';

export default function CalendriersPage() {
  const t = useTranslations('featuresPages.calendars');
  const tChannelManager = useTranslations('featuresPages.channelManager');
  const common = useTranslations('common');
  const pathname = usePathname();
  const pathLocale = pathname.split('/')[1] as Locale;
  const locale = locales.includes(pathLocale) ? pathLocale : 'fr';
  const withLocale = (href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return href;
    }
    if (href === '/') {
      return `/${locale}`;
    }
    if (href.startsWith(`/${locale}/`) || href === `/${locale}`) {
      return href;
    }
    return `/${locale}${href}`;
  };

  const benefitKeys = ['sync', 'time', 'centralize', 'commission', 'visibility', 'calendar'] as const;
  const benefitIcons = ['⚡', '⏰', '📊', '💰', '🎯', '📅'];
  
  const faqKeys = ['what', 'syncTime', 'platforms', 'doubleBooking'] as const;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#f8fbff] to-[#e9f5ff] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {t('description')}
            </p>

            

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href={withLocale('/commencer-gratuitement')}
                className="inline-block bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:opacity-90 transition text-center">
              >
                {common('startFreeTrial')}
              </Link>
              <Link
                href={withLocale('/reserver-demo')}
                className="inline-block border-2 border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-50 transition text-center">
              >
                {common('bookDemo')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Connexion avec les plateformes */}
        <div className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('sections.platforms.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('sections.platforms.description1')}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('sections.platforms.description2')}
              </p>
              <Link
                href={withLocale('/commencer-gratuitement')}
                className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition"
              >
                {common('startFreeTrial')}
              </Link>
            </div>
            <div className="bg-gradient-to-br from-[#f8fbff] to-[#e9f5ff] rounded-2xl p-8 border border-gray-200">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 flex items-center justify-center border border-gray-200">
                  <img src="/images/logo-partenaires/Airbnb.webp" alt="Airbnb" className="max-h-12 max-w-full object-contain" />
                </div>
                <div className="bg-white rounded-xl p-6 flex items-center justify-center border border-gray-200">
                  <img src="/images/logo-partenaires/Booking.com.png" alt="Booking.com" className="max-h-12 max-w-full object-contain" />
                </div>
                <div className="bg-white rounded-xl p-6 flex items-center justify-center border border-gray-200">
                  <img src="/images/logo-partenaires/vrbo.png" alt="Vrbo" className="max-h-12 max-w-full object-contain" />
                </div>
                <div className="bg-white rounded-xl p-6 flex items-center justify-center border border-gray-200">
                  <img src="/images/logo-partenaires/Expedia.png" alt="Expedia" className="max-h-12 max-w-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toutes vos réservations au même endroit */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-gradient-to-br from-[#f8fbff] to-[#e9f5ff] rounded-2xl p-12 border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">📋</div>
                <p className="text-gray-600 font-medium">{t('sections.centralized.visual')}</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('sections.centralized.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('sections.centralized.description1')}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('sections.centralized.description2')}
              </p>
              <Link
                href={withLocale('/commencer-gratuitement')}
                className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition"
              >
                {common('startFreeTrial')}
              </Link>
            </div>
          </div>
        </div>

        {/* Plus de visibilité */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('sections.visibility.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('sections.visibility.description1')}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('sections.visibility.description2')}
              </p>
              <Link
                href={withLocale('/commencer-gratuitement')}
                className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition"
              >
                {common('startFreeTrial')}
              </Link>
            </div>
            <div className="bg-gradient-to-br from-[#f8fbff] to-[#e9f5ff] rounded-2xl p-12 border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🚀</div>
                <p className="text-gray-600 font-medium">{t('sections.visibility.visual')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Avantages du Channel Manager */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            {t('benefits.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            {t('benefits.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefitKeys.map((key, index) => (
              <div key={key} className="text-center p-8">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-3xl">{benefitIcons[index]}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t(`benefits.items.${key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`benefits.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            {t('faq.title')}
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqKeys.map((key) => (
              <details key={key} className="bg-gray-50 rounded-2xl p-6 group">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{t(`faq.items.${key}.question`)}</span>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {t(`faq.items.${key}.answer`)}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-primary rounded-[48px] p-12 md:p-16 text-white text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={withLocale('/reserver-demo')}
              className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              {common('bookDemo')}
            </Link>
            <Link
              href={withLocale('/commencer-gratuitement')}
              className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              {common('startFreeTrial')}
            </Link>
          </div>
        </div>

        <div className="pt-10 pb-6 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={withLocale('/fonctionnalites/channel-manager')}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-primary font-semibold shadow-sm transition hover:bg-primary/10 hover:-translate-y-0.5"
            >
              {tChannelManager('title')}
              <span aria-hidden="true">{'>'}</span>
            </Link>
            <Link
              href={withLocale('/fonctionnalites/channel-manager/airbnb')}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-primary font-semibold shadow-sm transition hover:bg-primary/10 hover:-translate-y-0.5"
            >
              Connexion Airbnb
              <span aria-hidden="true">{'>'}</span>
            </Link>
            <Link
              href={withLocale('/fonctionnalites/channel-manager/booking')}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-primary font-semibold shadow-sm transition hover:bg-primary/10 hover:-translate-y-0.5"
            >
              Connexion Booking
              <span aria-hidden="true">{'>'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
