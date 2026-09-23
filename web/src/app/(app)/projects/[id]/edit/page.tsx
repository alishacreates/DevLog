import { notFound } from "next/navigation";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { connectDB } from "@/lib/db/mongoose";
import { Project } from "@/models/project";
import { DeleteProjectDialog } from "@/features/projects/components/delete-project-dialog";
import { BackButton } from "@/components/shared/back-button";

type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
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
    <main className="mx-auto max-w-2xl px-6 py-10">
      
  <BackButton fallback={`/projects/${id}`} />
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Edit project
        </h1>

        <p className="mt-2 text-muted-foreground">
          Update the details of your project.
        </p>
      </div>

      <EditProjectForm
        project={{
          id: project._id.toString(),
          title: project.title,
          description: project.description,
          status: project.status,
          techStack: project.techStack ?? [],
          githubUrl: project.githubUrl ?? "",
          liveUrl: project.liveUrl ?? "",
          isPublic: project.isPublic,
        }}
      />
      <section className="mt-12 border-t pt-8">
  <div className="rounded-lg border border-destructive/30 p-6">
    <h2 className="font-semibold">
      Danger zone
    </h2>

    <p className="mt-2 text-sm text-muted-foreground">
  Permanently delete this project and all of its posts.
  This action cannot be undone.
</p>

    <div className="mt-5">
      <DeleteProjectDialog
        projectId={project._id.toString()}
        projectTitle={project.title}
      />
    </div>
  </div>
</section>
    </main>
  );
}