import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import PartnersScroll from "@/components/sections/PartnersScroll";
import IntegrationsSection from "@/components/sections/IntegrationsSection";
import { defaultLocale, locales } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const seoMetadata = (
    messages as { seoMetadata?: { home?: { title?: string; description?: string } } }
  ).seoMetadata;

  const title = seoMetadata?.home?.title || "Biloki";
  const description = seoMetadata?.home?.description || "";
  const languages = Object.fromEntries(
    locales.map((loc) => [loc, `/${loc}`])
  );

  return {
    title,
    description,
    metadataBase: new URL("https://www.biloki.fr"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...languages,
        "x-default": `/${defaultLocale}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.biloki.fr/${locale}`,
      siteName: "Biloki",
      images: [
        {
          url: "/icon-512-og-blue.png",
          width: 512,
          height: 512,
          alt: "Biloki - Gestion de séjours",
          type: "image/png",
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/icon-512-og-blue.png"],
    },
  };
}

import InteractiveModulesShowcase from "@/components/sections/InteractiveModulesShowcase";
import ConnectivityPASection from "@/components/sections/ConnectivityPASection";
import ModuleNavBar from "@/components/sections/ModuleNavBar";
import CTASection from "@/components/sections/CTASection";
import { AnimatedTestimonialsDemo } from "@/components/sections/AnimatedTestimonialsDemo";
import BentoDemo from "@/components/sections/BentoDemo";

export default function HomePage() {
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
    "screenshot": "https://www.biloki.fr/images/interfaces/gestionnaire-ordi.svg",
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
      <div className="mx-2 md:mx-3 lg:mx-4">
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/1%C3%A8re%20page%20photos/Es%20vedra.jpg')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(6, 19, 33, 0.74) 0%, rgba(6, 19, 33, 0.68) 100%)",
            }}
          />
          <div className="relative z-10">
            <Hero />
            <ModuleNavBar />
            <PartnersScroll inHero />
          </div>
        </div>
      </div>
      <section className="bg-white px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <BentoDemo />
        </div>
      </section>
      <InteractiveModulesShowcase />
      <ConnectivityPASection />
      <AnimatedTestimonialsDemo showNote={false} />
      <div className="mx-2 md:mx-4 lg:mx-6 mt-3 md:mt-4 overflow-hidden">
        <IntegrationsSection />
      </div>
      <CTASection />
    </main>
  );
}
