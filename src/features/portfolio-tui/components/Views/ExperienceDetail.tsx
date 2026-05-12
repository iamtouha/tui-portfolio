import { EXPERIENCE } from "../../data";

interface IExperienceDetailProps {
  slug: string;
}

export function ExperienceDetail({ slug }: IExperienceDetailProps) {
  const e = EXPERIENCE.find((x) => x.slug === slug);
  if (!e) {
    return (
      <>
        <div className="block err">
          no role with slug <span className="accent">{slug}</span>.
        </div>
        <div className="block muted">
          run <span className="accent">/experience</span> to list.
        </div>
      </>
    );
  }
  return (
    <div className="block">
      <div className="detail-head">
        <div className="b accent">{e.role}</div>
        <div className="muted">{e.co}</div>
        <div className="tl-when">{e.when}</div>
      </div>
      <p className="line my-3 max-w-[68ch]">{e.desc}</p>
      <div className="dim mt-2 section-label">highlights</div>
      <ul className="bullet">
        {e.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="dim mt-2 section-label">stack</div>
      <div className="mt-1">
        {e.stack.map((s) => (
          <span key={s} className="ctag">
            {s}
          </span>
        ))}
      </div>
      <div className="dim mt-3">
        ↩ run <span className="accent">/experience</span> to go back to the
        list
      </div>
    </div>
  );
}
