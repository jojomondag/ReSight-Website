import { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://resight.gg";
  const currentDate = new Date();

  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/buy", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/login", changeFrequency: "yearly" as const, priority: 0.5 },
    { path: "/register", changeFrequency: "yearly" as const, priority: 0.6 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale
  for (const locale of locales) {
    for (const route of routes) {
      const url = `${baseUrl}/${locale}${route.path}`;

      // Create alternates for all locales
      const languages: Record<string, string> = {};
      for (const altLocale of locales) {
        languages[altLocale] = `${baseUrl}/${altLocale}${route.path}`;
      }
      // Add x-default pointing to English
      languages["x-default"] = `${baseUrl}/en${route.path}`;

      entries.push({
        url,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
