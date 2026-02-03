import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, localePrefix, locales } from "@/lib/i18n/config";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

const WEBAPP_BASE_URL = process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'https://beta.biloki.fr';
const WEBAPP_REGISTER_URL = `${WEBAPP_BASE_URL}/register`;

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Rediriger /[locale]/commencer-gratuitement vers la webapp
  const localeMatch = pathname.match(/^\/([a-z]{2})\/commencer-gratuitement/);
  if (localeMatch) {
    const locale = localeMatch[1];
    const redirectUrl = new URL(WEBAPP_REGISTER_URL, request.url);
    redirectUrl.searchParams.set('lang', locale);
    return NextResponse.redirect(redirectUrl);
  }

  // Appliquer le middleware next-intl normalement
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};