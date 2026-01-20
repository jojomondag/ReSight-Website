"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface License {
  id: string;
  licenseKey: string;
  machineId: string | null;
  machineName: string | null;
  activatedAt: string | null;
  createdAt: string;
  status: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/dashboard");
    } else if (status === "authenticated") {
      fetchLicenses();
    }
  }, [status, router]);

  const fetchLicenses = async () => {
    try {
      const response = await fetch("/api/user/licenses");
      const data = await response.json();

      if (response.ok) {
        setLicenses(data.licenses);
      }
    } catch (error) {
      console.error("Failed to fetch licenses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (licenseKey: string, id: string) => {
    await navigator.clipboard.writeText(licenseKey);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
          <p className="text-text-secondary">
            Manage your ReSight licenses and account.
          </p>
        </div>

        {/* Download Section - shown prominently when user has licenses */}
        {licenses.length > 0 && (
          <div className="card mb-8 border-accent">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-1">
                  Ready to Download
                </h2>
                <p className="text-text-secondary">
                  Get the latest version of ReSight and use your license key to activate.
                </p>
              </div>
              <Link
                href="https://github.com/jojomondag/ReSight/releases"
                className="btn-primary inline-flex items-center gap-2 whitespace-nowrap"
                target="_blank"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download ReSight
              </Link>
            </div>
          </div>
        )}

        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Account
          </h2>
          <p className="text-text-secondary">
            Logged in as <span className="text-text-primary">{session.user?.email}</span>
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">
              Your Licenses
            </h2>
            <Link href="/buy" className="btn-primary text-sm">
              Purchase License
            </Link>
          </div>

          {licenses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <p className="text-text-secondary mb-4">
                You don&apos;t have any licenses yet.
              </p>
              <Link href="/buy" className="text-accent hover:text-accent-light">
                Purchase ReSight
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {licenses.map((license) => (
                <div
                  key={license.id}
                  className="bg-bg-tertiary border border-border rounded-lg p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <code className="text-lg font-mono text-accent">
                          {license.licenseKey}
                        </code>
                        <button
                          onClick={() =>
                            copyToClipboard(license.licenseKey, license.id)
                          }
                          className="p-1 hover:bg-border rounded transition-colors"
                          title="Copy to clipboard"
                        >
                          {copiedId === license.id ? (
                            <svg
                              className="w-4 h-4 text-accent"
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
                              className="w-4 h-4 text-text-secondary"
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

                      <div className="flex flex-wrap gap-4 text-sm">
                        <span
                          className={`inline-flex items-center gap-1 ${
                            license.status === "active"
                              ? "text-accent"
                              : "text-error"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              license.status === "active"
                                ? "bg-accent"
                                : "bg-error"
                            }`}
                          />
                          {license.status}
                        </span>

                        {license.activatedAt ? (
                          <span className="text-text-secondary">
                            Activated on{" "}
                            {new Date(license.activatedAt).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-text-secondary">
                            Not yet activated
                          </span>
                        )}

                        {license.machineName && (
                          <span className="text-text-secondary">
                            Machine: {license.machineName}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-text-secondary">
                      Purchased{" "}
                      {new Date(license.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
