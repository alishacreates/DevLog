import Link from "next/link";

import { FeedList } from "@/features/feed/components/feed-list";
import { getFeed } from "@/features/feed/queries/get-feed";

export default async function FeedPage() {
  const { items, nextCursor } = await getFeed();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Feed
          </h1>

          <p className="mt-2 text-muted-foreground">
            See what developers are building.
          </p>
        </div>

        <Link
          href="/devlogs/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          New DevLog
        </Link>
      </div>

      {items.length === 0 ? (
        <section className="mt-12 rounded-xl border p-8 text-center">
          <h2 className="text-lg font-semibold">
            Nothing here yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Public DevLogs from the community will appear here.
          </p>

          <Link
            href="/devlogs/new"
            className="mt-5 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Publish the first DevLog
          </Link>
        </section>
      ) : (
        <div className="mt-8">
          <FeedList
            initialItems={items}
            initialCursor={nextCursor}
          />
        </div>
      )}
    </main>
  );
}