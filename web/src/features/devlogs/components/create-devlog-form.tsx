"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Eye,
  FolderKanban,
  Tag,
} from "lucide-react";

import {
  createDevLog,
  type CreateDevLogState,
} from "@/features/devlogs/actions/create-devlog";
import { DevLogImageUploader } from "@/features/devlogs/components/devlog-image-uploader";

type CreateDevLogFormProps = {
  projects: {
    id: string;
    title: string;
  }[];
  selectedProjectId?: string;
};

const initialState: CreateDevLogState = {};

const fieldClassName =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15";

function SubmitButton() {
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
      {pending ? "Publishing..." : "Publish Post"}
    </button>
  );
}

export function CreateDevLogForm({
  projects,
  selectedProjectId,
}: CreateDevLogFormProps) {
  const [state, formAction] = useActionState(
    createDevLog,
    initialState
  );

  if (projects.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-border bg-card p-8 text-center sm:p-10">
        <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-accent-warm/10 dark:text-accent-warm">
          <FolderKanban className="size-5" />
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          Create a project first
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Posts belong to projects, so create one before sharing your first
          update.
        </p>

        <Link
          href="/projects/new"
          className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground dark:bg-accent-warm dark:text-[#101513]"
        >
          Create project
        </Link>
      </section>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Main details */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-6">
          <p className="text-section-label text-primary dark:text-accent-warm">
            Post details
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Share what changed, what you learned, or what you shipped.
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
              required
              defaultValue={selectedProjectId ?? ""}
              aria-invalid={Boolean(state.fieldErrors?.projectId)}
              className={fieldClassName}
            >
              <option value="" disabled>
                Select a project
              </option>

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
              required
              maxLength={140}
              placeholder="Fixed the authentication redirect loop"
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
              rows={8}
              required
              maxLength={5000}
              placeholder="Today I implemented..."
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
            Add screenshots that help show your progress.
          </p>
        </div>

        <DevLogImageUploader />
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
          placeholder="Next.js, MongoDB, Auth"
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
            This post will use the same public or private visibility as its
            project.
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
          href="/feed"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Cancel
        </Link>

        <SubmitButton />
      </div>
    </form>
  );
}