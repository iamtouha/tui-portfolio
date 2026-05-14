export interface IInlineNode {
  type:
    | "text"
    | "code"
    | "strong"
    | "em"
    | "link"
    | "image";
  text?: string;
  href?: string;
  alt?: string;
  src?: string;
}

export type TInlineNodes = IInlineNode[];

export type TBlock =
  | { kind: "p"; inline: TInlineNodes }
  | { kind: "h"; level: 1 | 2 | 3 | 4; inline: TInlineNodes }
  | { kind: "ul"; items: TInlineNodes[] }
  | { kind: "quote"; inline: TInlineNodes }
  | { kind: "code"; lang: string; content: string }
  | { kind: "figure"; alt: string; src: string };

const HEADING_RE = /^(#{1,4})\s+(.*)$/;
const FENCE_OPEN_RE = /^```(\w*)\s*$/;
const FENCE_CLOSE_RE = /^```\s*$/;
const QUOTE_RE = /^>\s?/;
const LIST_RE = /^\s*[-*]\s+/;
const IMAGE_LINE_RE = /^!\[([^\]]*)\]\(([^)]+)\)\s*$/;
const BLANK_RE = /^\s*$/;
const BLOCK_BREAK_RE = /^(#{1,4}\s|>\s?|\s*[-*]\s|`{3})/;

const IMG_RE = /!\[([^\]]*)\]\(([^)]+)\)/;
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/;
const CODE_RE = /`([^`]+)`/;
const BOLD_RE = /\*\*([^*]+)\*\*/;
const ITALIC_RE = /(^|[^*])\*([^*]+)\*/;

export function parseBlocks(src: string): TBlock[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: TBlock[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    const fence = line.match(FENCE_OPEN_RE);
    if (fence) {
      const lang = fence[1] ?? "";
      const buf: string[] = [];
      i++;
      while (i < lines.length && !FENCE_CLOSE_RE.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ kind: "code", lang, content: buf.join("\n") });
      continue;
    }

    const h = line.match(HEADING_RE);
    if (h) {
      const level = h[1].length as 1 | 2 | 3 | 4;
      blocks.push({ kind: "h", level, inline: parseInline(h[2]) });
      i++;
      continue;
    }

    if (QUOTE_RE.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && QUOTE_RE.test(lines[i])) {
        buf.push(lines[i].replace(QUOTE_RE, ""));
        i++;
      }
      blocks.push({ kind: "quote", inline: parseInline(buf.join(" ")) });
      continue;
    }

    if (LIST_RE.test(line)) {
      const items: TInlineNodes[] = [];
      while (i < lines.length && LIST_RE.test(lines[i])) {
        items.push(parseInline(lines[i].replace(LIST_RE, "")));
        i++;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }

    const imgOnly = line.match(IMAGE_LINE_RE);
    if (imgOnly) {
      blocks.push({ kind: "figure", alt: imgOnly[1] ?? "", src: imgOnly[2] });
      i++;
      continue;
    }

    if (BLANK_RE.test(line)) {
      i++;
      continue;
    }

    const buf: string[] = [];
    while (
      i < lines.length &&
      !BLANK_RE.test(lines[i]) &&
      !BLOCK_BREAK_RE.test(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ kind: "p", inline: parseInline(buf.join(" ")) });
  }
  return blocks;
}

export function parseInline(input: string): TInlineNodes {
  const out: TInlineNodes = [];
  let s = input;

  while (s.length > 0) {
    const next = findNextToken(s);
    if (!next) {
      out.push({ type: "text", text: s });
      break;
    }
    if (next.index > 0) {
      out.push({ type: "text", text: s.slice(0, next.index) });
    }
    out.push(next.node);
    s = s.slice(next.index + next.length);
  }
  return out;
}

interface ITokenMatch {
  node: IInlineNode;
  index: number;
  length: number;
}

function findNextToken(s: string): ITokenMatch | null {
  const candidates: ITokenMatch[] = [];

  const img = s.match(IMG_RE);
  if (img && img.index !== undefined) {
    candidates.push({
      node: { type: "image", alt: img[1] ?? "", src: img[2] },
      index: img.index,
      length: img[0].length,
    });
  }
  const link = s.match(LINK_RE);
  if (link && link.index !== undefined) {
    if (s[link.index - 1] !== "!") {
      candidates.push({
        node: { type: "link", text: link[1], href: link[2] },
        index: link.index,
        length: link[0].length,
      });
    }
  }
  const code = s.match(CODE_RE);
  if (code && code.index !== undefined) {
    candidates.push({
      node: { type: "code", text: code[1] },
      index: code.index,
      length: code[0].length,
    });
  }
  const bold = s.match(BOLD_RE);
  if (bold && bold.index !== undefined) {
    candidates.push({
      node: { type: "strong", text: bold[1] },
      index: bold.index,
      length: bold[0].length,
    });
  }
  const italic = s.match(ITALIC_RE);
  if (italic && italic.index !== undefined) {
    const leading = italic[1] ?? "";
    candidates.push({
      node: { type: "em", text: italic[2] },
      index: italic.index + leading.length,
      length: italic[0].length - leading.length,
    });
  }

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => a.index - b.index);
  return candidates[0];
}

export function readingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
