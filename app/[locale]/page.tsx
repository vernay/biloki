import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import PartnersScroll from "@/components/sections/PartnersScroll";
import FeaturesSection from "@/components/sections/FeaturesSection";
import IntegrationsSection from "@/components/sections/IntegrationsSection";
import AISection from "@/components/sections/AISection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const seoMetadata = (messages as any).seoMetadata;

  const title = seoMetadata?.home?.title || "Biloki";
  const description = seoMetadata?.home?.description || "";

  return {
    title,
    description,
  };
}

import TeamSection from "@/components/sections/TeamSection";
import BenefitsIphoneSection from "@/components/sections/BenefitsIphoneSection";
import AppBanner from "@/components/sections/AppBanner";
import PricingCalculator from "@/components/sections/PricingCalculator";
import CTASection from "@/components/sections/CTASection";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Biloki",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "5.00",
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "5.00",
        "priceCurrency": "EUR",
        "unitText": "par logement et par mois"
      }
    },
    "description": "PMS et Channel Manager tout-en-un pour la gestion de locations saisonnières. Synchronisez vos calendriers sur Airbnb, Booking.com et plus de 50 plateformes.",
    "featureList": [
      "Channel Manager multi-plateformes",
      "PMS complet",
      "Messagerie IA automatisée",
      "Gestion des accès et serrures connectées",
      "Facturation et comptabilité",
      "Marketplace de prestataires"
    ],
    "screenshot": "https://www.biloki.fr/images/interfaces/gestionnaire.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <Hero />
      <PartnersScroll />
      <FeaturesSection />
      <IntegrationsSection />
      <AISection />
      <TeamSection />
      <BenefitsIphoneSection />
      <AppBanner />
      <PricingCalculator />
      <CTASection />
    </main>
  );
}
