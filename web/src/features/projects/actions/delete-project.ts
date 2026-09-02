"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { Project } from "@/models/project";

export async function deleteProject(projectId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project");
  }

  await connectDB();

  const deletedProject = await Project.findOneAndDelete({
    _id: projectId,
    owner: session.user.id,
  });

  if (!deletedProject) {
    throw new Error(
      "Project not found or you do not have permission to delete it."
    );
  }

  revalidatePath("/projects");

  redirect("/projects");
}