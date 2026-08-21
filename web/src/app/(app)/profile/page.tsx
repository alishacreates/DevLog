 import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import Image from "next/image";

export default async function ProfilePage() {
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
    <main className="mx-auto max-w-4xl px-6 py-10">
      <section className="space-y-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            {user.image ? (
             <Image
  src={user.image}
  alt={user.name}
  width={80}
  height={80}
  className="h-20 w-20 rounded-full object-cover"
/>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-2xl font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                {user.name}
              </h1>

              <p className="mt-1 text-muted-foreground">
                @{user.username}
              </p>

              {user.bio ? (
                <p className="mt-4 max-w-2xl text-sm leading-6">
                  {user.bio}
                </p>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  No bio added yet.
                </p>
              )}
            </div>
          </div>

          <a
            href="/profile/edit"
            className="rounded-md border px-4 py-2 text-sm font-medium"
          >
            Edit profile
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-2xl font-semibold">
              {user.followersCount}
            </p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-2xl font-semibold">
              {user.followingCount}
            </p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-2xl font-semibold">
              {user.projectsCount}
            </p>
            <p className="text-sm text-muted-foreground">Projects</p>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Developer info</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <ProfileField
              label="University"
              value={user.university}
            />

            <ProfileField
              label="Location"
              value={user.location}
            />

            <ProfileField
              label="GitHub"
              value={user.github}
            />

            <ProfileField
              label="Portfolio"
              value={user.portfolio}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Skills</h2>

          {user.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="rounded-full border px-3 py-1 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No skills added yet.
            </p>
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Tech stack</h2>

          {user.techStack.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-full border px-3 py-1 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No technologies added yet.
            </p>
          )}
        </section>

        <section className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">Projects</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            No projects yet. Your projects will appear here once you
            start adding them to DevLog.
          </p>
        </section>

        <section className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">DevLogs</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            No DevLogs yet. Start documenting what you&apos;re building.
          </p>
        </section>
      </section>
    </main>
  );
}

function ProfileField({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm font-medium">{label}</p>

      <p className="mt-1 text-sm text-muted-foreground">
        {value || "Not added yet"}
      </p>
    </div>
  );
}