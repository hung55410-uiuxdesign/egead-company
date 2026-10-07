import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';
import MotionSection, { MotionHero, MotionDiv, MotionCard } from '@/components/MotionSection';

export const metadata = {
  title: 'Careers at E-GEAD | Build the Future of Global Commerce',
  description: 'Join E-GEAD in Buon Ma Thuot, Vietnam or Remote. Shape the next generation of e-commerce automation, POD fulfillment, and performance advertising.',
};

const jobs = [
  {
    title: 'Senior Next.js & Fullstack Engineer',
    location: 'Buon Ma Thuot, Dak Lak (Hybrid / Remote)',
    type: 'Full-time',
    department: 'Engineering',
  },
  {
    title: 'US POD Operations & Order Specialist (US Shift)',
    location: 'Buon Ma Thuot, Dak Lak',
    type: 'Full-time',
    department: 'Operations & Fulfillment',
  },
  {
    title: 'Performance Digital Media Buyer (TikTok / Meta Ads)',
    location: 'Buon Ma Thuot / Remote',
    type: 'Full-time',
    department: 'Growth Marketing',
  },
  {
    title: 'WMS & Open API Systems Integration Engineer',
    location: 'Buon Ma Thuot / Remote',
    type: 'Full-time',
    department: 'Software Architecture',
  },
  {
    title: 'Global E-Commerce Account Manager',
    location: 'Buon Ma Thuot, Dak Lak',
    type: 'Full-time',
    department: 'Client Success',
  },
];

export default function CareerPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40 overflow-hidden">
      <MotionHero className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="w-full">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
            Join Our Team
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-medium leading-[1.08] text-[#D4FAE6] font-montserrat mb-6">
            Build the Future of <br />
            <span className="bg-gradient-to-r from-[#5EFC8D] via-[#10E774] to-[#7ceee0] bg-clip-text text-transparent font-medium">
              Global Commerce.
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-3xl">
            We are looking for passionate software engineers, operations specialists, and performance media buyers to scale intelligent automation for thousands of global merchants.
          </p>
        </div>
      </MotionHero>

      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28">
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] mb-8 font-montserrat">
          Current Open Positions
        </h2>

        <div className="space-y-4">
          {jobs.map((j, idx) => (
            <MotionCard
              key={idx}
              index={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#141718] border border-white/10 hover:border-[#5EFC8D]/50 transition duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl hover:shadow-[0_16px_36px_rgba(94,252,141,0.12)]"
            >
              <div>
                <span className="text-xs text-[#5EFC8D] block mb-1 font-normal font-montserrat">
                  {j.department} · {j.type}
                </span>
                <h3 className="text-xl sm:text-2xl font-medium text-[#D4FAE6] mb-2 font-montserrat">{j.title}</h3>
                <div className="flex items-center gap-2 text-xs text-[#b3b3b3] font-light font-montserrat">
                  <MapPin className="w-3.5 h-3.5 text-[#5EFC8D]" />
                  <span>{j.location}</span>
                </div>
              </div>

              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5EFC8D] hover:bg-[#4ee37e] text-black font-semibold text-sm transition duration-300 self-start sm:self-center group"
              >
                <span>Apply Now</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </MotionCard>
          ))}
        </div>
      </MotionSection>

      <MotionDiv threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </div>
  );
}
