"use client";

import { process } from "@/data/services";
import { useOS } from "../store";

export default function Process() {
  const { open } = useOS();
  return (
    <div className="pane-scroll">
      <header className="pane-head">
        <span className="eyebrow">Field manual</span>
        <h1>How a deployment runs.</h1>
        <p>No long requirement documents. You see working software from the second week.</p>
      </header>

      <ol className="timeline">
        {process.map((p) => (
          <li key={p.step}>
            <div className="tl-dot">{p.step}</div>
            <div className="tl-card">
              <div className="tl-top">
                <h3>{p.title}</h3>
                <span>{p.time}</span>
              </div>
              <p>{p.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="callout">
        <div>
          <b>You always know where things stand.</b>
          <span>Weekly demo · shared progress board · one Slack channel · no surprises on the invoice.</span>
        </div>
        <button className="btn btn-primary" onClick={() => open("services")}>
          See engagements
        </button>
      </div>
    </div>
  );
}
