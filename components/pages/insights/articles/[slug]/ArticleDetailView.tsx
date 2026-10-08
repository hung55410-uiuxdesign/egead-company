"use client";

import ContactBlock from "@/components/ContactBlock";
import { MotionDiv } from "@/components/MotionSection";
import type { BlogPost } from "@/types/blog";
import ArticleHeader from "./components/ArticleHeader";
import ArticleContent from "./components/ArticleContent";
import ArticleSidebar from "./components/ArticleSidebar";

type Props = {
  post: BlogPost;
  nextArticle: BlogPost | null;
  backLink: string;
  backLabel: string;
  tagsList: string[];
  isWhitePaper: boolean;
};

export default function ArticleDetailView({
  post,
  nextArticle,
  backLink,
  backLabel,
  tagsList,
  isWhitePaper,
}: Props) {
  return (
    <article className="w-full overflow-hidden">
      {/* PART 1: HEADER SECTION */}
      <ArticleHeader
        post={post}
        nextArticle={nextArticle}
        backLink={backLink}
        backLabel={backLabel}
      />

      {/* PART 2: BODY SECTION (Content + Lead Form) */}
      <div className="w-full bg-white text-black py-16 sm:py-24 px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between items-start">
          <ArticleContent post={post} tagsList={tagsList} />
          <ArticleSidebar isWhitePaper={isWhitePaper} />
        </div>
      </div>

      {/* PART 3: BOTTOM CONTACT SECTION */}
      <MotionDiv threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </article>
  );
}
