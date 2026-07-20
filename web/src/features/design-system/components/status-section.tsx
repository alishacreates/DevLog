import { AlertCircle, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";

export function StatusSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Status"
        title="Badges and system language"
        description="Status labels should be short, semantic, and easy to scan."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-semibold">Product statuses</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>Building</Badge>
            <Badge variant="secondary">In progress</Badge>
            <Badge variant="outline">Learning</Badge>
            <Badge variant="outline">Planning</Badge>
            <Badge className="bg-success text-success-foreground">
              Deployed
            </Badge>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-semibold">Feedback states</p>

          <div className="mt-5 space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-success/20 bg-success-subtle p-4">
              <Check className="mt-0.5 size-4 text-success" />

              <div>
                <p className="text-sm font-medium text-success-subtle-foreground">
                  Update published
                </p>

                <p className="mt-1 text-xs text-success-subtle-foreground/80">
                  Your progress is now visible to the community.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <AlertCircle className="mt-0.5 size-4 text-destructive" />

              <div>
                <p className="text-sm font-medium">Upload failed</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Try again or choose a smaller image.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}