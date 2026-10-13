"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

type SuggestedUser = {
  id: string;
  name: string;
  username: string;
  image: string;
  bio: string;
  techStack: string[];
};

type LiveUserSearchProps = {
  initialQuery?: string;
};

export function LiveUserSearch({
  initialQuery = "",
}: LiveUserSearchProps) {
  const [query, setQuery] =
    useState(initialQuery);

  const [users, setUsers] =
    useState<SuggestedUser[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [focused, setFocused] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < 1) {
      return;
    }

    const controller =
      new AbortController();

    const timeout = setTimeout(
      async () => {
        try {
          setLoading(true);

          const response = await fetch(
            `/api/search/users?q=${encodeURIComponent(
              trimmed,
            )}`,
            {
              signal: controller.signal,
            },
          );

          if (!response.ok) {
            throw new Error(
              "Search failed",
            );
          }

          const data =
            (await response.json()) as SuggestedUser[];

          setUsers(data);
        } catch (error) {
          if (
            error instanceof DOMException &&
            error.name === "AbortError"
          ) {
            return;
          }

          setUsers([]);
        } finally {
          if (
            !controller.signal.aborted
          ) {
            setLoading(false);
          }
        }
      },
      250,
    );

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent,
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
      ) {
        setFocused(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  function handleQueryChange(
    value: string,
  ) {
    setQuery(value);

    if (value.trim().length < 1) {
      setUsers([]);
      setLoading(false);
      return;
    }

    // Prevent old results from flashing
    // while the new query is debouncing.
    setLoading(true);
  }

  const showDropdown =
    focused && query.trim().length >= 1;

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <form action="/search">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            name="q"
            type="search"
            value={query}
            onChange={(event) =>
              handleQueryChange(
                event.target.value,
              )
            }
            onFocus={() =>
              setFocused(true)
            }
            placeholder="Search by name or username..."
            autoComplete="off"
            className="
              w-full rounded-2xl
              border border-border
              bg-card py-3.5 pl-11 pr-4
              text-sm outline-none
              transition-colors
              placeholder:text-muted-foreground/60
              focus:border-primary
              focus:ring-2
              focus:ring-primary/10
              dark:focus:border-accent-warm
            "
          />
        </div>
      </form>

      {showDropdown ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          {loading ? (
            <div className="px-4 py-5">
              <p className="text-sm text-muted-foreground">
                Searching...
              </p>
            </div>
          ) : users.length > 0 ? (
            <>
              {users.map((user) => (
                <Link
                  key={user.id}
                  href={`/u/${user.username}`}
                  onClick={() =>
                    setFocused(false)
                  }
                  className="
                    group flex items-center gap-3
                    border-b border-border
                    px-4 py-3
                    transition-colors
                    last:border-b-0
                    hover:bg-muted/50
                  "
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={42}
                      height={42}
                      className="size-10 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary dark:bg-accent-warm/10 dark:text-accent-warm">
                      {user.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold transition-colors group-hover:text-primary dark:group-hover:text-accent-warm">
                        {user.name}
                      </p>

                      <p className="truncate font-mono text-[9px] text-muted-foreground">
                        @{user.username}
                      </p>
                    </div>

                    {user.bio ? (
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {user.bio}
                      </p>
                    ) : user.techStack
                        .length > 0 ? (
                      <p className="mt-1 truncate font-mono text-[9px] text-muted-foreground">
                        {user.techStack
                          .slice(0, 3)
                          .join(" · ")}
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}

              <Link
                href={`/search?q=${encodeURIComponent(
                  query.trim(),
                )}`}
                onClick={() =>
                  setFocused(false)
                }
                className="
                  flex items-center
                  justify-center
                  px-4 py-3
                  font-mono text-[9px]
                  font-semibold uppercase
                  tracking-[0.1em]
                  text-primary
                  transition-colors
                  hover:bg-muted/50
                  dark:text-accent-warm
                "
              >
                See all results for
                &quot;{query.trim()}&quot;
              </Link>
            </>
          ) : (
            <div className="px-4 py-5 text-center">
              <p className="text-sm font-medium">
                No developers found
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Try another name or
                username.
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}