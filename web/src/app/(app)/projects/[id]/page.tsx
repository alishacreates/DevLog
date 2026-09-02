import Link from "next/link";
import { notFound } from "next/navigation";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { Project } from "@/models/project";

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

        <section className="mt-12 rounded-xl border p-6">
          <h2 className="text-lg font-semibold">
            DevLogs
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            No DevLogs for this project yet.
          </p>
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