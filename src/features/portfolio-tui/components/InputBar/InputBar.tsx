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
        const submitVal =
          isOpen && matches[activeIdx] ? matches[activeIdx].k : value;
        setValue("");
        setActiveIdx(0);
        onSubmit(submitVal);
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        if (isOpen && matches[activeIdx]) {
          setValue(matches[activeIdx].k + " ");
          setActiveIdx(0);
          return;
        }
        const firstCard = document.querySelector<HTMLElement>(
          "[data-home-card]",
        );
        if (firstCard) firstCard.focus();
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
      <div className="flex items-center gap-2.5 px-[1.375rem] py-2.5 max-[32.5rem]:px-3.5">
        <span className="select-none font-medium text-accent">
          <span className="max-md:hidden">
            <span>touha</span>
            <span className="text-muted">@</span>
            <span className="text-accent-2">portfolio</span>
            <span className="text-muted">:~$</span>
          </span>
          <span className="ml-1 text-accent max-md:ml-0">❯</span>
        </span>
        <div className="relative flex flex-1 items-center">
          <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-pre text-dim">
            {ghostTyped ? (
              <>
                <span className="text-transparent">{ghostTyped}</span>
                {ghostRest}
              </>
            ) : null}
          </div>
          <input
            ref={inputRef}
            data-terminal-input
            className="w-full border-0 bg-transparent p-0 font-[inherit] text-fg caret-accent outline-none"
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
