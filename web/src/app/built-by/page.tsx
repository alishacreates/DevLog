import { BuiltByContent } from "@/features/landing/closing/built-by-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Built By",
  description:
    "Meet the developer behind DevLog and explore the work behind building the platform.",
};
export default function BuiltByPage() {
  return <BuiltByContent />;
}