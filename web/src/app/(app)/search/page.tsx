import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

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

  const users = q ? await searchUsers(q) : [];

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div>
        <p className="text-section-label text-primary">
          Discover
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
          Find developers
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Search by developer name or username.
        </p>
      </div>

      <form className="mt-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search developers..."
            className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary"
          />
        </div>
      </form>

      {!q ? (
        <section className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Search for a developer to get started.
          </p>
        </section>
      ) : users.length === 0 ? (
        <section className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="font-semibold">
            No developers found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Try another name or username.
          </p>
        </section>
      ) : (
        <section className="mt-8">
          <p className="text-meta-uppercase text-muted-foreground">
            {users.length} result{users.length === 1 ? "" : "s"}
          </p>

          <div className="mt-4 space-y-3">
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/u/${user.username}`}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={52}
                    height={52}
                    className="size-13 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-13 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold transition-colors group-hover:text-primary">
                      {user.name}
                    </h2>

                    <span className="text-meta text-muted-foreground">
                      @{user.username}
                    </span>
                  </div>

                  {user.bio ? (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {user.bio}
                    </p>
                  ) : null}

                  {user.techStack.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {user.techStack
                        .slice(0, 4)
                        .map((tech: string) => (
                          <span
                            key={tech}
                            className="text-meta rounded-full bg-muted px-2.5 py-1 text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}