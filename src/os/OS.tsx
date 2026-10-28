"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Desktop from "./Desktop";
import LockScreen from "./LockScreen";
import MobileHome from "./MobileHome";
import { OSProvider } from "./store";
import { useMedia } from "./hooks";

type Theme = "light" | "dark";

function safeGet(store: "local" | "session", key: string) {
  try {
    return (store === "local" ? localStorage : sessionStorage).getItem(key);
  } catch {
    return null;
  }
}
function safeSet(store: "local" | "session", key: string, v: string | null) {
  try {
    const s = store === "local" ? localStorage : sessionStorage;
    if (v === null) s.removeItem(key);
    else s.setItem(key, v);
  } catch {}
}

export default function OS() {
  const mobile = useMedia("(max-width: 767px)");
  const [locked, setLocked] = useState(true);
  const [theme, setThemeState] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = safeGet("local", "bn-theme") as Theme | null;
    const sys = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    // Browser-only state (storage, system theme) can only be read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(saved ?? sys);
    // Returning visitors in the same tab skip the lock screen.
    if (safeGet("session", "bn-unlocked") === "1" || new URLSearchParams(location.search).has("unlocked")) setLocked(false);
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    safeSet("local", "bn-theme", t);
  }, []);

  const unlock = useCallback(() => {
    setLocked(false);
    safeSet("session", "bn-unlocked", "1");
  }, []);
  const lock = useCallback(() => {
    setLocked(true);
    safeSet("session", "bn-unlocked", null);
  }, []);

  if (!ready || mobile === null) return <div className="boot" />;

  return (
    <OSProvider onLock={lock} theme={theme} setTheme={setTheme}>
      <div className="os-root">
        {!locked && (mobile ? <MobileHome /> : <Desktop />)}
        <AnimatePresence>{locked && <LockScreen key="lock" onUnlock={unlock} mobile={mobile} />}</AnimatePresence>
      </div>
    </OSProvider>
  );
}
