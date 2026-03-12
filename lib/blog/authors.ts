import { BlogAuthor, Locale } from "./types";

const defaultAuthors: Record<Locale, BlogAuthor> = {
  fr: {
    name: "Équipe Biloki",
    role: "Expert en location saisonnière",
    avatar: "/images/equipe/Sebastien.png",
    bio: "L'équipe Biloki partage ses connaissances pour aider les conciergeries à optimiser leur gestion.",
    linkedin: "https://www.linkedin.com/in/s%C3%A9bastien-vernay-71a27374/",
    profileUrl: "https://www.linkedin.com/in/s%C3%A9bastien-vernay-71a27374/",
  },
  en: {
    name: "Biloki Team",
    role: "Short-term rental expert",
    avatar: "/images/equipe/Sebastien.png",
    bio: "The Biloki team shares its knowledge to help concierge services optimize their management.",
    linkedin: "https://www.linkedin.com/in/s%C3%A9bastien-vernay-71a27374/",
    profileUrl: "https://www.linkedin.com/in/s%C3%A9bastien-vernay-71a27374/",
  },
  es: {
    name: "Equipo Biloki",
    role: "Experto en alquiler vacacional",
    avatar: "/images/equipe/Sebastien.png",
    bio: "El equipo de Biloki comparte su conocimiento para ayudar a las conserjerías a optimizar su gestión.",
    linkedin: "https://www.linkedin.com/in/s%C3%A9bastien-vernay-71a27374/",
    profileUrl: "https://www.linkedin.com/in/s%C3%A9bastien-vernay-71a27374/",
  },
  pt: {
    name: "Equipa Biloki",
    role: "Especialista em arrendamento de curta duração",
    avatar: "/images/equipe/Sebastien.png",
    bio: "A equipa Biloki partilha o seu conhecimento para ajudar as conciergeries a otimizar a sua gestão.",
    linkedin: "https://www.linkedin.com/in/s%C3%A9bastien-vernay-71a27374/",
    profileUrl: "https://www.linkedin.com/in/s%C3%A9bastien-vernay-71a27374/",
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
    profileUrl: articleAuthor?.linkedin || articleAuthor?.profileUrl || fallback.linkedin || fallback.profileUrl,
  };
}
