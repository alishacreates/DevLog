import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="w-full max-w-2xl">
        <p className="font-section text-base font-bold uppercase tracking-[0.12em] text-primary">
          DevLog / Early Preview
        </p>

        <h1 className="landing-display mt-8 text-[clamp(5rem,12vw,9rem)] uppercase leading-[0.78] tracking-[-0.02em]">
          Still in
          <span className="block text-primary">
            motion.
          </span>
        </h1>

        <p className="mt-8 max-w-lg text-base leading-7 text-muted-foreground">
          DevLog&apos;s MVP is still being built. The landing page and design
          system are live while I prepare the product for its first users.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 font-section text-xs font-bold uppercase tracking-[0.1em] text-background transition-colors hover:bg-primary hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to DevLog
          </Link>

          <Link
            href="/design"
            className="group inline-flex items-center gap-3 rounded-full border border-foreground/40 px-6 py-3 font-section text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:border-primary hover:text-primary"
          >
            Explore design system
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-16 border-t border-border pt-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
            Landing page live · MVP in progress
          </p>
        </div>
      </div>
    </main>
  );
}