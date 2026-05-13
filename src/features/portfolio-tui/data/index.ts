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
  timezone: "UTC+6 (Asia/Dhaka)",
  role: "Software Engineer",
  location: "Dhaka, Bangladesh",
  email: "mail@touha.dev",
  tagline:
    "Full-stack developer building scalable, reliable web apps, APIs, and intuitive interfaces. Experienced with performance, cloud platforms, AI tools, team leadership, and end-to-end project delivery.",
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
    slug: "sazim-tech",
    role: "Software Engineer I",
    co: "Sazim Tech Ltd. · Full-time (hybrid)",
    when: "March 2025 - Present",
    desc: "Integrated user management and digital wallet functionality while improving onboarding flow and product UX.",
    highlights: [
      "Integrated secure user account management and digital wallet transactions.",
      "Optimized onboarding workflow with improved UX and automation.",
      "Reduced average onboarding time by 20%.",
    ],
    stack: ["Nest.js", "Next.js", "AWS", "Docker", "Playwright"],
  },
  {
    slug: "grit-technologies",
    role: "Full-stack Developer / Junior Full-stack Developer",
    co: "Grit Technologies Limited · Full-time (hybrid)",
    when: "March 2024 - February 2025",
    desc: "Built secure product features, RPA APIs, AI prompt updates, and tested business logic for healthcare and organization workflows.",
    highlights: [
      "Implemented 2FA, identity verification, notifications, and related features for 10+ organizations.",
      "Developed an RPA API that increased patient documentation capacity from 10 to 100+ per day.",
      "Updated AI prompts and parsing logic to resolve 20+ stability and performance bugs.",
      "Maintained over 80% test coverage with end-to-end, unit, and integration tests.",
      "Improved app performance by 20% and cut deployment time by 60%.",
    ],
    stack: [
      "Next.js",
      "Anthropic Claude",
      "Material UI",
      "Prisma",
      "tRPC",
      "Cypress",
      "Jest",
      "NextAuth",
      "Inngest",
    ],
  },
  {
    slug: "freelance",
    role: "Web Developer",
    co: "Freelance Web Development · Fiverr",
    when: "September 2020 - February 2024",
    desc: "Delivered web development projects for clients across React, Next.js, Node.js, Express, and MongoDB stacks.",
    highlights: [
      "Worked with more than 30 clients, including 12 recurring clients.",
      "Completed 70+ orders across frontend and backend web development.",
      "Achieved Level 2 seller status on Fiverr with 100% client satisfaction.",
    ],
    stack: ["React.js", "Next.js", "Node.js", "Express", "MongoDB"],
  },
];

export const PROJECTS: IProject[] = [
  {
    slug: "apricot-health",
    name: "Apricot Health",
    desc: "Generative AI-powered platform that streamlines patient documentation for 10+ organizations.",
    tags: [
      "nextjs",
      "material-ui",
      "cypress",
      "vitest",
      "inngest",
      "gcp",
      "claude",
    ],
    role: "Full-stack developer",
    year: "2024 - 2025",
    about:
      "A generative AI-powered healthcare platform that helps organizations streamline patient documentation workflows.",
    features: [
      "Built reusable UI components for documentation and workflow screens.",
      "Developed secure APIs for healthcare documentation flows.",
      "Wrote comprehensive unit, integration, and end-to-end tests.",
      "Supported AI-assisted workflows used by more than 10 organizations.",
    ],
    url: "https://apricothealth.ai",
    featured: true,
  },
  {
    slug: "unive",
    name: "Unive",
    desc: "EdTech platform for industry-specific skill development courses and assessment tests.",
    tags: [
      "nextjs",
      "express",
      "tailwindcss",
      "github-actions",
      "docker",
      "aws",
    ],
    role: "Full-stack developer",
    year: "2024",
    about:
      "An EdTech platform offering industry-specific courses, assessment tests, backend services, and delivery infrastructure.",
    features: [
      "Built course and assessment UI components.",
      "Developed backend APIs for platform workflows.",
      "Implemented CI/CD pipelines with GitHub Actions, Docker, and AWS.",
      "Resolved 15+ critical security vulnerabilities.",
    ],
    url: "https://unive.com.bd",
  },
  {
    slug: "innochat",
    name: "Innochat",
    desc: "Realtime messaging kit with an npm package, embeddable widget, and admin dashboard.",
    tags: [
      "react",
      "web-components",
      "lit",
      "express",
      "prisma",
      "tanstack-query",
      "socket.io",
      "turborepo",
    ],
    role: "Full-stack developer",
    year: "2023 - 2024",
    about:
      "A real-time messaging solution that can be integrated into any website by installing an npm package.",
    features: [
      "Built an embeddable messaging kit for website integration.",
      "Added image and file sharing for realtime conversations.",
      "Implemented active status indicators and Socket.io messaging.",
      "Built an admin dashboard for user management and performance tracking.",
    ],
    url: "https://chat.innomarktconsultancy.com",
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
