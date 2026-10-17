"use server";

import { auth } from "@/auth";
import { getFeed } from "@/features/feed/queries/get-feed";

export async function loadMoreFeed(cursor: string) {
  if (!cursor) {
    return {
      items: [],
      nextCursor: null,
    };
  }

  const session = await auth();

  if (!session?.user?.id) {
    return {
      items: [],
      nextCursor: null,
    };
  }

  return getFeed(cursor, session.user.id);
}