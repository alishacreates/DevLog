import {
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";

export function ResponsiveSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Responsive"
        title="The product should collapse gracefully."
        description="DevLog is social and should feel natural on mobile. Wide layouts add context, while smaller screens preserve the content and actions that matter most."
      />

      {/* Breakpoint patterns */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <DeviceRule
          icon={<Monitor className="size-5" />}
          label="Desktop"
          range="xl and above"
          description="Use the full three-column feed: personal context on the left, posts in the center, and discovery on the right."
        />

        <DeviceRule
          icon={<Tablet className="size-5" />}
          label="Tablet"
          range="lg"
          description="Reduce supporting content. The left sidebar may remain while discovery moves out of the persistent layout."
        />

        <DeviceRule
          icon={<Smartphone className="size-5" />}
          label="Mobile"
          range="below lg"
          description="Use one primary content column. Sidebars disappear and important actions remain available through navigation and page-level controls."
        />
      </div>

      {/* Feed visualization */}
      <div className="mt-10 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <p className="text-section-label text-primary dark:text-accent-warm">
          Feed behavior
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          {/* Desktop */}
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Desktop
            </p>

            <div className="mt-3 grid h-40 grid-cols-[0.7fr_2fr_0.7fr] gap-2">
              <div className="rounded-lg border border-border bg-muted/50" />

              <div className="space-y-2">
                <div className="h-10 rounded-lg border border-border bg-background" />
                <div className="h-28 rounded-lg border border-border bg-background" />
              </div>

              <div className="rounded-lg border border-border bg-muted/50" />
            </div>

            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Personal context, feed, and discovery can coexist.
            </p>
          </div>

          {/* Tablet */}
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Tablet
            </p>

            <div className="mt-3 grid h-40 grid-cols-[0.7fr_2fr] gap-2">
              <div className="rounded-lg border border-border bg-muted/50" />

              <div className="space-y-2">
                <div className="h-10 rounded-lg border border-border bg-background" />
                <div className="h-28 rounded-lg border border-border bg-background" />
              </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Remove lower-priority discovery before reducing the feed.
            </p>
          </div>

          {/* Mobile */}
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Mobile
            </p>

            <div className="mt-3 mx-auto h-40 max-w-44 rounded-[22px] border border-border bg-background p-2">
              <div className="h-5 rounded-md bg-muted" />

              <div className="mt-2 h-8 rounded-lg border border-border bg-card" />

              <div className="mt-2 h-20 rounded-lg border border-border bg-card" />
            </div>

            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Content becomes the interface. Supporting columns disappear.
            </p>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="mt-10 grid gap-6 border-t border-border pt-8 md:grid-cols-2 lg:grid-cols-4">
        <ResponsiveRule
          title="Content first"
          text="Never shrink the main feed just to preserve secondary sidebars."
        />

        <ResponsiveRule
          title="Touch targets"
          text="Interactive controls should remain comfortably tappable on mobile."
        />

        <ResponsiveRule
          title="Flexible media"
          text="Images should scale with their container and never introduce horizontal overflow."
        />

        <ResponsiveRule
          title="Preserve actions"
          text="Creation, navigation, search, and profile access must remain available when sidebars disappear."
        />
      </div>

      {/* Principle */}
      <div className="mt-10 grid gap-8 border-l-2 border-primary bg-primary/[0.04] px-6 py-7 dark:border-accent-warm dark:bg-accent-warm/[0.04] lg:grid-cols-[0.7fr_1.3fr]">
        <p className="font-section text-base font-bold uppercase tracking-[0.12em] text-primary dark:text-accent-warm">
          Responsive rule
        </p>

        <p className="max-w-3xl text-xl leading-8 tracking-[-0.02em]">
          Remove supporting context before reducing primary content.
          <span className="text-muted-foreground">
            {" "}
            The feed, post, or project should always remain the focus.
          </span>
        </p>
      </div>
    </section>
  );
}

function DeviceRule({
  icon,
  label,
  range,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  range: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-accent-warm/10 dark:text-accent-warm">
        {icon}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <p className="text-sm font-semibold">
          {label}
        </p>

        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
          {range}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function ResponsiveRule({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div>
      <p className="font-section text-xs font-bold uppercase tracking-[0.12em] text-primary dark:text-accent-warm">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}