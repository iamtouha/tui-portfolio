import { EXPERIENCE } from "../../data";

interface IExperienceDetailProps {
  slug: string;
}

export function ExperienceDetail({ slug }: IExperienceDetailProps) {
  const e = EXPERIENCE.find((x) => x.slug === slug);
  if (!e) {
    return (
      <>
        <div className="mb-1 mt-2 text-red">
          no role with slug <span className="text-accent">{slug}</span>.
        </div>
        <div className="mb-1 mt-2 text-muted">
          run <span className="text-accent">/experience</span> to list.
        </div>
      </>
    );
  }
  return (
    <div className="mb-1 mt-2">
      <div className="border-l-2 border-accent pl-2.5">
        <div className="font-bold text-accent">{e.role}</div>
        <div className="text-muted">{e.co}</div>
        <div className="text-[0.75rem] text-dim">{e.when}</div>
      </div>
      <p className="m-0 my-3 max-w-[68ch] whitespace-pre-wrap break-words p-0">
        {e.desc}
      </p>
      <div className="mt-2 text-[0.6875rem] uppercase tracking-[0.12em] text-dim">
        highlights
      </div>
      <ul className="mb-0 mt-1 pl-[1.125rem] text-fg marker:text-accent [&>li]:my-0.5">
        {e.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="mt-2 text-[0.6875rem] uppercase tracking-[0.12em] text-dim">
        stack
      </div>
      <div className="mt-1">
        {e.stack.map((s) => (
          <span
            key={s}
            className="mr-1 my-0.5 inline-block rounded-[0.1875rem] border border-border-token bg-panel px-1.5 text-[0.6875rem] text-muted"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-3 text-dim">
        ↩ run <span className="text-accent">/experience</span> to go back to the
        list
      </div>
    </div>
  );
}
