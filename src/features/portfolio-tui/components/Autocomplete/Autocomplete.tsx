"use client";

import { useEffect, useRef } from "react";
import type { ICommandSpec } from "../../types";

interface IAutocompleteProps {
  open: boolean;
  matches: ICommandSpec[];
  activeIdx: number;
  onPick: (cmd: ICommandSpec) => void;
  onHover: (idx: number) => void;
}

export function Autocomplete({
  open,
  matches,
  activeIdx,
  onPick,
  onHover,
}: IAutocompleteProps) {
  const activeRef = useRef<HTMLDivElement | null>(null);
  const rootClassName = [
    "absolute bottom-[calc(100%+0.5rem)] left-0 z-20 max-h-[15rem] min-w-[22.5rem] overflow-y-auto rounded border border-border-token bg-panel shadow-[0_-0.375rem_1.5rem_var(--elevated-shadow)] [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-border-token",
    open ? "block" : "hidden",
  ].join(" ");

  useEffect(() => {
    if (!open) return;
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [open, activeIdx]);

  return (
    <div className={rootClassName}>
      {matches.map((m, i) => (
        <div
          key={m.k}
          ref={i === activeIdx ? activeRef : null}
          className={`flex cursor-pointer justify-between gap-3.5 px-3 py-1.5 ${
            i === activeIdx ? "bg-bg-soft" : ""
          }`}
          data-terminal-clickable
          onMouseDown={(e) => {
            e.preventDefault();
            onPick(m);
          }}
          onMouseEnter={() => onHover(i)}
        >
          <span className={i === activeIdx ? "text-fg" : "text-accent"}>
            {m.k}
          </span>
          <span className="text-[0.71875rem] text-dim">{m.d}</span>
        </div>
      ))}
    </div>
  );
}
