"use client";

import { useEffect, useRef } from "react";
import {
  Chrome,
  HintBar,
  InputBar,
  Picker,
  Sidebar,
  TerminalOutput,
  type IInputBarHandle,
} from "../../components";
import { ContentProvider } from "../../contexts";
import { useCommandRunner } from "../../hooks";
import { useTerminalStore } from "../../stores";
import { ETerminalEntryKind, type IPortfolioContent } from "../../types";

interface IPortfolioTuiContainerProps {
  initialContent: IPortfolioContent;
}

export function PortfolioTuiContainer({
  initialContent,
}: IPortfolioTuiContainerProps) {
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
      pushEntry({ kind: ETerminalEntryKind.HOME });
    }
    inputRef.current?.focus();
  }, [pushEntry]);

  function focusInput() {
    inputRef.current?.focus();
  }

  function handleBodyClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (useTerminalStore.getState().pickerOpen) return;
    if (
      target.closest("a") ||
      target.closest("[data-terminal-clickable]") ||
      target.closest("input")
    ) {
      return;
    }
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  }

  return (
    <ContentProvider value={initialContent}>
      <div className="h-full flex flex-col" onClick={handleBodyClick}>
        <Chrome />
        <div className="flex min-h-0 flex-1">
          <TerminalOutput entries={entries} onRunCommand={runCommand} />
          <Sidebar onRunCommand={runCommand} />
        </div>
        <div className="shrink-0 border-t border-border-token bg-bg">
          <InputBar
            ref={inputRef}
            onSubmit={runCommand}
            onClearShortcut={resetToBoot}
          />
          <HintBar />
        </div>
      </div>
      <Picker onRunCommand={runCommand} onClose={focusInput} />
    </ContentProvider>
  );
}
