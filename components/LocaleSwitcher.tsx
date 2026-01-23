"use client";

import { useParams } from "next/navigation";
import { useState, useRef, useEffect, useTransition } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLocale = params.locale as Locale;

  const handleSelect = (newLocale: Locale) => {
    setIsOpen(false);
    if (newLocale !== currentLocale) {
      startTransition(() => {
        router.replace(pathname, { locale: newLocale });
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-1 text-text-secondary text-xs font-medium hover:text-text-primary transition-colors disabled:opacity-50"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span>{localeLabels[currentLocale]}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-1 bg-bg-secondary border border-border rounded-lg shadow-lg z-50 min-w-[80px] animate-fade-in">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleSelect(locale)}
              className={`w-full px-3 py-1.5 text-left text-xs font-medium transition-colors ${
                locale === currentLocale
                  ? "text-accent bg-bg-tertiary"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
              }`}
            >
              {localeLabels[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
