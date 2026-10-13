"use server";

import { redirect } from "next/navigation";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { devLogSchema } from "../schema/devlog.schema";
import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";
import { Project } from "@/models/project";

export type CreateDevLogState = {
  error?: string;
  fieldErrors?: {
    projectId?: string[];
    title?: string[];
    content?: string[];
    tags?: string[];
    images?: string[];
  };
};

export async function createDevLog(
  _previousState: CreateDevLogState,
  formData: FormData
): Promise<CreateDevLogState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be signed in to create a post.",
    };
  }

  if (!session.user.isOnboarded) {
    return {
      error: "Please complete onboarding first.",
    };
  }

  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const images = formData
    .getAll("images")
    .map(String)
    .map((image) => image.trim())
    .filter(Boolean);

  const parsed = devLogSchema.safeParse({
    projectId: formData.get("projectId"),
    title: formData.get("title"),
    content: formData.get("content"),
    tags,
    images,
  });

  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!Types.ObjectId.isValid(parsed.data.projectId)) {
    return {
      error: "Invalid project.",
    };
  }

  await connectDB();

  const project = await Project.findOne({
    _id: parsed.data.projectId,
    owner: session.user.id,
  }).lean();

  if (!project) {
    return {
      error: "Project not found or you do not have permission to post to it.",
    };
  }

  let devLogId: string;

  try {
    const devLog = await DevLog.create({
      author: session.user.id,
      project: parsed.data.projectId,
      title: parsed.data.title,
      content: parsed.data.content,
      tags: parsed.data.tags,
      images: parsed.data.images,
    });

    devLogId = devLog._id.toString();
  } catch (error) {
    console.error("Create DevLog error:", error);

    return {
      error: "Something went wrong while creating the post.",
    };
  }

  revalidatePath("/feed");
  revalidatePath(`/projects/${parsed.data.projectId}`);

  redirect(`/devlogs/${devLogId}`);
}