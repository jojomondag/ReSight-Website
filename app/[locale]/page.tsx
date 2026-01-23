import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Structured Data for SEO/AEO/GEO */}
      <JsonLd locale={locale} />

      {/* Page Sections */}
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
    </>
  );
}
