"use client";

import { useLocalizeHref } from "@/components/providers/LocaleProvider";

import Link from "next/link";
import MotionSection from "@/components/MotionSection";
import type { BlogPost } from "@/types/blog";
import { getMediaThumbnailUrl } from "@/lib/utils/media";

type Props = {
  featured: BlogPost[];
};

export default function InsightsFeaturedSection({ featured }: Props) {
  const lh = useLocalizeHref();
  return (
    <MotionSection
      id="featured-insight"
      className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 scroll-mt-28"
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-normal text-white font-montserrat">
          Featured Insights
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
        {featured.map((item) => (
          <Link
            key={item.id || item.slug}
            href={lh(`/articles/${item.slug}`)}
            className="group flex flex-col cursor-pointer"
          >
            {/* Image: Square/4:3 aspect ratio, rounded-[20px] */}
            <div className="relative aspect-[16/10] sm:aspect-square lg:aspect-[16/10] w-full rounded-[20px] overflow-hidden bg-white/5 mb-5 shadow-lg">
              <img
                src={getMediaThumbnailUrl(item.heroImage)}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Status: Tag + readtime */}
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 rounded-[4px] border border-white/30 bg-black text-white text-[10px] font-bold font-montserrat">
                {item.category || item.tag}
              </span>
              <span className="text-[10px] font-medium text-gray-400 font-montserrat">
                {item.readTime || "5 mins read"}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-medium text-white group-hover:text-[#10E774] font-montserrat leading-snug line-clamp-2 transition-colors mb-2">
              {item.title}
            </h3>

            {/* Date */}
            <span className="text-xs text-gray-400 font-montserrat mt-auto pt-2 block">
              {item.date}
            </span>
          </Link>
        ))}
      </div>
    </MotionSection>
  );
}
