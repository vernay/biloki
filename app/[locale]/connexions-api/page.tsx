import { Metadata } from 'next';
import ConnexionsAPIContent from './ConnexionsAPIContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Connexions API | Biloki",
    en: "API Connections | Biloki",
    es: "Conexiones API | Biloki",
    pt: "Conexões API | Biloki",
  };

  const descriptions: Record<string, string> = {
    fr: "Intégrez Biloki à vos systèmes existants via notre API. Synchronisez vos données en temps réel.",
    en: "Integrate Biloki with your existing systems via our API. Sync your data in real-time.",
    es: "Integra Biloki con tus sistemas existentes a través de nuestra API. Sincroniza tus datos en tiempo real.",
    pt: "Integre Biloki com seus sistemas existentes através da nossa API. Sincronize seus dados em tempo real.",
  };

  return {
    title: titles[locale] || titles.fr,
    description: descriptions[locale] || descriptions.fr,
    alternates: {
      canonical: `/${locale}/connexions-api`,
      languages: {
        fr: `/fr/connexions-api`,
        en: `/en/api-connections`,
        es: `/es/conexiones-api`,
        pt: `/pt/conexoes-api`,
        "x-default": `/fr/connexions-api`,
      },
    },
  };
}

export default function ConnexionsAPIPage() {
  return <ConnexionsAPIContent />;
}
