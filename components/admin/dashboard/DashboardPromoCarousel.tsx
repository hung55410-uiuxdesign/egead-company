'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Badge, Button } from '@astryxdesign/core';
import type { BadgeVariant } from '@astryxdesign/core';

interface CareerStats {
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
}

interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
}

interface DashboardPromoCarouselProps {
  careerStats: CareerStats;
  blogStats: BlogStats;
}

interface SlideItem {
  id: string;
  tag: string;
  badgeVariant: BadgeVariant;
  title: string;
  description: string;
  image: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export default function DashboardPromoCarousel({
  careerStats,
  blogStats,
}: DashboardPromoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const slides: SlideItem[] = [
    {
      id: 'careers',
      tag: 'Tuyển dụng',
      badgeVariant: 'cyan',
      title: 'Cổng tuyển dụng & thu hút nhân tài E-GEAD Careers',
      description: `Đang có ${careerStats.activeJobs} vị trí tuyển dụng mở và ${careerStats.totalApplications} hồ sơ ứng tuyển nộp về hệ thống${careerStats.pendingApplications > 0
        ? ` (${careerStats.pendingApplications} hồ sơ mới chờ duyệt)`
        : ''
        }. Đánh giá hồ sơ và phản hồi ứng viên nhanh chóng.`,
      image: '/images/services/data_analytics.jpg',
      primaryAction: {
        label: 'Quản lý tuyển dụng',
        href: '/admin/careers',
      },
      secondaryAction: {
        label: `Xem hồ sơ (${careerStats.totalApplications})`,
        href: '/admin/careers/applications',
      },
    },
    {
      id: 'hierarchy',
      tag: 'Sơ đồ tổ chức',
      badgeVariant: 'purple',
      title: 'Cây phân cấp tổ chức & cấu trúc bộ máy trực quan',
      description:
        'Trực quan hóa cấu trúc bộ máy lãnh đạo, Strategic Scope và các Squad vận hành theo thời gian thực. Tùy chỉnh thành viên, chức danh và vị trí trực quan trên cây phân cấp.',
      image: '/images/services/strategy_design.jpg',
      primaryAction: {
        label: 'Mở sơ đồ tổ chức',
        href: '/admin/people/hierarchy',
      },
      secondaryAction: {
        label: 'Danh sách nhân sự',
        href: '/admin/people',
      },
    },
    {
      id: 'blogs',
      tag: 'Nội dung CMS',
      badgeVariant: 'green',
      title: 'Xuất bản bài viết & phân tích tương tác độc giả B2B',
      description: `Hệ thống ghi nhận ${blogStats.publishedPosts} bài viết đã xuất bản với tổng cộng ${blogStats.totalViews.toLocaleString()} lượt đọc. Soạn thảo bài viết mới chuẩn SEO để gia tăng sự hiện diện của thương hiệu.`,
      image: '/images/services/commerce_cx.jpg',
      primaryAction: {
        label: 'Quản lý bài viết',
        href: '/admin/blogs',
      },
      secondaryAction: {
        label: 'Thêm bài viết mới',
        href: '/admin/blogs',
      },
    },
    {
      id: 'categories',
      tag: 'Chuyên mục',
      badgeVariant: 'orange',
      title: 'Kiến trúc danh mục & phân loại giải pháp công nghệ',
      description:
        'Tổ chức cấu trúc nội dung khoa học, tối ưu đường dẫn bài viết và phân loại các lĩnh vực chuyển đổi số, thương mại điện tử phục vụ độc giả doanh nghiệp.',
      image: '/images/services/enterprise_tech.jpg',
      primaryAction: {
        label: 'Khám phá danh mục',
        href: '/admin/categories',
      },
    },
  ];

  const scrollToSlide = useCallback(
    (index: number) => {
      const maxIndex = slides.length - 1;
      const targetIndex = index < 0 ? maxIndex : index > maxIndex ? 0 : index;
      setCurrentIndex(targetIndex);
      if (scrollRef.current) {
        const child = scrollRef.current.children[targetIndex] as HTMLElement;
        if (child) {
          scrollRef.current.scrollTo({
            left: child.offsetLeft - scrollRef.current.offsetLeft,
            behavior: 'smooth',
          });
        }
      }
    },
    [slides.length]
  );

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const children = Array.from(container.children) as HTMLElement[];
    let closestIndex = 0;
    let minDistance = Infinity;
    children.forEach((child, idx) => {
      const distance = Math.abs(
        child.offsetLeft - container.offsetLeft - scrollLeft
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });
    if (closestIndex !== currentIndex) {
      setCurrentIndex(closestIndex);
    }
  };

  // Auto advance slides every 8 seconds if not paused
  useEffect(() => {
    if (isPaused || isDismissed) return;
    const timer = setInterval(() => {
      scrollToSlide(currentIndex + 1);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, isDismissed, currentIndex, scrollToSlide]);

  if (isDismissed) return null;

  const handlePrev = () => {
    scrollToSlide(currentIndex - 1);
  };

  const handleNext = () => {
    scrollToSlide(currentIndex + 1);
  };

  return (
    <section
      className="space-y-3 relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          Tin tức, tính năng &amp; cập nhật hệ thống
        </h2>
        <span className="text-xs font-semibold text-slate-500">
          {slides.length} cập nhật
        </span>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Track with scroll-snap: Displays 2 full items + peek of 3rd item on md/lg */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="snap-start flex-shrink-0 w-[86%] sm:w-[58%] md:w-[46%] lg:w-[43.8%] rounded-2xl border border-slate-200/90 bg-[#fbfaf8] overflow-hidden shadow-sm flex flex-col sm:flex-row min-h-[300px] sm:min-h-[260px]"
            >
              {/* Visual Image Banner */}
              <div className="relative w-full sm:w-5/12 h-44 sm:h-auto min-h-[170px] bg-slate-200 overflow-hidden flex-shrink-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 640px) 86vw, (max-width: 1024px) 46vw, 44vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent sm:hidden" />
              </div>

              {/* Content Panel */}
              <div className="w-full sm:w-7/12 p-5 sm:p-6 flex flex-col justify-between relative bg-[#fbfaf8]">
                {/* Top Header inside slide: Badge & Dismiss Button */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div>
                      <Badge
                        variant={slide.badgeVariant}
                        label={slide.tag}
                        className="h-8 px-4"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label="Ẩn cập nhật này"
                      onClick={() => setIsDismissed(true)}
                      className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
                      title="Ẩn bản tin"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug line-clamp-2 mb-1.5">
                    {slide.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-800 leading-relaxed line-clamp-3">
                    {slide.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-2 flex flex-wrap items-center gap-2">
                  <Button
                    variant="primary"
                    label={slide.primaryAction.label}
                    href={slide.primaryAction.href}
                    className="h-10 px-4"
                  />
                  {slide.secondaryAction && (
                    <Button
                      variant="secondary"
                      label={slide.secondaryAction.label}
                      href={slide.secondaryAction.href}
                      className="h-10 px-4"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Navigation Arrow Left */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Cập nhật trước"
          className="absolute -left-2.5 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-slate-200/90 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Floating Navigation Arrow Right */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Cập nhật tiếp theo"
          className="absolute -right-2.5 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-slate-200/90 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-all active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
