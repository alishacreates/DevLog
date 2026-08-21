"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  updateProfile,
  type ProfileState,
} from "@/actions/profile";

type EditProfileFormProps = {
  user: {
    name: string;
    bio: string;
    university: string;
    location: string;
    skills: string[];
    techStack: string[];
    github: string;
    portfolio: string;
  };
};

const initialState: ProfileState = {};

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

export function EditProfileForm({
  user,
}: EditProfileFormProps) {
  const [state, formAction] = useActionState(
    updateProfile,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      <ProfileInput
        label="Name"
        name="name"
        defaultValue={user.name}
        required
        error={state.fieldErrors?.name?.[0]}
      />

      <div className="space-y-2">
        <label htmlFor="bio" className="text-sm font-medium">
          Bio
        </label>

        <textarea
          id="bio"
          name="bio"
          defaultValue={user.bio}
          maxLength={300}
          rows={4}
          placeholder="What do you build? What are you learning?"
          aria-invalid={Boolean(state.fieldErrors?.bio)}
          className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        <div className="flex justify-between gap-4">
          {state.fieldErrors?.bio?.[0] ? (
            <p className="text-sm text-destructive">
              {state.fieldErrors.bio[0]}
            </p>
          ) : (
            <span />
          )}

          <p className="text-xs text-muted-foreground">
            Maximum 300 characters
          </p>
        </div>
      </div>

      <ProfileInput
        label="University"
        name="university"
        defaultValue={user.university}
        placeholder="Your university"
        error={state.fieldErrors?.university?.[0]}
      />

      <ProfileInput
        label="Location"
        name="location"
        defaultValue={user.location}
        placeholder="City, Country"
        error={state.fieldErrors?.location?.[0]}
      />

      <ProfileInput
        label="Skills"
        name="skills"
        defaultValue={user.skills.join(", ")}
        placeholder="Problem Solving, Backend Development, UI/UX"
        description="Separate skills with commas."
        error={state.fieldErrors?.skills?.[0]}
      />

      <ProfileInput
        label="Tech stack"
        name="techStack"
        defaultValue={user.techStack.join(", ")}
        placeholder="Next.js, TypeScript, MongoDB"
        description="Separate technologies with commas."
        error={state.fieldErrors?.techStack?.[0]}
      />

      <ProfileInput
        label="GitHub"
        name="github"
        type="url"
        defaultValue={user.github}
        placeholder="https://github.com/username"
        error={state.fieldErrors?.github?.[0]}
      />

      <ProfileInput
        label="Portfolio"
        name="portfolio"
        type="url"
        defaultValue={user.portfolio}
        placeholder="https://yourportfolio.com"
        error={state.fieldErrors?.portfolio?.[0]}
      />

      {state.error ? (
        <p className="text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="flex items-center justify-end gap-3 border-t pt-6">
        <Link
          href="/profile"
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          Cancel
        </Link>

        <SaveButton />
      </div>
    </form>
  );
}

function ProfileInput({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  description,
  required = false,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue: string;
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
        defaultValue={defaultValue}
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