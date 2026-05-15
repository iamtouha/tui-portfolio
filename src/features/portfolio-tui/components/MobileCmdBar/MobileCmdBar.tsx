"use client";

import type { CSSProperties } from "react";
import { MOBILE_CHIP_COMMANDS } from "./MobileCmdBar.constants";

interface IMobileCmdBarProps {
  onRunCommand: (raw: string) => void;
  onOpenPicker: () => void;
}

const CHIP_BASE =
  "inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap rounded-[0.25rem] border border-border-token bg-panel px-2.5 py-1.5 text-[0.78125rem] leading-none text-accent transition-colors duration-100 active:bg-[rgba(217,119,87,0.10)] active:border-accent select-none";

const NO_SCROLLBAR: CSSProperties = {
  scrollbarWidth: "none",
  WebkitOverflowScrolling: "touch",
};

const NO_TAP_HIGHLIGHT: CSSProperties = {
  WebkitTapHighlightColor: "transparent",
};

export function MobileCmdBar({
  onRunCommand,
  onOpenPicker,
}: IMobileCmdBarProps) {
  return (
    <nav
      aria-label="Quick commands"
      className="flex shrink-0 items-center gap-1.5 overflow-x-auto overflow-y-hidden border-b border-border-token bg-bg-soft px-3 py-1.5 [&::-webkit-scrollbar]:hidden md:hidden"
      style={NO_SCROLLBAR}
    >
      <button
        type="button"
        data-terminal-clickable
        aria-label="All commands"
        onClick={onOpenPicker}
        className={`${CHIP_BASE} text-fg`}
        style={NO_TAP_HIGHLIGHT}
      >
        <span className="text-accent text-[0.6875rem]">☰</span>
        <span>menu</span>
      </button>
      {MOBILE_CHIP_COMMANDS.map((c) => (
        <button
          key={c.k}
          type="button"
          data-terminal-clickable
          onClick={() => onRunCommand(c.k)}
          className={CHIP_BASE}
          style={NO_TAP_HIGHLIGHT}
        >
          {c.k}
        </button>
      ))}
    </nav>
  );
}
