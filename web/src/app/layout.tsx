import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Manrope,
  Newsreader,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Anton } from "next/font/google";
import { Source_Code_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

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

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          manrope.variable,
          ibmPlexMono.variable,
          newsreader.variable,
          anton.variable,
          sourceCodePro.variable,
          "min-h-screen bg-background font-sans text-foreground antialiased"
          
        )}
      >
        <ThemeProvider>
      {children}
    </ThemeProvider>
      </body>
    </html>
  );
}