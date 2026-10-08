'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionLink = motion.create(Link);

export default function SmartPriceHeroSection() {
  return (
    <div className="service-detail__header">
      <div className="smartprice-hero__container">
        <div className="smartprice-hero__row">
          {/* Left Column: Title, Subtitle, Intro & CTA Button */}
          <div className="smartprice-hero__left">
            <motion.h1
              className="smartprice-hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              SMARTPRICE
            </motion.h1>
            <motion.h2
              className="smartprice-hero__heading"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Maximize profits on pre-owned products.
            </motion.h2>
            <motion.p
              className="smartprice-hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Catalyzer SmartPrice uses real-time intelligence to help enterprise businesses standardize their pricing for pre-owned products.
            </motion.p>
            <motion.div
              className="smartprice-hero__cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <MotionLink
                className="smartprice-hero__btn"
                href="/contact-us"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="smartprice-hero__btn-icon"
                >
                  <path
                    d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Schedule Demo</span>
              </MotionLink>
            </motion.div>
          </div>

          {/* Right Column: Dual-Phone Mockups */}
          <motion.div
            className="smartprice-hero__right"
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/assets/smartprice/Top.png"
              alt="SmartPrice Mobile App Mockup"
              className="smartprice-hero__mockup"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>

      {/* Glowing Ambient Aura & Video Background */}
      <motion.div
        className="smartprice-hero__ambient-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <video
        src="/assets/smartprice/SmartPrice_BG.mp4"
        className="smartprice-hero__video"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
