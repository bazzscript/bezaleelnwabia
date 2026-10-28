"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { useOS } from "../store";

export default function Messages() {
  const { open } = useOS();
  const [active, setActive] = useState(testimonials[0]?.id);
  const [mobileList, setMobileList] = useState(true);
  const t = testimonials.find((x) => x.id === active) ?? testimonials[0];

  if (!t) return <div className="pane-scroll">No messages yet.</div>;

  return (
    <div className={`messages ${mobileList ? "show-list" : "show-detail"}`}>
      <aside className="msg-side">
        <div className="msg-side-title">Kind words</div>
        {testimonials.map((x) => (
          <button
            key={x.id}
            className={`msg-thread ${x.id === active ? "active" : ""}`}
            onClick={() => {
              setActive(x.id);
              setMobileList(false);
            }}
          >
            <span className="avatar" style={{ background: x.color }}>
              {x.initials}
            </span>
            <span className="msg-thread-text">
              <b>{x.name}</b>
              <small>{x.quote[0]}</small>
            </span>
          </button>
        ))}
      </aside>
      <section className="msg-main">
        <header className="msg-head">
          <button className="finder-back" onClick={() => setMobileList(true)}>
            ‹
          </button>
          <span className="avatar lg" style={{ background: t.color }}>
            {t.initials}
          </span>
          <div>
            <b>{t.name}</b>
            <small>
              {t.title} · {t.company}
            </small>
          </div>
          {t.placeholder && <span className="sample-badge">sample</span>}
        </header>
        <div className="msg-scroll">
          <div className="msg-day">Today</div>
          <div className="bubble out">Hey! Would you say a few words about working together? 🙏</div>
          {t.quote.map((q, i) => (
            <div key={i} className="bubble in" style={{ animationDelay: `${0.25 + i * 0.35}s` }}>
              {q}
            </div>
          ))}
          <div className="bubble out" style={{ animationDelay: `${0.4 + t.quote.length * 0.35}s` }}>
            Means a lot. Thank you! 🫶
          </div>
        </div>
        <footer className="msg-compose">
          <button onClick={() => open("booking")}>Want to be the next thread? Book a call →</button>
        </footer>
      </section>
    </div>
  );
}
