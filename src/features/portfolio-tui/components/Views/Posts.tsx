import { POSTS } from "../../data";

export function Posts() {
  return (
    <div className="block">
      <div className="muted">{POSTS.length} posts · latest first</div>
      {POSTS.map((p) => (
        <div key={p.url} className="card">
          <div className="ctitle">
            <a
              className="link"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.t}
            </a>
          </div>
          <div className="csub">
            {p.d} · {p.min} min read
          </div>
          <div className="muted text-[12.5px]">{p.s}</div>
        </div>
      ))}
    </div>
  );
}
