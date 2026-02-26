import { Metadata } from 'next';
import MarketplaceAPIContent from './MarketplaceAPIContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Marketplace API | Biloki",
    en: "Marketplace API | Biloki",
    es: "Marketplace API | Biloki",
    pt: "Marketplace API | Biloki",
  };

  const descriptions: Record<string, string> = {
    fr: "Découvrez notre marketplace d'intégrations. Connectez Airbnb, Booking, Stripe, et plus de 50 partenaires.",
    en: "Discover our integration marketplace. Connect Airbnb, Booking, Stripe, and 50+ partners.",
    es: "Descubre nuestro marketplace de integraciones. Conecta Airbnb, Booking, Stripe y más de 50 socios.",
    pt: "Descubra nosso marketplace de integrações. Conecte Airbnb, Booking, Stripe e 50+ parceiros.",
  };

  return {
    title: titles[locale] || titles.fr,
    description: descriptions[locale] || descriptions.fr,
    alternates: {
      canonical: `/${locale}/fonctionnalites/marketplace-api`,
      languages: {
        fr: `/fr/fonctionnalites/marketplace-api`,
        en: `/en/features/marketplace-api`,
        es: `/es/caracteristicas/marketplace-api`,
        pt: `/pt/funcionalidades/marketplace-api`,
        "x-default": `/fr/fonctionnalites/marketplace-api`,
      },
    },
  };
}

export default function MarketplaceAPIPage() {
  return <MarketplaceAPIContent />;
}
