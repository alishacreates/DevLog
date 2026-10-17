"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Types } from "mongoose";
import { del } from "@vercel/blob";

import { auth } from "@/auth";
import { devLogSchema } from "../schema/devlog.schema";
import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";
import { Project } from "@/models/project";

export type UpdateDevLogState = {
  error?: string;
  fieldErrors?: {
    projectId?: string[];
    title?: string[];
    content?: string[];
    tags?: string[];
    images?: string[];
  };
};

export async function updateDevLog(
  devLogId: string,
  _previousState: UpdateDevLogState,
  formData: FormData
): Promise<UpdateDevLogState> {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "You must be signed in." };
  }

  if (!Types.ObjectId.isValid(devLogId)) {
    return { error: "Invalid post." };
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
    return { error: "Invalid project." };
  }

  await connectDB();

  const existingDevLog = await DevLog.findOne({
    _id: devLogId,
    author: session.user.id,
  })
    .select("images")
    .lean();

  if (!existingDevLog) {
    return {
      error: "Post not found or you do not have permission to edit it.",
    };
  }

  const project = await Project.findOne({
    _id: parsed.data.projectId,
    owner: session.user.id,
  }).lean();

  if (!project) {
    return {
      error: "Project not found or you do not have permission to use it.",
    };
  }

  const oldImages = existingDevLog.images ?? [];
  const newImages = parsed.data.images;

  const removedImages = oldImages.filter(
    (image: string) => !newImages.includes(image)
  );

  try {
    const updatedDevLog = await DevLog.findOneAndUpdate(
      {
        _id: devLogId,
        author: session.user.id,
      },
      {
        $set: {
          project: parsed.data.projectId,
          title: parsed.data.title,
          content: parsed.data.content,
          tags: parsed.data.tags,
          images: parsed.data.images,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!updatedDevLog) {
      return {
        error: "Post not found or you do not have permission to edit it.",
      };
    }

    if (removedImages.length > 0) {
      try {
        await del(removedImages);
      } catch (error) {
        console.error(
          "Failed to delete removed DevLog images:",
          error
        );
      }
    }
  } catch (error) {
    console.error("Update DevLog error:", error);

    return {
      error: "Something went wrong while updating the post.",
    };
  }

  revalidatePath(`/devlogs/${devLogId}`);
  revalidatePath(`/projects/${parsed.data.projectId}`);
  revalidatePath("/feed");

  redirect(`/devlogs/${devLogId}`);
}