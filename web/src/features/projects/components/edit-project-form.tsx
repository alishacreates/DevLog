"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Globe2,
  Layers3,
  Link2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import {
  updateProject,
  type UpdateProjectState,
} from "@/features/projects/actions/update-project";

type EditProjectFormProps = {
  project: {
    id: string;
    title: string;
    description: string;
    status: string;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
    isPublic: boolean;
  };
};

const initialState: UpdateProjectState = {};

const fieldClassName =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15";

export function EditProjectForm({
  project,
}: EditProjectFormProps) {
  const updateProjectWithId = updateProject.bind(
    null,
    project.id
  );

  const [state, formAction] = useActionState(
    updateProjectWithId,
    initialState
  );

  return (
    <form action={formAction} className="space-y-5">
      {/* Project details */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-6">
          <p className="text-section-label text-primary dark:text-accent-warm">
            Project details
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Update the core information shown across DevLog.
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium"
            >
              Project title
            </label>

            <input
              id="title"
              name="title"
              defaultValue={project.title}
              required
              maxLength={120}
              aria-invalid={Boolean(
                state.fieldErrors?.title
              )}
              className={fieldClassName}
            />

            {state.fieldErrors?.title?.[0] ? (
              <p className="text-sm text-destructive">
                {state.fieldErrors.title[0]}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              defaultValue={project.description}
              rows={6}
              required
              maxLength={2000}
              aria-invalid={Boolean(
                state.fieldErrors?.description
              )}
              className={`${fieldClassName} resize-none leading-6`}
            />

            <p className="text-xs text-muted-foreground">
              Explain what the project does and why you&apos;re building it.
            </p>

            {state.fieldErrors?.description?.[0] ? (
              <p className="text-sm text-destructive">
                {state.fieldErrors.description[0]}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="status"
              className="text-sm font-medium"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              defaultValue={project.status}
              aria-invalid={Boolean(
                state.fieldErrors?.status
              )}
              className={fieldClassName}
            >
              <option value="planning">
                Planning
              </option>

              <option value="in-progress">
                In Progress
              </option>

              <option value="completed">
                Completed
              </option>
            </select>

            {state.fieldErrors?.status?.[0] ? (
              <p className="text-sm text-destructive">
                {state.fieldErrors.status[0]}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
            <Layers3 className="size-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-sm font-medium">
              Tech stack
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Keep the technologies used by this project up to date.
            </p>
          </div>
        </div>

        <input
          id="techStack"
          name="techStack"
          defaultValue={project.techStack.join(", ")}
          placeholder="Next.js, TypeScript, MongoDB"
          aria-invalid={Boolean(
            state.fieldErrors?.techStack
          )}
          className={fieldClassName}
        />

        <p className="mt-2 text-xs text-muted-foreground">
          Separate technologies with commas.
        </p>

        {state.fieldErrors?.techStack?.[0] ? (
          <p className="mt-2 text-sm text-destructive">
            {state.fieldErrors.techStack[0]}
          </p>
        ) : null}
      </section>

      {/* Links */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-5">
          <p className="text-section-label text-primary dark:text-accent-warm">
            Project links
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Keep your repository and live project links current.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FaGithub className="size-4 text-muted-foreground" />

              <label
                htmlFor="githubUrl"
                className="text-sm font-medium"
              >
                GitHub repository
              </label>
            </div>

            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              defaultValue={project.githubUrl}
              placeholder="https://github.com/username/project"
              aria-invalid={Boolean(
                state.fieldErrors?.githubUrl
              )}
              className={fieldClassName}
            />

            {state.fieldErrors?.githubUrl?.[0] ? (
              <p className="mt-2 text-sm text-destructive">
                {state.fieldErrors.githubUrl[0]}
              </p>
            ) : null}
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Link2 className="size-4 text-muted-foreground" />

              <label
                htmlFor="liveUrl"
                className="text-sm font-medium"
              >
                Live demo
              </label>
            </div>

            <input
              id="liveUrl"
              name="liveUrl"
              type="url"
              defaultValue={project.liveUrl}
              placeholder="https://project.example.com"
              aria-invalid={Boolean(
                state.fieldErrors?.liveUrl
              )}
              className={fieldClassName}
            />

            {state.fieldErrors?.liveUrl?.[0] ? (
              <p className="mt-2 text-sm text-destructive">
                {state.fieldErrors.liveUrl[0]}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Visibility */}
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-muted/30 p-4">
        <input
          type="checkbox"
          name="isPublic"
          defaultChecked={project.isPublic}
          className="mt-1 accent-[var(--primary)]"
        />

        <Globe2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

        <div>
          <p className="text-sm font-medium">
            Public project
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Public projects can appear in search, profiles, and community
            discovery.
          </p>
        </div>
      </label>

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
          href={`/projects/${project.id}`}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Cancel
        </Link>

        <SaveButton />
      </div>
    </form>
  );
}

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