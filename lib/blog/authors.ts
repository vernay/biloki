import { BlogAuthor, Locale } from "./types";

const defaultAuthors: Record<Locale, BlogAuthor> = {
  fr: {
    name: "Équipe Biloki",
    role: "Expert en location saisonnière",
    avatar: "/images/equipe/Sebastien.png",
    bio: "L'équipe Biloki partage ses connaissances pour aider les conciergeries à optimiser leur gestion.",
    profileUrl: "/fr/equipe",
  },
  en: {
    name: "Biloki Team",
    role: "Short-term rental expert",
    avatar: "/images/equipe/Sebastien.png",
    bio: "The Biloki team shares its knowledge to help concierge services optimize their management.",
    profileUrl: "/en/equipe",
  },
  es: {
    name: "Equipo Biloki",
    role: "Experto en alquiler vacacional",
    avatar: "/images/equipe/Sebastien.png",
    bio: "El equipo de Biloki comparte su conocimiento para ayudar a las conserjerías a optimizar su gestión.",
    profileUrl: "/es/equipe",
  },
  pt: {
    name: "Equipa Biloki",
    role: "Especialista em arrendamento de curta duração",
    avatar: "/images/equipe/Sebastien.png",
    bio: "A equipa Biloki partilha o seu conhecimento para ajudar as conciergeries a otimizar a sua gestão.",
    profileUrl: "/pt/equipe",
  },
};

export function getDefaultAuthor(locale: Locale): BlogAuthor {
  return defaultAuthors[locale] || defaultAuthors.fr;
}

export function resolveAuthor(articleAuthor: BlogAuthor | undefined, locale: Locale): BlogAuthor {
  const fallback = getDefaultAuthor(locale);
  return {
    ...fallback,
    ...articleAuthor,
    profileUrl: articleAuthor?.profileUrl || articleAuthor?.linkedin || fallback.profileUrl,
  };
}
