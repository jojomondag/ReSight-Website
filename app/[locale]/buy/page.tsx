import { setRequestLocale } from "next-intl/server";
import { getLocalePrice } from "@/lib/stripe-prices";
import type { Locale } from "@/lib/i18n/config";
import BuyPageClient from "./BuyPageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BuyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch dynamic price for this locale
  const price = await getLocalePrice(locale as Locale);

  return <BuyPageClient price={price} />;
}
