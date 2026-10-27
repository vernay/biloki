import { Metadata } from 'next';
import MarketplaceAPIContent from './MarketplaceAPIContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Intégrations pour conciergerie : OTA, paiements et serrures",
    en: "Marketplace API | Biloki",
    es: "Marketplace API | Biloki",
    pt: "Marketplace API | Biloki",
  };

  const descriptions: Record<string, string> = {
    fr: "Identifiez les outils compatibles avec Biloki pour votre conciergerie : plateformes de réservation, solutions de paiement et serrures connectées.",
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
        en: `/en/fonctionnalites/marketplace-api`,
        es: `/es/fonctionnalites/marketplace-api`,
        pt: `/pt/fonctionnalites/marketplace-api`,
        "x-default": `/fr/fonctionnalites/marketplace-api`,
      },
    },
  };
}

export default function MarketplaceAPIPage() {
  return <MarketplaceAPIContent />;
}
