import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session.customer_email) {
      return NextResponse.json(
        { error: "Invalid session" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.customer_email },
      include: {
        licenses: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!user || user.licenses.length === 0) {
      return NextResponse.json(
        { error: "License not found. It may still be processing." },
        { status: 404 }
      );
    }

    const license = user.licenses[0];

    return NextResponse.json({
      license: {
        licenseKey: license.licenseKey,
        email: user.email,
        createdAt: license.createdAt,
      },
    });
  } catch (error) {
    console.error("License retrieval error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve license" },
      { status: 500 }
    );
  }
}
