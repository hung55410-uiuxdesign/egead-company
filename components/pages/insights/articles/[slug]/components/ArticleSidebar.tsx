"use client";

import ArticleLeadForm from "./ArticleLeadForm";

type Props = {
  isWhitePaper: boolean;
};

export default function ArticleSidebar({ isWhitePaper }: Props) {
  return (
    <div className="w-full lg:w-[420px] shrink-0">
      <ArticleLeadForm
        title={
          isWhitePaper
            ? "Download white paper now!"
            : "Sign up to watch on demand now!"
        }
        buttonText={isWhitePaper ? "Download Now" : "Watch On Demand Now"}
      />
    </div>
  );
}
