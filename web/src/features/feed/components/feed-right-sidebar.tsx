import Link from "next/link";
import {
  ArrowUpRight,
  FolderKanban,
  PenLine,
  Search,
} from "lucide-react";

export function FeedRightSidebar() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-28 space-y-5">
        {/* Build prompt */}
        <section className="rounded-2xl border border-border bg-card p-5">
          <p className="text-section-label text-primary dark:text-accent-warm">
            Build Prompt
          </p>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            What changed in your project since your last post?
          </p>

          <Link
            href="/devlogs/new"
            className="mt-5 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-primary transition-colors hover:text-foreground dark:text-accent-warm"
          >
            Write an update
            <ArrowUpRight className="size-3" />
          </Link>
        </section>

        {/* Explore */}
        <section className="rounded-2xl border border-border bg-card p-4">
          <p className="px-1 text-section-label text-primary dark:text-accent-warm">
            Explore DevLog
          </p>

          <div className="mt-3 space-y-1">
            <Link
              href="/search"
              className="group flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-muted/60"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <Search className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium">
                  Find developers
                </p>

                <p className="mt-0.5 text-[10px] leading-4 text-muted-foreground">
                  Discover builders
                </p>
              </div>
            </Link>

            <Link
              href="/projects"
              className="group flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-muted/60"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <FolderKanban className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium">
                  Your projects
                </p>

                <p className="mt-0.5 text-[10px] leading-4 text-muted-foreground">
                  Keep building
                </p>
              </div>
            </Link>

            <Link
              href="/devlogs/new"
              className="group flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-muted/60"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <PenLine className="size-4 text-muted-foreground transition-colors group-hover:text-primary dark:group-hover:text-accent-warm" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium">
                  Share progress
                </p>

                <p className="mt-0.5 text-[10px] leading-4 text-muted-foreground">
                  Publish Post
                </p>
              </div>
            </Link>
          </div>
        </section>

        <p className="px-2 text-center font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/50">
          Build · Document · Share · Repeat
        </p>
      </div>
    </aside>
  );
}