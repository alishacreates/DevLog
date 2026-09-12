import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  MapPin,
  Code2,
} from "lucide-react";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";
import { Project } from "@/models/project";
import { User } from "@/models/user";
import { Follow } from "@/models/follow";
import { FollowButton } from "@/features/follows/components/follow-button";

type PublicProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { username } = await params;
  const session = await auth();

  await connectDB();

  const user = await User.findOne({
    username: username.toLowerCase(),
  }).lean();

  if (!user) {
    notFound();
  }

  const isOwnProfile =
    session?.user?.id === user._id.toString();
  
  const [followersCount, followingCount, existingFollow] =
  await Promise.all([
    Follow.countDocuments({
      following: user._id,
    }),

    Follow.countDocuments({
      follower: user._id,
    }),

    isOwnProfile || !session?.user?.id
      ? Promise.resolve(null)
      : Follow.findOne({
          follower: session.user.id,
          following: user._id,
        }).lean(),
  ]);

  const projects = await Project.find(
    isOwnProfile
      ? { owner: user._id }
      : { owner: user._id, isPublic: true }
  )
    .sort({ createdAt: -1 })
    .lean();

  const visibleProjectIds = projects.map(
    (project) => project._id
  );

  const devLogs = await DevLog.find({
    author: user._id,
    project: {
      $in: visibleProjectIds,
    },
  })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      {/* Profile header */}
      <section className="overflow-hidden rounded-[28px] border border-border bg-card">
        <div className="h-36 bg-gradient-to-br from-primary/25 via-primary/5 to-background" />

        <div className="px-6 pb-6 sm:px-8">
          <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={96}
                  height={96}
                  className="size-24 rounded-full border-4 border-card object-cover"
                />
              ) : (
                <div className="flex size-24 items-center justify-center rounded-full border-4 border-card bg-primary text-2xl font-semibold text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="pb-1">
                <h1 className="text-3xl font-semibold tracking-[-0.03em]">
                  {user.name}
                </h1>

                <p className="text-meta mt-1 text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </div>

            {isOwnProfile ? (
              <Link
                href="/profile/edit"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                Edit profile
              </Link>
            ) : (
              <FollowButton
  userId={user._id.toString()}
  initialFollowing={Boolean(existingFollow)}
/>
            )}
          </div>

          {user.bio ? (
            <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">
              {user.bio}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {user.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {user.location}
              </span>
            ) : null}

            {user.github ? (
              <a
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
              >
                <Code2 className="size-4" />
                GitHub
              </a>
            ) : null}

            {user.portfolio ? (
              <a
                href={user.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
              >
                <ArrowUpRight className="size-4" />
                Portfolio
              </a>
            ) : null}
          </div>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-6 border-t border-border pt-5">
            <div>
              <p className="text-lg font-semibold">
                {projects.length}
              </p>
              <p className="text-meta-uppercase text-muted-foreground">
                Projects
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold">
                {devLogs.length}
              </p>
              <p className="text-meta-uppercase text-muted-foreground">
                DevLogs
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold">
                {followersCount}
              </p>
              <p className="text-meta-uppercase text-muted-foreground">
                Followers
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold">
                {followingCount}
              </p>
              <p className="text-meta-uppercase text-muted-foreground">
                Following
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      {user.skills.length > 0 ? (
        <section className="mt-6 rounded-2xl border border-border bg-card p-5">
          <p className="text-section-label text-muted-foreground">
            Skills
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {user.skills.map((skill: string) => (
              <span
                key={skill}
                className="text-meta-uppercase rounded-full bg-muted px-3 py-1 text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {/* Tabs-like sections */}
      <section className="mt-8">
        <div className="flex items-center gap-6 border-b border-border">
          <button
            type="button"
            className="border-b-2 border-primary pb-3 text-sm font-semibold"
          >
            Projects
          </button>

          <button
            type="button"
            className="pb-3 text-sm text-muted-foreground"
          >
            DevLogs
          </button>

          <button
            type="button"
            className="pb-3 text-sm text-muted-foreground"
          >
            About
          </button>
        </div>

        {/* Projects */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project._id.toString()}
              href={`/projects/${project._id.toString()}`}
              className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold">
                  {project.title}
                </h3>

                <span className="text-meta-uppercase rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                  {formatStatus(project.status)}
                </span>
              </div>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>

              {project.techStack.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack
                    .slice(0, 4)
                    .map((tech: string) => (
                      <span
                        key={tech}
                        className="text-meta rounded-full border border-border px-2.5 py-1 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              ) : null}
            </Link>
          ))}
        </div>

        {/* Recent DevLogs */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">
            Recent DevLogs
          </h2>

          <div className="mt-4 space-y-3">
            {devLogs.map((devLog) => (
              <Link
                key={devLog._id.toString()}
                href={`/devlogs/${devLog._id.toString()}`}
                className="block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <h3 className="font-semibold">
                  {devLog.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {devLog.content}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function formatStatus(status: string) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}