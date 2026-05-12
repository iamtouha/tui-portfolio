import type {
  ICommandSpec,
  IExperience,
  IPost,
  IProfile,
  IProject,
  ISocial,
  ITheme,
  TSkills,
} from "../types";

export const PROFILE: IProfile = {
  name: "Touha Zohair",
  handle: "iamtouha",
  role: "Full Stack Web Developer",
  location: "Dhaka, Bangladesh",
  email: "mail@touha.dev",
  tagline:
    "I craft modern TypeScript web apps with Next.js and other React frameworks. I also build scalable, performant backends and APIs in Node.js.",
};

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

export const EXPERIENCE: IExperience[] = [
  {
    slug: "freelance",
    role: "Senior Full Stack Developer",
    co: "Freelance · Fiverr Pro",
    when: "2021 — present",
    desc: "75+ projects delivered for clients across e-commerce, SaaS, and B2B. 5.0★ rating.",
    highlights: [
      "Delivered 75+ client projects end-to-end, from spec to deploy.",
      "Recurring engagements with SaaS founders for MVP builds.",
      "Maintained a 5.0★ average across all completed work.",
      "Specialise in Next.js + TypeScript + Stripe billing systems.",
    ],
    stack: ["TypeScript", "Next.js", "tRPC", "Drizzle", "Stripe", "Tailwind"],
  },
  {
    slug: "innomarkt",
    role: "Full Stack Web Developer",
    co: "Innomarkt · Berlin (remote)",
    when: "2023 — 2024",
    desc: "Built a real-time customer support / live-chat web component with WebSockets, file uploads, and admin tooling.",
    highlights: [
      "Shipped a drop-in chat web component used across customer sites.",
      "Designed the WebSocket protocol for live messaging + file transfer.",
      "Built admin dashboard for operators to triage conversations.",
      "Set up Turborepo monorepo across web component, backend, dashboard.",
    ],
    stack: ["Turborepo", "React", "Lit", "Express", "Socket.io", "Prisma"],
  },
  {
    slug: "tedxruet",
    role: "Lead Web Developer",
    co: "TEDxRUET",
    when: "2022 — 2023",
    desc: "Designed and shipped the official site. Sanity.io as headless CMS, event flows, speaker pages, blog.",
    highlights: [
      "Owned the full stack: design, build, deploy, and CMS authoring UX.",
      "Modelled events, speakers, team, and blog content in Sanity.",
      "Optimised Lighthouse to 95+ across all categories.",
    ],
    stack: ["Next.js", "Tailwind", "Sanity"],
  },
  {
    slug: "multiply-ai",
    role: "Front-end Developer",
    co: "Multiply AI",
    when: "2022",
    desc: "Marketing site for a B2B AI product. GatsbyJS, performance-focused, content-driven.",
    highlights: [
      "Built marketing pages and CMS-driven case studies in Gatsby.",
      "Static-first architecture for sub-second load times.",
    ],
    stack: ["GatsbyJS", "Tailwind"],
  },
];

