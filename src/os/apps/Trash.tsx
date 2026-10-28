"use client";

import { useState } from "react";
import { FileArchive, FileText, Folder, FileCode2 } from "lucide-react";

const items = [
  { name: "monolith.zip", Icon: FileArchive, note: "Split into a clean API + AI service. Users never noticed. That's the point." },
  { name: "flaky_tests/", Icon: Folder, note: "Replaced with end-to-end suites that actually pass twice in a row." },
  { name: "azure_invoice.pdf", Icon: FileText, note: "Migrated to Railway. Finance team sends their regards." },
  { name: "requirements_v14_FINAL_final.docx", Icon: FileText, note: "We built a prototype in week one instead." },
  { name: "ai_that_made_things_up.py", Icon: FileCode2, note: "Now every answer is grounded in your own data, with citations." },
];

export default function Trash() {
  const [sel, setSel] = useState<string | null>(null);
  const item = items.find((i) => i.name === sel);
  return (
    <div className="trash">
      <div className="trash-bar">Things I&apos;ve thrown away for clients</div>
      <div className="trash-grid">
        {items.map((i) => (
          <button key={i.name} className={`trash-item ${sel === i.name ? "active" : ""}`} onClick={() => setSel(i.name)}>
            <i.Icon size={34} strokeWidth={1.4} />
            <span>{i.name}</span>
          </button>
        ))}
      </div>
      <div className="trash-note">{item ? item.note : "Click a file to see why it's here."}</div>
    </div>
  );
}
