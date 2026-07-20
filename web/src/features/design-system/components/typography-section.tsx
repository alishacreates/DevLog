import { SectionHeader } from "@/components/shared/section-header";
import { Separator } from "@/components/ui/separator";

export function TypographySection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Typography"
        title="Type hierarchy"
        description="Manrope handles interface text, Newsreader adds selective editorial character, and IBM Plex Mono carries technical metadata."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-8 border-l-2 border-primary pl-6 sm:pl-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Display / 64
            </p>
            <p className="mt-3 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
              Share the work{" "}
              <span className="font-display font-normal italic text-primary">
                behind the software.
              </span>
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Heading / 36
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              What are developers building today?
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Body / 16
            </p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              DevLog gives developers a place to document progress, share
              unfinished work, and follow projects from the first commit to
              launch.
            </p>
          </div>
        </div>

        <div className="space-y-5 rounded-xl border border-border bg-card p-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              Mono metadata
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              @alishacreates · 12m · #nextjs
            </p>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-semibold">Interface label</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Used for navigation, buttons, forms, and actions.
            </p>
          </div>

          <Separator />

          <div>
            <p className="font-display text-2xl italic text-primary">
              Actual building.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Editorial font should be used sparingly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}