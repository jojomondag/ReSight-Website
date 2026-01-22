"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-bg-secondary border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex justify-between items-center min-h-[5rem]">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icon.svg"
              alt="ReSight Logo"
              width={40}
              height={40}
              className="w-9 h-9 sm:w-10 sm:h-10"
            />
            <span className="text-xl sm:text-2xl font-bold text-text-primary">ReSight</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 sm:gap-10 ml-auto mr-8">
            <Link
              href="/"
              className={`text-base sm:text-lg font-medium transition-colors ${
                isActive("/")
                  ? "text-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/buy"
              className={`text-base sm:text-lg font-medium transition-colors ${
                isActive("/buy")
                  ? "text-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Pricing
            </Link>
            {session && (
              <Link
                href="/dashboard"
                className={`text-base sm:text-lg font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-base text-text-secondary hidden sm:block">
                  {session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  Login
                </Link>
                <Link href="/register" className="btn-primary text-base sm:text-lg px-5 py-2.5">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
