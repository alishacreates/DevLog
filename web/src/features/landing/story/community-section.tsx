import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const updates = [
  {
    number: "01",
    username: "@rohanbuilds",
    project: "OPENSHELF",
    time: "12 MIN AGO",
    title: "FIXED THE AUTH REDIRECT LOOP.",
    body: "One missing session check caused the entire flow to bounce between routes. Small bug, big lesson.",
    tags: ["AUTH", "DEBUGGING"],
  },
  {
    number: "02",
    username: "@priyacodes",
    project: "TINY COMPILER",
    time: "41 MIN AGO",
    title: "THE LEXER FINALLY WORKS.",
    body: "Identifiers, numbers and operators are being recognized correctly. The compiler is starting to feel real.",
    tags: ["COMPILER", "CPP"],
  },
  {
    number: "03",
    username: "@mayamakes",
    project: "FOCUS ROOM",
    time: "1 HR AGO",
    title: "SHIPPED THE FIRST USABLE VERSION.",
    body: "Half the features are still missing. Doesn't matter. Someone other than me can finally use it.",
    tags: ["SHIPPING", "TYPESCRIPT"],
  },
];

export function CommunitySection() {
  return (
    <section
      id="community"
      className="overflow-hidden border-b border-black/20 bg-[#eeeeec] text-black"
    >
      <div className="mx-auto max-w-375 px-6 py-24 lg:px-10 lg:py-32">
        {/* Section heading */}
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="font-section text-base font-bold uppercase tracking-[0.12em] text-primary sm:text-lg">
  02 / Community
</p>
          </div>

          <div>
            <h2 className="landing-display max-w-5xl text-[clamp(4.5rem,8vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.025em]">
              See the build
              <span className="block">as it happens.</span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-7 text-black/55">
              Follow the unfinished work. The bugs, experiments, small wins,
              lessons and breakthroughs developers usually never post.
            </p>
          </div>
        </div>

        {/* Activity board */}
        <div className="mt-24 border-t border-black/30">
          {updates.map((update, index) => (
            <ScrollReveal
    key={update.number}
    direction={index % 2 === 0 ? "left" : "right"}
    delay={0.05}
  >
            <article
              key={update.number}
              className="group relative grid gap-6 border-b border-black/30 py-10 transition-colors hover:bg-black/[0.025] md:grid-cols-[80px_190px_1fr_130px] md:py-12"
            >
              {/* Number */}
              <span className="font-mono text-[10px] text-black/35">
                {update.number}
              </span>

              {/* Developer */}
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest">
                  {update.username}
                </p>

                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#1e7a6f]">
                  / {update.project}
                </p>
              </div>

              {/* Update */}
              <div className={index === 1 ? "md:pl-[8%]" : ""}>
                <h3 className="max-w-3xl text-3xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                  {update.title}
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-6 text-black/55">
                  {update.body}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {update.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/40 px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Time + action */}
              <div className="flex items-start justify-between gap-4 md:flex-col md:items-end">
                <span className="font-mono text-[9px] uppercase tracking-widest text-black/40">
                  {update.time}
                </span>

                <span className="flex size-10 items-center justify-center rounded-full border border-black/40 transition-all group-hover:border-[#1e7a6f] group-hover:bg-[#1e7a6f] group-hover:text-white">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-20 grid gap-10 border-t border-black/30 pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#1e7a6f]">
              The community is the changelog
            </p>

            <p className="mt-4 max-w-3xl text-2xl leading-[1.25] tracking-[-0.03em] sm:text-3xl">
              Discover developers through what they&apos;re actually building,
              not another polished bio.
            </p>
          </div>

          <Link
            href="/sign-in"
            className="inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 font-mono text-[9px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#1e7a6f]"
          >
            Explore DevLogs
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}