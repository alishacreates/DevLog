"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  completeOnboarding,
  type OnboardingState,
} from "@/actions/profile";

const initialState: OnboardingState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Creating profile..." : "Continue"}
    </button>
  );
}

export function OnboardingForm() {
  const [state, formAction] = useActionState(
    completeOnboarding,
    initialState
  );

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="text-sm font-medium"
        >
          Username
        </label>

        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          minLength={3}
          maxLength={20}
          placeholder=""
          aria-invalid={Boolean(state.error)}
          className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
        />

        <p className="text-sm text-muted-foreground">
          Letters, numbers, and underscores only.
        </p>

        {state.error ? (
          <p className="text-sm text-destructive">
            {state.error}
          </p>
        ) : null}
      </div>

      <SubmitButton />
    </form>
  );
}