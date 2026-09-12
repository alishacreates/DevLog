import Image from "next/image";
import Link from "next/link";

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
              className="mt-5 w-full rounded-full border border-border px-4 py-2 font-section text-[9px] font-bold uppercase tracking-widest transition-colors hover:border-primary hover:text-primary"
            >
              View profile
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="font-section text-[10px] font-bold uppercase tracking-widest">
              My Projects
            </p>

            <Link
              href="/projects"
              className="font-mono text-[9px] text-muted-foreground hover:text-primary"
            >
              View all
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {projects.slice(0, 4).map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
              >
                <span className="font-mono text-[9px] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="line-clamp-1">
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
        </section>
      </div>
    </aside>
  );
}