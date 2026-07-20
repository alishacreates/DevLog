import { Search, ImageIcon, Code2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SectionHeader } from "@/components/shared/section-header";

export function FormsSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Forms"
        title="Inputs and composition"
        description="Forms should feel lightweight and social, with clear labels and minimal decoration."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>

            <Input id="username" placeholder="alishacreates" />
          </div>

          <div className="space-y-2">
            <label htmlFor="search" className="text-sm font-medium">
              Search
            </label>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                className="pl-9"
                placeholder="Search developers or projects"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="disabled" className="text-sm font-medium">
              Disabled
            </label>

            <Input
              id="disabled"
              placeholder="Unavailable"
              disabled
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <Avatar className="size-9 border border-border">
              <AvatarFallback className="bg-secondary text-xs">
                AM
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-semibold">Share an update</p>
              <p className="text-xs text-muted-foreground">
                What did you build today?
              </p>
            </div>
          </div>

          <div className="p-5">
            <Textarea
              className="min-h-36 resize-none border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              placeholder="Share a feature, bug, lesson, experiment, or small win..."
            />

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Attach image"
                >
                  <ImageIcon className="size-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Attach code"
                >
                  <Code2 className="size-4" />
                </Button>
              </div>

              <Button>
                <Send className="size-4" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}