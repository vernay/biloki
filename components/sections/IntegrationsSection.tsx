'use client';

import { useTranslations } from 'next-intl';

export default function IntegrationsSection() {
  const t = useTranslations('integrations');
  const tCommon = useTranslations('common');
  
  const logos = [
    { src: "/images/logo-partenaires/Airbnb.webp", alt: "Airbnb" },
    { src: "/images/logo-partenaires/Booking.com.png", alt: "Booking.com" },
    { src: "/images/logo-partenaires/vrbo.png", alt: "Vrbo" },
    { src: "/images/logo-partenaires/Expedia.png", alt: "Expedia" },
    { src: "/images/logo-partenaires/Uber.png", alt: "Uber" },
    { src: "/images/logo-partenaires/HubSpot.png", alt: "HubSpot" },
    { src: "/images/logo-partenaires/paypal.png", alt: "PayPal" },
    { src: "/images/logo-partenaires/nuki.png", alt: "Nuki" },
    { src: "/images/logo-partenaires/August.webp", alt: "August" },
    { src: "/images/logo-partenaires/Igloohome.png", alt: "Igloohome" },
    { src: "/images/logo-partenaires/logo-pennylane.png", alt: "Pennylane" }
  ];

  const topRow = logos.slice(0, 5);
  const bottomRow = logos.slice(5);

  const featureKeys = ['sync', 'realtime', 'payments', 'locks'] as const;

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <span className="inline-block text-xs font-semibold tracking-wide text-primary bg-[#e9f5ff] px-3 py-1 rounded-full">
            {t('badge')}
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {t('description')}
            </p>
            <ul className="text-gray-700 space-y-3 text-sm">
              {featureKeys.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <svg className="mt-0.5 w-5 h-5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t(`features.${key}`)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a href="/fonctionnalites/marketplace-api" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold shadow-sm hover:shadow-md hover:bg-[#0293e6] transition-colors">
                {tCommon('seeMarketplace')}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="overflow-hidden">
              <div className="logo-marquee logo-marquee--left">
                {[...topRow, ...topRow].map((logo, index) => (
                  <div
                    key={`${logo.alt}-top-${index}`}
                    className="logo-card rounded-2xl bg-[#f8fbff] p-4 flex items-center justify-center"
                  >
                    <img src={logo.src} alt={logo.alt} className="h-10 object-contain" />
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="logo-marquee logo-marquee--right">
                {[...bottomRow, ...bottomRow].map((logo, index) => (
                  <div
                    key={`${logo.alt}-bottom-${index}`}
                    className="logo-card rounded-2xl bg-[#f8fbff] p-4 flex items-center justify-center"
                  >
                    <img src={logo.src} alt={logo.alt} className="h-10 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-marquee {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: marquee-left 14s linear infinite;
          will-change: transform;
        }
        .logo-marquee--right {
          animation-name: marquee-right;
        }
        .logo-card {
          min-width: 120px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .logo-card:hover {
          transform: translateY(-2px) scale(1.02);
          border-color: rgba(4, 164, 255, 0.6);
          box-shadow: 0 8px 20px rgba(4, 164, 255, 0.18);
        }
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
