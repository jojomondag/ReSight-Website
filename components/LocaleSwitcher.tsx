"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  sv: "SV",
  de: "DE",
  es: "ES",
  fr: "FR",
};

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const currentLocale = params.locale as Locale;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      disabled={isPending}
      className="bg-transparent border-none text-text-secondary text-xs font-medium cursor-pointer disabled:opacity-50 focus:outline-none focus:text-text-primary hover:text-text-primary transition-colors appearance-none pr-4 bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2212%22%20height%3d%2212%22%20viewBox%3d%220%200%2012%2012%22%3e%3cpath%20fill%3d%22%2389986D%22%20d%3d%22M2%204l4%204%204-4%22%2f%3e%3c%2fsvg%3e')] bg-no-repeat bg-right"
      aria-label="Select language"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeLabels[locale]}
        </option>
      ))}
    </select>
  );
}
