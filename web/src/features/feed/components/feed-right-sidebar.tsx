import Link from "next/link";

export function FeedRightSidebar() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-28 space-y-5">
        <section className="rounded-2xl border border-border bg-card p-5">
          <p className="font-section text-[10px] font-bold uppercase tracking-widest">
            Build Prompt
          </p>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            What changed in your project since your last DevLog?
          </p>

          <Link
            href="/devlogs/new"
            className="mt-5 inline-flex font-mono text-[9px] uppercase tracking-[0.08em] text-primary hover:underline"
          >
            Write an update →
          </Link>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <p className="font-section text-[10px] font-bold uppercase tracking-widest">
            Coming Next
          </p>

          <div className="mt-4 space-y-3 font-mono text-[10px] text-muted-foreground">
            <p>Likes</p>
            <p>Comments</p>
            <p>Follow developers</p>
            <p>Developer search</p>
          </div>
        </section>
      </div>
    </aside>
  );
}