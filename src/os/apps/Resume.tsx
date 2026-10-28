"use client";

import { useState } from "react";
import { Download, ExternalLink } from "lucide-react";

const versions = [
  { id: "fullstack", label: "Full-stack", file: "/resume/bezaleel-nwabia-fullstack.pdf" },
  { id: "backend", label: "Backend & AI", file: "/resume/bezaleel-nwabia-backend.pdf" },
];

export default function Resume() {
  const [v, setV] = useState(versions[0]);
  return (
    <div className="preview">
      <div className="preview-bar">
        <div className="seg seg-sm">
          {versions.map((x) => (
            <button key={x.id} className={x.id === v.id ? "on" : ""} onClick={() => setV(x)}>
              {x.label}
            </button>
          ))}
        </div>
        <div className="preview-actions">
          <a className="btn btn-ghost btn-sm" href={v.file} target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> Open
          </a>
          <a className="btn btn-primary btn-sm" href={v.file} download>
            <Download size={14} /> Download PDF
          </a>
        </div>
      </div>
      <object data={`${v.file}#view=FitH&toolbar=0`} type="application/pdf" className="preview-doc">
        <div className="preview-fallback">
          <p>Your browser can&apos;t show PDFs inline.</p>
          <a className="btn btn-primary" href={v.file} download>
            <Download size={14} /> Download the resume
          </a>
        </div>
      </object>
    </div>
  );
}
