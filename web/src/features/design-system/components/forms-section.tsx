import {
  Eye,
  ImageIcon,
  Tag,
} from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";

const fieldClassName =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15";

export function FormsSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Forms"
        title="Forms should feel structured, not heavy."
        description="DevLog groups related fields into calm surfaces, keeps validation close to the input, and gives the primary action clear visual priority."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Field patterns */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <p className="text-section-label text-primary dark:text-accent-warm">
            Field patterns
          </p>

          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="design-title"
                className="text-sm font-medium"
              >
                Title
              </label>

              <input
                id="design-title"
                placeholder="Fixed the authentication redirect loop"
                className={fieldClassName}
              />

              <p className="text-xs text-muted-foreground">
                Keep it short and specific.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="design-content"
                className="text-sm font-medium"
              >
                What did you work on?
              </label>

              <textarea
                id="design-content"
                rows={5}
                placeholder="Today I implemented..."
                className={`${fieldClassName} resize-none leading-6`}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="design-status"
                className="text-sm font-medium"
              >
                Status
              </label>

              <select
                id="design-status"
                defaultValue="in-progress"
                className={fieldClassName}
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="design-error"
                className="text-sm font-medium"
              >
                Error state
              </label>

              <input
                id="design-error"
                defaultValue="invalid-url"
                aria-invalid="true"
                className={`${fieldClassName} border-destructive focus:border-destructive focus:ring-destructive/15`}
              />

              <p className="text-sm text-destructive">
                Enter a valid URL.
              </p>
            </div>
          </div>
        </section>

        {/* Composition example */}
        <div className="space-y-5">
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div>
              <p className="text-section-label text-primary dark:text-accent-warm">
                Post details
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Related fields should live together in a clearly defined
                section.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Project
                </label>

                <div className={fieldClassName}>
                  DevLog
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Title
                </label>

                <div className={fieldClassName}>
                  Improved developer discovery
                </div>
              </div>
            </div>
          </section>

          {/* Supporting groups */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <ImageIcon className="size-4 text-muted-foreground" />

                <p className="text-sm font-medium">
                  Media
                </p>
              </div>

              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Screenshots and visual progress belong in their own section.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <Tag className="size-4 text-muted-foreground" />

                <p className="text-sm font-medium">
                  Tags
                </p>
              </div>

              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Keep supporting metadata visually quieter than core content.
              </p>
            </div>
          </div>

          {/* Visibility */}
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-muted/30 p-4">
            <Eye className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

            <div>
              <p className="text-sm font-medium">
                Project visibility applies
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Supporting information should explain behavior without
                competing with the form.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <button
              type="button"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Cancel
            </button>

            <button
              type="button"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-sm dark:bg-accent-warm dark:text-[#101513]"
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="mt-10 grid gap-6 border-t border-border pt-8 md:grid-cols-3">
        <FormRule
          title="Group related fields"
          text="Use rounded content sections to break longer forms into understandable pieces."
        />

        <FormRule
          title="Validate locally"
          text="Field-specific errors stay beside the field instead of becoming toast notifications."
        />

        <FormRule
          title="One primary action"
          text="Creation and save actions receive the strongest emphasis. Cancel remains secondary."
        />
      </div>
    </section>
  );
}

function FormRule({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div>
      <p className="font-section text-xs font-bold uppercase tracking-[0.12em] text-primary dark:text-accent-warm">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}