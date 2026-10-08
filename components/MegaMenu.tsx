'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ArrowUpRight } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'products' | 'work' | 'insights' | 'company'>('services');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md"
        >
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 pt-6 pb-12">
            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative rounded-[32px] sm:rounded-[40px] bg-white text-black p-6 sm:p-10 lg:p-14 shadow-2xl border border-gray-100 min-h-[500px]"
            >
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
            <Link href="/" onClick={onClose} className="flex items-center">
              <img
                src="https://egeadcompany.com/images/egead/logo.png"
                alt="E-GEAD Company"
                className="h-8 sm:h-9 w-auto"
              />
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/contact-us"
                onClick={onClose}
                className="hidden sm:inline-flex items-center gap-2 bg-[#10E774] hover:bg-[#0ecb66] text-black font-semibold text-sm px-6 py-2.5 rounded-full transition"
              >
                <span>Get Free Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Category Tabs */}
          <div className="flex flex-wrap gap-3 sm:gap-6 border-b border-gray-100 pb-4 mb-8 text-sm sm:text-base font-semibold">
            <button
              onClick={() => setActiveTab('services')}
              className={`pb-2 border-b-2 transition ${ activeTab ==='services'
                  ? 'border-[#10E774] text-black'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              Our Services
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-2 border-b-2 transition ${ activeTab ==='products'
                  ? 'border-[#10E774] text-black'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              Our Products
            </button>
            <Link
              href="/our-work"
              onClick={onClose}
              className="pb-2 border-b-2 border-transparent text-gray-500 hover:text-black transition"
            >
              Our Work
            </Link>
            <button
              onClick={() => setActiveTab('insights')}
              className={`pb-2 border-b-2 transition ${ activeTab ==='insights'
                  ? 'border-[#10E774] text-black'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              Insights
            </button>
            <button
              onClick={() => setActiveTab('company')}
              className={`pb-2 border-b-2 transition ${ activeTab ==='company'
                  ? 'border-[#10E774] text-black'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              Company
            </button>
          </div>

          {/* Tab Contents */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Content Area (Columns) */}
            <div className="lg:col-span-8">
              {activeTab === 'services' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {/* Column 1: Our Services */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                      Our Services
                    </h3>
                    <ul className="space-y-3.5 mb-6">
                      <li>
                        <Link
                          href="/services/all-services/strategy-design"
                          onClick={onClose}
                          className="group flex items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#007A3D] transition"
                        >
                          <div className="flex items-center gap-2.5">
                            <img src="/assets/icon_strategy_design.svg" alt="Strategy & Design" className="w-4 h-4 object-contain" />
                            <span>Strategy & Design</span>
                          </div>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/all-services/data-analytics"
                          onClick={onClose}
                          className="group flex items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#007A3D] transition"
                        >
                          <div className="flex items-center gap-2.5">
                            <img src="/assets/icon_data_analytics.svg" alt="Data & Analytics" className="w-4 h-4 object-contain" />
                            <span>Data & Analytics</span>
                          </div>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/all-services/enterprise-technology"
                          onClick={onClose}
                          className="group flex items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#007A3D] transition"
                        >
                          <div className="flex items-center gap-2.5">
                            <img src="/assets/icon_enterprise_tech.svg" alt="Enterprise Technology" className="w-4 h-4 object-contain" />
                            <span>Enterprise Technology</span>
                          </div>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/all-services/commerce-cx--operations"
                          onClick={onClose}
                          className="group flex items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#007A3D] transition"
                        >
                          <div className="flex items-center gap-2.5">
                            <img src="/assets/icon_commerce_cx.svg" alt="Commerce & CX Operations" className="w-4 h-4 object-contain" />
                            <span>Commerce & CX Operations</span>
                          </div>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    </ul>

                    <div className="pt-2">
                      <Link
                        href="/services/all-services"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-black text-xs font-semibold text-gray-800 transition"
                      >
                        <svg
                          width="12"
                          height="12"
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
                  </div>

                  {/* Column 2: Industries */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                      Industries
                    </h3>
                    <ul className="space-y-3.5 mb-6">
                      {[
                        { name: 'Automotive', icon: '/assets/icon_automotive.svg', href: '/services/all-services/automotive' },
                        { name: 'Banking & Insurance', icon: '/assets/icon_banking.svg', href: '/services/all-services/banking-insurance' },
                        { name: 'Chemicals', icon: '/assets/icon_chemicals.svg', href: '/services/all-services/chemicals' },
                        { name: 'Consumer Goods', icon: '/assets/icon_consumergoods.svg', href: '/services/all-services/consumer-goods' },
                        { name: 'Fashion & Lifestyle', icon: '/assets/icon_fashion.svg', href: '/services/all-services/fashion' },
                        { name: 'Health & Science', icon: '/assets/icon_science.svg', href: '/services/all-services/health-science' },
                      ].map((ind) => (
                        <li key={ind.name}>
                          <Link
                            href={ind.href}
                            onClick={onClose}
                            className="group flex items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#007A3D] transition"
                          >
                            <div className="flex items-center gap-2.5">
                              <img src={ind.icon} alt={ind.name} className="w-4 h-4 object-contain" />
                              <span>{ind.name}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2">
                      <Link
                        href="/services/all-services#industries"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-black text-xs font-semibold text-gray-800 transition"
                      >
                        <svg
                          width="12"
                          height="12"
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
                  </div>

                  {/* Column 3: Partners */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                      Partners
                    </h3>
                    <ul className="space-y-3.5 mb-6">
                      {[
                        { name: 'SAP', href: '/partners/sap' },
                        { name: 'Shopify Plus', href: '/partners/shopify-plus' },
                        { name: 'Sitecore', href: '/partners/site-core' },
                        { name: 'Stripe', href: '/partners/stripe' },
                      ].map((p) => (
                        <li key={p.name}>
                          <Link
                            href={p.href}
                            onClick={onClose}
                            className="group flex items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#007A3D] transition"
                          >
                            <span>{p.name}</span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2">
                      <Link
                        href="/partners"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-black text-xs font-semibold text-gray-800 transition"
                      >
                        <svg
                          width="12"
                          height="12"
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

              {activeTab === 'products' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#10E774] transition">
                    <span className="text-xs font-bold text-[#007A3D]">Operations Dashboard</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-1">Eweb-platform</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Connect storefronts, WMS inventory, and financial reconciliation in real time without manual spreadsheets.
                    </p>
                    <Link
                      href="/smartcommerce"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#007A3D] mt-3 hover:underline"
                    >
                      Learn more <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#10E774] transition">
                    <span className="text-xs font-bold text-[#007A3D]">AI/ML Pricing Intelligence</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-1">SmartPrice</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Recommend optimal trading prices for pre-owned products using AI/ML real-time market intelligence.
                    </p>
                    <Link
                      href="/smartprice"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#007A3D] mt-3 hover:underline"
                    >
                      Learn more <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#10E774] transition">
                    <span className="text-xs font-bold text-[#007A3D]">AI & POD Engine</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-1">SpeedX</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Smart AI order normalization, address validation, fraud risk filtering, and sub-24h US POD fulfillment.
                    </p>
                    <Link
                      href="/speedx"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#007A3D] mt-3 hover:underline"
                    >
                      Learn more <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#10E774] transition">
                    <span className="text-xs font-bold text-[#007A3D]">High-Converting Storefront</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-1">Eweb-builder</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Ultra-fast, SEO-optimized storefront development pre-connected to E-GEAD fulfillment APIs for US and EU markets.
                    </p>
                    <Link
                      href="/smartcommerce"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#007A3D] mt-3 hover:underline"
                    >
                      Learn more <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#10E774] transition">
                    <span className="text-xs font-bold text-[#007A3D]">Omnichannel Retention</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-1">SmartLoyalty</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Cultivate deeper customer relationships, drive retention, and build sustainable communities across O2O touchpoints.
                    </p>
                    <Link
                      href="/loyalty"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#007A3D] mt-3 hover:underline"
                    >
                      Learn more <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#10E774] transition">
                    <span className="text-xs font-bold text-[#007A3D]">Instant Estimator</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-1">Rate Calculator</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Calculate print costs, dimensional weights, and multi-state shipping rates in seconds with full margin visibility.
                    </p>
                    <Link
                      href="/contact-us"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#007A3D] mt-3 hover:underline"
                    >
                      Calculate rate <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'insights' && (
                <div>
                  <h3 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-wider">
                    Insights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                      href="/webinars"
                      onClick={onClose}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <img src="/assets/icon_webinar.svg" alt="Webinars" className="w-5 h-5 object-contain" />
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-[#007A3D] transition">Webinars</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#007A3D] group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                      href="/announcements"
                      onClick={onClose}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <img src="/assets/icon_announcement.svg" alt="Announcements" className="w-5 h-5 object-contain" />
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-[#007A3D] transition">Announcements</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#007A3D] group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                      href="/white-papers"
                      onClick={onClose}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <img src="/assets/icon_whitepaper.svg" alt="White Papers" className="w-5 h-5 object-contain" />
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-[#007A3D] transition">White Papers</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#007A3D] group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                      href="/blog"
                      onClick={onClose}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <img src="/assets/icon_blog.svg" alt="Blog" className="w-5 h-5 object-contain" />
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-[#007A3D] transition">Blog</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#007A3D] group-hover:translate-x-1 transition-all" />
                    </Link>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <Link
                      href="/insights"
                      onClick={onClose}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 hover:border-black text-sm font-semibold text-gray-800 transition"
                    >
                      <svg
                        width="14"
                        height="14"
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

              {activeTab === 'company' && (
                <div>
                  <h3 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-wider">
                    Company
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                      href="/company"
                      onClick={onClose}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <img src="/assets/icon_about_us.svg" alt="About us" className="w-5 h-5 object-contain" />
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-[#007A3D] transition">About us</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#007A3D] group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                      href="/contact-us"
                      onClick={onClose}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <img src="/assets/icon_offices.svg" alt="Our Offices" className="w-5 h-5 object-contain" />
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-[#007A3D] transition">Our Offices</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#007A3D] group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                      href="/careers"
                      onClick={onClose}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <img src="/assets/icon_career.svg" alt="Careers" className="w-5 h-5 object-contain" />
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-[#007A3D] transition">Careers</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#007A3D] group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                      href="/people"
                      onClick={onClose}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <img src="/assets/icon_people.svg" alt="Our People" className="w-5 h-5 object-contain" />
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-[#007A3D] transition">Our People</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#007A3D] group-hover:translate-x-1 transition-all" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Promotional Feature Card */}
            <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#0A0D0E] to-[#141718] p-6 text-white flex flex-col justify-between relative overflow-hidden border border-gray-800">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#10E774]/20 text-[#10E774] border border-[#10E774]/30 mb-4">
                  US POD Production
                </span>
                <h3 className="text-xl font-bold leading-snug">
                  Fulfilled in Under 24 Hours From $6 All-In
                </h3>
                <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                  End-to-end production with 23-inch large-format printing technology, 100% TikTok Shop US compliance, and real-time barcode accuracy.
                </p>
              </div>

              <div className="mt-8 relative z-10">
                <Link
                  href="/contact-us"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-[#10E774] hover:bg-[#0ecb66] text-black font-semibold text-xs px-5 py-2.5 rounded-full transition"
                >
                  <span>Request POD Pricing</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Graphic in background */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#10E774]/10 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
  );
}
