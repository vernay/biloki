import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

type Messages = Record<string, unknown>;

function mergeMessages(fallback: Messages, current: Messages): Messages {
  const result: Messages = { ...fallback };

  for (const [key, value] of Object.entries(current)) {
    const fallbackValue = result[key];

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      fallbackValue &&
      typeof fallbackValue === "object" &&
      !Array.isArray(fallbackValue)
    ) {
      result[key] = mergeMessages(
        fallbackValue as Messages,
        value as Messages
      );
      continue;
    }

    result[key] = value;
  }

  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Récupérer la locale depuis la requête (définie par le middleware)
  let locale = await requestLocale;
  
  // Fallback si pas de locale valide
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  const fallbackMessages = (await import(`../messages/${defaultLocale}.json`))
    .default as Messages;
  const localeMessages = (await import(`../messages/${locale}.json`))
    .default as Messages;

  const messages =
    locale === defaultLocale
      ? localeMessages
      : mergeMessages(fallbackMessages, localeMessages);

  return {
    locale,
    messages,
  };
});
