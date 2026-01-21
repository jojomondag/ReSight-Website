import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
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

// GET /api/admin/licenses/[id] - Get single license
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const license = await prisma.license.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true },
        },
        purchase: true,
      },
    });

    if (!license) {
      return NextResponse.json({ error: "License not found" }, { status: 404 });
    }

    return NextResponse.json({ license });
  } catch (error) {
    console.error("Error fetching license:", error);
    return NextResponse.json(
      { error: "Failed to fetch license" },
      { status: 500 }
    );
  }
}

const updateLicenseSchema = z.object({
  status: z.enum(["active", "revoked"]).optional(),
  clearMachine: z.boolean().optional(),
});

// PATCH /api/admin/licenses/[id] - Update license
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status, clearMachine } = updateLicenseSchema.parse(body);

    const existingLicense = await prisma.license.findUnique({ where: { id } });
    if (!existingLicense) {
      return NextResponse.json({ error: "License not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (clearMachine) {
      updateData.machineId = null;
      updateData.machineName = null;
      updateData.activatedAt = null;
    }

    const license = await prisma.license.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: { id: true, email: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      license,
      message: clearMachine
        ? "License machine binding cleared"
        : `License status updated to ${status}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Error updating license:", error);
    return NextResponse.json(
      { error: "Failed to update license" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/licenses/[id] - Delete license
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const existingLicense = await prisma.license.findUnique({
      where: { id },
      include: { purchase: true },
    });

    if (!existingLicense) {
      return NextResponse.json({ error: "License not found" }, { status: 404 });
    }

    // Delete associated purchase first if exists
    if (existingLicense.purchase) {
      await prisma.purchase.delete({ where: { id: existingLicense.purchase.id } });
    }

    await prisma.license.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "License deleted",
    });
  } catch (error) {
    console.error("Error deleting license:", error);
    return NextResponse.json(
      { error: "Failed to delete license" },
      { status: 500 }
    );
  }
}
