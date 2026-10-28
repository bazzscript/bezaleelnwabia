"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BatteryFull, ChevronLeft, Signal, Wifi } from "lucide-react";
import { site } from "@/data/site";
import { AppIcon } from "./icons";
import { apps } from "./registry";
import { fmtTime, useNow } from "./hooks";
import { useOS, type AppId } from "./store";

const grid: AppId[] = ["about", "deployments", "services", "process", "messages", "terminal", "resume", "trash"];
const dock: AppId[] = ["booking", "card"];

export default function MobileHome() {
  const { open, close, windows, focused } = useOS();
  const now = useNow(15_000);
  const top = windows.find((w) => w.id === focused);

  return (
    <div className="ios">
      <div className="wallpaper" />
      <div className="ios-status">
        <span>{now ? fmtTime(now) : ""}</span>
        <span className="ios-island" />
        <span className="ios-status-r">
          <Signal size={14} /> <Wifi size={14} /> <BatteryFull size={18} />
        </span>
      </div>

      <div className="ios-scroll">
        <button className="ios-widget" onClick={() => open("about")}>
          <div className="wp-avatar">BN</div>
          <div className="ios-widget-text">
            <b>{site.name}</b>
            <span>{site.role}</span>
          </div>
          <div className="wp-status">
            <i /> {site.availability.label}
          </div>
          <p>{site.tagline}</p>
        </button>
        <div className="ios-ctas">
          <button className="btn btn-primary" onClick={() => open("booking")}>
            Book a call
          </button>
          <button className="btn btn-glow" onClick={() => open("card")}>
            View my card
          </button>
        </div>

        <div className="ios-grid">
          {grid.map((id) => (
            <button key={id} className="ios-app" onClick={() => open(id)}>
              <AppIcon id={id} size={60} />
              <span>{apps[id].label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="ios-dock">
        {dock.map((id) => (
          <button key={id} className="ios-app" onClick={() => open(id)} aria-label={apps[id].label}>
            <AppIcon id={id} size={58} />
          </button>
        ))}
        <a className="ios-app" href={`mailto:${site.email}`} aria-label="Email">
          <AppIcon id="mail" size={58} />
        </a>
        <a className="ios-app" href={site.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <AppIcon id="linkedin" size={58} />
        </a>
      </div>

      <AnimatePresence>
        {top && (
          <motion.div
            key={top.id}
            className={`ios-sheet ${apps[top.id].dark ? "window-dark" : ""}`}
            initial={{ y: "100%", borderRadius: 40 }}
            animate={{ y: 0, borderRadius: 0 }}
            exit={{ y: "100%", borderRadius: 40 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="ios-sheet-bar">
              <button onClick={() => close(top.id)}>
                <ChevronLeft size={20} /> Home
              </button>
              <b>{apps[top.id].label}</b>
              <span />
            </div>
            <div className="ios-sheet-body window-body">
              {(() => {
                const C = apps[top.id].Component;
                return <C arg={top.arg} />;
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
