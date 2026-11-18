'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useHeaderScroll } from './hooks/useHeaderScroll';
import type { HeaderProps } from './types';

type SiteLang = 'vi' | 'en';

interface NavSubItem {
  id: string;
  num: string;
  tagVi: string;
  tagEn: string;
  labelVi: string;
  labelEn: string;
  href?: string;
  workIndex?: number;
}

interface NavSection {
  index: string;
  titleVi: string;
  titleEn: string;
  items: NavSubItem[];
}

interface NavGroup {
  id: string;
  labelVi: string;
  labelEn: string;
  href: string;
  matchPrefixes?: string[];
  panelMode?: 'split-balanced' | 'grid-2' | 'grid-3';
  leftSections?: NavSection[];
  rightSections?: NavSection[];
}

const EGEAD_PUBLIC_NAV: NavGroup[] = [
  {
    id: 'home',
    labelVi: 'Trang chủ',
    labelEn: 'Home',
    href: '/',
  },
  {
    id: 'about',
    labelVi: 'Về chúng tôi',
    labelEn: 'About Us',
    href: '/company',
    matchPrefixes: ['/company', '/partners', '/people', '/testimonial'],
  },
  {
    id: 'solutions',
    labelVi: 'Giải pháp & TMĐT',
    labelEn: 'E-commerce & Solutions',
    href: '/services/all-services',
    matchPrefixes: ['/services', '/smartcommerce', '/smartprice', '/speedx', '/loyalty'],
    panelMode: 'split-balanced',
    leftSections: [
      {
        index: '01',
        titleVi: 'E-commerce & Print-on-Demand (POD)',
        titleEn: 'E-commerce & Print-on-Demand (POD)',
        items: [
          {
            id: 'pod-marketplace',
            num: '01',
            tagVi: 'Đa nền tảng',
            tagEn: 'Multi-channel',
            labelVi: 'Marketplace đa nền tảng cho POD',
            labelEn: 'Multi-Platform Marketplace for POD',
            workIndex: 4,
          },
          {
            id: 'tiktok-us',
            num: '02',
            tagVi: 'TikTok Shop US',
            tagEn: 'TikTok API',
            labelVi: 'Tối ưu & Tự động hóa Listing TikTok Shop US',
            labelEn: 'TikTok Shop US Listing Automation',
            workIndex: 1,
          },
          {
            id: 'ebay-auto',
            num: '03',
            tagVi: 'Auto Listing',
            tagEn: 'Auto Listing',
            labelVi: 'Customer Service & Tự động hóa eBay',
            labelEn: 'eBay Automation & Customer Service',
            workIndex: 0,
          },
          {
            id: 'etsy-cs',
            num: '04',
            tagVi: 'Shop Health',
            tagEn: 'Shop Health',
            labelVi: 'Customer Service cho Etsy',
            labelEn: 'Etsy Customer Service Operations',
            href: '/services/all-services',
          },
        ],
      },
    ],
    rightSections: [
      {
        index: '02',
        titleVi: 'Web & System Development',
        titleEn: 'Web & System Development',
        items: [
          {
            id: 'pod-web',
            num: '05',
            tagVi: 'Headless Web',
            tagEn: 'Headless Web',
            labelVi: 'Phát triển website POD & Dropship',
            labelEn: 'POD & Dropshipping Websites',
            workIndex: 3,
          },
          {
            id: 'google-sync',
            num: '06',
            tagVi: 'Content API',
            tagEn: 'Content API',
            labelVi: 'Auto Listing & Đồng bộ dữ liệu Google',
            labelEn: 'Google Auto-Listing & Data Sync',
            workIndex: 5,
          },
        ],
      },
      {
        index: '03',
        titleVi: 'Marketing & Tối ưu quảng cáo',
        titleEn: 'Marketing & Ads Optimization',
        items: [
          {
            id: 'google-ads',
            num: '07',
            tagVi: 'AI Smart Bid',
            tagEn: 'AI Smart Bid',
            labelVi: 'Tối ưu quảng cáo Google Ads',
            labelEn: 'Google Ads Optimization',
            workIndex: 5,
          },
          {
            id: 'all-services',
            num: '08',
            tagVi: 'Toàn diện',
            tagEn: 'Full Suite',
            labelVi: 'Toàn bộ dịch vụ EGEAD',
            labelEn: 'All EGEAD Services',
            href: '/services/all-services',
          },
        ],
      },
    ],
  },
  {
    id: 'ai',
    labelVi: 'Tự động hóa & AI',
    labelEn: 'AI & Automation',
    href: '/#work-exhibit-2',
    panelMode: 'grid-2',
    leftSections: [
      {
        index: '01',
        titleVi: 'Công nghệ AI & Tự động hóa vận hành',
        titleEn: 'AI & Operational Automation Engineering',
        items: [
          {
            id: 'ai-image',
            num: '01',
            tagVi: '300 DPI Diffusion',
            tagEn: '300 DPI Diffusion',
            labelVi: 'AI Image Generation',
            labelEn: 'AI Image Generation',
            workIndex: 2,
          },
          {
            id: 'ai-social',
            num: '02',
            tagVi: 'Multi-Network',
            tagEn: 'Multi-Network',
            labelVi: 'AI Social Automation',
            labelEn: 'AI Social Automation',
            workIndex: 6,
          },
          {
            id: 'ai-platforms',
            num: '03',
            tagVi: 'Cloud & API',
            tagEn: 'Cloud & API',
            labelVi: 'Platform & Ecosystem Apps',
            labelEn: 'Platform & Ecosystem Apps',
            workIndex: 8,
          },
          {
            id: 'ai-partners',
            num: '04',
            tagVi: 'Đối tác chiến lược',
            tagEn: 'API Partners',
            labelVi: 'Hệ sinh thái & Đối tác công nghệ',
            labelEn: 'Technology Ecosystem & Partners',
            href: '/partners',
          },
        ],
      },
    ],
  },
  {
    id: 'studio',
    labelVi: 'Studio & Game',
    labelEn: 'Studio & Game',
    href: '/our-work',
    matchPrefixes: ['/our-work', '/case-studies'],
    panelMode: 'split-balanced',
    leftSections: [
      {
        index: '01',
        titleVi: 'Game & Creative Studio',
        titleEn: 'Game & Creative Studio',
        items: [
          {
            id: 'game-dev',
            num: '01',
            tagVi: 'Casual & WebGL',
            tagEn: 'Casual & WebGL',
            labelVi: 'Game Development',
            labelEn: 'Game Development',
            workIndex: 7,
          },
          {
            id: 'game-art',
            num: '02',
            tagVi: 'Asset & Motion',
            tagEn: 'Asset & Motion',
            labelVi: 'Game & Graphic Design',
            labelEn: 'Game & Graphic Design',
            href: '/#studio',
          },
          {
            id: 'creative-design',
            num: '03',
            tagVi: 'Brand & Digital',
            tagEn: 'Brand & Digital',
            labelVi: 'Creative Design',
            labelEn: 'Creative Design',
            href: '/#studio',
          },
        ],
      },
    ],
    rightSections: [
      {
        index: '02',
        titleVi: 'App & Software Engineering',
        titleEn: 'App & Software Engineering',
        items: [
          {
            id: 'app-dev',
            num: '04',
            tagVi: 'Web & Mobile',
            tagEn: 'Web & Mobile',
            labelVi: 'App Development',
            labelEn: 'App Development',
            workIndex: 8,
          },
          {
            id: 'our-work',
            num: '05',
            tagVi: 'Case Studies',
            tagEn: 'Case Studies',
            labelVi: 'Hồ sơ năng lực & Dự án',
            labelEn: 'Our Work & Case Studies',
            href: '/our-work',
          },
        ],
      },
    ],
  },
  {
    id: 'news',
    labelVi: 'Tin tức & Sự kiện',
    labelEn: 'News & Events',
    href: '/insights',
    matchPrefixes: ['/insights', '/articles'],
    panelMode: 'grid-2',
    leftSections: [
      {
        index: '01',
        titleVi: 'Tin tức, sự kiện & nhịp sống EGEAD',
        titleEn: 'News, Events & Inside EGEAD',
        items: [
          {
            id: 'company-activities',
            num: '01',
            tagVi: 'Facebook Sync',
            tagEn: 'Facebook Sync',
            labelVi: 'Hoạt động công ty',
            labelEn: 'Company Activities',
            href: '/insights',
          },
          {
            id: 'featured-events',
            num: '02',
            tagVi: 'Insights',
            tagEn: 'Insights',
            labelVi: 'Sự kiện & Tin tức nổi bật',
            labelEn: 'Featured News & Events',
            href: '/insights',
          },
        ],
      },
    ],
  },
  {
    id: 'careers',
    labelVi: 'Tuyển dụng',
    labelEn: 'Careers',
    href: '/careers',
    matchPrefixes: ['/careers'],
  },
];

