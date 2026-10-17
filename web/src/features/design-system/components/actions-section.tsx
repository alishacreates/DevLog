import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";

export function ActionsSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Actions"
        title="Actions should feel deliberate."
        description="DevLog uses clear pill actions, restrained secondary controls, and semantic destructive states."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Primary hierarchy */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="font-section text-sm font-bold uppercase tracking-widest">
            Action hierarchy
          </p>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Primary actions carry the strongest emphasis. Secondary actions stay
            visible without competing for attention.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="
                inline-flex items-center gap-2 rounded-full
                bg-primary px-5 py-2.5
                font-section text-[10px] font-bold uppercase tracking-widest
                text-primary-foreground
                transition-all
                hover:-translate-y-0.5 hover:shadow-sm
                dark:bg-accent-warm dark:text-[#101513]
              "
            >
              <Plus className="size-3.5" />
              New Post
            </button>

            <button
              type="button"
              className="
                rounded-full border border-border
                px-5 py-2.5 text-sm font-medium
                transition-colors hover:bg-muted
              "
            >
              View profile
            </button>

            <button
              type="button"
              className="
                rounded-full px-5 py-2.5
                text-sm font-medium text-muted-foreground
                transition-colors hover:text-foreground
              "
            >
              Cancel
            </button>

            <button
              type="button"
              className="
                inline-flex items-center gap-2 rounded-full
                bg-destructive px-5 py-2.5
                text-sm font-semibold text-white
                transition-opacity hover:opacity-90
              "
            >
              <Trash2 className="size-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Navigation actions */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="font-section text-sm font-bold uppercase tracking-widest">
            Navigation actions
          </p>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Navigation should remain explicit. Use text labels when an icon alone
            would make the destination unclear.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="#"
              className="
                rounded-full border border-border
                px-5 py-2.5 text-sm font-medium
                transition-colors
                hover:border-primary hover:text-primary
                dark:hover:border-accent-warm
                dark:hover:text-accent-warm
              "
            >
              View Project
            </Link>

            <Link
              href="#"
              className="
                font-mono text-[9px] font-semibold uppercase tracking-[0.1em]
                text-primary transition-colors hover:text-foreground
                dark:text-accent-warm
              "
            >
              Discover developers
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
        <ActionRule
          label="Primary"
          rule="Use one dominant action per decision area."
        />

        <ActionRule
          label="Secondary"
          rule="Use borders or quieter text when an action should remain available without competing."
        />

        <ActionRule
          label="Icon only"
          rule="Use icon-only controls only when the meaning is familiar and an accessible label is provided."
        />
      </div>
    </section>
  );
}

function ActionRule({
  label,
  rule,
}: {
  label: string;
  rule: string;
}) {
  return (
    <div>
      <p className="font-section text-xs font-bold uppercase tracking-[0.12em] text-primary dark:text-accent-warm">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {rule}
      </p>
    </div>
  );
}