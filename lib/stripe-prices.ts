import { stripe, getPriceIdForLocale } from "./stripe";
import { localeCurrency, type Locale, locales } from "@/lib/i18n/config";

export interface PriceInfo {
  amount: string;
  formatted: string;
}

// Cache structure
interface PriceCache {
  prices: Record<string, PriceInfo>; // keyed by currency
  fetchedAt: number;
}

// In-memory cache with 1 hour TTL
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
let priceCache: PriceCache | null = null;

// Format price for display based on locale
function formatPrice(
  amount: number,
  currency: string,
  locale: Locale
): { amount: string; formatted: string } {
  // amount from Stripe is in smallest currency unit (cents, öre, etc.)
  const divisor = currency === "JPY" ? 1 : 100; // JPY has no decimal
  const numericAmount = amount / divisor;

  // Locale mapping for Intl.NumberFormat
  const intlLocaleMap: Record<Locale, string> = {
    en: "en-US",
    sv: "sv-SE",
    de: "de-DE",
    es: "es-ES",
    fr: "fr-FR",
  };

  const formatter = new Intl.NumberFormat(intlLocaleMap[locale], {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "SEK" ? 0 : 2,
    maximumFractionDigits: currency === "SEK" ? 0 : 2,
  });

  return {
    amount: numericAmount.toString(),
    formatted: formatter.format(numericAmount),
  };
}

// Fetch prices from Stripe for all currencies
async function fetchPricesFromStripe(): Promise<Record<string, PriceInfo>> {
  const prices: Record<string, PriceInfo> = {};
  const currencies = ["USD", "EUR", "SEK"];

  // Get a locale for each currency to fetch its price ID
  const currencyToLocale: Record<string, Locale> = {
    USD: "en",
    EUR: "de",
    SEK: "sv",
  };

  for (const currency of currencies) {
    const locale = currencyToLocale[currency];
    const priceId = getPriceIdForLocale(locale);

    if (!priceId || priceId === "") {
      console.warn(`No price ID configured for ${currency}`);
      continue;
    }

    try {
      const stripePrice = await stripe.prices.retrieve(priceId);

      if (stripePrice.unit_amount === null) {
        console.warn(`Price ${priceId} has no unit_amount`);
        continue;
      }

      prices[currency] = formatPrice(
        stripePrice.unit_amount,
        stripePrice.currency.toUpperCase(),
        locale
      );
    } catch (error) {
      console.error(`Failed to fetch price for ${currency}:`, error);
    }
  }

  return prices;
}

// Get cached prices or fetch new ones
async function getCachedPrices(): Promise<Record<string, PriceInfo>> {
  const now = Date.now();

  // Return cached prices if still valid
  if (priceCache && now - priceCache.fetchedAt < CACHE_TTL) {
    return priceCache.prices;
  }

  // Fetch fresh prices
  const prices = await fetchPricesFromStripe();

  // Only update cache if we got at least one price
  if (Object.keys(prices).length > 0) {
    priceCache = {
      prices,
      fetchedAt: now,
    };
  }

  return prices;
}

// Get price for a specific locale
export async function getLocalePrice(locale: Locale): Promise<PriceInfo> {
  const currency = localeCurrency[locale];
  const prices = await getCachedPrices();

  // Return the price for this locale's currency
  if (prices[currency]) {
    // Re-format for the specific locale (prices are cached by currency)
    const priceId = getPriceIdForLocale(locale);
    if (priceId) {
      try {
        const stripePrice = await stripe.prices.retrieve(priceId);
        if (stripePrice.unit_amount !== null) {
          return formatPrice(
            stripePrice.unit_amount,
            stripePrice.currency.toUpperCase(),
            locale
          );
        }
      } catch {
        // Fall through to cached price
      }
    }
    return prices[currency];
  }

  // Fallback to hardcoded defaults if Stripe fetch fails
  const fallbackPrices: Record<Locale, PriceInfo> = {
    en: { amount: "4.30", formatted: "$4.30" },
    sv: { amount: "49", formatted: "49 kr" },
    de: { amount: "3.99", formatted: "3,99 €" },
    es: { amount: "3.99", formatted: "3,99 €" },
    fr: { amount: "3.99", formatted: "3,99 €" },
  };

  return fallbackPrices[locale] || fallbackPrices.en;
}

// Get prices for all locales (useful for static generation)
export async function getAllLocalePrices(): Promise<Record<Locale, PriceInfo>> {
  const result: Partial<Record<Locale, PriceInfo>> = {};

  for (const locale of locales) {
    result[locale] = await getLocalePrice(locale);
  }

  return result as Record<Locale, PriceInfo>;
}
