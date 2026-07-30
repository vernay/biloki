'use client';

import { useTranslations } from 'next-intl';

type PartnersScrollProps = {
  inHero?: boolean;
};

export default function PartnersScroll({ inHero = false }: PartnersScrollProps) {
  const t = useTranslations('partners');
  
  const partners = [
    { name: "Vrbo", logo: "/images/logo-partenaires/vrbo.png" },
    { name: "Expedia", logo: "/images/logo-partenaires/Expedia.png" },
    { name: "Stripe", logo: "/images/logo-partenaires/Stripe.png" },
    { name: "PayPal", logo: "/images/logo-partenaires/paypal.png" },
    { name: "PriceLabs", logo: "/images/logo-partenaires/logo-pricelabs-text.png", sizeClassName: "h-8 w-32 md:h-9 md:w-36" },
    { name: "Uber", logo: "/images/logo-partenaires/Uber.png" },
    { name: "Nuki", logo: "/images/logo-partenaires/nuki.png" },
    { name: "Igloohome", logo: "/images/logo-partenaires/Igloohome.png", sizeClassName: "h-14 w-36 md:h-16 md:w-40" },
    { name: "Swikly", logo: "/images/logo-partenaires/logo-swikly.png" },
    { name: "Pennylane", logo: "/images/logo-partenaires/logo-pennylane.png" },
    { name: "HubSpot", logo: "/images/logo-partenaires/HubSpot.png" },
    { name: "Beyond", logo: "/images/logo-partenaires/beyond-logo-wormark-color-325.png" },
  ];

  // Dupliquer les logos pour créer un effet de boucle infinie fluide
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section
      className={`w-full overflow-hidden ${
        inHero
          ? 'relative z-10 px-6 pb-10 md:pb-12'
          : 'bg-white mt-4 md:mt-6 pt-4 pb-8 border-t border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center ${inHero ? 'mb-6 mt-1' : 'mb-8 mt-8'}`}>
          <p
            className={`text-xl md:text-2xl font-semibold uppercase tracking-wide mb-2 ${
              inHero ? 'text-white/90' : 'text-[var(--biloki-blue)]'
            }`}
          >
            {t('subtitle')}
          </p>
          {!inHero && (
            <h2
              id="partners-heading"
              className="text-2xl md:text-3xl font-bold text-gray-900"
            >
              {t('title')}{' '}
              <span className="text-primary">{t('titleHighlight')}</span>{' '}
              {t('titleSuffix')}
            </h2>
          )}
        </div>
      </div>

      {/* Container pour le défilement */}
      <div className="relative">
        <div className="flex w-max animate-scroll">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-8 w-40 h-24 flex items-center justify-center transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={`${partner.sizeClassName ?? 'h-12 w-32'} object-contain ${inHero ? 'opacity-95 logo-white' : ''}`}
                loading="lazy"
                width={128}
                height={48}
                decoding="async"
              />
            </div>
          ))}
        </div>

        {/* Gradient overlays pour effet de fondu */}
        {!inHero && (
          <>
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          display: flex;
          animation: scroll 22s linear infinite;
          will-change: transform;
        }

        .logo-white {
          filter: grayscale(1) brightness(0) invert(1)
            drop-shadow(0 1px 1px rgba(0, 0, 0, 0.45))
            drop-shadow(0 0 7px rgba(255, 255, 255, 0.2));
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 12s;
          }
        }
      `}</style>
    </section>
  );
}
