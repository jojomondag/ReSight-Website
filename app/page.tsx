import Hero from "@/components/Hero";
import CrosshairShowcase from "@/components/CrosshairShowcase";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO/AEO/GEO */}
      <JsonLd />

      {/* Page Sections */}
      <Hero />
      <CrosshairShowcase />
      <Features />
      <Pricing />
      <FAQ />
    </>
  );
}
