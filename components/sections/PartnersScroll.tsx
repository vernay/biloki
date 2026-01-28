'use client';

import { useTranslations } from 'next-intl';

export default function PartnersScroll() {
  const t = useTranslations('partners');
  
  const partners = [
    { name: "Airbnb", logo: "/images/logo-partenaires/Airbnb.webp" },
    { name: "Booking.com", logo: "/images/logo-partenaires/Booking.com.png" },
    { name: "Vrbo", logo: "/images/logo-partenaires/vrbo.png" },
    { name: "Expedia", logo: "/images/logo-partenaires/Expedia.png" },
    { name: "PayPal", logo: "/images/logo-partenaires/paypal.png" },
    { name: "QuickBooks", logo: "/images/logo-partenaires/QuickBooks.png" },
    { name: "Nuki", logo: "/images/logo-partenaires/nuki.png" },
    { name: "Yale", logo: "/images/logo-partenaires/YaleJPG.jpg" },
    { name: "August", logo: "/images/logo-partenaires/August.webp" },
    { name: "Igloohome", logo: "/images/logo-partenaires/Igloohome.png" },
    { name: "PriceLabs", logo: "/images/logo-partenaires/pricelabs.png" },
    { name: "HubSpot", logo: "/images/logo-partenaires/HubSpot.png" },
  ];

  // Dupliquer les logos plusieurs fois pour créer un effet de boucle infinie vraiment fluide
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="w-full bg-white py-12 overflow-hidden border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t('subtitle')}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {t('title')} <span className="text-primary">{t('titleHighlight')}</span> {t('titleSuffix')}
          </h2>
        </div>
      </div>

      {/* Container pour le défilement */}
      <div className="relative">
        <div className="flex animate-scroll">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-8 w-40 h-24 flex items-center justify-center transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Gradient overlays pour effet de fondu */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          display: flex;
          animation: scroll 5s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
