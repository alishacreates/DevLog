import Link from "next/link";
import {
  ArrowUpRight,
  Globe2,
  Lock,
} from "lucide-react";

type ProjectCardProps = {
  project: {
    id: string;
    title: string;
    description: string;
    status: string;
    techStack: string[];
    isPublic: boolean;
  };
};

export function ProjectCard({ project }: ProjectCardProps) {
  const initials = project.title
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <Link
      href={`/projects/${project.id}`}
      className="
        group block overflow-hidden rounded-[26px]
        border border-border bg-card
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Visual */}
      <div className="relative h-[235px] overflow-hidden bg-muted/40">
        {/* Grid */}
        <div
          className="
            absolute inset-0
            text-primary/[0.10]
            [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
            [background-size:28px_28px]
          "
        />

        {/* Soft glow */}
        <div className="absolute -left-16 -top-16 size-52 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-20 -right-12 size-48 rounded-full bg-accent-warm/10 blur-3xl" />

        {/* Status */}
        <div className="absolute left-5 top-5 z-10">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary dark:text-accent-warm">
            {formatStatus(project.status)}
          </span>
        </div>

        {/* Visibility */}
        <div className="absolute right-5 top-5 z-10">
          <span
            className="
              inline-flex items-center gap-1.5 rounded-full
              border border-border bg-background/80
              px-2.5 py-1
              font-mono text-[9px] uppercase tracking-[0.1em]
              text-muted-foreground backdrop-blur
            "
          >
            {project.isPublic ? (
              <Globe2 className="size-3" />
            ) : (
              <Lock className="size-3 text-red-500" />
            )}

            {project.isPublic ? "Public" : "Private"}
          </span>
        </div>

        {/* Floating project window */}
        <div
          className="
            absolute left-1/2 top-[58%]
            w-[78%] -translate-x-1/2 -translate-y-1/2
            overflow-hidden rounded-2xl
            border border-border/80
            bg-background/90
            shadow-xl backdrop-blur-md
            transition-transform duration-300
            group-hover:-translate-y-[53%]
          "
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-muted-foreground/40" />
              <span className="size-1.5 rounded-full bg-muted-foreground/30" />
              <span className="size-1.5 rounded-full bg-muted-foreground/20" />
            </div>

            <span className="font-mono text-[8px] text-muted-foreground">
              /project
            </span>
          </div>

          {/* Project identity */}
          <div className="flex min-h-[112px] items-center gap-4 px-5 py-5">
            <div
              className="
                flex size-14 shrink-0 items-center justify-center
                rounded-2xl bg-primary/10
                font-mono text-lg font-bold text-primary
                dark:bg-accent-warm/10 dark:text-accent-warm
              "
            >
              {initials}
            </div>

            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                Tech stack
              </p>

              {project.techStack.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-muted px-2 py-1 font-mono text-[8px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">
                  No stack added yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-[-0.03em]">
              {project.title}
            </h2>

            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground font-sans">
              {project.description}
            </p>
          </div>

          <ArrowUpRight
            className="
              mt-1 size-4 shrink-0
              text-muted-foreground
              transition-all duration-200
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              group-hover:text-primary
            "
          />
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="font-bold text-lg text-muted-foreground">
            ݁⟡ ݁
          </span>

          <span
            className="
              inline-flex items-center gap-2
              rounded-full border border-primary
              px-3.5 py-2
              font-mono text-[10px] font-semibold uppercase tracking-[0.12em]
              bg-primary text-primary-foreground
              transition-all duration-200
              hover:bg-primary/80
              hover:border-primary/80
              dark:bg-accent-warm dark:text-[#101513] dark:border-accent-warm
              dark:hover:bg-accent-warm/80
              dark:hover:border-accent-warm/80
            "
          >
            View project
          </span>
        </div>
      </div>
    </Link>
  );
}

function formatStatus(status: string) {
  return status
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}