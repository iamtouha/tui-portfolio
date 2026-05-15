"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type KeyboardEvent,
} from "react";
import { useContent } from "../../contexts";
import { COMMANDS } from "../../data";
import { useIsMobile } from "../../hooks";
import { useTerminalStore } from "../../stores";
import {
  filterItems,
  highlightParts,
  type IPickerItem,
} from "./Picker.helpers";

interface IPickerProps {
  onRunCommand: (raw: string) => void;
  onClose: () => void;
}

export function Picker({ onRunCommand, onClose }: IPickerProps) {
  const open = useTerminalStore((s) => s.pickerOpen);
  const type = useTerminalStore((s) => s.pickerType);
  const query = useTerminalStore((s) => s.pickerQuery);
  const idx = useTerminalStore((s) => s.pickerIdx);
  const setPickerQuery = useTerminalStore((s) => s.setPickerQuery);
  const setPickerIdx = useTerminalStore((s) => s.setPickerIdx);
  const closePicker = useTerminalStore((s) => s.closePicker);

  const { posts, projects } = useContent();

  const items: IPickerItem[] = useMemo(() => {
    if (type === "posts") {
      return posts.map<IPickerItem>((p) => ({
        slug: p.slug,
        title: p.title,
        sub: p.summary,
        meta: p.date,
        haystack: `${p.title} ${p.summary} ${p.date}`.toLowerCase(),
        tags: [],
        featured: false,
      }));
    }
    if (type === "projects") {
      return projects.map<IPickerItem>((p) => ({
        slug: p.slug,
        title: p.name,
        sub: p.desc,
        meta: p.year,
        haystack: `${p.name} ${p.desc} ${p.tags.join(" ")} ${p.role}`.toLowerCase(),
        tags: p.tags,
        featured: Boolean(p.featured),
      }));
    }
    if (type === "commands") {
      return COMMANDS.map<IPickerItem>((c) => ({
        slug: c.k,
        title: c.k,
        sub: c.d,
        meta: "",
        haystack: `${c.k} ${c.d}`.toLowerCase(),
        tags: [],
        featured: false,
      }));
    }
    return [];
  }, [type, posts, projects]);

  const filtered = useMemo(() => filterItems(items, query), [items, query]);
  const total = items.length;
  const safeIdx = Math.min(Math.max(0, idx), Math.max(0, filtered.length - 1));

  const searchRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!open) return;
    if (isMobile) return;
    const id = requestAnimationFrame(() => searchRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open, isMobile]);

  useLayoutEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>("[data-active='true']");
    if (!active) return;
    const aTop = active.offsetTop;
    const aBot = aTop + active.offsetHeight;
    const sTop = list.scrollTop;
    const sBot = sTop + list.clientHeight;
    if (aTop < sTop) list.scrollTop = aTop - 6;
    else if (aBot > sBot) list.scrollTop = aBot - list.clientHeight + 6;
  }, [safeIdx, filtered.length, open]);

  if (!open) return null;

  function select() {
    const item = filtered[safeIdx];
    if (!item || !type) return;
    closePicker();
    onClose();
    if (type === "posts") onRunCommand(`/posts ${item.slug}`);
    else if (type === "projects") onRunCommand(`/projects ${item.slug}`);
    else onRunCommand(item.slug);
  }

  function handleSearchKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      closePicker();
      onClose();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      select();
      return;
    }
    if (!filtered.length) return;
    if (
      e.key === "ArrowDown" ||
      (e.ctrlKey && (e.key === "j" || e.key === "n"))
    ) {
      e.preventDefault();
      setPickerIdx((safeIdx + 1) % filtered.length);
      return;
    }
    if (
      e.key === "ArrowUp" ||
      (e.ctrlKey && (e.key === "k" || e.key === "p"))
    ) {
      e.preventDefault();
      setPickerIdx((safeIdx - 1 + filtered.length) % filtered.length);
      return;
    }
    if (e.key === "PageDown") {
      e.preventDefault();
      setPickerIdx(Math.min(filtered.length - 1, safeIdx + 5));
      return;
    }
    if (e.key === "PageUp") {
      e.preventDefault();
      setPickerIdx(Math.max(0, safeIdx - 5));
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setPickerIdx(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setPickerIdx(filtered.length - 1);
      return;
    }
  }

  const countText = query
    ? `${filtered.length} / ${total}`
    : `${total} item${total === 1 ? "" : "s"}`;

  const hint = filtered.length
    ? type === "posts"
      ? "↵ to read this post"
      : type === "projects"
        ? "↵ to view this project"
        : "↵ to run"
    : "press esc to close";

  const placeholder =
    type === "posts"
      ? "filter posts by title, tag, date…"
      : type === "projects"
        ? "filter projects by name, stack, role…"
        : "filter commands…";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="picker"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[9vh] backdrop-blur-[3px] max-md:items-stretch max-md:pt-0"
      style={{ background: "rgba(10, 8, 7, 0.55)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          closePicker();
          onClose();
        }
      }}
    >
      <div
        className="flex max-h-[72vh] w-[min(45rem,92vw)] flex-col overflow-hidden rounded-md border border-border-token bg-bg-soft max-md:h-screen max-md:max-h-screen max-md:w-screen max-md:rounded-none max-md:border-x-0"
        style={{ boxShadow: "0 1.5rem 5rem rgba(0,0,0,0.55)" }}
      >
        <div className="flex items-center gap-2.5 border-b border-border-token bg-panel px-3.5 py-2">
          <span className="font-medium tracking-[0.04em] text-accent">
            ❯ {type ?? ""}
          </span>
          <span className="ml-auto text-[0.71875rem] text-dim">
            {countText}
          </span>
          <button
            type="button"
            aria-label="Close"
            onClick={() => {
              closePicker();
              onClose();
            }}
            className="hidden h-6 w-6 items-center justify-center rounded-[0.25rem] border border-border-token text-[0.75rem] leading-none text-muted hover:border-accent hover:text-accent max-md:inline-flex"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            ✕
          </button>
        </div>
        <div className="flex items-center gap-2 border-b border-border-token px-3.5 py-2">
          <span className="text-accent select-none">/</span>
          <input
            ref={searchRef}
            value={query}
            placeholder={placeholder}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            onChange={(e) => setPickerQuery(e.target.value)}
            onKeyDown={handleSearchKey}
            className="flex-1 border-0 bg-transparent font-mono text-fg outline-none placeholder:text-dim max-md:text-base"
            style={{ caretColor: "var(--accent)" }}
          />
        </div>
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto py-1.5 scroll-smooth [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-border-token"
        >
          {filtered.length === 0 ? (
            <div className="px-3.5 py-5 text-center text-[0.78125rem] text-dim">
              no matches{query ? ` for ` : ""}
              {query ? <span className="text-accent">{query}</span> : null}
            </div>
          ) : (
            filtered.map((it, i) => {
              const active = i === safeIdx;
              const titleParts = highlightParts(it.title, query);
              const subParts = highlightParts(it.sub, query);
              return (
                <div
                  key={it.slug}
                  data-active={active ? "true" : "false"}
                  className={`grid cursor-pointer items-baseline gap-2.5 border-l-2 px-3.5 py-1.5 [grid-template-columns:1.125rem_1fr_auto] ${
                    active
                      ? "border-accent bg-[rgba(217,119,87,0.08)]"
                      : "border-transparent"
                  }`}
                  onMouseMove={() => {
                    if (i !== safeIdx) setPickerIdx(i);
                  }}
                  onClick={() => {
                    setPickerIdx(i);
                    select();
                  }}
                >
                  <span className={active ? "text-accent" : "text-transparent"}>
                    ▸
                  </span>
                  <span
                    className={
                      active ? "font-medium text-accent" : "text-fg"
                    }
                  >
                    {titleParts.map((part, j) =>
                      part.match ? (
                        <span
                          key={j}
                          className="text-accent underline underline-offset-2"
                          style={{ textDecorationColor: "rgba(217,119,87,0.55)" }}
                        >
                          {part.text}
                        </span>
                      ) : (
                        <span key={j}>{part.text}</span>
                      ),
                    )}
                    {it.featured ? (
                      <span className="ml-1 inline-block rounded-[0.1875rem] border border-accent/40 bg-panel px-1.5 text-[0.65625rem] text-accent">
                        featured
                      </span>
                    ) : null}
                  </span>
                  <span className="whitespace-nowrap text-[0.71875rem] text-dim">
                    {it.meta}
                  </span>
                  <span className="col-start-2 col-end-[-1] mt-px line-clamp-1 text-[0.75rem] leading-[1.45] text-muted">
                    {subParts.map((part, j) =>
                      part.match ? (
                        <span
                          key={j}
                          className="text-accent underline underline-offset-2"
                          style={{ textDecorationColor: "rgba(217,119,87,0.55)" }}
                        >
                          {part.text}
                        </span>
                      ) : (
                        <span key={j}>{part.text}</span>
                      ),
                    )}
                  </span>
                  {it.tags.length ? (
                    <span className="col-start-2 col-end-[-1] mt-1">
                      {it.tags.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="mr-1 my-0.5 inline-block rounded-[0.1875rem] border border-border-token bg-panel px-1.5 text-[0.65625rem] text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
        <div className="flex justify-between gap-2.5 border-t border-border-token bg-panel px-3.5 py-1.5 text-[0.6875rem] text-dim">
          <div className="space-x-3 [&>span:nth-child(n+2)]:max-md:hidden">
            <span>
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd> navigate
            </span>
            <span>
              <Kbd>↵</Kbd> select
            </span>
            <span>
              <Kbd>esc</Kbd> close
            </span>
          </div>
          <div>
            <span className="text-dim">{hint}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mr-1 inline-block rounded-[0.1875rem] border border-b-2 border-border-token bg-bg-soft px-1 font-mono text-[0.65625rem] text-muted">
      {children}
    </kbd>
  );
}
