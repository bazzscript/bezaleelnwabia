"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { faqs, services } from "@/data/services";
import { useOS } from "../store";

export default function Services() {
  const { open } = useOS();
  const [faq, setFaq] = useState<number | null>(0);

  return (
    <div className="pane-scroll services">
      <header className="pane-head">
        <span className="eyebrow">Work with me</span>
        <h1>Three ways to deploy me.</h1>
        <p>Consulting, part-time or full-time. Every engagement is scoped and priced after a 30-minute call.</p>
      </header>

      <div className="tiers">
        {services.map((s) => (
          <div key={s.id} className={`tier ${s.featured ? "featured" : ""}`}>
            {s.featured && <span className="tier-flag">Most popular</span>}
            <h3>{s.name}</h3>
            <div className="tier-dur">{s.duration}</div>
            <p className="tier-who">{s.who}</p>
            <ul>
              {s.what.map((w) => (
                <li key={w}>
                  <Check size={15} /> {w}
                </li>
              ))}
            </ul>
            <button className={`btn ${s.featured ? "btn-primary" : "btn-ghost"} btn-block`} onClick={() => open("booking")}>
              {s.cta}
            </button>
          </div>
        ))}
      </div>

      <section className="faq">
        <h2>Questions people ask</h2>
        {faqs.map((f, i) => (
          <div key={f.q} className={`faq-item ${faq === i ? "open" : ""}`}>
            <button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}>
              {f.q}
              <ChevronDown size={16} />
            </button>
            {faq === i && <p>{f.a}</p>}
          </div>
        ))}
      </section>
    </div>
  );
}
