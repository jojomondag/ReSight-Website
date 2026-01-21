import { NextResponse } from "next/server";

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  assets: GitHubAsset[];
  body: string;
}

export async function GET() {
  try {
    const githubToken = process.env.GITHUB_TOKEN;

    if (!githubToken) {
      console.error("GITHUB_TOKEN not configured");
      return NextResponse.json(
        { error: "Download service not configured", debug: "missing_token" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.github.com/repos/jojomondag/ReSight/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${githubToken}`,
        },
        cache: "no-store", // Don't cache to ensure fresh data
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GitHub API error: ${response.status}`, errorText);
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const release: GitHubRelease = await response.json();

    // Find the main installer (exe file)
    const installer = release.assets.find(
      (asset) => asset.name.endsWith(".exe") || asset.name.endsWith(".msi")
    );

    return NextResponse.json({
      version: release.tag_name,
      name: release.name,
      publishedAt: release.published_at,
      changelog: release.body,
      // Use our proxy endpoint instead of direct GitHub URL (private repo)
      downloadUrl: installer ? "/api/download" : null,
      fileName: installer?.name || null,
      fileSize: installer?.size || null,
      downloadCount: installer?.download_count || 0,
      assets: release.assets.map((asset) => ({
        name: asset.name,
        url: "/api/download", // All downloads go through proxy
        size: asset.size,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch release:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest release" },
      { status: 500 }
    );
  }
}
