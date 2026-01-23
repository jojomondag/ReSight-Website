/**
 * JSON-LD Structured Data Component
 * Provides schema.org markup for SEO, AEO, and GEO optimization
 */

import { localePrice, localeCurrency, locales, type Locale } from "@/lib/i18n/config";

interface JsonLdProps {
  locale?: string;
}

// Organization Schema - For Google Knowledge Panel
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ReSight",
    alternateName: "ReSight Gaming Utility",
    url: "https://resight.gg",
    logo: "https://resight.gg/icon.svg",
    description:
      "ReSight is a gaming utility for crosshair overlays, display settings, Discord volume control, and gaming profiles.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["English", "Swedish", "German", "Spanish", "French"],
    },
    foundingDate: "2024",
    slogan: "Aim Better. See More.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema - For Sitelinks Search Box
export function WebSiteJsonLd({ locale = "en" }: JsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ReSight",
    url: `https://resight.gg/${locale}`,
    description:
      "Gaming utility for crosshair overlays, display adjustments, and Discord volume control",
    publisher: {
      "@type": "Organization",
      name: "ReSight",
    },
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://resight.gg/${locale}?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// SoftwareApplication Schema - For Product Rich Results
export function SoftwareJsonLd({ locale = "en" }: JsonLdProps) {
  const loc = locale as Locale;
  const price = localePrice[loc] || localePrice.en;
  const currency = localeCurrency[loc] || "USD";

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ReSight",
    applicationCategory: "GameApplication",
    operatingSystem: "Windows",
    description:
      "Custom crosshair overlays, display adjustments for dark and bright maps, Discord volume control, and gaming profiles. All in one gaming utility app.",
    offers: {
      "@type": "Offer",
      price: price.amount,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      priceValidUntil: "2026-12-31",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Custom crosshair overlays",
      "Display brightness and contrast adjustments",
      "Discord volume control with hotkeys",
      "Game-specific profiles",
      "Works with any game",
    ],
    screenshot: "https://resight.gg/screenshots/hunt-dark-processed.png",
    softwareVersion: "1.0",
    author: {
      "@type": "Organization",
      name: "ReSight",
    },
    availableLanguage: locales,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema - For Navigation Context
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema - For FAQ Rich Snippets
export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema - For E-commerce Rich Results
export function ProductJsonLd({ locale = "en" }: JsonLdProps) {
  const loc = locale as Locale;
  const price = localePrice[loc] || localePrice.en;
  const currency = localeCurrency[loc] || "USD";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "ReSight License",
    description:
      "Lifetime license for ReSight gaming utility. Includes crosshair overlays, display settings, Discord volume control, and game profiles.",
    brand: {
      "@type": "Brand",
      name: "ReSight",
    },
    offers: {
      "@type": "Offer",
      url: `https://resight.gg/${locale}/buy`,
      priceCurrency: currency,
      price: price.amount,
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "ReSight",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Combined default export for homepage
export default function JsonLd({ locale = "en" }: JsonLdProps) {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd locale={locale} />
      <SoftwareJsonLd locale={locale} />
    </>
  );
}
