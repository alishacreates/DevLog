import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Types } from "mongoose";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";
import "@/models/project";
import { CommentForm } from "@/features/comments/components/comment-form";
import { Comment } from "@/models/comment";


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

  const devLog = await DevLog.findById(id)
  .populate("author", "name username image")
  .populate("project", "_id title isPublic owner")
  .lean();

  const project = devLog.project as unknown as {
  _id: Types.ObjectId;
  title: string;
  isPublic: boolean;
  owner: Types.ObjectId;
};

const author = devLog.author as unknown as {
  _id: Types.ObjectId;
  name: string;
  username: string;
  image?: string;
};

const isOwner =
  author._id.toString() === session!.user.id;

  if (!isOwner && !project.isPublic) {
  notFound();
}

const comments = await Comment.find({
  devLog: devLog._id,
})
  .sort({ createdAt: -1 })
  .populate("author", "name username image")
  .lean();

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

          {isOwner ? (
  <Link
    href={`/devlogs/${devLog._id.toString()}/edit`}
    className="rounded-md border px-4 py-2 text-sm font-medium"
  >
    Edit
  </Link>
) : null}
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

      <section
  id="comments"
  className="mt-12 border-t border-border pt-8"
>
  <div className="flex items-center justify-between">
    <div>
      <p className="text-section-label text-primary">
        Discussion
      </p>

      <h2 className="mt-2 text-xl font-semibold">
        {comments.length} Comment
        {comments.length === 1 ? "" : "s"}
      </h2>
    </div>
  </div>

  <div className="mt-6">
    <CommentForm devLogId={devLog._id.toString()} />
  </div>

  {comments.length === 0 ? (
    <p className="mt-6 text-sm text-muted-foreground">
      No comments yet. Start the discussion.
    </p>
  ) : (
    <div className="mt-6 space-y-4">
      {comments.map((comment) => {
        const commentAuthor = comment.author as unknown as {
  _id: Types.ObjectId;
  name: string;
  username: string;
  image?: string;
};

        return (
          <article
            key={comment._id.toString()}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <div className="flex items-start gap-3">
              {commentAuthor.image ? (
                <Image
                  src={commentAuthor.image}
                  alt={commentAuthor.name}
                  width={36}
                  height={36}
                  className="size-9 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {commentAuthor.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/u/${commentAuthor.username}`}
                    className="text-sm font-semibold hover:underline"
                  >
                    {commentAuthor.name}
                  </Link>

                  <span className="text-meta text-muted-foreground">
                    @{commentAuthor.username}
                  </span>

                  <span className="text-muted-foreground">
                    ·
                  </span>

                  <span className="text-meta text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-6">
                  {comment.content}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  )}
</section>
    </main>
  );
}