"use client";

import { useEffect, useState } from "react";
import { Clock, Globe, Mail, Video } from "lucide-react";
import { site } from "@/data/site";
import { GithubGlyph, LinkedinGlyph } from "../icons";

function useLocalTime(tz: string) {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }));
    f();
    const i = setInterval(f, 30_000);
    return () => clearInterval(i);
  }, [tz]);
  return t;
}

export default function Booking() {
  const myTime = useLocalTime(site.timezone);
  const subject = encodeURIComponent("Let's talk — deployment enquiry");
  const body = encodeURIComponent(
    "Hi Bezaleel,\n\nWhat we're trying to fix:\n\nRough timeline:\n\nConsulting / part-time / full-time:\n\nA few times that work for a 30-min call:\n"
  );

  return (
    <div className="booking">
      <aside className="booking-side">
        <div className="booking-avatar">BN</div>
        <div className="muted small">{site.name}</div>
        <h2>Intro call</h2>
        <ul className="booking-meta">
          <li>
            <Clock size={15} /> 30 minutes
          </li>
          <li>
            <Video size={15} /> Google Meet or Zoom
          </li>
          <li>
            <Globe size={15} /> I&apos;m on {site.timezoneLabel} · {myTime} now
          </li>
        </ul>
        <p className="small">
          Tell me what you&apos;re trying to fix. You&apos;ll leave with an honest view of whether software or AI can help —
          even if you don&apos;t hire me.
        </p>
        <div className="booking-socials">
          <a href={site.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinGlyph size={16} />
          </a>
          <a href={site.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubGlyph size={16} />
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email">
            <Mail size={16} />
          </a>
        </div>
      </aside>

      <section className="booking-main">
        {site.calLink ? (
          <iframe
            title="Book a call"
            src={`https://cal.com/${site.calLink}?embed=true&layout=month_view`}
            className="booking-frame"
            loading="lazy"
          />
        ) : (
          <div className="booking-fallback">
            <h3>Pick a time</h3>
            <p>Send a quick note with a few times that suit you and I&apos;ll reply within a day with a calendar invite.</p>
            <a className="btn btn-primary btn-block" href={`mailto:${site.email}?subject=${subject}&body=${body}`}>
              <Mail size={16} /> Email {site.email}
            </a>
            <a className="btn btn-ghost btn-block" href={site.links.linkedin} target="_blank" rel="noreferrer">
              <LinkedinGlyph size={15} /> Message me on LinkedIn
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
