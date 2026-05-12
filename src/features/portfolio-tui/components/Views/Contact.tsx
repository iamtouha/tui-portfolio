import { SOCIAL } from "../../data";

const KEY_PAD = 9;

export function Contact() {
  return (
    <div className="block">
      <div className="muted">Easiest: just email me. I reply within a day.</div>
      <div className="ok mt-1.5">● currently accepting new clients</div>
      <div className="tree mt-3">
        <div className="t-leaf">~/contact</div>
        {SOCIAL.map((s, i) => {
          const last = i === SOCIAL.length - 1;
          return (
            <div key={s.key}>
              <span className="t-line">{last ? "└──" : "├──"}</span>{" "}
              <span className="muted whitespace-pre">
                {s.key.padEnd(KEY_PAD)}
              </span>{" "}
              <span className="dim">→</span>{" "}
              <a
                className="link"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.display}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
