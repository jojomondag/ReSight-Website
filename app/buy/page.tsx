"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const features = [
  "Unlimited crosshair customization",
  "Advanced display settings",
  "Discord volume control",
  "Unlimited gaming profiles",
  "Lifetime updates",
  "Priority support",
  "One machine activation",
  "Offline use after activation",
];

function BuyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePurchase = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login?callbackUrl=/buy");
          return;
        }
        setError(data.error || "Failed to start checkout");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Get ReSight
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            One-time purchase. Lifetime access. No subscriptions or hidden fees.
          </p>
        </div>

        {canceled && (
          <div className="max-w-lg mx-auto mb-8">
            <div className="bg-error/10 border border-error text-error rounded-lg px-4 py-3 text-center">
              Your payment was canceled. You can try again whenever you&apos;re ready.
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-lg mx-auto mb-8">
            <div className="bg-error/10 border border-error text-error rounded-lg px-4 py-3 text-center">
              {error}
            </div>
          </div>
        )}

        <div className="max-w-lg mx-auto">
          <div className="card border-accent">
            <div className="text-center mb-8">
              <span className="inline-block bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full mb-4">
                Lifetime License
              </span>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                ReSight License
              </h2>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-accent">$19</span>
                <span className="text-text-secondary">USD</span>
              </div>
              <p className="text-text-secondary mt-2">One-time payment</p>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-accent flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-text-primary">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Purchase Now"}
            </button>

            <p className="text-center text-text-secondary text-sm mt-4">
              Secure payment powered by Stripe
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-text-secondary text-sm">
              Already purchased?{" "}
              <Link
                href="/dashboard"
                className="text-accent hover:text-accent-light transition-colors"
              >
                View your licenses
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuyPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
      <BuyPageContent />
    </Suspense>
  );
}
