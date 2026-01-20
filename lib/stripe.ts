import Stripe from "stripe";

// Use placeholder during build if not set
const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";

export const stripe = new Stripe(stripeKey, {
  apiVersion: "2024-04-10",
  typescript: true,
});

export async function createCheckoutSession(
  userEmail: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: userEmail,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userEmail,
    },
  });

  return session;
}
