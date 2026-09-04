import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex h-20 items-center justify-between px-8 lg:px-10">
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

        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="rounded-full bg-[#d3d3d0] px-6 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] transition hover:bg-[#c4c4c1]"
          >
            Sign in
          </Link>

          <Link
            href="/sign-in"
            className="rounded-full bg-black px-7 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#0B7189]"
          >
            Start building
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            className="flex size-12 items-center justify-center rounded-full bg-black text-white"
          >
            <span className="text-xl leading-none">=</span>
          </button>
        </div>
      </nav>
    </header>
  );
}