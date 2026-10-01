"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Globe2,
  Layers3,
  Link2,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import {
  createProject,
  type CreateProjectState,
} from "@/features/projects/actions/create-project";

const initialState: CreateProjectState = {};

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
      {pending ? "Creating..." : "Create Project"}
    </button>
  );
}

export function CreateProjectForm() {
  const [state, formAction] = useActionState(
    createProject,
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
            Add the core information developers should know about your project.
          </p>
        </div>

        <div className="space-y-5">
          <ProjectInput
            label="Project title"
            name="title"
            placeholder="Developer Portfolio"
            required
            maxLength={120}
            error={state.fieldErrors?.title?.[0]}
          />

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
              rows={6}
              required
              maxLength={2000}
              placeholder="What are you building, why does it exist, and what problem does it solve?"
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
              defaultValue="planning"
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
              Add the main tools and technologies used in this project.
            </p>
          </div>
        </div>

        <ProjectInput
          label="Technologies"
          name="techStack"
          placeholder="Next.js, TypeScript, MongoDB"
          description="Separate technologies with commas."
          error={state.fieldErrors?.techStack?.[0]}
        />
      </section>

      {/* Links */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-5">
          <p className="text-section-label text-primary dark:text-accent-warm">
            Project links
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Optional links developers can use to explore your work.
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
          defaultChecked
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
          href="/projects"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Cancel
        </Link>

        <SubmitButton />
      </div>
    </form>
  );
}

function ProjectInput({
  label,
  name,
  type = "text",
  placeholder,
  description,
  required = false,
  maxLength,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  maxLength?: number;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-sm font-medium"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        className={fieldClassName}
      />

      {description ? (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      ) : null}

      {error ? (
        <p className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}