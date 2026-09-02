import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, localePrefix, locales } from "@/lib/i18n/config";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

const WEBAPP_BASE_URL = process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'https://app.biloki.fr';
const WEBAPP_REGISTER_URL = `${WEBAPP_BASE_URL}/register`;

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Normalize trailing slashes and handle old feature page redirects
  // Normaliser les slashs finaux (éviter les doublons /page vs /page/)
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const normalized = pathname.slice(0, -1);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = normalized;
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Rediriger /[locale]/commencer-gratuitement vers la webapp
  const localeMatch = pathname.match(/^\/([a-z]{2})\/commencer-gratuitement/);
  if (localeMatch) {
    const locale = localeMatch[1];
    const redirectUrl = new URL(WEBAPP_REGISTER_URL, request.url);
    redirectUrl.searchParams.set('lang', locale);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirections des anciennes pages fonctionnalites obsolètes
  const redirects: Record<string, string> = {
    // Fonctionnalites obsoletes (toutes langues)
    '/fr/fonctionnalites/messagerie': '/fr/fonctionnalites/reservations',
    '/en/fonctionnalites/messagerie': '/en/fonctionnalites/reservations',
    '/es/fonctionnalites/messagerie': '/es/fonctionnalites/reservations',
    '/pt/fonctionnalites/messagerie': '/pt/fonctionnalites/reservations',

    '/fr/fonctionnalites/ia-automatisation': '/fr/fonctionnalites/reservations',
    '/en/fonctionnalites/ia-automatisation': '/en/fonctionnalites/reservations',
    '/es/fonctionnalites/ia-automatisation': '/es/fonctionnalites/reservations',
    '/pt/fonctionnalites/ia-automatisation': '/pt/fonctionnalites/reservations',

    '/fr/fonctionnalites/multi-langues': '/fr/fonctionnalites/reservations',
    '/en/fonctionnalites/multi-langues': '/en/fonctionnalites/reservations',
    '/es/fonctionnalites/multi-langues': '/es/fonctionnalites/reservations',
    '/pt/fonctionnalites/multi-langues': '/pt/fonctionnalites/reservations',

    '/fr/fonctionnalites/prestataires': '/fr/fonctionnalites/interface-proprietaires',
    '/en/fonctionnalites/prestataires': '/en/fonctionnalites/interface-proprietaires',
    '/es/fonctionnalites/prestataires': '/es/fonctionnalites/interface-proprietaires',
    '/pt/fonctionnalites/prestataires': '/pt/fonctionnalites/interface-proprietaires',

    // Ancienne page 4 interfaces supprimee -> redirection vers la nouvelle page proprietaires
    '/fr/fonctionnalites/4-interfaces': '/fr/fonctionnalites/interface-proprietaires',
    '/en/fonctionnalites/4-interfaces': '/en/fonctionnalites/interface-proprietaires',
    '/es/fonctionnalites/4-interfaces': '/es/fonctionnalites/interface-proprietaires',
    '/pt/fonctionnalites/4-interfaces': '/pt/fonctionnalites/interface-proprietaires',

    '/fr/fonctionnalites/reporting': '/fr/fonctionnalites/reservations',
    '/en/fonctionnalites/reporting': '/en/fonctionnalites/reservations',
    '/es/fonctionnalites/reporting': '/es/fonctionnalites/reservations',
    '/pt/fonctionnalites/reporting': '/pt/fonctionnalites/reservations',

    '/fr/fonctionnalites/vue-ensemble': '/fr/fonctionnalites/reservations',
    '/en/fonctionnalites/vue-ensemble': '/en/fonctionnalites/reservations',
    '/es/fonctionnalites/vue-ensemble': '/es/fonctionnalites/reservations',
    '/pt/fonctionnalites/vue-ensemble': '/pt/fonctionnalites/reservations',

    // PMS sub-pages
    '/fr/fonctionnalites/pms/logements': '/fr/fonctionnalites/reservations',
    '/en/fonctionnalites/pms/logements': '/en/fonctionnalites/reservations',
    '/es/fonctionnalites/pms/logements': '/es/fonctionnalites/reservations',
    '/pt/fonctionnalites/pms/logements': '/pt/fonctionnalites/reservations',

    '/fr/fonctionnalites/pms/reporting': '/fr/fonctionnalites/reservations',
    '/en/fonctionnalites/pms/reporting': '/en/fonctionnalites/reservations',
    '/es/fonctionnalites/pms/reporting': '/es/fonctionnalites/reservations',
    '/pt/fonctionnalites/pms/reporting': '/pt/fonctionnalites/reservations',

    '/fr/fonctionnalites/pms/tableau-bord': '/fr/fonctionnalites/reservations',
    '/en/fonctionnalites/pms/tableau-bord': '/en/fonctionnalites/reservations',
    '/es/fonctionnalites/pms/tableau-bord': '/es/fonctionnalites/reservations',
    '/pt/fonctionnalites/pms/tableau-bord': '/pt/fonctionnalites/reservations',

    '/fr/fonctionnalites/pms/voyageurs': '/fr/fonctionnalites/reservations',
    '/en/fonctionnalites/pms/voyageurs': '/en/fonctionnalites/reservations',
    '/es/fonctionnalites/pms/voyageurs': '/es/fonctionnalites/reservations',
    '/pt/fonctionnalites/pms/voyageurs': '/pt/fonctionnalites/reservations',

    '/fr/fonctionnalites/pms/sejours': '/fr/fonctionnalites/reservations',
    '/en/fonctionnalites/pms/sejours': '/en/fonctionnalites/reservations',
    '/es/fonctionnalites/pms/sejours': '/es/fonctionnalites/reservations',
    '/pt/fonctionnalites/pms/sejours': '/pt/fonctionnalites/reservations',

    // Channel Manager sub-pages
    '/fr/fonctionnalites/channel-manager/tarifs': '/fr/fonctionnalites/reservations',
    '/en/fonctionnalites/channel-manager/tarifs': '/en/fonctionnalites/reservations',
    '/es/fonctionnalites/channel-manager/tarifs': '/es/fonctionnalites/reservations',
    '/pt/fonctionnalites/channel-manager/tarifs': '/pt/fonctionnalites/reservations',

    // Serrures connectees
    '/fr/serrures-connectees': '/fr/fonctionnalites/serrures-connectees',
    '/en/serrures-connectees': '/en/fonctionnalites/serrures-connectees',
    '/es/serrures-connectees': '/es/fonctionnalites/serrures-connectees',
    '/pt/serrures-connectees': '/pt/fonctionnalites/serrures-connectees',
  };

  // Vérifier si le pathname correspond à une redirection
  if (redirects[pathname]) {
    return NextResponse.redirect(new URL(redirects[pathname], request.url), {
      status: 301,
    });
  }

  // Appliquer le middleware next-intl normalement
  const response = intlMiddleware(request);
  return withCanonicalPathHeader(response, request.nextUrl.pathname);
}

function withCanonicalPathHeader(response: NextResponse, pathname: string) {
  const existing = response.headers.get("x-middleware-override-headers");
  const merged = new Set(
    (existing ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  );
  merged.add("x-canonical-path");

  response.headers.set(
    "x-middleware-override-headers",
    Array.from(merged).join(",")
  );
  response.headers.set("x-middleware-request-x-canonical-path", pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};