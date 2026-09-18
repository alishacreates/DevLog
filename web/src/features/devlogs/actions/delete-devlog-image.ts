"use server";

import { del } from "@vercel/blob";

import { auth } from "@/auth";

const BLOB_HOST =
  "uxky98pamemk1mf0.public.blob.vercel-storage.com";

export async function deleteDevLogImage(url: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error("Invalid image URL.");
  }

  if (
    parsedUrl.protocol !== "https:" ||
    parsedUrl.hostname !== BLOB_HOST
  ) {
    throw new Error("Invalid image URL.");
  }

  await del(url);
}