"use client";

import { useContent } from "../../contexts";
import { MarkdownProse } from "../MarkdownProse";
import { readingTimeMinutes } from "../MarkdownProse/MarkdownProse.helpers";

interface IPostDetailProps {
  slug: string;
}

export function PostDetail({ slug }: IPostDetailProps) {
  const { posts } = useContent();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="mb-1 mt-2">
        <div className="text-red">
          no post with slug <span className="text-accent">{slug}</span>.
        </div>
        <div className="mt-1 text-muted">
          run <span className="text-accent">/posts</span> to list.
        </div>
      </div>
    );
  }

  const min = readingTimeMinutes(post.body);

  return (
    <div className="mb-1 mt-2">
      <div className="border-l-2 border-accent pl-2.5">
        <div className="font-bold text-accent">{post.title}</div>
        <div className="text-muted">
          {post.date} · {min} min read
        </div>
      </div>
      {post.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover}
          alt=""
          loading="lazy"
          className="my-3 block w-full max-w-180 rounded-sm border border-border-token"
        />
      ) : null}
      <MarkdownProse body={post.body} />
      <div className="my-4 text-center text-[0.6875rem] tracking-[0.3em] text-dim">
        ─── EOF ───
      </div>
      <div className="mt-2 text-dim">
        ↩ run <span className="text-accent">/posts</span> to go back to the list
      </div>
    </div>
  );
}
