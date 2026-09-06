import { SectionHeader } from "@/components/shared/section-header";

import { designPrinciples } from "../data/design-principles";

export function DesignPrinciplesSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Foundations"
        title="Principles before pixels."
        description="The visual system can evolve. These principles should continue guiding how DevLog feels and behaves."
      />

      <div className="mt-10 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
        {designPrinciples.map((item, index) => (
          <article
            key={item.number}
            className={[
              "group min-h-[260px] py-7",
              "sm:px-6",
              index > 0 ? "lg:border-l lg:border-border" : "",
              index === 1 ? "sm:border-l sm:border-border" : "",
              index >= 2 ? "border-t border-border lg:border-t-0" : "",
              index === 3 ? "sm:border-l sm:border-border" : "",
            ].join(" ")}
          >
            <span className="font-section text-base font-bold text-primary">
              {item.number}
            </span>

            <div className="mt-16">
              <h3 className="text-xl font-semibold tracking-[-0.025em]">
                {item.title}
              </h3>

              <p className="mt-3 max-w-[260px] text-sm leading-6 text-muted-foreground">
                {item.text}
              </p>
            </div>

            <div className="mt-8 h-px w-8 bg-border transition-all duration-300 group-hover:w-16 group-hover:bg-primary" />
          </article>
        ))}
      </div>
    </section>
  );
}