import { signIn } from "@/auth";

type SignInPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function SignInPage({
  searchParams,
}: SignInPageProps) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Sign in to DevLog</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Continue with your developer account.
          </p>
        </div>

        {error ? (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Sign-in failed. Please try again.
          </p>
        ) : null}

        <div className="space-y-3">
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/feed" });
            }}
          >
            <button
              type="submit"
              className="w-full rounded-md border px-4 py-2 text-sm font-medium"
            >
              Continue with GitHub
            </button>
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/feed" });
            }}
          >
            <button
              type="submit"
              className="w-full rounded-md border px-4 py-2 text-sm font-medium"
            >
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}