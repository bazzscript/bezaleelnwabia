"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { age, site, stack } from "@/data/site";
import { deployments } from "@/data/deployments";
import { services } from "@/data/services";
import { useOS, type AppId } from "../store";

type Line = { kind: "in" | "out"; content: ReactNode };

const PROMPT = "guest@bezaleel ~ %";

export default function Terminal() {
  const { open, close, lock } = useOS();
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", content: <span className="t-dim">Last login: {new Date().toDateString()} on ttys001</span> },
    {
      kind: "out",
      content: (
        <span>
          Welcome, engineer. Type <b className="t-cmd">help</b> to see what you can do.
        </span>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const launch = (id: AppId, arg?: string, msg?: string): ReactNode => {
    setTimeout(() => open(id, arg), 250);
    return <span className="t-dim">{msg ?? `Opening ${id}…`}</span>;
  };

  const commands: Record<string, { desc: string; run: (args: string[]) => ReactNode }> = {
    help: {
      desc: "list commands",
      run: () => (
        <div className="t-grid">
          {Object.entries(commands)
            .filter(([k]) => !["sudo", "rm", "exit", "ls", "cat", "vim", "date", "echo", "pwd", "neofetch"].includes(k))
            .map(([k, v]) => (
              <span key={k}>
                <b className="t-cmd">{k.padEnd(12, " ")}</b>
                <span className="t-dim">{v.desc}</span>
              </span>
            ))}
          <span className="t-dim">…and a few hidden ones. Try neofetch.</span>
        </div>
      ),
    },
    whoami: {
      desc: "the short version",
      run: () => (
        <span>
          {site.name} — {site.role}, {age()}, {site.location}. {site.tagline}
        </span>
      ),
    },
    neofetch: {
      desc: "system info",
      run: () => (
        <div className="t-neo">
          <pre className="t-logo">{`   ____  _   _
  | __ )| \\ | |
  |  _ \\|  \\| |
  | |_) | |\\  |
  |____/|_| \\_|`}</pre>
          <div>
            <div>
              <b className="t-cmd">bezaleel</b>@<b className="t-cmd">deploy</b>
            </div>
            <div className="t-dim">-----------------</div>
            <div>
              <b>OS</b>: BezOS 26.2 (Feb build)
            </div>
            <div>
              <b>Host</b>: {site.location}
            </div>
            <div>
              <b>Uptime</b>: {age()} years
            </div>
            <div>
              <b>Role</b>: {site.role}
            </div>
            <div>
              <b>Shell</b>: TypeScript / Python
            </div>
            <div>
              <b>Runtime</b>: Node · FastAPI · Lambda
            </div>
            <div>
              <b>Status</b>: <span className="t-ok">● {site.availability.label}</span>
            </div>
          </div>
        </div>
      ),
    },
    stack: {
      desc: "tools I use",
      run: () => (
        <div>
          {Object.entries(stack).map(([k, v]) => (
            <div key={k}>
              <b className="t-key">{k.padEnd(14, " ")}</b>
              {v.join(", ")}
            </div>
          ))}
        </div>
      ),
    },
    deployments: {
      desc: "past deployments (deployments <name> to open)",
      run: (args) => {
        if (args[0]) {
          const d = deployments.find((x) => x.id.startsWith(args[0].toLowerCase()));
          if (d) return launch("deployments", d.id, `Opening ${d.client}…`);
          return <span className="t-err">No deployment called “{args[0]}”.</span>;
        }
        return (
          <div>
            {deployments.map((d) => (
              <div key={d.id}>
                <b className="t-key">{d.id.padEnd(14, " ")}</b>
                <span className="t-dim">{d.period.padEnd(22, " ")}</span>
                {d.role}
              </div>
            ))}
          </div>
        );
      },
    },
    services: {
      desc: "ways to work together",
      run: () => (
        <div>
          {services.map((s) => (
            <div key={s.id}>
              <b className="t-key">{s.name.padEnd(28, " ")}</b>
              <span className="t-dim">{s.duration}</span>
            </div>
          ))}
        </div>
      ),
    },
    hire: { desc: "book an intro call", run: () => launch("booking", undefined, "Opening calendar… 📅") },
    card: { desc: "my business card", run: () => launch("card") },
    resume: { desc: "open resume", run: () => launch("resume") },
    contact: {
      desc: "how to reach me",
      run: () => (
        <div>
          <div>
            <b className="t-key">email     </b>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div>
            <b className="t-key">linkedin  </b>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer">
              {site.links.linkedin}
            </a>
          </div>
          <div>
            <b className="t-key">github    </b>
            <a href={site.links.github} target="_blank" rel="noreferrer">
              {site.links.github}
            </a>
          </div>
        </div>
      ),
    },
    clear: { desc: "clear the screen", run: () => null },
    lock: { desc: "lock the screen", run: () => (setTimeout(lock, 300), "Locking…") },
    // hidden
    ls: { desc: "", run: () => "deployments/  resume.pdf  card.vcf  ideas.md  .env (nice try)" },
    cat: {
      desc: "",
      run: (a) =>
        a[0] === ".env" ? (
          <span className="t-err">Permission denied. I&apos;m a backend engineer, remember?</span>
        ) : a[0] === "ideas.md" ? (
          "1. Ship it. 2. Watch real users. 3. Fix what they actually struggle with. 4. Repeat."
        ) : (
          `cat: ${a[0] ?? ""}: try 'ls' first`
        ),
    },
    pwd: { desc: "", run: () => "/Users/guest/somewhere-in-enugu" },
    date: { desc: "", run: () => new Date().toString() },
    echo: { desc: "", run: (a) => a.join(" ") },
    vim: { desc: "", run: () => "You are now trapped forever. (Just kidding. Type :q — oh wait, this isn't vim.)" },
    sudo: {
      desc: "",
      run: (a) =>
        a.join(" ").includes("hire") ? (
          launch("booking", undefined, "[sudo] permission granted. Respect. Opening calendar…")
        ) : (
          <span className="t-err">guest is not in the sudoers file. This incident will be reported to Bezaleel&apos;s mum.</span>
        ),
    },
    rm: {
      desc: "",
      run: (a) =>
        a.includes("-rf") ? (
          <span className="t-err">Whoa. Production is protected. Every deployment I ship has backups and rollbacks.</span>
        ) : (
          "rm: nothing to remove"
        ),
    },
    exit: { desc: "", run: () => (setTimeout(() => close("terminal"), 200), "Bye 👋") },
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) {
      setLines((l) => [...l, { kind: "in", content: "" }]);
      return;
    }
    setHistory((h) => [cmd, ...h]);
    setHIdx(-1);
    const [name, ...args] = cmd.split(/\s+/);
    if (name === "clear") return setLines([]);
    const c = commands[name.toLowerCase()];
    const out = c ? c.run(args) : <span className="t-err">zsh: command not found: {name}. Try <b>help</b>.</span>;
    setLines((l) => [...l, { kind: "in", content: cmd }, ...(out ? [{ kind: "out" as const, content: out }] : [])]);
  };

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      {lines.map((l, i) =>
        l.kind === "in" ? (
          <div key={i}>
            <span className="t-prompt">{PROMPT}</span> {l.content}
          </div>
        ) : (
          <div key={i} className="t-out">
            {l.content}
          </div>
        )
      )}
      <form
        className="t-input"
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput("");
        }}
      >
        <span className="t-prompt">{PROMPT}</span>
        <input
          ref={inputRef}
          value={input}
          autoFocus
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="Terminal input"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              e.preventDefault();
              const n = Math.min(hIdx + 1, history.length - 1);
              if (history[n]) {
                setHIdx(n);
                setInput(history[n]);
              }
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              const n = hIdx - 1;
              setHIdx(Math.max(n, -1));
              setInput(n >= 0 ? history[n] : "");
            } else if (e.key === "Tab") {
              e.preventDefault();
              const m = Object.keys(commands).find((k) => k.startsWith(input));
              if (m) setInput(m);
            }
          }}
        />
      </form>
      <div ref={endRef} />
    </div>
  );
}
