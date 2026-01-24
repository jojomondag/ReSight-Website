export const locales = ["en", "sv", "de", "es", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  sv: "Svenska",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  sv: "🇸🇪",
  de: "🇩🇪",
  es: "🇪🇸",
  fr: "🇫🇷",
};

// Currency mapping per locale
export const localeCurrency: Record<Locale, string> = {
  en: "USD",
  sv: "SEK",
  de: "EUR",
  es: "EUR",
  fr: "EUR",
};

// OpenGraph locale format
export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  sv: "sv_SE",
  de: "de_DE",
  es: "es_ES",
  fr: "fr_FR",
};
