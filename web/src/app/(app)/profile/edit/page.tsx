import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";

export default async function EditProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (!session.user.isOnboarded) {
    redirect("/onboarding");
  }

  await connectDB();

  const user = await User.findById(session.user.id).lean();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Edit profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Tell other developers a little more about yourself.
        </p>
      </div>

      <EditProfileForm
        user={{
          name: user.name,
          bio: user.bio ?? "",
          university: user.university ?? "",
          location: user.location ?? "",
          skills: user.skills ?? [],
          techStack: user.techStack ?? [],
          github: user.github ?? "",
          portfolio: user.portfolio ?? "",
        }}
      />
    </main>
  );
}