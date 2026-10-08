import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ContactBlock from '@/components/ContactBlock';
import MotionSection, { MotionHero, MotionDiv } from '@/components/MotionSection';
import { getPostBySlug, getAllPosts } from '@/lib/blogs';
import ArticleLeadForm from '@/components/ArticleLeadForm';

export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | E-GEAD',
    };
  }

  return {
    title: `${post.title} | E-GEAD Insights`,
    description: post.excerpt || post.subtitle || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.subtitle || post.title,
      images: post.heroImage ? [{ url: post.heroImage }] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch all posts to find next article
  const allPosts = await getAllPosts({ status: 'published' });
  const currentIndex = allPosts.findIndex(
    (p) => p.slug === slug || p.slug.toLowerCase() === slug.toLowerCase()
  );
  const nextArticle =
    currentIndex !== -1 && allPosts.length > 1
      ? allPosts[(currentIndex + 1) % allPosts.length]
      : allPosts.find((p) => p.slug !== slug) || null;

  // Determine back link and category label
  const categoryLower = (post.category || 'insights').toLowerCase();
  let backLink = '/insights';
  let backLabel = 'Back To Insights';

  if (categoryLower.includes('webinar')) {
    backLink = '/webinars';
    backLabel = 'Back To Webinars';
  } else if (categoryLower.includes('blog')) {
    backLink = '/blog';
    backLabel = 'Back To Blog';
  } else if (categoryLower.includes('announcement')) {
    backLink = '/announcements';
    backLabel = 'Back To Announcements';
  } else if (categoryLower.includes('white')) {
    backLink = '/white-papers';
    backLabel = 'Back To White Papers';
  }

  // Tags list
  const tagsList = [
    post.tag,
    post.category,
    'Digital Transformation',
    'Omnichannel',
  ].filter((t, i, arr) => t && arr.indexOf(t) === i);

  return (
    <article className="w-full overflow-hidden">
      {/* =========================================================
          PART 1: HEADER SECTION (PURE BLACK BACKGROUND)
          Matching sai-digital.com article__header
      ========================================================= */}
      <div className="w-full bg-black text-white pt-28 sm:pt-36 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Top Back Link */}
          <div className="mb-6">
            <Link
              href={backLink}
              className="inline-flex items-center gap-2 text-[#b3b3b3] hover:text-white text-xs font-medium font-montserrat transition"
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
              <span>{backLabel}</span>
            </Link>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-medium text-white font-montserrat leading-tight mb-4 max-w-5xl">
            {post.title}
          </h1>

          {/* Time & Meta Row */}
          <div className="flex items-center gap-4 sm:gap-5 text-xs text-[#b3b3b3] font-montserrat mb-8">
            <span className="text-[#b3b3b3]">{post.date}</span>
            <div className="px-2.5 py-0.5 rounded-[4px] border border-[#666666] text-[10px] font-semibold uppercase tracking-wider text-[#b3b3b3]">
              {post.category || 'Webinars'}
            </div>
            <span className="uppercase text-[10px] tracking-wider text-[#b3b3b3]">
              {post.readTime || '5 mins read'}
            </span>
          </div>

          {/* Banner Image & Next Article Row */}
          <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 mt-6">
            {/* Main Banner Image (Wide aspect ratio, rounded-[20px]) */}
            <div className="flex-1 relative aspect-[16/8] sm:aspect-[21/9] lg:aspect-[16/7] w-full rounded-[20px] overflow-hidden bg-white/5 shadow-2xl">
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>

            {/* Next Article Sidebar (Desktop) */}
            {nextArticle && (
              <div className="hidden lg:flex flex-col justify-end w-[220px] shrink-0">
                <span className="text-[12px] font-medium tracking-[1.89px] uppercase text-white font-montserrat block mb-3">
                  NEXT BLOG ARTICLE
                </span>
                <Link
                  href={`/articles/${nextArticle.slug}`}
                  className="group flex flex-col gap-2.5"
                >
                  <div className="w-[220px] h-[145px] rounded-[18px] overflow-hidden bg-white/10 shadow-md">
                    <img
                      src={nextArticle.heroImage}
                      alt={nextArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-[18px]"
                    />
                  </div>
                  <p className="text-white group-hover:text-[#10E774] text-sm font-medium leading-snug line-clamp-2 transition-colors font-montserrat">
                    {nextArticle.title}
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================
          PART 2: BODY SECTION (PURE WHITE BACKGROUND)
          Matching sai-digital.com article__body (Content + Lead Form)
      ========================================================= */}
      <div className="w-full bg-white text-black py-16 sm:py-24 px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between items-start">
          {/* Left Column: Article Content */}
          <div className="flex-1 w-full lg:max-w-3xl">
            <div className="text-base sm:text-lg text-black font-light leading-[30px] font-montserrat space-y-6">
              {Array.isArray(post.content) ? (
                post.content.map((paragraph, idx) => {
                  if (paragraph.startsWith('<h4>')) {
                    const text = paragraph.replace(/<\/?h4>/g, '');
                    return (
                      <h4
                        key={idx}
                        className="text-xl sm:text-2xl font-semibold text-black font-montserrat pt-4 pb-2"
                      >
                        {text}
                      </h4>
                    );
                  }
                  return (
                    <div
                      key={idx}
                      className="leading-[30px]"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  );
                })
              ) : (
                <div
                  className="prose prose-lg max-w-none text-black leading-[30px]"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}
            </div>

            {/* Tags at bottom of article */}
            <div className="flex flex-wrap items-center gap-2 pt-10 mt-10 border-t border-gray-200">
              {tagsList.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-md bg-[#f2f2f2] text-xs text-[#666666] font-medium font-montserrat"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Lead Form (Watch On Demand Now) */}
          <div className="w-full lg:w-[420px] shrink-0">
            <ArticleLeadForm
              title={
                categoryLower.includes('white')
                  ? 'Download white paper now!'
                  : 'Sign up to watch on demand now!'
              }
              buttonText={
                categoryLower.includes('white')
                  ? 'Download Now'
                  : 'Watch On Demand Now'
              }
            />
          </div>
        </div>
      </div>

      {/* =========================================================
          PART 3: BOTTOM CONTACT SECTION
      ========================================================= */}
      <MotionDiv threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </article>
  );
}
