"use client";

import { useState, useTransition } from "react";
import { UserMinus, UserPlus } from "lucide-react";

import { followUser } from "@/features/follows/actions/follow-user";
import { unfollowUser } from "@/features/follows/actions/unfollow-user";

type FollowButtonProps = {
  userId: string;
  initialFollowing: boolean;
};

export function FollowButton({
  userId,
  initialFollowing,
}: FollowButtonProps) {
  const [following, setFollowing] =
    useState(initialFollowing);

  const [isPending, startTransition] =
    useTransition();

  function handleClick() {
    startTransition(async () => {
      if (following) {
        await unfollowUser(userId);
        setFollowing(false);
      } else {
        await followUser(userId);
        setFollowing(true);
      }
    });
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      className={
        following
          ? "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
          : "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      }
    >
      {following ? (
        <UserMinus className="size-4" />
      ) : (
        <UserPlus className="size-4" />
      )}

      {isPending
        ? "Updating..."
        : following
          ? "Following"
          : "Follow"}
    </button>
  );
}