export default function Header(_props: HeaderProps) {
  const pathname = usePathname() || '/';
  const scrolled = useHeaderScroll(20);
  const [lang, setLang] = useState<SiteLang>('vi');
  const [openId, setOpenId] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('egead-lang');
      if (saved === 'en' || saved === 'vi') setLang(saved);
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    setOpenId(null);
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        setOpenId(null);
        setIsMobileOpen(false);
      }
    };
    const onDocPointer = (ev: PointerEvent) => {
      const target = ev.target as Node;
      const inHeader = headerRef.current?.contains(target);
      const inCurtain = curtainRef.current?.contains(target);
      if (!inHeader && !inCurtain) {
        setOpenId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDocPointer);
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDocPointer);
    };
  }, []);

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setOpenId(null);
    }, 170);
  };

  const openGroup = (group: NavGroup) => {
    cancelClose();
    const hasMenu = Boolean(group.leftSections && group.leftSections.length > 0);
    setOpenId(hasMenu ? group.id : null);
  };

  const switchLang = (next: SiteLang) => {
    setLang(next);
    try {
      localStorage.setItem('egead-lang', next);
      window.dispatchEvent(new Event('storage'));
    } catch {
      // ignore
    }
  };

  const homeBase = lang === 'en' ? '/en' : '/';
  const resolveSubHref = (item: NavSubItem) => {
    if (typeof item.workIndex === 'number') {
      return `${homeBase}#work-exhibit-${item.workIndex}`;
    }
    if (item.href?.startsWith('/#')) {
      return `${homeBase}${item.href.slice(1)}`;
    }
    return item.href || homeBase;
  };

  const isGroupActive = (group: NavGroup) => {
    if (!group.matchPrefixes) return false;
    return group.matchPrefixes.some((p) => pathname.startsWith(p));
  };

  const isEn = lang === 'en';
  const activeGroup = openId
    ? EGEAD_PUBLIC_NAV.find((g) => g.id === openId && g.leftSections && g.leftSections.length > 0) || null
    : null;

  const renderItemCell = (sub: NavSubItem) => {
    const href = resolveSubHref(sub);
    const isWorkJump = typeof sub.workIndex === 'number' || href.includes('#');

    const content = (
      <>
        <div className="egead-cmd-cell-top">
          <div className="egead-cmd-cell-meta">
            <span className="egead-cmd-cell-num">{sub.num}</span>
            <span className="egead-cmd-cell-tag">{isEn ? sub.tagEn : sub.tagVi}</span>
          </div>
          <span className="egead-cmd-cell-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="egead-cmd-cell-title">{isEn ? sub.labelEn : sub.labelVi}</div>
      </>
    );

    if (isWorkJump) {
      return (
        <a key={sub.id} href={href} onClick={() => setOpenId(null)} className="egead-cmd-cell">
          {content}
        </a>
      );
    }

    return (
      <Link key={sub.id} href={href} onClick={() => setOpenId(null)} className="egead-cmd-cell">
        {content}
      </Link>
    );
  };

  const getCellsClass = (mode?: NavGroup['panelMode']) => {
    if (mode === 'grid-3') return 'egead-cmd-cells--grid3';
    if (mode === 'grid-2') return 'egead-cmd-cells--grid2';
    return 'egead-cmd-cells';
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[200] w-full h-[76px] transition-all duration-300 ${
          scrolled || activeGroup
            ? 'bg-[#050811]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_16px_44px_rgba(0,0,0,0.65)]'
            : 'bg-gradient-to-b from-[#04060e]/95 via-[#04060e]/70 to-transparent border-b border-transparent'
        }`}
      >
        <div className="relative flex h-full w-full items-center justify-between px-5 sm:px-8 lg:px-10 gap-4">
          {/* Far Left: E-GEAD Brand Logo */}
          <Link
            href={homeBase}
            aria-label="EGEAD home"
            className="relative z-10 inline-flex shrink-0 items-center transition-opacity hover:opacity-90"
          >
            <img
              src="/assets/logo/logo-color.png"
              alt="E-GEAD"
              className="h-[44px] sm:h-[54px] w-auto object-contain"
            />
          </Link>

          {/* Center: 7-Item Centered Navigation (Desktop >= 1280px) */}
          <nav
            aria-label="Primary"
            className="hidden xl:flex items-center justify-center gap-5 2xl:gap-6 absolute left-1/2 -translate-x-1/2 z-20"
          >
            {EGEAD_PUBLIC_NAV.map((group) => {
              const hasMenu = Boolean(group.leftSections && group.leftSections.length > 0);
              const isOpen = openId === group.id;
              const isActive = isGroupActive(group);
              const label = isEn ? group.labelEn : group.labelVi;
              const groupHref = group.id === 'home' ? homeBase : group.href;

              return (
                <div
                  key={group.id}
                  className="relative inline-flex items-center"
                  onPointerEnter={() => openGroup(group)}
                  onPointerLeave={scheduleClose}
                >
                  {hasMenu ? (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => {
                        if (isOpen) setOpenId(null);
                        else openGroup(group);
                      }}
                      className={`inline-flex items-center gap-1.5 py-2 px-1 text-[13.5px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        isOpen || isActive ? 'text-[#9CC43B]' : 'text-white hover:text-[#9CC43B]'
                      }`}
                    >
                      <span>{label}</span>
                      <span
                        aria-hidden="true"
                        className={`text-[10px] leading-none transition-transform duration-200 ${
                          isOpen ? 'rotate-180 opacity-100' : 'opacity-65'
                        }`}
                      >
                        ▾
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={groupHref}
                      className={`inline-flex items-center py-2 px-1 text-[13.5px] font-medium whitespace-nowrap transition-colors ${
                        isActive ? 'text-[#9CC43B]' : 'text-white hover:text-[#9CC43B]'
                      }`}
                    >
                      {label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Far Right: Language Switcher [VI | EN] + CTA Button + Mobile Menu Button */}
          <div className="relative z-10 inline-flex shrink-0 items-center gap-4 ml-auto">
            <div
              role="group"
              aria-label={isEn ? 'Language' : 'Ngôn ngữ'}
              className="inline-flex items-center gap-1 font-mono text-[11px]"
            >
              <button
                type="button"
                onClick={() => switchLang('vi')}
                aria-current={!isEn ? 'true' : undefined}
                className={`px-2 py-1 rounded-[2px] transition-colors cursor-pointer ${
                  !isEn
                    ? 'border border-white/80 text-white font-semibold'
                    : 'text-white/55 hover:text-white'
                }`}
              >
                VI
              </button>
              <button
                type="button"
                onClick={() => switchLang('en')}
                aria-current={isEn ? 'true' : undefined}
                className={`px-2 py-1 rounded-[2px] transition-colors cursor-pointer ${
                  isEn
                    ? 'border border-white/80 text-white font-semibold'
                    : 'text-white/55 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <Link
              href="/contact-us"
              className="hidden sm:inline-flex items-center justify-center rounded-[3px] bg-[#9CC43B] px-4 py-2 text-[13px] font-medium text-black transition-colors hover:bg-[#afd64e] whitespace-nowrap"
            >
              {isEn ? 'Start a project' : 'Liên hệ hợp tác'}
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-expanded={isMobileOpen}
              aria-label={isMobileOpen ? (isEn ? 'Close menu' : 'Đóng menu') : 'Menu'}
              className="xl:hidden inline-flex items-center justify-center rounded-[3px] border border-white/25 bg-black/60 px-3 py-1.5 text-[13px] font-medium text-white hover:border-[#9CC43B] hover:text-[#9CC43B] transition-colors"
            >
              {isMobileOpen ? (isEn ? 'Close' : 'Đóng') : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Architectural Full-Width Command Curtain (Desktop >= 1280px) */}
      {activeGroup && (
        <>
          <div
            className="egead-cmd-backdrop hidden xl:block"
            onClick={() => setOpenId(null)}
            aria-hidden="true"
          />
          <div
            ref={curtainRef}
            className="egead-cmd-curtain hidden xl:block"
            onPointerEnter={cancelClose}
            onPointerLeave={scheduleClose}
            role="region"
            aria-label={isEn ? activeGroup.labelEn : activeGroup.labelVi}
          >
            <div className="egead-cmd-beam" aria-hidden="true" />

            <div key={activeGroup.id} className="egead-cmd-inner">
              <div
                className={`egead-cmd-directory ${
                  activeGroup.panelMode === 'split-balanced'
                    ? 'egead-cmd-directory--split'
                    : 'egead-cmd-directory--single'
                }`}
              >
                <div className="egead-cmd-track">
                  {activeGroup.leftSections?.map((sec) => (
                    <div key={sec.index} className="egead-cmd-section">
                      <div className="egead-cmd-section-head">
                        <div className="egead-cmd-section-title-wrap">
                          <span className="egead-cmd-index-pill">{sec.index}</span>
                          <span className="egead-cmd-section-title">
                            {isEn ? sec.titleEn : sec.titleVi}
                          </span>
                        </div>
                        <span className="egead-cmd-section-count">
                          {String(sec.items.length).padStart(2, '0')}
                        </span>
                      </div>
                      <div className={getCellsClass(activeGroup.panelMode)}>
                        {sec.items.map(renderItemCell)}
                      </div>
                    </div>
                  ))}
                </div>

                {activeGroup.panelMode === 'split-balanced' && activeGroup.rightSections && (
                  <div className="egead-cmd-track">
                    {activeGroup.rightSections.map((sec) => (
                      <div key={sec.index} className="egead-cmd-section">
                        <div className="egead-cmd-section-head">
                          <div className="egead-cmd-section-title-wrap">
                            <span className="egead-cmd-index-pill">{sec.index}</span>
                            <span className="egead-cmd-section-title">
                              {isEn ? sec.titleEn : sec.titleVi}
                            </span>
                          </div>
                          <span className="egead-cmd-section-count">
                            {String(sec.items.length).padStart(2, '0')}
                          </span>
                        </div>
                        <div className="egead-cmd-cells">{sec.items.map(renderItemCell)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Architectural Utility Rail */}
            <div className="egead-cmd-rail">
              <div className="egead-cmd-rail-inner">
                <div className="egead-cmd-rail-left">
                  <span>
                    {isEn
                      ? 'EGEAD · Digital Commerce, AI Automation & Creative Studio'
                      : 'EGEAD · Thương mại số, Tự động hóa AI & Studio Sáng tạo'}
                  </span>
                  <span className="egead-cmd-rail-kbd">Esc</span>
                </div>
                <div className="egead-cmd-rail-links">
                  <Link
                    href="/partners"
                    onClick={() => setOpenId(null)}
                    className="egead-cmd-rail-link"
                  >
                    {isEn ? 'Ecosystem & Partners →' : 'Hệ sinh thái & Đối tác →'}
                  </Link>
                  <Link
                    href="/contact-us"
                    onClick={() => setOpenId(null)}
                    className="egead-cmd-rail-link"
                  >
                    {isEn ? 'Book 1-1 Consultation →' : 'Đặt lịch tư vấn 1-1 →'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile & Tablet Slide-down Drawer (< 1280px) */}
      {isMobileOpen && (
        <div
          style={{ backgroundColor: '#04060e' }}
          className="fixed inset-0 z-[190] xl:hidden pt-[88px] pb-8 px-6 overflow-y-auto"
        >
          <div className="mx-auto max-w-xl flex flex-col gap-2">
            {EGEAD_PUBLIC_NAV.map((group) => {
              const allSections = [
                ...(group.leftSections || []),
                ...(group.rightSections || []),
              ];
              const hasMenu = allSections.length > 0;
              const expanded = mobileExpandedId === group.id;
              const label = isEn ? group.labelEn : group.labelVi;

              return (
                <div key={group.id} className="border-b border-white/10 pb-2">
                  {hasMenu ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpandedId((prev) => (prev === group.id ? null : group.id))
                        }
                        className="flex w-full items-center justify-between py-3 text-left text-[16px] font-medium text-white"
                      >
                        <span className={expanded ? 'text-[#9CC43B]' : ''}>{label}</span>
                        <span className="text-[12px] text-white/60">{expanded ? '▴' : '▾'}</span>
                      </button>
                      {expanded && (
                        <div className="flex flex-col gap-4 pb-3 pl-3">
                          {allSections.map((sec) => (
                            <div key={sec.index} className="flex flex-col gap-1.5">
                              <div className="text-[12px] font-semibold text-[#9CC43B]">
                                {isEn ? sec.titleEn : sec.titleVi}
                              </div>
                              {sec.items.map((sub) => {
                                const href = resolveSubHref(sub);
                                return (
                                  <a
                                    key={sub.id}
                                    href={href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="flex items-center justify-between py-2 text-[14px] font-medium text-white hover:text-[#9CC43B]"
                                  >
                                    <span>{isEn ? sub.labelEn : sub.labelVi}</span>
                                    <span className="font-mono text-[11px] text-white/45">↗</span>
                                  </a>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={group.id === 'home' ? homeBase : group.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block py-3 text-[16px] font-medium text-white hover:text-[#9CC43B]"
                    >
                      {label}
                    </Link>
                  )}
                </div>
              );
            })}

            <div className="pt-5">
              <Link
                href="/contact-us"
                onClick={() => setIsMobileOpen(false)}
                className="flex w-full items-center justify-center rounded-[3px] bg-[#9CC43B] px-5 py-3 text-[14px] font-medium text-black"
              >
                {isEn ? 'Start a project' : 'Liên hệ hợp tác'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export * from './types';
