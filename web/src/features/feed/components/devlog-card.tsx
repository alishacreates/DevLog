import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  MessageCircle,
} from "lucide-react";

import type { FeedItem } from "@/features/feed/types/feed";

type DevLogCardProps = {
  devLog: FeedItem;
};

export function DevLogCard({
  devLog,
}: DevLogCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start gap-3">
        {devLog.author.image ? (
          <Image
            src={devLog.author.image}
            alt={devLog.author.name}
            width={42}
            height={42}
            className="size-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground">
            {devLog.author.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link
  href={`/u/${devLog.author.username}`}
  className="text-sm font-semibold hover:underline"
>
  {devLog.author.name}
</Link>
            <Link
  href={`/u/${devLog.author.username}`}
  className="text-meta text-muted-foreground hover:text-foreground"
>
  @{devLog.author.username}
</Link>

            <span className="text-muted-foreground">
              ·
            </span>

            <span className="text-meta-uppercase text-muted-foreground">
              {formatDate(devLog.createdAt)}
            </span>
          </div>

          <Link
            href={`/projects/${devLog.project.id}`}
            className="text-meta-uppercase mt-1 inline-block text-primary hover:underline"
          >
            Building / {devLog.project.title}
          </Link>
        </div>
      </div>

      <Link
        href={`/devlogs/${devLog.id}`}
        className="group mt-5 block"
      >
        <h2 className="text-xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-primary">
          {devLog.title}
        </h2>

        <p className="mt-2 line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
          {devLog.content}
        </p>
      </Link>

      {devLog.tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {devLog.tags.map((tag) => (
            <span
              key={tag}
              className="text-meta-uppercase rounded-full bg-muted px-2.5 py-1 text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <Heart className="size-4" />
            <span className="text-meta">
              12
            </span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <MessageCircle className="size-4" />
            <span className="text-meta">
              4
            </span>
          </button>
        </div>

        <Link
          href={`/devlogs/${devLog.id}`}
          className="text-action-label inline-flex items-center gap-2 transition-colors hover:text-primary"
        >
          View DevLog
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}