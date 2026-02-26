import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ProgrammeParrainageContent from './ProgrammeParrainageContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'referralPage' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/programme-parrainage`,
      languages: {
        fr: '/fr/programme-parrainage',
        en: '/en/programme-parrainage',
        es: '/es/programme-parrainage',
        pt: '/pt/programme-parrainage',
        'x-default': '/fr/programme-parrainage',
      },
    },
  };
}

export default function ProgrammeParrainagePage() {
  return <ProgrammeParrainageContent />;
}
