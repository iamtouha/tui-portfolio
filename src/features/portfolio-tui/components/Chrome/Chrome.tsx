"use client";

import { useClock } from "../../hooks";

const SESSION_ID = "#001";

export function Chrome() {
  const time = useClock();
  return (
    <div className="md:flex hidden shrink-0 items-center gap-2.5 border-b border-border-token bg-bg-soft px-3.5 py-2">
      <div className="flex gap-1.5">
        <span className="h-2.75 w-2.75 rounded-full bg-dot-red" />
        <span className="h-2.75 w-2.75 rounded-full bg-yellow" />
        <span className="h-2.75 w-2.75 rounded-full bg-green" />
      </div>
      <div className="flex-1 text-center text-[0.75rem] tracking-[0.02em] text-muted">
        touha@portfolio: ~ — zsh — 132&times;40
      </div>
      <div className="flex gap-3 text-[0.75rem] text-dim">
        <span>
          <b className="font-medium text-fg">{time}</b>
        </span>
        <span>
          session <b className="font-medium text-fg">{SESSION_ID}</b>
        </span>
      </div>
    </div>
  );
}
