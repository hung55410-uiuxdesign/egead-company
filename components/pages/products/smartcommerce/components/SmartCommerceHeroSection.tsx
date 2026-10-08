'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionLink = motion.create(Link);

const SaiArrow = ({ className = 'w-[19px] h-[18px]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
      fill="currentColor"
    />
  </svg>
);

const SparkleStar = () => (
  <svg
    className="smart-title-spec-icon"
    viewBox="0 0 36 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28.7182 16.5C21.368 19.9784 18.5686 22.7955 15.112 30.1922C11.6555 22.7955 8.85609 19.9784 1.50586 16.5C8.85609 13.0216 11.6555 10.2045 15.112 2.80786C18.5686 10.2045 21.368 13.0216 28.7182 16.5Z"
      fill="#003D5B"
    />
  </svg>
);

export default function SmartCommerceHeroSection() {
  return (
    <section className="smartcommerce-area">
      <div className="smart-inner">
        <motion.div
          className="smart-logo"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/images/smartcommerce/Logo_SmartCommerce.png"
            alt="SmartCommerce Logo"
          />
        </motion.div>
        <motion.div
          className="smart-title"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="smart-title-row1">
            <span className="smart-title-spec">
              <SparkleStar />
              AI Accelerator
            </span>
            for
          </div>
          <div className="smart-title-row2">Enterprise Commerce.</div>
        </motion.div>
        <motion.p
          className="smart-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Shift from transactional to intelligent commerce, faster.
        </motion.p>
        <MotionLink
          href="/contact-us"
          className="smart-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <SaiArrow />
          Schedule demo
        </MotionLink>
      </div>

      {/* Glowing Ambient Aura & Video Background */}
      <motion.div
        className="smart-hero__ambient-glow loyalty-hero__ambient-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />
      <video
        src="/assets/loyalty/loyalty-bg03.mp4"
        className="smart-hero__video loyalty-hero__video"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="smart-bkg">
        <img
          src="/images/smartcommerce/BG_01.jpg"
          alt="Hero background graphic"
        />
      </div>
    </section>
  );
}
