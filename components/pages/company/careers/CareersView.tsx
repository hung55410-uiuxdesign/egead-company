'use client';

import React from 'react';
import type { JobOpening } from '@/lib/careers';
import type { CareersPageConfigData } from '@/lib/services/careers-page-config.service';
import CareerHeroSection from './components/CareerHeroSection';
import CareerAboutSection from './components/CareerAboutSection';
import CareerOpportunitiesSection from './components/CareerOpportunitiesSection';
import CareerVideoSection from './components/CareerVideoSection';
import CareerWhyChooseUsSection from './components/CareerWhyChooseUsSection';
import CareerOfficesSection from './components/CareerOfficesSection';

interface CareersViewProps {
  jobs: JobOpening[];
  config?: CareersPageConfigData;
}

export default function CareersView({ jobs, config }: CareersViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 min-h-screen relative selection:bg-slate-900 selection:text-white">
      {/* Top subtle dark gradient shield so fixed white header navigation remains crisp before scrolling */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-28 sm:h-32 bg-gradient-to-b from-[#0A0D0E]/85 via-[#0A0D0E]/45 to-transparent pointer-events-none z-40 transition-opacity duration-300"
      />

      {/* Main Page Content */}
      <main className="w-full pt-24 sm:pt-32 pb-16">
        {/* 1. Hero Team Banner & Headline */}
        <CareerHeroSection config={config?.hero} />

        {/* 2. About The Human Inc & Culture Spotlight */}
        <CareerAboutSection config={config?.about} />

        {/* 3. Career Opportunities (2-column job cards) */}
        <CareerOpportunitiesSection jobs={jobs} />

        {/* Video giới thiệu ở giữa (Hiển thị nếu admin cấu hình video, ẩn nếu không gắn) */}
        {config?.video?.videoUrl && (
          <CareerVideoSection config={config.video} />
        )}

        {/* 4. Why Choose Us? (Warm cream card with benefits) */}
        <CareerWhyChooseUsSection config={config?.whyChooseUs} />

        {/* 5. Global Offices (Singapore, HongKong, Hanoi) */}
        <CareerOfficesSection offices={config?.offices} />
      </main>
    </div>
  );
}
