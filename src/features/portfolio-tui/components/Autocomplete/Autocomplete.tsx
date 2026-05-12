"use client";

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
  return (
    <div className={`autocomplete${open ? " open" : ""}`}>
      {matches.map((m, i) => (
        <div
          key={m.k}
          className={`ac-item${i === activeIdx ? " active" : ""}`}
          onMouseDown={(e) => {
            e.preventDefault();
            onPick(m);
          }}
          onMouseEnter={() => onHover(i)}
        >
          <span className="ac-k">{m.k}</span>
          <span className="ac-d">{m.d}</span>
        </div>
      ))}
    </div>
  );
}
