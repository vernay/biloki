// Assets (images) pour les landing pages d'intégration (ex: /fonctionnalites/marketplace-api/igloohome).
// Tout le contenu texte vit dans messages/{locale}.json sous la clé "integrationPages".
// Les images marquées "TODO photo" sont des placeholders en attendant les visuels fournis par le partenaire.

export interface IntegrationAssets {
  slug: string;
  logo: string;
  // TODO photo : remplacer par un visuel hero fourni par le partenaire une fois disponible
  heroImage: string;
  // Photo du produit affichée à côté de la rubrique "Avantages clés"
  benefitsImage: string;
  // Images illustrant chaque étape de la rubrique "Comment ça marche ?" (même ordre que howItWorks)
  howItWorksImages: string[];
  testimonialPhoto: string;
  // Liens associés aux items de support (même ordre que support.items)
  supportHrefs: (string | undefined)[];
}

export const integrationsAssets: Record<string, IntegrationAssets> = {
  igloohome: {
    slug: "igloohome",
    logo: "/images/logo-partenaires/Igloohome.png",
    heroImage: "/images/logo-partenaires/Igloohome.png",
    benefitsImage: "/images/serrures/igloohome-smart-mortise-2.jpg",
    howItWorksImages: [
      "/images/serrures/Channel manager.png",
      "/images/serrures/Génération des codes.png",
      "/images/serrures/Mock up iphone code générée.svg",
    ],
    testimonialPhoto: "/images/Témoignage/Amélie.JPG",
    supportHrefs: ["https://www.igloohome.co/support", "/contact"],
  },
};

export function getIntegrationAssets(slug: string): IntegrationAssets | undefined {
  return integrationsAssets[slug];
}

export function getAllIntegrationSlugs(): string[] {
  return Object.keys(integrationsAssets);
}
