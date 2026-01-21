import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateLicenseKey } from "@/lib/license";
import { z } from "zod";

function isAuthorized(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    console.error("ADMIN_API_KEY not configured");
    return false;
  }

  return apiKey === adminKey;
}

// GET /api/admin/licenses - List all licenses
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const email = searchParams.get("email");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (email) where.user = { email: { contains: email, mode: "insensitive" } };

    const licenses = await prisma.license.findMany({
      where,
      include: {
        user: {
          select: { id: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ licenses });
  } catch (error) {
    console.error("Error listing licenses:", error);
    return NextResponse.json(
      { error: "Failed to list licenses" },
      { status: 500 }
    );
  }
}

const createLicenseSchema = z.object({
  email: z.string().email("Valid email required"),
  licenseKey: z.string().optional(),
});

// POST /api/admin/licenses - Create a new license
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, licenseKey: customKey } = createLicenseSchema.parse(body);

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Create user with a random password (they'll need to reset it)
      const bcrypt = await import("bcryptjs");
      const randomPassword = crypto.randomUUID();
      const passwordHash = await bcrypt.hash(randomPassword, 12);

      user = await prisma.user.create({
        data: {
          email,
          passwordHash,
        },
      });
    }

    // Generate or use custom license key
    const licenseKey = customKey || generateLicenseKey();

    // Create license
    const license = await prisma.license.create({
      data: {
        licenseKey,
        userId: user.id,
        status: "active",
      },
      include: {
        user: {
          select: { id: true, email: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      license,
      message: user ? "License created for existing user" : "License created with new user account",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Error creating license:", error);
    return NextResponse.json(
      { error: "Failed to create license" },
      { status: 500 }
    );
  }
}
