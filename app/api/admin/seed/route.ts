import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

const SEED_SECRET = "temp-seed-secret-12345";

function generateLicenseKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segments = [];
  for (let i = 0; i < 4; i++) {
    let segment = "";
    for (let j = 0; j < 5; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }
  return segments.join("-");
}

export async function POST(request: NextRequest) {
  const { secret, email } = await request.json();

  if (secret !== SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  try {
    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const passwordHash = await hashPassword("temp-password-change-me");
      user = await prisma.user.create({
        data: {
          email,
          passwordHash,
        },
      });
    }

    // Check if user already has a license
    const existingLicense = await prisma.license.findFirst({
      where: { userId: user.id },
    });

    if (existingLicense) {
      return NextResponse.json({
        message: "License already exists",
        licenseKey: existingLicense.licenseKey,
        email,
      });
    }

    // Create the license
    const licenseKey = generateLicenseKey();
    await prisma.license.create({
      data: {
        licenseKey,
        userId: user.id,
        status: "active",
      },
    });

    return NextResponse.json({
      message: "License created successfully",
      licenseKey,
      email,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to create license" },
      { status: 500 }
    );
  }
}
