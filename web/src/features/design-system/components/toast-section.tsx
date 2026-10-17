"use client";

import { CheckCircle2, Info, XCircle } from "lucide-react";
import { toast } from "sonner";

import { SectionHeader } from "@/components/shared/section-header";

export function ToastSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Feedback"
        title="Toast notifications"
        description="Toasts communicate the result of an action without interrupting the user's workflow. Use them for action-level feedback, not field validation."
      />

      {/* Examples */}
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {/* Success */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />

            <div>
              <p className="text-sm font-semibold">
                Success
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Use when an action completes successfully.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              toast.success("Post published")
            }
            className="
              mt-5 rounded-full border border-border
              px-4 py-2
              font-mono text-[9px] font-semibold uppercase tracking-[0.1em]
              transition-colors
              hover:border-success hover:text-success
            "
          >
            Preview success
          </button>
        </div>

        {/* Error */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-start gap-3">
            <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />

            <div>
              <p className="text-sm font-semibold">
                Error
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Use when an action fails or cannot be completed.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              toast.error("Could not publish post")
            }
            className="
              mt-5 rounded-full border border-border
              px-4 py-2
              font-mono text-[9px] font-semibold uppercase tracking-[0.1em]
              transition-colors
              hover:border-destructive hover:text-destructive
            "
          >
            Preview error
          </button>
        </div>

        {/* Neutral */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-4 shrink-0 text-primary dark:text-accent-warm" />

            <div>
              <p className="text-sm font-semibold">
                Neutral
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Use for lightweight informational feedback.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              toast("Changes saved")
            }
            className="
              mt-5 rounded-full border border-border
              px-4 py-2
              font-mono text-[9px] font-semibold uppercase tracking-[0.1em]
              transition-colors
              hover:border-primary hover:text-primary
              dark:hover:border-accent-warm
              dark:hover:text-accent-warm
            "
          >
            Preview neutral
          </button>
        </div>
      </div>

      {/* Usage rules */}
      <div className="mt-10 grid gap-6 border-t border-border pt-8 md:grid-cols-2">
        <div>
          <p className="font-section text-sm font-bold uppercase tracking-widest">
            Use toast for
          </p>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Publishing posts, saving changes, deleting content, following
            developers, uploads, comments, and unexpected action failures.
          </p>
        </div>

        <div>
          <p className="font-section text-sm font-bold uppercase tracking-widest">
            Don&apos;t use toast for
          </p>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Required fields, invalid URLs, character limits, or other
            field-specific validation. Keep those messages beside the field.
          </p>
        </div>
      </div>
    </section>
  );
}