import { SectionHeader } from "@/components/shared/section-header";

export function LayoutRulesSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Spacing and shape"
        title="Layout rules"
        description="DevLog uses a small set of container, spacing, and radius patterns so the interface feels consistent across feed, posts, projects, and forms."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm font-semibold">
            App shell
          </p>

          <p className="mt-3 font-mono text-xs text-primary dark:text-accent-warm">
            max-w-[1440px]
          </p>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Used for wide application layouts such as the community feed with
            supporting sidebars.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm font-semibold">
            Focused content
          </p>

          <p className="mt-3 font-mono text-xs text-primary dark:text-accent-warm">
            max-w-3xl / max-w-4xl
          </p>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Used for post detail, forms, project detail, and other focused
            reading experiences.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm font-semibold">
            Surface radius
          </p>

          <p className="mt-3 font-mono text-xs text-primary dark:text-accent-warm">
            rounded-2xl
          </p>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Primary content surfaces use generous, consistent rounding. Feature
            cards may use slightly larger custom radii.
          </p>
        </div>
      </div>

      {/* Shape rules */}
      <div className="mt-8 grid gap-6 border-y border-border py-8 md:grid-cols-3">
        <LayoutRule
          title="Content surfaces"
          rule="Use rounded-2xl for cards, grouped form sections, empty states, and major content containers."
        />

        <LayoutRule
          title="Pill controls"
          rule="Use rounded-full for compact actions, status, tags, filters, and primary creation buttons."
        />

        <LayoutRule
          title="Large feature cards"
          rule="Use larger radii such as rounded-[26px] or rounded-[28px] only when the component needs stronger visual presence."
        />
      </div>

      {/* Spacing */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <p className="text-sm font-semibold">
          Spacing scale
        </p>

        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Prefer the existing Tailwind spacing scale and repeat common gaps
          instead of introducing arbitrary spacing values.
        </p>

        <div className="mt-6 flex flex-wrap items-end gap-6">
          {[2, 3, 4, 5, 6, 8, 10, 12].map((size) => (
            <div
              key={size}
              className="text-center"
            >
              <div
                className="mx-auto rounded-sm bg-primary dark:bg-accent-warm"
                style={{
                  width: `${size * 4}px`,
                  height: `${size * 4}px`,
                }}
              />

              <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Layout principle */}
      <div className="mt-10 grid gap-8 border-l-2 border-primary bg-primary/[0.04] px-6 py-7 dark:border-accent-warm dark:bg-accent-warm/[0.04] lg:grid-cols-[0.7fr_1.3fr]">
        <p className="font-section text-base font-bold uppercase tracking-[0.12em] text-primary dark:text-accent-warm">
          Layout rule
        </p>

        <p className="max-w-3xl text-xl leading-8 tracking-[-0.02em]">
          Use rounded surfaces for content.
          <span className="text-muted-foreground">
            {" "}
            Reserve pills for compact controls and actions.
          </span>
        </p>
      </div>
    </section>
  );
}

function LayoutRule({
  title,
  rule,
}: {
  title: string;
  rule: string;
}) {
  return (
    <div>
      <p className="font-section text-xs font-bold uppercase tracking-[0.12em] text-primary dark:text-accent-warm">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {rule}
      </p>
    </div>
  );
}