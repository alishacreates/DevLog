import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Manrope,
  Newsreader,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "DevLog — Build in public",
  description:
    "Share what you are building, follow developer journeys, and grow through visible progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          manrope.variable,
          ibmPlexMono.variable,
          newsreader.variable,
          "min-h-screen bg-background font-sans text-foreground antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}