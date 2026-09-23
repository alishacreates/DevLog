import { notFound } from "next/navigation";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { EditDevLogForm } from "@/features/devlogs/components/edit-devlog-form";
import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";
import { Project } from "@/models/project";
import { DeleteDevLogDialog } from "@/features/devlogs/components/delete-devlog-dialog";
import { BackButton } from "@/components/shared/back-button";

type EditDevLogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditDevLogPage({
  params,
}: EditDevLogPageProps) {
  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    notFound();
  }

  const session = await auth();

  await connectDB();

  const devLog = await DevLog.findOne({
    _id: id,
    author: session!.user.id,
  }).lean();

  if (!devLog) {
    notFound();
  }

  const projects = await Project.find({
    owner: session!.user.id,
  })
    .sort({ createdAt: -1 })
    .select("_id title")
    .lean();

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <BackButton fallback={`/devlogs/${id}`} />

      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Edit Post
        </h1>

        <p className="mt-2 text-muted-foreground">
          Update your progress entry.
        </p>
      </div>

      <EditDevLogForm
        devLog={{
          id: devLog._id.toString(),
          projectId: devLog.project.toString(),
          title: devLog.title,
          content: devLog.content,
          tags: devLog.tags ?? [],
          images: devLog.images ?? [],
        }}
        projects={projects.map((project) => ({
          id: project._id.toString(),
          title: project.title,
        }))}
      />

      <section className="mt-12 border-t pt-8">
        <div className="rounded-lg border border-destructive/30 p-6">
          <h2 className="font-semibold">
            Danger zone
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Permanently delete this post. This action cannot be undone.
          </p>

          <div className="mt-5">
            <DeleteDevLogDialog
              devLogId={devLog._id.toString()}
              devLogTitle={devLog.title}
            />
          </div>
        </div>
      </section>
    </main>
  );
}