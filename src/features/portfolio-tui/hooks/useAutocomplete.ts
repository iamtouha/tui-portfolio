"use client";

import { useMemo } from "react";
import { COMMANDS } from "../data";
import type { ICommandSpec } from "../types";

interface IAutocompleteResult {
  matches: ICommandSpec[];
  isOpen: boolean;
  ghostTyped: string;
  ghostRest: string;
}

export function useAutocomplete(value: string): IAutocompleteResult {
  return useMemo(() => {
    if (!value.startsWith("/")) {
      return { matches: [], isOpen: false, ghostTyped: "", ghostRest: "" };
    }
    const lower = value.toLowerCase();
    const matches = COMMANDS.filter((c) => c.k.startsWith(lower));
    const isExactSingle =
      matches.length === 1 && matches[0].k === value.toLowerCase();
    const isOpen = matches.length > 0 && !isExactSingle;
    const first = matches[0];
    const ghostRest = first ? first.k.slice(value.length) : "";
    return {
      matches,
      isOpen,
      ghostTyped: first ? value : "",
      ghostRest,
    };
  }, [value]);
}
