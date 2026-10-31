"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Folder,
  Image as ImageIcon,
  LayoutGrid,
  List,
  Monitor,
  X,
} from "lucide-react";
import { pictures, type Picture } from "@/data/pictures.generated";
import { useOS } from "../store";

const fmtSize = (b: number) => (b < 1024 * 1024 ? `${Math.round(b / 1024)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);
const kind = (name: string) => `${name.split(".").pop()?.toUpperCase()} image`;

/** Full-screen Quick Look style viewer. Arrow keys / swipe to move, Esc or Space to close. */
function QuickLook({ index, setIndex, onClose }: { index: number; setIndex: (i: number) => void; onClose: () => void }) {
  const pic = pictures[index];
  const count = pictures.length;
  const go = useCallback((d: number) => setIndex((index + d + count) % count), [index, count, setIndex]);

  useEffect(() => {
    // Capture phase so Esc closes the viewer, not the whole window behind it.
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else return;
      e.preventDefault();
      e.stopImmediatePropagation();
    };
    window.addEventListener("keydown", k, true);
    return () => window.removeEventListener("keydown", k, true);
  }, [go, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
    else if (info.offset.y > 120) onClose();
  };

  return createPortal(
    <motion.div
      className="ql"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-label={pic.name}
    >
      <motion.div
        className="ql-panel"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ql-bar">
          <button className="ql-btn" onClick={onClose} aria-label="Close">
            <X size={15} />
          </button>
          <div className="ql-title">
            <b>{pic.name}</b>
            <span>
              {index + 1} of {count} · {fmtSize(pic.size)}
            </span>
          </div>
          <a className="ql-btn" href={pic.src} download aria-label="Download">
            <Download size={15} />
          </a>
        </div>

        <div className="ql-stage">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={pic.src}
              src={pic.src}
              alt={pic.name}
              className="ql-img"
              draggable={false}
              drag
              dragSnapToOrigin
              dragElastic={0.6}
              onDragEnd={onDragEnd}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
          </AnimatePresence>
          {count > 1 && (
            <>
              <button className="ql-nav ql-prev" onClick={() => go(-1)} aria-label="Previous picture">
                <ChevronLeft size={22} />
              </button>
              <button className="ql-nav ql-next" onClick={() => go(1)} aria-label="Next picture">
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Pictures() {
  const { focused } = useOS();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [zoom, setZoom] = useState(140);
  const [selected, setSelected] = useState<number | null>(null);
  const [viewing, setViewing] = useState<number | null>(null);

  const openPic = (i: number) => {
    setSelected(i);
    setViewing(i);
  };
  // Single tap opens on touch screens; mouse users click to select, double-click to open.
  const onItemClick = (i: number) => {
    if (window.matchMedia("(pointer: coarse)").matches) openPic(i);
    else setSelected(i);
  };

  // Finder keys: Space previews the selection, arrows move it.
  useEffect(() => {
    if (viewing !== null || focused !== "pictures") return;
    const k = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea")) return;
      if (e.key === " " && selected !== null) {
        e.preventDefault();
        setViewing(selected);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setSelected((s) => (s === null ? 0 : Math.min(s + 1, pictures.length - 1)));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setSelected((s) => (s === null ? 0 : Math.max(s - 1, 0)));
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [selected, viewing, focused]);

  const sidebar: { label: string; Icon: typeof Folder; active?: boolean }[] = [
    { label: "Recents", Icon: Clock },
    { label: "Desktop", Icon: Monitor },
    { label: "Pictures", Icon: ImageIcon, active: true },
  ];

  return (
    <div className="pics">
      <aside className="pics-side">
        <span className="pics-side-head">Favourites</span>
        {sidebar.map((s) => (
          <div key={s.label} className={`pics-side-item ${s.active ? "active" : ""}`}>
            <s.Icon size={15} />
            {s.label}
          </div>
        ))}
      </aside>

      <div className="pics-main">
        <div className="pics-bar">
          <div className="pics-arrows" aria-hidden>
            <ChevronLeft size={18} />
            <ChevronRight size={18} />
          </div>
          <b className="pics-title">Pictures</b>
          <div className="pics-tools">
            {view === "grid" && (
              <input
                type="range"
                min={90}
                max={240}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                aria-label="Thumbnail size"
                className="pics-zoom"
              />
            )}
            <div className="pics-seg">
              <button className={view === "grid" ? "on" : ""} onClick={() => setView("grid")} aria-label="Icon view">
                <LayoutGrid size={14} />
              </button>
              <button className={view === "list" ? "on" : ""} onClick={() => setView("list")} aria-label="List view">
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="pics-body" onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
          {pictures.length === 0 ? (
            <div className="pics-empty">This folder is empty.</div>
          ) : view === "grid" ? (
            <div
              className="pics-grid"
              style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${zoom}px, 1fr))` }}
              onClick={(e) => e.target === e.currentTarget && setSelected(null)}
            >
              {pictures.map((p: Picture, i) => (
                <button
                  key={p.src}
                  className={`pics-item ${selected === i ? "sel" : ""}`}
                  onClick={() => onItemClick(i)}
                  onDoubleClick={() => openPic(i)}
                >
                  <span className="pics-thumb" style={{ height: zoom }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={p.name} loading="lazy" draggable={false} />
                  </span>
                  <span className="pics-name">{p.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="pics-list" role="table">
              <div className="pics-row pics-row-head" role="row">
                <span>Name</span>
                <span>Size</span>
                <span>Kind</span>
              </div>
              {pictures.map((p, i) => (
                <button
                  key={p.src}
                  role="row"
                  className={`pics-row ${selected === i ? "sel" : ""}`}
                  onClick={() => onItemClick(i)}
                  onDoubleClick={() => openPic(i)}
                >
                  <span className="pics-row-name">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt="" loading="lazy" draggable={false} />
                    {p.name}
                  </span>
                  <span>{fmtSize(p.size)}</span>
                  <span>{kind(p.name)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pics-status">
          {selected !== null ? `1 of ${pictures.length} selected · Space to preview` : `${pictures.length} items`}
        </div>
      </div>

      <AnimatePresence>
        {viewing !== null && (
          <QuickLook
            index={viewing}
            setIndex={(i) => {
              setViewing(i);
              setSelected(i);
            }}
            onClose={() => setViewing(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
