import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { ChecklistVisual } from "./checklist-preview";

export function ProductPreviewSection() {
  return (
    <section
      id="projects"
      className="overflow-hidden bg-[#f3f0e8] text-foreground"
    >
      <div className="mx-auto max-w-375 px-6 py-24 lg:px-10 lg:py-32">
        {/* Heading */}
        <div className="grid items-center gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
  {/* Left visual */}
  <div className="relative">
    <p className="font-section text-sm font-bold uppercase tracking-[0.14em] text-primary sm:text-base">
  04 / The Product
</p>

    <div className="lg:pt-10">
      <ChecklistVisual />
    </div>
  </div>

  {/* Right copy */}
  <div>
    <h2 className="landing-display text-[clamp(4.5rem,7.5vw,8rem)] uppercase leading-[0.82] tracking-[-0.02em]">
      Built for the
      <span className="block text-primary">
        work in between.
      </span>
    </h2>

    <p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground">
      Your projects, progress, and developer identity live together — from
      the first commit to the latest post.
    </p>
  </div>
</div>

        {/* Product window */}
        <div className="relative -mt-2 border border-black/25 bg-[#e9e6dd] p-2 shadow-[0_35px_80px_rgba(0,0,0,0.12)]">
          {/* Browser chrome */}
          <div className="flex h-12 items-center justify-between border-b border-black/15 px-4">
            <div className="flex gap-2">
              <span className="size-2 rounded-full bg-black/20" />
              <span className="size-2 rounded-full bg-black/20" />
              <span className="size-2 rounded-full bg-black/20" />
            </div>

            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/40">
              devlog / feed
            </span>

            <span className="font-mono text-[9px] text-primary">
              LIVE
            </span>
          </div>

          <div className="grid min-h-[620px] lg:grid-cols-[220px_1fr]">
            {/* App navigation */}
            <aside className="border-b border-black/15 p-6 lg:border-b-0 lg:border-r">
              <p className="landing-display text-2xl">
                DEVLOG<span className="text-primary">_</span>
              </p>

              <nav className="mt-12 space-y-5 font-mono text-[10px] uppercase tracking-widest">
                <p className="text-primary">● Feed</p>
                <p className="text-black/45">Projects</p>
                <p className="text-black/45">Profile</p>
              </nav>

              <div className="mt-16 border-t border-black/15 pt-5">
                <p className="font-mono text-[9px] uppercase text-black/35">
                  Signed in as
                </p>
                <p className="mt-2 text-sm font-semibold">
                  @alishacreates
                </p>
              </div>
            </aside>

            {/* Feed */}
            <div className="p-6 sm:p-10">
              <div className="flex items-end justify-between border-b border-black/20 pb-7">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
                    Community / Live
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                    What developers are building.
                  </h3>
                </div>

                <span className="hidden rounded-full bg-black px-4 py-2 font-mono text-[9px] uppercase text-white sm:block">
                 + New Post
                </span>
              </div>

              <PreviewPost
                username="@mayamakes"
                project="FOCUS ROOM"
                time="12M"
                title="Shipped the first usable version."
                text="It is missing half the features I imagined, but someone can finally use it."
                tags={["shipping", "typescript"]}
              />

              <PreviewPost
                username="@rohanbuilds"
                project="OPENSHELF"
                time="34M"
                title="The auth redirect loop is finally gone."
                text="One missing session check caused the whole flow. Documenting this before I forget why."
                tags={["auth", "debugging"]}
              />

              <PreviewPost
                username="@priyacodes"
                project="TINY COMPILER"
                time="1H"
                title="The lexer recognizes its first tokens."
                text="Identifiers, numbers and operators are working. Tiny milestone, huge motivation."
                tags={["compiler", "cpp"]}
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col justify-between gap-7 border-t border-black/20 pt-8 sm:flex-row sm:items-end">
          <p className="max-w-2xl text-2xl leading-[1.25] tracking-[-0.03em]">
            Not another portfolio frozen in time.
            <span className="text-muted-foreground">
              {" "}A living record of what you&apos;re becoming.
            </span>
          </p>

          <Link
            href="/sign-in"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-black px-6 py-3 font-mono text-[9px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary"
          >
            Join DevLog
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PreviewPost({
  username,
  project,
  time,
  title,
  text,
  tags,
}: {
  username: string;
  project: string;
  time: string;
  title: string;
  text: string;
  tags: string[];
}) {
  return (
    <article className="grid gap-5 border-b border-black/20 py-8 sm:grid-cols-[150px_1fr_auto]">
      <div>
        <p className="font-mono text-[9px] font-semibold uppercase">
          {username}
        </p>

        <p className="mt-2 font-mono text-[8px] uppercase tracking-widest text-primary">
          / {project}
        </p>
      </div>

      <div>
        <h4 className="text-xl font-semibold tracking-[-0.025em]">
          {title}
        </h4>

        <p className="mt-3 max-w-xl text-sm leading-6 text-black/50">
          {text}
        </p>

        <div className="mt-4 flex gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[8px] uppercase tracking-widest text-black/40"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2 font-mono text-[8px] text-black/35">
        <GitBranch className="size-3" />
        {time}
      </div>
    </article>
  );
}