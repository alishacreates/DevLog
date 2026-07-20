import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";

export function ActionsSection() {
  return (
    <section className="border-b border-border py-16">
      <SectionHeader
        eyebrow="Actions"
        title="Buttons and links"
        description="Actions should be direct, readable, and consistent. Navigation uses links styled with button variants."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-semibold">Button hierarchy</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button>
              <Plus className="size-4" />
              Share update
            </Button>

            <Button variant="outline">Explore builders</Button>

            <Button variant="secondary">Save draft</Button>

            <Button variant="ghost">Cancel</Button>

            <Button variant="destructive">Delete</Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-semibold">Navigation actions</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#" className={buttonVariants()}>
              Join DevLog
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="#"
              className={buttonVariants({ variant: "outline" })}
            >
              View profile
            </Link>

            <Link
              href="#"
              className={buttonVariants({ variant: "ghost" })}
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}