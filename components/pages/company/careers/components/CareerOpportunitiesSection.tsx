'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { JobOpening } from '@/lib/careers';

interface CareerOpportunitiesSectionProps {
  jobs?: JobOpening[];
}

export default function CareerOpportunitiesSection({
  jobs = [],
}: CareerOpportunitiesSectionProps) {
  return (
    <section className="w-full py-16 sm:py-24" id="opportunities">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-slate-900">
            Career Opportunities
          </h2>
        </motion.div>

        {jobs.length === 0 ? (
          <div className="text-center py-12 px-6 rounded-2xl sm:rounded-[24px] bg-slate-50 border border-slate-100 max-w-xl mx-auto">
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Hiện tại chưa có vị trí ứng tuyển mới. Vui lòng quay lại sau hoặc liên hệ bộ phận tuyển dụng qua email.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {jobs.map((job, idx) => (
              <motion.div
                key={job.id || job.slug || idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.3) }}
              >
                <Link
                  href={`/careers/${job.slug}`}
                  className="group w-full bg-white rounded-2xl sm:rounded-[20px] px-6 py-5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-slate-200 transition-all duration-200 flex items-center justify-between gap-4 block"
                >
                  <span className="text-sm sm:text-[15px] font-semibold text-slate-800 group-hover:text-slate-900 transition">
                    {job.position}
                  </span>

                  <span className="text-xs sm:text-sm font-medium text-slate-500 group-hover:text-slate-900 underline underline-offset-4 decoration-slate-300 group-hover:decoration-slate-900 transition shrink-0">
                    Apply now
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
