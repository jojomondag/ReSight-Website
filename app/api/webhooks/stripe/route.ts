import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { generateLicenseKey } from "@/lib/license";
import { hashPassword } from "@/lib/auth";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json(
      { error: "Webhook configuration error" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await handleCheckoutCompleted(session);
    } catch (error) {
      console.error("Error handling checkout.session.completed:", error);
      return NextResponse.json(
        { error: "Failed to process checkout" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerEmail = session.customer_email;

  if (!customerEmail) {
    throw new Error("No customer email in session");
  }

  // Find or create user
  let user = await prisma.user.findUnique({
    where: { email: customerEmail },
  });

  if (!user) {
    // Create user with a random password (they'll need to use password reset)
    const randomPassword = Math.random().toString(36).slice(-12);
    const passwordHash = await hashPassword(randomPassword);

    user = await prisma.user.create({
      data: {
        email: customerEmail,
        passwordHash,
      },
    });
  }

  // Generate license key
  const licenseKey = generateLicenseKey();

  // Create license
  const license = await prisma.license.create({
    data: {
      licenseKey,
      userId: user.id,
      status: "active",
    },
  });

  // Create purchase record
  await prisma.purchase.create({
    data: {
      userId: user.id,
      licenseId: license.id,
      stripePaymentId: session.payment_intent as string,
      amount: session.amount_total || 0,
      currency: session.currency || "usd",
    },
  });

  console.log(`License created for ${customerEmail}: ${licenseKey}`);
}
