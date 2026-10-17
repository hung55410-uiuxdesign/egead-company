"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLatestArticlesQuery } from "@/lib/hooks";
import { getOptimizedImageUrl } from "@/lib/utils/image";
import { getMediaThumbnailUrl } from "@/lib/utils/media";
import type { BlogPost } from "@/types/blog";

export type ArticleItem = {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tag: string;
};

function formatPostToArticleItem(post: any): ArticleItem {
  const authorName =
    typeof post.author === "string"
      ? post.author
      : post.author?.name || post.authorName || "E-GEAD Team";

  let displayDate = post.date;
  if (!displayDate && post.createdAt) {
    try {
      displayDate = new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      displayDate = "Recently";
    }
  }

  return {
    id: post.id || post.slug,
    slug: post.slug,
    title: post.title,
    author: authorName,
    date: displayDate || "Recently",
    readTime: post.readTime || "5 MIN",
    image: getMediaThumbnailUrl(post.heroImage) || post.image || "/assets/case_brother.jpg",
    tag: post.tag || post.categoryName || post.category || "Insights",
  };
}

const rowSlideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 320 : -320,
    opacity: 0,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      x: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.45 },
      filter: { duration: 0.35 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -320 : 320,
    opacity: 0,
    filter: "blur(6px)",
    transition: {
      x: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.35 },
      filter: { duration: 0.3 },
    },
  }),
};

export interface InsightsSectionProps {
  initialArticles?: BlogPost[] | ArticleItem[];
  id?: string;
  className?: string;
  tagline?: string;
  title?: string;
}

export default function InsightsSection({
  initialArticles,
  id = "homepage__insight",
  className = "",
  tagline = "Insights",
  title = "Our latest news.",
}: InsightsSectionProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // TanStack Query: Fetch latest published articles with SSR initialData
  const { data: postsData } = useLatestArticlesQuery({
    limit: 10,
    initialData: initialArticles,
  });

  const articles: ArticleItem[] = useMemo(() => {
    if (postsData && Array.isArray(postsData) && postsData.length > 0) {
      return postsData.map(formatPostToArticleItem);
    }
    if (
      initialArticles &&
      Array.isArray(initialArticles) &&
      initialArticles.length > 0
    ) {
      return initialArticles.map(formatPostToArticleItem);
    }
    return [];
  }, [postsData, initialArticles]);

  const total = articles.length;
  const safeCurrentIndex = total > 0 ? currentIndex % total : 0;

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    if (total === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName || "")
      )
        return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, total]);

  if (total === 0) {
    return null;
  }

  const visibleItems = [0, 1, 2, 3].map((offset) => {
    const index = (safeCurrentIndex + offset) % total;
    return {
      article: articles[index],
      isHero: offset === 0,
    };
  });

  return (
    <section
      id={id}
      className={`homepage__insight relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden border-t border-white/10 select-none ${className}`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat"
          >
            {tagline}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-[34px] font-semibold font-montserrat leading-[1.3] tracking-tight"
          >
            <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3.5 self-start md:self-end shrink-0"
        >
          <div className="text-xs text-white/50 font-mono tracking-widest mr-1 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="text-[#6CE8C3] font-semibold inline-block"
              >
                {String(currentIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span className="mx-1 text-white/30">/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.15, rotate: -4 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              aria-label="Previous insight"
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#6CE8C3] transition-colors shadow-md group cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:-translate-x-0.5 transition-transform" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.15, rotate: 4 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              aria-label="Next insight"
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#6CE8C3] transition-colors shadow-md group cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>

          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-white/20 hover:border-[#5EFC8D] hover:text-[#5EFC8D] hover:bg-white/5 text-[#D4FAE6] font-medium text-sm transition duration-300 shrink-0 font-montserrat shadow-sm"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#D4FAE6] group-hover:fill-[#5EFC8D] transition"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
              <span>View All Insights</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative w-full px-6 sm:px-10 lg:px-14 xl:px-16 overflow-hidden min-h-[460px] sm:min-h-[500px]">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={rowSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 || info.velocity.x < -300) {
                handleNext();
              } else if (info.offset.x > 60 || info.velocity.x > 300) {
                handlePrev();
              }
            }}
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.85fr_1fr_1fr_1fr] gap-6 lg:gap-6 xl:gap-8 items-start cursor-grab active:cursor-grabbing"
          >
            {visibleItems.map(({ article, isHero }, index) => {
              if (isHero) {
                return (
                  <motion.div
                    key={`${article.id}-${currentIndex}-hero`}
                    whileHover={{ y: -8 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 22,
                    }}
                    className="h-full"
                  >
                    <Link
                      href={`/articles/${article.slug}`}
                      className="group flex flex-col h-full transition-all duration-300"
                    >
                      <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] xl:h-[420px] overflow-hidden bg-[#181d1f] rounded-xl border border-white/10 group-hover:border-[#5EFC8D]/50 transition-colors shadow-lg">
                        <img
                          src={getOptimizedImageUrl(article.image, { width: 1200, quality: "best" })}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/assets/case_brother.jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      </div>

                      <div className="flex items-center justify-between text-xs sm:text-[13px] text-[#8e8e93] font-mono tracking-wider mt-4 sm:mt-5 mb-2 sm:mb-3">
                        <span className="font-medium text-[#b0b0b5] truncate max-w-[55%]">
                          {article.author}
                        </span>
                        <span className="shrink-0">
                          {article.date} | {article.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl lg:text-[22px] xl:text-[24px] font-medium text-white group-hover:text-[#5EFC8D] transition-colors leading-[1.35] font-montserrat line-clamp-3">
                        {article.title}
                      </h3>

                      <div className="mt-4">
                        <motion.span
                          whileHover={{ scale: 1.08 }}
                          className="inline-block px-3.5 py-1 rounded-full border border-white/20 text-xs text-white/80 font-montserrat group-hover:border-[#5EFC8D]/60 group-hover:text-[#5EFC8D] transition"
                        >
                          {article.tag}
                        </motion.span>
                      </div>
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={`${article.id}-${currentIndex}-${index}`}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="h-full"
                >
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group flex flex-col h-full transition-all duration-300"
                  >
                    <div className="relative w-full h-[180px] sm:h-[200px] lg:h-[200px] xl:h-[220px] overflow-hidden bg-[#181d1f] rounded-xl border border-white/10 group-hover:border-[#5EFC8D]/50 transition-colors shadow-lg">
                      <img
                        src={getOptimizedImageUrl(article.image, { width: 600, quality: "best" })}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/assets/case_brother.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#8e8e93] font-mono tracking-wider mt-3.5 mb-2">
                      <span className="font-medium text-[#a0a0a5] truncate max-w-[50%]">
                        {article.author}
                      </span>
                      <span className="shrink-0 text-[11px]">
                        {article.date}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base lg:text-[14px] xl:text-[15px] font-medium text-white group-hover:text-[#5EFC8D] transition-colors leading-[1.4] font-montserrat line-clamp-3">
                      {article.title}
                    </h3>

                    <div className="mt-3">
                      <motion.span
                        whileHover={{ scale: 1.08 }}
                        className="inline-block px-2.5 py-0.5 rounded-full border border-white/20 text-[11px] text-white/70 font-montserrat group-hover:border-[#5EFC8D]/60 group-hover:text-[#5EFC8D] transition"
                      >
                        {article.tag}
                      </motion.span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
