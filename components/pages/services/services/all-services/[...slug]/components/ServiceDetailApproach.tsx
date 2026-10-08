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

const CheckIcon = ({
  className = "w-[18px] h-[18px]",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.29173 8.13771L0.5 9.95356L6.46529 16L17.5 4.81586L15.7083 3L6.46529 12.3675L2.29173 8.13771Z"
      fill="#003D5B"
    />
  </svg>
);

export default function ServiceDetailApproach({ service }: Props) {
  return (
    <motion.section
      id="approach"
      className="service-detail__expert w-full bg-white pb-20 sm:pb-32 px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 border-b border-gray-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.12, delayChildren: 0.05 },
        },
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-start">
        {/* Left Column: Heading in #003D5B */}
        <motion.div variants={fadeInUp}>
          <h2 className="service-detail__expert-title text-3xl sm:text-4xl lg:text-[38px] font-semibold text-[#003D5B] font-montserrat">
            {service.approachHeading}
          </h2>
        </motion.div>

        {/* Right Column: Lead Text & Principles List */}
        <div>
          <motion.div
            className="service-detail__expert-content mb-10"
            variants={fadeInUp}
          >
            <p className="text-base sm:text-lg text-[#1c1e24] leading-relaxed font-normal">
              {service.approachIntro}
            </p>
          </motion.div>

          <div className="space-y-10 sm:space-y-12">
            {service.principles.map((p, idx) => (
              <motion.div
                key={idx}
                className="service-detail__expert-item group"
                variants={fadeInUp}
              >
                <div className="service-detail__expert-item-title flex items-center gap-3.5 text-xl sm:text-2xl font-semibold text-[#003D5B] mb-3">
                  <CheckIcon className="w-5 h-5 shrink-0" />
                  <h3 className="font-montserrat">{p.title}</h3>
                </div>
                <div className="service-detail__expert-content">
                  <p className="text-base sm:text-lg text-[#1c1e24]/85 leading-relaxed pl-8 font-normal">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
