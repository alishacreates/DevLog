import Link from "next/link";

import { AccountMenu } from "@/components/layout/account-menu";

type AppShellProps = {
  children: React.ReactNode;
  user: {
    name?: string | null;
    username: string | null;
    image?: string | null;
  };
};

export function AppShell({ children, user }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-20 max-w-375 items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-10">
            <Link
              href="/feed"
              className="landing-display text-2xl uppercase tracking-[-0.02em]"
            >
              DEVLOG<span className="text-primary">_</span>
            </Link>

            <nav className="hidden items-center gap-7 font-section text-xs font-bold uppercase tracking-[0.12em] md:flex">
              <Link
                href="/feed"
                className="transition-colors hover:text-primary"
              >
                Feed
              </Link>

              <Link
                href="/projects"
                className="transition-colors hover:text-primary"
              >
                Projects
              </Link>
            </nav>
          </div>

          <AccountMenu user={user} />
        </div>
      </header>

      {children}
    </div>
  );
}