import { ASCII_BANNER } from "../../data";

export function Banner() {
  const lastLogin = new Date().toDateString();
  return (
    <>
      <div className="mb-3.5 mt-1.5 flex items-center gap-4.5 max-[32.5rem]:gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-18 w-18 shrink-0 rounded border border-border-token bg-panel [image-rendering:pixelated] max-[32.5rem]:h-14 max-[32.5rem]:w-14"
          src="/avatar.png"
          alt="Touha"
        />
        <pre className="m-0 whitespace-pre text-[0.6875rem] leading-[1.2] text-accent max-[32.5rem]:text-[0.5625rem]">
          {ASCII_BANNER}
        </pre>
      </div>
      <div className="mb-4.5 text-muted">
        Welcome to <b className="font-medium text-fg">touha@portfolio</b> — a
        tiny terminal-style site.
        <br />
        Last login: {lastLogin} on tty/web
      </div>
      <div className="m-0 whitespace-pre-wrap wrap-break-word p-0 text-muted">
        Type <span className="text-accent">/help</span> to see commands, or try{" "}
        <span className="text-accent">/about</span> ·{" "}
        <span className="text-accent">/experience</span> ·{" "}
        <span className="text-accent">/projects</span> ·{" "}
        <span className="text-accent">/contact</span>.
      </div>
    </>
  );
}
