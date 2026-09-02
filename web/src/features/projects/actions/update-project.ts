"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { projectSchema } from "@/features/projects/schemas/project.schema";
import { connectDB } from "@/lib/db/mongoose";
import { Project } from "@/models/project";

export type UpdateProjectState = {
  error?: string;
  fieldErrors?: {
    title?: string[];
    description?: string[];
    status?: string[];
    techStack?: string[];
    githubUrl?: string[];
    liveUrl?: string[];
    isPublic?: string[];
  };
};

export async function updateProject(
  projectId: string,
  _previousState: UpdateProjectState,
  formData: FormData
): Promise<UpdateProjectState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be signed in to update a project.",
    };
  }

  if (!Types.ObjectId.isValid(projectId)) {
    return {
      error: "Invalid project.",
    };
  }

  const techStack = String(formData.get("techStack") ?? "")
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    techStack,
    githubUrl: formData.get("githubUrl"),
    liveUrl: formData.get("liveUrl"),
    isPublic: formData.get("isPublic") === "on",
  });

  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  await connectDB();

  try {
    const project = await Project.findOneAndUpdate(
      {
        _id: projectId,
        owner: session.user.id,
      },
      {
        $set: parsed.data,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!project) {
      return {
        error: "Project not found or you do not have permission to edit it.",
      };
    }
  } catch (error) {
    console.error("Update project error:", error);

    return {
      error: "Something went wrong while updating the project.",
    };
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${projectId}`);

  redirect(`/projects/${projectId}`);
}