import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./os.css";
import "./apps.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bezaleelnwabia.vercel.app"),
  title: "Bezaleel Nwabia — AI Engineer | AI Solutions Engineer | Forward Deployed Engineer",
  description:
    "AI Engineer, AI Solutions Engineer and Forward Deployed Engineer. I build AI agents, voice assistants and RAG systems that run in production. Open to full-time roles and consulting.",
  openGraph: {
    title: "Bezaleel Nwabia — AI Engineer | AI Solutions Engineer | Forward Deployed Engineer",
    description: "I build AI agents, voice assistants and RAG systems that run in production.",
    url: "https://bezaleelnwabia.vercel.app",
    siteName: "Bezaleel Nwabia",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Bezaleel Nwabia — AI Engineer | AI Solutions Engineer | Forward Deployed Engineer" },
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
