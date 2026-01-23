import Stripe from "stripe";
import { localeCurrency, type Locale } from "@/lib/i18n/config";

// Use placeholder during build if not set
const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";

export const stripe = new Stripe(stripeKey, {
  apiVersion: "2024-04-10",
  typescript: true,
});

// Map locale to Stripe price ID
// User needs to create these prices in Stripe Dashboard and add to .env
export function getPriceIdForLocale(locale: Locale): string {
  const currency = localeCurrency[locale];

  switch (currency) {
    case "SEK":
      return process.env.STRIPE_PRICE_ID_SEK || process.env.STRIPE_PRICE_ID || "";
    case "EUR":
      return process.env.STRIPE_PRICE_ID_EUR || process.env.STRIPE_PRICE_ID || "";
    case "USD":
    default:
      return process.env.STRIPE_PRICE_ID_USD || process.env.STRIPE_PRICE_ID || "";
  }
}

// Map locale to Stripe checkout locale
export function getStripeLocale(
  locale: Locale
): Stripe.Checkout.SessionCreateParams["locale"] {
  const localeMap: Record<Locale, Stripe.Checkout.SessionCreateParams["locale"]> =
    {
      en: "en",
      sv: "sv",
      de: "de",
      es: "es",
      fr: "fr",
    };
  return localeMap[locale] || "en";
}

export async function createCheckoutSession(
  userEmail: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  locale?: Locale
) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: userEmail,
    locale: locale ? getStripeLocale(locale) : "en",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userEmail,
      locale: locale || "en",
    },
  });

  return session;
}
