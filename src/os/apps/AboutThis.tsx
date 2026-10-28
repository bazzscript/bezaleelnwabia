"use client";

import { age, site } from "@/data/site";
import { useOS } from "../store";

export default function AboutThis() {
  const { open } = useOS();
  const rows: [string, string][] = [
    ["Model", `Human, ${age()}-inch (Feb ${site.birth.year})`],
    ["Chip", "Coffee + jollof, Enugu-built"],
    ["Memory", "4+ years of production incidents"],
    ["Startup Disk", "Secondo · MealCondo"],
    ["Display", "Plain English & architecture diagrams"],
    ["Serial", site.timezoneLabel],
    ["macOS", "BezOS 26 “Forward”"],
  ];
  return (
    <div className="about-this">
      <div className="about-this-logo">BN</div>
      <h2>{site.name}</h2>
      <div className="muted small">{site.role}</div>
      <dl>
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <button className="btn btn-ghost btn-sm" onClick={() => open("resume")}>
        More Info…
      </button>
      <div className="muted tiny">™ and © 2000–{new Date().getFullYear()} Bezaleel Nwabia. All rights reserved.</div>
    </div>
  );
}
