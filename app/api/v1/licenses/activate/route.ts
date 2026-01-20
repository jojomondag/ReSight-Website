import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { signLicenseData } from "@/lib/license";
import { z } from "zod";

const activationSchema = z.object({
  license_key: z.string().min(1, "License key is required"),
  machine_id: z.string().min(1, "Machine ID is required"),
  machine_name: z.string().optional(),
  app_version: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { license_key, machine_id, machine_name } = activationSchema.parse(body);

    const license = await prisma.license.findUnique({
      where: { licenseKey: license_key },
    });

    if (!license) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid license key",
        },
        { status: 404 }
      );
    }

    if (license.status === "revoked") {
      return NextResponse.json(
        {
          success: false,
          error: "This license has been revoked",
        },
        { status: 403 }
      );
    }

    // Check if already activated on a different machine
    if (license.machineId && license.machineId !== machine_id) {
      return NextResponse.json(
        {
          success: false,
          error: "This license is already activated on a different machine",
        },
        { status: 403 }
      );
    }

    const activatedAt = license.activatedAt || new Date();

    // Update license with machine info if not already activated
    if (!license.machineId) {
      await prisma.license.update({
        where: { id: license.id },
        data: {
          machineId: machine_id,
          machineName: machine_name || null,
          activatedAt,
        },
      });
    }

    // Create signed license data
    const licenseData = {
      license_key,
      machine_id,
      activated_at: activatedAt.toISOString(),
    };

    const signature = signLicenseData(licenseData);

    return NextResponse.json({
      success: true,
      license: {
        license_key,
        machine_id,
        activated_at: activatedAt.toISOString(),
        signature,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.errors[0].message,
        },
        { status: 400 }
      );
    }

    console.error("License activation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred during license activation",
      },
      { status: 500 }
    );
  }
}
