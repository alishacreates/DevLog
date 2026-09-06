import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function DesignHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-375 items-center justify-between px-6 lg:px-10">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-4">
          <span className="landing-display text-2xl uppercase tracking-[-0.02em]">
            DEVLOG<span className="text-primary">_</span>
          </span>

          <span className="hidden h-5 w-px bg-border sm:block" />

          <span className="hidden font-section text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:block">
            Design System
          </span>
        </Link>

        {/* Back to product */}
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-full border border-foreground/40 px-5 py-2.5 font-section text-[10px] font-bold uppercase tracking-widest transition-all hover:border-primary hover:text-primary"
        >
          View product

          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </nav>
    </header>
  );
}