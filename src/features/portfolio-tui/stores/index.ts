"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { THEMES } from "../data";
import {
  ETerminalEntryKind,
  type ITheme,
  type TTerminalEntry,
  type TTerminalEntryInput,
} from "../types";

const THEME_VAR_KEYS = [
  ["--bg", "bg"],
  ["--bg-soft", "soft"],
  ["--panel", "panel"],
  ["--border", "border"],
  ["--fg", "fg"],
  ["--muted", "muted"],
  ["--dim", "dim"],
  ["--accent", "accent"],
  ["--accent-2", "accent2"],
  ["--shell-accent-glow", "accentGlow"],
  ["--shell-blue-glow", "blueGlow"],
] as const;

function applyThemeToDom(theme: ITheme): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const [cssVar, key] of THEME_VAR_KEYS) {
    root.style.setProperty(cssVar, theme[key]);
  }
  root.style.colorScheme = theme.scheme;
}

export type TPickerType = "posts" | "projects";

interface ITerminalState {
  entries: TTerminalEntry[];
  history: string[];
  histIdx: number;
  themeIdx: number;
  _entryId: number;
  pickerOpen: boolean;
  pickerType: TPickerType | null;
  pickerQuery: string;
  pickerIdx: number;
  pushEntry: (e: TTerminalEntryInput) => void;
  resetToBoot: () => void;
  pushHistory: (cmd: string) => void;
  setHistIdx: (i: number) => void;
  cycleTheme: () => void;
  setThemeByName: (name: string) => boolean;
  applyCurrentTheme: () => void;
  openPicker: (type: TPickerType) => void;
  closePicker: () => void;
  setPickerQuery: (q: string) => void;
  setPickerIdx: (i: number) => void;
}

export const useTerminalStore = create<ITerminalState>()(
  persist(
    (set, get) => ({
      entries: [],
      history: [],
      histIdx: -1,
      themeIdx: 0,
      _entryId: 0,
      pickerOpen: false,
      pickerType: null,
      pickerQuery: "",
      pickerIdx: 0,
      pushEntry: (e) =>
        set((s) => {
          const id = s._entryId + 1;
          return {
            _entryId: id,
            entries: [...s.entries, { ...e, id } as TTerminalEntry],
          };
        }),
      resetToBoot: () =>
        set((s) => {
          const bootId = s._entryId + 1;
          const homeId = bootId + 1;
          return {
            _entryId: homeId,
            entries: [
              { id: bootId, kind: ETerminalEntryKind.BOOT },
              { id: homeId, kind: ETerminalEntryKind.HOME },
            ],
          };
        }),
      pushHistory: (cmd) =>
        set((s) => {
          const history = [...s.history, cmd];
          return { history, histIdx: history.length };
        }),
      setHistIdx: (i) => set({ histIdx: i }),
      cycleTheme: () => {
        const next = (get().themeIdx + 1) % THEMES.length;
        applyThemeToDom(THEMES[next]);
        set({ themeIdx: next });
      },
      setThemeByName: (name) => {
        const idx = THEMES.findIndex((t) => t.name === name.toLowerCase());
        if (idx === -1) return false;
        applyThemeToDom(THEMES[idx]);
        set({ themeIdx: idx });
        return true;
      },
      applyCurrentTheme: () => {
        applyThemeToDom(THEMES[get().themeIdx]);
      },
      openPicker: (type) =>
        set({
          pickerOpen: true,
          pickerType: type,
          pickerQuery: "",
          pickerIdx: 0,
        }),
      closePicker: () =>
        set({
          pickerOpen: false,
          pickerType: null,
          pickerQuery: "",
          pickerIdx: 0,
        }),
      setPickerQuery: (q) => set({ pickerQuery: q, pickerIdx: 0 }),
      setPickerIdx: (i) => set({ pickerIdx: i }),
    }),
    {
      name: "portfolio-tui-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ themeIdx: s.themeIdx }),
      onRehydrateStorage: () => (state) => {
        if (state) applyThemeToDom(THEMES[state.themeIdx]);
      },
    },
  ),
);
