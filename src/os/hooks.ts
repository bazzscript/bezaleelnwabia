"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const i = setInterval(tick, intervalMs);
    return () => {
      clearTimeout(first);
      clearInterval(i);
    };
  }, [intervalMs]);
  return now;
}

/** Returns null during server render, then the live match result. */
export function useMedia(query: string) {
  return useSyncExternalStore<boolean | null>(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => null
  );
}

export const fmtTime = (d: Date, tz?: string) =>
  d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz });
