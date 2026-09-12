'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

const projects = [
  {
    id: 'suntory',
    client: 'Suntory PepsiCo',
    category: 'Beverage & Consumer Goods',
    industry: 'consumer-goods',
    title: 'Multi-channel experience and optimized customer engagement',
    desc: 'Empowering Suntory across multi-market B2B and direct-to-consumer portals with automated replenishment and dynamic localized catalogs.',
    image: '/assets/case_suntory.jpg',
    metrics: ['+45% Order Volume', '300k Active Accounts', '99.9% Uptime'],
    slug: 'multi-channel-experience-and-optimized-customer-engagement',
  },
  {
    id: 'brother',
    client: 'Brother International',
    category: 'Printing & Electronics',
    industry: 'electronics',
    title: 'Building a global consolidated commerce experience',
    desc: 'Consolidating regional legacy systems into a unified global digital commerce platform covering B2B dealers and end consumers.',
    image: '/assets/case_brother.jpg',
    metrics: ['14 Regional Hubs', '-35% Maintenance Cost', 'Headless MACH'],
    slug: 'building-a-global-consolidated-experience',
  },
  {
    id: 'weir',
    client: 'Weir Group',
    category: 'Industrial & Mining Equipment',
    industry: 'manufacturing',
    title: 'Digitizing a complex B2B legacy across 14 markets',
    desc: 'Streamlining complex quotation and replacement parts catalogs with ERP deep-links and real-time inventory visibility.',
    image: '/assets/case_weir.jpg',
    metrics: ['14 Global Markets', '50,000+ Industrial SKUs', 'Self-Serve Quoting'],
    slug: 'digitizing-a-b2b-legacy-across-14-markets',
  },
  {
    id: 'manulife',
    client: 'Manulife Insurance',
    category: 'Financial Services & Insurance',
    industry: 'finance',
    title: 'Navigating millennials to Manulife: digital insurance transformation',
    desc: 'Reimagining insurance onboarding with instant digital policy issuance, interactive risk assessment calculators, and seamless claims UX.',
    image: '/assets/case_manulife.jpg',
    metrics: ['+120% Millennial Leads', '4.8/5 Mobile CSAT', 'Paperless Instant KYC'],
    slug: 'navigating-millennials-to-manulife-a-digital-insurance-transformation',
  },
];

export default function OurWorkPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.industry === filter);

  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40">
      {/* Hero Header */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
        <div className="max-w-4xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-4">
            Our Work
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            <span className="text-[#7ceee0]">Impactful Experiences</span> <br />
            from Strategy to Deployment.
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
            Explore how we partner with global enterprise brands to solve mission-critical commerce challenges through end-to-end integration and technical mastery.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-white/10">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
              filter === 'all'
                ? 'bg-[#7ceee0] text-black'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            All Work
          </button>
          <button
            onClick={() => setFilter('consumer-goods')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
              filter === 'consumer-goods'
                ? 'bg-[#7ceee0] text-black'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Consumer Goods
          </button>
          <button
            onClick={() => setFilter('manufacturing')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
              filter === 'manufacturing'
                ? 'bg-[#7ceee0] text-black'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Manufacturing
          </button>
          <button
            onClick={() => setFilter('finance')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
              filter === 'finance'
                ? 'bg-[#7ceee0] text-black'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Finance & Insurance
          </button>
          <button
            onClick={() => setFilter('electronics')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
              filter === 'electronics'
                ? 'bg-[#7ceee0] text-black'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Electronics
          </button>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-[36px] overflow-hidden bg-[#141718] border border-white/10 hover:border-[#25E2CC]/50 transition-all duration-500 flex flex-col shadow-2xl"
            >
              {/* Image Banner */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141718] via-transparent to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-semibold text-white">
                    {item.client}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#25E2CC] uppercase tracking-wider block mb-2">
                    {item.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white group-hover:text-[#25E2CC] transition-colors leading-snug">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {item.metrics.map((m, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#25E2CC]">
                    Read case study
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#25E2CC] group-hover:text-black transition duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactBlock />
    </div>
  );
}
