"use client";

import { useState, useTransition } from "react";

import { loadMoreFeed } from "@/features/feed/actions/load-more-feed";
import { DevLogCard } from "@/features/feed/components/devlog-card";
import type { FeedItem } from "@/features/feed/types/feed";

type FeedListProps = {
  initialItems: FeedItem[];
  initialCursor: string | null;
};

export function FeedList({
  initialItems,
  initialCursor,
}: FeedListProps) {
  const [items, setItems] = useState(initialItems);
  const [cursor, setCursor] = useState(initialCursor);
  const [isPending, startTransition] = useTransition();

  function handleLoadMore() {
    if (!cursor || isPending) {
      return;
    }

    startTransition(async () => {
      const result = await loadMoreFeed(cursor);

      setItems((currentItems) => [
        ...currentItems,
        ...result.items,
      ]);

      setCursor(result.nextCursor);
    });
  }

  return (
    <>
      <div className="space-y-4">
        {items.map((devLog) => (
          <DevLogCard
            key={devLog.id}
            devLog={devLog}
          />
        ))}
      </div>

      {cursor ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            disabled={isPending}
            onClick={handleLoadMore}
            className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Loading..." : "Load more"}
          </button>
        </div>
      ) : null}
    </>
  );
}