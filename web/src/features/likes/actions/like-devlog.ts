"use server";

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";
import { Like } from "@/models/like";

export async function likeDevLog(devLogId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!Types.ObjectId.isValid(devLogId)) {
    throw new Error("Invalid post.");
  }

  await connectDB();

  const devLog = await DevLog.findById(devLogId)
    .select("_id project")
    .lean();

  if (!devLog) {
    throw new Error("Post not found.");
  }

  try {
    await Like.create({
      user: session.user.id,
      devLog: devLogId,
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return;
    }

    console.error("Like DevLog error:", error);
    throw new Error("Could not like post.");
  }

  revalidatePath(`/devlogs/${devLogId}`);
}