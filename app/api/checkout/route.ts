import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCheckoutSession, getPriceIdForLocale } from "@/lib/stripe";
import { locales, type Locale } from "@/lib/i18n/config";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to purchase" },
        { status: 401 }
      );
    }

    // Get locale from request body
    let locale: Locale = "en";
    try {
      const body = await request.json();
      if (body.locale && locales.includes(body.locale)) {
        locale = body.locale as Locale;
      }
    } catch {
      // If no body or invalid JSON, use default locale
    }

    // Get the price ID for this locale
    const priceId = getPriceIdForLocale(locale);
    if (!priceId) {
      return NextResponse.json(
        { error: "Payment configuration error" },
        { status: 500 }
      );
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const checkoutSession = await createCheckoutSession(
      session.user.email,
      priceId,
      `${origin}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`,
      `${origin}/${locale}/buy?canceled=true`,
      locale
    );

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
