"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

import { CommentForm } from "@/features/comments/components/comment-form";
import { loadComments } from "@/features/comments/actions/load-comments";
import { deleteComment } from "@/features/comments/actions/delete-comment";
import { CommentContent } from "@/features/comments/components/comment-content";

type FeedComment = {
  id: string;
  content: string;
  createdAt: string;
  contentJson?: string;
  author: {
    id: string;
    name: string;
    username: string;
    image?: string;
  };
};

type FeedCommentsPanelProps = {
  devLogId: string;
  open: boolean;
  currentUserId: string;
  onCountChange?: (count: number) => void;
};

export function FeedCommentsPanel({
  devLogId,
  open,
  currentUserId,
  onCountChange,
}: FeedCommentsPanelProps) {
  const [comments, setComments] = useState<FeedComment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const refreshComments = useCallback(() => {
    startTransition(async () => {
      const result = await loadComments(devLogId);

      setComments(result);
      setLoaded(true);
      onCountChange?.(result.length);
    });
  }, [devLogId, onCountChange]);

  useEffect(() => {
    if (!open || loaded) {
      return;
    }

    refreshComments();
  }, [open, loaded, refreshComments]);

  function handleDelete(commentId: string) {
    startTransition(async () => {
      try {
        await deleteComment(commentId);

        const updatedComments = comments.filter(
        (comment) => comment.id !== commentId,
        );

        setComments(updatedComments);
        onCountChange?.(updatedComments.length);

        toast("Comment deleted");
       } catch (error) {
        console.error(
          "Delete comment failed:",
          error,
        );

        toast.error("Could not delete comment");
      }
    });
  }

  if (!open) {
    return null;
  }

  return (
    <div className="mt-4 w-full border-t border-border/65 pt-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Comments
        </p>

        <div className="flex items-center gap-4">
          <Link
            href={`/devlogs/${devLogId}#comments`}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            View full discussion
          </Link>
        </div>
      </div>

      {isPending && !loaded ? (
        <p className="text-sm text-muted-foreground">
          Loading comments...
        </p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No comments yet. Start the discussion.
        </p>
      ) : (
        <div className="space-y-4">
          {comments.slice(0, 3).map((comment) => (
            <div
              key={comment.id}
              className="flex items-start gap-3"
            >
              <Link
                href={`/u/${comment.author.username}`}
                className="shrink-0"
              >
                {comment.author.image ? (
                  <Image
                    src={comment.author.image}
                    alt={comment.author.name}
                    width={32}
                    height={32}
                    className="size-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {comment.author.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
              </Link>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/u/${comment.author.username}`}
                      className="text-sm font-semibold hover:underline"
                    >
                      {comment.author.name}
                    </Link>

                    <span className="text-xs text-muted-foreground">
                      @{comment.author.username}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      ·
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>

                  {comment.author.id === currentUserId ? (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        handleDelete(comment.id)
                      }
                      aria-label="Delete comment"
                      title="Delete comment"
                      className="
                        shrink-0 rounded-full p-1.5
                        text-muted-foreground
                        transition-colors
                        hover:bg-destructive/10
                        hover:text-destructive
                        disabled:opacity-50
                      "
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  ) : null}
                </div>

                <div className="mt-1">
  <CommentContent 
  content={comment.content} 
  contentJson={comment.contentJson} />
</div>
              </div>
            </div>
          ))}

          {comments.length > 3 ? (
            <Link
              href={`/devlogs/${devLogId}#comments`}
              className="inline-block text-sm font-medium text-primary hover:underline dark:text-accent-warm"
            >
              View all {comments.length} comments
            </Link>
          ) : null}
        </div>
      )}

      <div className="mt-4">
        <CommentForm
          devLogId={devLogId}
          compact
          onSuccess={refreshComments}
        />
      </div>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(new Date(date));
}