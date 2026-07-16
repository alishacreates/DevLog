import { ArrowRight, Users, Rocket } from "lucide-react";
import Link from "next/link";


function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.061.069-.061 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 rounded-full border px-4 py-2 text-sm text-muted-foreground">
          Build in public. Grow with developers.
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          The place where developers share what they&apos;re building.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          DevLog helps developers document their progress, showcase projects,
          discover builders, and grow through consistent public learning.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition hover:bg-primary/90"
          >
            Start building
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

         <Link
  href="https://github.com/alishacreates"
  target="_blank"
  className="inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium transition hover:bg-accent"
>
  <GitHubIcon className="mr-2 h-4 w-4" />
  View GitHub
</Link>
        </div>

        <div className="mt-16 grid w-full gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 text-left shadow-sm">
            <Rocket className="mb-4 h-6 w-6" />
            <h3 className="font-semibold">Share Progress</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Post short updates about features, bugs, lessons, and milestones.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 text-left shadow-sm">
            <GitHubIcon className="mb-4 h-6 w-6" />
            <h3 className="font-semibold">Showcase Projects</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect your projects with updates, repositories, demos, and tech stacks.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 text-left shadow-sm">
            <Users className="mb-4 h-6 w-6" />
            <h3 className="font-semibold">Find Builders</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover developers, follow their journey, and grow together.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}