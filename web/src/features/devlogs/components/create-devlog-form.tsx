"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  createDevLog,
  type CreateDevLogState,
} from "@/features/devlogs/actions/create-devlog";

type CreateDevLogFormProps = {
  projects: {
    id: string;
    title: string;
  }[];
  selectedProjectId?: string;
};
const initialState: CreateDevLogState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Publishing..." : "Publish DevLog"}
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
      <section className="rounded-xl border p-8 text-center">
        <h2 className="text-lg font-semibold">
          Create a project first
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          DevLogs are connected to projects, so add a project before
          publishing your first update.
        </p>

        <Link
          href="/projects/new"
          className="mt-5 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Create project
        </Link>
      </section>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
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
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
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
          placeholder="Finished project authentication"
          aria-invalid={Boolean(state.fieldErrors?.title)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        {state.fieldErrors?.title?.[0] ? (
          <p className="text-sm text-destructive">
            {state.fieldErrors.title[0]}
          </p>
        ) : null}
      </div>

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
          className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        {state.fieldErrors?.content?.[0] ? (
          <p className="text-sm text-destructive">
            {state.fieldErrors.content[0]}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="tags"
          className="text-sm font-medium"
        >
          Tags
        </label>

        <input
          id="tags"
          name="tags"
          placeholder="Next.js, MongoDB, Auth"
          aria-invalid={Boolean(state.fieldErrors?.tags)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        <p className="text-xs text-muted-foreground">
          Separate tags with commas.
        </p>

        {state.fieldErrors?.tags?.[0] ? (
          <p className="text-sm text-destructive">
            {state.fieldErrors.tags[0]}
          </p>
        ) : null}
      </div>
      <p className="text-sm text-muted-foreground">
  This DevLog will use the visibility of its project.
</p>

      {state.error ? (
        <p className="text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="flex justify-end gap-3 border-t pt-6">
        <Link
          href="/feed"
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          Cancel
        </Link>

        <SubmitButton />
      </div>
    </form>
  );
}