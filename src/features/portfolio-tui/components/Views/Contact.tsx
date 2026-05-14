import { useContent } from "../../contexts";

const KEY_PAD = 9;

export function Contact() {
  const { socials: SOCIAL } = useContent();
  return (
    <div className="mb-1 mt-2">
      <div className="text-muted">Easiest: just email me. I reply within a day.</div>
      <div className="mt-1.5 text-green">● currently accepting new clients</div>
      <div className="mt-3 text-muted">
        <div className="text-fg">~/contact</div>
        {SOCIAL.map((s, i) => {
          const last = i === SOCIAL.length - 1;
          return (
            <div key={s.key}>
              <span className="text-dim">{last ? "└──" : "├──"}</span>{" "}
              <span className="whitespace-pre text-muted">
                {s.key.padEnd(KEY_PAD)}
              </span>{" "}
              <span className="text-dim">→</span>{" "}
              <a
                className="border-b border-dotted border-blue text-blue no-underline hover:border-accent hover:text-accent"
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
