"use server";

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { Follow } from "@/models/follow";
import { User } from "@/models/user";

export async function followUser(userId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user.");
  }

  if (session.user.id === userId) {
    throw new Error("You cannot follow yourself.");
  }

  await connectDB();

  const targetUser = await User.findById(userId)
    .select("_id username")
    .lean();

  if (!targetUser) {
    throw new Error("User not found.");
  }

  try {
    await Follow.create({
      follower: session.user.id,
      following: userId,
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      // Already following — treat as successful/idempotent.
      return;
    }

    console.error("Follow user error:", error);
    throw new Error("Could not follow user.");
  }

  revalidatePath(`/u/${targetUser.username}`);
  revalidatePath("/feed");
}