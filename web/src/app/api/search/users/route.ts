import { NextResponse } from "next/server";

import { searchUserSuggestions } from "@/features/search/queries/search-user-suggestions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 1) {
    return NextResponse.json([]);
  }

  const users = await searchUserSuggestions(query);

  return NextResponse.json(users);
}