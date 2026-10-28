"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

export type AppId =
  | "about"
  | "deployments"
  | "services"
  | "process"
  | "messages"
  | "booking"
  | "card"
  | "resume"
  | "terminal"
  | "trash"
  | "aboutThis";

export type WinState = {
  id: AppId;
  z: number;
  minimized: boolean;
  maximized: boolean;
  // Optional payload (e.g. which deployment to open)
  arg?: string;
};

type OSValue = {
  windows: WinState[];
  focused: AppId | null;
  open: (id: AppId, arg?: string) => void;
  close: (id: AppId) => void;
  focus: (id: AppId) => void;
  minimize: (id: AppId) => void;
  toggleMax: (id: AppId) => void;
  closeAll: () => void;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  lock: () => void;
};

const OSContext = createContext<OSValue | null>(null);

export function OSProvider({
  children,
  onLock,
  theme,
  setTheme,
}: {
  children: ReactNode;
  onLock: () => void;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
}) {
  const [windows, setWindows] = useState<WinState[]>([]);
  const topZ = useRef(10);

  const focused = useMemo(() => {
    const visible = windows.filter((w) => !w.minimized);
    if (!visible.length) return null;
    return visible.reduce((a, b) => (a.z > b.z ? a : b)).id;
  }, [windows]);

  const open = useCallback((id: AppId, arg?: string) => {
    const nz = ++topZ.current;
    setWindows((ws) => {
      const existing = ws.find((w) => w.id === id);
      if (existing) {
        return ws.map((w) => (w.id === id ? { ...w, z: nz, minimized: false, arg: arg ?? w.arg } : w));
      }
      return [...ws, { id, z: nz, minimized: false, maximized: false, arg }];
    });
  }, []);

  const focus = useCallback((id: AppId) => {
    const nz = ++topZ.current;
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: nz } : w)));
  }, []);

  const close = useCallback((id: AppId) => setWindows((ws) => ws.filter((w) => w.id !== id)), []);
  const closeAll = useCallback(() => setWindows([]), []);
  const minimize = useCallback(
    (id: AppId) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w))),
    []
  );
  const toggleMax = useCallback(
    (id: AppId) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))),
    []
  );

  const value: OSValue = {
    windows,
    focused,
    open,
    close,
    focus,
    minimize,
    toggleMax,
    closeAll,
    theme,
    setTheme,
    lock: onLock,
  };

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}

export function useOS() {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error("useOS must be used inside OSProvider");
  return ctx;
}
