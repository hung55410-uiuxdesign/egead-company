import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Award, Shield, Users, Globe2, Lightbulb, HeartHandshake } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

export const metadata = {
  title: 'Company | SAI Digital: Transform Today, Lead Tomorrow',
  description: 'Learn about SAI Digital history, leadership, engineering culture, and our strategic global footprint as a Concentrix Company.',
};

const values = [
  {
    title: 'Humanity First',
    desc: 'We believe business without humanity is a failure. We put our people, client relationships, and end-user empathy at the heart of every technical decision.',
    icon: HeartHandshake,
  },
  {
    title: 'Engineering Rigor',
    desc: 'We do not build minimum viable compromises. We architect scalable, high-throughput systems with SOC 2 compliance, automated testing, and sub-second performance.',
    icon: Shield,
  },
  {
    title: 'Continuous Velocity',
    desc: 'Agile sprints, rapid prototyping, and modular headless architectures enable our clients to move at startup speed with enterprise resilience.',
    icon: Lightbulb,
  },
  {
    title: 'Global Delivery',
    desc: 'With delivery hubs in Vietnam and regional offices across Japan, Singapore, Australia, Korea, and the US, we provide seamless 24/7 global support.',
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
            About SAI Digital
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            TRANSFORM TODAY, <br />
            <span className="text-[#7ceee0]">LEAD TOMORROW.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
            SAI Digital is an end-to-end digital commerce and customer experience (CX) technology solutions company. We are proud to be a Concentrix Company, scaling enterprise innovation globally.
          </p>
        </div>
      </section>

      {/* Main Banner Image */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24">
        <div className="relative rounded-[36px] overflow-hidden border border-white/10 shadow-2xl">
          <img
            src="/assets/company.png"
            alt="SAI Digital Global Team"
            className="w-full h-auto object-cover max-h-[550px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0E] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 font-mono text-white">
              CONCENTRIX DIGITAL COMMERCE HUB
            </span>
          </div>
        </div>
      </section>

      {/* Numbers & Stats */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 sm:p-12 rounded-[32px] bg-[#141718] border border-white/10 text-center">
          <div>
            <span className="text-4xl sm:text-5xl font-black text-[#7ceee0] font-mono">200+</span>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold uppercase tracking-wider">Specialists & Engineers</p>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-[#7ceee0] font-mono">8</span>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold uppercase tracking-wider">Global Strategic Hubs</p>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-[#7ceee0] font-mono">15+</span>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold uppercase tracking-wider">Years of Excellence</p>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-[#7ceee0] font-mono">150+</span>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold uppercase tracking-wider">Enterprise Deliveries</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-3">
            Our DNA
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white">
            Principles that guide our engineering and partnerships.
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
