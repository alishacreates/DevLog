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
    <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <div className="grid gap-7 xl:grid-cols-[240px_minmax(0,760px)_240px] xl:justify-center">
        {/* Left sidebar */}
        <FeedLeftSidebar
          user={session!.user}
          projects={serializedProjects}
        />

        {/* Main feed */}
        <section className="min-w-0">
          <div className="mb-5">
            <p className="text-section-label text-primary dark:text-accent-warm">
              Community Feed
            </p>

            <h1 className="mt-1.5 text-2xl font-semibold tracking-[-0.03em] sm:text-[28px]">
              See what developers are building.
            </h1>
          </div>

          <FeedComposer />

          {items.length === 0 ? (
            <section className="mt-5 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <p className="text-section-label text-primary dark:text-accent-warm">
                Feed empty
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                Nothing here yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Public posts from developers in the community will appear here.
              </p>

              <Link
                href="/devlogs/new"
                className="mt-5 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 dark:bg-accent-warm dark:text-[#101513]"
              >
                Publish Post
              </Link>
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

        {/* Right sidebar */}
        <FeedRightSidebar />
      </div>
    </main>
  );
}