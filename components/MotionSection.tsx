'use client';

import React from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';

export const sectionVariants: Variants = {
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

export const heroVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

interface MotionSectionProps extends HTMLMotionProps<'section'> {
  delay?: number;
  /** Share of the element that must be visible before it animates in. 'some' = any part, so very tall sections still reveal. */
  threshold?: number | 'some' | 'all';
}

export default function MotionSection({
  children,
  className = '',
  delay = 0,
  threshold = 'some',
  ...props
}: MotionSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: '0px 0px -50px 0px' }}
      variants={sectionVariants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function MotionDiv({
  children,
  className = '',
  delay = 0,
  threshold = 'some',
  ...props
}: HTMLMotionProps<'div'> & { delay?: number; threshold?: number | 'some' | 'all' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: '0px 0px -50px 0px' }}
      variants={sectionVariants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionHero({
  children,
  className = '',
  ...props
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={heroVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionCard({
  children,
  className = '',
  index = 0,
  ...props
}: HTMLMotionProps<'div'> & { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, filter: 'blur(2px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.65,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
