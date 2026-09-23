"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

import type { FeedItem } from "@/features/feed/types/feed";
import { LikeButton } from "@/features/likes/components/like-button";
import { FeedCommentsPanel } from "@/features/comments/components/feed-comments-panel";

type DevLogCardProps = {
  devLog: FeedItem;
};

export function DevLogCard({ devLog }: DevLogCardProps) {
  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <article className="group/card overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-200 hover:border-border">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href={`/u/${devLog.author.username}`}
              className="shrink-0"
            >
              {devLog.author.image ? (
                <Image
                  src={devLog.author.image}
                  alt={devLog.author.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover ring-1 ring-border"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary">
                  {devLog.author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </Link>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <Link
                  href={`/u/${devLog.author.username}`}
                  className="truncate text-sm font-semibold transition-colors hover:text-primary"
                >
                  {devLog.author.name}
                </Link>

                <Link
                  href={`/u/${devLog.author.username}`}
                  className="truncate text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  @{devLog.author.username}
                </Link>
              </div>

              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-accent-warm/80">
                {formatDate(devLog.createdAt)}
              </p>
            </div>
          </div>

          {/* Project */}
          {devLog.project ? (
            <Link
              href={`/projects/${devLog.project.id}`}
              className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground sm:inline-flex"
            >
              <span className="size-1.5 rounded-full bg-accent-warm" />
              {devLog.project.title}
            </Link>
          ) : null}
        </div>

        {/* Project mobile */}
        {devLog.project ? (
          <div className="mt-3 sm:hidden">
            <Link
              href={`/projects/${devLog.project.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 font-mono text-[10px] text-muted-foreground"
            >
              <span className="size-1.5 rounded-full bg-accent-warm" />
              {devLog.project.title}
            </Link>
          </div>
        ) : null}

        {/* Content */}
        <Link
          href={`/devlogs/${devLog.id}`}
          className="mt-5 block"
        >
          <h2 className="text-lg font-semibold tracking-[-0.025em] transition-colors group-hover/card:text-primary">
            {devLog.title}
          </h2>

          <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
            {devLog.content}
          </p>
        </Link>

        {/* Tags */}
        {devLog.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
            {devLog.tags.slice(0, 5).map((tag) => (
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
      {devLog.images.length > 0 ? (
        <Link
          href={`/devlogs/${devLog.id}`}
          className="block overflow-hidden border-y border-border/70"
        >
          {devLog.images.length === 1 ? (
            <Image
              src={devLog.images[0]}
              alt={devLog.title}
              width={1200}
              height={800}
              className="max-h-[430px] w-full object-cover"
            />
          ) : (
            <div className="grid grid-cols-2 gap-px bg-border">
              {devLog.images.slice(0, 4).map((image, index) => (
                <div
                  key={image}
                  className="relative overflow-hidden bg-card"
                >
                  <Image
                    src={image}
                    alt={`${devLog.title} screenshot ${index + 1}`}
                    width={600}
                    height={450}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />

                  {index === 3 &&
                  devLog.images.length > 4 ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-lg font-semibold text-white">
                      +{devLog.images.length - 4}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </Link>
      ) : null}

      {/* Social actions */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-6">
          <LikeButton
            devLogId={devLog.id}
            initialLiked={devLog.likedByCurrentUser}
            initialCount={devLog.likesCount}
          />

          <button
            type="button"
            onClick={() =>
              setCommentsOpen((current) => !current)
            }
            className={
              commentsOpen
                ? "inline-flex cursor-pointer items-center gap-1.5 text-primary"
                : "inline-flex cursor-pointer items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
            }
          >
            <MessageCircle className="size-4" />

            <span className="text-sm">
              {devLog.commentsCount}
            </span>
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
    year: "numeric",
  }).format(new Date(date));
}