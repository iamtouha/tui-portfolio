import type {
  ICommandSpec,
  IExperience,
  IPost,
  IProfile,
  IProject,
  ISocial,
  ITheme,
  TSkills,
} from "@features/portfolio-tui/types";
import experienceContent from "@features/portfolio-tui/data/content/experience.json";
import postsContent from "@features/portfolio-tui/data/content/posts.json";
import profileContent from "@features/portfolio-tui/data/content/profile.json";
import projectsContent from "@features/portfolio-tui/data/content/projects.json";
import skillsContent from "@features/portfolio-tui/data/content/skills.json";
import socialsContent from "@features/portfolio-tui/data/content/socials.json";

interface ISkillsContentGroup {
  name: string;
  items: string[];
}

const toSkills = (groups: ISkillsContentGroup[]) =>
  groups.reduce<TSkills>(
    (skills, group) => ({
      ...skills,
      [group.name]: group.items,
    }),
    {},
  );

export const PROFILE: IProfile = profileContent;

export const COMMANDS: ICommandSpec[] = [
  { k: "/help", d: "list all commands" },
  { k: "/about", d: "who I am, in 60 seconds" },
  { k: "/experience", d: "where I've worked" },
  { k: "/projects", d: "selected work" },
  { k: "/skills", d: "languages, frameworks, tooling" },
  { k: "/posts", d: "things I've written" },
  { k: "/contact", d: "ways to reach me + social" },
  { k: "/resume", d: "download cv (placeholder)" },
  { k: "/theme", d: "cycle color palette" },
  { k: "/whoami", d: "current user" },
  { k: "/uname", d: "system info" },
  { k: "/echo", d: "echo something back" },
  { k: "/date", d: "current date / time" },
  { k: "/clear", d: "clear the screen" },
  { k: "/exit", d: "...don't" },
];

export const EXPERIENCE: IExperience[] = experienceContent.items;

export const PROJECTS: IProject[] = projectsContent.items;

export const POSTS: IPost[] = postsContent.items;

export const SKILLS: TSkills = toSkills(skillsContent.groups);

export const SOCIAL: ISocial[] = socialsContent.items;

export const THEMES: ITheme[] = [
  {
    name: "amber",
    accent: "#d97757",
    accent2: "#c2b280",
    bg: "#1a1715",
    soft: "#221e1b",
    panel: "#26211d",
    border: "#3a322d",
    fg: "#e8e2d8",
    muted: "#8a8278",
    dim: "#5d574f",
  },
  {
    name: "matrix",
    accent: "#7fae6f",
    accent2: "#9ec48f",
    bg: "#0e1310",
    soft: "#121a14",
    panel: "#16201a",
    border: "#243027",
    fg: "#dbe6dd",
    muted: "#7a8a7d",
    dim: "#4d5a51",
  },
  {
    name: "azure",
    accent: "#6aa9c9",
    accent2: "#9bc4d8",
    bg: "#101620",
    soft: "#141c28",
    panel: "#19232f",
    border: "#2a3645",
    fg: "#dee5ee",
    muted: "#7e8a98",
    dim: "#4f5868",
  },
  {
    name: "magenta",
    accent: "#c97aa8",
    accent2: "#d4a3c2",
    bg: "#181216",
    soft: "#1f171c",
    panel: "#241a21",
    border: "#372733",
    fg: "#ece0e8",
    muted: "#8c7e87",
    dim: "#5e525a",
  },
  {
    name: "paper",
    accent: "#a85a3a",
    accent2: "#7a6646",
    bg: "#f3eee5",
    soft: "#ebe4d8",
    panel: "#e1d8c9",
    border: "#cbbfac",
    fg: "#2a2520",
    muted: "#6a6358",
    dim: "#9a9388",
  },
];

export const ASCII_BANNER = `   __                  __                __
  / /_____  __  ______ / /_  ____ _      / /__  _   __
 / __/ __ \\/ / / / __  / __ \\/ __ \\     / / _ \\| | / /
/ /_/ /_/ / /_/ / /_/ / / / / /_/ /  _ / /  __/| |/ /
\\__/\\____/\\__,_/\\__,_/_/ /_/\\__,_/  (_)_/\\___/ |___/      `;

export const SIDEBAR_COMMANDS: ICommandSpec[] = [
  { k: "/help", d: "list all" },
  { k: "/about", d: "who am i" },
  { k: "/experience", d: "work history" },
  { k: "/projects", d: "portfolio" },
  { k: "/skills", d: "stack" },
  { k: "/posts", d: "writing" },
  { k: "/contact", d: "say hi + links" },
  { k: "/resume", d: "cv" },
  { k: "/theme", d: "switch palette" },
  { k: "/clear", d: "clear screen" },
];

export const QUICK_LINKS: ISocial[] = [
  {
    key: "github",
    display: "github.com/iamtouha",
    href: "https://github.com/iamtouha",
  },
  {
    key: "linkedin",
    display: "linkedin/touhazr",
    href: "https://www.linkedin.com/in/touhazr",
  },
  {
    key: "twitter",
    display: "twitter/@iamtouha",
    href: "https://twitter.com/iamtouha",
  },
  { key: "email", display: "mail@touha.dev", href: "mailto:mail@touha.dev" },
];
