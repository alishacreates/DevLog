"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

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
  <form action={formAction} className="space-y-6">
    <div className="space-y-2">
      <label htmlFor="title" className="text-sm font-medium">
        Project title
      </label>

      <input
        id="title"
        name="title"
        defaultValue={project.title}
        required
        maxLength={120}
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
      <label htmlFor="description" className="text-sm font-medium">
        Description
      </label>

      <textarea
        id="description"
        name="description"
        defaultValue={project.description}
        rows={6}
        required
        maxLength={2000}
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
        defaultValue={project.status}
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

    <div className="space-y-2">
      <label htmlFor="techStack" className="text-sm font-medium">
        Tech stack
      </label>

      <input
        id="techStack"
        name="techStack"
        defaultValue={project.techStack.join(", ")}
        placeholder="Next.js, TypeScript, MongoDB"
        aria-invalid={Boolean(state.fieldErrors?.techStack)}
        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />

      <p className="text-xs text-muted-foreground">
        Separate technologies with commas.
      </p>

      {state.fieldErrors?.techStack?.[0] ? (
        <p className="text-sm text-destructive">
          {state.fieldErrors.techStack[0]}
        </p>
      ) : null}
    </div>

    <div className="space-y-2">
      <label htmlFor="githubUrl" className="text-sm font-medium">
        GitHub repository
      </label>

      <input
        id="githubUrl"
        name="githubUrl"
        type="url"
        defaultValue={project.githubUrl}
        placeholder="https://github.com/username/project"
        aria-invalid={Boolean(state.fieldErrors?.githubUrl)}
        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />

      {state.fieldErrors?.githubUrl?.[0] ? (
        <p className="text-sm text-destructive">
          {state.fieldErrors.githubUrl[0]}
        </p>
      ) : null}
    </div>

    <div className="space-y-2">
      <label htmlFor="liveUrl" className="text-sm font-medium">
        Live demo
      </label>

      <input
        id="liveUrl"
        name="liveUrl"
        type="url"
        defaultValue={project.liveUrl}
        placeholder="https://project.example.com"
        aria-invalid={Boolean(state.fieldErrors?.liveUrl)}
        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />

      {state.fieldErrors?.liveUrl?.[0] ? (
        <p className="text-sm text-destructive">
          {state.fieldErrors.liveUrl[0]}
        </p>
      ) : null}
    </div>

    <label className="flex items-start gap-3 rounded-md border p-4">
      <input
        type="checkbox"
        name="isPublic"
        defaultChecked={project.isPublic}
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
        href={`/projects/${project.id}`}
        className="rounded-md border px-4 py-2 text-sm font-medium"
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
      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Saving..." : "Save changes"}
    </button>
  );
}