import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import MentionsLegalesContent from './MentionsLegalesContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.legalNotice' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/mentions-legales`,
      languages: {
        fr: '/fr/mentions-legales',
        en: '/en/mentions-legales',
        es: '/es/mentions-legales',
        pt: '/pt/mentions-legales',
        'x-default': '/fr/mentions-legales',
      },
    },
  };
}

export default function MentionsLegalesPage() {
  return <MentionsLegalesContent />;
}
