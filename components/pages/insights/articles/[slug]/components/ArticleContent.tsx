"use client";

import type { BlogPost } from "@/types/blog";

type Props = {
  post: BlogPost;
  tagsList: string[];
};

export default function ArticleContent({ post, tagsList }: Props) {
  const contentHtml = Array.isArray(post.content)
    ? post.content
        .map((p) =>
          typeof p === "string" && (p.trim().startsWith("<") ? p : `<p>${p}</p>`),
        )
        .join("")
    : post.content || "";

  return (
    <div className="flex-1 w-full lg:max-w-3xl">
      <div
        className="tiptap-content select-text"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Tags at bottom of article */}
      <div className="flex flex-wrap items-center gap-2 pt-10 mt-10 border-t border-gray-200">
        {tagsList.map((tag) => (
          <span
            key={tag}
            className="px-3.5 py-1.5 rounded-md bg-[#f2f2f2] text-xs text-[#666666] font-medium font-montserrat"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
