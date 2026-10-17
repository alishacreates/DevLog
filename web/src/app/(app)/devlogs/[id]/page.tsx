import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Types } from "mongoose";
import {
  CalendarDays,
  FolderKanban,
  Pencil,
} from "lucide-react";
import { DeleteCommentButton } from "@/features/comments/components/delete-comment-button";
import { CommentContent } from "@/features/comments/components/comment-content";

import { auth } from "@/auth";
import { BackButton } from "@/components/shared/back-button";
import { CommentForm } from "@/features/comments/components/comment-form";
import { connectDB } from "@/lib/db/mongoose";
import { Comment } from "@/models/comment";
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

  const devLog = await DevLog.findById(id)
    .populate("author", "name username image")
    .populate("project", "_id title isPublic owner")
    .lean();

  if (!devLog) {
    notFound();
  }

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
    project.owner.toString() === session!.user.id;

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
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <BackButton fallback="/feed" />

      {/* Post */}
      <article className="mt-6 overflow-hidden rounded-[28px] border border-border bg-card sm:mt-8">
        {/* Header */}
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            {/* Author */}
            <div className="flex min-w-0 items-center gap-3">
              <Link
                href={`/u/${author.username}`}
                className="shrink-0"
              >
                {author.image ? (
                  <Image
                    src={author.image}
                    alt={author.name}
                    width={44}
                    height={44}
                    className="size-11 rounded-full object-cover ring-1 ring-border"
                  />
                ) : (
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary">
                    {author.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <Link
                    href={`/u/${author.username}`}
                    className="truncate text-sm font-semibold transition-colors hover:text-primary"
                  >
                    {author.name}
                  </Link>

                  <span className="truncate text-xs text-muted-foreground">
                    @{author.username}
                  </span>
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
                    <CalendarDays className="size-3" />
                    {formatDate(devLog.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit */}
            {isOwner ? (
              <Link
                href={`/devlogs/${devLog._id.toString()}/edit`}
                className="
                  inline-flex shrink-0 items-center gap-2
                  rounded-full border border-border
                  px-3.5 py-2
                  text-xs font-medium
                  transition-colors
                  hover:border-primary/50
                  hover:bg-primary/5
                  hover:text-primary
                "
              >
                <Pencil className="size-3.5" />
                <span className="hidden sm:inline">
                  Edit post
                </span>
              </Link>
            ) : null}
          </div>

          {/* Project */}
          <Link
            href={`/projects/${project._id.toString()}`}
            className="
              mt-6 inline-flex items-center gap-2
              rounded-full border border-border
              bg-muted/50 px-3 py-1.5
              font-mono text-[9px] uppercase tracking-[0.1em]
              text-muted-foreground
              transition-colors
              hover:border-primary/40
              hover:text-primary
            "
          >
            <FolderKanban className="size-3.5" />
            {project.title}
          </Link>

          {/* Title */}
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            {devLog.title}
          </h1>

          {/* Content */}
          <div className="mt-5 whitespace-pre-wrap text-[15px] leading-7 text-foreground/90 sm:text-base sm:leading-8">
            {devLog.content}
          </div>

          {/* Tags */}
          {devLog.tags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
              {devLog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-muted-foreground transition-colors hover:text-primary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Images */}
        {devLog.images?.length > 0 ? (
          <div
            className={
              devLog.images.length === 1
                ? "grid grid-cols-1 border-t border-border"
                : "grid grid-cols-1 gap-px border-t border-border bg-border sm:grid-cols-2"
            }
          >
            {devLog.images.map(
              (image: string, index: number) => (
                <div
                  key={image}
                  className="overflow-hidden bg-background"
                >
                  <Image
                    src={image}
                    alt={`${devLog.title} screenshot ${index + 1}`}
                    width={1200}
                    height={800}
                    priority={index === 0}
                    className={
                      devLog.images.length === 1
                        ? "max-h-[600px] w-full object-cover"
                        : "aspect-[4/3] w-full object-cover"
                    }
                  />
                </div>
              )
            )}
          </div>
        ) : null}
      </article>

      {/* Discussion */}
      <section
        id="comments"
        className="mt-10 sm:mt-12"
      >
        <div className="flex items-end justify-between gap-4 border-b border-border pb-5">
          <div>
            <p className="text-section-label text-primary dark:text-accent-warm">
              Discussion
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em]">
              {comments.length} Comment
              {comments.length === 1 ? "" : "s"}
            </h2>
          </div>
        </div>

        {/* Comment form */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <CommentForm
            devLogId={devLog._id.toString()}
          />
        </div>

        {/* Comments */}
        {comments.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-border p-8 text-center">
            <p className="text-sm font-medium">
              No comments yet
            </p>

            <p className="mt-1.5 text-sm text-muted-foreground">
              Start the discussion.
            </p>
          </div>
        ) : (
          <div className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {comments.map((comment) => {
              const commentAuthor =
                comment.author as unknown as {
                  _id: Types.ObjectId;
                  name: string;
                  username: string;
                  image?: string;
                };

                const isCommentAuthor =
              commentAuthor._id.toString() ===
              session?.user?.id;

              return (
                <article
                  key={comment._id.toString()}
                  className="p-4 sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    <Link
                      href={`/u/${commentAuthor.username}`}
                      className="shrink-0"
                    >
                      {commentAuthor.image ? (
                        <Image
                          src={commentAuthor.image}
                          alt={commentAuthor.name}
                          width={36}
                          height={36}
                          className="size-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {commentAuthor.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <Link
                          href={`/u/${commentAuthor.username}`}
                          className="text-sm font-semibold transition-colors hover:text-primary"
                        >
                          {commentAuthor.name}
                        </Link>

                        <span className="text-xs text-muted-foreground">
                          @{commentAuthor.username}
                        </span>

                        <span className="text-muted-foreground/50">
                          ·
                        </span>

                        <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>

                     <div className="mt-2">
  <CommentContent content={comment.content} contentJson={comment.contentJson}/>
</div>
                   {isCommentAuthor ? (
                    <div className="mt-3">
                      <DeleteCommentButton
                        commentId={comment._id.toString()}
                      />
                    </div>
                  ) : null}
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

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}