import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BuiltByContent() {
  return (
    <section
      id="built-by"
      className="border-t border-border bg-background text-foreground"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.5fr_1.5fr] lg:gap-20">
          <div>
            <p className="font-section text-base font-bold uppercase tracking-[0.12em] text-primary sm:text-lg">
              06 / Built By
            </p>
          </div>

          <div>
            <h2 className="landing-display text-[clamp(4.5rem,8vw,8rem)] uppercase leading-[0.82] tracking-[-0.03em]">
              Ali
              <span className="text-primary">sha.</span>
            </h2>

            <div className="mt-8 max-w-2xl">
              <p className="font-editorial text-lg leading-8 text-muted-foreground sm:text-xl">
  I&apos;m the developer behind DevLog: a platform built around a simple
  belief: projects should show more than just the finished result.
</p>

  <p
    className="mt-5 text-lg leading-8 text-muted-foreground sm:text-xl"
    style={{ fontFamily: '"Times New Roman", Times, serif' }}
  >
    The decisions, bugs, lessons, experiments, and small wins that happen along
    the way are part of the story too.{" "}
    <span className="text-primary font-bold">DevLog</span> is my attempt to give that
    process a place to live.
  </p>
</div>

            <div className="mt-12 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-section text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Find me elsewhere
              </p>

              <div className="flex flex-wrap gap-3">
                <ProfileLink href="https://github.com/alishacreates">
                  GitHub
                </ProfileLink>

                <ProfileLink href="https://www.linkedin.com/in/alisha-cs">
                  LinkedIn
                </ProfileLink>

                <ProfileLink href="https://alisha-cse.vercel.app">
                  Portfolio
                </ProfileLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-foreground/30 px-5 py-2.5 font-section text-[10px] font-bold uppercase tracking-[0.1em] transition-all hover:border-primary hover:text-primary"
    >
      {children}
      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}