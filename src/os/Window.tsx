"use client";

import { motion, useDragControls } from "framer-motion";
import { useMemo, type RefObject } from "react";
import { apps } from "./registry";
import { useOS, type WinState } from "./store";

const MENU_H = 28;
const DOCK_SPACE = 92;

export default function Window({ win, bounds, index }: { win: WinState; bounds: RefObject<HTMLDivElement | null>; index: number }) {
  const { close, focus, minimize, toggleMax, focused } = useOS();
  const app = apps[win.id];
  const controls = useDragControls();
  const isFocused = focused === win.id;

  // Initial position: centred-ish, cascaded so windows don't stack exactly.
  const { x, y, w, h } = useMemo(() => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const w = Math.min(app.size[0], vw - 40);
    const h = Math.min(app.size[1], vh - MENU_H - DOCK_SPACE - 20);
    const offset = (index % 5) * 28;
    // Free space between the widgets (left, ~390px) and desktop files (right, ~120px)
    const left = vw > 1000 ? 390 : 20;
    const right = vw - 120;
    const free = right - left;
    const cx = free >= w ? left + (free - w) / 2 : (vw - w) / 2;
    return {
      w,
      h,
      x: Math.max(20, Math.min(cx + offset, vw - w - 20)),
      y: Math.max(MENU_H + 12, (vh - DOCK_SPACE - h) / 2 - 10 + offset),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Comp = app.Component;

  return (
    <motion.div
      className={`window ${app.dark ? "window-dark" : ""} ${isFocused ? "focused" : ""} ${win.maximized ? "maximized" : ""} win-${win.id}`}
      style={{
        zIndex: win.z,
        width: win.maximized ? "100vw" : w,
        height: win.maximized ? `calc(100dvh - ${MENU_H}px - ${DOCK_SPACE - 8}px)` : h,
        left: win.maximized ? 0 : x,
        top: win.maximized ? MENU_H : y,
        pointerEvents: win.minimized ? "none" : "auto",
      }}
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={
        win.minimized
          ? { opacity: 0, scale: 0.3, y: 400 }
          : win.maximized
            ? { opacity: 1, scale: 1, x: 0, y: 0 }
            : { opacity: 1, scale: 1, y: 0 }
      }
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      drag={!win.maximized}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={bounds}
      dragElastic={0.05}
      onPointerDown={() => !isFocused && focus(win.id)}
      role="dialog"
      aria-label={app.label}
    >
      <div
        className="titlebar"
        onPointerDown={(e) => controls.start(e)}
        onDoubleClick={() => toggleMax(win.id)}
      >
        <div className="traffic" onPointerDown={(e) => e.stopPropagation()}>
          <button className="tl tl-close" aria-label="Close" onClick={() => close(win.id)} />
          <button className="tl tl-min" aria-label="Minimise" onClick={() => minimize(win.id)} />
          <button className="tl tl-max" aria-label="Maximise" onClick={() => toggleMax(win.id)} />
        </div>
        <div className="titlebar-title">{app.title}</div>
      </div>
      <div className="window-body">
        <Comp arg={win.arg} />
      </div>
    </motion.div>
  );
}
