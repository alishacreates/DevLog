import { LandingHeader } from "@/features/landing/components/landing-header";
import { LaptopShowcase } from "@/features/landing/components/laptop-showcase";

export function LandingHero() {
  return (
    <section className="bg-[#d6d6d3] px-5 py-8 lg:px-9">
      <div className="relative mx-auto h-[900px] max-w-[1500px] overflow-hidden rounded-[36px] bg-[#eeeeec]">
        <LandingHeader />

        {/* Intro */}
        <div className="absolute left-[3%] top-[125px] z-30 font-mono text-[11px] font-semibold uppercase leading-[1.45] tracking-[0.09em]">
          Documenting tomorrow&apos;s
          <br />
          developers today
        </div>

        {/* Giant background typography */}
<div className="pointer-events-none absolute inset-x-0 top-[220px] z-0 flex justify-center overflow-visible">
  <h1 className="landing-display flex items-center justify-center whitespace-nowrap text-[clamp(8rem,13.2vw,14.5rem)] uppercase leading-[0.68] tracking-[-0.01em] text-black">
    <span>BUILD</span>

    <span className="ml-[0.14em]">
      IN
    </span>

    <span className="ml-[0.14em]">
      MOTION
    </span>
  </h1>
</div>

        <span className="absolute left-[27%] top-[405px] z-40 rounded-full border border-black/60 bg-[#eeeeec] px-6 py-2.5 font-mono text-[10px] uppercase">
  Build
</span>

<span className="absolute left-[36%] top-[590px] z-50 rounded-full border border-black/60 bg-[#eeeeec] px-6 py-2.5 font-mono text-[10px] uppercase">
  Learn
</span>

<span className="absolute right-[7%] top-[420px] z-40 rounded-full border border-black/60 bg-[#eeeeec] px-6 py-2.5 font-mono text-[10px] uppercase">
  Ship
</span>

        {/* MacBook + rock */}
        <div className="absolute left-[52%] top-[275px] z-20 w-[78%] -translate-x-1/2">
  <div className="-rotate-[4deg]">
    <LaptopShowcase />
  </div>
</div>

        {/* Bottom-left statement */}
        <div className="absolute bottom-[55px] left-[3%] z-40">
          <p className="font-mono text-[10px] font-semibold uppercase leading-[1.5] tracking-[0.08em]">
            We don&apos;t wait for the final launch —
            <br />
            we document the build.
          </p>

          <div className="mt-5 flex gap-2">
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

        {/* Builder badge */}
        <div className="absolute bottom-[62px] right-[3%] z-50 flex max-w-[310px] items-center gap-3 rounded-full bg-black px-4 py-3 text-white">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#0B7189] font-mono text-sm font-bold">
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