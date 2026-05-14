export interface IProfile {
  name: string;
  handle: string;
  role: string;
  location: string;
  email: string;
  tagline: string;
  timezone: string;
}

export interface ICommandSpec {
  k: string;
  d: string;
}

export interface IExperience {
  slug: string;
  role: string;
  co: string;
  when: string;
  desc: string;
  highlights: string[];
  stack: string[];
}

export interface IProject {
  slug: string;
  name: string;
  desc: string;
  tags: string[];
  role: string;
  year: string;
  about: string;
  features: string[];
  url?: string;
  featured?: boolean;
}

export interface IPost {
  slug: string;
  title: string;
  date: string;
  cover: string;
  summary: string;
  body: string;
  relatedPosts?: string[];
}

export interface IFeatured {
  featuredPosts: string[];
  featuredProjects: string[];
}

export interface IPortfolioContent {
  profile: IProfile;
  experience: IExperience[];
  projects: IProject[];
  posts: IPost[];
  skills: TSkills;
  socials: ISocial[];
  featured: IFeatured;
}

export interface ISocial {
  key: string;
  display: string;
  href: string;
}

export interface ITheme {
  name: string;
  accent: string;
  accent2: string;
  bg: string;
  soft: string;
  panel: string;
  border: string;
  fg: string;
  muted: string;
  dim: string;
}

export type TSkills = Record<string, string[]>;

export enum ETerminalEntryKind {
  PROMPT = "prompt",
  BOOT = "boot",
  HOME = "home",
  HELP = "help",
  ABOUT = "about",
  EXPERIENCE_LIST = "experience-list",
  EXPERIENCE_DETAIL = "experience-detail",
  PROJECTS_LIST = "projects-list",
  PROJECT_DETAIL = "project-detail",
  SKILLS = "skills",
  POSTS_LIST = "posts-list",
  POST_DETAIL = "post-detail",
  CONTACT = "contact",
  RESUME = "resume",
  THEME_SET = "theme-set",
  THEME_ERROR = "theme-error",
  WHOAMI = "whoami",
  UNAME = "uname",
  DATE = "date",
  ECHO = "echo",
  EXIT = "exit",
  ERROR = "error",
}

export type TDistributiveOmit<T, K extends string> = T extends unknown
  ? Omit<T, K>
  : never;

export type TTerminalEntry =
  | { id: number; kind: ETerminalEntryKind.PROMPT; time: string; cmd: string }
  | { id: number; kind: ETerminalEntryKind.BOOT }
  | { id: number; kind: ETerminalEntryKind.HOME }
  | { id: number; kind: ETerminalEntryKind.HELP }
  | { id: number; kind: ETerminalEntryKind.ABOUT }
  | { id: number; kind: ETerminalEntryKind.EXPERIENCE_LIST }
  | { id: number; kind: ETerminalEntryKind.EXPERIENCE_DETAIL; slug: string }
  | { id: number; kind: ETerminalEntryKind.PROJECTS_LIST; tagFilter: string }
  | { id: number; kind: ETerminalEntryKind.PROJECT_DETAIL; slug: string }
  | { id: number; kind: ETerminalEntryKind.SKILLS }
  | { id: number; kind: ETerminalEntryKind.POSTS_LIST; page: number }
  | { id: number; kind: ETerminalEntryKind.POST_DETAIL; slug: string }
  | { id: number; kind: ETerminalEntryKind.CONTACT }
  | { id: number; kind: ETerminalEntryKind.RESUME }
  | { id: number; kind: ETerminalEntryKind.THEME_SET; name: string }
  | { id: number; kind: ETerminalEntryKind.THEME_ERROR; attempted: string }
  | { id: number; kind: ETerminalEntryKind.WHOAMI }
  | { id: number; kind: ETerminalEntryKind.UNAME; ua: string }
  | { id: number; kind: ETerminalEntryKind.DATE; iso: string }
  | { id: number; kind: ETerminalEntryKind.ECHO; text: string }
  | { id: number; kind: ETerminalEntryKind.EXIT }
  | { id: number; kind: ETerminalEntryKind.ERROR; message: string };

export type TTerminalEntryInput = TDistributiveOmit<TTerminalEntry, "id">;
