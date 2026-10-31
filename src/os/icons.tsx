"use client";

import {
  Briefcase,
  FileText,
  IdCard,
  Images,
  Mail,
  MessageCircle,
  NotebookPen,
  Rocket,
  Route,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import type { AppId } from "./store";

export function GithubGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.98 3.23 9.2 7.71 10.69.56.1.77-.24.77-.54v-1.9c-3.14.68-3.8-1.52-3.8-1.52-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.22.71-1.5-2.5-.28-5.14-1.25-5.14-5.58 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.7 10.7 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.69.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.34-2.64 5.3-5.16 5.57.4.35.76 1.04.76 2.1v3.11c0 .3.2.65.78.54a11.26 11.26 0 0 0 7.7-10.69C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function TerminalGlyph({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 7l5 5-5 5" stroke="#4ade80" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 17h7" stroke="#e5e7eb" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** A calendar icon that always shows today's date, like macOS. */
function CalendarGlyph({ size }: { size: number }) {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "short" });
  return (
    <div className="cal-glyph" style={{ fontSize: size }}>
      <span className="cal-glyph-day">{day}</span>
      <span className="cal-glyph-date">{now.getDate()}</span>
    </div>
  );
}

type IconSpec = { bg: string; Icon?: LucideIcon; custom?: "calendar" | "terminal" | "github" | "linkedin"; fg?: string };

export const iconSpecs: Record<AppId | "mail" | "github" | "linkedin", IconSpec> = {
  about: { bg: "linear-gradient(160deg,#fff3b0 0%,#ffd43b 45%,#f5a623 100%)", Icon: NotebookPen, fg: "#6b4b00" },
  deployments: { bg: "linear-gradient(160deg,#6ea8ff 0%,#2f6bff 55%,#1d3fd1 100%)", Icon: Rocket },
  services: { bg: "linear-gradient(160deg,#5eead4 0%,#14b8a6 50%,#0f766e 100%)", Icon: Briefcase },
  process: { bg: "linear-gradient(160deg,#c4b5fd 0%,#8b5cf6 50%,#5b21b6 100%)", Icon: Route },
  messages: { bg: "linear-gradient(160deg,#86efac 0%,#22c55e 55%,#15803d 100%)", Icon: MessageCircle },
  booking: { bg: "#ffffff", custom: "calendar" },
  card: { bg: "linear-gradient(160deg,#3a3a40 0%,#18181b 100%)", Icon: IdCard },
  resume: { bg: "linear-gradient(160deg,#ffffff 0%,#e7e9ee 100%)", Icon: FileText, fg: "#e5484d" },
  terminal: { bg: "linear-gradient(160deg,#2b2b30 0%,#0b0b0d 100%)", custom: "terminal" },
  pictures: { bg: "linear-gradient(160deg,#fde68a 0%,#fb923c 35%,#ec4899 70%,#8b5cf6 100%)", Icon: Images },
  trash: { bg: "linear-gradient(160deg,#f4f4f5 0%,#c9cad1 100%)", Icon: Trash2, fg: "#52525b" },
  aboutThis: { bg: "linear-gradient(160deg,#6ea8ff 0%,#2f6bff 100%)", Icon: NotebookPen },
  mail: { bg: "linear-gradient(160deg,#7cc4ff 0%,#1a8cff 60%,#0060df 100%)", Icon: Mail },
  github: { bg: "linear-gradient(160deg,#3f3f46 0%,#09090b 100%)", custom: "github" },
  linkedin: { bg: "linear-gradient(160deg,#3b9cff 0%,#0a66c2 100%)", custom: "linkedin" },
};

export function AppIcon({ id, size = 52 }: { id: keyof typeof iconSpecs; size?: number }) {
  const spec = iconSpecs[id];
  const glyph = Math.round(size * 0.5);
  return (
    <div
      className="app-icon"
      style={{ width: size, height: size, background: spec.bg, color: spec.fg ?? "#fff", borderRadius: size * 0.23 }}
    >
      {spec.Icon && <spec.Icon size={glyph} strokeWidth={2} />}
      {spec.custom === "calendar" && <CalendarGlyph size={size} />}
      {spec.custom === "terminal" && <TerminalGlyph size={glyph} />}
      {spec.custom === "github" && <GithubGlyph size={glyph} />}
      {spec.custom === "linkedin" && <LinkedinGlyph size={glyph} />}
    </div>
  );
}
