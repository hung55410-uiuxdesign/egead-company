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
                  {/* Column 1: Core Capabilities */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 mb-4">
                      Core Capabilities
                    </h3>
                    <ul className="space-y-3.5">
                      <li>
                        <Link
                          href="/speedx"
                          onClick={onClose}
                          className="group flex items-center justify-between text-sm font-medium text-gray-800 hover:text-[#007A3D] transition"
                        >
                          <span>US POD Fulfillment</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/smartcommerce"
                          onClick={onClose}
                          className="group flex items-center justify-between text-sm font-medium text-gray-800 hover:text-[#007A3D] transition"
                        >
                          <span>Sales Automation</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/all-services"
                          onClick={onClose}
                          className="group flex items-center justify-between text-sm font-medium text-gray-800 hover:text-[#007A3D] transition"
                        >
                          <span>Digital Growth Marketing</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/all-services"
                          onClick={onClose}
                          className="group flex items-center justify-between text-sm font-medium text-gray-800 hover:text-[#007A3D] transition"
                        >
                          <span>Developers Hub & WMS</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    </ul>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <Link
                        href="/services/all-services"
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007A3D] hover:underline"
                      >
                        <span>View All Capabilities</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Column 2: Target Categories */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 mb-4">
                      Sellers & Categories
                    </h3>
                    <ul className="space-y-3.5">
                      {['TikTok Shop US Brands', 'Amazon FBM & POD', 'Etsy Apparel Creators', 'Shopify DTC Retailers', 'Custom Graphic Apparel', 'Global Cross-Border Brands'].map((ind) => (
                        <li key={ind}>
                          <Link
                            href="/services/all-services"
                            onClick={onClose}
                            className="group flex items-center justify-between text-sm font-medium text-gray-800 hover:text-[#007A3D] transition"
                          >
                            <span>{ind}</span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3: Platform Integrations */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 mb-4">
                      Platform Integrations
                    </h3>
                    <ul className="space-y-3.5">
                      {['TikTok Shop US', 'Amazon Marketplace', 'Etsy & eBay', 'Shopify & WooCommerce', 'Meta & Google Ads', 'USPS / Major US Carriers'].map((p) => (
                        <li key={p}>
                          <Link
                            href="/partners"
                            onClick={onClose}
                            className="group flex items-center justify-between text-sm font-medium text-gray-800 hover:text-[#007A3D] transition"
                          >
                            <span>{p}</span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                      ))}
                    </ul>
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
                    <span className="text-xs font-bold text-[#007A3D]">AI & POD Engine</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-1">Eweb-character</h4>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Link
                    href="/articles/global-market-expansion-cross-border-ecommerce"
                    onClick={onClose}
                    className="p-5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100 block group"
                  >
                    <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-[#D4FAE6] text-[#007A3D] mb-2">
                      Strategy
                    </span>
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-[#007A3D] transition">
                      Global Market Expansion: Scaling Cross-Border E-Commerce in US & EU
                    </h4>
                    <p className="text-xs text-gray-500 mt-2">6 mins read · August 2026</p>
                  </Link>

                  <Link
                    href="/articles/tiktok-shop-us-compliance-sub-24h-pod-fulfillment"
                    onClick={onClose}
                    className="p-5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100 block group"
                  >
                    <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 mb-2">
                      Compliance & SLA
                    </span>
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-[#007A3D] transition">
                      Protecting TikTok Shop US Accounts: Fast Dispatch SLA & 24H POD
                    </h4>
                    <p className="text-xs text-gray-500 mt-2">5 mins read · August 2026</p>
                  </Link>

                  <div className="col-span-full pt-2">
                    <Link
                      href="/insights"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#007A3D] hover:underline"
                    >
                      Explore all insights, playbooks & guides <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'company' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <Link
                      href="/company"
                      onClick={onClose}
                      className="block p-4 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                    >
                      <h4 className="font-bold text-gray-900">About E-GEAD</h4>
                      <p className="text-xs text-gray-600 mt-1">Our mission, technology ecosystem, and global operations.</p>
                    </Link>
                    <Link
                      href="/people"
                      onClick={onClose}
                      className="block p-4 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                    >
                      <h4 className="font-bold text-gray-900">Our People</h4>
                      <p className="text-xs text-gray-600 mt-1">Meet the leaders, architects, and experts driving our success.</p>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <Link
                      href="/career"
                      onClick={onClose}
                      className="block p-4 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                    >
                      <h4 className="font-bold text-gray-900">Careers</h4>
                      <p className="text-xs text-gray-600 mt-1">Join our engineering and operations team in Buon Ma Thuot.</p>
                    </Link>
                    <Link
                      href="/testimonial"
                      onClick={onClose}
                      className="block p-4 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                    >
                      <h4 className="font-bold text-gray-900">Testimonials</h4>
                      <p className="text-xs text-gray-600 mt-1">Feedback from international sellers and brand founders.</p>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <Link
                      href="/our-work"
                      onClick={onClose}
                      className="block p-4 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                    >
                      <h4 className="font-bold text-gray-900">Case Studies</h4>
                      <p className="text-xs text-gray-600 mt-1">Real results from TikTok Shop, Amazon, and DTC brand partners.</p>
                    </Link>
                    <Link
                      href="/contact-us"
                      onClick={onClose}
                      className="block p-4 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                    >
                      <h4 className="font-bold text-gray-900">Headquarters</h4>
                      <p className="text-xs text-gray-600 mt-1">217/9 Ngo Quyen Street, Buon Ma Thuot City, Vietnam.</p>
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
