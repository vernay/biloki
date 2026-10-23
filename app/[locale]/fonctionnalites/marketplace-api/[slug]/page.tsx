import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  getIntegrationAssets,
  getAllIntegrationSlugs,
} from "../integrationsLandingData";
import IntegrationPageContent, {
  type IntegrationPageViewModel,
} from "./IntegrationPageContent";

interface IntegrationPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Seules les intégrations listées dans integrationsLandingData ont une landing page pour l'instant.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllIntegrationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: IntegrationPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const assets = getIntegrationAssets(slug);

  if (!assets) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: `integrationPages.${slug}` });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/fonctionnalites/marketplace-api/${slug}`,
    },
  };
}

export default async function IntegrationPage({ params }: IntegrationPageProps) {
  const { locale, slug } = await params;
  const assets = getIntegrationAssets(slug);

  if (!assets) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: `integrationPages.${slug}` });
  const common = await getTranslations({ locale, namespace: "integrationPages.common" });

  const name = t("name");

  const benefits = t.raw("benefits") as { title: string; description: string }[];
  const howItWorksText = t.raw("howItWorks") as { title: string; description: string }[];
  const beforeAfter = t.raw("beforeAfter") as { before: string[]; after: string[] };
  const testimonial = t.raw("testimonial") as { quote: string; name: string; role: string };
  const support = t.raw("support") as {
    description: string;
    items: { label: string; value: string }[];
  };

  const data: IntegrationPageViewModel = {
    slug,
    name,
    categoryLabel: t("categoryLabel"),
    logo: assets.logo,
    heroImage: assets.heroImage,
    benefitsImage: assets.benefitsImage,
    tagline: t("tagline"),
    heroDescription: t("heroDescription"),
    benefits,
    howItWorks: howItWorksText.map((step, index) => ({
      ...step,
      image: assets.howItWorksImages[index],
    })),
    testimonial: {
      ...testimonial,
      photo: assets.testimonialPhoto,
    },
    beforeAfter,
    support: {
      description: support.description,
      items: support.items.map((item, index) => ({
        ...item,
        href: assets.supportHrefs[index],
      })),
    },
    labels: {
      marketplaceLabel: common("marketplaceLabel"),
      tryFree: common("tryFree"),
      bookDemo: common("bookDemo"),
      beforeTitle: common("beforeTitle"),
      afterTitle: common("afterTitle"),
      howItWorksTitle: common("howItWorksTitle"),
      benefitsTitle: common("benefitsTitle"),
      supportTitle: common("supportTitle"),
      midCta: common("midCta", { name }),
      finalCtaTitle: common("finalCtaTitle", { name }),
      finalCtaDescription: common("finalCtaDescription"),
    },
  };

  return <IntegrationPageContent data={data} />;
}
