import { Badge } from "@/components/ui/badge";

export function DesignHero() {
  return (
    <section className="border-b border-border pb-16 pt-16 sm:pt-20">
      <Badge
        variant="outline"
        className="rounded-md border-primary/25 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary"
      >
        DevLog visual language
      </Badge>

      <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
        Designed for the work{" "}
        <span className="font-display font-normal italic tracking-[-0.035em] text-primary">
          behind the software.
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
        A calm, social, developer-first interface built around honest
        progress, useful interaction, and readable content.
      </p>
    </section>
  );
}