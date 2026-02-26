import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CgvContent from './CgvContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.cgv' });

  return {
    title: t('title'),
    description: t('section1Content'),
    alternates: {
      canonical: `/${locale}/cgv`,
      languages: {
        fr: '/fr/cgv',
        en: '/en/cgv',
        es: '/es/cgv',
        pt: '/pt/cgv',
        'x-default': '/fr/cgv',
      },
    },
  };
}

export default function CGVPage() {
  return <CgvContent />;
}
