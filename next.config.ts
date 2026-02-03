import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const WEBAPP_BASE_URL = process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'https://beta.biloki.fr';
const WEBAPP_REGISTER_URL = `${WEBAPP_BASE_URL}/register`;
const WEBAPP_SUBSCRIPTION_URL = `${WEBAPP_BASE_URL}/register/subscription`;

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
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
    ];
  },
};

export default withNextIntl(nextConfig);
