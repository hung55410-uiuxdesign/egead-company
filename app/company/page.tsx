import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Award, Shield, Users, Globe2, Lightbulb, HeartHandshake } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

export const metadata = {
  title: 'About Us | E-GEAD: More Than An Operations Partner',
  description: 'E-GEAD is based in Buon Ma Thuot, Vietnam, empowering cross-border e-commerce brands across 10+ countries with US POD fulfillment in under 24 hours, WMS automation, and global sales scaling.',
};

const values = [
  {
    title: 'Automation-First Ecosystem',
    desc: 'We believe automation is critical to modern e-commerce. From AI address normalization and real-time multi-channel sync to barcode WMS order routing, E-GEAD eliminates 99% of manual fulfillment errors.',
    icon: Lightbulb,
  },
  {
    title: 'Sub-24H Fulfillment SLA',
    desc: 'Speed is our defining advantage. Industrial 23-inch large-format printing in the US enables us to complete and dispatch orders in under 24 hours, safeguarding 100% compliance with strict TikTok Shop US, Amazon, and Etsy SLAs.',
    icon: Shield,
  },
  {
    title: 'Absolute Financial Transparency',
    desc: 'Sustainable growth is built on trust. E-GEAD guarantees all-in unit pricing from $6 with zero hidden fees, real-time landed cost calculators, and automated net profit reconciliation.',
    icon: HeartHandshake,
  },
  {
    title: 'Global Scale with Local Dedication',
    desc: 'Founded and engineered by a passionate technology team in Buon Ma Thuot, Vietnam, alongside an extensive US fulfillment network, we bring Vietnamese engineering excellence to thousands of global sellers.',
    icon: Globe2,
  },
];

export default function CompanyPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40">
      {/* Hero Header */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="max-w-4xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-4">
            About E-GEAD
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            MORE THAN AN OPERATIONS PARTNER, <br />
            <span className="text-[#7ceee0]">DRIVING GLOBAL SCALE.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
            E-GEAD is an all-in-one logistics, automation technology, and digital growth platform based in Buon Ma Thuot, Vietnam. We empower e-commerce brands and cross-border sellers across 10+ countries to automate workflows, fulfill US print-on-demand orders in under 24 hours, and sustainably expand into global marketplaces.
          </p>
        </div>
      </section>

      {/* Main Banner Image */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24">
        <div className="relative rounded-[36px] overflow-hidden border border-white/10 shadow-2xl">
          <img
            src="/assets/company.png"
            alt="E-GEAD Operations & Engineering Hub"
            className="w-full h-auto object-cover max-h-[550px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0E] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 font-mono text-white">
              BUON MA THUOT HQ & US FULFILLMENT NETWORK
            </span>
          </div>
        </div>
      </section>

      {/* Numbers & Stats */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 sm:p-12 rounded-[32px] bg-[#141718] border border-white/10 text-center">
          <div>
            <span className="text-4xl sm:text-5xl font-black text-[#7ceee0] font-mono">100+</span>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold uppercase tracking-wider">Projects Delivered</p>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-[#7ceee0] font-mono">20+</span>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold uppercase tracking-wider">Global Business Partners</p>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-[#7ceee0] font-mono">10+</span>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold uppercase tracking-wider">Countries Reached</p>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-[#7ceee0] font-mono">99%</span>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold uppercase tracking-wider">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-3">
            Our DNA & Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white">
            Principles that power our automation and global fulfillment.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-8 sm:p-10 rounded-[28px] bg-[#141718] border border-white/10 hover:border-[#7ceee0]/40 transition duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#7ceee0]/10 border border-[#7ceee0]/20 flex items-center justify-center mb-6 text-[#7ceee0]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <ContactBlock />
    </div>
  );
}
