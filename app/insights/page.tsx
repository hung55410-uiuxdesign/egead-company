import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

export const metadata = {
  title: 'Insights & News | SAI Digital',
  description: 'Latest articles, architecture guides, webinars, and enterprise commerce trends from SAI Digital experts.',
};

const allInsights = [
  {
    slug: 'Concentrix-Acquires-SAI-Digital',
    title: 'Concentrix Acquires SAI Digital to Supercharge its Digital Commerce and Customer Experience Tech Solutions',
    tag: 'Announcement',
    date: 'September 09, 2025',
    readTime: '5 mins read',
    image: '/assets/SAI_x_CNX_Announcement_Blog__1_.png',
    desc: 'Concentrix Corporation today announced its strategic acquisition of SAI Digital, scaling its presence in Vietnam as an engineering innovation hub.',
  },
  {
    slug: 'how-to-use-MACH-architecture-in-eCommerce',
    title: 'How to use MACH architecture in eCommerce to scale global operations',
    tag: 'Technology',
    date: 'August 15, 2025',
    readTime: '7 mins read',
    image: '/assets/image-20250416171203-2.jpeg',
    desc: 'A comprehensive architectural guide to decoupling your frontend and adopting microservices, APIs, and cloud-native headless commerce.',
  },
];

export default function InsightsPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40">
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="max-w-4xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-4">
            Thought Leadership
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            INSIGHTS, TRENDS & <br />
            <span className="text-[#7ceee0]">ENGINEERING NEWS.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
            Stay ahead of global consumer behavior, AI-driven operations, composable architectures, and enterprise digital strategy.
          </p>
        </div>
      </section>

      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {allInsights.map((item) => (
            <Link
              key={item.slug}
              href={`/articles/${item.slug}`}
              className="group rounded-[36px] overflow-hidden bg-[#141718] border border-white/10 hover:border-[#7ceee0]/50 transition-all duration-300 flex flex-col shadow-2xl hover:-translate-y-1.5"
            >
              <div className="relative h-72 w-full overflow-hidden bg-[#0A0D0E]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 rounded-full bg-[#7ceee0] text-black font-bold text-xs">
                    {item.tag}
                  </span>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#7ceee0]" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#7ceee0]" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-[#7ceee0] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7ceee0]">
                    Read full article
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#7ceee0] group-hover:text-black transition duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ContactBlock />
    </div>
  );
}
