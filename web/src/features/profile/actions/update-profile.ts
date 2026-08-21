"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { profileSchema } from "../schemas/profile.schema";
import { User } from "@/models/user";

export type ProfileState = {
  error?: string;
  fieldErrors?: {
    name?: string[];
    bio?: string[];
    university?: string[];
    location?: string[];
    skills?: string[];
    techStack?: string[];
    github?: string[];
    portfolio?: string[];
  };
};

export async function updateProfile(
  _previousState: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be signed in to update your profile.",
    };
  }

  if (!session.user.isOnboarded) {
    return {
      error: "Please complete onboarding first.",
    };
  }

  const skills = String(formData.get("skills") ?? "")
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const techStack = String(formData.get("techStack") ?? "")
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio"),
    university: formData.get("university"),
    location: formData.get("location"),
    skills,
    techStack,
    github: formData.get("github"),
    portfolio: formData.get("portfolio"),
  });

  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  await connectDB();

  try {
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        $set: parsed.data,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return {
        error: "Your account could not be found.",
      };
    }
  } catch (error) {
    console.error("Profile update error:", error);

    return {
      error: "Something went wrong while updating your profile.",
    };
  }

  revalidatePath("/profile");
  redirect("/profile");
}