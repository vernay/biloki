import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ReserverDemoContent from './ReserverDemoContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'demoPage' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/reserver-demo`,
      languages: {
        fr: '/fr/reserver-demo',
        en: '/en/reserver-demo',
        es: '/es/reserver-demo',
        pt: '/pt/reserver-demo',
        'x-default': '/fr/reserver-demo',
      },
    },
  };
}

export default function ReserverDemoPage() {
  return <ReserverDemoContent />;
}

