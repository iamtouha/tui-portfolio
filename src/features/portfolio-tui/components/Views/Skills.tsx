import { SKILLS } from "../../data";

export function Skills() {
  return (
    <div className="block">
      <div className="muted">stack I reach for most</div>
      {Object.entries(SKILLS).map(([group, items]) => (
        <div key={group} className="mt-3">
          <div className="dim section-label mb-1.5">{group}</div>
          {items.map((name) => (
            <span key={name} className="ctag">
              {name}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
