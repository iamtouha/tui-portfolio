import { POSTS } from "@features/portfolio-tui/data";

export function Posts() {
  return (
    <div className="mb-1 mt-2">
      <div className="text-muted">{POSTS.length} posts · latest first</div>
      {POSTS.map((p) => (
        <div
          key={p.title}
          className="my-2 rounded border border-border-token bg-[var(--card-bg)] px-3.5 py-3 transition-[border-color,background] duration-150"
        >
          <div className="font-medium text-fg">{p.title}</div>
          <div className="mb-1.5 text-[0.78125rem] text-muted">
            {p.date}
          </div>
          <div className="text-[0.78125rem] text-muted">{p.summary}</div>
        </div>
      ))}
    </div>
  );
}
