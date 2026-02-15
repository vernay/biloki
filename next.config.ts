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
        source: '/pt',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/pt/',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/es/',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/pt/:path*',
        destination: '/fr/:path*',
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
        source: '/fonctionnalites/channel-manager/ota',
        destination: '/fr/fonctionnalites/channel-manager',
        permanent: true,
      },
      {
        source: '/fonctionnalites/channel-manager/ota/',
        destination: '/fr/fonctionnalites/channel-manager',
        permanent: true,
      },
      {
        source: '/appli-biloki',
        destination: '/fr/fonctionnalites/vue-ensemble',
        permanent: true,
      },
      {
        source: '/appli-biloki/',
        destination: '/fr/fonctionnalites/vue-ensemble',
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
        destination: '/en/fonctionnalites/4-interfaces',
        permanent: true,
      },
      {
        source: '/fr/interface-prestataire',
        destination: '/fr/fonctionnalites/4-interfaces',
        permanent: true,
      },
      {
        source: '/interface-prestataire',
        destination: '/fr/fonctionnalites/4-interfaces',
        permanent: true,
      },
      {
        source: '/interface-prestataire/',
        destination: '/fr/fonctionnalites/4-interfaces',
        permanent: true,
      },
      
      // Redirections articles blog non-français vers français
      {
        source: '/en/blog/:slug',
        destination: '/fr/blog/:slug',
        permanent: true,
      },
      {
        source: '/es/blog/:slug',
        destination: '/fr/blog/:slug',
        permanent: true,
      },
      {
        source: '/pt/blog/:slug',
        destination: '/fr/blog/:slug',
        permanent: true,
      },
      // Redirections pages ES/PT non traduites vers FR
      {
        source: '/es/fonctionnalites/:path*',
        destination: '/fr/fonctionnalites/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