export const PROJECTS: IProject[] = [
  {
    slug: "next-lucia-auth",
    name: "Next-Lucia Auth Starter",
    desc: "Next.js starter template with Lucia auth, Stripe billing, tRPC, Drizzle, shadcn/ui and react-email.",
    tags: [
      "typescript",
      "nextjs",
      "lucia",
      "drizzle",
      "trpc",
      "stripe",
      "tailwindcss",
      "shadcn-ui",
      "react-email",
    ],
    role: "Author · open source",
    year: "2024",
    about:
      "A batteries-included Next.js starter for indie SaaS. Pre-wires auth, billing, transactional email, and type-safe RPC so you can ship in a weekend.",
    features: [
      "Email/password + OAuth auth via Lucia, fully typed sessions.",
      "Stripe subscriptions with webhook handling and customer portal.",
      "Type-safe API layer with tRPC and Drizzle ORM.",
      "Themed UI via shadcn/ui, transactional email via react-email.",
    ],
    url: "https://www.touha.dev/projects/next-lucia-auth",
    featured: true,
  },
  {
    slug: "innomarkt-chat",
    name: "Innomarkt Chat",
    desc: "Drop-in live chat web component for any site. Real-time WebSocket messaging with file transfer.",
    tags: [
      "turborepo",
      "react",
      "express",
      "lit",
      "tailwindcss",
      "socket.io",
      "prisma",
    ],
    role: "Lead developer",
    year: "2023 — 2024",
    about:
      "A customer-support widget you can paste into any site as a single <script>. Visitors get a chat bubble; operators get a real-time inbox.",
    features: [
      "Lit-based web component embeds in any framework with zero conflicts.",
      "Socket.io for sub-second message delivery, presence, typing.",
      "File and image upload with progress + previews.",
      "Operator dashboard with conversation routing and history.",
    ],
    url: "https://www.touha.dev/projects/innomarkt-chat",
  },
  {
    slug: "tedxruet",
    name: "TEDxRUET Official",
    desc: "Event site with upcoming/past events, blog, speakers, team. Sanity.io headless CMS.",
    tags: ["nextjs", "tailwindcss", "sanity.io"],
    role: "Lead developer",
    year: "2022 — 2023",
    about:
      "Official site for TEDxRUET. Manages events, speakers, team members and editorial in Sanity, served as a static-incremental Next.js app.",
    features: [
      "Sanity schemas for events, speakers, teams, blog posts.",
      "On-demand ISR so editors see changes within seconds.",
      "Lighthouse 95+ across performance, accessibility, SEO.",
    ],
    url: "https://www.touha.dev/projects/tedxruet",
  },
  {
    slug: "multiply-ai",
    name: "Multiply AI",
    desc: "Static marketing site for a B2B AI product.",
    tags: ["gatsbyjs", "tailwindcss"],
    role: "Front-end developer",
    year: "2022",
    about:
      "Marketing site built static-first in Gatsby for fast loads and easy editorial workflow.",
    features: [
      "Component-driven layouts in Tailwind.",
      "CMS-driven case studies and customer logos.",
    ],
    url: "https://www.touha.dev/projects/multiply-ai",
  },
  {
    slug: "gadget-era",
    name: "Gadget Era",
    desc: "Full-stack e-commerce site with Pocketbase backend and React Query data layer.",
    tags: ["nextjs", "tailwindcss", "react-query", "pocketbase"],
    role: "Full stack",
    year: "2023",
    about:
      "A full e-commerce store with product catalog, cart, checkout, and order management — backed by Pocketbase for a single-binary deploy.",
    features: [
      "Pocketbase as auth + database + file storage.",
      "React Query for cache-first product browsing.",
      "Admin views for inventory and order fulfillment.",
    ],
    url: "https://www.touha.dev/projects/gadget-era",
  },
];

export const POSTS: IPost[] = [
  {
    t: 'Optimizing Array Search in JavaScript: Using "Set" for Efficient Lookups',
    d: "Oct 2, 2024",
    min: 5,
    s: "Traditional array methods get slow as data grows. Using Set lifts lookup performance dramatically for large datasets.",
    url: "https://www.touha.dev/posts/optimizing-array-search-in-javascript-using-set-for-efficient-lookups",
  },
  {
    t: "Create T3 App + Lucia — Simple Email/Password Auth for Next.js",
    d: "Dec 27, 2023",
    min: 2,
    s: "A pragmatic, flexible alternative to NextAuth.js using Lucia, wired into the T3 stack.",
    url: "https://www.touha.dev/posts/simple-nextjs-t3-authentication-with-lucia",
  },
  {
    t: "A TypeScript Type That Converts a String to a Number",
    d: "Dec 15, 2023",
    min: 5,
    s: "A pure-type trick I picked up solving an Advent of TypeScript challenge.",
    url: "https://www.touha.dev/posts/typescript-type-to-get-number-from-string",
  },
];

export const SKILLS: TSkills = {
  Languages: ["TypeScript", "JavaScript", "SQL", "Go", "Python"],
  Frontend: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "shadcn/ui",
    "Astro",
    "GatsbyJS",
  ],
  Backend: ["Node.js", "tRPC", "Express", "Lucia Auth", "Stripe"],
  Data: ["PostgreSQL", "Drizzle ORM", "Prisma", "Pocketbase", "Sanity.io"],
  Tooling: ["Turborepo", "Vercel", "Socket.io", "Docker", "Git"],
};

export const SOCIAL: ISocial[] = [
  { key: "email", display: "mail@touha.dev", href: "mailto:mail@touha.dev" },
  {
    key: "github",
    display: "github.com/iamtouha",
    href: "https://github.com/iamtouha",
  },
  {
    key: "linkedin",
    display: "linkedin.com/in/touhazr",
    href: "https://www.linkedin.com/in/touhazr",
  },
  {
    key: "twitter",
    display: "twitter.com/iamtouha",
    href: "https://twitter.com/iamtouha",
  },
  {
    key: "fiverr",
    display: "fiverr.com/touha98",
    href: "https://www.fiverr.com/touha98",
  },
];

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
