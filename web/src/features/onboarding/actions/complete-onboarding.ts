"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { RESERVED_USERNAMES } from "@/features/onboarding/constants/reserved-usernames";
import { onboardingSchema } from "@/features/onboarding/schemas/onboarding.schema";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";

export type OnboardingState = {
  error?: string;
};

export async function completeOnboarding(
  _previousState: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be signed in to complete onboarding.",
    };
  }

  const parsed = onboardingSchema.safeParse({
    username: formData.get("username"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid username.",
    };
  }

  const username = parsed.data.username;

  if (RESERVED_USERNAMES.has(username)) {
    return {
      error: "That username is reserved. Please choose another one.",
    };
  }

  await connectDB();

  const existingUser = await User.findOne({
    username,
    _id: { $ne: session.user.id },
  }).lean();

  if (existingUser) {
    return {
      error: "That username is already taken.",
    };
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        $set: {
          username,
        },
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
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return {
        error: "That username is already taken.",
      };
    }

    console.error("Onboarding error:", error);

    return {
      error: "Something went wrong. Please try again.",
    };
  }

  redirect("/feed");
}