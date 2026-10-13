import { redirect } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { auth, signIn } from "@/auth";

type SignInPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function SignInPage({
  searchParams,
}: SignInPageProps) {
  const session = await auth();

  if (session?.user) {
    if (session.user.isOnboarded) {
      redirect("/feed");
    }

    redirect("/onboarding");
  }

  const { error } = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  {/* teal glow - top left */}
  <div className="absolute -left-32 -top-32 size-[430px] rounded-full bg-primary/25 blur-[110px] animate-[float-one_10s_ease-in-out_infinite]" />

  {/* teal glow - bottom right */}
  <div className="absolute -bottom-40 -right-28 size-[480px] rounded-full bg-primary/20 blur-[120px] animate-[float-two_12s_ease-in-out_infinite]" />

  {/* subtle center glow */}
  <div className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />

  {/* developer grid */}
  <div
    className="
      absolute inset-0 opacity-[0.025]
      [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
      [background-size:34px_34px]
    "
  />
</div>
      <Link
  href="/"
  className="absolute left-6 top-6 inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
  aria-label="Back to home"
>
  <ArrowLeft className="size-4" />
</Link>
      <section className="w-full max-w-md">
        <div className="relative z-10 rounded-[28px] border border-border/80 bg-card/90 p-8 shadow-xl backdrop-blur-sm sm:p-10">
          <div className="mb-7 text-center">
            <p className="text-section-label text-primary">
              WELCOME, DEVELOPER 
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
              Sign in to DevLog
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Continue with your developer account.
            </p>
          </div>

          {error ? (
            <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
              <p className="text-sm text-destructive">
                Sign-in failed. Please try again.
              </p>
            </div>
          ) : null}

          <div className="space-y-3">
            <form
              action={async () => {
                "use server";

                await signIn("github", {
                  redirectTo: "/feed",
                });
              }}
            >
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background transition-all hover:opacity-90 "
              >
                <FaGithub className="size-5" />
                Continue with GitHub
              </button>
            </form>

            <form
              action={async () => {
                "use server";

                await signIn("google", {
                  redirectTo: "/feed",
                });
              }}
            >
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium transition-all hover:border-primary/50 hover:bg-muted/40"
              >
                <FcGoogle className="size-5" />
                Continue with Google
              </button>
            </form>
          </div>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />

            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              Build in public
            </span>

            <div className="h-px flex-1 bg-border" />
          </div>

          <p className="font-serif text-center text-sm leading-6 text-muted-foreground">
            By continuing, you&apos;re joining a space built for developers
            documenting the process, not just the result.
          </p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          OAuth secured
        </div>
      </section>
    </main>
  );
}