"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { Project } from "@/models/project";
import { projectSchema } from "@/features/projects/schemas/project.schema";
import { createProjectSlug } from "@/features/projects/utils/create-project-slug";

export type CreateProjectState = {
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

export async function createProject(
  _previousState: CreateProjectState,
  formData: FormData
): Promise<CreateProjectState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be signed in to create a project.",
    };
  }

  if (!session.user.isOnboarded) {
    return {
      error: "Please complete onboarding first.",
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

  const baseSlug = createProjectSlug(parsed.data.title);

  if (!baseSlug) {
    return {
      error: "Please use a project title with letters or numbers.",
    };
  }

  let slug = baseSlug;
  let counter = 2;

  while (
    await Project.exists({
      owner: session.user.id,
      slug,
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  let projectId: string;

try {
  const project = await Project.create({
    owner: session.user.id,
    slug,
    ...parsed.data,
  });

  projectId = project._id.toString();
} catch (error) {
  console.error("Create project error:", error);

  return {
    error: "Something went wrong while creating the project.",
  };
}

redirect(`/projects/${projectId}`);
}