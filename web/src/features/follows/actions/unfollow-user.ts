"use server";

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { Follow } from "@/models/follow";
import { User } from "@/models/user";

export async function unfollowUser(userId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user.");
  }

  if (session.user.id === userId) {
    throw new Error("You cannot unfollow yourself.");
  }

  await connectDB();

  const targetUser = await User.findById(userId)
    .select("_id username")
    .lean();

  if (!targetUser) {
    throw new Error("User not found.");
  }

  await Follow.deleteOne({
    follower: session.user.id,
    following: userId,
  });

  revalidatePath(`/u/${targetUser.username}`);
  revalidatePath("/feed");
}