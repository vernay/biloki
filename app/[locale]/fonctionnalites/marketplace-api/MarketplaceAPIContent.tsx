'use client';

import { useState } from "react";
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type CategoryKey = "all" | "ota" | "payments" | "accounting" | "locks" | "cleaning" | "communication" | "pricing";

interface Integration {
  name: string;
  logo: string;
  category: CategoryKey[];
  url?: string;
}

const integrations: Integration[] = [
  { name: "Airbnb", logo: "/images/logo-partenaires/Airbnb.webp", category: ["all", "ota"], url: "https://www.airbnb.fr" },
  { name: "Booking.com", logo: "/images/logo-partenaires/Booking.com.png", category: ["all", "ota"], url: "https://www.booking.com" },
  { name: "Vrbo", logo: "/images/logo-partenaires/vrbo.png", category: ["all", "ota"], url: "https://www.vrbo.com" },
  { name: "Expedia", logo: "/images/logo-partenaires/Expedia.png", category: ["all", "ota"], url: "https://www.expedia.fr" },
  { name: "Stripe", logo: "/images/logo-partenaires/Stripe.png", category: ["all", "payments"], url: "https://stripe.com" },
  { name: "PayPal", logo: "/images/logo-partenaires/paypal.png", category: ["all", "payments"], url: "https://www.paypal.com" },
  { name: "QuickBooks (arrive bientôt)", logo: "/images/logo-partenaires/QuickBooks.png", category: ["all", "accounting"] },
  { name: "Pennylane (arrive bientôt)", logo: "/images/logo-partenaires/logo-pennylane.png", category: ["all", "accounting"] },
  { name: "Nuki", logo: "/images/logo-partenaires/nuki.png", category: ["all", "locks"], url: "https://nuki.io/fr-fr" },
  { name: "Igloohome", logo: "/images/logo-partenaires/Igloohome.png", category: ["all", "locks"], url: "https://www.igloohome.co" },
  { name: "Swikly", logo: "/images/logo-partenaires/logo-swikly.png", category: ["all", "payments"], url: "https://www.swikly.com" },
  { name: "WhatsApp", logo: "/images/logo-partenaires/whatsapp-logo-whatsapp-logo-transparent-whatsapp-icon-transparent-free-free-png.webp", category: ["all", "communication"], url: "https://www.whatsapp.com" },
  { name: "PriceLabs", logo: "/images/logo-partenaires/pricelabs.png", category: ["all", "pricing"], url: "https://www.pricelabs.co" },
  { name: "Beyond", logo: "/images/logo-partenaires/beyond-logo-wormark-color-325.png", category: ["all", "pricing"], url: "https://beyondpricing.com" },
];

export default function MarketplaceAPIContent() {
  const t = useTranslations('featuresPages.marketplace');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");

  const categoryKeys: CategoryKey[] = ["all", "ota", "payments", "accounting", "locks", "cleaning", "communication", "pricing"];

  const filteredIntegrations = integrations.filter((integration) =>
    integration.category.includes(selectedCategory)
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-6 pt-44 md:pt-52 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
          {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          {t('description')}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                selectedCategory === key
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {t(`categories.${key}`)}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {filteredIntegrations.map((integration) => {
            const Component = integration.url ? "a" : "div";
            const linkProps = integration.url
              ? { href: integration.url, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Component
                key={integration.name}
                {...linkProps}
                className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="h-20 flex items-center justify-center mb-4">
                  <img 
                    src={integration.logo} 
                    alt={integration.name}
                    className="max-h-16 max-w-[140px] object-contain"
                  />
                </div>
                <h3 className="text-center font-semibold text-gray-900">
                  {integration.name}
                </h3>
              </Component>
            );
          })}
        </div>

        {/* API Section */}
        <div className="bg-white rounded-2xl p-12 border border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('apiSection.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('apiSection.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/connexions-api"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-blue-50 transition"
              >
                {t('apiSection.requestIntegration')}
              </Link>
              <Link
                href="/reserver-demo"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-blue-50 transition"
              >
                Réserver une démo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
