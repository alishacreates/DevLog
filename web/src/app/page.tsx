import { ArrowRight, Github, Users, Rocket } from "lucide-react";
import Link from "next/link";

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
            <Github className="mr-2 h-4 w-4" />
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
            <Github className="mb-4 h-6 w-6" />
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