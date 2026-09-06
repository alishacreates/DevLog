import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const blockedRoutes = [
  "/feed",
  "/projects",
  "/devlogs",
  "/onboarding",
  "/profile",
  "/sign-in",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const shouldBlock = blockedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (shouldBlock) {
    return NextResponse.redirect(new URL("/coming-soon", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/feed/:path*",
    "/projects/:path*",
    "/devlogs/:path*",
    "/onboarding/:path*",
    "/profile/:path*",
    "/sign-in/:path*",
  ],
};