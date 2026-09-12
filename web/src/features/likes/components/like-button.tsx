"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";

import { likeDevLog } from "@/features/likes/actions/like-devlog";
import { unlikeDevLog } from "@/features/likes/actions/unlike-devlog";

type LikeButtonProps = {
  devLogId: string;
  initialLiked: boolean;
  initialCount: number;
};

export function LikeButton({
  devLogId,
  initialLiked,
  initialCount,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(
    Number.isFinite(initialCount) ? initialCount : 0
  );
  const [isPending, startTransition] = useTransition();

  function handleClick() {
  if (isPending) {
    return;
  }

  const previousLiked = liked;
  const previousCount = count;
  const nextLiked = !liked;

  // Update UI immediately
  setLiked(nextLiked);
  setCount((current) =>
    nextLiked
      ? current + 1
      : Math.max(0, current - 1)
  );

  startTransition(async () => {
    try {
      if (nextLiked) {
        await likeDevLog(devLogId);
      } else {
        await unlikeDevLog(devLogId);
      }
    } catch (error) {
      // Roll back if the request fails
      setLiked(previousLiked);
      setCount(previousCount);

      console.error("Like update failed:", error);
    }
  });
}

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      className={
        liked
          ? "inline-flex cursor-pointer items-center gap-1.5 text-red-500 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          : "inline-flex cursor-pointer items-center gap-1.5 text-muted-foreground transition-colors hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      }
      aria-pressed={liked}
      aria-label={liked ? "Unlike DevLog" : "Like DevLog"}
    >
      <Heart
        className={`size-4 transition-colors ${
          liked ? "fill-red-500 text-red-500" : "fill-none text-muted-foreground"
        }`}
      />

      <span className={liked ? "text-red-500" : "text-muted-foreground"}>
        {count}
      </span>
    </button>
  );
}