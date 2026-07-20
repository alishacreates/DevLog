import Link from "next/link";
import { ArrowRight, GitCommitHorizontal } from "lucide-react";

import { DesignHeader } from "@/components/layout/design-header";
import {
  ActionsSection,
  ColorSection,
  DesignHero,
  DesignPrinciplesSection,
  FormsSection,
  InterfaceVoiceSection,
  LayoutRulesSection,
  SocialContentSection,
  StatusSection,
  SupportingPatternsSection,
  SystemStatesSection,
  TypographySection,
} from "@/features/design-system";

export default function DesignPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <DesignHeader />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <DesignHero />
        <DesignPrinciplesSection />
        <ColorSection />
        <TypographySection />
        <ActionsSection />
        <FormsSection />
        <SocialContentSection />
        <SupportingPatternsSection />
        <StatusSection />
        <SystemStatesSection />
        <LayoutRulesSection />
        <InterfaceVoiceSection />
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-2.5">
            <GitCommitHorizontal className="size-4 text-primary" />
            <span className="font-semibold text-foreground">
              DevLog Design System
            </span>
          </div>

          <p>Update this page whenever the visual language changes.</p>

          <Link
            href="/"
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            Back to product
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </footer>
    </main>
  );
}