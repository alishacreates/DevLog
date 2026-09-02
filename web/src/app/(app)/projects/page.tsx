import Link from "next/link";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { Project } from "@/models/project";

export default async function ProjectsPage() {
  const session = await auth();

  const userId = session!.user.id;

  await connectDB();

  const projects = await Project.find({
    owner: userId,
  })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Projects
          </h1>

          <p className="mt-2 text-muted-foreground">
            Projects you&apos;re building and documenting on DevLog.
          </p>
        </div>

        <Link
          href="/projects/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <section className="mt-12 rounded-xl border p-8 text-center">
          <h2 className="text-lg font-semibold">
            No projects yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Add your first project and start documenting its journey.
          </p>

          <Link
            href="/projects/new"
            className="mt-5 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Create your first project
          </Link>
        </section>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project._id.toString()}
              href={`/projects/${project._id.toString()}`}
              className="rounded-xl border p-5 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-semibold">
                  {project.title}
                </h2>

                <span className="text-xs text-muted-foreground">
                  {formatStatus(project.status)}
                </span>
              </div>

              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                {project.description}
              </p>

              {project.techStack.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 5).map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded-full border px-2.5 py-1 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

function formatStatus(status: string) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}