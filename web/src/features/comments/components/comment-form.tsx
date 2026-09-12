"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  createComment,
  type CreateCommentState,
} from "@/features/comments/actions/create-comment";

type CommentFormProps = {
  devLogId: string;
  compact?: boolean;
};

const initialState: CreateCommentState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Posting..." : "Comment"}
    </button>
  );
}

export function CommentForm({
  devLogId,
  compact = false,
}: CommentFormProps) {
  const createCommentWithId =
    createComment.bind(null, devLogId);

  const [state, formAction] = useActionState(
    createCommentWithId,
    initialState
  );

if (compact) {
  return (
    <form
      action={formAction}
      className="rounded-2xl border border-border bg-card p-4"
    >
      <textarea
        name="content"
        rows={3}
        maxLength={1000}
        placeholder="Add to the discussion..."
        className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        {state.error ? (
          <p className="text-sm text-destructive">
            {state.error}
          </p>
        ) : (
          <span />
        )}

        <SubmitButton />
      </div>
    </form>
  );
}
}