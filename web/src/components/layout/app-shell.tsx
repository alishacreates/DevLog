import Link from "next/link";

import { signOut } from "@/auth";

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
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link
              href="/feed"
              className="text-lg font-semibold tracking-tight"
            >
              DevLog
            </Link>

            <nav className="flex items-center gap-5 text-sm">
              <Link
                href="/feed"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Feed
              </Link>

              <Link
                href="/profile"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Profile
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/profile"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              @{user.username}
            </Link>

            <form
              action={async () => {
                "use server";

                await signOut({
                  redirectTo: "/",
                });
              }}
            >
              <button
                type="submit"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}