import Link from "next/link";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db/mongoose";
import { Project } from "@/models/project";
import { FeedComposer } from "@/features/feed/components/feed-composer";
import { FeedLeftSidebar } from "@/features/feed/components/feed-left-sidebar";
import { FeedList } from "@/features/feed/components/feed-list";
import { FeedRightSidebar } from "@/features/feed/components/feed-right-sidebar";
import { getFeed } from "@/features/feed/queries/get-feed";

export default async function FeedPage() {
  const session = await auth();

  await connectDB();

const [projects, feed] = await Promise.all([
  Project.find({
    owner: session!.user.id,
  })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean(),

  getFeed(undefined, session!.user.id),
]);

const { items, nextCursor } = feed;

  const serializedProjects = projects.map((project) => ({
    id: project._id.toString(),
    title: project.title,
  }));
return (
  <main className="mx-auto w-full max-w-[1440px] px-6 py-8 lg:px-10">
    <div className="grid gap-7 xl:grid-cols-[240px_minmax(0,760px)_240px] xl:justify-center">
      <FeedLeftSidebar
        user={session!.user}
        projects={serializedProjects}
      />

      <section className="min-w-0">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-section-label text-primary">
              Community Feed
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
              See what developers are building.
            </h1>
          </div>

          <Link
            href="/devlogs/new"
            className="text-action-label hidden rounded-full bg-primary px-4 py-2 text-primary-foreground sm:inline-flex"
          >
            New DevLog
          </Link>
        </div>

        <FeedComposer />

        {items.length === 0 ? (
          <section className="mt-5 rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="text-lg font-semibold">
              Nothing here yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Public DevLogs from the community will appear here.
            </p>
          </section>
        ) : (
          <div className="mt-5">
            <FeedList
              initialItems={items}
              initialCursor={nextCursor}
            />
          </div>
        )}
      </section>

      <FeedRightSidebar />
    </div>
  </main>
);
}