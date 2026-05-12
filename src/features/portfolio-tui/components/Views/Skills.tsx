import { SKILLS } from "../../data";

export function Skills() {
  return (
    <div className="mb-1 mt-2">
      <div className="text-muted">stack I reach for most</div>
      {Object.entries(SKILLS).map(([group, items]) => (
        <div key={group} className="mt-3">
          <div className="mb-1.5 text-[0.6875rem] uppercase tracking-[0.12em] text-dim">
            {group}
          </div>
          {items.map((name) => (
            <span
              key={name}
              className="mr-1 my-0.5 inline-block rounded-[0.1875rem] border border-border-token bg-panel px-1.5 text-[0.6875rem] text-muted"
            >
              {name}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
