"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Types } from "mongoose";
import { del } from "@vercel/blob";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";

export async function deleteDevLog(devLogId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!Types.ObjectId.isValid(devLogId)) {
    throw new Error("Invalid post.");
  }

  await connectDB();

  const devLog = await DevLog.findOne({
    _id: devLogId,
    author: session.user.id,
  })
    .select("project images")
    .lean();

  if (!devLog) {
    throw new Error(
      "Post not found or you do not have permission to delete it."
    );
  }

  const projectId = devLog.project.toString();

  await DevLog.deleteOne({
    _id: devLogId,
    author: session.user.id,
  });

  if (devLog.images?.length > 0) {
    try {
      await del(devLog.images);
    } catch (error) {
      console.error(
        "Failed to delete DevLog images:",
        error
      );
    }
  }

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/feed");

  redirect(`/projects/${projectId}`);
}