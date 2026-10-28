"use client";

import { useEffect, useRef, useState } from "react";
import { BatteryFull, CalendarDays, Moon, Sun, Wifi } from "lucide-react";
import { site } from "@/data/site";
import { apps } from "./registry";
import { useOS, type AppId } from "./store";
import { useNow } from "./hooks";

type Menu = { label: string; items: ({ label: string; action: () => void; hint?: string } | "sep")[] };

export default function MenuBar() {
  const { focused, open, lock, closeAll, theme, setTheme } = useOS();
  const now = useNow(10_000);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("pointerdown", h);
    return () => window.removeEventListener("pointerdown", h);
  }, []);

  const go = (id: AppId, arg?: string) => () => {
    open(id, arg);
    setOpenMenu(null);
  };

  const menus: Menu[] = [
    {
      label: "BN",
      items: [
        { label: "About This Bezaleel", action: go("aboutThis") },
        "sep",
        { label: "Light / Dark", action: () => setTheme(theme === "dark" ? "light" : "dark") },
        { label: "Close All Windows", action: () => (closeAll(), setOpenMenu(null)) },
        "sep",
        { label: "Lock Screen", action: () => (lock(), setOpenMenu(null)), hint: "⌃⌘Q" },
      ],
    },
    {
      label: "Work",
      items: [
        { label: "Ways to work with me", action: go("services") },
        { label: "How a deployment runs", action: go("process") },
        { label: "Book an intro call", action: go("booking") },
      ],
    },
    {
      label: "Deployments",
      items: [
        { label: "Secondo", action: go("deployments", "secondo") },
        { label: "MealCondo", action: go("deployments", "mealcondo") },
        { label: "PassOncology", action: go("deployments", "passoncology") },
        { label: "DevotionHub", action: go("deployments", "devotionhub") },
        { label: "Dadofood", action: go("deployments", "dadofood") },
        "sep",
        { label: "All deployments…", action: go("deployments") },
      ],
    },
    {
      label: "Contact",
      items: [
        { label: "Book a call", action: go("booking") },
        { label: `Email ${site.email}`, action: () => window.location.assign(`mailto:${site.email}`) },
        { label: "LinkedIn", action: () => window.open(site.links.linkedin, "_blank") },
        { label: "GitHub", action: () => window.open(site.links.github, "_blank") },
        "sep",
        { label: "My card", action: go("card") },
        { label: "Resume", action: go("resume") },
      ],
    },
  ];

  return (
    <div className="menubar" ref={ref}>
      <div className="menubar-left">
        {menus.map((m, i) => (
          <div key={m.label} className="menu" onPointerEnter={() => openMenu && setOpenMenu(m.label)}>
            <button
              className={`menu-btn ${i === 0 ? "menu-logo" : ""} ${openMenu === m.label ? "on" : ""}`}
              onClick={() => setOpenMenu(openMenu === m.label ? null : m.label)}
            >
              {m.label}
            </button>
            {i === 0 && <span className="menu-app">{focused ? apps[focused].label : "Finder"}</span>}
            {openMenu === m.label && (
              <div className="menu-pop">
                {m.items.map((it, j) =>
                  it === "sep" ? (
                    <hr key={j} />
                  ) : (
                    <button key={it.label} onClick={it.action}>
                      {it.label}
                      {it.hint && <span>{it.hint}</span>}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="menubar-right">
        <span className="menubar-status">
          <i /> {site.availability.label}
        </span>
        <button className="menubar-icon" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <Wifi size={15} className="menubar-hide-sm" />
        <BatteryFull size={18} className="menubar-hide-sm" />
        <span className="menubar-clock">
          {now &&
            `${now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}  ${now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`}
        </span>
        <button className="menubar-cta" onClick={go("booking")}>
          <CalendarDays size={13} /> Book a call
        </button>
      </div>
    </div>
  );
}
