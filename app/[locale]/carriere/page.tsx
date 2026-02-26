import { Metadata } from 'next';
import CarriereContent from './CarriereContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Rejoindre Biloki | Carrières",
    en: "Join Biloki | Careers",
    es: "Únete a Biloki | Carreras",
    pt: "Junte-se à Biloki | Carreiras",
  };

  const descriptions: Record<string, string> = {
    fr: "Rejoignez l'équipe Biloki et contribuez à révolutionner la gestion des locations saisonnières.",
    en: "Join the Biloki team and help revolutionize short-term rental management.",
    es: "Únete al equipo de Biloki y ayuda a revolucionar la gestión de alquileres a corto plazo.",
    pt: "Junte-se à equipa Biloki e ajude a revolucionar a gestão de aluguéis de curta duração.",
  };

  return {
    title: titles[locale] || titles.fr,
    description: descriptions[locale] || descriptions.fr,
    alternates: {
      canonical: `/${locale}/carriere`,
      languages: {
        fr: `/fr/carriere`,
        en: `/en/careers`,
        es: `/es/carreras`,
        pt: `/pt/carreira`,
        "x-default": `/fr/carriere`,
      },
    },
  };
}

export default function CarrierePage() {
  return <CarriereContent />;
}
