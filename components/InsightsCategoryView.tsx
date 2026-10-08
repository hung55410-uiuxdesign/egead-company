'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface InsightsCategoryViewProps {
  categoryKey: string;
  categoryTitle: string;
  categorySubtitle: string;
  categoryIcon: string;
  posts: BlogPost[];
}

export default function InsightsCategoryView({
  categoryKey,
  categoryTitle,
  categorySubtitle,
  categoryIcon,
  posts,
}: InsightsCategoryViewProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedSort, setSelectedSort] = useState<'newest' | 'oldest' | 'title'>('newest');

  // Extract unique topics from posts
  const availableTopics = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.tag) set.add(p.tag);
    });
    return ['All', ...Array.from(set)];
  }, [posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = posts.filter((p) => {
      const matchesTopic =
        selectedTopic === 'All' ||
        p.tag.toLowerCase() === selectedTopic.toLowerCase();
      return matchesTopic;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (selectedSort === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (selectedSort === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (selectedSort === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [posts, selectedTopic, selectedSort]);

  return (
    <div className="w-full">
      {/* -------------------------------------------------------------
          1. HEADER SECTION (PURE BLACK BACKGROUND)
          Matching sai-digital.com/webinars
      ------------------------------------------------------------- */}
      <div className="w-full bg-black text-white pt-28 sm:pt-36 pb-12 px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Back To Insights */}
        <div className="mb-6">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-xs font-medium font-montserrat transition"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-white"
            >
              <path
                d="M3.375 10.875L7.875 15.375L8.94 14.31L6.2475 11.625H14.625V2.625H13.125V10.125H6.2475L8.94 7.44L7.875 6.375L3.375 10.875Z"
                fill="white"
              />
            </svg>
            <span>Back To Insights</span>
          </Link>
        </div>

        {/* Category Title with Icon */}
        <div className="flex items-center gap-3.5 mb-8">
          {categoryIcon && (
            <img
              src={categoryIcon}
              alt=""
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
          )}
          <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-semibold text-white font-montserrat leading-tight">
            {categoryTitle}
          </h1>
        </div>

        {/* Dropdown Filters (Topic & Sort) */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Topic Select */}
          <div className="relative w-44 sm:w-52">
            <select
              aria-label="Topic"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full appearance-none bg-black border border-[#333333] hover:border-[#666666] text-white text-xs font-normal px-4 py-2.5 rounded-lg outline-none cursor-pointer transition font-montserrat"
            >
              <option value="All">Topic</option>
              {availableTopics
                .filter((t) => t !== 'All')
                .map((topic) => (
                  <option key={topic} value={topic} className="bg-black text-white">
                    {topic}
                  </option>
                ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort Select */}
          <div className="relative w-44 sm:w-52">
            <select
              aria-label="Sort"
              value={selectedSort}
              onChange={(e) =>
                setSelectedSort(e.target.value as 'newest' | 'oldest' | 'title')
              }
              className="w-full appearance-none bg-black border border-[#333333] hover:border-[#666666] text-white text-xs font-normal px-4 py-2.5 rounded-lg outline-none cursor-pointer transition font-montserrat"
            >
              <option value="newest">Sort</option>
              <option value="newest" className="bg-black text-white">
                Newest
              </option>
              <option value="oldest" className="bg-black text-white">
                Oldest
              </option>
              <option value="title" className="bg-black text-white">
                Title A-Z
              </option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. BODY SECTION (PURE WHITE BACKGROUND)
          Matching sai-digital.com/webinars
      ------------------------------------------------------------- */}
      <div className="w-full bg-white text-black py-12 sm:py-16 px-6 sm:px-10 lg:px-14 xl:px-16 min-h-[60vh]">
        {/* Main Subtitle */}
        <div className="mb-10 sm:mb-12">
          <p className="text-xl sm:text-2xl lg:text-[26px] font-normal text-black font-montserrat leading-relaxed max-w-5xl">
            {categorySubtitle}
          </p>
        </div>

        {/* 3-Column Card List */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-16">
            <AnimatePresence>
              {filteredPosts.map((post, idx) => (
                <motion.div
                  key={post.id || post.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                >
                  <Link
                    href={`/articles/${post.slug}`}
                    className="group flex flex-col h-full cursor-pointer"
                  >
                    {/* Square Image with rounded-2xl / rounded-[20px] */}
                    <div className="relative aspect-square w-full rounded-[20px] overflow-hidden bg-gray-100 mb-5 shadow-sm">
                      <img
                        src={post.heroImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Status Badge + Read Time */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-[4px] border border-[#1c1e24] bg-white text-[#1c1e24] text-[10px] font-bold uppercase tracking-wider font-montserrat">
                        {post.category || categoryTitle}
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-[#666666] font-montserrat">
                        {post.readTime || '5 mins read'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-[22px] font-medium text-black group-hover:text-[#008060] font-montserrat leading-snug line-clamp-2 transition-colors mb-2">
                      {post.title}
                    </h3>

                    {/* Date */}
                    <span className="text-xs text-[#666666] font-montserrat mt-auto pt-2 block">
                      {post.date}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-gray-500 text-lg font-montserrat">
              No results found.
            </p>
            <button
              type="button"
              onClick={() => setSelectedTopic('All')}
              className="mt-4 px-6 py-2 rounded-full border border-black/20 text-xs font-semibold hover:bg-gray-100 transition"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
