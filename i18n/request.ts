import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async ({ requestLocale }) => {
  // Récupérer la locale depuis la requête (définie par le middleware)
  let locale = await requestLocale;
  
  // Fallback si pas de locale valide
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
