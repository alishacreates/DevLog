import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
    <nav className="flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-10">
        <Link
  href="/"
  className="landing-display text-2xl uppercase tracking-[-0.03em]"
>
  DEVLOG_
</Link>

        <div className="hidden items-center gap-10 font-mono text-[11px] font-medium uppercase tracking-[0.08em] md:flex">
          <Link href="#product" className="transition-opacity hover:opacity-50">
            Product
          </Link>

          <Link href="#devlogs" className="transition-opacity hover:opacity-50">
            DevLogs
          </Link>

          <Link href="#projects" className="transition-opacity hover:opacity-50">
            Projects
          </Link>

          <Link href="#community" className="transition-opacity hover:opacity-50">
            Community
          </Link>

          <Link href="#about" className="transition-opacity hover:opacity-50">
            About
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
  <Link
    href="/sign-in"
    className="hidden rounded-full bg-[#d3d3d0] px-5 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] transition hover:bg-[#c4c4c1] sm:inline-flex"
  >
    Sign in
  </Link>

  <Link
    href="/sign-in"
    className="rounded-full bg-black px-3 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-primary sm:px-6"
  >
    Start Building
  </Link>

  <button
    type="button"
    aria-label="Open menu"
    className="flex size-10 items-center justify-center rounded-full bg-black text-white sm:size-12"
  >
    <span className="text-lg leading-none">=</span>
  </button>
</div>
      </nav>
    </header>
  );
}