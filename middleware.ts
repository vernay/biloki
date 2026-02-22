import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirections des anciennes pages fonction nalites
  const redirects: Record<string, string> = {
    // Fonctionnalites obsoletes
    '/fr/fonctionnalites/messagerie': '/fr/fonctionnalites/pms',
    '/en/fonctionnalites/messagerie': '/en/fonctionnalites/pms',
    '/es/fonctionnalites/messagerie': '/es/fonctionnalites/pms',
    '/pt/fonctionnalites/messagerie': '/pt/fonctionnalites/pms',

    '/fr/fonctionnalites/ia-automatisation': '/fr/fonctionnalites/pms',
    '/en/fonctionnalites/ia-automatisation': '/en/fonctionnalites/pms',
    '/es/fonctionnalites/ia-automatisation': '/es/fonctionnalites/pms',
    '/pt/fonctionnalites/ia-automatisation': '/pt/fonctionnalites/pms',

    '/fr/fonctionnalites/multi-langues': '/fr/fonctionnalites/pms',
    '/en/fonctionnalites/multi-langues': '/en/fonctionnalites/pms',
    '/es/fonctionnalites/multi-langues': '/es/fonctionnalites/pms',
    '/pt/fonctionnalites/multi-langues': '/pt/fonctionnalites/pms',

    '/fr/fonctionnalites/prestataires': '/fr/fonctionnalites/4-interfaces',
    '/en/fonctionnalites/prestataires': '/en/fonctionnalites/4-interfaces',
    '/es/fonctionnalites/prestataires': '/es/fonctionnalites/4-interfaces',
    '/pt/fonctionnalites/prestataires': '/pt/fonctionnalites/4-interfaces',

    '/fr/fonctionnalites/reporting': '/fr/fonctionnalites/pms',
    '/en/fonctionnalites/reporting': '/en/fonctionnalites/pms',
    '/es/fonctionnalites/reporting': '/es/fonctionnalites/pms',
    '/pt/fonctionnalites/reporting': '/pt/fonctionnalites/pms',

    '/fr/fonctionnalites/vue-ensemble': '/fr/fonctionnalites/pms',
    '/en/fonctionnalites/vue-ensemble': '/en/fonctionnalites/pms',
    '/es/fonctionnalites/vue-ensemble': '/es/fonctionnalites/pms',
    '/pt/fonctionnalites/vue-ensemble': '/pt/fonctionnalites/pms',

    // PMS sub-pages
    '/fr/fonctionnalites/pms/logements': '/fr/fonctionnalites/pms',
    '/en/fonctionnalites/pms/logements': '/en/fonctionnalites/pms',
    '/es/fonctionnalites/pms/logements': '/es/fonctionnalites/pms',
    '/pt/fonctionnalites/pms/logements': '/pt/fonctionnalites/pms',

    '/fr/fonctionnalites/pms/reporting': '/fr/fonctionnalites/pms',
    '/en/fonctionnalites/pms/reporting': '/en/fonctionnalites/pms',
    '/es/fonctionnalites/pms/reporting': '/es/fonctionnalites/pms',
    '/pt/fonctionnalites/pms/reporting': '/pt/fonctionnalites/pms',

    '/fr/fonctionnalites/pms/tableau-bord': '/fr/fonctionnalites/pms',
    '/en/fonctionnalites/pms/tableau-bord': '/en/fonctionnalites/pms',
    '/es/fonctionnalites/pms/tableau-bord': '/es/fonctionnalites/pms',
    '/pt/fonctionnalites/pms/tableau-bord': '/pt/fonctionnalites/pms',

    '/fr/fonctionnalites/pms/voyageurs': '/fr/fonctionnalites/pms',
    '/en/fonctionnalites/pms/voyageurs': '/en/fonctionnalites/pms',
    '/es/fonctionnalites/pms/voyageurs': '/es/fonctionnalites/pms',
    '/pt/fonctionnalites/pms/voyageurs': '/pt/fonctionnalites/pms',

    '/fr/fonctionnalites/pms/sejours': '/fr/fonctionnalites/pms',
    '/en/fonctionnalites/pms/sejours': '/en/fonctionnalites/pms',
    '/es/fonctionnalites/pms/sejours': '/es/fonctionnalites/pms',
    '/pt/fonctionnalites/pms/sejours': '/pt/fonctionnalites/pms',

    // Channel Manager sub-pages
    '/fr/fonctionnalites/channel-manager/tarifs': '/fr/fonctionnalites/channel-manager',
    '/en/fonctionnalites/channel-manager/tarifs': '/en/fonctionnalites/channel-manager',
    '/es/fonctionnalites/channel-manager/tarifs': '/es/fonctionnalites/channel-manager',
    '/pt/fonctionnalites/channel-manager/tarifs': '/pt/fonctionnalites/channel-manager',

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

  // Ajouter un slash à la fin et réessayer
  const pathnameWithSlash = pathname + '/';
  if (redirects[pathnameWithSlash]) {
    return NextResponse.redirect(new URL(redirects[pathnameWithSlash], request.url), {
      status: 301,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:locale(fr|en|es|pt)/fonctionnalites/:path*', '/:locale(fr|en|es|pt)/serrures-connectees/:path*'],
};
