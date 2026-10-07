'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import HeroBanner from '@/components/HeroBanner';
import ServicesSection from '@/components/ServicesSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import SmartCXSection from '@/components/SmartCXSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import InsightsSection from '@/components/InsightsSection';
import CultureSection from '@/components/CultureSection';
import ContactBlock from '@/components/ContactBlock';

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroBanner />
      </motion.div>

      {/* 2. Services Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <ServicesSection />
      </motion.div>

      {/* 3. Case Studies Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <CaseStudiesSection />
      </motion.div>

      {/* 4. SmartCX Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <SmartCXSection />
      </motion.div>

      {/* 5. Testimonials Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <TestimonialsSection />
      </motion.div>

      {/* 6. Insights Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <InsightsSection />
      </motion.div>

      {/* 7. Culture Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <CultureSection />
      </motion.div>

      {/* 8. Contact Block CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <ContactBlock />
      </motion.div>
    </div>
  );
}
