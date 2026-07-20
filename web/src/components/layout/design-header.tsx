import Link from "next/link";
import { ArrowRight, GitCommitHorizontal } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function DesignHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <GitCommitHorizontal className="size-4" />
          </span>

          <div>
            <p className="text-sm font-semibold leading-none">DevLog</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              Design system
            </p>
          </div>
        </Link>

        <Link
          href="/"
          className={buttonVariants({
            variant: "outline",
            size: "sm",
          })}
        >
          View landing page
          <ArrowRight className="size-4" />
        </Link>
      </nav>
    </header>
  );
}