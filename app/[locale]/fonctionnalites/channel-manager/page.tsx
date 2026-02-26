import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ChannelManagerContent from './ChannelManagerContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'featuresPages.channelManager' });

  return {
    title: t('hero.title'),
    description: t('hero.description'),
    alternates: {
      canonical: `/${locale}/fonctionnalites/channel-manager`,
      languages: {
        fr: '/fr/fonctionnalites/channel-manager',
        en: '/en/fonctionnalites/channel-manager',
        es: '/es/fonctionnalites/channel-manager',
        pt: '/pt/fonctionnalites/channel-manager',
        'x-default': '/fr/fonctionnalites/channel-manager',
      },
    },
  };
}

export default function ChannelManagerPage() {
  return <ChannelManagerContent />;
}
