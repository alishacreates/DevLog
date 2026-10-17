
"use server";

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { Project } from "@/models/project";
import { goalTitleSchema } from "@/features/project-goals/schemas/goal.schema";

type GoalResult = {
  success: boolean;
  error?: string;
};

async function getOwnerId() {
  const session = await auth();

  if (!session?.user?.id || !session.user.isOnboarded) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
}

function validateId(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid identifier");
  }
}

export async function addGoal(
  projectId: string,
  title: string
): Promise<GoalResult> {
  try {
    const ownerId = await getOwnerId();
    validateId(projectId);

    const parsed = goalTitleSchema.safeParse(title);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      };
    }

    await connectDB();

    const project = await Project.findOneAndUpdate(
      {
        _id: projectId,
        owner: ownerId,
        "goals.49": { $exists: false },
      },
      {
        $push: {
          goals: {
            _id: new Types.ObjectId(),
            title: parsed.data,
            isCompleted: false,
          },
        },
      },
      { runValidators: true }
    );

    if (!project) {
      return {
        success: false,
        error: "Project not found, access denied, or maximum 50 goals reached.",
      };
    }

    revalidatePath(`/projects/${projectId}`);

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Unable to add goal.",
    };
  }
}

export async function updateGoal(
  projectId: string,
  goalId: string,
  title: string
): Promise<GoalResult> {
  try {
    const ownerId = await getOwnerId();
    validateId(projectId);
    validateId(goalId);

    const parsed = goalTitleSchema.safeParse(title);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      };
    }

    await connectDB();

    const result = await Project.updateOne(
      {
        _id: projectId,
        owner: ownerId,
        "goals._id": new Types.ObjectId(goalId),
      },
      {
        $set: {
          "goals.$.title": parsed.data,
        },
      },
      { runValidators: true }
    );

    if (!result.matchedCount) {
      return { success: false, error: "Goal not found." };
    }

    revalidatePath(`/projects/${projectId}`);

    return { success: true };
  } catch {
    return { success: false, error: "Unable to update goal." };
  }
}

export async function toggleGoal(
  projectId: string,
  goalId: string,
  isCompleted: boolean
): Promise<GoalResult> {
  try {
    const ownerId = await getOwnerId();
    validateId(projectId);
    validateId(goalId);

    if (typeof isCompleted !== "boolean") {
      return { success: false, error: "Invalid completion status." };
    }

    await connectDB();

    const result = await Project.updateOne(
      {
        _id: projectId,
        owner: ownerId,
        "goals._id": new Types.ObjectId(goalId),
      },
      {
        $set: {
          "goals.$.isCompleted": isCompleted,
        },
      },
      { runValidators: true }
    );

    if (!result.matchedCount) {
      return { success: false, error: "Goal not found." };
    }

    revalidatePath(`/projects/${projectId}`);

    return { success: true };
  } catch {
    return { success: false, error: "Unable to update goal." };
  }
}

export async function deleteGoal(
  projectId: string,
  goalId: string
): Promise<GoalResult> {
  try {
    const ownerId = await getOwnerId();
    validateId(projectId);
    validateId(goalId);

    await connectDB();

    const result = await Project.updateOne(
      {
        _id: projectId,
        owner: ownerId,
        "goals._id": new Types.ObjectId(goalId),
      },
      {
        $pull: {
          goals: {
            _id: new Types.ObjectId(goalId),
          },
        },
      }
    );

    if (!result.matchedCount) {
      return { success: false, error: "Goal not found." };
    }

    revalidatePath(`/projects/${projectId}`);

    return { success: true };
  } catch {
    return { success: false, error: "Unable to delete goal." };
  }
}
