'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = {
  position: string;
  department: string;
  locationCountry: string;
  jobType: string;
  salary?: string;
  experience?: string;
};

export default function JobDetailHeader({
  position,
  department,
  locationCountry,
  jobType,
  salary,
  experience,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-10 sm:mb-14"
    >
      <Link
        href="/careers"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition mb-6 group font-medium"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to careers</span>
      </Link>

      <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-slate-900 leading-[1.2] mb-5">
        {position}
      </h1>

      <div className="flex flex-wrap items-center gap-2.5">
        {department && (
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs sm:text-[13px] font-medium border border-slate-200/60">
            {department}
          </span>
        )}
        {locationCountry && (
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs sm:text-[13px] font-medium border border-slate-200/60">
            {locationCountry}
          </span>
        )}
        {jobType && (
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs sm:text-[13px] font-medium border border-slate-200/60">
            {jobType}
          </span>
        )}
        {experience && (
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs sm:text-[13px] font-medium border border-slate-200/60">
            {experience}
          </span>
        )}
        {salary && (
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs sm:text-[13px] font-semibold border border-emerald-200/60">
            {salary}
          </span>
        )}
      </div>
    </motion.div>
  );
}
