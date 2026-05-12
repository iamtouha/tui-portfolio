"use client";

import { EXPERIENCE } from "../../data";

interface IExperienceListProps {
  onRunCommand: (raw: string) => void;
}

export function ExperienceList({ onRunCommand }: IExperienceListProps) {
  return (
    <div className="block">
      <div className="muted">
        {EXPERIENCE.length} positions · most recent first ·{" "}
        <span className="dim">click a role for details</span>
      </div>
      <div className="tl mt-2">
        {EXPERIENCE.map((e) => (
          <div
            key={e.slug}
            className="tl-item tl-clickable"
            role="button"
            tabIndex={0}
            onClick={() => onRunCommand(`/experience ${e.slug}`)}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") onRunCommand(`/experience ${e.slug}`);
            }}
          >
            <div>
              <span className="tl-role">{e.role}</span>{" "}
              <span className="muted">·</span>{" "}
              <span className="tl-co">{e.co}</span>
            </div>
            <div className="tl-when">{e.when}</div>
            <div className="tl-desc">{e.desc}</div>
            <div className="mt-1.5">
              {e.stack.map((s) => (
                <span key={s} className="ctag">
                  {s}
                </span>
              ))}
            </div>
            <div className="open-hint">
              ↳ <span className="accent">/experience {e.slug}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
