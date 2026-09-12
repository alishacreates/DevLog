"use server";

import mongoose, { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";
import { Project } from "@/models/project";

export async function deleteProject(projectId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!session.user.isOnboarded) {
    throw new Error("Please complete onboarding first.");
  }

  if (!Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project");
  }

  await connectDB();

  const dbSession = await mongoose.startSession();

  try {
    await dbSession.withTransaction(async () => {
      const project = await Project.findOne({
        _id: projectId,
        owner: session.user.id,
      }).session(dbSession);

      if (!project) {
        throw new Error(
          "Project not found or you do not have permission to delete it."
        );
      }

      await DevLog.deleteMany({
        project: project._id,
      }).session(dbSession);

      await Project.deleteOne({
        _id: project._id,
        owner: session.user.id,
      }).session(dbSession);
    });
  } catch (error) {
    console.error("Delete project error:", error);

    throw error;
  } finally {
    await dbSession.endSession();
  }

  revalidatePath("/projects");
  revalidatePath("/feed");

  redirect("/projects");
}