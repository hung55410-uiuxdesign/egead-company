'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Globe,
  Menu,
  Rocket,
  Scale,
  Boxes,
  Gift,
  Zap,
  Layers,
  TrendingUp,
  Terminal,
  ShieldCheck,
  ArrowUpRight,
  BookOpen,
  Sparkles,
  Building2,
  Users,
  Briefcase,
  Award,
  Mail,
  MapPin,
} from 'lucide-react';
import MegaMenu from './MegaMenu';
import { CategoryItem, getCategoryHref } from '@/types/category';

const DEFAULT_INSIGHTS_CATEGORIES: CategoryItem[] = [
  {
    id: 'webinars',
    name: 'Webinars',
    slug: 'webinars',
    icon: '/assets/icon_webinar.svg',
    count: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'announcements',
    name: 'Announcements',
    slug: 'announcements',
    icon: '/assets/icon_announcement.svg',
    count: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'white-papers',
    name: 'White Papers',
    slug: 'white-papers',
    icon: '/assets/icon_whitepaper.svg',
    count: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'blogs',
    name: 'Blogs',
    slug: 'blogs',
    icon: '/assets/icon_blog.svg',
    count: 0,
    createdAt: '',
    updatedAt: '',
  },
];

interface NavItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'Our Work', href: '/our-work' },
  { id: 'products', label: 'Our Products', href: '/smartcommerce', hasDropdown: true },
  { id: 'services', label: 'Our Services', href: '/services/all-services', hasDropdown: true },
  { id: 'insights', label: 'Insights', href: '/insights', hasDropdown: true },
  { id: 'company', label: 'Company', href: '/company', hasDropdown: true },
];

interface HeaderProps {
  initialCategories?: CategoryItem[];
}

