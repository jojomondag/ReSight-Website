import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

const ADMIN_EMAIL = "josef.nobach@outlook.com";
const ADMIN_LICENSE_KEY = "ADMIN-PERMA-NENT-KEY1";
const SEED_SECRET = process.env.SEED_SECRET || "temp-seed-secret-12345";

export async function POST(request: NextRequest) {
  // Simple security check
  const { secret } = await request.json();

  if (secret !== SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find or create admin user
    let user = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL },
    });

    if (!user) {
      const passwordHash = await hashPassword("temp-password-change-me");
      user = await prisma.user.create({
        data: {
          email: ADMIN_EMAIL,
          passwordHash,
        },
      });
    }

    // Check if admin already has this license
    const existingLicense = await prisma.license.findFirst({
      where: {
        userId: user.id,
        licenseKey: ADMIN_LICENSE_KEY,
      },
    });

    if (existingLicense) {
      return NextResponse.json({
        message: "Admin license already exists",
        licenseKey: ADMIN_LICENSE_KEY,
      });
    }

    // Create the license
    await prisma.license.create({
      data: {
        licenseKey: ADMIN_LICENSE_KEY,
        userId: user.id,
        status: "active",
      },
    });

    return NextResponse.json({
      message: "Admin license created successfully",
      licenseKey: ADMIN_LICENSE_KEY,
      email: ADMIN_EMAIL,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
