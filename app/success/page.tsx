"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface LicenseData {
  licenseKey: string;
  email: string;
}

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [licenseData, setLicenseData] = useState<LicenseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (sessionId) {
      fetchLicenseData();
    } else {
      setIsLoading(false);
    }
  }, [sessionId]);

  const fetchLicenseData = async () => {
    try {
      const response = await fetch(`/api/license?session_id=${sessionId}`);
      const data = await response.json();

      if (response.ok && data.license) {
        setLicenseData({
          licenseKey: data.license.licenseKey,
          email: data.license.email,
        });
      } else {
        setError(data.error || "Failed to retrieve license");
      }
    } catch {
      setError("Failed to retrieve license details");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (licenseData?.licenseKey) {
      await navigator.clipboard.writeText(licenseData.licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Retrieving your license...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-accent"
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
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Thank You for Your Purchase!
          </h1>

          {error ? (
            <div className="bg-error/10 border border-error text-error rounded-lg px-4 py-3 mb-6">
              {error}
              <p className="mt-2 text-sm">
                If you completed your purchase, check your email or{" "}
                <Link href="/dashboard" className="underline">
                  view your dashboard
                </Link>
                .
              </p>
            </div>
          ) : licenseData ? (
            <>
              <p className="text-text-secondary mb-8">
                Your ReSight license has been created. Copy the license key below
                and use it to activate the app.
              </p>

              <div className="bg-bg-tertiary border border-border rounded-lg p-4 mb-6">
                <p className="text-sm text-text-secondary mb-2">Your License Key</p>
                <div className="flex items-center justify-center gap-4">
                  <code className="text-xl font-mono text-accent">
                    {licenseData.licenseKey}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-border rounded transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <svg
                        className="w-5 h-5 text-accent"
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
                    ) : (
                      <svg
                        className="w-5 h-5 text-text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-text-secondary text-sm mb-8">
                A copy has also been sent to <strong>{licenseData.email}</strong>
              </p>
            </>
          ) : (
            <p className="text-text-secondary mb-8">
              Your payment is being processed. Check your email for your license key,
              or visit your dashboard.
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/jnobach/ReSight/releases"
              className="btn-primary"
              target="_blank"
            >
              Download ReSight
            </Link>
            <Link href="/dashboard" className="btn-secondary">
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-200px)] flex items-center justify-center"><div className="text-center"><div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-text-secondary">Loading...</p></div></div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
