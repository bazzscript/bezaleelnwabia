"use client";

import { useEffect } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ChevronUp, Lock } from "lucide-react";
import { site } from "@/data/site";
import { useNow } from "./hooks";

const notifications = [
  {
    app: "Calendar",
    color: "#e5484d",
    title: site.availability.label,
    body: site.availability.detail,
    time: "now",
  },
  {
    app: "Deploy",
    color: "#22c55e",
    title: "✅ Production deploy succeeded",
    body: "Zero downtime. Paying users didn't notice a thing.",
    time: "2m ago",
  },
  {
    app: "Mum",
    color: "#a855f7",
    title: "Mum 💜",
    body: "Have you eaten? Don't let laptop finish you o.",
    time: "1h ago",
  },
];

export default function LockScreen({ onUnlock, mobile }: { onUnlock: () => void; mobile: boolean }) {
  const now = useNow(1000);

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
        {notifications.map((n, i) => (
          <motion.div
            key={n.app}
            className="lock-note"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.25, type: "spring", stiffness: 260, damping: 24 }}
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