export default function Header({ initialCategories = [] }: HeaderProps) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    if (initialCategories && initialCategories.length > 0) return initialCategories;
    return DEFAULT_INSIGHTS_CATEGORIES;
  });

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories);
      return;
    }
    fetch('/api/categories')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && Array.isArray(resData.data) && resData.data.length > 0) {
          setCategories(resData.data);
        }
      })
      .catch(() => {});
  }, [initialCategories]);

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleMouseEnter = (id: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 font-montserrat ${
          scrolled
            ? 'bg-[#0A0D0E]/90 backdrop-blur-xl border-b border-white/10 py-3.5 sm:py-4 shadow-[0_16px_40px_rgba(0,0,0,0.6)]'
            : 'bg-transparent py-5 sm:py-6 border-b border-transparent'
        }`}
      >
        {/* Navigation Bar - Aligned precisely with all site section contents */}
        <div className="relative w-full px-6 sm:px-10 lg:px-14 xl:px-16 flex items-center justify-between">
          {/* Logo with micro hover */}
          <Link href="/" className="flex items-center shrink-0 transition-opacity hover:opacity-90">
            <motion.img
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              src="/assets/logo/white.png"
              alt="E-GEAD — Automate Operations, Scale Global Sales"
              className="h-12 sm:h-13 md:h-14 lg:h-[54px] w-auto object-contain cursor-pointer"
            />
          </Link>

          {/* Center Navigation Links (Desktop) - True Geometric Center with gliding active indicator */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeDropdown === item.id;
              return (
                <div
                  key={item.id}
                  className="relative py-2"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 text-[13.5px] xl:text-[14px] font-medium transition duration-200 relative ${
                      isActive ? 'text-white font-semibold' : 'text-white/85 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <motion.span
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
                        className="inline-flex items-center"
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 ${
                            isActive ? 'text-[#10E774]' : 'text-white/60'
                          }`}
                        />
                      </motion.span>
                    )}

                    {/* Gliding Active Indicator matching reference */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-2.5 sm:-bottom-3 left-0 right-0 h-[2.5px] bg-[#10E774] shadow-[0_0_10px_#10E774] rounded-full"
                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Language Selector */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 text-[13px] font-medium text-white/90 hover:text-white transition py-1 px-2 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-[#F2F2F2]" />
                <span className="text-[#F2F2F2] font-semibold">{selectedLang}</span>
                <motion.span
                  animate={{ rotate: langDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center"
                >
                  <ChevronDown className="w-3.5 h-3.5 text-[#8C8C8C]" />
                </motion.span>
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] as const }}
                    className="absolute right-0 top-full mt-2 w-32 rounded-2xl bg-[#141718]/95 backdrop-blur-xl border border-white/10 p-1.5 shadow-2xl z-50"
                  >
                    {['EN', 'JA', 'VI'].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setSelectedLang(lang);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                          selectedLang === lang
                            ? 'bg-[#10E774]/20 text-[#10E774]'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {lang === 'EN' ? 'English (EN)' : lang === 'JA' ? '日本語 (JA)' : 'Tiếng Việt (VI)'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Let's Talk Button - live site styling with spring micro-interaction */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-[#10E774] hover:bg-[#0ecb66] text-[#003D5B] font-semibold text-[15px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition duration-200 shadow-[0_0_20px_rgba(16,231,116,0.35)] hover:shadow-[0_0_25px_rgba(16,231,116,0.5)] shrink-0"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-[#003D5B]"
                >
                  <path
                    d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Let&apos;s talk</span>
              </Link>
            </motion.div>

            {/* Hamburger Button: ONLY on mobile (lg:hidden) */}
            <motion.button
              type="button"
              onClick={() => setIsMegaMenuOpen(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Open Navigation Menu"
              className="lg:hidden w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition backdrop-blur-md text-white cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Mega Submenu Floating White Panel with Smooth Opening/Closing & Tab Cross-Fade */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              key="mega-submenu-container"
              initial={{ opacity: 0, y: -14, scale: 0.98, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, scale: 0.98, filter: 'blur(6px)' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mt-2.5"
              onMouseEnter={() => {
                if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-full bg-white text-black rounded-[32px] sm:rounded-[36px] shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-gray-100 p-8 sm:p-10 lg:p-12 xl:p-14 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDropdown}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as const }}
                  >
                    {/* Products Submenu */}
                    {activeDropdown === 'products' && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 mb-6 tracking-wide uppercase">
                          Our Products
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                          {/* Columns 1-3: Product Links */}
                          <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                            {/* Column 1 */}
                            <div className="space-y-4">
                              <Link
                                href="/speedx"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Rocket className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">SpeedX</span>
                              </Link>
                              <Link
                                href="/smartprice"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Scale className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">SmartPrice</span>
                              </Link>
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-4">
                              <Link
                                href="/smartcommerce"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Boxes className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">SmartCommerce</span>
                              </Link>
                            </div>

                            {/* Column 3 */}
                            <div className="space-y-4">
                              <Link
                                href="/loyalty"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Gift className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">SmartLoyalty</span>
                              </Link>
                            </div>
                          </div>

                          {/* Column 4: Featured Image Card */}
                          <div className="md:col-span-4 lg:col-span-3 flex justify-end">
                            <div className="w-full max-w-[300px] h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md border border-gray-100 relative group bg-black">
                              <img
                                src="/assets/menu_product_3d.jpg"
                                alt="E-GEAD Products"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Services Submenu */}
                    {activeDropdown === 'services' && (
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-14 items-start">
                          {/* Column 1: Our Services */}
                          <div>
                            <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mb-6 font-montserrat">
                              Our Services
                            </h3>
                            <div className="space-y-4 mb-8">
                              <Link
                                href="/services/all-services/strategy-design"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/icon_strategy_design.svg"
                                    alt="Strategy & Design"
                                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                  />
                                </span>
                                <span className="group-hover:translate-x-0.5 transition-transform">Strategy & Design</span>
                              </Link>

                              <Link
                                href="/services/all-services/data-analytics"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/icon_data_analytics.svg"
                                    alt="Data & Analytics"
                                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                  />
                                </span>
                                <span className="group-hover:translate-x-0.5 transition-transform">Data & Analytics</span>
                              </Link>

                              <Link
                                href="/services/all-services/enterprise-technology"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/icon_enterprise_tech.svg"
                                    alt="Enterprise Technology"
                                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                  />
                                </span>
                                <span className="group-hover:translate-x-0.5 transition-transform">Enterprise Technology</span>
                              </Link>

                              <Link
                                href="/services/all-services/commerce-cx--operations"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/icon_commerce_cx.svg"
                                    alt="Commerce & CX Operations"
                                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                  />
                                </span>
                                <span className="group-hover:translate-x-0.5 transition-transform">Commerce & CX Operations</span>
                              </Link>
                            </div>

                            <Link
                              href="/services/all-services"
                              onClick={() => setActiveDropdown(null)}
                              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 hover:border-black text-[13.5px] font-semibold text-gray-800 hover:text-black transition duration-200 hover:bg-gray-50/80 shadow-sm"
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 19 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-current text-gray-700"
                              >
                                <path
                                  d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
                                  fill="currentColor"
                                />
                              </svg>
                              <span>All Our Services</span>
                            </Link>
                          </div>

                          {/* Column 2: Industries */}
                          <div>
                            <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mb-6 font-montserrat">
                              Industries
                            </h3>
                            <div className="space-y-4 mb-8">
                              <Link
                                href="/services/all-services/automotive"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/icon_automotive.svg"
                                    alt="Automotive"
                                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                  />
                                </span>
                                <span className="group-hover:translate-x-0.5 transition-transform">Automotive</span>
                              </Link>

                              <Link
                                href="/services/all-services/banking-insurance"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/icon_banking.svg"
                                    alt="Banking & Insurance"
                                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                  />
                                </span>
                                <span className="group-hover:translate-x-0.5 transition-transform">Banking & Insurance</span>
                              </Link>

                              <Link
                                href="/services/all-services/chemicals"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/icon_chemicals.svg"
                                    alt="Chemicals"
                                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                  />
                                </span>
                                <span className="group-hover:translate-x-0.5 transition-transform">Chemicals</span>
                              </Link>

                              <Link
                                href="/services/all-services/consumer-goods"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/icon_consumergoods.svg"
                                    alt="Consumer Goods"
                                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                  />
                                </span>
                                <span className="group-hover:translate-x-0.5 transition-transform">Consumer Goods</span>
                              </Link>

                              <Link
                                href="/services/all-services/fashion"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/icon_fashion.svg"
                                    alt="Fashion & Lifestyle"
                                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                  />
                                </span>
                                <span className="group-hover:translate-x-0.5 transition-transform">Fashion & Lifestyle</span>
                              </Link>

                              <Link
                                href="/services/all-services/health-science"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/icon_science.svg"
                                    alt="Health & Science"
                                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                  />
                                </span>
                                <span className="group-hover:translate-x-0.5 transition-transform">Health & Science</span>
                              </Link>
                            </div>

                            <Link
                              href="/services/all-services#industries"
                              onClick={() => setActiveDropdown(null)}
                              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 hover:border-black text-[13.5px] font-semibold text-gray-800 hover:text-black transition duration-200 hover:bg-gray-50/80 shadow-sm"
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 19 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-current text-gray-700"
                              >
                                <path
                                  d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
                                  fill="currentColor"
                                />
                              </svg>
                              <span>All Industries</span>
                            </Link>
                          </div>

                          {/* Column 3: Partners */}
                          <div>
                            <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mb-6 font-montserrat">
                              Partners
                            </h3>
                            <div className="space-y-4 mb-8">
                              <Link
                                href="/partners/sap"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="group-hover:translate-x-0.5 transition-transform">SAP</span>
                              </Link>

                              <Link
                                href="/partners/shopify-plus"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="group-hover:translate-x-0.5 transition-transform">Shopify Plus</span>
                              </Link>

                              <Link
                                href="/partners/site-core"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="group-hover:translate-x-0.5 transition-transform">Sitecore</span>
                              </Link>

                              <Link
                                href="/partners/stripe"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="group-hover:translate-x-0.5 transition-transform">Stripe</span>
                              </Link>
                            </div>

                            <Link
                              href="/partners"
                              onClick={() => setActiveDropdown(null)}
                              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 hover:border-black text-[13.5px] font-semibold text-gray-800 hover:text-black transition duration-200 hover:bg-gray-50/80 shadow-sm"
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 19 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-current text-gray-700"
                              >
                                <path
                                  d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
                                  fill="currentColor"
                                />
                              </svg>
                              <span>All Partners</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Insights Submenu */}
                    {activeDropdown === 'insights' && (
                      <div>
                        <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mb-8 font-montserrat">
                          Insights
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
                          {categories.map((cat) => {
                            const href = getCategoryHref(cat.slug);
                            return (
                              <Link
                                key={cat.id || cat.slug}
                                href={href}
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                {cat.icon ? (
                                  <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                    <img
                                      src={cat.icon}
                                      alt={cat.name}
                                      className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                    />
                                  </span>
                                ) : null}
                                <span className="group-hover:translate-x-0.5 transition-transform truncate">
                                  {cat.name}
                                </span>
                              </Link>
                            );
                          })}
                        </div>

                        <div className="pt-2">
                          <Link
                            href="/insights"
                            onClick={() => setActiveDropdown(null)}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 hover:border-black text-[13.5px] font-semibold text-gray-800 hover:text-black transition duration-200 hover:bg-gray-50/80 shadow-sm"
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 19 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-current text-gray-700"
                            >
                              <path
                                d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
                                fill="currentColor"
                              />
                            </svg>
                            <span>All Insights</span>
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Company Submenu */}
                    {activeDropdown === 'company' && (
                      <div>
                        <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mb-8 font-montserrat">
                          Company
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                          <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                            {/* Column 1: About us & Our Offices */}
                            <div className="space-y-4">
                              <Link
                                href="/company"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/icon_about_us.svg"
                                    alt="About us"
                                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                  />
                                </span>
                                <span className="group-hover:translate-x-0.5 transition-transform">About us</span>
                              </Link>

                              <Link
                                href="/contact-us"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200 border-b border-gray-100 pb-3"
                              >
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/icon_offices.svg"
                                    alt="Our Offices"
                                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                  />
                                </span>
                                <span className="group-hover:translate-x-0.5 transition-transform">Our Offices</span>
                              </Link>
                            </div>

                            {/* Column 2: Careers */}
                            <div className="space-y-4">
                              <Link
                                href="/careers"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center justify-between py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <div className="flex items-center gap-3.5">
                                  <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                    <img
                                      src="/assets/icon_career.svg"
                                      alt="Careers"
                                      className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                    />
                                  </span>
                                  <span className="group-hover:translate-x-0.5 transition-transform">Careers</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#007A3D] group-hover:translate-x-1 transition-all" />
                              </Link>
                            </div>

                            {/* Column 3: Our People */}
                            <div className="space-y-4">
                              <Link
                                href="/people"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                              >
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/icon_people.svg"
                                    alt="Our People"
                                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                                  />
                                </span>
                                <span className="group-hover:translate-x-0.5 transition-transform">Our People</span>
                              </Link>
                            </div>
                          </div>

                          {/* Column 4: Featured Image Card */}
                          <div className="md:col-span-4 lg:col-span-3 flex justify-end">
                            <div className="w-full max-w-[300px] h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md border border-gray-100 relative group bg-black">
                              <img
                                src="/assets/menu_company.jpg"
                                alt="E-GEAD Company"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MegaMenu Drawer Component (Mobile only) */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        categories={categories}
      />
    </>
  );
}
