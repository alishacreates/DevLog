"use server";

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { Comment } from "@/models/comment";
import { connectDB } from "@/lib/db/mongoose";

export async function deleteComment(commentId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!Types.ObjectId.isValid(commentId)) {
    throw new Error("Invalid comment.");
  }

  await connectDB();

  const comment = await Comment.findOne({
    _id: commentId,
    author: session.user.id,
  }).lean();

  if (!comment) {
    throw new Error(
      "Comment not found or you do not have permission to delete it."
    );
  }

  await Comment.deleteOne({
    _id: commentId,
    author: session.user.id,
  });

  revalidatePath(`/devlogs/${comment.devLog.toString()}`);
  revalidatePath("/feed");
}