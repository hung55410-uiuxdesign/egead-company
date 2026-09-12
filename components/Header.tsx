'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import MegaMenu from './MegaMenu';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Our Work', href: '/our-work' },
  {
    label: 'Our Products',
    href: '/smartcommerce',
    children: [
      { label: 'SmartCX', href: '/smartcommerce', desc: '40+ intelligent commerce modules' },
      { label: 'SpeedX', href: '/speedx', desc: 'Headless accelerator for enterprise commerce' },
      { label: 'Smart Loyalty', href: '/smartcommerce', desc: 'AI-driven loyalty & retention' },
    ],
  },
  {
    label: 'Our Services',
    href: '/services/all-services',
    children: [
      { label: 'All Services', href: '/services/all-services', desc: 'Complete CX transformation capabilities' },
      { label: 'Strategy & Design', href: '/services/all-services', desc: 'Commerce strategy & experience design' },
      { label: 'Data & Analytics', href: '/services/all-services', desc: 'AI, machine learning & predictive analytics' },
      { label: 'Enterprise Technology', href: '/services/all-services', desc: 'Platform implementation & cloud integration' },
      { label: 'Commerce & CX Operations', href: '/services/all-services', desc: '24/7 commerce & marketing AI operations' },
    ],
  },
  {
    label: 'Insights',
    href: '/insights',
    children: [
      { label: 'All Insights', href: '/insights', desc: 'Latest articles, whitepapers & trends' },
      { label: 'Concentrix Acquisition', href: '/articles/Concentrix-Acquires-SAI-Digital', desc: 'Strengthening APAC tech capabilities' },
      { label: 'MACH Architecture Guide', href: '/insights', desc: 'Composable enterprise architecture' },
      { label: 'Scaling with Shopify Plus', href: '/insights', desc: 'Modern enterprise migration playbooks' },
    ],
  },
  {
    label: 'Company',
    href: '/company',
    children: [
      { label: 'About Us', href: '/company', desc: 'Our mission, vision & leadership' },
      { label: 'Careers', href: '/career', desc: 'Join our world-class engineering team' },
      { label: 'Testimonials', href: '/testimonial', desc: 'What global enterprise leaders say' },
      { label: 'Partners', href: '/partners', desc: 'Certified strategic tech ecosystems' },
    ],
  },
];

export default function Header() {
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

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 font-montserrat ${
          scrolled
            ? 'bg-[#0A0D0E]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="w-full px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 transition-opacity hover:opacity-90">
            <img
              src="/assets/SAI_CNX_2026_logo.svg"
              alt="SAI Digital | A Concentrix Company"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain"
            />
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative py-2"
                onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-[13.5px] xl:text-[14px] font-medium text-white/90 hover:text-white transition tracking-normal"
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-white/70 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.label && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 rounded-2xl bg-[#141718]/95 backdrop-blur-xl border border-white/10 p-3 shadow-2xl animate-fade-in-up z-50"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex flex-col gap-1">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group p-2.5 rounded-xl hover:bg-white/10 transition flex flex-col"
                        >
                          <span className="text-[13.5px] font-semibold text-white group-hover:text-[#25E2CC] transition">
                            {sub.label}
                          </span>
                          {sub.desc && (
                            <span className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                              {sub.desc}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Language Selector */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 text-[13px] font-medium text-white/90 hover:text-white transition tracking-wide py-1 px-2 rounded-lg hover:bg-white/5"
              >
                <Globe className="w-4 h-4 text-[#F2F2F2]" />
                <span className="text-[#F2F2F2] font-semibold">{selectedLang}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8C8C8C]" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 rounded-2xl bg-[#141718]/95 backdrop-blur-xl border border-white/10 p-1.5 shadow-2xl z-50 animate-fade-in-up">
                  {['EN', 'JA', 'VI'].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${
                        selectedLang === lang
                          ? 'bg-[#25E2CC]/20 text-[#25E2CC]'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {lang === 'EN' ? 'English (EN)' : lang === 'JA' ? '日本語 (JA)' : 'Tiếng Việt (VI)'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Let's Talk Button - exact live site styling: rgb(0, 61, 91), border-radius 40px, padding 14px 22px */}
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-[#25E2CC] hover:bg-[#1ec2af] text-[#003D5B] font-semibold text-[15px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition duration-200 shadow-[0_0_20px_rgba(37,226,204,0.35)] hover:shadow-[0_0_25px_rgba(37,226,204,0.5)] shrink-0"
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
              <span>Let's talk</span>
            </Link>

            {/* Hamburger Button: ONLY on mobile (lg:hidden) as on live site! */}
            <button
              type="button"
              onClick={() => setIsMegaMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="lg:hidden w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition backdrop-blur-md text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MegaMenu Drawer Component */}
      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
    </>
  );
}
