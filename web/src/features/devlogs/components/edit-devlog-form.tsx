"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

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

export function EditDevLogForm({
  devLog,
  projects,
}: EditDevLogFormProps) {
  const updateDevLogWithId = updateDevLog.bind(null, devLog.id);

  const [state, formAction] = useActionState(
    updateDevLogWithId,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      {/* Project */}
      <div className="space-y-2">
        <label htmlFor="projectId" className="text-sm font-medium">
          Project
        </label>

        <select
          id="projectId"
          name="projectId"
          defaultValue={devLog.projectId}
          required
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
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
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>

        <input
          id="title"
          name="title"
          defaultValue={devLog.title}
          required
          maxLength={140}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        />

        {state.fieldErrors?.title?.[0] ? (
          <p className="text-sm text-destructive">
            {state.fieldErrors.title[0]}
          </p>
        ) : null}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          What did you work on?
        </label>

        <textarea
          id="content"
          name="content"
          defaultValue={devLog.content}
          rows={8}
          required
          maxLength={5000}
          className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm"
        />

        {state.fieldErrors?.content?.[0] ? (
          <p className="text-sm text-destructive">
            {state.fieldErrors.content[0]}
          </p>
        ) : null}
      </div>

      <DevLogImageUploader initialImages={devLog.images} />

      {/* Tags */}
      <div className="space-y-2">
        <label htmlFor="tags" className="text-sm font-medium">
          Tags
        </label>

        <input
          id="tags"
          name="tags"
          defaultValue={devLog.tags.join(", ")}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        />

        {state.fieldErrors?.tags?.[0] ? (
          <p className="text-sm text-destructive">
            {state.fieldErrors.tags[0]}
          </p>
        ) : null}
      </div>

      <p className="text-sm text-muted-foreground">
        This post uses the visibility of its project.
      </p>

      {state.error ? (
        <p className="text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="flex justify-end gap-3 border-t pt-6">
        <Link
          href={`/devlogs/${devLog.id}`}
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          Cancel
        </Link>

        <SaveButton />
      </div>
    </form>
  );
}