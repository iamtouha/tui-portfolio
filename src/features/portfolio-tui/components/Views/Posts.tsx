import { POSTS } from "../../data";

export function Posts() {
  return (
    <div className="mb-1 mt-2">
      <div className="text-muted">{POSTS.length} posts · latest first</div>
      {POSTS.map((p) => (
        <div
          key={p.url}
          className="my-2 rounded border border-border-token bg-[var(--card-bg)] px-3.5 py-3 transition-[border-color,background] duration-150"
        >
          <div className="font-medium text-fg">
            <a
              className="border-b border-dotted border-blue text-blue no-underline hover:border-accent hover:text-accent"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.t}
            </a>
          </div>
          <div className="mb-1.5 text-[0.78125rem] text-muted">
            {p.d} · {p.min} min read
          </div>
          <div className="text-[0.78125rem] text-muted">{p.s}</div>
        </div>
      ))}
    </div>
  );
}
