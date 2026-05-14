import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

import { getContent } from "@common/api/content";
import type { IPortfolioContent } from "@features/portfolio-tui/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface IChatHistoryTurn {
  role: "user" | "model";
  text: string;
}

interface IChatRequestBody {
  message?: string;
  history?: IChatHistoryTurn[];
}

const DEFAULT_MODEL = "gemini-2.5-flash";
const HISTORY_LIMIT = 10;
const MAX_MESSAGE_CHARS = 2000;

function buildSystemInstruction(content: IPortfolioContent): string {
  const { profile, skills, experience, projects, posts, socials } = content;

  const skillLines = Object.entries(skills)
    .map(([group, items]) => `- ${group}: ${items.join(", ")}`)
    .join("\n");

  const experienceLines = experience
    .map((e) => `- ${e.role} @ ${e.co} (${e.when}): ${e.desc}`)
    .join("\n");

  const projectLines = projects
    .map((p) => `- ${p.name} [${p.year}]: ${p.desc}`)
    .join("\n");

  const postLines = posts
    .map((p) => `- ${p.title} (${p.date}): ${p.summary}`)
    .join("\n");

  const socialLines = socials
    .map((s) => `- ${s.display}: ${s.href}`)
    .join("\n");

  return [
    `You are ${profile.name} (${profile.handle}), ${profile.role}, based in ${profile.location} (${profile.timezone}).`,
    `Tagline: ${profile.tagline}`,
    `Primary stacks: ${profile.stacks.join(", ")}`,
    "",
    "Voice & rules:",
    "- Answer in first person as Touha.",
    "- Be concise and terminal-flavored. Short paragraphs, no markdown headers, no bullet lists unless asked.",
    "- If a question is not covered by the data below, say so plainly instead of fabricating.",
    "- Only share contact info that appears in the socials list or profile email.",
    "- Stay on-topic: this is a portfolio assistant, not a general-purpose chatbot. Politely decline unrelated requests.",
    "",
    "## Skills",
    skillLines,
    "",
    "## Experience",
    experienceLines,
    "",
    "## Projects",
    projectLines,
    "",
    "## Posts",
    postLines,
    "",
    "## Socials",
    socialLines,
    "",
    `## Email`,
    profile.email,
  ].join("\n");
}

function toContents(
  history: IChatHistoryTurn[],
  message: string,
): Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> {
  const trimmed = history.slice(-HISTORY_LIMIT);
  const turns = trimmed.map((t) => ({
    role: t.role,
    parts: [{ text: t.text }],
  }));
  turns.push({ role: "user", parts: [{ text: message }] });
  return turns;
}

export async function POST(req: NextRequest): Promise<Response> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured" },
      { status: 503 },
    );
  }

  let body: IChatRequestBody;
  try {
    body = (await req.json()) as IChatRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json(
      { error: `Message exceeds ${MAX_MESSAGE_CHARS} characters` },
      { status: 413 },
    );
  }

  const history = Array.isArray(body.history) ? body.history : [];

  const content = await getContent();
  const systemInstruction = buildSystemInstruction(content);
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  const ai = new GoogleGenAI({ apiKey });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const result = await ai.models.generateContentStream({
          model,
          contents: toContents(history, message),
          config: { systemInstruction },
        });
        for await (const chunk of result) {
          if (req.signal.aborted) break;
          const text = chunk.text;
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Unknown Gemini error";
        controller.enqueue(encoder.encode(`\n[error] ${msg}`));
        controller.close();
      }
    },
    cancel() {
      // Client aborted; nothing extra to clean up.
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store, no-transform",
      "x-accel-buffering": "no",
    },
  });
}
