import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import ContactBlock from '@/components/ContactBlock';
import MotionSection, { MotionHero, MotionDiv } from '@/components/MotionSection';
import { getAllPosts } from '@/lib/blogs';
import InsightsCategoryView from '@/components/InsightsCategoryView';

export const dynamic = 'force-dynamic';

const CATEGORY_MAP: Record<
  string,
  { title: string; subtitle: string; icon: string; link: string }
> = {
  webinars: {
    title: 'Webinars',
    subtitle: "Join or watch our webinars to equip you for tomorrow's leadership.",
    icon: '/assets/icon_webinar.svg',
    link: '/webinars',
  },
  announcements: {
    title: 'Announcements',
    subtitle: 'Stay updated on product launches, strategic milestones, and company announcements.',
    icon: '/assets/icon_announcement.svg',
    link: '/announcements',
  },
  'white-papers': {
    title: 'White Papers',
    subtitle: 'In-depth research papers, enterprise blueprints, and strategic benchmarks.',
    icon: '/assets/icon_whitepaper.svg',
    link: '/white-papers',
  },
  blog: {
    title: 'Blog',
    subtitle: 'Thought leadership, industry perspectives, and technical architecture guides.',
    icon: '/assets/icon_blog.svg',
    link: '/blog',
  },
};

