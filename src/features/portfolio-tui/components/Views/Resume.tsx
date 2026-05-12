import { PROFILE } from "../../data";

export function Resume() {
  return (
    <div className="block">
      <div className="muted">PDF not wired up in this prototype.</div>
      <div className="mt-1.5">
        For now: run <span className="accent">/experience</span> +{" "}
        <span className="accent">/skills</span>, or email{" "}
        <a className="link" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>{" "}
        and I&apos;ll send the latest CV.
      </div>
    </div>
  );
}
