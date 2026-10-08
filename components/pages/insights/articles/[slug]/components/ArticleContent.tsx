"use client";

import type { BlogPost } from "@/types/blog";

type Props = {
  post: BlogPost;
  tagsList: string[];
};

export default function ArticleContent({ post, tagsList }: Props) {
  return (
    <div className="flex-1 w-full lg:max-w-3xl">
      <div className="text-base sm:text-lg text-black font-light leading-[30px] font-montserrat space-y-6">
        {Array.isArray(post.content) ? (
          post.content.map((paragraph, idx) => {
            if (paragraph.startsWith("<h4>")) {
              const text = paragraph.replace(/<\/?h4>/g, "");
              return (
                <h4
                  key={idx}
                  className="text-xl sm:text-2xl font-semibold text-black font-montserrat pt-4 pb-2"
                >
                  {text}
                </h4>
              );
            }
            return (
              <div
                key={idx}
                className="leading-[30px]"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            );
          })
        ) : (
          <div
            className="prose prose-lg max-w-none text-black leading-[30px]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </div>

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
