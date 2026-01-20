import { auth } from "@/lib/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`, req.url)
    );
  }

  return null;
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
