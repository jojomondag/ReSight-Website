import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import AsciiTreeBackground from "@/components/AsciiTree";
import FloatingParticles from "@/components/ui/FloatingParticles";
import { locales, ogLocale, type Locale } from "@/lib/i18n/config";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://resight.gg";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Import messages for metadata
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${siteUrl}/${loc}`;
  });

  return {
    // Basic Meta
    title: {
      default: messages.metadata.title,
      template: "%s | ReSight",
    },
    description: messages.metadata.description,
    keywords: [
      "crosshair overlay",
      "gaming crosshair",
      "custom crosshair",
      "display settings",
      "brightness adjustment",
      "gamma correction",
      "discord volume control",
      "gaming profiles",
      "hunt showdown crosshair",
      "tarkov crosshair",
      "gaming utility",
      "screen overlay",
      "aim assist tool",
      "gaming software",
    ],
    authors: [{ name: "ReSight" }],
    creator: "ReSight",
    publisher: "ReSight",

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Canonical & Alternates
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: alternateLanguages,
    },

    // Open Graph
    openGraph: {
      type: "website",
      locale: ogLocale[locale as Locale] || "en_US",
      url: `${siteUrl}/${locale}`,
      siteName: "ReSight",
      title: "ReSight - Aim Better. See More.",
      description:
        "Custom crosshair overlays, display adjustments for dark and bright maps, Discord volume control, and gaming profiles. All in one gaming utility app.",
      images: [
        {
          url: "/screenshots/hunt-dark-processed.png",
          width: 1920,
          height: 1080,
          alt: "ReSight Gaming Utility - Crosshair Overlay Demo",
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: "ReSight - Aim Better. See More.",
      description:
        "Custom crosshair overlays, display adjustments, and Discord volume control. All in one gaming utility.",
      images: ["/screenshots/hunt-dark-processed.png"],
      creator: "@resight_gg",
    },

    // App-specific
    applicationName: "ReSight",
    category: "Gaming",

    // Other
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "mobile-web-app-capable": "yes",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for this locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />

        {/* Preconnect to required origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Speakable for voice search optimization */}
        <meta name="speakable" content="true" />

        {/* hreflang tags for SEO */}
        {locales.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={loc}
            href={`${siteUrl}/${loc}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en`} />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-440TW13HRD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-440TW13HRD');
          `}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <AsciiTreeBackground />
            <FloatingParticles count={15} className="text-accent/20 z-0" />
            <Header />
            <main className="flex-grow" role="main" id="main-content">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
