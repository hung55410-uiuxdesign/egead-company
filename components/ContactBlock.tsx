'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface ContactBlockProps {
  title?: string;
  buttonText?: string;
  buttonHref?: string;
  section?: any;
}

export default function ContactBlock({
  title: propTitle,
  buttonText: propButtonText,
  buttonHref: propButtonHref,
  section,
}: ContactBlockProps = {}) {
  const data = (section?.data || {}) as any;
  const title = propTitle || section?.title || "Let's automate your\ne-commerce operations.";
  const buttonText = propButtonText || data.buttonText || 'Get Free Consultation';
  const buttonHref = propButtonHref || data.buttonHref || '/contact-us';

  const titleLines = typeof title === 'string' ? title.split('\n') : [title];

  return (
    <section className="contact-block relative w-full py-24 sm:py-32 lg:py-36 bg-[#0A0D0E] text-white overflow-hidden text-center">
      {/* FULL WIDTH CENTERED BLOCK matching live site */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl lg:text-[68px] font-medium leading-[1.18] tracking-tight font-montserrat max-w-5xl"
        >
          <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
            {titleLines.map((line: string, i: number) => (
              <React.Fragment key={i}>
                {i > 0 && <br className="hidden sm:inline" />}
                {line}
              </React.Fragment>
            ))}
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 sm:mt-12 relative inline-flex items-center justify-center"
        >
          <motion.div
            className="rounded-full inline-flex"
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Link
              href={buttonHref}
              className="group relative inline-flex items-center gap-2.5 bg-[#10E774] hover:bg-[#5EFC8D] text-[#003D5B] font-semibold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(16,231,116,0.35)] hover:shadow-[0_0_45px_rgba(94,252,141,0.7)]"
            >
              <span>{buttonText}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#003D5B] transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>

  );
}
