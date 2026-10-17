import { del, list } from "@vercel/blob";

import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";

const ORPHAN_AGE_MS = 24 * 60 * 60 * 1000;

export async function cleanupOrphanedDevLogImages() {
  await connectDB();

  const devLogs = await DevLog.find({
    "images.0": { $exists: true },
  })
    .select("images")
    .lean();

  const referencedUrls = new Set(
    devLogs.flatMap((devLog) => devLog.images ?? [])
  );

  let cursor: string | undefined;
  const now = Date.now();
  const orphanUrls: string[] = [];

  do {
    const result = await list({
      prefix: "devlogs/tmp/",
      cursor,
      limit: 1000,
    });

    for (const blob of result.blobs) {
      const oldEnough =
        now - new Date(blob.uploadedAt).getTime() >
        ORPHAN_AGE_MS;

      const referenced = referencedUrls.has(blob.url);

      if (oldEnough && !referenced) {
        orphanUrls.push(blob.url);
      }
    }

    cursor = result.hasMore
      ? result.cursor
      : undefined;
  } while (cursor);

  if (orphanUrls.length > 0) {
    await del(orphanUrls);
  }

  return {
    deleted: orphanUrls.length,
  };
}