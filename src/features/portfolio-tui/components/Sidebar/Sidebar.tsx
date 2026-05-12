"use client";

import { QUICK_LINKS, SIDEBAR_COMMANDS } from "../../data";

interface ISidebarProps {
  onRunCommand: (raw: string) => void;
}

export function Sidebar({ onRunCommand }: ISidebarProps) {
  return (
    <aside className="sidebar">
      <div className="group">
        <h3>Commands</h3>
        {SIDEBAR_COMMANDS.map((c) => (
          <div
            key={c.k}
            className="sb-cmd"
            role="button"
            tabIndex={0}
            onClick={() => onRunCommand(c.k)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onRunCommand(c.k);
            }}
          >
            <span className="k">{c.k}</span>
            <span className="d">{c.d}</span>
          </div>
        ))}
      </div>
      <div className="group">
        <h3>Status</h3>
        <div className="stat">
          <span>open to work</span>
          <b>
            <span className="ok">● yes</span>
          </b>
        </div>
        <div className="stat">
          <span>timezone</span>
          <b>UTC+6</b>
        </div>
        <div className="stat">
          <span>response</span>
          <b>&lt; 24h</b>
        </div>
        <div className="stat">
          <span>shell</span>
          <b>zsh 5.9</b>
        </div>
      </div>
      <div className="group">
        <h3>Quick links</h3>
        {QUICK_LINKS.map((l) => (
          <div key={l.key} className="sb-cmd">
            <a
              className="link"
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.display}
            </a>
          </div>
        ))}
      </div>
    </aside>
  );
}
