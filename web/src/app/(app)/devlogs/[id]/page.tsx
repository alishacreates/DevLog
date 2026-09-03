import Link from "next/link";
import { notFound } from "next/navigation";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";
import "@/models/project";

type DevLogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DevLogPage({
  params,
}: DevLogPageProps) {
  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    notFound();
  }

  const session = await auth();

  await connectDB();

  const devLog = await DevLog.findOne({
    _id: id,
    author: session!.user.id,
  })
    .populate("project", "_id title")
    .lean();

  if (!devLog) {
    notFound();
  }

  const project = devLog.project as unknown as {
    _id: Types.ObjectId;
    title: string;
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href={`/projects/${project._id.toString()}`}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to {project.title}
      </Link>

      <article className="mt-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm text-muted-foreground">
              {project.title}
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {devLog.title}
            </h1>

            <p className="mt-3 text-sm text-muted-foreground">
              {new Date(devLog.createdAt).toLocaleDateString()}
            </p>
          </div>

          <Link
            href={`/devlogs/${devLog._id.toString()}/edit`}
            className="rounded-md border px-4 py-2 text-sm font-medium"
          >
            Edit
          </Link>
        </div>

        <div className="mt-8 whitespace-pre-wrap leading-7">
          {devLog.content}
        </div>

        {devLog.tags.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {devLog.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border px-3 py-1 text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </article>
    </main>
  );
}