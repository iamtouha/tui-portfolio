"use client";

import { EXPERIENCE } from "../../data";

interface IExperienceListProps {
  onRunCommand: (raw: string) => void;
}

export function ExperienceList({ onRunCommand }: IExperienceListProps) {
  return (
    <div className="mb-1 mt-2">
      <div className="text-muted">
        {EXPERIENCE.length} positions · most recent first ·{" "}
        <span className="text-dim">click a role for details</span>
      </div>
      <div className="relative my-2 pl-[1.125rem] before:absolute before:bottom-1.5 before:left-1 before:top-1.5 before:border-l before:border-dashed before:border-border-token before:content-['']">
        {EXPERIENCE.map((e) => (
          <div
            key={e.slug}
            className="group relative mb-3.5 -ml-2 cursor-pointer rounded px-2 py-1 before:absolute before:left-[-1.125rem] before:top-0 before:text-[0.625rem] before:text-accent before:content-['●'] hover:bg-bg-soft"
            data-terminal-clickable
            role="button"
            tabIndex={0}
            onClick={() => onRunCommand(`/experience ${e.slug}`)}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") onRunCommand(`/experience ${e.slug}`);
            }}
          >
            <div>
              <span className="font-medium text-fg">{e.role}</span>{" "}
              <span className="text-muted">·</span>{" "}
              <span className="text-accent">{e.co}</span>
            </div>
            <div className="text-[0.75rem] text-dim">{e.when}</div>
            <div className="mt-0.5 text-muted">{e.desc}</div>
            <div className="mt-1.5">
              {e.stack.map((s) => (
                <span
                  key={s}
                  className="mr-1 my-0.5 inline-block rounded-[0.1875rem] border border-border-token bg-panel px-1.5 text-[0.6875rem] text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-1.5 text-[0.71875rem] text-dim opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              ↳ <span className="text-accent">/experience {e.slug}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
