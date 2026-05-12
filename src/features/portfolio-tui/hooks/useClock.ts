"use client";

import { useEffect, useState } from "react";

const TICK_MS = 30_000;

function nowHHMM(): string {
  return new Date().toTimeString().slice(0, 5);
}

export function useClock(): string {
  const [time, setTime] = useState<string>("--:--");
  useEffect(() => {
    const update = () => setTime(nowHHMM());
    const raf = window.requestAnimationFrame(update);
    const id = window.setInterval(update, TICK_MS);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);
  return time;
}
