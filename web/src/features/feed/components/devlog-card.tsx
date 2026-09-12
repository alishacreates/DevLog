"use client";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import type { FeedItem } from "@/features/feed/types/feed";
import { LikeButton } from "@/features/likes/components/like-button";
import { FeedCommentsPanel } from "@/features/comments/components/feed-comments-panel";
import { useState } from "react";


type DevLogCardProps = {
  devLog: FeedItem;
};

export function DevLogCard({ devLog }: DevLogCardProps) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  return (
    <article className="group/card rounded-2xl border border-border/65 bg-card p-5 transition-all duration-200 hover:border-border hover:shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link href={`/u/${devLog.author.username}`} className="shrink-0">
            {devLog.author.image ? (
              <Image
                src={devLog.author.image}
                alt={devLog.author.name}
                width={40}
                height={40}
                className="size-10 rounded-full object-cover ring-1 ring-border/50"
              />
            ) : (
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary">
                {devLog.author.name.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>

          <div className="min-w-0 flex-1 leading-tight">
            <div className="flex items-center gap-2 truncate">
              <Link
                href={`/u/${devLog.author.username}`}
                className="truncate text-sm font-semibold text-foreground hover:underline"
              >
                {devLog.author.name}
              </Link>
              <Link
                href={`/u/${devLog.author.username}`}
                className="truncate text-xs text-muted-foreground hover:text-foreground"
              >
                @{devLog.author.username}
              </Link>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              <span>{formatDate(devLog.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Project Badge */}
        {devLog.project && (
          <Link
            href={`/projects/${devLog.project.id}`}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-secondary/65 px-3 py-1 font-mono text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            {devLog.project.title}
          </Link>
        )}
      </div>

      {devLog.project && (
        <div className="mt-3 sm:hidden">
          <Link
            href={`/projects/${devLog.project.id}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary/65 px-3 py-1 font-mono text-xs font-medium text-secondary-foreground"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            {devLog.project.title}
          </Link>
        </div>
      )}

      {/* Body */}
      <Link href={`/devlogs/${devLog.id}`} className="mt-4 block space-y-2">
        <h2 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover/card:text-primary">
          {devLog.title}
        </h2>
        <p className="line-clamp-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
          {devLog.content}
        </p>
      </Link>

      {/* Tags */}
      {devLog.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {devLog.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted/60 px-2 py-0.5 font-mono text-[11px] font-medium text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
     <div className="mt-5 border-t border-border/65 pt-4">
  <div className="flex items-center gap-5">
    <LikeButton
      devLogId={devLog.id}
      initialLiked={devLog.likedByCurrentUser}
      initialCount={devLog.likesCount}
    />

    <button
      type="button"
      onClick={() => setCommentsOpen((current) => !current)}
      className={
        commentsOpen
          ? "inline-flex cursor-pointer items-center gap-1.5 text-primary"
          : "inline-flex cursor-pointer items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
      }
    >
      <MessageCircle className="size-4" />
      <span>{devLog.commentsCount}</span>
    </button>
  </div>

  <FeedCommentsPanel
    devLogId={devLog.id}
    open={commentsOpen}
  />
</div>
    </article>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(new Date(date));
}