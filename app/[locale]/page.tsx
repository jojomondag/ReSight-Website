import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { getLocalePrice } from "@/lib/stripe-prices";
import type { Locale } from "@/lib/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch dynamic price for this locale
  const price = await getLocalePrice(locale as Locale);

  return (
    <>
      {/* Structured Data for SEO/AEO/GEO */}
      <JsonLd locale={locale} price={price} />

      {/* Page Sections */}
      <Hero />
      <Features />
      <Pricing price={price} />
      <FAQ />
    </>
  );
}
