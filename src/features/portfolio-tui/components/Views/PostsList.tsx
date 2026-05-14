"use client";

import { useContent } from "../../contexts";
import { readingTimeMinutes } from "../MarkdownProse/MarkdownProse.helpers";

interface IPostsListProps {
  page: number;
  onRunCommand: (raw: string) => void;
}

const PER_PAGE = 8;

export function PostsList({ page, onRunCommand }: IPostsListProps) {
  const { posts: POSTS } = useContent();
  const total = POSTS.length;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const current = Math.min(Math.max(1, page), pages);
  const start = (current - 1) * PER_PAGE;
  const slice = POSTS.slice(start, start + PER_PAGE);

  if (!total) {
    return (
      <div className="mb-1 mt-2 text-muted">
        no posts yet — run <span className="text-accent">/posts</span> later.
      </div>
    );
  }

  return (
    <div className="mb-1 mt-2">
      <div className="text-muted">
        {total} post{total === 1 ? "" : "s"} · latest first ·{" "}
        <span className="text-dim">click a card to read</span>
      </div>
      {slice.map((p) => {
        const min = readingTimeMinutes(p.body);
        return (
          <div
            key={p.slug}
            className="group relative my-2 cursor-pointer rounded border border-border-token bg-(--card-bg) px-3.5 py-3 transition-[border-color,background] duration-150 hover:border-accent hover:bg-(--card-hover)"
            data-terminal-clickable
            role="button"
            tabIndex={0}
            onClick={() => onRunCommand(`/posts ${p.slug}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onRunCommand(`/posts ${p.slug}`);
            }}
          >
            <div className="font-medium text-fg">{p.title}</div>
            <div className="mb-1.5 text-[0.78125rem] text-muted">
              {p.date} · {min} min read
            </div>
            <div className="text-[0.78125rem] text-muted">{p.summary}</div>
            <div className="mt-1.5 text-[0.71875rem] text-dim opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              ↳ <span className="text-accent">/posts {p.slug}</span>
            </div>
          </div>
        );
      })}
      {total > PER_PAGE ? (
        <div className="my-3.5 flex items-center justify-between rounded border border-border-token bg-bg-soft px-3 py-2 text-[0.78125rem]">
          {current > 1 ? (
            <span
              className="cursor-pointer text-accent hover:underline"
              data-terminal-clickable
              role="button"
              tabIndex={0}
              onClick={() => onRunCommand(`/posts --page ${current - 1}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  onRunCommand(`/posts --page ${current - 1}`);
              }}
            >
              ← prev
            </span>
          ) : (
            <span className="cursor-default text-dim">← prev</span>
          )}
          <span className="text-muted">
            page {current} / {pages} · {start + 1}–
            {Math.min(start + PER_PAGE, total)} of {total}
          </span>
          {current < pages ? (
            <span
              className="cursor-pointer text-accent hover:underline"
              data-terminal-clickable
              role="button"
              tabIndex={0}
              onClick={() => onRunCommand(`/posts --page ${current + 1}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  onRunCommand(`/posts --page ${current + 1}`);
              }}
            >
              next →
            </span>
          ) : (
            <span className="cursor-default text-dim">next →</span>
          )}
        </div>
      ) : null}
    </div>
  );
}
