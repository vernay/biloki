import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PmsContent from './PmsContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'featuresPages.pms' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/fonctionnalites/pms`,
      languages: {
        fr: '/fr/fonctionnalites/pms',
        en: '/en/fonctionnalites/pms',
        es: '/es/fonctionnalites/pms',
        pt: '/pt/fonctionnalites/pms',
        'x-default': '/fr/fonctionnalites/pms',
      },
    },
  };
}

export default function PMSPage() {
  return <PmsContent />;
}
