import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const WEBAPP_BASE_URL = process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'https://beta.biloki.fr';
const WEBAPP_REGISTER_URL = `${WEBAPP_BASE_URL}/register`;
const WEBAPP_SUBSCRIPTION_URL = `${WEBAPP_BASE_URL}/register/subscription`;

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
        destination: 'https://app.biloki.fr/register/trial?access=f6c0189e31f1fd7f09d7b3b348fc7836&lang=:locale',
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
      {
        source: '/blog/:slug',
        destination: '/fr/blog/:slug',
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
