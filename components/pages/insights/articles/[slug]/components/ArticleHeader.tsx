'use client';

import Link from 'next/link';
import type { BlogPost, BlogSibling } from '@/types/blog';
import ArticleLanguageToggle from './ArticleLanguageToggle';
import { useLocalizeHref, useT } from '@/components/providers/LocaleProvider';
import { getYouTubeEmbedInfo, isDirectVideoUrl, getMediaThumbnailUrl } from '@/lib/utils/media';

type Props = {
  post: BlogPost;
  nextArticle: BlogPost | null;
  backLink: string;
  backLabel: string;
  siblings?: BlogSibling[];
}

export default function ArticleHeader({
  post,
  nextArticle,
  backLink,
  backLabel,
  siblings = [],
}: Props) {
  const t = useT();
  const lh = useLocalizeHref();
  const ytEmbed = getYouTubeEmbedInfo(post.heroImage);
  const isDirectVideo = isDirectVideoUrl(post.heroImage);
  const nextArticleThumbnail = nextArticle ? getMediaThumbnailUrl(nextArticle.heroImage) : '';

  return (
    <div className="w-full bg-black text-white pt-28 sm:pt-36 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-14 xl:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Back Link */}
        <div className="mb-6">
          <Link
            href={lh(backLink)}
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

        {/* Language toggle (only when this article exists in EN and VI) */}
        <ArticleLanguageToggle post={post} siblings={siblings} />

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

        {/* Banner Media & Next Article Row */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 mt-6">
          {/* Main Banner Media (YouTube / Video / Image) */}
          <div className="flex-1 relative aspect-[16/8] sm:aspect-[21/9] lg:aspect-[16/7] w-full rounded-[20px] overflow-hidden bg-black/60 shadow-2xl">
            {ytEmbed ? (
              <iframe
                src={ytEmbed.embedUrl}
                title={post.title}
                className="w-full h-full border-0 absolute inset-0 rounded-[20px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : isDirectVideo ? (
              <video
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-[20px]"
              >
                <source
                  src={post.heroImage}
                  type={post.heroImage.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
                />
              </video>
            ) : (
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full h-full object-cover rounded-[20px]"
              />
            )}
          </div>

          {/* Next Article Sidebar (Desktop) */}
          {nextArticle && (
            <div className="hidden lg:flex flex-col justify-end w-[220px] shrink-0">
              <span className="text-[12px] font-medium tracking-[1.89px] uppercase text-white font-montserrat block mb-3">
                {t.article.nextArticle}
              </span>
              <Link
                href={lh(`/articles/${nextArticle.slug}`)}
                className="group flex flex-col gap-2.5"
              >
                <div className="w-[220px] h-[145px] rounded-[18px] overflow-hidden bg-white/10 shadow-md">
                  <img
                    src={nextArticleThumbnail}
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
  );
}
