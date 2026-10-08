"use client";

import { MotionHero } from "@/components/MotionSection";
import type { CategoryItem } from "@/types/category";

type Props = {
  categories: CategoryItem[];
};

export default function InsightsHeroSection({ categories }: Props) {
  return (
    <MotionHero className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
      <div className="w-full">
        <span className="text-xs text-[#10E774] font-semibold block mb-3 font-montserrat">
          Insights
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-semibold text-white font-montserrat leading-tight mb-4">
          <span>Discover</span> the Future, Today.
        </h1>
        <p className="text-base sm:text-lg text-gray-400 font-light max-w-2xl leading-relaxed font-montserrat">
          Stay updated on new products, company milestones, and upcoming events.
        </p>

        {/* Jump Navigation Pills (dynamically mapped from database categories) */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-8 pt-6 border-t border-white/10">
          <a
            href="#featured-insight"
            className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/20 hover:border-white text-xs font-semibold text-gray-200 hover:text-white transition duration-200 hover:bg-white/10 shadow-sm font-montserrat"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current text-gray-400 group-hover:text-white transition-colors"
            >
              <path
                d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
                fill="currentColor"
              />
            </svg>
            <span>Featured Insights</span>
          </a>

          {categories.map((cat) => (
            <a
              key={cat.id || cat.slug}
              href={`#${cat.slug}`}
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/20 hover:border-white text-xs font-semibold text-gray-200 hover:text-white transition duration-200 hover:bg-white/10 shadow-sm font-montserrat"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current text-gray-400 group-hover:text-white transition-colors"
              >
                <path
                  d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
                  fill="currentColor"
                />
              </svg>
              <span>{cat.name}</span>
            </a>
          ))}
        </div>
      </div>
    </MotionHero>
  );
}
