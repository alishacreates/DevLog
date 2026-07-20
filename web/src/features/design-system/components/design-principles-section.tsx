import { SectionHeader } from "@/components/shared/section-header";
import { designPrinciples } from "../data/design-principles";

export function DesignPrinciplesSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Foundations"
        title="Design principles"
        description="Every interface decision should reinforce these four principles."
      />

      <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {designPrinciples.map((item) => (
          <div key={item.number} className="bg-background p-6">
            <span className="font-mono text-xs text-primary">
              {item.number}
            </span>

            <h3 className="mt-5 text-base font-semibold">{item.title}</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}