"use server";

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { Like } from "@/models/like";

export async function unlikeDevLog(devLogId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!Types.ObjectId.isValid(devLogId)) {
    throw new Error("Invalid post.");
  }

  await connectDB();

  await Like.deleteOne({
    user: session.user.id,
    devLog: devLogId,
  });

  revalidatePath(`/devlogs/${devLogId}`);
}