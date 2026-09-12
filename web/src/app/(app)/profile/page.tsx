import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (!session.user.isOnboarded || !session.user.username) {
    redirect("/onboarding");
  }

  redirect(`/u/${session.user.username}`);
}