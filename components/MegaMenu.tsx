'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronRight, ArrowUpRight } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'products' | 'work' | 'insights' | 'company'>('services');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md transition-all duration-300">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 pt-6">
        {/* Modal Window */}
        <div className="relative rounded-[32px] sm:rounded-[40px] bg-white text-black p-6 sm:p-10 lg:p-14 shadow-2xl border border-gray-100 min-h-[500px] animate-fade-in-up">
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
            <Link href="/" onClick={onClose} className="flex items-center">
              <img
                src="/assets/SAI_CNX_2026_logo_black.svg"
                alt="SAI Digital Concentrix"
                className="h-8 sm:h-9 w-auto"
              />
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/contact-us"
                onClick={onClose}
                className="hidden sm:inline-flex items-center gap-2 bg-[#25E2CC] hover:bg-[#1ec2af] text-black font-semibold text-sm px-6 py-2.5 rounded-full transition"
              >
                <span>Let's talk</span>
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
              className={`pb-2 border-b-2 transition ${
                activeTab === 'services'
                  ? 'border-[#25E2CC] text-black'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              Our Services
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-2 border-b-2 transition ${
                activeTab === 'products'
                  ? 'border-[#25E2CC] text-black'
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
              className={`pb-2 border-b-2 transition ${
                activeTab === 'insights'
                  ? 'border-[#25E2CC] text-black'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              Insights
            </button>
            <button
              onClick={() => setActiveTab('company')}
              className={`pb-2 border-b-2 transition ${
                activeTab === 'company'
                  ? 'border-[#25E2CC] text-black'
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
                  {/* Column 1: Core Services */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                      Core Capabilities
                    </h3>
                    <ul className="space-y-3.5">
                      <li>
                        <Link
                          href="/services/all-services/strategy-design"
                          onClick={onClose}
                          className="group flex items-center justify-between text-sm font-medium text-gray-800 hover:text-[#007380] transition"
                        >
                          <span>Strategy & Design</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/all-services/data-analytics"
                          onClick={onClose}
                          className="group flex items-center justify-between text-sm font-medium text-gray-800 hover:text-[#007380] transition"
                        >
                          <span>Data & Analytics</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/all-services/enterprise-technology"
                          onClick={onClose}
                          className="group flex items-center justify-between text-sm font-medium text-gray-800 hover:text-[#007380] transition"
                        >
                          <span>Enterprise Technology</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/all-services/commerce-cx--operations"
                          onClick={onClose}
                          className="group flex items-center justify-between text-sm font-medium text-gray-800 hover:text-[#007380] transition"
                        >
                          <span>Commerce & CX Operations</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    </ul>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <Link
                        href="/services/all-services"
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#007380] hover:underline"
                      >
                        <span>View All Services</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Column 2: Industries */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                      Industries
                    </h3>
                    <ul className="space-y-3.5">
                      {['Automotive', 'Banking & Insurance', 'Chemicals', 'Consumer Goods', 'Fashion & Lifestyle', 'Health & Science'].map((ind) => (
                        <li key={ind}>
                          <Link
                            href="/services/all-services"
                            onClick={onClose}
                            className="group flex items-center justify-between text-sm font-medium text-gray-800 hover:text-[#007380] transition"
                          >
                            <span>{ind}</span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3: Strategic Partners */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                      Strategic Partners
                    </h3>
                    <ul className="space-y-3.5">
                      {['SAP Silver Partner', 'Shopify Plus Partner', 'Sitecore', 'Stripe', 'commercetools', 'Salesforce'].map((p) => (
                        <li key={p}>
                          <Link
                            href="/partners"
                            onClick={onClose}
                            className="group flex items-center justify-between text-sm font-medium text-gray-800 hover:text-[#007380] transition"
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
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#25E2CC] transition">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#007380]">Intelligent Platform</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-1">SmartCommerce</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Enterprise headless commerce engine built for high-throughput multi-market brands.
                    </p>
                    <Link
                      href="/smartcommerce"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#007380] mt-3 hover:underline"
                    >
                      Learn more <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#25E2CC] transition">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#007380]">High Velocity</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-1">SpeedX</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Accelerate go-to-market rollout for global eCommerce platforms in weeks, not months.
                    </p>
                    <Link
                      href="/speedx"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#007380] mt-3 hover:underline"
                    >
                      Learn more <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#25E2CC] transition">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#007380]">Customer Retention</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-1">SmartLoyalty</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Omnichannel reward mechanisms with real-time customer behavior segmentation.
                    </p>
                    <Link
                      href="/smartcommerce"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#007380] mt-3 hover:underline"
                    >
                      Learn more <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#25E2CC] transition">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#007380]">Dynamic Intelligence</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-1">SmartPrice</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      AI-driven dynamic pricing and promotion optimization based on live elasticity metrics.
                    </p>
                    <Link
                      href="/smartcommerce"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#007380] mt-3 hover:underline"
                    >
                      Learn more <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'insights' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Link
                    href="/articles/Concentrix-Acquires-SAI-Digital"
                    onClick={onClose}
                    className="p-5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100 block group"
                  >
                    <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-[#D3F9F5] text-[#007380] mb-2">
                      Announcement
                    </span>
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-[#007380] transition">
                      Concentrix Acquires SAI Digital to Supercharge its Digital Commerce Solutions
                    </h4>
                    <p className="text-xs text-gray-500 mt-2">5 mins read · September 2025</p>
                  </Link>

                  <Link
                    href="/articles/how-to-use-MACH-architecture-in-eCommerce"
                    onClick={onClose}
                    className="p-5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100 block group"
                  >
                    <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 mb-2">
                      Technical Architecture
                    </span>
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-[#007380] transition">
                      How to use MACH architecture in modern enterprise eCommerce
                    </h4>
                    <p className="text-xs text-gray-500 mt-2">7 mins read · Technical Insights</p>
                  </Link>

                  <div className="col-span-full pt-2">
                    <Link
                      href="/insights"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#007380] hover:underline"
                    >
                      Explore all webinars, white papers & articles <ChevronRight className="w-4 h-4" />
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
                      <h4 className="font-bold text-gray-900">About Us</h4>
                      <p className="text-xs text-gray-600 mt-1">Our mission, global footprint, and engineering culture.</p>
                    </Link>
                    <Link
                      href="/company#leadership"
                      onClick={onClose}
                      className="block p-4 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                    >
                      <h4 className="font-bold text-gray-900">Leadership Team</h4>
                      <p className="text-xs text-gray-600 mt-1">Meet our visionary founders and global executive directors.</p>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <Link
                      href="/company"
                      onClick={onClose}
                      className="block p-4 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                    >
                      <h4 className="font-bold text-gray-900">Careers</h4>
                      <p className="text-xs text-gray-600 mt-1">Join 200+ engineers, designers, and commerce specialists.</p>
                    </Link>
                    <Link
                      href="/company"
                      onClick={onClose}
                      className="block p-4 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                    >
                      <h4 className="font-bold text-gray-900">Our People</h4>
                      <p className="text-xs text-gray-600 mt-1">Life inside SAI Digital and our diversity commitments.</p>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <Link
                      href="/contact-us"
                      onClick={onClose}
                      className="block p-4 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                    >
                      <h4 className="font-bold text-gray-900">Global Offices</h4>
                      <p className="text-xs text-gray-600 mt-1">8 strategic hubs across APAC, Australia, and North America.</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Promotional Feature Card */}
            <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#0A0D0E] to-[#141718] p-6 text-white flex flex-col justify-between relative overflow-hidden border border-gray-800">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#25E2CC]/20 text-[#25E2CC] border border-[#25E2CC]/30 mb-4">
                  Featured Milestone
                </span>
                <h3 className="text-xl font-bold leading-snug">
                  SAI Digital is now a Concentrix Company
                </h3>
                <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                  Scaling digital commerce and customer experience tech solutions across global enterprises with deep AI integrations.
                </p>
              </div>

              <div className="mt-8 relative z-10">
                <Link
                  href="/articles/Concentrix-Acquires-SAI-Digital"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-[#25E2CC] hover:bg-[#1ec2af] text-black font-semibold text-xs px-5 py-2.5 rounded-full transition"
                >
                  <span>Read Announcement</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Graphic in background */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#25E2CC]/10 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
