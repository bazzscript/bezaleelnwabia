"use client";

import { Download, ExternalLink } from "lucide-react";

const file = "/resume/bezaleel-nwabia-ai-engineer.pdf";

export default function Resume() {
  return (
    <div className="preview">
      <div className="preview-bar">
        <span className="preview-title">AI Engineer · AI Solutions Engineer · Forward Deployed Engineer</span>
        <div className="preview-actions">
          <a className="btn btn-ghost btn-sm" href={file} target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> Open
          </a>
          <a className="btn btn-primary btn-sm" href={file} download>
            <Download size={14} /> Download PDF
          </a>
        </div>
      </div>
      <object data={`${file}#view=FitH&toolbar=0`} type="application/pdf" className="preview-doc">
        <div className="preview-fallback">
          <p>Your browser can&apos;t show PDFs inline.</p>
          <a className="btn btn-primary" href={file} download>
            <Download size={14} /> Download the resume
          </a>
        </div>
      </object>
    </div>
  );
}
