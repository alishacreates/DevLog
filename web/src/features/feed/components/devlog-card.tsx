import Image from "next/image";
import Link from "next/link";

import type { FeedItem } from "@/features/feed/types/feed";

type DevLogCardProps = {
  devLog: FeedItem;
};

export function DevLogCard({
  devLog,
}: DevLogCardProps) {
  return (
    <article className="rounded-xl border p-5">
      <div className="flex items-start gap-3">
        {devLog.author.image ? (
          <Image
            src={devLog.author.image}
            alt={devLog.author.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
            {devLog.author.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="font-medium">
              {devLog.author.name}
            </span>

            <span className="text-muted-foreground">
              @{devLog.author.username}
            </span>

            <span className="text-muted-foreground">
              ·
            </span>

            <span className="text-muted-foreground">
              {formatDate(devLog.createdAt)}
            </span>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Building{" "}
            <Link
              href={`/projects/${devLog.project.id}`}
              className="hover:text-foreground"
            >
              {devLog.project.title}
            </Link>
          </p>
        </div>
      </div>

      <Link
        href={`/devlogs/${devLog.id}`}
        className="mt-5 block"
      >
        <h2 className="text-lg font-semibold">
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
              className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      ) : null}
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