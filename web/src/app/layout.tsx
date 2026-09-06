import type { Metadata } from "next";
import {
  Anton,
  IBM_Plex_Mono,
  Manrope,
  Source_Code_Pro,
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

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "DevLog | Build in Motion",
    template: "%s | DevLog",
  },

  description:
    "DevLog is a platform for developers to document projects, share development progress, and show the journey behind what they build.",

  keywords: [
    "DevLog",
    "developer projects",
    "development logs",
    "build in public",
    "developer portfolio",
    "developer community",
    "software development",
    "software projects",
    "coding projects",
    "project progress",
  ],

  applicationName: "DevLog",

  authors: [
    {
      name: "Alisha",
    },
  ],

  creator: "Alisha",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "DevLog",
    title: "DevLog | Build in Motion",
    description:
      "Projects show what you built. DevLogs show how you got there.",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevLog Build in Motion",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DevLog | Build in Motion",
    description:
      "Projects show what you built. DevLogs show how you got there.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          manrope.variable,
          ibmPlexMono.variable,
          anton.variable,
          sourceCodePro.variable,
          "min-h-screen bg-background font-sans text-foreground antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}