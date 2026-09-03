"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";

export async function deleteDevLog(devLogId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!Types.ObjectId.isValid(devLogId)) {
    throw new Error("Invalid DevLog.");
  }

  await connectDB();

  const devLog = await DevLog.findOne({
    _id: devLogId,
    author: session.user.id,
  }).lean();

  if (!devLog) {
    throw new Error(
      "DevLog not found or you do not have permission to delete it."
    );
  }

  const projectId = devLog.project.toString();

  await DevLog.deleteOne({
    _id: devLogId,
    author: session.user.id,
  });

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/feed");

  redirect(`/projects/${projectId}`);
}