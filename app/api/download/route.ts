import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  // Check if user is authenticated
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Please login to download" },
      { status: 401 }
    );
  }

  // Check if user has a valid license
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { licenses: { where: { status: "active" } } },
  });

  if (!user || user.licenses.length === 0) {
    return NextResponse.json(
      { error: "No active license found. Please purchase ReSight first." },
      { status: 403 }
    );
  }

  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    console.error("Missing GITHUB_TOKEN");
    return NextResponse.json(
      { error: "Download service unavailable" },
      { status: 500 }
    );
  }

  try {
    // Get latest release info
    const releaseResponse = await fetch(
      "https://api.github.com/repos/jojomondag/ReSight/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${githubToken}`,
        },
      }
    );

    if (!releaseResponse.ok) {
      throw new Error(`Failed to fetch release: ${releaseResponse.status}`);
    }

    const release = await releaseResponse.json();

    // Find the installer asset
    const asset = release.assets?.find(
      (a: { name: string }) => a.name.endsWith(".exe") || a.name.endsWith(".msi")
    );

    if (!asset) {
      return NextResponse.json(
        { error: "No installer found in latest release" },
        { status: 404 }
      );
    }

    // Download the asset from GitHub
    const assetResponse = await fetch(asset.url, {
      headers: {
        Accept: "application/octet-stream",
        Authorization: `token ${githubToken}`,
      },
    });

    if (!assetResponse.ok) {
      throw new Error(`Failed to download asset: ${assetResponse.status}`);
    }

    // Stream the file to the user
    const headers = new Headers();
    headers.set("Content-Type", "application/octet-stream");
    headers.set("Content-Disposition", `attachment; filename="${asset.name}"`);
    headers.set("Content-Length", asset.size.toString());

    return new NextResponse(assetResponse.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 }
    );
  }
}
