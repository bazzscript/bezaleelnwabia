"use client";

import type { ComponentType } from "react";
import About from "./apps/About";
import Deployments from "./apps/Deployments";
import Services from "./apps/Services";
import Process from "./apps/Process";
import Messages from "./apps/Messages";
import Booking from "./apps/Booking";
import Card from "./apps/Card";
import Resume from "./apps/Resume";
import Terminal from "./apps/Terminal";
import Trash from "./apps/Trash";
import Pictures from "./apps/Pictures";
import AboutThis from "./apps/AboutThis";
import type { AppId } from "./store";

export type AppDef = {
  id: AppId;
  title: string; // window title
  label: string; // dock / home-screen label
  Component: ComponentType<{ arg?: string }>;
  size: [number, number];
  dark?: boolean; // dark window chrome (terminal)
  resizable?: boolean;
};

export const apps: Record<AppId, AppDef> = {
  about: { id: "about", title: "Notes", label: "About me", Component: About, size: [780, 540] },
  deployments: { id: "deployments", title: "Deployments", label: "Deployments", Component: Deployments, size: [940, 620] },
  services: { id: "services", title: "Work with me", label: "Work with me", Component: Services, size: [960, 640] },
  process: { id: "process", title: "How I work", label: "How I work", Component: Process, size: [720, 600] },
  messages: { id: "messages", title: "Messages", label: "Kind words", Component: Messages, size: [780, 540] },
  booking: { id: "booking", title: "Book a call", label: "Book a call", Component: Booking, size: [880, 620] },
  card: { id: "card", title: "My card", label: "My card", Component: Card, size: [640, 560] },
  resume: { id: "resume", title: "Resume.pdf", label: "Resume", Component: Resume, size: [820, 700] },
  terminal: { id: "terminal", title: "guest — zsh", label: "Terminal", Component: Terminal, size: [700, 440], dark: true },
  pictures: { id: "pictures", title: "Pictures", label: "Pictures", Component: Pictures, size: [860, 580] },
  trash: { id: "trash", title: "Trash", label: "Trash", Component: Trash, size: [600, 420] },
  aboutThis: { id: "aboutThis", title: "", label: "About This Bezaleel", Component: AboutThis, size: [340, 470] },
};

export const dockApps: AppId[] = ["about", "deployments", "services", "process", "messages", "booking", "card", "resume", "pictures", "terminal"];
