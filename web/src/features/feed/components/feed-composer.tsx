import Link from "next/link";
import { PenLine, Plus } from "lucide-react";

export function FeedComposer() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground dark:bg-accent-warm dark:text-[#101513]">
          <PenLine className="size-4" />
        </div>

        <Link
          href="/devlogs/new"
          className="flex-1 rounded-full bg-muted px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted/70"
        >
          What did you build today?
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
          Log progress. Keep building.
        </p>

        <Link
          href="/devlogs/new"
          className="
            inline-flex items-center gap-2 rounded-full
            bg-primary px-4 py-2
            font-section text-[9px] font-bold uppercase tracking-widest
            text-primary-foreground
            transition-all
            hover:-translate-y-0.5 hover:shadow-sm
            dark:bg-accent-warm dark:text-[#101513]
          "
        >
          <Plus className="size-3.5" />
          New Post
        </Link>
      </div>
    </section>
  );
}