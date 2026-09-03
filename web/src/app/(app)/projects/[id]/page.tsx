import Link from "next/link";
import { notFound } from "next/navigation";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { Project } from "@/models/project";
import { DevLog } from "@/models/devlog";

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
    owner: session!.user.id,
  }).lean();

  if (!project) {
    notFound();
  }

  const devLogs = await DevLog.find({
  project: project._id,
  author: session!.user.id,
})
  .sort({ createdAt: -1 })
  .lean();
  
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/projects"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to projects
      </Link>

      <section className="mt-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {project.title}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {formatStatus(project.status)}
            </p>
          </div>

          <Link
            href={`/projects/${project._id.toString()}/edit`}
            className="rounded-md border px-4 py-2 text-sm font-medium"
          >
            Edit project
          </Link>
        </div>

        <p className="mt-8 leading-7">
          {project.description}
        </p>

        {project.techStack.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-sm font-medium">
              Tech stack
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-full border px-3 py-1 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border px-4 py-2 text-sm font-medium"
            >
              GitHub
            </a>
          ) : null}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border px-4 py-2 text-sm font-medium"
            >
              Live Demo
            </a>
          ) : null}
        </div>
<section className="mt-12">
  <div className="flex items-center justify-between gap-4">
    <div>
      <h2 className="text-xl font-semibold">
        DevLogs
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Progress updates for this project.
      </p>
    </div>

    <Link href={`/devlogs/new?project=${project._id.toString()}`}>
  New DevLog
</Link>
  </div>

  {devLogs.length === 0 ? (
    <div className="mt-6 rounded-xl border p-6">
      <p className="text-sm text-muted-foreground">
        No DevLogs for this project yet.
      </p>
    </div>
  ) : (
    <div className="mt-6 space-y-3">
      {devLogs.map((devLog) => (
        <Link
          key={devLog._id.toString()}
          href={`/devlogs/${devLog._id.toString()}`}
          className="block rounded-xl border p-5 transition-colors hover:bg-muted/40"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-semibold">
              {devLog.title}
            </h3>

            <span className="text-xs text-muted-foreground">
              {new Date(devLog.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {devLog.content}
          </p>

          {devLog.tags.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {devLog.tags.slice(0, 5).map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs text-muted-foreground"
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