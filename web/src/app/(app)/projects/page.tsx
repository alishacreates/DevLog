import Link from "next/link";

import { auth } from "@/auth";
import { ProjectCard } from "@/features/projects/components/project-card";
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

  const serializedProjects = projects.map((project) => ({
    id: project._id.toString(),
    title: project.title,
    description: project.description,
    status: project.status,
    techStack: project.techStack,
    isPublic: project.isPublic,
  }));

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
        <div>
          <p className="text-section-label text-primary">
            Your workspace
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
            Projects
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Everything you&apos;re building and documenting on DevLog.
          </p>
        </div>

        <Link
          href="/projects/new"
          className="rounded-full bg-primary px-5 py-2.5 text-action-label text-primary-foreground transition-opacity hover:opacity-90"
        >
          New Project
        </Link>
      </div>

      {serializedProjects.length === 0 ? (
        <section className="mt-10 rounded-2xl border border-border bg-card p-10 text-center">
          <h2 className="text-lg font-semibold">
            No projects yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Start your first project and document the journey as you build.
          </p>

          <Link
            href="/projects/new"
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-action-label text-primary-foreground"
          >
            Create your first project
          </Link>
        </section>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serializedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      )}
    </main>
  );
}