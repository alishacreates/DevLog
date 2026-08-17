import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function FeedPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Feed</h1>

      <p className="mt-4 text-muted-foreground">
        Signed in as {session.user.email}
      </p>
    </main>
  );
}