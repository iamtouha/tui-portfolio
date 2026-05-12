"use client";

import { QUICK_LINKS, SIDEBAR_COMMANDS } from "../../data";

interface ISidebarProps {
  onRunCommand: (raw: string) => void;
}

export function Sidebar({ onRunCommand }: ISidebarProps) {
  return (
    <aside className="w-[17.5rem] shrink-0 overflow-y-auto border-l border-border-token bg-bg-soft p-[1.125rem] text-[0.78125rem] max-[55rem]:hidden">
      <div className="mb-[1.375rem]">
        <h3 className="mb-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-dim">
          Commands
        </h3>
        {SIDEBAR_COMMANDS.map((c) => (
          <div
            key={c.k}
            className="flex cursor-pointer justify-between rounded-[0.1875rem] py-1 text-muted hover:text-fg"
            data-terminal-clickable
            role="button"
            tabIndex={0}
            onClick={() => onRunCommand(c.k)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onRunCommand(c.k);
            }}
          >
            <span className="text-accent">{c.k}</span>
            <span className="text-[0.71875rem] text-dim">{c.d}</span>
          </div>
        ))}
      </div>
      <div className="mb-[1.375rem]">
        <h3 className="mb-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-dim">
          Status
        </h3>
        <div className="flex justify-between py-[0.1875rem] text-muted">
          <span>open to work</span>
          <b className="font-medium text-fg">
            <span className="text-green">● yes</span>
          </b>
        </div>
        <div className="flex justify-between py-[0.1875rem] text-muted">
          <span>timezone</span>
          <b className="font-medium text-fg">UTC+6</b>
        </div>
        <div className="flex justify-between py-[0.1875rem] text-muted">
          <span>response</span>
          <b className="font-medium text-fg">&lt; 24h</b>
        </div>
        <div className="flex justify-between py-[0.1875rem] text-muted">
          <span>shell</span>
          <b className="font-medium text-fg">zsh 5.9</b>
        </div>
      </div>
      <div className="mb-[1.375rem]">
        <h3 className="mb-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-dim">
          Quick links
        </h3>
        {QUICK_LINKS.map((l) => (
          <div
            key={l.key}
            className="flex cursor-pointer justify-between rounded-[0.1875rem] py-1 text-muted hover:text-fg"
            data-terminal-clickable
          >
            <a
              className="border-b border-dotted border-blue text-blue no-underline hover:border-accent hover:text-accent"
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
