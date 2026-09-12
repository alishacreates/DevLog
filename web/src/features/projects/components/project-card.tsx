import Link from "next/link";
import { ArrowUpRight, Lock, Globe2 } from "lucide-react";

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
      className="group relative flex min-h-[430px] overflow-hidden rounded-[28px] border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      {/* Visual background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/5 to-background" />

        <div className="absolute -right-10 top-10 select-none font-mono text-[9rem] font-bold leading-none text-foreground/[0.035]">
          {initials}
        </div>

        <div className="absolute left-6 top-6">
          <p className="landing-display text-2xl uppercase tracking-[-0.02em]">
            DEVLOG<span className="text-primary">_</span>
          </p>
        </div>
      </div>

      {/* Dark readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-transparent" />

      {/* Visibility */}
      <div className="absolute right-5 top-5 z-10">
        <span
          className={
            project.isPublic
              ? "text-meta-uppercase inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-primary-foreground"
              : "text-meta-uppercase inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-muted-foreground"
          }
        >
          {project.isPublic ? (
            <Globe2 className="size-3" />
          ) : (
            <Lock className="size-3" />
          )}

          {project.isPublic ? "Public" : "Private"}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-auto w-full p-6">
        <div className="mb-3">
          <span className="text-meta-uppercase text-primary">
            {formatStatus(project.status)}
          </span>
        </div>

        <h2 className="text-2xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-primary">
          {project.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>

        {project.techStack.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-meta rounded-full border border-border bg-background/60 px-2.5 py-1 text-muted-foreground backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}

            {project.techStack.length > 4 ? (
              <span className="text-meta rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                +{project.techStack.length - 4}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <span className="text-meta-uppercase text-muted-foreground">
            Project journey
          </span>

          <span className="text-action-label inline-flex items-center gap-2 transition-colors group-hover:text-primary">
            View Project
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function formatStatus(status: string) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}