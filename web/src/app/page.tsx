import Link from "next/link";
import {
  ArrowRight,
  Code2,
  GitCommitHorizontal,
  Heart,
  MessageCircle,
  MoveUpRight,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const heroUpdates = [
  {
    initials: "AM",
    name: "Alisha",
    username: "@alishacreates",
    time: "12m",
    project: "DevLog",
    text: "Finished the first landing-page direction today. It still needs refinement, but the product is starting to feel real.",
    tags: ["nextjs", "design"],
    likes: 18,
    comments: 5,
  },
  {
    initials: "RK",
    name: "Rohan",
    username: "@rohanbuilds",
    time: "34m",
    project: "OpenShelf",
    text: "Fixed an authentication redirect loop. The issue turned out to be one missing session check.",
    tags: ["auth", "debugging"],
    likes: 31,
    comments: 7,
  },
];

const communityUpdates = [
  {
    initials: "PS",
    name: "Priya",
    username: "@priyacodes",
    time: "1h",
    project: "Tiny Compiler",
    text: "The lexer now recognizes identifiers, numbers, and operators. It is a small milestone, but the project finally feels real.",
    tags: ["compiler", "cpp"],
    likes: 42,
    comments: 11,
  },
  {
    initials: "JD",
    name: "Jared",
    username: "@jaredbuilds",
    time: "3h",
    project: "Serverless DB",
    text: "Refactored the database schema for multitenancy. Next step is testing how it behaves under heavier workloads.",
    tags: ["database", "architecture"],
    likes: 55,
    comments: 12,
  },
  {
    initials: "MK",
    name: "Maya",
    username: "@mayamakes",
    time: "5h",
    project: "Focus Room",
    text: "Deployed the first usable version. It is missing half the features I imagined, but someone can finally use it.",
    tags: ["shipping", "typescript"],
    likes: 68,
    comments: 16,
  },
];

function UpdateItem({
  update,
  compact = false,
}: {
  update: (typeof heroUpdates)[number];
  compact?: boolean;
}) {
  return (
    <article
      className={cn(
        "group border-b border-border/80 transition-colors last:border-b-0 hover:bg-muted/20",
        compact ? "px-5 py-5" : "px-5 py-6 sm:px-6"
      )}
    >
      <div className="flex gap-3.5">
        <Avatar className="size-10 shrink-0 border border-border">
          <AvatarFallback className="bg-secondary text-xs font-semibold">
            {update.initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-sm font-semibold">{update.name}</span>

            <span className="text-xs text-muted-foreground">
              {update.username}
            </span>

            <span className="text-muted-foreground">·</span>

            <span className="font-mono text-[11px] text-muted-foreground">
              {update.time}
            </span>
          </div>

          <p
            className={cn(
              "mt-3 text-foreground/90",
              compact
                ? "text-sm leading-6"
                : "text-[15px] leading-6 sm:text-base sm:leading-7"
            )}
          >
            {update.text}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-primary/20 bg-primary/5 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-primary">
              {update.project}
            </span>

            {update.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground">
            <button
              type="button"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              aria-label={`Like update by ${update.name}`}
            >
              <Heart className="size-3.5" />
              <span>{update.likes}</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              aria-label={`Comment on update by ${update.name}`}
            >
              <MessageCircle className="size-3.5" />
              <span>{update.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
              <GitCommitHorizontal className="size-4.5" />
            </span>

            <span className="text-lg font-semibold tracking-tight">DevLog</span>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <Link
              href="#community"
              className="transition-colors hover:text-foreground"
            >
              Community
            </Link>

            <Link
              href="#why-devlog"
              className="transition-colors hover:text-foreground"
            >
              Why DevLog
            </Link>

            <Link
              href="#about"
              className="transition-colors hover:text-foreground"
            >
              About
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "hidden sm:inline-flex"
              )}
            >
              Sign in
            </Link>

            <Link
              href="/sign-up"
              className={buttonVariants({ size: "sm" })}
            >
              Join DevLog
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative border-b border-border/80">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,var(--color-primary),transparent_34%)] opacity-[0.07]" />

        <div className="relative mx-auto grid max-w-6xl gap-16 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="max-w-xl">
            <Badge
              variant="outline"
              className="rounded-md border-primary/25 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary"
            >
              Built for people who keep building
            </Badge>

            <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[72px]">
              Share the work{" "}
              <span className="block font-display font-normal italic tracking-[-0.035em] text-primary">
                behind the software.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              DevLog is where developers document progress, share unfinished
              work, and follow projects from the first commit to launch.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 px-6"
                )}
              >
                Share your first update
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="#community"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 px-6"
                )}
              >
                See what people are building
                <MoveUpRight className="size-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Code2 className="size-4 text-primary" />
                Real progress
              </span>

              <span className="flex items-center gap-2">
                <GitCommitHorizontal className="size-4 text-primary" />
                Living project history
              </span>

              <span className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                Useful encouragement
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-5 top-10 hidden w-40 border-l border-primary/30 pl-4 lg:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Live activity
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Developers sharing work while it is still in progress.
              </p>
            </div>

            <div className="relative ml-auto overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/15 lg:w-[88%]">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <p className="text-sm font-semibold">
                    What developers built today
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Small steps, honest updates, real momentum
                  </p>
                </div>

                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Live
                </span>
              </div>

              <div>
                {heroUpdates.map((update) => (
                  <UpdateItem
                    key={update.username}
                    update={update}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="community" className="border-b border-border/80">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                Inside the community
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Not polished success stories.
                <span className="mt-1 block font-display font-normal italic text-muted-foreground">
                  Actual building.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                Share the debugging sessions, unfinished features, experiments,
                mistakes, breakthroughs, and lessons that usually disappear
                between the first commit and the final launch.
              </p>

              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "mt-7"
                )}
              >
                Join the conversation
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="overflow-hidden border-y border-border bg-card/40">
              {communityUpdates.map((update) => (
                <UpdateItem key={update.username} update={update} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="why-devlog"
        className="border-b border-border/80 bg-card/20"
      >
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Why DevLog
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Progress becomes easier to continue{" "}
              <span className="font-display font-normal italic text-muted-foreground">
                when it is visible.
              </span>
            </h2>
          </div>

          <div className="mt-14 grid border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
            {[
              {
                number: "01",
                title: "Build",
                description:
                  "Work on the feature, experiment, fix the bug, or learn the unfamiliar tool.",
              },
              {
                number: "02",
                title: "Share",
                description:
                  "Post one honest update without waiting for the project to become impressive.",
              },
              {
                number: "03",
                title: "Return",
                description:
                  "Receive feedback, discover other builders, and come back with momentum.",
              },
            ].map((item) => (
              <div key={item.number} className="py-8 md:px-8 md:py-10">
                <span className="font-mono text-xs text-primary">
                  {item.number}
                </span>

                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-lg leading-8 text-foreground/80">
            Build something. Share the progress. Learn from the response.{" "}
            <span className="font-display italic text-primary">
              Build again.
            </span>
          </p>
        </div>
      </section>

      <section id="about">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 border-l-2 border-primary px-6 py-4 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                Start before it is perfect
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                What are you building today?
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                You do not need a finished product, a massive milestone, or a
                polished announcement. One useful update is enough to begin.
              </p>
            </div>

            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 px-6"
              )}
            >
              Create your DevLog
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-2.5">
            <GitCommitHorizontal className="size-4 text-primary" />
            <span className="font-semibold text-foreground">DevLog</span>
          </div>

          <p>Built for developers who keep showing up.</p>

          <p className="font-mono text-xs">© 2026 DevLog</p>
        </div>
      </footer>
    </main>
  );
}