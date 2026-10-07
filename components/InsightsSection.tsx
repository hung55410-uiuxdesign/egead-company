'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tag: string;
}

const articles: ArticleItem[] = [
  {
    id: 'omnichannel',
    slug: 'omnichannel-fulfillment-retail-playbook',
    title: 'Omnichannel Fulfillment: The Definitive Guide for Modern Retailers (2026)',
    author: 'Worawalan Tanawatsuwan',
    date: 'Sep 22, 2026',
    readTime: '17 MIN',
    image: '/assets/insight_omnichannel.jpg',
    tag: 'Retail Strategy',
  },
  {
    id: 'o2o',
    slug: 'o2o-online-to-offline-marketing-strategies',
    title: 'Online-to-Offline Commerce: Driving In-Store Foot Traffic Through Digital Channels',
    author: 'Rebecca Menezes',
    date: 'Jan 6, 2026',
    readTime: '25 MIN',
    image: '/assets/insight_o2o.jpg',
    tag: 'Growth Marketing',
  },
  {
    id: 'tiktok',
    slug: 'conquering-tiktok-shop-us-ldr-compliance',
    title: 'Mastering TikTok Shop US: Keeping Late Dispatch Rate Below 1% with Sub-24H Fulfillment',
    author: 'Marcus Vance',
    date: 'Oct 02, 2026',
    readTime: '12 MIN',
    image: '/assets/insight_tiktok.jpg',
    tag: 'Operations',
  },
  {
    id: 'ai-analytics',
    slug: 'ai-market-trend-forecasting-ecommerce-2027',
    title: 'Predictive E-Commerce 2027: Leveraging AI Consumer Analytics for Global Expansion',
    author: 'Sarah Jenkins',
    date: 'Oct 15, 2026',
    readTime: '15 MIN',
    image: '/assets/insight_ai_analytics.jpg',
    tag: 'Technology',
  },
  {
    id: 'supply-chain',
    slug: 'cross-border-supply-chain-optimization-d2c',
    title: 'Cross-Border Supply Chain Optimization: Warehouse Strategies for Scaled D2C Brands',
    author: 'Alexander Wright',
    date: 'Nov 04, 2026',
    readTime: '18 MIN',
    image: '/assets/insight_supply_chain.jpg',
    tag: 'Logistics',
  },
  {
    id: 'dtf-tech',
    slug: 'dtf-automated-printing-breakthrough-apparel-pod',
    title: 'Automated Industrial DTF Technology: The Next Frontier in Custom Apparel & Print-on-Demand',
    author: 'Kenji Sato',
    date: 'Nov 12, 2026',
    readTime: '14 MIN',
    image: '/assets/insight_dtf_tech.jpg',
    tag: 'Manufacturing',
  },
  {
    id: 'wms-cloud',
    slug: 'multi-channel-wms-warehouse-integration-scale',
    title: 'Multi-Channel Cloud WMS: Real-Time Warehouse Synchronization for High-Volume Merchants',
    author: 'Thao Nguyen',
    date: 'Nov 20, 2026',
    readTime: '20 MIN',
    image: '/assets/insight_wms_cloud.jpg',
    tag: 'Cloud WMS',
  },
  {
    id: 'brand-ip',
    slug: 'brand-protection-ip-compliance-global-marketplaces',
    title: 'Brand IP Protection & Trademark Compliance Across Global E-Commerce Marketplaces',
    author: 'Elena Rostova',
    date: 'Dec 01, 2026',
    readTime: '16 MIN',
    image: '/assets/insight_brand_ip.jpg',
    tag: 'Legal & Policy',
  },
];

// Row slide variants: slide across the screen in the direction of next/prev
const rowSlideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 320 : -320,
    opacity: 0,
    filter: 'blur(6px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      x: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.45 },
      filter: { duration: 0.35 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -320 : 320,
    opacity: 0,
    filter: 'blur(6px)',
    transition: {
      x: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.35 },
      filter: { duration: 0.3 },
    },
  }),
};

