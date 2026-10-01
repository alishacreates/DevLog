"use client";

import {
  useActionState,
  useState,
} from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import {
  createComment,
  type CreateCommentState,
} from "@/features/comments/actions/create-comment";
import { RichCommentEditor } from "@/features/comments/components/rich-comment-editor";

type CommentFormProps = {
  devLogId: string;
  compact?: boolean;
  onSuccess?: () => void;
};

const initialState: CreateCommentState = {};

function SubmitButton({
  compact,
  disabled,
}: {
  compact: boolean;
  disabled: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={
        compact
          ? `
              shrink-0 rounded-full
              bg-primary px-3.5 py-1.5
              font-section text-[9px]
              font-bold uppercase
              tracking-widest
              text-primary-foreground
              transition-opacity
              hover:opacity-90
              disabled:opacity-40
              dark:bg-accent-warm
              dark:text-[#101513]
            `
          : `
              shrink-0 rounded-full
              bg-primary px-4 py-2
              font-section text-[10px]
              font-bold uppercase
              tracking-widest
              text-primary-foreground
              transition-opacity
              hover:opacity-90
              disabled:opacity-40
              dark:bg-accent-warm
              dark:text-[#101513]
            `
      }
    >
      {pending ? "Posting..." : "Comment"}
    </button>
  );
}

export function CommentForm({
  devLogId,
  compact = false,
  onSuccess,
}: CommentFormProps) {
  const [resetKey, setResetKey] =
    useState(0);

  const [hasContent, setHasContent] =
    useState(false);

  async function submitComment(
    previousState: CreateCommentState,
    formData: FormData,
  ) {
    const result = await createComment(
      devLogId,
      previousState,
      formData,
    );

    if (result.success) {
      toast.success("Comment posted");

      setResetKey(
        (current) => current + 1,
      );

      setHasContent(false);
      onSuccess?.();
    } else if (result.error) {
      toast.error(result.error);
    }

    return result;
  }

  const [state, formAction] =
    useActionState(
      submitComment,
      initialState,
    );

  return (
    <form
      action={formAction}
      noValidate
      className={
        compact
          ? `
              rounded-xl border border-border
              bg-card px-4 py-3
              transition-colors
              focus-within:border-primary/60
              dark:focus-within:border-accent-warm/60
            `
          : `
              rounded-xl border border-border
              bg-background px-4 py-3
              transition-colors
              focus-within:border-primary/60
              dark:focus-within:border-accent-warm/60
            `
      }
    >
      <RichCommentEditor
        key={resetKey}
        compact={compact}
        onTextChange={(text) =>
          setHasContent(
            text.trim().length > 0 &&
              text.length <= 1000,
          )
        }
        footerAction={
          <SubmitButton
            compact={compact}
            disabled={!hasContent}
          />
        }
      />

      {state.fieldError ? (
        <p className="mt-2 text-xs text-destructive">
          {state.fieldError}
        </p>
      ) : null}
    </form>
  );
}