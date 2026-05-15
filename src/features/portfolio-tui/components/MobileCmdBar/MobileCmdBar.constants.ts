import type { ICommandSpec } from "@features/portfolio-tui/types";

export const MOBILE_CHIP_COMMANDS: ICommandSpec[] = [
  { k: "/about", d: "who am i" },
  { k: "/projects", d: "portfolio" },
  { k: "/posts", d: "writing" },
  { k: "/experience", d: "work history" },
  { k: "/skills", d: "stack" },
  { k: "/contact", d: "say hi" },
  { k: "/theme", d: "switch palette" },
  { k: "/clear", d: "clear screen" },
];
