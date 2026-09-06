export function DesignHero() {
  return (
    <section className="border-b border-border pb-16 pt-16 sm:pb-20 sm:pt-20">
      {/* Marker */}
      <p className="font-section text-base font-bold uppercase tracking-[0.12em] text-primary sm:text-lg">
        DevLog / Visual System
      </p>

      {/* Identity */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <h1 className="landing-display text-[clamp(5rem,9vw,9rem)] uppercase leading-[0.78] tracking-[-0.02em]">
            Built for
            <span className="block text-primary">
              motion.
            </span>
          </h1>
        </div>

        <div className="max-w-md lg:pb-3">
          <p className="text-base leading-7 text-muted-foreground">
            The visual language behind DevLog — an editorial, developer-first
            system designed around progress, clarity, and work that is still
            taking shape.
          </p>

          <div className="mt-7 flex items-center gap-4">
            <span className="h-px w-10 bg-primary" />

            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
              Visual system / 2026
            </span>
          </div>
        </div>
      </div>

      {/* Visual language */}
      <div className="mt-16 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
        <SystemNote number="01" label="Editorial" />
        <SystemNote number="02" label="Technical" />
        <SystemNote number="03" label="Human" />
        <SystemNote number="04" label="In motion" />
      </div>
    </section>
  );
}

function SystemNote({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-border py-5 last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0 lg:border-l lg:first:border-l-0">
      <span className="font-section text-xs font-bold text-primary">
        {number}
      </span>

      <span className="font-section text-xs font-bold uppercase tracking-[0.12em]">
        {label}
      </span>
    </div>
  );
}