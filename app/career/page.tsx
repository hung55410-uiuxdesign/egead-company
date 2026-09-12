import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Briefcase, Users, HeartHandshake } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

export const metadata = {
  title: 'Careers at SAI Digital | A Concentrix Company',
  description: 'Join a world-class team of engineers, architects, and commerce strategists delivering intelligent enterprise experiences.',
};

const jobs = [
  {
    title: 'Senior Next.js & React Frontend Architect',
    location: 'Ho Chi Minh City, Vietnam (Hybrid)',
    type: 'Full-time',
    department: 'Engineering',
  },
  {
    title: 'SAP Commerce Cloud Lead Solution Architect',
    location: 'Singapore / Remote APAC',
    type: 'Full-time',
    department: 'Enterprise Architecture',
  },
  {
    title: 'AI & Data Science Lead (Demand Forecasting)',
    location: 'Hanoi / Ho Chi Minh City, Vietnam',
    type: 'Full-time',
    department: 'Data & Analytics',
  },
  {
    title: 'Principal Composable Commerce Consultant',
    location: 'Sydney, Australia',
    type: 'Full-time',
    department: 'Strategy & Consulting',
  },
  {
    title: '24/7 Site Reliability Engineer (SRE)',
    location: 'Ho Chi Minh City, Vietnam',
    type: 'Full-time',
    department: 'Operations',
  },
];

export default function CareerPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40">
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="max-w-4xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-4">
            Join Our Global Team
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            BUILD THE FUTURE OF <br />
            <span className="text-[#7ceee0]">DIGITAL COMMERCE.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
            We are looking for ambitious engineers, visionary designers, and relentless problem-solvers to craft intelligent commerce experiences for the world's most influential brands.
          </p>
        </div>
      </section>

      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
          Current Open Positions
        </h2>

        <div className="space-y-4">
          {jobs.map((j, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#141718] border border-white/10 hover:border-[#7ceee0]/50 transition duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div>
                <span className="text-xs font-mono text-[#7ceee0] uppercase tracking-wider block mb-1">
                  {j.department} · {j.type}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{j.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-[#7ceee0]" />
                  <span>{j.location}</span>
                </div>
              </div>

              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7ceee0] hover:bg-[#68d8ca] text-black font-semibold text-xs transition duration-300 self-start sm:self-center"
              >
                <span>Apply Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <ContactBlock />
    </div>
  );
}
