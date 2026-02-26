import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SAbonnerContent from './SAbonnerContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'subscribePage' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/s-abonner`,
      languages: {
        fr: '/fr/s-abonner',
        en: '/en/s-abonner',
        es: '/es/s-abonner',
        pt: '/pt/s-abonner',
        'x-default': '/fr/s-abonner',
      },
    },
  };
}

export default function SAbonnerPage() {
  return <SAbonnerContent />;
}
