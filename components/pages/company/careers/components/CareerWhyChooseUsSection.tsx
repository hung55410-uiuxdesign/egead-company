'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { CareersWhyChooseUsData } from '@/lib/services/careers-page-config.service';

interface CareerWhyChooseUsSectionProps {
  config?: CareersWhyChooseUsData;
}

function BenefitsIcon() {
  return (
    <div className="w-12 h-12 rounded-full bg-[#189B8C] text-white flex items-center justify-center mb-6 shadow-xs">
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 7a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2c0 2-1 4-1 8a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4c0-4-1-6-1-8Z" />
        <path d="M9 5h6" />
        <path d="M12 10v4" />
        <path d="M10.5 11.5h3" />
        <path d="M10.5 13h3" />
      </svg>
    </div>
  );
}

function LearningIcon() {
  return (
    <div className="w-12 h-12 rounded-full bg-[#189B8C] text-white flex items-center justify-center mb-6 shadow-xs">
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="12" x="3" y="3" rx="2" />
        <path d="m7 11 3-3 3 2 4-4" />
        <path d="M9 19l-2 3" />
        <path d="M15 19l2 3" />
        <path d="M12 15v4" />
      </svg>
    </div>
  );
}

function EnvironmentIcon() {
  return (
    <div className="w-12 h-12 rounded-full bg-[#189B8C] text-white flex items-center justify-center mb-6 shadow-xs">
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a14.5 14.5 0 0 1 4 9 14.5 14.5 0 0 1-4 9 14.5 14.5 0 0 1-4-9 14.5 14.5 0 0 1 4-9z" />
        <path d="M3 12h18" />
      </svg>
    </div>
  );
}

const DEFAULT_TITLE = 'Why choose us?';
const DEFAULT_BENEFITS = {
  title: 'Great benefits',
  items: [
    'Bonus policy according to seniority',
    'Health insurance and social insurance as prescribed',
    'Lunch allowance',
    'Snacks and coffee are provided daily',
    'Profesional equipment are provided',
    'Frequent team building, annual vacation',
  ],
};
const DEFAULT_LEARNING = {
  title: 'Learning and self-improvement',
  items: [
    'Encouraged to align with personal, team, and company goals.',
    'Receive expert training to boost skills and critical thinking on the job.',
    'Learn new technologies and solve complex e-commerce problems.',
  ],
};
const DEFAULT_ENVIRONMENT = {
  title: 'Open working environment',
  items: [
    'Flexible working time, from Monday to Friday',
    'Leave days: 12 days/year',
    'Holidays, New Year according to regulations',
    'Working with a creative and enthusiastic team, ready to make breakthroughs.',
  ],
};

export default function CareerWhyChooseUsSection({
  config,
}: CareerWhyChooseUsSectionProps) {
  const title = config?.title || DEFAULT_TITLE;
  const benefits = config?.benefits || DEFAULT_BENEFITS;
  const learning = config?.learning || DEFAULT_LEARNING;
  const environment = config?.environment || DEFAULT_ENVIRONMENT;

  return (
    <section className="w-full py-12 sm:py-20" id="why-choose-us">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Soft Warm Cream Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FAF6EE] rounded-[32px] sm:rounded-[44px] p-8 sm:p-12 lg:p-16 border border-[#F2ECE0]"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-slate-900 text-center mb-12 sm:mb-16">
            {title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {/* 1. Great benefits */}
            <div className="space-y-4">
              <BenefitsIcon />
              <h3 className="text-lg font-bold text-slate-900">
                {benefits.title}
              </h3>
              <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700 leading-relaxed list-disc pl-4">
                {benefits.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* 2. Learning and self-improvement */}
            <div className="space-y-4">
              <LearningIcon />
              <h3 className="text-lg font-bold text-slate-900">
                {learning.title}
              </h3>
              <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700 leading-relaxed list-disc pl-4">
                {learning.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* 3. Open working environment */}
            <div className="space-y-4">
              <EnvironmentIcon />
              <h3 className="text-lg font-bold text-slate-900">
                {environment.title}
              </h3>
              <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700 leading-relaxed list-disc pl-4">
                {environment.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
