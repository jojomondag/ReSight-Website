import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/lib/i18n/navigation";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Handle internationalization first
  const response = intlMiddleware(request);

  // Check if this is a dashboard route that needs auth protection
  // The locale is included in the path, e.g., /en/dashboard, /sv/dashboard
  const isDashboardRoute = pathname.match(/^\/[a-z]{2}\/dashboard/);

  if (isDashboardRoute) {
    // Check for auth session
    // Note: For proper auth integration, we need to check the session
    // NextAuth middleware would typically be used here, but since we're
    // using next-intl middleware, we'll handle auth in the page component
    // or use a different approach
  }

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /.*\\..* (static files)
    "/((?!api|_next|.*\\..*).*)",
  ],
};
