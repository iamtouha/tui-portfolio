import { Fragment, type ReactNode } from "react";
import {
  parseBlocks,
  type TBlock,
  type TInlineNodes,
} from "./MarkdownProse.helpers";

interface IMarkdownProseProps {
  body: string;
}

const HEADING_PREFIX: Record<2 | 3 | 4, string> = {
  2: "## ",
  3: "### ",
  4: "#### ",
};

const HEADING_SIZE: Record<1 | 2 | 3 | 4, string> = {
  1: "text-[1.125rem]",
  2: "text-[1rem]",
  3: "text-[0.90625rem]",
  4: "text-[0.875rem]",
};

function renderInline(nodes: TInlineNodes): ReactNode {
  return nodes.map((n, i) => {
    switch (n.type) {
      case "text":
        return <Fragment key={i}>{n.text}</Fragment>;
      case "code":
        return (
          <code
            key={i}
            className="rounded-[0.1875rem] border border-border-token bg-bg-soft px-1 text-[0.78125rem] text-accent"
          >
            {n.text}
          </code>
        );
      case "strong":
        return (
          <strong key={i} className="font-bold text-fg">
            {n.text}
          </strong>
        );
      case "em":
        return (
          <em key={i} className="italic text-accent-2">
            {n.text}
          </em>
        );
      case "link":
        return (
          <a
            key={i}
            href={n.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-dotted border-blue text-blue no-underline hover:border-accent hover:text-accent"
          >
            {n.text}
          </a>
        );
      case "image":
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={n.src}
            alt={n.alt ?? ""}
            loading="lazy"
            className="inline-block max-w-full rounded-[0.1875rem] align-middle"
          />
        );
    }
  });
}

function renderBlock(b: TBlock, i: number): ReactNode {
  switch (b.kind) {
    case "h": {
      const Tag = (`h${b.level}` as unknown) as
        | "h1"
        | "h2"
        | "h3"
        | "h4";
      const prefix = b.level === 1 ? null : HEADING_PREFIX[b.level];
      return (
        <Tag
          key={i}
          className={`mb-2 mt-4.5 leading-[1.25] text-fg ${HEADING_SIZE[b.level]}`}
        >
          {prefix ? <span className="text-accent">{prefix}</span> : null}
          {renderInline(b.inline)}
        </Tag>
      );
    }
    case "p":
      return (
        <p key={i} className="my-2.5">
          {renderInline(b.inline)}
        </p>
      );
    case "ul":
      return (
        <ul
          key={i}
          className="my-2 list-disc pl-5 [&_li]:my-0.5 [&_li::marker]:text-accent"
        >
          {b.items.map((item, j) => (
            <li key={j}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-3 border-l-2 border-accent bg-[var(--card-hover)] py-0.5 pl-3 text-muted"
        >
          {renderInline(b.inline)}
        </blockquote>
      );
    case "code":
      return (
        <pre
          key={i}
          className="my-2.5 overflow-x-auto rounded-[0.25rem] border border-border-token bg-bg-soft px-3 py-2.5 text-[0.78125rem] leading-[1.5]"
        >
          <code className="text-fg" data-lang={b.lang}>
            {b.content}
          </code>
        </pre>
      );
    case "figure":
      return (
        <figure key={i} className="my-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={b.src}
            alt={b.alt}
            loading="lazy"
            className="block w-full max-w-[45rem] rounded-[0.25rem] border border-border-token"
          />
          {b.alt ? (
            <figcaption className="mt-1 pl-1 text-[0.75rem] text-dim">
              {b.alt}
            </figcaption>
          ) : null}
        </figure>
      );
  }
}

export function MarkdownProse({ body }: IMarkdownProseProps) {
  const blocks = parseBlocks(body);
  return (
    <div className="mt-2 max-w-[72ch] text-fg">
      {blocks.map((b, i) => renderBlock(b, i))}
    </div>
  );
}
