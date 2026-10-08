"use client";

import { motion, type Variants } from "framer-motion";
import type { ServiceDetailItem } from "@/data/services-data";

type Props = {
  service: ServiceDetailItem;
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ServiceDetailOverview({ service }: Props) {
  return (
    <motion.section
      id="intro"
      className="service-detail__content w-full bg-white text-gray-900 py-16 sm:py-24 px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.05 },
        },
      }}
    >
      <div className="service-detail__intro-content type-2 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-start">
        {/* Left Column: Leading Bold Heading in #003D5B */}
        <motion.div variants={fadeInUp}>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#003D5B] leading-[1.3] font-montserrat">
            {service.overviewHeading}
          </h2>
        </motion.div>

        {/* Right Column: Narrative Paragraphs */}
        <motion.div
          className="space-y-6 text-base sm:text-lg text-[#1c1e24] leading-relaxed font-normal"
          variants={fadeInUp}
        >
          {service.overviewParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
