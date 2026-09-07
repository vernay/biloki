import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const WEBAPP_BASE_URL = process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'https://beta.biloki.fr';
// Essai gratuit : toujours vers le domaine app.biloki.fr, indépendamment de NEXT_PUBLIC_WEBAPP_URL
const WEBAPP_REGISTER_URL = 'https://app.biloki.fr/register';
const WEBAPP_SUBSCRIPTION_URL = `${WEBAPP_BASE_URL}/register/subscription`;
const BLOG_BASE_URL = 'https://blog.biloki.fr';

const blogArticleRedirects = [
  {
    source: 'api-meubles-airbnb-abritel-reglementation-2026',
    destination: 'api-meubles-proprietaire-airbnb-abritel-guide-2026',
  },
  {
    source: '7-erreurs-tarification-location-saisonniere',
    destination: {
      fr: '7-erreurs-tarification-penalisent-rentabilite-conciergeries',
      en: '7-erreurs-tarification-penalisent-rentabilite-conciergeries',
      es: '7-errores-tarificacion-penalizan-rentabilidad-conciergeries',
      pt: '7-erreurs-tarification-penalisent-rentabilite-conciergeries',
    },
  },
  {
    source: 'channel-manager-conciergerie-choisir-logiciel-2026',
    destination: 'channel-manager-conciergerie-choisir-bon-logiciel-2026-guide',
  },
  {
    source: 'numero-enregistrement-obligatoire-meubles-tourisme',
    destination: 'numero-enregistrement-obligatoire-meubles-de-tourisme-guide',
  },
  {
    source: 'rentabilite-location-courte-duree-2026',
    destination: 'location-courte-duree-rentable-2026-analyse-rentabilite',
  },
  {
    source: 'loi-le-meur-2026-location-saisonniere',
    destination: 'loi-le-meur-2026-obligations-amendes-checklist-conformite',
  },
  {
    source: 'france-102-millions-touristes-opportunite',
    destination: '102-millions-touristes-5-strategies-capter-demande-location-courte-duree',
  },
  {
    source: 'salon-marseille-2026',
    destination: 'salon-marseille-2026-demo-biloki-conciergeries',
  },
  {
    source: 'nice-quotas-airbnb-reglementation-2025',
    destination: {
      fr: 'nice-2025-quotas-airbnb-limite-90-jours-plan-conformite',
      en: 'nice-2025-quotas-airbnb-limite-90-jours-plan-conformite',
      es: 'nice-2025-quotas-airbnb-limite-90-jours-plan-conformite',
      pt: 'nice-2025-quotas-airbnb-limite-90-dias-plano-conformidade',
    },
  },
  {
    source: 'automatiser-gestion-locations-saisonnieres',
    destination: {
      fr: 'automatiser-conciergerie-5-workflows-gagner-du-temps',
      en: 'automatiser-conciergerie-5-workflows-gagner-du-temps',
      es: 'automatizar-conserjeria-5-workflows-ahorrar-tiempo',
      pt: 'automatiser-conciergerie-5-workflows-gagner-du-temps',
    },
  },
  {
    source: 'channel-manager-guide-complet-conciergeries',
    destination: 'channel-manager-guide-complet-eviter-doubles-reservations',
  },
  {
    source: 'messagerie-automatisee-conciergerie',
    destination: 'messagerie-automatisee-7-messages-essentiels-voyageurs',
  },
  {
    source: 'ia-location-courte-duree-conciergeries',
    destination: {
      fr: 'ia-pour-conciergeries-4-cas-usage-concrets',
      en: 'ia-pour-conciergeries-4-cas-usage-concrets',
      es: 'ia-para-conciergeries-4-cas-usage-concrets',
      pt: 'ia-para-conciergeries-4-cas-usage-concrets',
    },
  },
] as const;

const blogRedirects = ['fr', 'en', 'es', 'pt'].flatMap((locale) => [
  {
    source: `/${locale}/blog`,
    destination: `${BLOG_BASE_URL}/${locale}`,
    statusCode: 301,
  },
  ...blogArticleRedirects.map(({ source, destination }) => ({
    source: `/${locale}/blog/${source}`,
    destination: `${BLOG_BASE_URL}/${locale}/blog/${typeof destination === 'string' ? destination : destination[locale as keyof typeof destination]}`,
    statusCode: 301,
  })),
]);

