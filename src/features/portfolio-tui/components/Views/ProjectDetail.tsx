import { PROJECTS } from "../../data";

interface IProjectDetailProps {
  slug: string;
}

export function ProjectDetail({ slug }: IProjectDetailProps) {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) {
    return (
      <>
        <div className="mb-1 mt-2 text-red">
          no project with slug <span className="text-accent">{slug}</span>.
        </div>
        <div className="mb-1 mt-2 text-muted">
          run <span className="text-accent">/projects</span> to list.
        </div>
      </>
    );
  }
  return (
    <div className="mb-1 mt-2">
      <div className="border-l-2 border-accent pl-2.5">
        <div className="font-bold text-accent">
          {p.name}{" "}
          {p.featured ? (
            <span className="mr-1 my-0.5 inline-block rounded-[0.1875rem] border border-accent/40 bg-panel px-1.5 text-[0.6875rem] text-accent">
              featured
            </span>
          ) : null}
        </div>
        <div className="text-muted">
          {p.role} · {p.year}
        </div>
      </div>
      <p className="m-0 my-3 max-w-[68ch] whitespace-pre-wrap break-words p-0">
        {p.about}
      </p>
      <div className="mt-2 text-[0.6875rem] uppercase tracking-[0.12em] text-dim">
        what it does
      </div>
      <ul className="mb-0 mt-1 pl-[1.125rem] text-fg marker:text-accent [&>li]:my-0.5">
        {p.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div className="mt-2 text-[0.6875rem] uppercase tracking-[0.12em] text-dim">
        stack
      </div>
      <div className="mt-1">
        {p.tags.map((t) => (
          <span
            key={t}
            className="mr-1 my-0.5 inline-block rounded-[0.1875rem] border border-border-token bg-panel px-1.5 text-[0.6875rem] text-muted"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 text-dim">
        ↩ run <span className="text-accent">/projects</span> for the full list
      </div>
    </div>
  );
}
