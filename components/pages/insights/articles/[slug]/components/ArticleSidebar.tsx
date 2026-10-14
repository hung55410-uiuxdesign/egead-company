"use client";

import ArticleLeadForm from "./ArticleLeadForm";

type Props = {
  isWhitePaper: boolean;
  articleTitle?: string;
};

export default function ArticleSidebar({ articleTitle }: Props) {
  return (
    <div className="w-full lg:w-[420px] shrink-0 lg:sticky lg:top-28">
      <ArticleLeadForm
        title="Leave Us Your Information, and We'll Be in Touch."
        subtitle="Get in touch with E-GEAD specialists to discuss operations, automation, and scaling your business."
        buttonText="SUBMIT INQUIRY"
        articleTitle={articleTitle}
      />
    </div>
  );
}