const legacyFrenchBlogRedirects = [
  {
    source: '/blog',
    destination: `${BLOG_BASE_URL}/fr`,
    statusCode: 301,
  },
  ...blogArticleRedirects.map(({ source, destination }) => ({
    source: `/blog/${source}`,
    destination: `${BLOG_BASE_URL}/fr/blog/${typeof destination === 'string' ? destination : destination.fr}`,
    statusCode: 301,
  })),
];

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      // Forcer le domaine canonique avec www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'biloki.fr',
          },
        ],
        destination: 'https://www.biloki.fr/:path*',
        permanent: true,
      },
      // Canonicaliser la home vers la locale FR (évite les 307 middleware pour SEO)
      {
        source: '/',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/fr',
        permanent: true,
      },
      // Redirections vers webapp
      {
        source: '/:locale/commencer-gratuitement',
        destination: `${WEBAPP_REGISTER_URL}?lang=:locale`,
        permanent: false,
      },
      {
        source: '/:locale/s-abonner',
        destination: `${WEBAPP_SUBSCRIPTION_URL}?lang=:locale`,
        permanent: false,
      },
      {
        source: '/:locale/s-abonner/completer',
        destination: `${WEBAPP_SUBSCRIPTION_URL}?lang=:locale`,
        permanent: false,
      },
      {
        source: '/:locale/landing',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/landing',
        destination: '/fr',
        permanent: true,
      },
      
      // Redirections 301 - Anciennes URLs vers nouvelles pages
      {
        source: '/en/',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/fr/',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/pt/',
        destination: '/pt',
        permanent: true,
      },
      {
        source: '/es/',
        destination: '/es',
        permanent: true,
      },
      // Redirections URLs sans préfixe de locale → FR
      {
        source: '/cgv',
        destination: '/fr/cgv',
        permanent: true,
      },
      {
        source: '/cgv/',
        destination: '/fr/cgv',
        permanent: true,
      },
      {
        source: '/fonctionnalites/pms',
        destination: '/fr/fonctionnalites/reservations',
        permanent: true,
      },
      {
        source: '/fonctionnalites/pms/',
        destination: '/fr/fonctionnalites/reservations',
        permanent: true,
      },
      // Ancien blog Next.js -> nouveau blog Webflow
      ...blogRedirects,
      ...legacyFrenchBlogRedirects,
      // Anciennes URLs de fonctionnalites traduites
      {
        source: '/en/features/marketplace-api',
        destination: '/en/fonctionnalites/marketplace-api',
        statusCode: 301,
      },
      {
        source: '/es/caracteristicas/marketplace-api',
        destination: '/es/fonctionnalites/marketplace-api',
        statusCode: 301,
      },
      {
        source: '/:locale/fonctionnalites/channel-manager/ota',
        destination: '/:locale/fonctionnalites/reservations',
        statusCode: 301,
      },
      // Anciennes pages d'offres
      {
        source: '/abonnement-pro-biloki',
        destination: '/fr/tarifs',
        statusCode: 301,
      },
      {
        source: '/abonnements-particuliers',
        destination: '/fr/tarifs',
        statusCode: 301,
      },
      {
        source: '/fonctionnalites-gestion-locative-ia',
        destination: '/fr/fonctionnalites/reservations',
        statusCode: 301,
      },
      {
        source: '/nous-contacter',
        destination: '/fr/contact',
        permanent: true,
      },
      {
        source: '/nous-contacter/',
        destination: '/fr/contact',
        permanent: true,
      },
      {
        source: '/mentions-legales',
        destination: '/fr/mentions-legales',
        permanent: true,
      },
      {
        source: '/mentions-legales/',
        destination: '/fr/mentions-legales',
        permanent: true,
      },
      {
        source: '/fonctionnalites/serrures-connectees',
        destination: '/fr/fonctionnalites/serrures-connectees',
        permanent: true,
      },
      {
        source: '/fonctionnalites/serrures-connectees/',
        destination: '/fr/fonctionnalites/serrures-connectees',
        permanent: true,
      },
      {
        source: '/:locale/serrures-connectees',
        destination: '/:locale/fonctionnalites/serrures-connectees',
        permanent: true,
      },
      {
        source: '/:locale/serrures-connectees/',
        destination: '/:locale/fonctionnalites/serrures-connectees',
        permanent: true,
      },
      {
        source: '/serrures-connectees',
        destination: '/fr/fonctionnalites/serrures-connectees',
        permanent: true,
      },
      {
        source: '/serrures-connectees/',
        destination: '/fr/fonctionnalites/serrures-connectees',
        permanent: true,
      },
      {
        source: '/fonctionnalites/channel-manager/ota',
        destination: '/fr/fonctionnalites/reservations',
        permanent: true,
      },
      {
        source: '/fonctionnalites/channel-manager/ota/',
        destination: '/fr/fonctionnalites/reservations',
        permanent: true,
      },
      {
        source: '/appli-biloki',
        destination: '/fr/fonctionnalites/reservations',
        permanent: true,
      },
      {
        source: '/appli-biloki/',
        destination: '/fr/fonctionnalites/reservations',
        permanent: true,
      },
      {
        source: '/conditions-generales-de-vente',
        destination: '/fr/cgv',
        permanent: true,
      },
      {
        source: '/conditions-generales-de-vente/',
        destination: '/fr/cgv',
        permanent: true,
      },
      {
        source: '/boutique-biloki',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/boutique-biloki/',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/produits-2',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/produits-2/',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/offre-conciergerie-copy',
        destination: '/fr/tarifs',
        permanent: true,
      },
      {
        source: '/offre-conciergerie-copy/',
        destination: '/fr/tarifs',
        permanent: true,
      },
      {
        source: '/order-tracking',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/order-tracking/',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/remerciements',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/remerciements/',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/page-de-maintenance',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/page-de-maintenance/',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/icons',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/icons/',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/bypasses-in-heating-systems',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/bypasses-in-heating-systems/',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/nous-contacter',
        destination: '/fr/contact',
        permanent: true,
      },
      {
        source: '/nous-contacter/',
        destination: '/fr/contact',
        permanent: true,
      },
      {
        source: '/accueil',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/accueil/',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/en/interface-prestataire',
        destination: '/en/fonctionnalites/interface-proprietaires',
        permanent: true,
      },
      {
        source: '/fr/interface-prestataire',
        destination: '/fr/fonctionnalites/interface-proprietaires',
        permanent: true,
      },
      {
        source: '/interface-prestataire',
        destination: '/fr/fonctionnalites/interface-proprietaires',
        permanent: true,
      },
      {
        source: '/interface-prestataire/',
        destination: '/fr/fonctionnalites/interface-proprietaires',
        permanent: true,
      },
      
      // Pages sans locale → ajouter /fr/
      {
        source: '/contact',
        destination: '/fr/contact',
        permanent: true,
      },
      {
        source: '/contact/',
        destination: '/fr/contact',
        permanent: true,
      },
      {
        source: '/cgv',
        destination: '/fr/cgv',
        permanent: true,
      },
      {
        source: '/cgv/',
        destination: '/fr/cgv',
        permanent: true,
      },
      
      // Sous-paths qui n'existent pas
      {
        source: '/:locale/fonctionnalites/channel-manager',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/channel-manager/',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/pms/sejours',
        destination: '/:locale/fonctionnalites/reservations',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/pms/sejours/',
        destination: '/:locale/fonctionnalites/reservations',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/channel-manager/airbnb',
        destination: '/:locale/fonctionnalites/reservations',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/channel-manager/airbnb/',
        destination: '/:locale/fonctionnalites/reservations',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/channel-manager/booking',
        destination: '/:locale/fonctionnalites/reservations',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/channel-manager/booking/',
        destination: '/:locale/fonctionnalites/reservations',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/channel-manager/calendriers',
        destination: '/:locale/fonctionnalites/reservations',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/channel-manager/calendriers/',
        destination: '/:locale/fonctionnalites/reservations',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/reporting',
        destination: '/:locale/fonctionnalites',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/reporting/',
        destination: '/:locale/fonctionnalites',
        permanent: true,
      },
      {
        source: '/fonctionnalites/4-interfaces',
        destination: '/fr/fonctionnalites/interface-proprietaires',
        permanent: true,
      },
      {
        source: '/fonctionnalites/4-interfaces/',
        destination: '/fr/fonctionnalites/interface-proprietaires',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/4-interfaces',
        destination: '/:locale/fonctionnalites/interface-proprietaires',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/4-interfaces/',
        destination: '/:locale/fonctionnalites/interface-proprietaires',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/messagerie',
        destination: '/:locale/fonctionnalites/messagerie-unifiee',
        permanent: true,
      },
      {
        source: '/:locale/fonctionnalites/messagerie/',
        destination: '/:locale/fonctionnalites/messagerie-unifiee',
        permanent: true,
      },
      // Redirections des anciens chemins ville programmatiques supprimés
      {
        source: '/:locale/logiciel-location-saisonniere/:ville',
        destination: '/:locale/logiciel-location-saisonniere',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
