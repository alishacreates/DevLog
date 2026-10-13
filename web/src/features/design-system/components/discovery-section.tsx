import Link from "next/link";
import { Search, UserPlus } from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";

export function DiscoverySection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Discovery"
        title="Discovery should feel immediate."
        description="Search and recommendations should help developers find relevant people quickly without turning the interface into a directory."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Live search */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <p className="text-section-label text-primary dark:text-accent-warm">
            Live search
          </p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Suggestions appear while typing. Keep the list short and make every
            result easy to scan.
          </p>

          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <div className="w-full rounded-2xl border border-primary bg-background py-3.5 pl-11 pr-4 text-sm ring-2 ring-primary/10 dark:border-accent-warm">
              ali
            </div>

            <div className="mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <DeveloperResult
                initials="A"
                name="Alisha"
                username="alishacreates"
                meta="Next.js · Node.js · MongoDB"
              />

              <DeveloperResult
                initials="AM"
                name="Ali Malik"
                username="alibuilds"
                meta="React · TypeScript"
              />

              <DeveloperResult
                initials="AR"
                name="Alex Roy"
                username="alexcodes"
                meta="Backend · APIs"
                last
              />

              <div className="border-t border-border px-4 py-3 text-center">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-primary dark:text-accent-warm">
                  See all results for &quot;ali&quot;
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Suggested developers */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <p className="text-section-label text-primary dark:text-accent-warm">
            Suggested developers
          </p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Recommendations should prioritize useful connections and relevant
            technical context.
          </p>

          <div className="mt-6 space-y-4">
            <SuggestedDeveloper
              initials="PK"
              name="Priya Kapoor"
              username="priyacodes"
              stack={["React", "TypeScript"]}
            />

            <SuggestedDeveloper
              initials="RS"
              name="Rohan Shah"
              username="rohanbuilds"
              stack={["Node.js", "MongoDB"]}
            />

            <SuggestedDeveloper
              initials="MS"
              name="Maya Singh"
              username="mayamakes"
              stack={["Next.js", "UI"]}
            />
          </div>

          <Link
            href="#"
            className="mt-5 inline-flex font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-primary transition-colors hover:text-foreground dark:text-accent-warm"
          >
            Discover more
          </Link>
        </section>
      </div>

      {/* Rules */}
      <div className="mt-10 grid gap-6 border-t border-border pt-8 md:grid-cols-3">
        <DiscoveryRule
          title="Search early"
          text="Live suggestions can begin from the first character when the result set is small enough to remain useful."
        />

        <DiscoveryRule
          title="Keep it compact"
          text="Autocomplete should show only a small set of likely matches before offering the full results page."
        />

        <DiscoveryRule
          title="Show context"
          text="Names and usernames come first. Bio or technology context helps users identify the right developer."
        />
      </div>
    </section>
  );
}

function DeveloperResult({
  initials,
  name,
  username,
  meta,
  last = false,
}: {
  initials: string;
  name: string;
  username: string;
  meta: string;
  last?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center gap-3 px-4 py-3",
        last ? "" : "border-b border-border",
      ].join(" ")}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary dark:bg-accent-warm/10 dark:text-accent-warm">
        {initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <p className="text-sm font-semibold">
            {name}
          </p>

          <p className="font-mono text-[9px] text-muted-foreground">
            @{username}
          </p>
        </div>

        <p className="mt-1 truncate font-mono text-[9px] text-muted-foreground">
          {meta}
        </p>
      </div>
    </div>
  );
}

function SuggestedDeveloper({
  initials,
  name,
  username,
  stack,
}: {
  initials: string;
  name: string;
  username: string;
  stack: string[];
}) {
  return (
    <div className="border-b border-border pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary dark:bg-accent-warm/10 dark:text-accent-warm">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {name}
          </p>

          <p className="mt-0.5 truncate font-mono text-[9px] text-muted-foreground">
            @{username}
          </p>
        </div>

        <button
          type="button"
          aria-label={`Follow ${name}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.08em] transition-colors hover:border-primary hover:text-primary dark:hover:border-accent-warm dark:hover:text-accent-warm"
        >
          <UserPlus className="size-3" />
          Follow
        </button>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5 pl-12">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-muted px-2 py-1 font-mono text-[8px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function DiscoveryRule({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div>
      <p className="font-section text-xs font-bold uppercase tracking-[0.12em] text-primary dark:text-accent-warm">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}