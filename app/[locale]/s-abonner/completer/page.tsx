import type { Metadata } from 'next';
import CompleterContent from './CompleterContent';

const titles: Record<string, string> = {
  fr: 'Finaliser votre inscription | Biloki',
  en: 'Complete your subscription | Biloki',
  es: 'Completar su inscripcion | Biloki',
  pt: 'Concluir sua inscricao | Biloki',
};

const descriptions: Record<string, string> = {
  fr: 'Renseignez vos informations pour proceder au paiement securise.',
  en: 'Provide your details to proceed to secure payment.',
  es: 'Complete sus datos para proceder al pago seguro.',
  pt: 'Preencha seus dados para prosseguir com o pagamento seguro.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: titles[locale] || titles.fr,
    description: descriptions[locale] || descriptions.fr,
    alternates: {
      canonical: `/${locale}/s-abonner/completer`,
      languages: {
        fr: '/fr/s-abonner/completer',
        en: '/en/s-abonner/completer',
        es: '/es/s-abonner/completer',
        pt: '/pt/s-abonner/completer',
        'x-default': '/fr/s-abonner/completer',
      },
    },
  };
}

export default function CompleterInscriptionPage() {
  return <CompleterContent />;
}
