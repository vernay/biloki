export const locales = ["fr", "en", "es", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";
export const localePrefix: "always" | "as-needed" | "never" = "always";
