"use client";

import { useEffect, useRef } from "react";
import { Banner } from "../Banner";
import {
  About,
  Contact,
  DateView,
  Echo,
  ErrorView,
  ExitView,
  ExperienceDetail,
  ExperienceList,
  Help,
  Posts,
  ProjectDetail,
  ProjectsList,
  PromptEcho,
  Resume,
  Skills,
  ThemeError,
  ThemeSet,
  Uname,
  Whoami,
} from "../Views";
import { ETerminalEntryKind, type TTerminalEntry } from "../../types";

interface ITerminalOutputProps {
  entries: TTerminalEntry[];
  onRunCommand: (raw: string) => void;
}

function renderEntry(
  entry: TTerminalEntry,
  onRunCommand: (raw: string) => void,
): React.ReactNode {
  switch (entry.kind) {
    case ETerminalEntryKind.PROMPT:
      return <PromptEcho time={entry.time} cmd={entry.cmd} />;
    case ETerminalEntryKind.BOOT:
      return <Banner />;
    case ETerminalEntryKind.HELP:
      return <Help />;
    case ETerminalEntryKind.ABOUT:
      return <About />;
    case ETerminalEntryKind.EXPERIENCE_LIST:
      return <ExperienceList onRunCommand={onRunCommand} />;
    case ETerminalEntryKind.EXPERIENCE_DETAIL:
      return <ExperienceDetail slug={entry.slug} />;
    case ETerminalEntryKind.PROJECTS_LIST:
      return (
        <ProjectsList
          tagFilter={entry.tagFilter}
          onRunCommand={onRunCommand}
        />
      );
    case ETerminalEntryKind.PROJECT_DETAIL:
      return <ProjectDetail slug={entry.slug} />;
    case ETerminalEntryKind.SKILLS:
      return <Skills />;
    case ETerminalEntryKind.POSTS:
      return <Posts />;
    case ETerminalEntryKind.CONTACT:
      return <Contact />;
    case ETerminalEntryKind.RESUME:
      return <Resume />;
    case ETerminalEntryKind.THEME_SET:
      return <ThemeSet name={entry.name} />;
    case ETerminalEntryKind.THEME_ERROR:
      return <ThemeError attempted={entry.attempted} />;
    case ETerminalEntryKind.WHOAMI:
      return <Whoami />;
    case ETerminalEntryKind.UNAME:
      return <Uname ua={entry.ua} />;
    case ETerminalEntryKind.DATE:
      return <DateView iso={entry.iso} />;
    case ETerminalEntryKind.ECHO:
      return <Echo text={entry.text} />;
    case ETerminalEntryKind.EXIT:
      return <ExitView />;
    case ETerminalEntryKind.ERROR:
      return <ErrorView message={entry.message} />;
  }
}

export function TerminalOutput({ entries, onRunCommand }: ITerminalOutputProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [entries]);

  return (
    <div ref={ref} className="terminal">
      {entries.map((e) => (
        <div key={e.id}>{renderEntry(e, onRunCommand)}</div>
      ))}
    </div>
  );
}
