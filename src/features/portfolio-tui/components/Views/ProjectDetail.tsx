import { PROJECTS } from "../../data";

interface IProjectDetailProps {
  slug: string;
}

export function ProjectDetail({ slug }: IProjectDetailProps) {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) {
    return (
      <>
        <div className="block err">
          no project with slug <span className="accent">{slug}</span>.
        </div>
        <div className="block muted">
          run <span className="accent">/projects</span> to list.
        </div>
      </>
    );
  }
  return (
    <div className="block">
      <div className="detail-head">
        <div className="b accent">
          {p.name}{" "}
          {p.featured ? <span className="ctag accent">featured</span> : null}
        </div>
        <div className="muted">
          {p.role} · {p.year}
        </div>
      </div>
      <p className="line my-3 max-w-[68ch]">{p.about}</p>
      <div className="dim mt-2 section-label">what it does</div>
      <ul className="bullet">
        {p.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div className="dim mt-2 section-label">stack</div>
      <div className="mt-1">
        {p.tags.map((t) => (
          <span key={t} className="ctag">
            {t}
          </span>
        ))}
      </div>
      <div className="dim mt-3">
        ↩ run <span className="accent">/projects</span> for the full list
      </div>
    </div>
  );
}
