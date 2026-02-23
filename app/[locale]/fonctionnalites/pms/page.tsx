'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import RelatedPages from '@/components/ui/RelatedPages';
import LogosCarousel from '@/components/sections/LogosCarousel';

export default function PMSPage() {
  const t = useTranslations('featuresPages.pms');
  const common = useTranslations('common');
  const relatedT = useTranslations('relatedPages');
  const locale = useLocale();

  // Logos pour l'animation de la section Marketplace API
  const marketplaceLogos = [
    { src: "/images/logo-partenaires/Airbnb.webp", alt: "Airbnb" },
    { src: "/images/logo-partenaires/Booking.com.png", alt: "Booking.com" },
    { src: "/images/logo-partenaires/vrbo.png", alt: "Vrbo" },
    { src: "/images/logo-partenaires/Expedia.png", alt: "Expedia" },
    { src: "/images/logo-partenaires/Stripe.png", alt: "Stripe" },
    { src: "/images/logo-partenaires/paypal.png", alt: "PayPal" },
    { src: "/images/logo-partenaires/QuickBooks.png", alt: "QuickBooks" },
    { src: "/images/logo-partenaires/logo-pennylane.png", alt: "Pennylane" },
    { src: "/images/logo-partenaires/nuki.png", alt: "Nuki" },
    { src: "/images/logo-partenaires/YaleJPG.jpg", alt: "Yale" },
    { src: "/images/logo-partenaires/August.webp", alt: "August" },
    { src: "/images/logo-partenaires/Igloohome.png", alt: "Igloohome" },
    { src: "/images/logo-partenaires/HubSpot.png", alt: "HubSpot" },
  ];

  const sectionKeys = ['reservations', 'channelManager', 'operations', 'communication', 'access', 'reporting', 'marketplaceApi'] as const;
  const icons = ['📅', '🌐', '⚙️', '💬', '🔐', '💰', '📊'];

  const sections = sectionKeys.map((key, index) => ({
    title: t(`sections.${key}.title`),
    description: t(`sections.${key}.description`),
    icon: icons[index],
    features: t.raw(`sections.${key}.features`) as string[],
  }));

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        {/* Title with gradient */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">
          {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          {t('description')}
        </p>

        {/* Sections Grid */}
        <div className="space-y-16 md:space-y-20">
          {sections.map((section, index) => {
            const isReversed = index % 2 !== 0;
            // Pour la section Channel Manager (index 1), on donne beaucoup plus d'espace à l'image
            const gridClass = index === 1 
              ? "grid md:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-center"
              : "grid md:grid-cols-2 gap-10 lg:gap-14 items-center";
            
            return (
              <div
                key={index}
                className={gridClass}
              >
                {/* Contenu texte */}
                <div className={isReversed ? 'md:order-2' : ''}>
                  <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
                    {section.title}
                  </h2>
                  
                  <p className="text-gray-600 mt-3 text-base md:text-lg leading-relaxed">
                    {section.description}
                  </p>

                  <div className="mt-6">
                    <p className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      {t('withBiloki')}
                    </p>
                    <ul className="space-y-3">
                      {section.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 text-gray-700">
                          <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Image ou icône */}
                <div className={isReversed ? 'md:order-1' : ''}>
                  {index === 0 ? (
                    <div className="relative w-full max-h-96">
                      <Image 
                        src="/images/Calendrier.png" 
                        alt="Calendrier des réservations" 
                        width={4000}
                        height={2400}
                        className="w-full h-auto object-contain"
                        priority={index === 0}
                      />
                    </div>
                  ) : index === 1 ? (
                    <div className="relative w-full">
                      <Image 
                        src="/images/connexion-ota.png" 
                        alt="Connexions OTA" 
                        width={4000}
                        height={4000}
                        className="w-full h-auto max-w-none"
                        priority={false}
                      />
                    </div>
                  ) : index === 2 ? (
                    <div className="relative w-full">
                      <Image 
                        src="/images/prestataires.png" 
                        alt="Gestion des prestataires" 
                        width={4000}
                        height={4000}
                        className="w-full h-auto max-w-none"
                        priority={false}
                      />
                    </div>
                  ) : index === 3 ? (
                    <div className="relative w-full">
                      <Image 
                        src="/images/Messagerie.svg" 
                        alt="Messagerie centralisée" 
                        width={4000}
                        height={4000}
                        className="w-full h-auto max-w-none"
                        priority={false}
                      />
                    </div>
                  ) : index === 4 ? (
                    <div className="relative w-full">
                      <Image 
                        src="/images/Serrures.png" 
                        alt="Gestion des accès et serrures connectées" 
                        width={4000}
                        height={4000}
                        className="w-full h-auto max-w-none"
                        priority={false}
                      />
                    </div>
                  ) : index === 5 ? (
                    <div className="relative w-full">
                      <Image 
                        src="/images/Reporting.png" 
                        alt="Reporting et pilotage de la performance" 
                        width={4000}
                        height={4000}
                        className="w-full h-auto max-w-none"
                        priority={false}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <LogosCarousel logos={marketplaceLogos} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-primary rounded-[48px] p-12 md:p-16 text-white text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ctaTitle')}</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/reserver-demo" 
                className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {t('bookDemo')}
              </Link>
              <Link 
                href="/commencer-gratuitement" 
                className="inline-block bg-white/20 text-white font-bold py-3 px-8 rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                {t('freeTrial')}
              </Link>
            </div>
          </div>
        </div>

        {/* Pages connexes pour SEO */}
        <RelatedPages
          title={common('relatedPages')}
          links={[
            {
              href: `/${locale}/fonctionnalites/channel-manager`,
              title: relatedT('channelManager.title'),
              description: relatedT('channelManager.description')
            },
            {
              href: `/${locale}/tarifs`,
              title: relatedT('pricing.title'),
              description: relatedT('pricing.description')
            },
            {
              href: `/${locale}/connexions-api`,
              title: relatedT('apiConnections.title'),
              description: relatedT('apiConnections.description')
            },
            {
              href: `/${locale}/commencer-gratuitement`,
              title: relatedT('trial.title'),
              description: relatedT('trial.description')
            },
            {
              href: `/${locale}/reserver-demo`,
              title: relatedT('demo.title'),
              description: relatedT('demo.description')
            },
            {
              href: `/${locale}/blog`,
              title: relatedT('blog.title'),
              description: relatedT('blog.description')
            }
          ]}
          className="mt-16 mb-16"
        />
      </div>
    </main>
  );
}
