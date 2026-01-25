"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Footer() {
  const t = useTranslations("footer");
  const { data: session } = useSession();

  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/icon.svg"
                alt="ReSight Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-text-primary">
                ReSight
              </span>
            </Link>
            <p className="text-text-secondary text-sm max-w-md">
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="text-text-primary font-semibold mb-4">
              {t("product")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#features"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  {t("features")}
                </Link>
              </li>
              <li>
                <Link
                  href="/buy"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  {t("pricing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  {t("dashboard")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-text-primary font-semibold mb-4">
              {t("account")}
            </h3>
            <ul className="space-y-2">
              {session ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                    >
                      {t("dashboard")}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                    >
                      {t("signOut")}
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                    >
                      {t("login")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                    >
                      {t("register")}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <a
            href="https://discord.gg/AZJ9AA9S"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-secondary hover:text-[#5865F2] transition-colors"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 127 96"
              fill="currentColor"
            >
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
            <span className="text-sm font-medium">{t("joinDiscord")}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
