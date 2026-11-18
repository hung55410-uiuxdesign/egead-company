'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { JobOpening } from '@/lib/careers';

interface JobDetailRelatedProps {
  relatedJobs: JobOpening[];
}

export default function JobDetailRelated({ relatedJobs }: JobDetailRelatedProps) {
  if (!relatedJobs || relatedJobs.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-20">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Các vị trí khác đang mở
        </h2>
        <Link
          href="/careers#opportunities"
          className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition inline-flex items-center gap-1"
        >
          <span>Xem tất cả vị trí</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {relatedJobs.map((r, idx) => (
          <motion.div
            key={r.slug || idx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <Link
              href={`/careers/${r.slug}`}
              className="group w-full h-full bg-white rounded-2xl sm:rounded-[20px] p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-slate-200 transition-all duration-200 flex flex-col justify-between gap-4 block"
            >
              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-500 block">
                  {r.department} • {r.location}
                </span>
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-slate-700 transition leading-snug">
                  {r.position}
                </h3>
              </div>

              <div className="pt-3 border-t border-slate-100/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-normal">
                  {r.jobType}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-500 group-hover:text-slate-900 underline underline-offset-4 decoration-slate-300 group-hover:decoration-slate-900 transition shrink-0">
                  Apply now
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
