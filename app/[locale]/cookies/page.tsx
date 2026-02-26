import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CookiesContent from './CookiesContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.cookies' });

  return {
    title: t('title'),
    description: t('section1Content'),
    alternates: {
      canonical: `/${locale}/cookies`,
      languages: {
        fr: '/fr/cookies',
        en: '/en/cookies',
        es: '/es/cookies',
        pt: '/pt/cookies',
        'x-default': '/fr/cookies',
      },
    },
  };
}

export default function CookiesPage() {
  return <CookiesContent />;
}
