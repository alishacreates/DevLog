import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "@/components/shared/section-header";

export function SystemStatesSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Loading and empty states"
        title="System states"
        description="Every screen should account for waiting, absence, success, and failure."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-semibold">Loading update</p>

          <div className="mt-6 flex gap-4">
            <Skeleton className="size-10 rounded-full" />

            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-8 w-28" />
            </div>
          </div>
        </div>

        <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 text-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="size-5" />
          </span>

          <p className="mt-4 text-sm font-semibold">No updates yet</p>

          <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
            Share the first step, lesson, or small win from your project.
          </p>

          <Button className="mt-5" size="sm">
            <Plus className="size-4" />
            Share update
          </Button>
        </div>
      </div>
    </section>
  );
}