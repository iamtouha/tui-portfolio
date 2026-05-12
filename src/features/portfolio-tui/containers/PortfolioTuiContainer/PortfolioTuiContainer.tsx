"use client";

import { useEffect, useRef } from "react";
import {
  Chrome,
  HintBar,
  InputBar,
  Sidebar,
  TerminalOutput,
  type IInputBarHandle,
} from "../../components";
import { useCommandRunner } from "../../hooks";
import { useTerminalStore } from "../../stores";
import { ETerminalEntryKind } from "../../types";

const BOOT_AUTO_ABOUT_MS = 150;

export function PortfolioTuiContainer() {
  const entries = useTerminalStore((s) => s.entries);
  const pushEntry = useTerminalStore((s) => s.pushEntry);
  const resetToBoot = useTerminalStore((s) => s.resetToBoot);
  const applyCurrentTheme = useTerminalStore((s) => s.applyCurrentTheme);
  const runCommand = useCommandRunner();
  const inputRef = useRef<IInputBarHandle | null>(null);
  const bootedRef = useRef<boolean>(false);

  useEffect(() => {
    applyCurrentTheme();
  }, [applyCurrentTheme]);

  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    if (useTerminalStore.getState().entries.length === 0) {
      pushEntry({ kind: ETerminalEntryKind.BOOT });
    }
    const id = window.setTimeout(() => {
      runCommand("/about");
    }, BOOT_AUTO_ABOUT_MS);
    inputRef.current?.focus();
    return () => window.clearTimeout(id);
  }, [pushEntry, runCommand]);

  function handleBodyClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (
      target.closest("a") ||
      target.closest(".sb-cmd") ||
      target.closest(".ac-item") ||
      target.closest(".tl-clickable") ||
      target.closest(".card-clickable") ||
      target.closest("input")
    ) {
      return;
    }
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  }

  return (
    <div className="h-full flex flex-col" onClick={handleBodyClick}>
      <Chrome />
      <div className="main">
        <TerminalOutput entries={entries} onRunCommand={runCommand} />
        <Sidebar onRunCommand={runCommand} />
      </div>
      <div className="footer">
        <InputBar
          ref={inputRef}
          onSubmit={runCommand}
          onClearShortcut={resetToBoot}
        />
        <HintBar />
      </div>
    </div>
  );
}
