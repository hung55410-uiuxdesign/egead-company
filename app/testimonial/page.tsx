import React from 'react';
import Link from 'next/link';
import { Quote } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

export const metadata = {
  title: 'Client Testimonials | SAI Digital',
  description: 'Discover feedback and recommendations from IT Directors, CEOs, and CMOs who transformed their commerce platforms with SAI Digital.',
};

const allTestimonials = [
  {
    quote: "The professionalism shown has impressed me immensely. On behalf of the Suntory management, I'd like to extend our appreciation for the amazing work done by SAI team.",
    role: "IT Manager",
    company: "Suntory PepsiCo",
    avatar: "/assets/portrait-beautiful-young-asian-woman-using-laptop.jpg",
  },
  {
    quote: "SAI Digital's agile methodology matched the speed we were looking for to reinvent our digital presence across Japan and international markets.",
    role: "Chief Executive Officer",
    company: "Edwin Japan",
    avatar: "/assets/2151266584__1_.jpg",
  },
  {
    quote: "We chose SAI Digital for their strategic partnership rather than contractual, their experience with large-scale international projects, and their track record of delivering Commerce Cloud projects successfully.",
    role: "SAP Director, APAC",
    company: "Enterprise Commerce Leader",
    avatar: "/assets/millennial-asia-businessmen-businesswomen-meeting-brainstorming-ideas-about-new-paperwork-project-colleagues-working-together-planning-success-strategy-enjoy-teamwork-small-modern-night-office__1_.jpg",
  },
  {
    quote: "SAI Digital was instrumental in our move to Shopify Plus, their expertise guided us seamlessly across our entire tech stack migration without any lost revenue.",
    role: "Chief Marketing Officer",
    company: "The Dinner Ladies",
    avatar: "/assets/portrait-beautiful-young-asian-woman-using-laptop.jpg",
  },
  {
    quote: "Their deep understanding of multi-currency payments and headless API infrastructure saved our team months of trial and error.",
    role: "Head of Digital Technology",
    company: "Global Retail Brand",
    avatar: "/assets/2151266584__1_.jpg",
  },
  {
    quote: "The 24/7 proactive care team has been indispensable during Black Friday and seasonal flash sale events. Zero unplanned downtime.",
    role: "Operations VP",
    company: "APAC Fashion Group",
    avatar: "/assets/millennial-asia-businessmen-businesswomen-meeting-brainstorming-ideas-about-new-paperwork-project-colleagues-working-together-planning-success-strategy-enjoy-teamwork-small-modern-night-office__1_.jpg",
  },
];

export default function TestimonialPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40">
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="max-w-4xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-4">
            Client Success
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            WHAT OUR <br />
            <span className="text-[#7ceee0]">PARTNERS SAY.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
            From Fortune 500 enterprise giants to hyper-growth digital pioneers, hear directly from the leaders who trust SAI Digital with their mission-critical customer experiences.
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
