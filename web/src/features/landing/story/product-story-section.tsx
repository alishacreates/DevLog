import { ProjectJourneyVisual } from "./project-journey-visual";

export function ProductStorySection() {
  return (
    <section
      id="product"
      className="overflow-hidden border-b border-white/10 bg-[#0f1111] text-[#eeeeec]"
    >
      <div className="mx-auto max-w-375 px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          {/* Copy */}
          <div>
            <p className="font-section text-base font-bold uppercase tracking-[0.12em] text-primary sm:text-lg">
  01 / Why DevLog
</p>

            <h2 className="mt-8 max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Projects show
              <br />
              what you built.

              <span className="mt-3 block text-[#8c9290]">
  Posts show
  <br />
  how you got there.
</span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-7 text-[#9ca3a1]">
              The finished repository is only part of the story. DevLog keeps
              the decisions, experiments, bugs, breakthroughs, and lessons
              that happened along the way.
            </p>

            <div className="mt-12 border-l border-primary pl-5">
              <p className="max-w-lg text-xl leading-7 tracking-[-0.025em]">
                Your project isn&apos;t one launch.
                <span className="text-[#8c9290]">
                  {" "}
                  It&apos;s hundreds of small decisions worth remembering.
                </span>
              </p>
            </div>

            <div className="mt-10 flex items-center gap-5 font-mono text-[9px] uppercase tracking-[0.13em] text-white/40">
              <span>First commit</span>
              <span className="text-primary">→</span>
              <span>Real users</span>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute right-0 top-4 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
              Progress / 01—05
            </div>

            <ProjectJourneyVisual />
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-white/20 pt-7 sm:flex-row">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
            Every milestone leaves a trace.
          </p>

          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
            Keep the story →
          </p>
        </div>
      </div>
    </section>
  );
}