"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { site } from "@/data/site";
import { AppIcon, iconSpecs } from "./icons";
import { apps, dockApps } from "./registry";
import { useOS, type AppId } from "./store";

const BASE = 50;
const MAX = Math.round(BASE * 1.55);

function DockItem({
  mouseX,
  icon,
  label,
  running,
  onClick,
  href,
}: {
  mouseX: MotionValue<number>;
  icon: keyof typeof iconSpecs;
  label: string;
  running?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dist = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect();
    if (!b || x === Infinity) return 999;
    return x - (b.left + b.width / 2);
  });
  const sizeRaw = useTransform(dist, [-150, 0, 150], [BASE, BASE * 1.55, BASE]);
  const size = useSpring(sizeRaw, { stiffness: 400, damping: 28, mass: 0.2 });
  const scale = useTransform(size, (v) => v / MAX);

  const inner = (
    <>
      <motion.div style={{ width: size, height: size }} className="dock-icon-wrap">
        <motion.div className="dock-icon-inner" style={{ scale }}>
          <AppIcon id={icon} size={MAX} />
        </motion.div>
      </motion.div>
      <span className="dock-label">{label}</span>
      {running && <span className="dock-dot" />}
    </>
  );

  return (
    <div ref={ref} className="dock-item">
      {href ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label}>
          {inner}
        </a>
      ) : (
        <button onClick={onClick} aria-label={label}>
          {inner}
        </button>
      )}
    </div>
  );
}

export default function Dock() {
  const { open, windows } = useOS();
  const mouseX = useMotionValue(Infinity);
  const isRunning = (id: AppId) => windows.some((w) => w.id === id);

  return (
    <nav className="dock-shell" aria-label="Dock">
      <motion.div className="dock" onMouseMove={(e) => mouseX.set(e.clientX)} onMouseLeave={() => mouseX.set(Infinity)}>
        {dockApps.map((id) => (
          <DockItem key={id} mouseX={mouseX} icon={id} label={apps[id].label} running={isRunning(id)} onClick={() => open(id)} />
        ))}
        <span className="dock-sep" />
        <DockItem mouseX={mouseX} icon="mail" label="Email me" href={`mailto:${site.email}`} />
        <DockItem mouseX={mouseX} icon="linkedin" label="LinkedIn" href={site.links.linkedin} />
        <DockItem mouseX={mouseX} icon="github" label="GitHub" href={site.links.github} />
        <span className="dock-sep" />
        <DockItem mouseX={mouseX} icon="trash" label="Trash" running={isRunning("trash")} onClick={() => open("trash")} />
      </motion.div>
    </nav>
  );
}
