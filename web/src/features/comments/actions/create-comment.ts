"use server";

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { validateCommentContentJson } from "@/features/comments/lib/validate-comment-content";
import { commentSchema } from "@/features/comments/schemas/comment.schema";
import { connectDB } from "@/lib/db/mongoose";
import { Comment } from "@/models/comment";
import { DevLog } from "@/models/devlog";
import { Project } from "@/models/project";

export type CreateCommentState = {
  fieldError?: string;
  error?: string;
  success?: boolean;
};

export async function createComment(
  devLogId: string,
  _previousState: CreateCommentState,
  formData: FormData,
): Promise<CreateCommentState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be signed in to comment.",
    };
  }

  if (!Types.ObjectId.isValid(devLogId)) {
    return {
      error: "Invalid post.",
    };
  }

  const parsed = commentSchema.safeParse({
    content: formData.get("content"),
    contentJson:
      formData.get("contentJson") || undefined,
  });

  if (!parsed.success) {
    return {
      fieldError:
        parsed.error.issues[0]?.message ??
        "Invalid comment.",
    };
  }

  let safeContentJson: string | undefined;

  if (parsed.data.contentJson) {
    const validated =
      validateCommentContentJson(
        parsed.data.contentJson,
        parsed.data.content,
      );

    if (!validated) {
      return {
        error: "Invalid comment formatting.",
      };
    }

    safeContentJson = validated;
  }

  await connectDB();

  const devLog = await DevLog.findById(devLogId)
    .select("_id project")
    .lean();

  if (!devLog) {
    return {
      error: "Post not found.",
    };
  }

  const project = await Project.findById(
    devLog.project,
  )
    .select("_id isPublic owner")
    .lean();

  if (!project) {
    return {
      error: "Project not found.",
    };
  }

  const isOwner =
    project.owner.toString() ===
    session.user.id;

  if (!project.isPublic && !isOwner) {
    return {
      error:
        "You do not have permission to comment on this post.",
    };
  }

  try {
    await Comment.create({
      author: session.user.id,
      devLog: devLogId,
      content: parsed.data.content,
      contentJson: safeContentJson,
    });
  } catch (error) {
    console.error(
      "Create comment error:",
      error,
    );

    return {
      error: "Could not post comment.",
    };
  }

  revalidatePath(
    `/devlogs/${devLogId}`,
  );
  revalidatePath("/feed");

  return {
    success: true,
  };
}