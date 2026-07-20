import { SectionHeader } from "@/components/shared/section-header";

export function LayoutRulesSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Spacing and shape"
        title="Layout rules"
        description="Consistency comes from repeating a small set of spacing and radius decisions."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-semibold">Container width</p>
          <p className="mt-3 font-mono text-xs text-primary">max-w-6xl</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Used for landing pages and major application layouts.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-semibold">Reading width</p>
          <p className="mt-3 font-mono text-xs text-primary">max-w-2xl</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Used for posts, editor content, explanations, and forms.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-semibold">Primary radius</p>
          <p className="mt-3 font-mono text-xs text-primary">rounded-xl</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Avoid excessive pill shapes and repeated oversized rounding.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <p className="text-sm font-semibold">Spacing scale</p>

        <div className="mt-6 flex flex-wrap items-end gap-6">
          {[2, 4, 6, 8, 10, 12, 16].map((size) => (
            <div key={size} className="text-center">
              <div
                className="mx-auto rounded-sm bg-primary"
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
    </section>
  );
}