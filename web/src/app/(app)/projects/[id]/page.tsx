import Link from "next/link";
import { notFound } from "next/navigation";
import { Types } from "mongoose";
import {
  ArrowUpRight,
  Code2,
  Globe2,
  Lock,
  Plus,
} from "lucide-react";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";
import { Project } from "@/models/project";
import { BackButton } from "@/components/shared/back-button";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    notFound();
  }

  const session = await auth();

  await connectDB();

  const project = await Project.findOne({
    _id: id,
    $or: [
      { owner: session!.user.id },
      { isPublic: true },
    ],
  }).lean();

  if (!project) {
    notFound();
  }

  const isOwner =
    project.owner.toString() === session!.user.id;

  const devLogs = await DevLog.find({
    project: project._id,
  })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <BackButton fallback="/projects" />

      <section className="mt-8 overflow-hidden rounded-[28px] border border-border bg-card">
        <div className="relative min-h-[320px] overflow-hidden p-8 sm:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background" />

          <div className="absolute right-8 top-8 select-none font-mono text-[10rem] font-bold leading-none text-foreground/[0.035]">
            {getInitials(project.title)}
          </div>

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
  <div>
    <div className="flex flex-wrap items-center gap-3">
      <span
        className={
          project.isPublic
            ? "text-meta-uppercase inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-primary-foreground"
            : "text-meta-uppercase inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-muted-foreground"
        }
      >
        {project.isPublic ? (
          <Globe2 className="size-3.5" />
        ) : (
          <Lock className="size-3.5" />
        )}

        {project.isPublic ? "Public" : "Private"}
      </span>

      <span className="text-meta-uppercase rounded-full border border-border bg-background/70 px-3 py-1.5 text-muted-foreground backdrop-blur-sm">
        {formatStatus(project.status)}
      </span>
    </div>

    <div className="mt-14">
      <p className="landing-display text-2xl uppercase tracking-[-0.02em]">
        DEVLOG<span className="text-primary">_</span>
      </p>

      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
        {project.title}
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
        {project.description}
      </p>
    </div>
  </div>

  <aside className="lg:border-l lg:border-border lg:pl-8">
    <div className="space-y-3">
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-between rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
        >
          GitHub
          <Code2 className="size-4" />
        </a>
      ) : null}

      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-between rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
        >
          Live Demo
          <ArrowUpRight className="size-4" />
        </a>
      ) : null}

      {isOwner ? (
        <Link
          href={`/projects/${project._id.toString()}/edit`}
          className="flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Edit Project
        </Link>
      ) : null}
    </div>

    {project.techStack.length > 0 ? (
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-section-label text-muted-foreground">
          Tech stack
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.techStack.map((tech: string) => (
            <span
              key={tech}
              className="text-meta rounded-full border border-border bg-muted/50 px-3 py-1.5 text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ) : null}
  </aside>
</div>
        </div>

        {project.techStack.length > 0 ? (
          <div className="border-t border-border px-8 py-6 sm:px-10">
            <p className="text-section-label text-muted-foreground">
              Tech stack
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="text-meta rounded-full border border-border bg-muted/50 px-3 py-1.5 text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-6 border-b border-border pb-5">
          <div>
            <p className="text-section-label text-primary">
              Project Journey
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
              {devLogs.length} DevLog{devLogs.length === 1 ? "" : "s"}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Progress, decisions, bugs, lessons and milestones from this project.
            </p>
          </div>

          {isOwner ? (
            <Link
              href={`/devlogs/new?project=${project._id.toString()}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-action-label text-primary-foreground"
            >
              <Plus className="size-4" />
              New DevLog
            </Link>
          ) : null}
        </div>

        {devLogs.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-border bg-card p-8 text-center">
            <h3 className="text-lg font-semibold">
              No DevLogs yet
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              This project&apos;s journey hasn&apos;t been documented yet.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {devLogs.map((devLog) => (
              <Link
                key={devLog._id.toString()}
                href={`/devlogs/${devLog._id.toString()}`}
                className="group block rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] transition-colors group-hover:text-primary">
                      {devLog.title}
                    </h3>

                    <p className="mt-1 text-meta-uppercase text-muted-foreground">
                      {formatDate(devLog.createdAt)}
                    </p>
                  </div>

                  <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {devLog.content}
                </p>

                {devLog.tags.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {devLog.tags.slice(0, 5).map((tag: string) => (
                      <span
                        key={tag}
                        className="text-meta-uppercase rounded-full bg-muted px-2.5 py-1 text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        )}
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

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getInitials(title: string) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}