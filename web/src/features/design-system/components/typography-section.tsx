import { SectionHeader } from "@/components/shared/section-header";
import { Separator } from "@/components/ui/separator";

export function TypographySection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Typography"
        title="Type has a job."
        description="Anton carries DevLog's bold editorial voice, Manrope handles readable interface text, IBM Plex Mono supports technical metadata, and Source Code Pro marks sections and actions."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Main hierarchy */}
        <div className="space-y-10 border-l-2 border-primary pl-6 sm:pl-8">
          <div>
            <p className="font-section text-sm font-bold uppercase tracking-[0.12em] text-primary">
              Display / Anton
            </p>

            <p className="landing-display mt-4 text-[clamp(4.5rem,8vw,8rem)] uppercase leading-[0.8] tracking-[-0.02em]">
              Build in
              <span className="block text-primary">
                motion.
              </span>
            </p>
          </div>

          <div>
            <p className="font-section text-sm font-bold uppercase tracking-[0.12em] text-primary">
              Heading / Manrope
            </p>

            <p className="mt-4 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
              Projects show what you built.
              <span className="block text-muted-foreground">
                DevLog Posts show how you got there.
              </span>
            </p>
          </div>

          <div>
            <p className="font-section text-sm font-bold uppercase tracking-[0.12em] text-primary">
              Body / Manrope
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              DevLog gives developers a place to document progress, share
              unfinished work, and follow projects from the first commit to
              launch.
            </p>
          </div>
        </div>

        {/* Supporting type roles */}
        <div className="border border-border bg-card p-6">
          <div>
            <p className="font-section text-sm font-bold uppercase tracking-[0.12em] text-primary">
              Section marker
            </p>

            <p className="mt-3 font-section text-lg font-bold uppercase tracking-[0.12em]">
              02 / Community
            </p>

            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Source Code Pro is used for numbered chapters, action labels, and
              editorial markers.
            </p>
          </div>

          <Separator className="my-6" />

          <div>
            <p className="font-section text-sm font-bold uppercase tracking-[0.12em] text-primary">
              Technical metadata
            </p>

            <p className="mt-3 font-mono text-xs text-muted-foreground">
              @alishacreates · 12m · #nextjs
            </p>

            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              IBM Plex Mono is reserved for timestamps, tags, IDs, code-adjacent
              labels, and technical context.
            </p>
          </div>

          <Separator className="my-6" />

          <div>
            <p className="font-section text-sm font-bold uppercase tracking-[0.12em] text-primary">
              Interface
            </p>

            <p className="mt-3 text-sm font-semibold">
              Share update
            </p>

            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Manrope stays readable across navigation, forms, buttons, cards,
              and product UI.
            </p>
          </div>
        </div>
      </div>

      {/* Rule */}
      <div className="mt-10 grid gap-8 border-t border-border pt-8 lg:grid-cols-[0.7fr_1.3fr]">
        <p className="font-section text-base font-bold uppercase tracking-[0.12em] text-primary">
          Type rule
        </p>

        <p className="max-w-3xl text-xl leading-8 tracking-[-0.02em]">
          Display type creates identity.
          <span className="text-muted-foreground">
            {" "}
            Interface type creates clarity.
          </span>
        </p>
      </div>
    </section>
  );
}