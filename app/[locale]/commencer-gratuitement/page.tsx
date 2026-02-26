import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CommencerGratuitementContent from './CommencerGratuitementContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'trialPage' });

  return {
    title: t('subtitle'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/commencer-gratuitement`,
      languages: {
        fr: '/fr/commencer-gratuitement',
        en: '/en/commencer-gratuitement',
        es: '/es/commencer-gratuitement',
        pt: '/pt/commencer-gratuitement',
        'x-default': '/fr/commencer-gratuitement',
      },
    },
  };
}

export default function CommencerGratuitementPage() {
  return <CommencerGratuitementContent />;
}
