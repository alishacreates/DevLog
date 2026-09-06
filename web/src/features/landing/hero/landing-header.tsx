import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function LandingHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
    <nav className="relative flex h-20 items-center justify-between px-8 lg:px-10">
  {/* Left — logo */}
  <Link
    href="/"
    className="landing-display shrink-0 text-2xl uppercase tracking-[-0.02em]"
  >
    DEVLOG<span className="text-primary">_</span>
  </Link>

  {/* Center — actually centered to the page */}
  <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 font-section text-[10px] font-bold uppercase tracking-[0.1em] lg:flex">
    <Link href="#product" className="transition-colors hover:text-primary">
      Product
    </Link>

    <Link href="#devlogs" className="transition-colors hover:text-primary">
      DevLogs
    </Link>

    <Link href="#projects" className="transition-colors hover:text-primary">
      Projects
    </Link>

    <Link href="#community" className="transition-colors hover:text-primary">
      Community
    </Link>

    <Link href="#about" className="transition-colors hover:text-primary">
      About
    </Link>

    <Link href="/built-by" className="transition-colors hover:text-primary">
      Built By
    </Link>
  </div>

  {/* Right — actions */}
  <div className="ml-auto flex items-center gap-3">
   <div className="ml-auto flex items-center gap-2 sm:gap-3">
  {/* Status */}


  {/* Design System */}
  <Link
    href="/design"
    className="group inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 font-section text-[9px] font-bold uppercase tracking-[0.08em] text-white transition-all hover:bg-primary sm:px-6 sm:py-3 sm:text-[10px]"
  >
    <span className="sm:hidden">Design</span>
    <span className="hidden sm:inline">Design system</span>

    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </Link>

  {/* Menu */}
  <button
    type="button"
    aria-label="Open menu"
    className="flex size-10 items-center justify-center rounded-full bg-black text-white sm:size-12"
  >
    <span className="text-lg leading-none">=</span>
  </button>
</div>
  </div>
</nav>
    </header>
  );
}