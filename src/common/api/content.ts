import "server-only";

import { cache } from "react";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import type {
  IExperience,
  IFeatured,
  IPortfolioContent,
  IPost,
  IProfile,
  IProject,
  ISocial,
  TSkills,
} from "@features/portfolio-tui/types";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const POSTS_DIR = path.join(CONTENT_ROOT, "posts");
const PROJECTS_DIR = path.join(CONTENT_ROOT, "projects");
const JSON_EXT = ".json";

interface ISkillsContentGroup {
  name: string;
  items: string[];
}

interface ISkillsContent {
  groups: ISkillsContentGroup[];
}

interface IItemsContent<T> {
  items: T[];
}

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function readDir<T extends { slug: string }>(
  dirPath: string,
): Promise<T[]> {
  let names: string[];
  try {
    names = await readdir(dirPath);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }

  const jsonFiles = names.filter((n) => n.endsWith(JSON_EXT));
  const items = await Promise.all(
    jsonFiles.map(async (name) => {
      const slug = name.slice(0, -JSON_EXT.length);
      const data = await readJson<Omit<T, "slug">>(path.join(dirPath, name));
      return { slug, ...data } as T;
    }),
  );
  return items;
}

export const getPosts = cache(async (): Promise<IPost[]> => {
  const posts = await readDir<IPost>(POSTS_DIR);
  return posts.sort((a, b) => b.date.localeCompare(a.date));
});

export const getPost = cache(async (slug: string): Promise<IPost | null> => {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
});

export const getProjects = cache(async (): Promise<IProject[]> => {
  return readDir<IProject>(PROJECTS_DIR);
});

export const getProject = cache(
  async (slug: string): Promise<IProject | null> => {
    const projects = await getProjects();
    return projects.find((p) => p.slug === slug) ?? null;
  },
);

export const getProfile = cache(async (): Promise<IProfile> => {
  return readJson<IProfile>(path.join(CONTENT_ROOT, "profile.json"));
});

export const getExperience = cache(async (): Promise<IExperience[]> => {
  const data = await readJson<IItemsContent<IExperience>>(
    path.join(CONTENT_ROOT, "experience.json"),
  );
  return data.items;
});

export const getSkills = cache(async (): Promise<TSkills> => {
  const data = await readJson<ISkillsContent>(
    path.join(CONTENT_ROOT, "skills.json"),
  );
  return data.groups.reduce<TSkills>(
    (skills, group) => ({ ...skills, [group.name]: group.items }),
    {},
  );
});

export const getSocials = cache(async (): Promise<ISocial[]> => {
  const data = await readJson<IItemsContent<ISocial>>(
    path.join(CONTENT_ROOT, "socials.json"),
  );
  return data.items;
});

export const getFeatured = cache(async (): Promise<IFeatured> => {
  return readJson<IFeatured>(path.join(CONTENT_ROOT, "featured.json"));
});

export const getContent = cache(async (): Promise<IPortfolioContent> => {
  const [profile, experience, projects, posts, skills, socials, featured] =
    await Promise.all([
      getProfile(),
      getExperience(),
      getProjects(),
      getPosts(),
      getSkills(),
      getSocials(),
      getFeatured(),
    ]);
  return { profile, experience, projects, posts, skills, socials, featured };
});
