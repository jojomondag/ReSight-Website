"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

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
      className="bg-bg-tertiary border border-border text-text-primary text-sm rounded-lg px-2 py-1.5 focus:ring-accent focus:border-accent cursor-pointer disabled:opacity-50"
      aria-label="Select language"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeNames[locale]}
        </option>
      ))}
    </select>
  );
}
