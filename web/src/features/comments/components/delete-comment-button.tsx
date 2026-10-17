"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteComment } from "@/features/comments/actions/delete-comment";

type DeleteCommentButtonProps = {
  commentId: string;
};

export function DeleteCommentButton({
  commentId,
}: DeleteCommentButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (isPending) return;

    const confirmed = window.confirm(
      "Delete this comment?",
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteComment(commentId);

        toast("Comment deleted");

        router.refresh();
      } catch (error) {
        console.error(
          "Delete comment failed:",
          error,
        );

        toast.error("Could not delete comment");
      }
    });
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleDelete}
      className="
        inline-flex items-center gap-1.5
        rounded-full border border-destructive/40
        px-3 py-1.5
        font-section text-[10px] font-bold uppercase tracking-widest
        text-destructive
        transition-colors
        hover:border-destructive
        hover:bg-destructive
        hover:text-white
        disabled:opacity-50
      "
    >
      <Trash2 className="size-3" />

      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}