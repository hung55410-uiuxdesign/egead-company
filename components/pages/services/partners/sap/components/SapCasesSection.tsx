'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SAP_CASE_STUDIES } from '../data/sap-partner.data';
import type { SapCaseStudyItem } from '../types';

function CaseCard({ study, index }: { study: SapCaseStudyItem; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="w-full"
    >
      <Link
        href={`/case-studies/${study.slug}`}
        className="ourwork__item group block"
      >
        {/* Media Container - No cropping (ảnh không bị cắt) */}
        <div className="relative w-full rounded-[20px] overflow-hidden bg-[#141718] border border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.6)] group-hover:shadow-[0_20px_45px_rgba(124,238,224,0.18)] transition-all duration-500 flex items-center justify-center">
          <img
            src={imgError ? '/images/services/Top_Automotive.jpg' : study.image}
            alt={study.title}
            className="w-full h-auto object-contain group-hover:scale-102 transition-transform duration-500 block"
            onError={() => setImgError(true)}
          />
        </div>

        {/* Info Block */}
        <div className="info mt-5 space-y-3">
          {/* Tags */}
          <div className="tag flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="tag--item px-3 py-1 rounded bg-[#1c1e24] border border-[#414348] text-[11px] font-normal text-[#b3b3b3]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Customer / Title */}
          <h3 className="title text-xl sm:text-2xl font-medium text-white group-hover:text-[#7ceee0] transition-colors duration-300 font-montserrat leading-snug">
            {study.title}
          </h3>

          <p className="customer text-sm text-[#8c8c8c] font-light font-montserrat">
            {study.customer}
          </p>

          <div className="inline-flex items-center gap-2 text-sm text-[#10E774] font-medium pt-2 group-hover:gap-3 transition-all duration-300 font-montserrat">
            <span>Read case study</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function SapCasesSection() {
  return (
    <section
      id="cases"
      aria-label="SAP Partner Case Studies"
      className="service-detail__case w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 border-t border-white/5 relative"
    >
      <div className="max-w-[1560px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm sm:text-base font-normal text-[#D4FAE6] mb-3 font-montserrat"
            >
              Proven outcomes
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="service-detail__case-title text-3xl sm:text-4xl lg:text-[46px] font-medium text-white font-montserrat"
            >
              Read our cases
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/our-work"
              className="group inline-flex items-center gap-2 text-sm sm:text-base text-[#b3b3b3] hover:text-white transition-colors font-montserrat"
            >
              <span>View all cases</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* 2-Column Cases Grid */}
        <div className="ourwork__body grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 p-0">
          {SAP_CASE_STUDIES.map((study, idx) => (
            <CaseCard key={study.id} study={study} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
