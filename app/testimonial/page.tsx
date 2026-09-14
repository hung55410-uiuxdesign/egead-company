import React from 'react';
import Link from 'next/link';
import { Quote } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

export const metadata = {
  title: 'Client Testimonials | E-GEAD Company',
  description: 'Read reviews and success stories from global e-commerce founders, brand owners, and operations directors who scale with E-GEAD.',
};

const allTestimonials = [
  {
    quote: "The sub-24h fulfillment speed in the US has been a total lifesaver for our TikTok Shop US store. Since partnering with E-GEAD, our Late Dispatch Rate has remained at 0%, and our store achieved sustained Top Seller status.",
    role: "Founder & Creative Director",
    company: "UrbanVibe Apparel (US)",
    avatar: "/assets/portrait-beautiful-young-asian-woman-using-laptop.jpg",
  },
  {
    quote: "Managing simultaneous listings across Amazon and Etsy used to require hours of manual data entry daily. Eweb-platform automated our multi-channel sync, cutting admin labor by 85% and completely eliminating out-of-stock cancellations.",
    role: "E-Commerce Director",
    company: "HomeCraft Studio (UK)",
    avatar: "/assets/2151266584__1_.jpg",
  },
  {
    quote: "The transparent $6 all-in pricing has zero hidden fees. Having predictable unit economics and automated net margin calculation lets us know our exact profit before deploying paid advertising budget.",
    role: "Chief Operating Officer",
    company: "Lumina DTC Brand (Australia)",
    avatar: "/assets/millennial-asia-businessmen-businesswomen-meeting-brainstorming-ideas-about-new-paperwork-project-colleagues-working-together-planning-success-strategy-enjoy-teamwork-small-modern-night-office__1_.jpg",
  },
  {
    quote: "The 23-inch large-format print quality is exceptionally sharp, colors stay vibrant after repeated washings, and garment breathability is fantastic. Our US customers frequently praise the print longevity in 5-star reviews.",
    role: "Merchandise Lead",
    company: "Pacific Graphic Tees (California, US)",
    avatar: "/assets/portrait-beautiful-young-asian-woman-using-laptop.jpg",
  },
  {
    quote: "E-GEAD's RESTful API documentation is clean, modern, and reliable. Their engineering team supported our proprietary ERP integration seamlessly in less than 3 business days.",
    role: "Lead Systems Architect",
    company: "PrintWave Global Network",
    avatar: "/assets/2151266584__1_.jpg",
  },
  {
    quote: "The TikTok and Meta Ads performance marketing team helped us scale our blended ROAS from 2.1x to 4.8x. Our Q4 holiday revenue grew over 180% year-over-year.",
    role: "Head of Digital Marketing",
    company: "TrendWave Commerce (Vietnam)",
    avatar: "/assets/millennial-asia-businessmen-businesswomen-meeting-brainstorming-ideas-about-new-paperwork-project-colleagues-working-together-planning-success-strategy-enjoy-teamwork-small-modern-night-office__1_.jpg",
  },
];

export default function TestimonialPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40">
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="max-w-4xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-4">
            Client Success & Reviews
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            WHAT OUR <br />
            <span className="text-[#7ceee0]">PARTNERS SAY.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
            From high-growth DTC apparel brands to high-volume marketplace sellers, discover how E-GEAD automates fulfillment, protects SLAs, and drives global e-commerce scale.
          </p>
        </div>
      </section>

      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#7ceee0]/40 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#7ceee0] opacity-60 mb-6" />
                <p className="text-base text-gray-200 leading-relaxed italic mb-8">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0 border border-white/20">
                  <img src={t.avatar} alt={t.role} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.role}</h4>
                  <p className="text-xs text-[#7ceee0] mt-0.5">{t.company}</p>
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
