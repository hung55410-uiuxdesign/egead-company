'use client';

import { motion, type Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const sparkleIconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const INDUSTRIES = [
  { icon: '/images/smartcommerce/icon_Retail.svg', label: 'Retail' },
  { icon: '/images/smartcommerce/icon_Fashion.svg', label: 'Fashion & Apparel' },
  { icon: '/images/smartcommerce/icon_Consumer.svg', label: 'Consumer Electronics' },
  { icon: '/images/smartcommerce/icon_FnB.svg', label: 'Food and Beverage' },
  { icon: '/images/smartcommerce/icon_TravelnHospitality.svg', label: 'Travel and Hospitality' },
  { icon: '/images/smartcommerce/icon_Health.svg', label: 'Health and Wellness' },
  { icon: '/images/smartcommerce/icon_Automotive.svg', label: 'Automotive' },
  { icon: '/images/smartcommerce/icon_Beauty.svg', label: 'Beauty and Healthcare' },
  { icon: '/images/smartcommerce/icon_HomenGarden.svg', label: 'Home & Garden' },
  { icon: '/images/smartcommerce/icon_Manufacturing.svg', label: 'Manufacturing' },
];

export default function SmartCommerceIndustriesSection() {
  return (
    <motion.section
      className="smart-block2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
          },
        },
      }}
    >
      <motion.div className="smart-block2-icon" variants={sparkleIconVariants}>
        <img src="/images/smartcommerce/icon_sparkle3.png" alt="Sparkle" />
      </motion.div>
      <motion.div className="smart-block2-title" variants={fadeInUp}>
        <p>AI applications</p>
        <p>across major industries</p>
      </motion.div>
      <motion.div className="smart-block2-list" variants={staggerContainer}>
        {INDUSTRIES.map((ind) => (
          <motion.div
            key={ind.label}
            variants={staggerItem}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <img src={ind.icon} alt={ind.label} />
            {ind.label}
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
