import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const WEBAPP_BASE_URL = process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'https://beta.biloki.fr';
const WEBAPP_REGISTER_URL = `${WEBAPP_BASE_URL}/register`;
const WEBAPP_SUBSCRIPTION_URL = `${WEBAPP_BASE_URL}/register/subscription`;

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
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
        source: '/appli-biloki',
        destination: '/fr/fonctionnalites',
        permanent: true,
      },
      {
        source: '/appli-biloki/',
        destination: '/fr/fonctionnalites',
        permanent: true,
      },
      {
        source: '/produits-2',
        destination: '/fr/tarifs',
        permanent: true,
      },
      {
        source: '/produits-2/',
        destination: '/fr/tarifs',
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
    ];
  },
};

export default withNextIntl(nextConfig);
