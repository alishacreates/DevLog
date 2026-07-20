import { Check } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { UpdatePreview } from "@/features/updates/components/update-preview";

export function SocialContentSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Social content"
        title="Core update pattern"
        description="Updates are the heart of DevLog. They should read like social posts while retaining useful project context."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-xl border border-border">
          <UpdatePreview />
        </div>

        <div className="space-y-4">
          {[
            "Avatar, identity, timestamp, and lightweight overflow action",
            "Readable update copy with comfortable line length",
            "Project context and technical tags",
            "Quiet social actions without oversized vanity metrics",
          ].map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-xl border border-border bg-card p-4"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-sm leading-6 text-muted-foreground">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}