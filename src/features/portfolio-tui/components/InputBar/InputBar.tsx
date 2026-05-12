"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Autocomplete } from "../Autocomplete";
import { useAutocomplete } from "../../hooks";
import { useTerminalStore } from "../../stores";
import type { ICommandSpec } from "../../types";

interface IInputBarProps {
  onSubmit: (raw: string) => void;
  onClearShortcut: () => void;
}

export interface IInputBarHandle {
  focus: () => void;
}

export const InputBar = forwardRef<IInputBarHandle, IInputBarProps>(
  function InputBar({ onSubmit, onClearShortcut }, ref) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState<string>("");
    const [activeIdx, setActiveIdx] = useState<number>(0);
    const { matches, isOpen, ghostTyped, ghostRest } = useAutocomplete(value);

    const history = useTerminalStore((s) => s.history);
    const histIdx = useTerminalStore((s) => s.histIdx);
    const setHistIdx = useTerminalStore((s) => s.setHistIdx);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }));

    function pickMatch(cmd: ICommandSpec) {
      setValue(cmd.k);
      setActiveIdx(0);
      inputRef.current?.focus();
      onSubmit(cmd.k);
      setValue("");
    }

    function handleChange(next: string) {
      setValue(next);
      setActiveIdx(0);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      if (e.key === "Enter") {
        e.preventDefault();
        const v = value;
        setValue("");
        setActiveIdx(0);
        onSubmit(v);
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        if (isOpen && matches[activeIdx]) {
          setValue(matches[activeIdx].k + " ");
          setActiveIdx(0);
        }
        return;
      }
      if (e.key === "ArrowUp") {
        if (isOpen) {
          e.preventDefault();
          setActiveIdx((i) => (i - 1 + matches.length) % matches.length);
          return;
        }
        if (history.length) {
          e.preventDefault();
          const next = Math.max(0, histIdx - 1);
          setHistIdx(next);
          setValue(history[next] ?? "");
        }
        return;
      }
      if (e.key === "ArrowDown") {
        if (isOpen) {
          e.preventDefault();
          setActiveIdx((i) => (i + 1) % matches.length);
          return;
        }
        if (history.length) {
          e.preventDefault();
          const next = Math.min(history.length, histIdx + 1);
          setHistIdx(next);
          setValue(history[next] ?? "");
        }
        return;
      }
      if (e.key === "Escape") {
        // local close behavior — clearing the active idx forces dropdown logic to re-evaluate
        setActiveIdx(0);
        return;
      }
      if (e.key.toLowerCase() === "l" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setValue("");
        onClearShortcut();
      }
    }

    return (
      <div className="inputbar">
        <span className="prompt-glyph">
          <span>touha</span>
          <span className="at">@</span>
          <span className="host">portfolio</span>
          <span className="muted">:~$</span>
          <span className="arrow">❯</span>
        </span>
        <div className="input-wrap">
          <div className="ghost">
            {ghostTyped ? (
              <>
                <span className="typed">{ghostTyped}</span>
                {ghostRest}
              </>
            ) : null}
          </div>
          <input
            ref={inputRef}
            className="cmd-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Autocomplete
            open={isOpen}
            matches={matches}
            activeIdx={activeIdx}
            onPick={pickMatch}
            onHover={setActiveIdx}
          />
        </div>
      </div>
    );
  },
);
