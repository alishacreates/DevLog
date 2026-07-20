import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

export function InterfaceVoiceSection() {
  return (
    <section className="py-16">
      <SectionHeader
        eyebrow="Reference"
        title="Interface voice"
        description="Copy should sound direct, encouraging, and developer-aware without becoming corporate or overdramatic."
      />

      <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
        {[
          {
            label: "Prefer",
            text: "What are you building today?",
          },
          {
            label: "Avoid",
            text: "Create a new content publication.",
          },
          {
            label: "Prefer",
            text: "Share an update",
          },
          {
            label: "Avoid",
            text: "Submit post",
          },
          {
            label: "Prefer",
            text: "No updates yet. Share the first step.",
          },
          {
            label: "Avoid",
            text: "There is no data available.",
          },
        ].map((item) => (
          <div key={item.text} className="bg-background p-6">
            <p
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.18em]",
                item.label === "Prefer"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </p>

            <p className="mt-3 text-sm leading-6">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}