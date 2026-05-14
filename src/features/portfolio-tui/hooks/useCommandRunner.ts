"use client";

import { useCallback } from "react";
import { THEMES } from "../data";
import { useTerminalStore } from "../stores";
import { ETerminalEntryKind, type TTerminalEntryInput } from "../types";

type TEntryInput = TTerminalEntryInput;

type THandler = (args: string[]) => TEntryInput[] | "clear";

function parseTagFilter(args: string[]): string {
  const flag = args.find((a) => a.startsWith("--tag"));
  if (!flag) return "";
  if (flag.includes("=")) return flag.split("=")[1] ?? "";
  return args[args.indexOf(flag) + 1] ?? "";
}

function parsePage(args: string[]): number | null {
  const flag = args.find((a) => a.startsWith("--page"));
  if (!flag) return null;
  const raw = flag.includes("=")
    ? flag.split("=")[1]
    : args[args.indexOf(flag) + 1];
  const n = parseInt(raw ?? "", 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
}

function normalizeSlug(raw: string): string {
  return raw.toLowerCase().replace(/^\//, "");
}

const HOME_KINDS: TEntryInput[] = [{ kind: ETerminalEntryKind.HOME }];

const HANDLERS: Record<string, THandler> = {
  "/help": () => [{ kind: ETerminalEntryKind.HELP }],
  help: () => [{ kind: ETerminalEntryKind.HELP }],
  "?": () => [{ kind: ETerminalEntryKind.HELP }],
  h: () => [{ kind: ETerminalEntryKind.HELP }],

  "/about": () => [{ kind: ETerminalEntryKind.ABOUT }],
  about: () => [{ kind: ETerminalEntryKind.ABOUT }],

  "/home": () => HOME_KINDS,
  home: () => HOME_KINDS,

  "/experience": (args) =>
    args[0]
      ? [
          {
            kind: ETerminalEntryKind.EXPERIENCE_DETAIL,
            slug: normalizeSlug(args[0]),
          },
        ]
      : [{ kind: ETerminalEntryKind.EXPERIENCE_LIST }],
  experience: (args) =>
    args[0]
      ? [
          {
            kind: ETerminalEntryKind.EXPERIENCE_DETAIL,
            slug: normalizeSlug(args[0]),
          },
        ]
      : [{ kind: ETerminalEntryKind.EXPERIENCE_LIST }],
  "/exp": (args) =>
    args[0]
      ? [
          {
            kind: ETerminalEntryKind.EXPERIENCE_DETAIL,
            slug: normalizeSlug(args[0]),
          },
        ]
      : [{ kind: ETerminalEntryKind.EXPERIENCE_LIST }],

  "/skills": () => [{ kind: ETerminalEntryKind.SKILLS }],
  skills: () => [{ kind: ETerminalEntryKind.SKILLS }],

  "/contact": () => [{ kind: ETerminalEntryKind.CONTACT }],
  contact: () => [{ kind: ETerminalEntryKind.CONTACT }],
  "/social": () => [{ kind: ETerminalEntryKind.CONTACT }],
  social: () => [{ kind: ETerminalEntryKind.CONTACT }],
  "/links": () => [{ kind: ETerminalEntryKind.CONTACT }],

  "/resume": () => [{ kind: ETerminalEntryKind.RESUME }],
  resume: () => [{ kind: ETerminalEntryKind.RESUME }],
  "/cv": () => [{ kind: ETerminalEntryKind.RESUME }],

  "/whoami": () => [{ kind: ETerminalEntryKind.WHOAMI }],
  whoami: () => [{ kind: ETerminalEntryKind.WHOAMI }],

  "/uname": () => [
    {
      kind: ETerminalEntryKind.UNAME,
      ua:
        typeof navigator !== "undefined"
          ? navigator.userAgent.split(" ").slice(-1)[0] ?? ""
          : "",
    },
  ],
  uname: () => [
    {
      kind: ETerminalEntryKind.UNAME,
      ua:
        typeof navigator !== "undefined"
          ? navigator.userAgent.split(" ").slice(-1)[0] ?? ""
          : "",
    },
  ],

  "/date": () => [{ kind: ETerminalEntryKind.DATE, iso: new Date().toString() }],
  date: () => [{ kind: ETerminalEntryKind.DATE, iso: new Date().toString() }],

  "/echo": (args) => [
    { kind: ETerminalEntryKind.ECHO, text: args.join(" ") },
  ],
  echo: (args) => [{ kind: ETerminalEntryKind.ECHO, text: args.join(" ") }],

  "/clear": () => "clear",
  clear: () => "clear",
  cls: () => "clear",

  "/exit": () => [{ kind: ETerminalEntryKind.EXIT }],
  exit: () => [{ kind: ETerminalEntryKind.EXIT }],
  quit: () => [{ kind: ETerminalEntryKind.EXIT }],
};

const PROJECTS_CMDS = new Set(["/projects", "projects", "/p", "ls"]);
const POSTS_CMDS = new Set(["/posts", "posts", "/blog"]);

function nowHHMM(): string {
  return new Date().toTimeString().slice(0, 5);
}

export function useCommandRunner(): (raw: string) => void {
  const pushEntry = useTerminalStore((s) => s.pushEntry);
  const pushHistory = useTerminalStore((s) => s.pushHistory);
  const resetToBoot = useTerminalStore((s) => s.resetToBoot);
  const cycleTheme = useTerminalStore((s) => s.cycleTheme);
  const setThemeByName = useTerminalStore((s) => s.setThemeByName);
  const openPicker = useTerminalStore((s) => s.openPicker);

  return useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      pushEntry({
        kind: ETerminalEntryKind.PROMPT,
        time: nowHHMM(),
        cmd: trimmed,
      });
      if (!trimmed) return;
      pushHistory(trimmed);

      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      if (cmd === "/theme" || cmd === "theme") {
        if (args[0]) {
          const ok = setThemeByName(args[0]);
          if (!ok) {
            pushEntry({
              kind: ETerminalEntryKind.THEME_ERROR,
              attempted: args[0],
            });
            return;
          }
          pushEntry({
            kind: ETerminalEntryKind.THEME_SET,
            name: args[0].toLowerCase(),
          });
          return;
        }
        cycleTheme();
        const currentName = THEMES[useTerminalStore.getState().themeIdx].name;
        pushEntry({ kind: ETerminalEntryKind.THEME_SET, name: currentName });
        return;
      }

      if (PROJECTS_CMDS.has(cmd)) {
        if (args[0] && !args[0].startsWith("--")) {
          pushEntry({
            kind: ETerminalEntryKind.PROJECT_DETAIL,
            slug: normalizeSlug(args[0]),
          });
          return;
        }
        const tagFilter = parseTagFilter(args);
        if (tagFilter) {
          pushEntry({
            kind: ETerminalEntryKind.PROJECTS_LIST,
            tagFilter,
          });
          return;
        }
        openPicker("projects");
        return;
      }

      if (POSTS_CMDS.has(cmd)) {
        if (args[0] && !args[0].startsWith("--")) {
          pushEntry({
            kind: ETerminalEntryKind.POST_DETAIL,
            slug: normalizeSlug(args[0]),
          });
          return;
        }
        const page = parsePage(args);
        if (page !== null) {
          pushEntry({ kind: ETerminalEntryKind.POSTS_LIST, page });
          return;
        }
        openPicker("posts");
        return;
      }

      const handler = HANDLERS[cmd];
      if (!handler) {
        pushEntry({ kind: ETerminalEntryKind.ERROR, message: cmd });
        return;
      }
      const result = handler(args);
      if (result === "clear") {
        resetToBoot();
        return;
      }
      for (const e of result) pushEntry(e);
    },
    [
      pushEntry,
      pushHistory,
      resetToBoot,
      cycleTheme,
      setThemeByName,
      openPicker,
    ],
  );
}
