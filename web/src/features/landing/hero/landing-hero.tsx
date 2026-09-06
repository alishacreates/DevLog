import { LandingHeader } from "./landing-header";
import { LaptopShowcase } from "./laptop-showcase";

export function LandingHero() {
  return (
    <section className="bg-[#d6d6d3] px-3 py-3 sm:px-5 sm:py-8 lg:px-9">
      <div className="relative mx-auto h-[760px] max-w-375 overflow-hidden rounded-[24px] bg-[#eeeeec] sm:h-[900px] sm:rounded-[36px]">
        <LandingHeader />

        {/* Intro */}
        <div className="absolute left-5 top-24 z-30 font-mono text-[9px] font-semibold uppercase leading-[1.45] tracking-[0.09em] sm:left-[3%] sm:top-[125px] sm:text-[11px]">
          Document the process.
          <br />
          Not just the result.
        </div>

        {/* Giant typography */}
        <div className="pointer-events-none absolute inset-x-0 top-[165px] z-0 flex justify-center overflow-visible sm:top-[220px]">
          <h1 className="landing-display flex max-w-full flex-col items-center justify-center text-center text-[clamp(4.5rem,18vw,7rem)] uppercase leading-[0.72] tracking-[0em] text-black sm:flex-row sm:whitespace-nowrap sm:text-[clamp(8rem,13.2vw,14.5rem)] sm:tracking-[-0.01em]">
  {/* Mobile: BUILD IN together */}
  <span className="flex items-baseline sm:contents">
    <span>BUILD</span>

    <span className="ml-[0.12em] text-[0.38em] sm:ml-[0.14em] sm:text-[1em]">
      IN
    </span>
  </span>

  <span className="text-primary sm:ml-[0.14em]">
    MOTION
  </span>
</h1>
        </div>

        {/* Desktop pills */}
        <span className="absolute left-[27%] top-[405px] z-40 hidden rounded-full border border-black/60 bg-[#eeeeec] px-6 py-2.5 font-mono text-[10px] uppercase sm:block">
          Build
        </span>

        <span className="absolute left-[36%] top-[590px] z-50 hidden rounded-full border border-black/60 bg-[#eeeeec] px-6 py-2.5 font-mono text-[10px] uppercase sm:block">
          Learn
        </span>

        <span className="absolute right-[7%] top-[420px] z-40 hidden rounded-full border border-black/60 bg-[#eeeeec] px-6 py-2.5 font-mono text-[10px] uppercase sm:block">
          Ship
        </span>

        {/* MacBook + rock */}
        <div className="absolute left-1/2 top-[335px] z-20 w-[118%] -translate-x-1/2 sm:left-[52%] sm:top-[275px] sm:w-[78%]">
          <LaptopShowcase />
        </div>

        {/* Mobile pills */}
        <div className="absolute inset-x-5 top-[610px] z-40 flex justify-center gap-2 sm:hidden">
          {["BUILD", "LEARN", "SHIP"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-black/50 px-4 py-2 font-mono text-[8px] uppercase"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Bottom-left statement */}
        <div className="absolute bottom-10 left-5 right-5 z-40 sm:bottom-[55px] sm:left-[3%] sm:right-auto">
          <p className="font-mono text-[9px] font-semibold uppercase leading-[1.5] tracking-[0.08em] sm:text-[10px]">
            Don&apos;t wait for the final launch —
            <br />
            share the journey while you build.
          </p>

          {/* desktop chips only */}
          <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
            <span className="rounded-full border border-black/60 px-4 py-2 font-mono text-[9px] uppercase">
              Real progress
            </span>

            <span className="rounded-full border border-black/60 px-4 py-2 font-mono text-[9px] uppercase">
              Build in public
            </span>

            <span className="rounded-full border border-black/60 px-4 py-2 font-mono text-[9px] uppercase">
              Developer growth
            </span>
          </div>
        </div>

        {/* Builder badge — desktop only */}
        <div className="absolute bottom-[62px] right-[3%] z-50 hidden max-w-[310px] items-center gap-3 rounded-full bg-black px-4 py-3 text-white sm:flex">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold">
            AK
          </div>

          <p className="font-mono text-[9px] uppercase leading-[1.5] tracking-[0.04em] text-white/85">
            Hi, I&apos;m building DevLog.
            <br />
            Today&apos;s progress is already
            <br />
            worth sharing.
          </p>
        </div>
      </div>
    </section>
  );
}