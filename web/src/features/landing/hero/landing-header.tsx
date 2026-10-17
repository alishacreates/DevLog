
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navigation = [
  { label: "Product", href: "#product" },
  { label: "DevLogs", href: "#devlogs" },
  { label: "Projects", href: "#projects" },
  { label: "Community", href: "#community" },
  { label: "About", href: "#about" },
  { label: "Built By", href: "/built-by" },
];

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="relative flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="landing-display shrink-0 text-2xl uppercase tracking-[-0.02em]"
        >
          DEVLOG<span className="text-primary">_</span>
        </Link>

        {/* Desktop navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 font-section text-[10px] font-bold uppercase tracking-[0.1em] xl:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Sign in */}
          <Link
            href="/sign-in"
            className="hidden rounded-full border border-border bg-card px-4 py-2.5 font-section text-[9px] font-bold uppercase tracking-widest transition-colors hover:bg-muted sm:inline-flex"
          >
            Sign In
          </Link>

          {/* Design system */}
          <Link
            href="/design"
            className="group inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 font-section text-[9px] font-bold uppercase tracking-[0.08em] text-white transition-all hover:bg-primary sm:px-5"
          >
            <span className="sm:hidden">Design</span>
            <span className="hidden sm:inline">Design System</span>

            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile / tablet menu */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="landing-mobile-menu"
            className="flex size-10 items-center justify-center rounded-full bg-black text-white xl:hidden"
          >
            {menuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="landing-mobile-menu"
          className="absolute inset-x-4 top-full rounded-2xl border border-border bg-card p-5 shadow-xl sm:inset-x-6 xl:hidden"
        >
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 font-section text-xs font-bold uppercase tracking-widest transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/sign-in"
              onClick={() => setMenuOpen(false)}
              className="mt-3 rounded-xl bg-primary px-4 py-3 text-center font-section text-xs font-bold uppercase tracking-widest text-primary-foreground"
            >
              Sign In to DevLog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