export async function generateMetadata(props: {
  searchParams?: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const currentCategory = searchParams?.category?.toLowerCase();

  if (currentCategory && CATEGORY_MAP[currentCategory]) {
    const info = CATEGORY_MAP[currentCategory];
    return {
      title: `${info.title} | E-GEAD Insights`,
      description: info.subtitle,
    };
  }

  return {
    title: 'Explore Expert Insights and Trends in Digital Transformation | E-GEAD',
    description:
      'Discover in-depth insights and the latest trends in digital transformation to empower your business strategy and drive innovation with expert analysis and resources.',
  };
}

interface InsightsPageProps {
  searchParams?: Promise<{ category?: string; tag?: string }>;
}

export default async function InsightsPage(props: InsightsPageProps) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const currentCategory = searchParams?.category?.toLowerCase();

  // Fetch all posts from service layer (DB or JSON fallback)
  const allPosts = await getAllPosts({ status: 'published' });

  // -------------------------------------------------------------
  // 1. SPECIFIC CATEGORY VIEW (/webinars, /blog, /announcements, etc.)
  // -------------------------------------------------------------
  if (currentCategory && CATEGORY_MAP[currentCategory]) {
    const catInfo = CATEGORY_MAP[currentCategory];
    const categoryPosts = allPosts.filter(
      (p) =>
        p.category.toLowerCase().replace(/\s+/g, '-') === currentCategory ||
        p.category.toLowerCase() === catInfo.title.toLowerCase() ||
        p.tag.toLowerCase().includes(currentCategory.replace('-', ' '))
    );

    return (
      <div className="w-full overflow-hidden">
        <InsightsCategoryView
          categoryKey={currentCategory}
          categoryTitle={catInfo.title}
          categorySubtitle={catInfo.subtitle}
          categoryIcon={catInfo.icon}
          posts={categoryPosts}
        />

        <MotionDiv threshold={0.15}>
          <ContactBlock />
        </MotionDiv>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. OVERVIEW HUB PAGE (/insights) matching sai-digital.com/insights
  // -------------------------------------------------------------
  // Featured Insights (2 items)
  const featuredPosts = allPosts.filter((p) => p.featured).slice(0, 2);
  const fallbackFeatured = featuredPosts.length >= 2 ? featuredPosts : allPosts.slice(0, 2);

  // Group posts by the 4 main categories
  const blogPosts = allPosts
    .filter((p) => p.category.toLowerCase() === 'blog')
    .slice(0, 3);
  const announcementPosts = allPosts
    .filter((p) => p.category.toLowerCase() === 'announcements')
    .slice(0, 3);
  const webinarPosts = allPosts
    .filter((p) => p.category.toLowerCase() === 'webinars')
    .slice(0, 3);
  const whitePaperPosts = allPosts
    .filter((p) => p.category.toLowerCase().includes('white'))
    .slice(0, 3);

  const SECTIONS = [
    {
      id: 'blog',
      title: 'Blog',
      link: '/blog',
      items: blogPosts.length > 0 ? blogPosts : allPosts.slice(0, 3),
    },
    {
      id: 'announcements',
      title: 'Announcements',
      link: '/announcements',
      items: announcementPosts.length > 0 ? announcementPosts : allPosts.slice(3, 6),
    },
    {
      id: 'webinars',
      title: 'Webinars',
      link: '/webinars',
      items: webinarPosts.length > 0 ? webinarPosts : allPosts.slice(6, 9),
    },
    {
      id: 'white-papers',
      title: 'White Papers',
      link: '/white-papers',
      items: whitePaperPosts.length > 0 ? whitePaperPosts : allPosts.slice(9, 12),
    },
  ];

  return (
    <div className="w-full overflow-hidden scroll-smooth">
      {/* =========================================================
          PART A: DARK THEME TOP (HEADER & FEATURED INSIGHTS)
          Matching sai-digital.com/insights
      ========================================================= */}
      <div className="w-full bg-black text-white pt-28 sm:pt-36 pb-20">
        {/* Page Header */}
        <MotionHero className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
          <div className="w-full">
            <span className="text-xs uppercase tracking-widest text-[#10E774] font-semibold block mb-3 font-montserrat">
              Insights
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-semibold text-white font-montserrat leading-tight mb-4">
              <span>Discover</span> the Future, Today.
            </h1>
            <p className="text-base sm:text-lg text-gray-400 font-light max-w-2xl leading-relaxed font-montserrat">
              Stay updated on new products, company milestones, and upcoming events.
            </p>

            {/* Jump Navigation Pills (matching sai-digital linkList) */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-8 pt-6 border-t border-white/10">
              {[
                { label: 'Featured Insights', href: '#featured-insight' },
                { label: 'Blog', href: '#blog' },
                { label: 'Announcements', href: '#announcements' },
                { label: 'Webinars', href: '#webinars' },
                { label: 'White Papers', href: '#white-papers' },
              ].map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
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
                  <span>{btn.label}</span>
                </a>
              ))}
            </div>
          </div>
        </MotionHero>

        {/* Featured Insights Section (2 Large Cards) */}
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
            {fallbackFeatured.map((item) => (
              <Link
                key={item.id || item.slug}
                href={`/articles/${item.slug}`}
                className="group flex flex-col cursor-pointer"
              >
                {/* Image: Square/4:3 aspect ratio, rounded-[20px] */}
                <div className="relative aspect-[16/10] sm:aspect-square lg:aspect-[16/10] w-full rounded-[20px] overflow-hidden bg-white/5 mb-5 shadow-lg">
                  <img
                    src={item.heroImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Status: Tag + readtime */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-[4px] border border-white/30 bg-black text-white text-[10px] font-bold uppercase tracking-wider font-montserrat">
                    {item.category || item.tag}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400 font-montserrat">
                    {item.readTime || '5 mins read'}
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
      </div>

      {/* =========================================================
          PART B: WHITE THEME SECTIONS (BLOG, ANNOUNCEMENTS, WEBINARS, WHITE PAPERS)
          Matching sai-digital.com/insights .blog__insight
      ========================================================= */}
      <div className="w-full bg-white text-black py-16 sm:py-24">
        {SECTIONS.map((sec, sIdx) => (
          <MotionSection
            key={sec.id}
            id={sec.id}
            className={`w-full px-6 sm:px-10 lg:px-14 xl:px-16 scroll-mt-28 ${
              sIdx > 0 ? 'mt-24 sm:mt-28 pt-16 sm:pt-20 border-t border-gray-200' : ''
            }`}
          >
            {/* Section Header: Title on Left, View All Pill Button on Right */}
            <div className="flex items-center justify-between gap-4 mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-medium text-[#003d5b] font-montserrat">
                {sec.title}
              </h2>

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

            {/* 3-Column Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {sec.items.map((item) => (
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
                    <span className="px-2.5 py-1 rounded-[4px] border border-[#1c1e24] bg-white text-[#1c1e24] text-[10px] font-bold uppercase tracking-wider font-montserrat">
                      {item.category || sec.title}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[#666666] font-montserrat">
                      {item.readTime || '5 mins read'}
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

            {/* Mobile View All Button */}
            <div className="mt-8 flex sm:hidden justify-center">
              <Link
                href={sec.link}
                className="inline-flex items-center justify-center w-full py-3 rounded-full border border-black text-xs font-semibold text-black hover:bg-black hover:text-white transition font-montserrat"
              >
                <span>View All {sec.title}</span>
              </Link>
            </div>
          </MotionSection>
        ))}
      </div>

      {/* =========================================================
          PART C: BOTTOM CONTACT BLOCK
      ========================================================= */}
      <MotionDiv threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </div>
  );
}
