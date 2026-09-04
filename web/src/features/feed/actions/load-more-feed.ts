"use server";

import { getFeed } from "@/features/feed/queries/get-feed";

export async function loadMoreFeed(cursor: string) {
  if (!cursor) {
    return {
      items: [],
      nextCursor: null,
    };
  }

  return getFeed(cursor);
}