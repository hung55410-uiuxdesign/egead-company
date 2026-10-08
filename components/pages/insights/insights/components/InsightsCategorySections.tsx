"use client";

import Link from "next/link";
import MotionSection from "@/components/MotionSection";
import type { InsightsHubData } from "@/lib/services/blog.service";

type Props = {
  sections: InsightsHubData["sections"];
};

export default function InsightsCategorySections({ sections }: Props) {
  return (
    <div className="w-full bg-white text-black py-16 sm:py-24">
      {sections.map((sec, sIdx) => (
        <MotionSection
          key={sec.category.id || sec.category.slug}
          id={sec.category.slug}
          className={`w-full px-6 sm:px-10 lg:px-14 xl:px-16 scroll-mt-28 ${
            sIdx > 0
              ? "mt-24 sm:mt-28 pt-16 sm:pt-20 border-t border-gray-200"
              : ""
          }`}
        >
          {/* Section Header: Title + Category Icon on Left, View All Pill Button on Right */}
          <div className="flex items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              {sec.category.icon && (
                <img
                  src={sec.category.icon}
                  alt=""
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                />
              )}
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-medium text-[#003d5b] font-montserrat">
                {sec.category.name}
              </h2>
            </div>

            <Link
              href={sec.link}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1c1e24] hover:bg-black hover:text-white text-xs font-semibold text-[#1c1e24] transition duration-200 shadow-sm font-montserrat"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current text-[#1c1e24] group-hover:text-white transition-colors"
              >
                <path
                  d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
                  fill="currentColor"
                />
              </svg>
              <span>View All</span>
            </Link>
          </div>

          {/* 3-Column Cards Grid or Clean Empty State */}
          {sec.posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {sec.posts.map((item) => (
                <Link
                  key={item.id || item.slug}
                  href={`/articles/${item.slug}`}
                  className="group flex flex-col h-full cursor-pointer"
                >
                  {/* Square Image with rounded-[20px] */}
                  <div className="relative aspect-square w-full rounded-[20px] overflow-hidden bg-gray-100 mb-5 shadow-sm">
                    <img
                      src={item.heroImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Status Badge + Read Time */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-[4px] border border-[#1c1e24] bg-white text-[#1c1e24] text-[10px] font-bold font-montserrat">
                      {item.category || sec.category.name}
                    </span>
                    <span className="text-[10px] font-medium text-[#666666] font-montserrat">
                      {item.readTime || "5 mins read"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-[22px] font-medium text-black group-hover:text-[#008060] font-montserrat leading-snug line-clamp-2 transition-colors mb-2">
                    {item.title}
                  </h3>

                  {/* Date */}
                  <span className="text-xs text-[#666666] font-montserrat mt-auto pt-2 block">
                    {item.date}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 px-6 rounded-2xl bg-gray-50/80 border border-dashed border-gray-200 text-center">
              <p className="text-sm text-gray-400 font-montserrat">
                Chưa có bài viết nào trong chuyên mục {sec.category.name}.
              </p>
            </div>
          )}

          {/* Mobile View All Button */}
          {sec.posts.length > 0 && (
            <div className="mt-8 flex sm:hidden justify-center">
              <Link
                href={sec.link}
                className="inline-flex items-center justify-center w-full py-3 rounded-full border border-black text-xs font-semibold text-black hover:bg-black hover:text-white transition font-montserrat"
              >
                <span>View All {sec.category.name}</span>
              </Link>
            </div>
          )}
        </MotionSection>
      ))}
    </div>
  );
}
