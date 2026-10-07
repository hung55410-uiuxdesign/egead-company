'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ChevronDown,
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

export default function Header() {
  const pathname = usePathname();
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
                                href="/smartcommerce"
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
                                href="/services/all-services"
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
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 mb-6 tracking-wide uppercase">
                          Our Services
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                          <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                            <div className="space-y-4">
                              <Link
                                href="/speedx"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Zap className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">US POD Fulfillment</span>
                              </Link>
                              <Link
                                href="/smartcommerce"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Layers className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">Sales Automation</span>
                              </Link>
                            </div>

                            <div className="space-y-4">
                              <Link
                                href="/services/all-services"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">Digital Growth Marketing</span>
                              </Link>
                              <Link
                                href="/services/all-services"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Terminal className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">Developers Hub & WMS</span>
                              </Link>
                            </div>

                            <div className="space-y-4">
                              <Link
                                href="/speedx"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <ShieldCheck className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">TikTok Shop Compliance</span>
                              </Link>
                              <Link
                                href="/services/all-services"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-[#007A3D] hover:underline transition"
                              >
                                <ArrowUpRight className="w-5 h-5 text-[#007A3D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                <span className="group-hover:translate-x-1 transition-transform">View All Capabilities</span>
                              </Link>
                            </div>
                          </div>

                          <div className="md:col-span-4 lg:col-span-3 flex justify-end">
                            <div className="w-full max-w-[300px] h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md border border-gray-100 relative group bg-black">
                              <img
                                src="/assets/banner18.png"
                                alt="E-GEAD Services"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Insights Submenu */}
                    {activeDropdown === 'insights' && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 mb-6 tracking-wide uppercase">
                          Insights & Strategy
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                          <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                            <div className="space-y-4">
                              <Link
                                href="/articles/global-market-expansion-cross-border-ecommerce"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Globe className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">Global Market Expansion</span>
                              </Link>
                              <Link
                                href="/articles/tiktok-shop-us-compliance-sub-24h-pod-fulfillment"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <ShieldCheck className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">TikTok Shop US SLA</span>
                              </Link>
                            </div>

                            <div className="space-y-4">
                              <Link
                                href="/articles/wms-barcode-real-time-multi-channel-sync"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Boxes className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">WMS Barcode & Sync</span>
                              </Link>
                              <Link
                                href="/insights"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">Seller Playbooks</span>
                              </Link>
                            </div>

                            <div className="space-y-4">
                              <Link
                                href="/our-work"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Sparkles className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">Brand Case Studies</span>
                              </Link>
                              <Link
                                href="/insights"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-[#007A3D] hover:underline transition"
                              >
                                <ArrowUpRight className="w-5 h-5 text-[#007A3D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                <span className="group-hover:translate-x-1 transition-transform">Explore All Articles</span>
                              </Link>
                            </div>
                          </div>

                          <div className="md:col-span-4 lg:col-span-3 flex justify-end">
                            <div className="w-full max-w-[300px] h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md border border-gray-100 relative group bg-black">
                              <img
                                src="/assets/smartcx-2.png"
                                alt="E-GEAD Insights"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Company Submenu */}
                    {activeDropdown === 'company' && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 mb-6 tracking-wide uppercase">
                          Company
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                          <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                            <div className="space-y-4">
                              <Link
                                href="/company"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Building2 className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">About E-GEAD</span>
                              </Link>
                              <Link
                                href="/people"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Users className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">Our People</span>
                              </Link>
                            </div>

                            <div className="space-y-4">
                              <Link
                                href="/career"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">Careers</span>
                              </Link>
                              <Link
                                href="/testimonial"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Award className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">Testimonials</span>
                              </Link>
                            </div>

                            <div className="space-y-4">
                              <Link
                                href="/contact-us"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">Contact Us</span>
                              </Link>
                              <Link
                                href="/contact-us"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                              >
                                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                                <span className="group-hover:translate-x-1 transition-transform">Buon Ma Thuot HQ</span>
                              </Link>
                            </div>
                          </div>

                          <div className="md:col-span-4 lg:col-span-3 flex justify-end">
                            <div className="w-full max-w-[300px] h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md border border-gray-100 relative group bg-black">
                              <img
                                src="/assets/Rectangle_539.jpg"
                                alt="E-GEAD Headquarters"
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
      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
    </>
  );
}
