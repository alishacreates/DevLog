"use server";

import { getComments } from "@/features/comments/queries/get-comments";

export async function loadComments(devLogId: string) {
  return getComments(devLogId);
}