import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Metadata } from "next";

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


export const metadata: Metadata = {
  title: "Design System",
  description:
    "Explore the visual language, typography, colors, components, and design principles behind DevLog.",
};


export default function DesignPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <DesignHeader />

      <div className="mx-auto max-w-375 px-6 lg:px-10">
        <DesignHero />

        <div className="border-t border-border">
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
      </div>

      <footer className="mt-24 border-t border-border bg-[#0f1111] text-[#eeeeec]">
        <div className="mx-auto grid max-w-375 gap-8 px-6 py-10 sm:grid-cols-[1fr_auto] sm:items-end lg:px-10">
          <div>
            <p className="landing-display text-3xl uppercase tracking-[-0.02em]">
              DEVLOG<span className="text-primary">_</span>
            </p>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/40">
              The visual system behind a product built in motion.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-3 font-section text-sm font-bold uppercase tracking-widest text-white/65 transition-colors hover:text-primary"
          >
            Back to product
             <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </footer>
    </main>
  );
}