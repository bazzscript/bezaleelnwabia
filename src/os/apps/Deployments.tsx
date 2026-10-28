"use client";

import { useState } from "react";
import { ArrowUpRight, Folder, MapPin, Sparkles, Code2 } from "lucide-react";
import { deployments } from "@/data/deployments";
import { useOS } from "../store";

export default function Deployments({ arg }: { arg?: string }) {
  const { open } = useOS();
  const [active, setActive] = useState(arg ?? deployments[1].id);
  const [mode, setMode] = useState<"plain" | "eng">("plain");
  const [mobileList, setMobileList] = useState(!arg);

  // When opened again with a different deployment (e.g. from the menu bar), jump to it.
  const [prevArg, setPrevArg] = useState(arg);
  if (arg !== prevArg) {
    setPrevArg(arg);
    if (arg) {
      setActive(arg);
      setMobileList(false);
    }
  }

  const d = deployments.find((x) => x.id === active) ?? deployments[0];

  return (
    <div className={`finder ${mobileList ? "show-list" : "show-detail"}`}>
      <aside className="finder-side">
        <div className="finder-label">Deployments</div>
        {deployments.map((x) => (
          <button
            key={x.id}
            className={`finder-item ${x.id === active ? "active" : ""}`}
            onClick={() => {
              setActive(x.id);
              setMobileList(false);
            }}
          >
            <Folder size={15} style={{ color: x.color }} fill={x.color} fillOpacity={0.25} />
            <span>{x.client}</span>
            <small>{x.period.split("—")[0].trim()}</small>
          </button>
        ))}
      </aside>

      <section className="finder-main" key={d.id}>
        <button className="finder-back" onClick={() => setMobileList(true)}>
          ‹ All deployments
        </button>
        <header className="case-head" style={{ ["--case" as string]: d.color }}>
          <div className="case-badge">{d.client[0]}</div>
          <div>
            <div className="case-client">
              {d.client}
              {d.url && (
                <a href={d.url} target="_blank" rel="noreferrer" className="case-link">
                  Visit <ArrowUpRight size={13} />
                </a>
              )}
            </div>
            <div className="case-meta">
              {d.role} · {d.period} · <MapPin size={12} /> {d.location}
            </div>
          </div>
        </header>

        <h2 className="case-headline">{d.headline}</h2>
        {d.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={d.image} alt={`${d.client} screenshot`} className="case-shot" loading="lazy" />
        )}

        <div className="seg" role="tablist" aria-label="Audience">
          <button role="tab" aria-selected={mode === "plain"} className={mode === "plain" ? "on" : ""} onClick={() => setMode("plain")}>
            <Sparkles size={14} /> Plain English
          </button>
          <button role="tab" aria-selected={mode === "eng"} className={mode === "eng" ? "on" : ""} onClick={() => setMode("eng")}>
            <Code2 size={14} /> For engineers
          </button>
        </div>

        {mode === "plain" ? (
          <div className="case-grid">
            <div className="case-block">
              <h4>The problem</h4>
              <p>{d.problem}</p>
            </div>
            <div className="case-block">
              <h4>What I shipped</h4>
              <ul>
                {d.shipped.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="case-block case-outcome">
              <h4>Outcome</h4>
              <p>{d.outcome}</p>
            </div>
          </div>
        ) : (
          <div className="case-grid">
            <div className="case-block mono">
              <h4>Architecture notes</h4>
              <ul>
                {d.engineering.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="case-block">
              <h4>Stack</h4>
              <div className="chips">
                {d.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="case-foot">
          <span>Have a problem like this?</span>
          <button className="btn btn-primary btn-sm" onClick={() => open("booking")}>
            Book a call
          </button>
        </div>
      </section>
    </div>
  );
}
