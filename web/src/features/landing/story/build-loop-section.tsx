import { BuildLoopVisual } from "./build-loop-visual";

export function BuildLoopSection() {
  return (
    <section
      id="devlogs"
      className="overflow-hidden bg-primary text-[#F1EFE8]"
    >
      <div className="mx-auto max-w-375 px-6 py-24 lg:px-10 lg:py-32">

        {/* Header */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
          <p className="font-section text-base font-bold uppercase tracking-[0.12em] text-white sm:text-lg">
  03 / The Loop
</p>

          <p className="max-w-md text-sm leading-6 text-white/65 lg:text-right">
            Building isn&apos;t a straight line. DevLog turns the process into
            something worth documenting.
          </p>
        </div>

        {/* Main statement */}
        <div className="mt-16">
          <h2 className="landing-display max-w-5xl text-[clamp(4rem,8vw,8rem)] uppercase leading-[0.8] tracking-[-0.02em]">
            Progress
            <span className="block text-white/45">
              compounds.
            </span>
          </h2>
        </div>

        {/* Loop */}
        <div className="relative -mx-6 mt-4 lg:-mx-10 lg:-mt-6">
          <BuildLoopVisual />
        </div>

        {/* Supporting copy */}
        <div className="grid gap-10 border-t border-white/30 pt-8 lg:grid-cols-[1fr_1fr]">
          <p className="max-w-xl text-2xl leading-[1.25] tracking-[-0.03em] sm:text-3xl">
            Every update becomes part of the story behind what you&apos;re
            building.
          </p>

          <div className="max-w-md lg:justify-self-end">
            <p className="text-sm leading-6 text-white/65">
              Build something. Capture what changed. Share what you learned.
              Then come back and do it again.
            </p>

            <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.14em] text-white/55">
              There is always another commit →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}