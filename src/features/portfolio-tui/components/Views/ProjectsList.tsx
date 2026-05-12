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
      <div className="block muted">
        no projects match <span className="accent">{tagFilter}</span>.
      </div>
    );
  }

  return (
    <div className="block">
      <div className="muted">
        {list.length} project{list.length === 1 ? "" : "s"}
        {tagFilter ? (
          <>
            {" "}
            matching <span className="accent">{tagFilter}</span>
          </>
        ) : null}{" "}
        · <span className="dim">click a card for details</span>
      </div>
      {list.map((p) => (
        <div
          key={p.slug}
          className="card card-clickable"
          role="button"
          tabIndex={0}
          onClick={() => onRunCommand(`/projects ${p.slug}`)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onRunCommand(`/projects ${p.slug}`);
          }}
        >
          <div>
            <span className="ctitle">{p.name}</span>{" "}
            {p.featured ? (
              <span className="ctag accent">featured</span>
            ) : null}
          </div>
          <div className="csub">{p.desc}</div>
          <div className="ctags">
            {p.tags.map((t) => (
              <span key={t} className="ctag">
                {t}
              </span>
            ))}
          </div>
          <div className="open-hint">
            ↳ <span className="accent">/projects {p.slug}</span>
          </div>
        </div>
      ))}
      <div className="dim">
        filter: <span className="accent">/projects --tag nextjs</span>
      </div>
    </div>
  );
}
