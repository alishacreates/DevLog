import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (session.user.isOnboarded) {
    redirect("/feed");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center px-6 py-16">
      <section className="w-full">
        <p className="text-sm font-medium text-primary">
          Welcome to DevLog
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Claim your developer identity
        </h1>

        <p className="mt-3 text-muted-foreground">
          Choose a unique username. You can complete the rest of your
          developer profile later.
        </p>

        <OnboardingForm />
      </section>
    </main>
  );
}