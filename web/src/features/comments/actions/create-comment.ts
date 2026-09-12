"use server";

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { commentSchema } from "@/features/comments/schemas/comment.schema";
import { connectDB } from "@/lib/db/mongoose";
import { Comment } from "@/models/comment";
import { DevLog } from "@/models/devlog";
import { Project } from "@/models/project";

export type CreateCommentState = {
  error?: string;
};

export async function createComment(
  devLogId: string,
  _previousState: CreateCommentState,
  formData: FormData
): Promise<CreateCommentState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be signed in to comment.",
    };
  }

  if (!Types.ObjectId.isValid(devLogId)) {
    return {
      error: "Invalid DevLog.",
    };
  }

  const parsed = commentSchema.safeParse({
    content: formData.get("content"),
  });

  if (!parsed.success) {
    return {
      error:
        parsed.error.issues[0]?.message ??
        "Invalid comment.",
    };
  }

  await connectDB();

  const devLog = await DevLog.findById(devLogId)
    .select("_id project")
    .lean();

  if (!devLog) {
    return {
      error: "DevLog not found.",
    };
  }

  const project = await Project.findById(
    devLog.project
  )
    .select("_id isPublic owner")
    .lean();

  if (!project) {
    return {
      error: "Project not found.",
    };
  }

  const isOwner =
    project.owner.toString() === session.user.id;

  if (!project.isPublic && !isOwner) {
    return {
      error: "You do not have permission to comment on this DevLog.",
    };
  }

  try {
    await Comment.create({
      author: session.user.id,
      devLog: devLogId,
      content: parsed.data.content,
    });
  } catch (error) {
    console.error("Create comment error:", error);

    return {
      error: "Could not post comment.",
    };
  }

  revalidatePath(`/devlogs/${devLogId}`);
  revalidatePath("/feed");

  return {};
}