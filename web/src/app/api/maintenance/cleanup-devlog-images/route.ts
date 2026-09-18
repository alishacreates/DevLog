import { NextResponse } from "next/server";

import { cleanupOrphanedDevLogImages } from "@/features/devlogs/lib/cleanup-orphaned-images";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (
    !process.env.CRON_SECRET ||
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const result =
      await cleanupOrphanedDevLogImages();

    return NextResponse.json(result);
  } catch (error) {
    console.error(
      "DevLog image cleanup error:",
      error
    );

    return NextResponse.json(
      { error: "Cleanup failed." },
      { status: 500 }
    );
  }
}