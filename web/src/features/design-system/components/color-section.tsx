import { SectionHeader } from "@/components/shared/section-header";
import { colors } from "../data/colors";
import { cn } from "@/lib/utils";

export function ColorSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Color"
        title="Theme tokens"
        description="The interface remains primarily neutral. Brand color is reserved for actions, focus, active states, and important details."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {colors.map((color) => (
          <div
            key={color.name}
            className={cn(
              "flex min-h-32 flex-col justify-between rounded-xl p-5",
              color.className
            )}
          >
            <span className="text-sm font-semibold">{color.name}</span>

            <span className="font-mono text-[10px] opacity-70">
              {color.variable}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="h-2 rounded-full bg-primary" />
          <p className="mt-4 text-sm font-semibold">Primary usage</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Main actions, active navigation, focus rings, links, and product
            identity.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="h-2 rounded-full bg-muted" />
          <p className="mt-4 text-sm font-semibold">Neutral usage</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Surfaces, inactive states, subtle grouping, and quiet supporting
            content.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="h-2 rounded-full bg-destructive" />
          <p className="mt-4 text-sm font-semibold">Semantic usage</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Reserve destructive colors for errors, removals, and critical
            actions.
          </p>
        </div>
      </div>
    </section>
  );
}