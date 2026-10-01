import Image from "next/image";
import Link from "next/link";
import {
  UsersRound,
} from "lucide-react";
import { LiveUserSearch } from "@/features/search/components/live-user-search";
import { searchUsers } from "@/features/search/queries/search-users";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q = "" } = await searchParams;

  const query = q.trim();
  const users = query ? await searchUsers(query) : [];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Header */}
      <div>
        <p className="text-section-label text-primary dark:text-accent-warm">
          Discover
        </p>

        <h1 className="mt-1.5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          Find developers
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Find people building on DevLog by searching their name or username.
        </p>
      </div>

      {/* Search */}
      <div className="mt-7">
  <LiveUserSearch initialQuery={query} />
</div>
      {/* No search yet */}
      {!query ? (
        <section className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8 text-center sm:p-10">
          <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-accent-warm/10 dark:text-accent-warm">
            <UsersRound className="size-5" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            Discover developers
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Search for someone by their name or DevLog username.
          </p>
        </section>
      ) : users.length === 0 ? (
        /* No results */
        <section className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8 text-center sm:p-10">
          {/* <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Search className="size-5" />
          </div> */}

          <h2 className="mt-4 text-lg font-semibold">
            No developers found
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            We couldn&apos;t find anyone matching{" "}
            <span className="font-medium text-foreground">
              &quot;{query}&quot;
            </span>
            . Try another name or username.
          </p>
        </section>
      ) : (
        /* Results */
        <section className="mt-8">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {users.length} developer
              {users.length === 1 ? "" : "s"} found
            </p>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
            {users.map((user, index) => (
              <Link
                key={user.id}
                href={`/u/${user.username}`}
                className={`
                  group flex items-start gap-4
                  p-4 transition-colors
                  hover:bg-muted/40
                  sm:p-5
                  ${
                    index !== users.length - 1
                      ? "border-b border-border"
                      : ""
                  }
                `}
              >
                {/* Avatar */}
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={52}
                    height={52}
                    className="size-12 shrink-0 rounded-full object-cover sm:size-13"
                  />
                ) : (
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary dark:bg-accent-warm/10 dark:text-accent-warm sm:size-13">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* User information */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <h2 className="truncate text-sm font-semibold transition-colors group-hover:text-primary dark:group-hover:text-accent-warm">
                      {user.name}
                    </h2>

                    <span className="truncate font-mono text-[10px] text-muted-foreground">
                      @{user.username}
                    </span>
                  </div>

                  {user.bio ? (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {user.bio}
                    </p>
                  ) : null}

                  {user.techStack.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {user.techStack
                        .slice(0, 4)
                        .map((tech: string) => (
                          <span
                            key={tech}
                            className="rounded-full bg-muted px-2.5 py-1 font-mono text-[8px] text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  ) : null}
                </div>

                {/* Desktop action */}
                <span className="hidden shrink-0 self-center font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground transition-colors group-hover:text-primary dark:group-hover:text-accent-warm sm:block">
                  View profile
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}