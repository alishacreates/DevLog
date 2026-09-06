import Link from "next/link";
import { ArrowUpRight, Plus, Trash2 } from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";

export function ActionsSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Actions"
        title="Actions should feel deliberate."
        description="DevLog uses bold pill actions, restrained outlines, and compact circular controls instead of generic SaaS buttons."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Primary hierarchy */}
        <div className="border border-border bg-card p-6">
          <p className="font-section text-sm font-bold uppercase tracking-widest">
            Primary hierarchy
          </p>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Primary actions are high-contrast. Secondary actions stay quieter.
            Destructive actions keep their semantic red treatment.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 font-section text-xs font-bold uppercase tracking-widest text-background transition-all hover:bg-primary hover:text-white active:scale-[0.98]"
            >
              <Plus className="size-4" />
              Share update
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-full border border-foreground/45 px-6 py-3 font-section text-xs font-bold uppercase tracking-widest transition-all hover:border-primary hover:text-primary active:scale-[0.98]"
            >
              Explore builders
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-full bg-secondary px-6 py-3 font-section text-xs font-bold uppercase tracking-widest text-secondary-foreground transition-all hover:bg-secondary/70 active:scale-[0.98]"
            >
              Save draft
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-full px-5 py-3 font-section text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancel
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-full bg-destructive px-6 py-3 font-section text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <Trash2 className="size-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Navigation + compact actions */}
        <div className="border border-border bg-card p-6">
          <p className="font-section text-sm font-bold uppercase tracking-widest">
            Navigation actions
          </p>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Links can use the same visual grammar when they represent actions
            rather than simple navigation.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="#"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 font-section text-xs font-bold uppercase tracking-widest text-background transition-all hover:bg-primary hover:text-white"
            >
              Join DevLog

              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="#"
              className="inline-flex items-center gap-3 rounded-full border border-foreground/45 px-6 py-3 font-section text-xs font-bold uppercase tracking-widest transition-all hover:border-primary hover:text-primary"
            >
              View profile
            </Link>

            <Link
              href="#"
              className="font-section text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              Learn more →
            </Link>

            <Link
              href="#"
              aria-label="Open project"
              className="group flex size-12 items-center justify-center rounded-full border border-foreground/45 transition-all hover:border-primary hover:bg-primary hover:text-white"
            >
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Usage rule */}
      <div className="mt-8 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
        <ActionRule
          label="Primary"
          rule="One dominant action per decision area."
        />

        <ActionRule
          label="Secondary"
          rule="Use outlines when the action should remain visible but quieter."
        />

        <ActionRule
          label="Compact"
          rule="Circular arrows are for opening, exploring, or moving forward."
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
      <p className="font-section text-xs font-bold uppercase tracking-[0.12em] text-primary">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {rule}
      </p>
    </div>
  );
}