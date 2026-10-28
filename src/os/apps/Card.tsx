"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { Download, UserPlus } from "lucide-react";
import QRCode from "qrcode";
import { site } from "@/data/site";

const W = 1050; // export size: 3.5in x 2in at 300dpi
const H = 600;

function vcard() {
  const [first, ...rest] = site.name.split(" ");
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${rest.join(" ")};${first};;;`,
    `FN:${site.name}`,
    `TITLE:${site.role}`,
    `EMAIL;TYPE=INTERNET:${site.email}`,
    `TEL;TYPE=CELL:${site.phone.replace(/\s/g, "")}`,
    `URL:${site.url}`,
    `URL;TYPE=LinkedIn:${site.links.linkedin}`,
    `URL;TYPE=GitHub:${site.links.github}`,
    `ADR;TYPE=WORK:;;;Enugu;;;Nigeria`,
    `NOTE:${site.tagline}`,
    "END:VCARD",
  ].join("\r\n");
}

function save(blob: Blob, name: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function drawCard(): Promise<Blob | null> {
  const font = getComputedStyle(document.body).fontFamily;
  const mono = font; // canvas can't always resolve the webfont mono; sans reads cleaner at print size
  const pad = 40;
  const c = document.createElement("canvas");
  c.width = W + pad * 2;
  c.height = H * 2 + pad * 3;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#f4f4f5";
  ctx.fillRect(0, 0, c.width, c.height);

  const face = (y: number) => {
    ctx.save();
    roundRect(ctx, pad, y, W, H, 36);
    const g = ctx.createLinearGradient(pad, y, pad + W, y + H);
    g.addColorStop(0, "#1c1c22");
    g.addColorStop(1, "#0a0a0c");
    ctx.fillStyle = g;
    ctx.fill();
    ctx.clip();
    const glow = ctx.createRadialGradient(pad + W * 0.85, y + 40, 10, pad + W * 0.85, y + 40, 520);
    glow.addColorStop(0, "rgba(47,107,255,0.35)");
    glow.addColorStop(1, "rgba(47,107,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(pad, y, W, H);
    ctx.restore();
  };

  // Front
  let y = pad;
  face(y);
  ctx.fillStyle = "#fff";
  ctx.font = `700 44px ${font}`;
  ctx.fillText("BN", pad + 64, y + 100);
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = `500 26px ${font}`;
  ctx.textAlign = "right";
  ctx.fillText("Available to deploy", pad + W - 64, y + 95);
  const statusW = ctx.measureText("Available to deploy").width;
  ctx.textAlign = "left";
  ctx.fillStyle = "#4ade80";
  ctx.beginPath();
  ctx.arc(pad + W - 64 - statusW - 20, y + 86, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = `700 76px ${font}`;
  ctx.fillText(site.name, pad + 64, y + 330);
  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.font = `500 34px ${font}`;
  ctx.fillText(site.role, pad + 64, y + 385);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = `400 26px ${mono}`;
  ctx.fillText(site.email, pad + 64, y + 520);
  ctx.textAlign = "right";
  ctx.fillText(site.url.replace("https://", ""), pad + W - 64, y + 520);
  ctx.textAlign = "left";

  // Back
  y = pad * 2 + H;
  face(y);
  const qr = await QRCode.toDataURL(site.url, { margin: 0, width: 360, color: { dark: "#ffffff", light: "#00000000" } });
  const img = new Image();
  await new Promise((r) => {
    img.onload = r;
    img.src = qr;
  });
  ctx.drawImage(img, pad + W - 64 - 300, y + 150, 300, 300);
  ctx.fillStyle = "#fff";
  ctx.font = `600 40px ${font}`;
  const words = site.tagline.split(" ");
  let line = "";
  let ly = y + 190;
  for (const w of words) {
    if (ctx.measureText(line + w).width > 560) {
      ctx.fillText(line.trim(), pad + 64, ly);
      line = "";
      ly += 54;
    }
    line += w + " ";
  }
  ctx.fillText(line.trim(), pad + 64, ly);
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = `400 24px ${mono}`;
  ctx.fillText(`${site.links.linkedin.replace("https://www.", "")}`, pad + 64, y + 470);
  ctx.fillText(`${site.links.github.replace("https://", "")}`, pad + 64, y + 510);

  return new Promise((r) => c.toBlob(r, "image/png"));
}

export default function Card() {
  const [qr, setQr] = useState("");
  const [flipped, setFlipped] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 18 });
  const sry = useSpring(ry, { stiffness: 140, damping: 18 });
  const shineX = useTransform(sry, (v) => `${50 + ((v % 180) / 180) * 120}%`);
  const shine = useMotionTemplate`radial-gradient(circle at ${shineX} 30%, rgba(255,255,255,0.18), transparent 55%)`;
  const drag = useRef<{ x: number; y: number; rx: number; ry: number; moved: boolean } | null>(null);

  useEffect(() => {
    QRCode.toDataURL(site.url, { margin: 0, width: 240, color: { dark: "#ffffff", light: "#00000000" } }).then(setQr);
  }, []);

  useEffect(() => {
    // Little intro wiggle so people know it moves
    const c = animate(ry, [0, -22, 14, 0], { duration: 1.6, delay: 0.3 });
    return () => c.stop();
  }, [ry]);

  const onDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, rx: rx.get(), ry: ry.get(), moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    ry.set(d.ry + dx * 0.6);
    rx.set(Math.max(-35, Math.min(35, d.rx - dy * 0.4)));
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    let target = Math.round(ry.get() / 180) * 180;
    if (!d.moved) target = Math.round(ry.get() / 180) * 180 + 180;
    ry.set(target);
    rx.set(0);
    setFlipped(Math.abs(Math.round(target / 180)) % 2 === 1);
  };

  return (
    <div className="card-app">
      <div className="card-stage">
        <motion.div
          className="bizcard"
          style={{ rotateX: srx, rotateY: sry }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          role="img"
          aria-label={`Business card for ${site.name}, ${site.role}. ${site.email}`}
        >
          <div className="bizcard-face front">
            <motion.div className="bizcard-shine" style={{ background: shine }} />
            <div className="bc-top">
              <span className="bc-mark">BN</span>
              <span className="bc-status">
                <i /> Available to deploy
              </span>
            </div>
            <div className="bc-mid">
              <div className="bc-name">{site.name}</div>
              <div className="bc-role">{site.role}</div>
            </div>
            <div className="bc-bottom">
              <span>{site.email}</span>
              <span>{site.url.replace("https://", "")}</span>
            </div>
          </div>
          <div className="bizcard-face back">
            <motion.div className="bizcard-shine" style={{ background: shine }} />
            <div className="bc-back">
              <p>{site.tagline}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {qr && <img src={qr} alt="QR code linking to my website" className="bc-qr" draggable={false} />}
            </div>
            <div className="bc-bottom">
              <span>{site.location}</span>
              <span>{site.engagementModes.join(" · ")}</span>
            </div>
          </div>
        </motion.div>
      </div>
      <p className="card-hint">Drag to turn · tap to flip {flipped ? "back" : "over"}</p>
      <div className="card-actions">
        <button
          className="btn btn-primary"
          onClick={async () => {
            const b = await drawCard();
            if (b) save(b, "bezaleel-nwabia-card.png");
          }}
        >
          <Download size={16} /> Download card
        </button>
        <button className="btn btn-ghost" onClick={() => save(new Blob([vcard()], { type: "text/vcard" }), "bezaleel-nwabia.vcf")}>
          <UserPlus size={16} /> Save to contacts
        </button>
      </div>
    </div>
  );
}
