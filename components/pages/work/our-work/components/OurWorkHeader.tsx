'use client';

import { motion } from 'framer-motion';

export default function OurWorkHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="ourwork__header--top"
    >
      <span className="subtitle font-montserrat">Our Work</span>
      <div className="title">
        <h1 className="font-montserrat">
          <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-[#E0FCF4] bg-clip-text text-transparent">
            Impactful Experiences
          </span>{' '}
          from <br className="hidden sm:inline" />
          Strategy to Deployment.
        </h1>
      </div>
    </motion.div>
  );
}
