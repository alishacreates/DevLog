import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

type FeedLeftSidebarProps = {
  user: {
    name?: string | null;
    username: string | null;
    image?: string | null;
  };
  projects: {
    id: string;
    title: string;
  }[];
};

export function FeedLeftSidebar({
  user,
  projects,
}: FeedLeftSidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-5">
        {/* Profile */}
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-col items-center text-center">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "Profile"}
                width={72}
                height={72}
                className="size-18 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-18 items-center justify-center rounded-full bg-primary font-mono text-lg font-semibold text-primary-foreground">
                {(user.name ?? user.username ?? "D")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <h2 className="mt-4 text-lg font-semibold">
              {user.name}
            </h2>

            <p className="mt-1 font-mono text-[10px] text-muted-foreground">
              @{user.username}
            </p>

            <Link
              href="/profile"
              className="mt-5 w-full rounded-full border border-border px-4 py-2 font-section text-[9px] font-bold uppercase tracking-widest transition-colors hover:border-primary hover:text-primary dark:hover:border-accent-warm dark:hover:text-accent-warm"
            >
              View profile
            </Link>
          </div>
        </section>

        {/* Projects */}
        <section className="rounded-2xl border border-border bg-card p-5">
         <div className="text-center">
  <p className="text-section-label text-primary dark:text-accent-warm">
    My Projects
  </p>
</div>

          <div className="mt-4 space-y-3">
            
        {projects.slice(0, 4).map((project, index) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted/50"
          >
            <span className="font-mono text-[10px] text-muted-foreground transition-colors group-hover:text-primary dark:group-hover:text-accent-warm">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="line-clamp-1 text-foreground">
              {project.title}
            </span>
          </Link>
        ))}


            {projects.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No projects yet.
              </p>
            ) : null}
          </div>

          <div className="mt-5 flex justify-center">
  <Link
    href="/projects/new"
    className="
      inline-flex items-center gap-2 rounded-full
      bg-primary px-4 py-2
      font-section text-[9px] font-bold uppercase tracking-widest
      text-primary-foreground
      transition-all
      hover:-translate-y-0.5 hover:shadow-sm
      dark:bg-accent-warm dark:text-[#101513]
    "
  >
    <Plus className="size-3.5" />
    New Project
  </Link>
</div>
        </section>
      </div>
    </aside>
  );
}