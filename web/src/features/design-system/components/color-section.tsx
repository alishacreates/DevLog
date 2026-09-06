import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

import { colors } from "../data/colors";

export function ColorSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Color"
        title="Color should guide attention."
        description="DevLog uses a warm neutral foundation, deep ink, and a restrained teal brand accent. Semantic colors communicate state without competing with the identity."
      />

      {/* Token swatches */}
      <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {colors.map((color) => (
          <div
            key={color.name}
            className={cn(
              "flex min-h-36 flex-col justify-between p-5",
              color.className
            )}
          >
            <span className="font-section text-sm font-bold uppercase tracking-widest">
              {color.name}
            </span>

            <span className="font-mono text-[10px] opacity-65">
              {color.variable}
            </span>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div className="mt-10 grid border-y border-border md:grid-cols-4 md:divide-x md:divide-border">
        <ColorUsage
          label="Brand"
          tone="bg-primary"
          description="Primary actions, active states, links, focus, motion accents, and DevLog identity."
        />

        <ColorUsage
          label="Neutral"
          tone="bg-muted"
          description="Page foundations, surfaces, borders, quiet states, and supporting information."
        />

        <ColorUsage
          label="Success"
          tone="bg-success"
          description="Published, deployed, connected, completed, verified, and healthy states."
        />

        <ColorUsage
          label="Destructive"
          tone="bg-destructive"
          description="Errors, deletions, failed actions, dangerous operations, and critical warnings."
        />
      </div>

      {/* Brand emphasis */}
      <div className="mt-10 grid gap-8 border-l-2 border-primary bg-primary/[0.04] px-6 py-7 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div>
          <p className="font-section text-base font-bold uppercase tracking-[0.12em] text-primary">
            Brand rule
          </p>
        </div>

        <div>
          <p className="max-w-3xl text-xl leading-8 tracking-[-0.02em]">
            Teal is an accent, not a wallpaper.
          </p>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Use the brand color to guide attention and create recognition.
            Success and destructive colors should only appear when they carry
            semantic meaning.
          </p>
        </div>
      </div>
    </section>
  );
}

function ColorUsage({
  label,
  tone,
  description,
}: {
  label: string;
  tone: string;
  description: string;
}) {
  return (
    <div className="py-8 md:px-6">
      <div className={cn("h-1.5 w-12", tone)} />

      <p className="mt-5 font-section text-sm font-bold uppercase tracking-widest">
        {label}
      </p>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}