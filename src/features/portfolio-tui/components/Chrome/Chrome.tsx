"use client";

import { useClock } from "../../hooks";

const SESSION_ID = "#001";

export function Chrome() {
  const time = useClock();
  return (
    <div className="chrome">
      <div className="dots">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
      </div>
      <div className="title">touha@portfolio: ~ — zsh — 132×40</div>
      <div className="right">
        <span>
          <b>{time}</b>
        </span>
        <span>
          session <b>{SESSION_ID}</b>
        </span>
      </div>
    </div>
  );
}
