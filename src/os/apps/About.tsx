"use client";

import { useState } from "react";
import { CalendarDays, IdCard, Search } from "lucide-react";
import { age, site, stats } from "@/data/site";
import { useOS } from "../store";

type Note = { id: string; title: string; preview: string; folder: "Pinned" | "Notes"; date: string; body: React.ReactNode };

export default function About() {
  const { open } = useOS();
  const notes: Note[] = [
    {
      id: "hi",
      folder: "Pinned",
      title: `Hi, I'm ${site.firstName}.`,
      preview: "Forward Deployed Engineer",
      date: "just now",
      body: (
        <>
          <h1>Hi, I&apos;m {site.firstName}. 👋</h1>
          <p className="lede">
            I&apos;m a <strong>Forward Deployed Engineer</strong>. I come into your business, learn how the work actually
            gets done, and build the software — usually with AI — that makes it faster, cheaper or possible at all.
            Then I stay until it works for real people.
          </p>
          <p>
            For the last four years I&apos;ve been the engineer founders call when something has to ship: I&apos;ve been a
            startup CTO, built payment systems handling millions of transactions, and moved a live UK product to new
            infrastructure in two weeks without switching it off.
          </p>
          <p>
            Right now I&apos;m co-founder and CTO at <strong>Seocondo</strong> and <strong>MealCondo</strong>, and I
            take on a small number of consulting deployments alongside.
          </p>
          <div className="note-stats">
            {stats.map((s) => (
              <div key={s.value} className="note-stat">
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="note-actions">
            <button className="btn btn-primary" onClick={() => open("booking")}>
              <CalendarDays size={16} /> Book a call
            </button>
            <button className="btn btn-glow" onClick={() => open("card")}>
              <IdCard size={16} /> View my card
            </button>
          </div>
          <p className="muted small">
            Tip: everything on this desktop is clickable. Try the dock below — or the Terminal if you&apos;re an engineer.
          </p>
        </>
      ),
    },
    {
      id: "fde",
      folder: "Pinned",
      title: "What's a Forward Deployed Engineer?",
      preview: "The short version, no jargon",
      date: "Today",
      body: (
        <>
          <h1>What&apos;s a Forward Deployed Engineer?</h1>
          <p className="lede">
            Most engineers sit behind a ticket queue. A forward deployed engineer sits <em>with you</em>.
          </p>
          <p>
            The role was made famous by Palantir, who sent engineers into hospitals, governments and factories to build
            software on-site instead of selling them a product and leaving. Today AI companies like OpenAI and
            Anthropic hire FDEs for the same reason: AI only creates value once someone wires it into how a real
            business works.
          </p>
          <h2>What that looks like with me</h2>
          <ul className="checklist">
            <li>
              <b>I learn your business first.</b> I join your calls and watch the workflow before writing a line of code.
            </li>
            <li>
              <b>I turn a fuzzy problem into a clear one.</b> &ldquo;Our support is drowning&rdquo; becomes &ldquo;draft a
              reply to every support email automatically, with a human approving each one.&rdquo;
            </li>
            <li>
              <b>I build the whole thing.</b> Backend, AI, web, mobile, data, cloud — no hand-offs between five
              contractors.
            </li>
            <li>
              <b>I ship it into your real systems</b> — your inbox, your database, your tools — not a demo on my laptop.
            </li>
            <li>
              <b>I translate.</b> Your CEO gets plain English. Your engineers get architecture docs.
            </li>
          </ul>
          <button className="btn btn-primary" onClick={() => open("process")}>
            See how an engagement runs →
          </button>
        </>
      ),
    },
    {
      id: "now",
      folder: "Notes",
      title: "Now",
      preview: "What I'm working on",
      date: "Oct 2026",
      body: (
        <>
          <h1>Now</h1>
          <ul className="checklist">
            <li>
              <b>Seocondo</b> — co-founder, CTO and lead engineer. Building from zero.
            </li>
            <li>
              <b>MealCondo</b> — co-founder and CTO. AI kitchen assistant, recommendations and 4 mobile apps.
            </li>
            <li>
              <b>Consulting</b> — {site.availability.detail}.
            </li>
            <li>
              <b>Learning</b> — evals and guardrails for AI agents that touch real customer data.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "facts",
      folder: "Notes",
      title: "Quick facts",
      preview: `${age()} · ${site.location}`,
      date: "Feb 2000",
      body: (
        <>
          <h1>Quick facts</h1>
          <table className="facts">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{site.fullName}</td>
              </tr>
              <tr>
                <td>Age</td>
                <td>{age()} — born February {site.birth.year}</td>
              </tr>
              <tr>
                <td>Based in</td>
                <td>
                  {site.location} · {site.timezoneLabel}
                </td>
              </tr>
              <tr>
                <td>Works with</td>
                <td>UK, Europe, US and African teams — remote-first</td>
              </tr>
              <tr>
                <td>Open to</td>
                <td>{site.engagementModes.join(" · ")}</td>
              </tr>
              <tr>
                <td>Studied</td>
                <td>B.Eng Computer Engineering, ESUT (2015–2020)</td>
              </tr>
              <tr>
                <td>Languages</td>
                <td>TypeScript, Python, SQL… and English 🙂</td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
  ];

  const [active, setActive] = useState(notes[0].id);
  const [q, setQ] = useState("");
  const filtered = notes.filter((n) => (n.title + n.preview).toLowerCase().includes(q.toLowerCase()));
  const current = notes.find((n) => n.id === active) ?? notes[0];

  return (
    <div className="notes">
      <aside className="notes-side">
        <label className="search">
          <Search size={14} />
          <input placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        {(["Pinned", "Notes"] as const).map((folder) => {
          const list = filtered.filter((n) => n.folder === folder);
          if (!list.length) return null;
          return (
            <div key={folder}>
              <div className="notes-folder">{folder}</div>
              {list.map((n) => (
                <button
                  key={n.id}
                  className={`notes-item ${n.id === active ? "active" : ""}`}
                  onClick={() => setActive(n.id)}
                >
                  <b>{n.title}</b>
                  <span>
                    {n.date} &nbsp;{n.preview}
                  </span>
                </button>
              ))}
            </div>
          );
        })}
      </aside>
      <article className="notes-body prose" key={current.id}>
        <div className="notes-date">{current.date}</div>
        {current.body}
      </article>
    </div>
  );
}
