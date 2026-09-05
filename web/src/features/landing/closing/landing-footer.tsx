import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="bg-[#0f1111] text-[#eeeeec]">
      <div className="mx-auto max-w-[1500px] px-6 pb-10 lg:px-10">
        <div className="grid gap-10 border-t border-white/20 py-10 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:items-start lg:gap-20">
          <div>
            <Link
              href="/"
              className="landing-display text-3xl uppercase tracking-[-0.02em]"
            >
              DEVLOG<span className="text-primary">_</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/40">
              A home for developers building in motion.
            </p>
          </div>

          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/30">
              Product
            </p>

            <nav className="mt-4 space-y-3 text-sm text-white/65">
              <Link href="#product" className="block hover:text-primary">
                Why DevLog
              </Link>
              <Link href="#community" className="block hover:text-primary">
                Community
              </Link>
              <Link href="#devlogs" className="block hover:text-primary">
                The Loop
              </Link>
              <Link href="#projects" className="block hover:text-primary">
                Product
              </Link>
            </nav>
          </div>

          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/30">
              Account
            </p>

            <nav className="mt-4 space-y-3 text-sm text-white/65">
              <Link href="/sign-in" className="block hover:text-primary">
                Sign in
              </Link>
              <Link href="/sign-in" className="block hover:text-primary">
                Start building
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/20 pt-6 font-mono text-[8px] uppercase tracking-[0.13em] text-white/30 sm:flex-row sm:justify-between">
          <span>© 2026 DevLog</span>
          <span>Build. Log. Share. Repeat.</span>
        </div>
      </div>
    </footer>
  );
}