"use client";

import { useState, useTransition } from "react";
import { UserMinus, UserPlus } from "lucide-react";
import { toast } from "sonner";

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
  const [following, setFollowing] = useState(initialFollowing);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (isPending) return;

    const wasFollowing = following;
    const nextFollowing = !wasFollowing;

    // Optimistic update
    setFollowing(nextFollowing);

    startTransition(async () => {
      try {
        if (nextFollowing) {
          await followUser(userId);
          toast.success("Developer followed");
        } else {
          await unfollowUser(userId);
          toast("Developer unfollowed");
        }
      } catch (error) {
        // Roll back optimistic update
        setFollowing(wasFollowing);

        console.error("Follow action failed:", error);

        toast.error(
          nextFollowing
            ? "Could not follow developer"
            : "Could not unfollow developer",
        );
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
    ? "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-section text-[11px] font-bold uppercase tracking-widest transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
    : "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-section text-[11px] font-bold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 dark:bg-accent-warm dark:text-[#101513]"
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