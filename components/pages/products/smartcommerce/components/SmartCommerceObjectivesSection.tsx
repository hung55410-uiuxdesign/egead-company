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
      staggerChildren: 0.08,
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

export default function SmartCommerceObjectivesSection() {
  return (
    <motion.section
      className="smart-block1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
          },
        },
      }}
    >
      <motion.div className="smart-block1-icon" variants={sparkleIconVariants}>
        <img src="/images/smartcommerce/icon_sparkle3.png" alt="Sparkle" />
      </motion.div>
      <motion.div className="smart-block1-title" variants={fadeInUp}>
        <span className="smart-block1-title-gradient">30+ AI modules</span>
        <span>strategically designed to</span>
      </motion.div>
      <motion.div className="smart-block1-list" variants={staggerContainer}>
        <motion.div
          variants={staggerItem}
          whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
        >
          accelerate growth
          <img src="/images/smartcommerce/icon_Growth.svg" alt="Growth" />
        </motion.div>
        <motion.div
          variants={staggerItem}
          whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
        >
          boost efficiency
          <img src="/images/smartcommerce/icon_Efficiency.svg" alt="Efficiency" />
        </motion.div>
        <motion.div
          variants={staggerItem}
          whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
        >
          &amp; transform
          <img src="/images/smartcommerce/icon_Transform.svg" alt="Transform" />
        </motion.div>
      </motion.div>
      <motion.div className="smart-block1-desc" variants={fadeInUp}>
        every facet of your enterprise digital commerce ecosystem.
      </motion.div>
    </motion.section>
  );
}
