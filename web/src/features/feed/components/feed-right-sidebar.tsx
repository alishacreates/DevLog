import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  FolderKanban,
  Search,
} from "lucide-react";

import { FollowButton } from "@/features/follows/components/follow-button";

type FeedRightSidebarProps = {
  developers: {
    id: string;
    name: string;
    username: string;
    image: string | null;
    techStack: string[];
  }[];
};

export function FeedRightSidebar({
  developers,
}: FeedRightSidebarProps) {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-28 space-y-5">
        {/* Suggested developers */}
        <section className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-section-label text-primary dark:text-accent-warm">
              Suggested Developers
            </p>
          </div>

          {developers.length > 0 ? (
            <div className="mt-4 space-y-4">
              {developers.map((developer) => (
                <div
                  key={developer.id}
                  className="border-b border-border pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <Link
                      href={`/u/${developer.username}`}
                      className="shrink-0"
                    >
                      {developer.image ? (
                        <Image
                          src={developer.image}
                          alt={developer.name}
                          width={36}
                          height={36}
                          className="size-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary">
                          {developer.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/u/${developer.username}`}
                        className="block truncate text-sm font-semibold transition-colors hover:text-primary"
                      >
                        {developer.name}
                      </Link>

                      <p className="mt-0.5 truncate font-mono text-[9px] text-muted-foreground">
                        @{developer.username}
                      </p>
                    </div>
                  </div>

                  {developer.techStack.length > 0 ? (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {developer.techStack
                        .slice(0, 2)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-muted px-2 py-1 font-mono text-[8px] text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  ) : null}

                  <div className="mt-3">
                    <FollowButton
                      userId={developer.id}
                      initialFollowing={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              You&apos;re already connected with everyone we can suggest.
            </p>
          )}

          <Link
            href="/search"
            className="mt-4 inline-flex items-center gap-1.5 px-1 font-mono text-[9px] uppercase tracking-[0.1em] text-primary transition-colors hover:text-foreground dark:text-accent-warm"
          >
            Discover more
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
                  Browse projects
                </p>

                <p className="mt-0.5 text-[10px] leading-4 text-muted-foreground">
                  See what&apos;s being built
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