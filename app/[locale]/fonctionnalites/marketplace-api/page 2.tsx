"use client";

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
  { name: "Stripe", logo: "/images/logo-partenaires/stripe.svg", category: ["all", "payments"], url: "https://stripe.com" },
  { name: "PayPal", logo: "/images/logo-partenaires/paypal.png", category: ["all", "payments"], url: "https://www.paypal.com" },
  { name: "QuickBooks", logo: "/images/logo-partenaires/QuickBooks.png", category: ["all", "accounting"], url: "https://quickbooks.intuit.com" },
  { name: "Xero", logo: "/images/logo-partenaires/xero.svg", category: ["all", "accounting"], url: "https://www.xero.com" },
  { name: "Nuki", logo: "/images/logo-partenaires/nuki.png", category: ["all", "locks"], url: "https://nuki.io/fr-fr" },
  { name: "Yale", logo: "/images/logo-partenaires/YaleJPG.jpg", category: ["all", "locks"], url: "https://www.yalehome.com" },
  { name: "August", logo: "/images/logo-partenaires/August.webp", category: ["all", "locks"], url: "https://august.com" },
  { name: "Igloohome", logo: "/images/logo-partenaires/Igloohome.png", category: ["all", "locks"], url: "https://www.igloohome.co" },
  { name: "Turno", logo: "/images/logo-partenaires/turno.svg", category: ["all", "cleaning"], url: "https://www.turno.com" },
  { name: "Properly", logo: "/images/logo-partenaires/properly.svg", category: ["all", "cleaning"], url: "https://www.getproperly.com" },
  { name: "WhatsApp", logo: "/images/logo-partenaires/whatsapp.svg", category: ["all", "communication"], url: "https://www.whatsapp.com" },
  { name: "Twilio", logo: "/images/logo-partenaires/twilio.svg", category: ["all", "communication"], url: "https://www.twilio.com" },
  { name: "PriceLabs", logo: "/images/logo-partenaires/pricelabs.png", category: ["all", "pricing"], url: "https://www.pricelabs.co" },
  { name: "Beyond Pricing", logo: "/images/logo-partenaires/beyond-pricing.svg", category: ["all", "pricing"], url: "https://beyondpricing.com" },
  { name: "Zapier", logo: "/images/logo-partenaires/zapier.svg", category: ["all"], url: "https://zapier.com" },
  { name: "Make", logo: "/images/logo-partenaires/make.svg", category: ["all"], url: "https://www.make.com" },
  { name: "Slack", logo: "/images/logo-partenaires/slack.svg", category: ["all", "communication"], url: "https://slack.com" },
  { name: "Google Calendar", logo: "/images/logo-partenaires/google-calendar.svg", category: ["all"], url: "https://calendar.google.com" },
  { name: "Mailchimp", logo: "/images/logo-partenaires/mailchimp.svg", category: ["all", "communication"], url: "https://mailchimp.com" },
  { name: "HubSpot", logo: "/images/logo-partenaires/HubSpot.png", category: ["all"], url: "https://www.hubspot.com" },
];

export default function MarketplaceAPIPage() {
  const t = useTranslations('featuresPages.marketplace');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");

  const categoryKeys: CategoryKey[] = ["all", "ota", "payments", "accounting", "locks", "cleaning", "communication", "pricing"];

  const filteredIntegrations = integrations.filter((integration) =>
    integration.category.includes(selectedCategory)
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-6 py-16">
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
              <a
                href="/api-docs"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
              >
                {t('apiSection.viewDocs')}
              </a>
              <Link
                href="/connexions-api"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-blue-50 transition"
              >
                {t('apiSection.requestIntegration')}
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-primary rounded-[48px] p-12 md:p-16 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-lg mb-8 opacity-90">
            {t('ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/connexions-api"
              className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              {t('apiSection.requestIntegration')}
            </Link>
            <Link
              href="/commencer-gratuitement"
              className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition shadow-md"
            >
              {t('tryFree')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
