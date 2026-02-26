import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ConnexionContent from './ConnexionContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'loginPage' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/connexion`,
      languages: {
        fr: '/fr/connexion',
        en: '/en/connexion',
        es: '/es/connexion',
        pt: '/pt/connexion',
        'x-default': '/fr/connexion',
      },
    },
  };
}

export default function ConnexionPage() {
  return <ConnexionContent />;
}
