
import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

import { colors } from "../data/colors";

export function ColorSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Color"
        title="Theme tokens"
        description="Brand colors define DevLog's identity. Semantic colors communicate state, allowing users to quickly distinguish actions, success, warnings, and errors."
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

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="h-2 rounded-full bg-primary" />

          <p className="mt-4 text-sm font-semibold">Brand</p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Primary actions, active navigation, links, focus rings, and DevLog
            identity.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="h-2 rounded-full bg-muted" />

          <p className="mt-4 text-sm font-semibold">Neutral</p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Backgrounds, cards, borders, inactive states, and supporting
            information.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="h-2 rounded-full bg-success" />

          <p className="mt-4 text-sm font-semibold">Success</p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Published, deployed, connected, completed, verified, and healthy
            states.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="h-2 rounded-full bg-destructive" />

          <p className="mt-4 text-sm font-semibold">Destructive</p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Errors, failed actions, deletions, dangerous operations, and
            critical warnings.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
        <p className="text-sm font-semibold">Design rule</p>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Use the{" "}
          <span className="font-medium text-primary">brand color</span> to guide
          attention. Use{" "}
          <span className="font-medium text-success">success</span> and{" "}
          <span className="font-medium text-destructive">destructive</span>{" "}
          only to communicate meaning, not as additional brand colors.
        </p>
      </div>
    </section>
  );
}