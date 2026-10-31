"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronUp, Lock } from "lucide-react";
import { site } from "@/data/site";
import { useNow } from "./hooks";

type Note = { id: string; app: string; color: string; title: string; body: string; time?: string };

// Mum's message depends on the visitor's time of day.
const mumNote = (hour: number): Note => {
  const body =
    hour < 5
      ? "Why is your light still on by this time? Go and sleep."
      : hour < 12
        ? "Good morning. Did you pray before opening that laptop?"
        : hour < 17
          ? "Have you eaten? Don't let laptop finish you o."
          : hour < 21
            ? "Are you coming home for dinner or are you still coding?"
            : "Close the laptop. The bugs will still be there tomorrow.";
  return { id: "mum", app: "Mum", color: "#a855f7", title: "Mum 💜", body };
};

// Pool of notifications. A few are picked at random on every visit.
const pool: Note[] = [
  { id: "deploy", app: "Deploy", color: "#22c55e", title: "✅ Production deploy succeeded", body: "Zero downtime. Paying users didn't notice a thing." },
  { id: "clara", app: "Seocondo", color: "#7c5cff", title: "Clara published a new post", body: "Researched, written, fact-checked and live. Nobody had to lift a finger." },
  { id: "gsc", app: "Search Console", color: "#4285f4", title: "📈 Impressions up 38% this week", body: "Seocondo's feedback loop is doing its thing." },
  { id: "meal", app: "MealCondo", color: "#ff7a1a", title: "New meal plan generated", body: "Built around your diet. The AI only used our own recipes." },
  { id: "ci", app: "GitHub", color: "#6e7681", title: "All checks have passed", body: "main · 42 tests green. Merging with confidence." },
  { id: "pager", app: "Uptime", color: "#14b8a6", title: "30 days, 0 incidents", body: "Nobody got paged at 3am this month." },
  { id: "michael", app: "Support", color: "#e5486b", title: "Michael drafted 12 replies", body: "Waiting for a human to approve. The inbox is under control." },
  { id: "client", app: "Messages", color: "#0ea5e9", title: "New message from a founder", body: "\"Can you build this for us? We need it yesterday.\"" },
  { id: "coffee", app: "Reminders", color: "#f59e0b", title: "☕ Coffee", body: "You've been in flow for 3 hours. Hydrate." },
  { id: "railway", app: "Railway", color: "#8b5cf6", title: "Cron jobs ran on schedule", body: "5 of 5 jobs succeeded overnight." },
  { id: "pr", app: "GitHub", color: "#6e7681", title: "Code review requested", body: "\"This is clean. Ship it.\"" },
];

const ago = ["2m ago", "9m ago", "24m ago", "1h ago", "3h ago"];

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const calendarNote: Note = {
  id: "calendar",
  app: "Calendar",
  color: "#e5484d",
  title: site.availability.label,
  body: site.availability.detail,
  time: "now",
};

const MAX_VISIBLE = 3;
const ARRIVAL_MS = 6000;

// Builds the visit's notification order: availability first, then a shuffled mix including Mum.
function buildQueue(): Note[] {
  const mixed = shuffle([...pool, mumNote(new Date().getHours())]);
  return [calendarNote, ...mixed];
}

export default function LockScreen({ onUnlock, mobile }: { onUnlock: () => void; mobile: boolean }) {
  const now = useNow(1000);
  const [notes, setNotes] = useState<Note[]>([]);
  const [rotating, setRotating] = useState(false);

  // Picked after mount so server and client render the same HTML.
  // Shows three at first, then a new one slides in every few seconds.
  useEffect(() => {
    const queue = buildQueue();
    let next = 3;
    const first = setTimeout(
      () => setNotes(queue.slice(0, 3).map((n, i) => ({ ...n, time: n.time ?? ago[i + 1] }))),
      0
    );
    const timer = setInterval(() => {
      const n = queue[next % queue.length];
      next++;
      setRotating(true);
      setNotes((prev) => {
        // Older "now" notes age to "2m ago" once a newer one arrives.
        const older = prev
          .filter((p) => p.id !== n.id)
          .map((p) => (p.time === "now" ? { ...p, time: ago[0] } : p));
        return [{ ...n, time: "now" }, ...older].slice(0, MAX_VISIBLE);
      });
    }, ARRIVAL_MS);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Tab" || e.metaKey || e.ctrlKey) return;
      onUnlock();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onUnlock]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y < -80 || info.velocity.y < -400) onUnlock();
  };

  return (
    <motion.div
      className="lock"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.55, ease: [0.7, 0, 0.3, 1] } }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.5, bottom: 0 }}
      onDragEnd={onDragEnd}
    >
      <div className="wallpaper" />
      <div className="lock-top">
        <Lock size={16} />
        <div className="lock-date">
          {now ? now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }) : " "}
        </div>
        <div className="lock-time">{now ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : " "}</div>
      </div>

      <div className="lock-notes">
        <AnimatePresence initial={false} mode="popLayout">
        {notes.map((n, i) => (
          <motion.div
            key={n.id}
            layout
            className="lock-note"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ delay: rotating ? 0 : 0.5 + i * 0.25, type: "spring", stiffness: 260, damping: 24 }}
          >
            <span className="lock-note-icon" style={{ background: n.color }}>
              {n.app[0]}
            </span>
            <div>
              <div className="lock-note-top">
                <b>{n.title}</b>
                <span>{n.time}</span>
              </div>
              <p>{n.body}</p>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>

      <button className="lock-user" onClick={onUnlock}>
        <span className="lock-avatar">BN</span>
        <span className="lock-name">{site.name}</span>
        <span className="lock-role">{site.role}</span>
        <span className="lock-enter">
          {mobile ? "Tap to unlock" : "Click or press any key to enter"} <span aria-hidden>→</span>
        </span>
      </button>

      <button className="lock-swipe" onClick={onUnlock} aria-label="Unlock">
        <ChevronUp size={18} />
        Swipe up to unlock
      </button>
    </motion.div>
  );
}
