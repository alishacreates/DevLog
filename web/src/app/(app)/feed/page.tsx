import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";

export default async function FeedPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (!session.user.isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Feed</h1>
          <p className="mt-2 text-muted-foreground">
            Signed in as {session.user.email}
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="rounded-md border px-4 py-2 text-sm font-medium"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}