export default function InsightsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // 4 items visible simultaneously in 1 row, offset 0 is the hero largest item
  const visibleItems = [0, 1, 2, 3].map((offset) => {
    const index = (currentIndex + offset) % articles.length;
    return {
      article: articles[index],
      isHero: offset === 0,
    };
  });

  return (
    <section
      id="homepage__insight"
      className="homepage__insight relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden border-t border-white/10 select-none"
    >
      {/* Header Block */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat"
          >
            Insights
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-[34px] font-semibold font-montserrat leading-[1.3] tracking-tight"
          >
            <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
              Our latest news.
            </span>
          </motion.h2>
        </div>

        {/* Navigation Controls + View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3.5 self-start md:self-end shrink-0"
        >
          {/* Index Counter with Animated Digit */}
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
                {String(currentIndex + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span className="mx-1 text-white/30">/</span>
            <span>{String(articles.length).padStart(2, '0')}</span>
          </div>

          {/* Pre & Next Buttons */}
          <div className="flex items-center gap-2.5">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.15, rotate: -4 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              aria-label="Previous insight"
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#6CE8C3] transition-colors shadow-md group cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:-translate-x-0.5 transition-transform" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.15, rotate: 4 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              aria-label="Next insight"
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#6CE8C3] transition-colors shadow-md group cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* View All Insights Button */}
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
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

      {/* Single Row: 4 Visible Items with AnimatePresence popLayout Directional Sliding */}
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
                  /* ================= ITEM 1 (Hero lớn nhất, ảnh cao nhất) ================= */
                  <motion.div
                    key={`${article.id}-${currentIndex}-hero`}
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className="h-full"
                  >
                    <Link
                      href={`/articles/${article.slug}`}
                      className="group flex flex-col h-full transition-all duration-300"
                    >
                      {/* Image Container: Taller height with smooth zoom on hover */}
                      <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] xl:h-[420px] overflow-hidden bg-[#181d1f] rounded-xl border border-white/10 group-hover:border-[#5EFC8D]/50 transition-colors shadow-lg">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Author and Date Row */}
                      <div className="flex items-center justify-between text-xs sm:text-[13px] text-[#8e8e93] font-mono tracking-wider mt-4 sm:mt-5 mb-2 sm:mb-3">
                        <span className="font-medium text-[#b0b0b5] truncate max-w-[55%]">
                          {article.author}
                        </span>
                        <span className="shrink-0">
                          {article.date} | {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl lg:text-[22px] xl:text-[24px] font-medium text-white group-hover:text-[#5EFC8D] transition-colors leading-[1.35] font-montserrat">
                        {article.title}
                      </h3>

                      {/* Tag Pill with spring hover */}
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
                /* ================= COMPACT ITEM 2, 3, 4 ================= */
                <motion.div
                  key={`${article.id}-${currentIndex}-${index}`}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  className="h-full"
                >
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group flex flex-col h-full transition-all duration-300"
                  >
                    {/* Image Container: Shorter height with smooth zoom on hover */}
                    <div className="relative w-full h-[180px] sm:h-[200px] lg:h-[200px] xl:h-[220px] overflow-hidden bg-[#181d1f] rounded-xl border border-white/10 group-hover:border-[#5EFC8D]/50 transition-colors shadow-lg">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Author and Date Row */}
                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#8e8e93] font-mono tracking-wider mt-3.5 mb-2">
                      <span className="font-medium text-[#a0a0a5] truncate max-w-[50%]">
                        {article.author}
                      </span>
                      <span className="shrink-0 text-[11px]">
                        {article.date}
                      </span>
                    </div>

                    {/* Title (Clamp to 3 lines) */}
                    <h3 className="text-sm sm:text-base lg:text-[14px] xl:text-[15px] font-medium text-white group-hover:text-[#5EFC8D] transition-colors leading-[1.4] font-montserrat line-clamp-3">
                      {article.title}
                    </h3>

                    {/* Tag Pill */}
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
