import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Code2,
  LockKeyhole,
  MapPin,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

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
    <main className="mx-auto max-w-6xl px-6 py-8">
      {/* Developer banner */}
      <section className="overflow-hidden rounded-[30px] border border-border bg-card">
        <div className="relative h-44 overflow-hidden bg-[#101513] sm:h-52">
          <div
            className="
              absolute inset-0 opacity-20
              [background-image:linear-gradient(to_right,#69aa9f_1px,transparent_1px),linear-gradient(to_bottom,#69aa9f_1px,transparent_1px)]
              [background-size:32px_32px]
            "
          />

          <div className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70 sm:left-8">
            Developer profile
          </div>

          <div className="absolute bottom-6 right-6 font-mono text-xs text-primary/70 sm:right-8">
            ~/developers/{user.username}
          </div>
        </div>

        <div className="px-6 pb-7 sm:px-8">
          <div className="-mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={104}
                  height={104}
                  priority
                  className="size-26 rounded-full border-4 border-card object-cover"
                />
              ) : (
                <div className="flex size-26 items-center justify-center rounded-full border-4 border-card bg-primary text-3xl font-semibold text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="pb-1">
                <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  {user.name}
                </h1>

                <p className="mt-1 font-mono text-sm text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              {isOwnProfile ? (
                <Link
                  href="/profile/edit"
                  className="inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
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
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              {user.bio ? (
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  {user.bio}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No bio added yet.
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
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
                    <FaGithub className="size-4" />
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

                {user.university ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Code2 className="size-4" />
                    {user.university}
                  </span>
                ) : null}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4 lg:grid-cols-2">
              <ProfileStat
                value={projects.length}
                label="Projects"
              />

              <ProfileStat
                value={devLogs.length}
                label="DevLogs"
              />

              <ProfileStat
                value={followersCount}
                label="Followers"
              />

              <ProfileStat
                value={followingCount}
                label="Following"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About + stack */}
      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-border bg-card p-6">
          <p className="text-section-label text-primary">
            About
          </p>

          <h2 className="mt-3 text-xl font-semibold tracking-tight">
            Developer profile
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            {user.bio ||
              `${user.name} is documenting projects, progress, and the process behind what they build.`}
          </p>

          {user.skills?.length > 0 ? (
            <div className="mt-6">
              <p className="text-meta-uppercase text-muted-foreground">
                Skills
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {user.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <p className="text-section-label text-primary">
            Stack
          </p>

          {user.techStack?.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {user.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              No technologies added yet.
            </p>
          )}
        </div>
      </section>

      {/* Projects */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-section-label text-primary">
              Work
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Projects
            </h2>
          </div>

          {isOwnProfile ? (
            <Link
              href="/projects/new"
              className="text-action-label text-muted-foreground transition-colors hover:text-primary"
            >
              New project →
            </Link>
          ) : null}
        </div>

        {projects.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-border p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No projects to show yet.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <Link
                key={project._id.toString()}
                href={`/projects/${project._id.toString()}`}
                className={`group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-sm ${
                  index === 0 && projects.length > 2
                    ? "md:row-span-2"
                    : ""
                }`}
              >
                {/* Visual project area */}
                <div
                  className={`relative overflow-hidden bg-muted ${
                    index === 0 && projects.length > 2
                      ? "aspect-[16/11] md:h-[360px] md:aspect-auto"
                      : "aspect-[16/10]"
                  }`}
                >
                  <div
                    className="
                      absolute inset-0 opacity-20
                      [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
                      [background-size:24px_24px]
                      text-primary
                    "
                  />

                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                        Project
                      </p>

                      <h3 className="mt-1 text-xl font-semibold">
                        {project.title}
                      </h3>
                    </div>

                    {!project.isPublic ? (
                      <div
                        className="flex size-9 items-center justify-center rounded-full bg-red-500/10"
                        aria-label="Private project"
                      >
                        <LockKeyhole className="size-4 text-red-500" />
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-meta-uppercase text-muted-foreground">
                      {formatStatus(project.status)}
                    </p>

                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
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
                            className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Recent DevLogs */}
      <section className="mt-12">
        <div>
          <p className="text-section-label text-primary">
            Activity
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Recent DevLogs
          </h2>
        </div>

        {devLogs.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-border p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No DevLogs yet.
            </p>
          </div>
        ) : (
          <div className="mt-6 divide-y divide-border rounded-3xl border border-border bg-card">
            {devLogs.map((devLog) => (
              <Link
                key={devLog._id.toString()}
                href={`/devlogs/${devLog._id.toString()}`}
                className="group block p-5 first:rounded-t-3xl last:rounded-b-3xl hover:bg-muted/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold transition-colors group-hover:text-primary">
                      {devLog.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {devLog.content}
                    </p>
                  </div>

                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function ProfileStat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div>
      <p className="text-xl font-semibold">
        {value}
      </p>

      <p className="mt-1 text-meta-uppercase text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function formatStatus(status: string) {
  return status
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}