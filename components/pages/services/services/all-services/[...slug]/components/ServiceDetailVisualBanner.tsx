"use client";

import { motion } from "framer-motion";

type Props = {
  imageSrc: string;
  title: string;
};

export default function ServiceDetailVisualBanner({ imageSrc, title }: Props) {
  if (!imageSrc) return null;

  return (
    <motion.section
      className="w-full bg-white pb-16 sm:pb-24 px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20"
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="service-detail__img w-full h-[480px] sm:h-[620px] md:h-[720px] lg:h-[820px] xl:h-[880px] rounded-[24px] overflow-hidden shadow-2xl border border-gray-100 relative">
        <img
          src={imageSrc}
          alt={`${title} Operational Infrastructure`}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </motion.section>
  );
}

