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
      ? {
          owner: user._id,
        }
      : {
          owner: user._id,
          isPublic: true,
        },
  )
    .sort({ createdAt: -1 })
    .lean();

  const visibleProjectIds = projects.map(
    (project) => project._id,
  );

  const [devLogs, devLogCount] = await Promise.all([
    DevLog.find({
      author: user._id,
      project: {
        $in: visibleProjectIds,
      },
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(),

    DevLog.countDocuments({
      author: user._id,
      project: {
        $in: visibleProjectIds,
      },
    }),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Profile header */}
      <section className="overflow-hidden rounded-[28px] border border-border bg-card">
        {/* Cover */}
        <div className="relative h-36 overflow-hidden bg-[#101513] sm:h-40">
          <div
            className="
              absolute inset-0 opacity-20
              [background-image:linear-gradient(to_right,#69aa9f_1px,transparent_1px),linear-gradient(to_bottom,#69aa9f_1px,transparent_1px)]
              [background-size:32px_32px]
            "
          />

          <div className="absolute left-6 top-5 font-mono text-[9px] uppercase tracking-[0.18em] text-primary/70 sm:left-8">
            Developer profile
          </div>

          <div className="absolute bottom-5 right-6 hidden font-mono text-[11px] text-primary/60 sm:block sm:right-8">
            ~/developers/{user.username}
          </div>
        </div>

        {/* Profile content */}
        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          {/* Avatar + action */}
          <div className="relative z-10 -mt-12 flex items-end justify-between gap-4">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={96}
                height={96}
                priority
                className="relative z-10 size-24 rounded-full border-4 border-card object-cover"
              />
            ) : (
              <div className="relative z-10 flex size-24 items-center justify-center rounded-full border-4 border-card bg-primary text-3xl font-semibold text-primary-foreground">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="pb-1">
              {isOwnProfile ? (
                <Link
                  href="/profile/edit"
                  className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
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

          {/* Name */}
          <div className="mt-4">
            <h1 className="text-3xl font-semibold tracking-[-0.04em]">
              {user.name}
            </h1>

            <p className="mt-1 font-mono text-sm text-muted-foreground">
              @{user.username}
            </p>
          </div>

          {/* Bio */}
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            {user.bio ||
              `${user.name} is documenting projects, progress, and the process behind what they build.`}
          </p>

          {/* Profile metadata */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {user.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {user.location}
              </span>
            ) : null}

            {user.university ? (
              <span className="inline-flex items-center gap-1.5">
                <Code2 className="size-4" />
                {user.university}
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
          </div>

          {/* Social stats */}
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-5">
            <ProfileStat
              value={projects.length}
              label="Projects"
            />

            <ProfileStat
              value={devLogCount}
              label="Posts"
            />

            <ProfileStat
              value={followersCount}
              label={
                followersCount === 1
                  ? "Follower"
                  : "Followers"
              }
            />

            <ProfileStat
              value={followingCount}
              label="Following"
            />
          </div>
        </div>
      </section>

      {/* Main profile area */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Main column */}
        <div className="min-w-0">
          {/* Recent Posts */}
          <section>
            <div>
              <p className="text-section-label text-accent-warm">
                Activity
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                Recent Posts
              </h2>
            </div>

            {devLogs.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-dashed border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No posts yet.
                </p>
              </div>
            ) : (
              <div className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                {devLogs.slice(0, 5).map((devLog) => (
                  <Link
                    key={devLog._id.toString()}
                    href={`/devlogs/${devLog._id.toString()}`}
                    className="group block p-5 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                            Update
                          </p>

                          <span className="text-muted-foreground/50">
                            ·
                          </span>

                          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                            {formatDate(devLog.createdAt)}
                          </p>
                        </div>

                        <h3 className="mt-2 text-base font-semibold tracking-[-0.02em] transition-colors group-hover:text-primary">
                          {devLog.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {devLog.content}
                        </p>

                        {devLog.tags?.length > 0 ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {devLog.tags
                              .slice(0, 3)
                              .map((tag: string) => (
                                <span
                                  key={tag}
                                  className="font-mono text-[10px] text-muted-foreground"
                                >
                                  #{tag}
                                </span>
                              ))}
                          </div>
                        ) : null}
                      </div>

                      {devLog.images?.[0] ? (
                        <div className="relative hidden h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-border sm:block">
                          <Image
                            src={devLog.images[0]}
                            alt={`${devLog.title} screenshot`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            sizes="128px"
                          />
                        </div>
                      ) : (
                        <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Projects */}
          <section className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-section-label text-primary">
                  Work
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
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
              <div className="mt-5 rounded-2xl border border-dashed border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No projects to show yet.
                </p>
              </div>
            ) : (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {projects.map((project) => (
                  <Link
                    key={project._id.toString()}
                    href={`/projects/${project._id.toString()}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-sm"
                  >
                    <div className="relative h-28 overflow-hidden bg-muted">
                      <div
                        className="
                          absolute inset-0 opacity-20
                          [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
                          [background-size:24px_24px]
                          text-primary
                        "
                      />

                      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                          Project
                        </p>

                        {!project.isPublic ? (
                          <LockKeyhole
                            className="size-4 text-red-500"
                            aria-label="Private project"
                          />
                        ) : null}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate font-semibold tracking-[-0.02em] transition-colors group-hover:text-primary">
                            {project.title}
                          </h3>

                          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-accent-warm">
                            {formatStatus(project.status)}
                          </p>
                        </div>

                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                      </div>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {project.description}
                      </p>

                      {project.techStack.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.techStack
                            .slice(0, 3)
                            .map((tech: string) => (
                              <span
                                key={tech}
                                className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
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
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Stack */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <p className="text-section-label text-primary">
              Stack
            </p>

            {user.techStack?.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {user.techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
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
          </section>

          {/* Skills */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <p className="text-section-label text-accent-warm">
              Skills
            </p>

            {user.skills?.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {user.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                No skills added yet.
              </p>
            )}
          </section>

          {/* DevLog identity */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <p className="text-section-label text-primary">
              DevLog
            </p>

            <p className="mt-3 font-serif text-sm leading-6 text-muted-foreground">
              Building in public means documenting the process, not just the
              result.
            </p>
          </section>
        </aside>
      </div>
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
    <div className="flex items-baseline gap-1.5">
      <span className="font-semibold">
        {value}
      </span>

      <span className="text-xs text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function formatStatus(status: string) {
  return status
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}