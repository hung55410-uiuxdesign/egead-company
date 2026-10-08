'use client';

import { motion, type Variants } from 'framer-motion';
import { COMPATIBLE_PARTNERS } from '../data/smartcommerce-categories.data';

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

export default function SmartCommercePartnersSection() {
  return (
    <section className="logo-slider">
      <motion.p
        className="logo-slider__subtitle"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        Compatible with
      </motion.p>
      <motion.div
        className="logo-slider__list"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {COMPATIBLE_PARTNERS.map((partner) => (
          <motion.div
            key={partner.name}
            className="logo-slider__item"
            variants={staggerItem}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            <img src={partner.src} alt={partner.name} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
