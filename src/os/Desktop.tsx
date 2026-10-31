"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { FileText, Folder, IdCard, NotebookText } from "lucide-react";
import { deployments } from "@/data/deployments";
import { site } from "@/data/site";
import Dock from "./Dock";
import MenuBar from "./MenuBar";
import Window from "./Window";
import { fmtTime, useNow } from "./hooks";
import { useOS, type AppId } from "./store";

const desktopFiles: { id: AppId; label: string; Icon: typeof Folder; color: string; arg?: string }[] = [
  { id: "resume", label: "Resume.pdf", Icon: FileText, color: "#e5484d" },
  { id: "card", label: "Card.vcf", Icon: IdCard, color: "#18181b" },
  { id: "deployments", label: "Deployments", Icon: Folder, color: "#2f6bff" },
  { id: "pictures", label: "Pictures", Icon: Folder, color: "#2f6bff" },
  { id: "process", label: "how-i-work.md", Icon: NotebookText, color: "#8b5cf6" },
];

function Widgets() {
  const { open } = useOS();
  const now = useNow(15_000);
  const current = deployments.filter((d) => d.period.includes("Present"));
  return (
    <div className="widgets">
      <button className="widget widget-profile" onClick={() => open("about")}>
        <div className="wp-avatar">BN</div>
        <div>
          <b>{site.name}</b>
          <span>{site.role}</span>
        </div>
        <div className="wp-status">
          <i /> {site.availability.label}
        </div>
        <div className="wp-modes">
          {site.engagementModes.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </button>

      <div className="widget widget-clock">
        <span className="wc-label">In Enugu it&apos;s</span>
        <span className="wc-time">{now ? fmtTime(now, site.timezone) : "--:--"}</span>
        <span className="wc-sub">{site.timezoneLabel} · overlaps UK & EU hours</span>
      </div>

      <div className="widget widget-now">
        <span className="wc-label">Currently deployed at</span>
        {current.map((d) => (
          <button key={d.id} onClick={() => open("deployments", d.id)}>
            <i style={{ background: d.color }} />
            <b>{d.client}</b>
            <span>{d.role.split("·")[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Desktop() {
  const { windows, open, close, focused, lock } = useOS();
  const bounds = useRef<HTMLDivElement>(null);
  const opened = useRef(false);

  useEffect(() => {
    if (opened.current) return;
    opened.current = true;
    const t = setTimeout(() => open("about"), 350);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w" && focused) {
        e.preventDefault();
        close(focused);
      }
      if (e.key === "Escape" && focused && focused !== "terminal") close(focused);
      if (e.ctrlKey && e.metaKey && e.key.toLowerCase() === "q") lock();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [focused, close, lock]);

  return (
    <div className="desktop">
      <MenuBar />
      <div className="desktop-area" ref={bounds}>
        <Widgets />
        <div className="desk-files">
          {desktopFiles.map((f) => (
            <button key={f.label} className="desk-file" onDoubleClick={() => open(f.id, f.arg)} onClick={(e) => (e.detail === 0 || window.matchMedia("(pointer: coarse)").matches) && open(f.id, f.arg)}>
              <span className="desk-file-icon" style={{ color: f.color }}>
                <f.Icon size={38} strokeWidth={1.3} fill="currentColor" fillOpacity={0.12} />
              </span>
              <span className="desk-file-label">{f.label}</span>
            </button>
          ))}
          <span className="desk-hint">double-click to open</span>
        </div>
      </div>
      <AnimatePresence>
        {windows.map((w, i) => (
          <Window key={w.id} win={w} bounds={bounds} index={i} />
        ))}
      </AnimatePresence>
      <Dock />
    </div>
  );
}
