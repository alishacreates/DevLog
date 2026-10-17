"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Eye,
  Tag,
} from "lucide-react";

import {
  updateDevLog,
  type UpdateDevLogState,
} from "@/features/devlogs/actions/update-devlog";
import { DevLogImageUploader } from "@/features/devlogs/components/devlog-image-uploader";

type EditDevLogFormProps = {
  devLog: {
    id: string;
    projectId: string;
    title: string;
    content: string;
    tags: string[];
    images: string[];
  };
  projects: {
    id: string;
    title: string;
  }[];
};

const initialState: UpdateDevLogState = {};

const fieldClassName =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15";

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        inline-flex items-center justify-center
        rounded-full bg-primary px-5 py-2.5
        text-sm font-semibold text-primary-foreground
        transition-all
        hover:-translate-y-0.5 hover:shadow-sm
        disabled:cursor-not-allowed disabled:opacity-60
        dark:bg-accent-warm dark:text-[#101513]
      "
    >
      {pending ? "Saving..." : "Save changes"}
    </button>
  );
}

export function EditDevLogForm({
  devLog,
  projects,
}: EditDevLogFormProps) {
  const updateDevLogWithId = updateDevLog.bind(
    null,
    devLog.id
  );

  const [state, formAction] = useActionState(
    updateDevLogWithId,
    initialState
  );

  return (
    <form action={formAction} className="space-y-5">
      {/* Main details */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-6">
          <p className="text-section-label text-primary dark:text-accent-warm">
            Post details
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Update the progress, context, or project linked to this post.
          </p>
        </div>

        <div className="space-y-5">
          {/* Project */}
          <div className="space-y-2">
            <label
              htmlFor="projectId"
              className="text-sm font-medium"
            >
              Project
            </label>

            <select
              id="projectId"
              name="projectId"
              defaultValue={devLog.projectId}
              required
              aria-invalid={Boolean(state.fieldErrors?.projectId)}
              className={fieldClassName}
            >
              {projects.map((project) => (
                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.title}
                </option>
              ))}
            </select>

            {state.fieldErrors?.projectId?.[0] ? (
              <p className="text-sm text-destructive">
                {state.fieldErrors.projectId[0]}
              </p>
            ) : null}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium"
            >
              Title
            </label>

            <input
              id="title"
              name="title"
              defaultValue={devLog.title}
              required
              maxLength={140}
              aria-invalid={Boolean(state.fieldErrors?.title)}
              className={fieldClassName}
            />

            <p className="text-xs text-muted-foreground">
              Keep it short and specific.
            </p>

            {state.fieldErrors?.title?.[0] ? (
              <p className="text-sm text-destructive">
                {state.fieldErrors.title[0]}
              </p>
            ) : null}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label
              htmlFor="content"
              className="text-sm font-medium"
            >
              What did you work on?
            </label>

            <textarea
              id="content"
              name="content"
              defaultValue={devLog.content}
              rows={8}
              required
              maxLength={5000}
              aria-invalid={Boolean(state.fieldErrors?.content)}
              className={`${fieldClassName} resize-none leading-6`}
            />

            {state.fieldErrors?.content?.[0] ? (
              <p className="text-sm text-destructive">
                {state.fieldErrors.content[0]}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Media */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-5">
          <p className="text-section-label text-primary dark:text-accent-warm">
            Media
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Add or remove screenshots from this post.
          </p>
        </div>

        <DevLogImageUploader
          initialImages={devLog.images}
        />
      </section>

      {/* Tags */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-2">
          <Tag className="size-4 text-muted-foreground" />

          <p className="text-sm font-medium">
            Tags
          </p>
        </div>

        <input
          id="tags"
          name="tags"
          defaultValue={devLog.tags.join(", ")}
          aria-invalid={Boolean(state.fieldErrors?.tags)}
          className={fieldClassName}
        />

        <p className="mt-2 text-xs text-muted-foreground">
          Separate tags with commas. Add up to 10.
        </p>

        {state.fieldErrors?.tags?.[0] ? (
          <p className="mt-2 text-sm text-destructive">
            {state.fieldErrors.tags[0]}
          </p>
        ) : null}
      </section>

      {/* Visibility */}
      <div className="flex items-start gap-3 rounded-2xl border border-border bg-muted/30 p-4">
        <Eye className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

        <div>
          <p className="text-sm font-medium">
            Project visibility applies
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            This post uses the same public or private visibility as its project.
          </p>
        </div>
      </div>

      {state.error ? (
  <div className="rounded-xl border border-destructive px-4 py-3">
    <p className="text-sm font-medium text-destructive">
      {state.error}
    </p>
  </div>
) : null}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
        <Link
          href={`/devlogs/${devLog.id}`}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Cancel
        </Link>

        <SaveButton />
      </div>
    </form>
  );
}