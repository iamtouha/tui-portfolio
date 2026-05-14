"use client";

import { useCallback, useRef, type KeyboardEvent } from "react";
import { useContent } from "../../contexts";
import type { IPost, IProject } from "../../types";
import { About } from "./About";

interface IHomeProps {
  onRunCommand: (raw: string) => void;
}

function pickBySlugs<T extends { slug: string }>(
  all: T[],
  slugs: string[],
  limit: number,
): T[] {
  if (!slugs.length) return [];
  return slugs
    .map((s) => all.find((x) => x.slug === s))
    .filter((x): x is T => Boolean(x))
    .slice(0, limit);
}

function pickFeaturedWithFallback<T extends { slug: string }>(
  all: T[],
  slugs: string[],
  limit: number,
): T[] {
  const picked = pickBySlugs(all, slugs, limit);
  if (picked.length) return picked;
  return all.slice(0, limit);
}

export function Home({ onRunCommand }: IHomeProps) {
  const { profile, projects, posts, featured } = useContent();
  const featProjects: IProject[] = pickFeaturedWithFallback(
    projects,
    featured.featuredProjects,
    4,
  );
  const featPosts: IPost[] = pickBySlugs(posts, featured.featuredPosts, 4);

  const rootRef = useRef<HTMLDivElement | null>(null);

  const handleGridKey = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-home-card]"),
    );
    if (!cards.length) return;
    const current = document.activeElement as HTMLElement | null;
    const idx = current ? cards.indexOf(current) : -1;

    let next = idx;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = idx < 0 ? 0 : Math.min(cards.length - 1, idx + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = idx <= 0 ? 0 : idx - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = cards.length - 1;
        break;
      case "Escape": {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>(
          "[data-terminal-input]",
        );
        input?.focus();
        return;
      }
      default:
        return;
    }
    e.preventDefault();
    cards[next]?.focus();
  }, []);

  return (
    <div ref={rootRef} className="mb-1 mt-2" onKeyDown={handleGridKey}>
      <section className="my-3.5">
        <About />
      </section>

      {featProjects.length > 0 ? (
        <section className="my-3.5">
          <header className="mb-1.5 flex items-baseline justify-between">
            <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-dim">
              ~ featured projects
            </span>
            <span
              className="cursor-pointer text-[0.75rem] text-accent hover:underline"
              data-terminal-clickable
              role="button"
              tabIndex={0}
              onClick={() => onRunCommand("/projects")}
              onKeyDown={(e) => {
                if (e.key === "Enter") onRunCommand("/projects");
              }}
            >
              see all →
            </span>
          </header>
          <div className="grid gap-2.5 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
            {featProjects.map((p) => (
              <div
                key={p.slug}
                className="cursor-pointer rounded border border-border-token bg-(--card-bg) px-3 py-2.5 transition-[border-color,background] duration-150 hover:border-accent hover:bg-(--card-hover) focus:border-accent focus:bg-(--card-hover) focus:outline-none"
                data-terminal-clickable
                data-home-card
                role="button"
                tabIndex={0}
                onClick={() => onRunCommand(`/projects ${p.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onRunCommand(`/projects ${p.slug}`);
                }}
              >
                <div className="font-medium text-fg line-clamp-2">{p.name}</div>
                <div className="mt-1 text-[0.75rem] leading-[1.45] text-muted line-clamp-3">
                  {p.desc}
                </div>
                <div className="mt-1.5 text-[0.6875rem] text-dim">
                  {p.tags.slice(0, 4).join(" · ")}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {featPosts.length > 0 ? (
        <section className="my-3.5">
          <header className="mb-1.5 flex items-baseline justify-between">
            <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-dim">
              ~ recent posts
            </span>
            <span
              className="cursor-pointer text-[0.75rem] text-accent hover:underline"
              data-terminal-clickable
              role="button"
              tabIndex={0}
              onClick={() => onRunCommand("/posts")}
              onKeyDown={(e) => {
                if (e.key === "Enter") onRunCommand("/posts");
              }}
            >
              see all →
            </span>
          </header>
          <div className="grid gap-2.5 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
            {featPosts.map((p) => (
              <div
                key={p.slug}
                className="cursor-pointer rounded border border-border-token bg-(--card-bg) px-3 py-2.5 transition-[border-color,background] duration-150 hover:border-accent hover:bg-(--card-hover) focus:border-accent focus:bg-(--card-hover) focus:outline-none"
                data-terminal-clickable
                data-home-card
                role="button"
                tabIndex={0}
                onClick={() => onRunCommand(`/posts ${p.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onRunCommand(`/posts ${p.slug}`);
                }}
              >
                <div className="font-medium text-fg line-clamp-2">
                  {p.title}
                </div>
                <div className="mt-1 text-[0.75rem] leading-[1.45] text-muted  line-clamp-3">
                  {p.summary}
                </div>
                <div className="mt-1.5 text-[0.6875rem] text-dim">{p.date}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-3 text-dim hidden">
        tip: <span className="text-accent">Tab</span> into cards ·{" "}
        <span className="text-accent">←↑↓→</span> navigate ·{" "}
        <span className="text-accent">Enter</span> open ·{" "}
        <span className="text-accent">Esc</span> back to prompt
      </div>
      <div className="mt-1 text-dim">
        tip: ask me anything — try{" "}
        <span className="text-accent">what stacks do you work with?</span>
      </div>
    </div>
  );
}
