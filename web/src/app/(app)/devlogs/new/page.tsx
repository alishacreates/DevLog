import { auth } from "@/auth";
import { CreateDevLogForm } from "@/features/devlogs/components/create-devlog-form";
import { connectDB } from "@/lib/db/mongoose";
import { Project } from "@/models/project";

type NewDevLogPageProps = {
  searchParams: Promise<{
    project?: string;
  }>;
};

export default async function NewDevLogPage({
  searchParams,
}: NewDevLogPageProps) {
  const { project: selectedProjectId } = await searchParams;
  const session = await auth();

  await connectDB();

  const projects = await Project.find({
    owner: session!.user.id,
  })
    .sort({ createdAt: -1 })
    .select("_id title")
    .lean();


  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create DevLog
        </h1>

        <p className="mt-2 text-muted-foreground">
          Share what you worked on, learned, or shipped.
        </p>
      </div>

      <CreateDevLogForm
        projects={projects.map((project) => ({
          id: project._id.toString(),
          title: project.title,
        }))}
        selectedProjectId={selectedProjectId}
      />
    </main>
  );
}