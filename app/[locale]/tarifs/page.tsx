import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TarifsContent from './TarifsContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricingPage' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/tarifs`,
      languages: {
        fr: '/fr/tarifs',
        en: '/en/tarifs',
        es: '/es/tarifs',
        pt: '/pt/tarifs',
        'x-default': '/fr/tarifs',
      },
    },
  };
}

export default function TarifsPage() {
  return <TarifsContent />;
}
