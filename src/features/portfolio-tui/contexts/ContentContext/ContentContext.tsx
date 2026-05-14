"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { IPortfolioContent } from "@features/portfolio-tui/types";

const ContentContext = createContext<IPortfolioContent | null>(null);

interface IContentProviderProps {
  value: IPortfolioContent;
  children: ReactNode;
}

export function ContentProvider({ value, children }: IContentProviderProps) {
  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent(): IPortfolioContent {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return ctx;
}
