import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./os.css";
import "./apps.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bezaleelnwabia.vercel.app"),
  title: "Bezaleel Nwabia — Forward Deployed Engineer",
  description:
    "I embed with your team, find the real problem, and ship the software — usually with AI — that fixes it. Available for consulting, part-time and full-time roles.",
  openGraph: {
    title: "Bezaleel Nwabia — Forward Deployed Engineer",
    description: "I embed with your team, find the real problem, and ship the software that fixes it.",
    url: "https://bezaleelnwabia.vercel.app",
    siteName: "Bezaleel Nwabia",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Bezaleel Nwabia — Forward Deployed Engineer" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1ece6" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b12" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
