import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";

export function SupportingPatternsSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Profiles and projects"
        title="Supporting content patterns"
        description="Profiles and projects support the social feed without turning DevLog into a dashboard-heavy product."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card className="rounded-xl shadow-none">
          <CardHeader>
            <div className="flex items-start gap-4">
              <Avatar className="size-12 border border-border">
                <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                  AM
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <CardTitle className="text-base">Alisha</CardTitle>
                <CardDescription>@alishacreates</CardDescription>
              </div>

              <Button variant="outline" size="sm">
                <UserPlus className="size-4" />
                Follow
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              Full-stack developer documenting the process of building
              DevLog from idea to production.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">MongoDB</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-none">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-lg">DevLog</CardTitle>
                <CardDescription className="mt-1">
                  Social platform for developers who build in public.
                </CardDescription>
              </div>

              <Badge>Building</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                Latest milestone
              </p>

              <p className="mt-2 text-sm font-medium">
                Initial landing page direction completed
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Updated 12 minutes ago
              </p>
            </div>

            <div className="mt-5 flex items-center gap-5 text-xs text-muted-foreground">
              <span>12 updates</span>
              <span>3 contributors</span>
              <span>Next.js</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}