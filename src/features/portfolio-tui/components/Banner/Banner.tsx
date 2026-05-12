import { ASCII_BANNER } from "../../data";

export function Banner() {
  const lastLogin = new Date().toDateString();
  return (
    <>
      <div className="banner-row">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="avatar" src="/avatar.png" alt="Touha" />
        <pre className="banner">{ASCII_BANNER}</pre>
      </div>
      <div className="banner-meta">
        Welcome to <b>touha@portfolio</b> — a tiny terminal-style site.
        <br />
        Last login: {lastLogin} on tty/web
      </div>
      <div className="line muted">
        Type <span className="accent">/help</span> to see commands, or try{" "}
        <span className="accent">/about</span> ·{" "}
        <span className="accent">/experience</span> ·{" "}
        <span className="accent">/projects</span> ·{" "}
        <span className="accent">/contact</span>.
      </div>
    </>
  );
}
