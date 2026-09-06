import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0f1111] text-[#eeeeec]"
    >
      <div className="mx-auto max-w-375 px-6 pb-16 pt-24 lg:px-10 lg:pb-20 lg:pt-32">
        <p className="font-section text-base font-bold uppercase tracking-[0.12em] text-primary sm:text-lg">
  05 / Your Turn
</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="landing-display text-[clamp(5rem,11vw,11rem)] uppercase leading-[0.78] tracking-[-0.02em]">
              What are you
              <span className="block text-primary">
                building next?
              </span>
            </h2>

            <p className="mt-10 max-w-xl text-base leading-7 text-white/55">
              Don&apos;t wait until it&apos;s finished. Start the project,
              document the progress, and let the journey become part of what
              you built.
            </p>
          </div>

          <Link
            href="/sign-in"
            className="group flex size-40 shrink-0 items-center justify-center rounded-full bg-primary text-center font-mono text-[10px] font-semibold uppercase leading-5 tracking-widest text-white transition-transform hover:scale-105 lg:size-48"
          >
            <span>
              Start your
              <br />
              DevLog
              <ArrowUpRight className="mx-auto mt-3 size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Link>
        </div>

        <div className="mt-28 border-t border-white/20 pt-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/35">
            One project. One update. Start there.
          </p>
        </div>
      </div>
    </section>
  );
}