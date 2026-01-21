import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://resight.gg";

export const metadata: Metadata = {
  // Basic Meta
  title: {
    default: "ReSight - Gaming Utility for Crosshair Overlays & Display Settings",
    template: "%s | ReSight",
  },
  description:
    "ReSight is a gaming utility for crosshair overlays, display settings, Discord volume control, and gaming profiles. Enhance your gaming experience with powerful customization tools. Works with Hunt: Showdown, Escape from Tarkov, and any game.",
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
    canonical: siteUrl,
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
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

  // Verification (add your actual IDs when available)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },

  // Other
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to required origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Speakable for voice search optimization */}
        <meta name="speakable" content="true" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3PDERNBWKN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3PDERNBWKN');
          `}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-grow" role="main" id="main-content">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
