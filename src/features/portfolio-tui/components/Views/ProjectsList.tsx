"use client";

import { PROJECTS } from "../../data";

interface IProjectsListProps {
  tagFilter: string;
  onRunCommand: (raw: string) => void;
}

export function ProjectsList({ tagFilter, onRunCommand }: IProjectsListProps) {
  const list = tagFilter
    ? PROJECTS.filter((p) =>
        p.tags.some((t) => t.toLowerCase().includes(tagFilter.toLowerCase())),
      )
    : PROJECTS;

  if (!list.length) {
    return (
      <div className="mb-1 mt-2 text-muted">
        no projects match <span className="text-accent">{tagFilter}</span>.
      </div>
    );
  }

  return (
    <div className="mb-1 mt-2">
      <div className="text-muted">
        {list.length} project{list.length === 1 ? "" : "s"}
        {tagFilter ? (
          <>
            {" "}
            matching <span className="text-accent">{tagFilter}</span>
          </>
        ) : null}{" "}
        · <span className="text-dim">click a card for details</span>
      </div>
      {list.map((p) => (
        <div
          key={p.slug}
          className="group relative my-2 cursor-pointer rounded border border-border-token bg-[var(--card-bg)] px-3.5 py-3 transition-[border-color,background] duration-150 hover:border-accent hover:bg-[var(--card-hover)]"
          data-terminal-clickable
          role="button"
          tabIndex={0}
          onClick={() => onRunCommand(`/projects ${p.slug}`)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onRunCommand(`/projects ${p.slug}`);
          }}
        >
          <div>
            <span className="font-medium text-fg">{p.name}</span>{" "}
            {p.featured ? (
              <span className="mr-1 my-0.5 inline-block rounded-[0.1875rem] border border-accent/40 bg-panel px-1.5 text-[0.6875rem] text-accent">
                featured
              </span>
            ) : null}
          </div>
          <div className="mb-1.5 text-[0.78125rem] text-muted">{p.desc}</div>
          <div className="mt-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="mr-1 my-0.5 inline-block rounded-[0.1875rem] border border-border-token bg-panel px-1.5 text-[0.6875rem] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-1.5 text-[0.71875rem] text-dim opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            ↳ <span className="text-accent">/projects {p.slug}</span>
          </div>
        </div>
      ))}
      <div className="text-dim">
        filter: <span className="text-accent">/projects --tag nextjs</span>
      </div>
    </div>
  );
}
