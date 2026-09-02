"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  createProject,
  type CreateProjectState,
} from "@/features/projects/actions/create-project";

const initialState: CreateProjectState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Creating..." : "Create project"}
    </button>
  );
}

export function CreateProjectForm() {
  const [state, formAction] = useActionState(
    createProject,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      <ProjectInput
        label="Project title"
        name="title"
        placeholder="DevLog"
        required
        error={state.fieldErrors?.title?.[0]}
      />

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={6}
          required
          maxLength={2000}
          placeholder="What are you building, why does it exist, and what problem does it solve?"
          aria-invalid={Boolean(state.fieldErrors?.description)}
          className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        {state.fieldErrors?.description?.[0] ? (
          <p className="text-sm text-destructive">
            {state.fieldErrors.description[0]}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>

        <select
          id="status"
          name="status"
          defaultValue="planning"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="planning">Planning</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {state.fieldErrors?.status?.[0] ? (
          <p className="text-sm text-destructive">
            {state.fieldErrors.status[0]}
          </p>
        ) : null}
      </div>

      <ProjectInput
        label="Tech stack"
        name="techStack"
        placeholder="Next.js, TypeScript, MongoDB"
        description="Separate technologies with commas."
        error={state.fieldErrors?.techStack?.[0]}
      />

      <ProjectInput
        label="GitHub repository"
        name="githubUrl"
        type="url"
        placeholder="https://github.com/username/project"
        error={state.fieldErrors?.githubUrl?.[0]}
      />

      <ProjectInput
        label="Live demo"
        name="liveUrl"
        type="url"
        placeholder="https://project.example.com"
        error={state.fieldErrors?.liveUrl?.[0]}
      />

      <label className="flex items-start gap-3 rounded-md border p-4">
        <input
          type="checkbox"
          name="isPublic"
          defaultChecked
          className="mt-1"
        />

        <div>
          <p className="text-sm font-medium">Public project</p>
          <p className="text-sm text-muted-foreground">
            Public projects can be discovered by other developers.
          </p>
        </div>
      </label>

      {state.error ? (
        <p className="text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="flex justify-end gap-3 border-t pt-6">
        <Link
          href="/projects"
          className="rounded-md border px-4 py-2 text-sm font-medium"
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
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />

      {description ? (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      ) : null}

      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : null}
    </div>
  );
}