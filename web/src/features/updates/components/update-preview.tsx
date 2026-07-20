import { Bookmark, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const sampleTags = ["nextjs", "typescript", "design"];

export function UpdatePreview() {
  return (
    <article className="border-y border-border bg-card/40 px-5 py-6 sm:px-6">
      <div className="flex gap-3.5">
        <Avatar className="size-10 shrink-0 border border-border">
          <AvatarFallback className="bg-secondary text-xs font-semibold">
            AM
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-sm font-semibold">Alisha</span>
            <span className="text-xs text-muted-foreground">@alishacreates</span>
            <span className="text-muted-foreground">·</span>
            <span className="font-mono text-[11px] text-muted-foreground">12m</span>
            <button
              type="button"
              className="ml-auto text-muted-foreground transition-colors hover:text-foreground"
              aria-label="More options"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>

          <p className="mt-3 text-[15px] leading-6 text-foreground/90 sm:text-base sm:leading-7">
            Finished the first DevLog landing-page direction today. It still
            needs refinement, but the product is starting to feel real.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-primary/20 bg-primary/5 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-primary">
              DevLog
            </span>
            {sampleTags.map((tag) => (
              <span key={tag} className="font-mono text-[11px] text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-6 text-xs text-muted-foreground">
            <button type="button" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Heart className="size-3.5" />
              18
            </button>
            <button type="button" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <MessageCircle className="size-3.5" />
              5
            </button>
            <button type="button" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Bookmark className="size-3.5" />
              Save
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}