"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const t = useTranslations("header");

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-bg-secondary border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icon.svg"
              alt="ReSight Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-text-primary">ReSight</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 ml-auto mr-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {t("home")}
            </Link>
            <Link
              href="/buy"
              className={`text-sm font-medium transition-colors ${
                isActive("/buy")
                  ? "text-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {t("pricing")}
            </Link>
            {session && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {t("dashboard")}
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-sm text-text-secondary hidden sm:block">
                  {session.user?.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  {t("signOut")}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  {t("login")}
                </Link>
                <Link href="/register" className="btn-primary text-sm">
                  {t("getStarted")}
                </Link>
              </>
            )}
            <div className="border-l border-border pl-4 ml-2">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
