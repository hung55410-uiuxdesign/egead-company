"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type TestimonialItem = {
  id: string;
  quote: string;
  name: string;
  subtitle: string;
  avatar: string;
  partnerLogo: string;
};

export interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  items?: TestimonialItem[];
  ratingImage?: string;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "shinosuke",
    quote:
      "The AI market intelligence platform continuously aggregates and analyzes consumer behavior across leading e-commerce marketplaces (Amazon, Etsy, eBay, TikTok Shop). Trends delivers pinpoint forecasts on high-potential product niches, automatically recommends real-time POD design ideas, and optimizes SEO listings to help sellers stay ahead of demand and scale revenue effortlessly.",
    name: "Shinosuke",
    subtitle: "In-depth resources to help you",
    avatar: "/assets/avatar_shinosuke.jpg",
    partnerLogo: "/assets/partners-short/01.svg",
  },
  {
    id: "urbanvibe",
    quote:
      "Migrating our DTF printing and fulfillment operations to E-GEAD was the ultimate turning point for our brand. Sub-24h turnaround times and a 0.18% late dispatch rate across 28,000 peak holiday orders preserved our TikTok Shop US Fast Dispatch badge and drove a 180% surge in seasonal revenue.",
    name: "Marcus Vance",
    subtitle: "Head of Supply Chain, UrbanVibe",
    avatar: "/assets/avatar_marcus.jpg",
    partnerLogo: "/assets/partners-short/06.svg",
  },
  {
    id: "homecraft",
    quote:
      "SmartCommerce's multi-channel automation completely eliminated overselling risks between Amazon, Etsy, and Shopify. The real-time safety buffer engine combined with 99.9% barcode scan WMS accuracy reduced manual operational overhead by 85%, saving our logistics team over 15 hours each week.",
    name: "Elena Rostova",
    subtitle: "Operations Director, HomeCraft",
    avatar: "/assets/avatar_elena.jpg",
    partnerLogo: "/assets/partners-short/11.svg",
  },
  {
    id: "lumina",
    quote:
      "E-GEAD's performance marketing team transformed our unit economics, scaling blended ROAS to 4.8x while reducing acquisition costs to $8.40. Leveraging sub-24h fulfillment proof as authentic social proof in creative testing allowed us to scale daily ad spend to $25,000 profitably.",
    name: "David Chen",
    subtitle: "Growth Marketing Lead, Lumina DTC",
    avatar: "/assets/avatar_marcus.jpg",
    partnerLogo: "/assets/partners-short/15.svg",
  },
  {
    id: "printwave",
    quote:
      "E-GEAD's open RESTful API infrastructure and real-time event webhooks connect directly to US production centers with under 120ms latency. From automated order routing and print file validation to carrier label injection, 100% of our order pipeline runs flawlessly with 99.9% uptime.",
    name: "Sarah Jenkins",
    subtitle: "VP of Engineering, PrintWave",
    avatar: "/assets/avatar_elena.jpg",
    partnerLogo: "/assets/partners-short/20.svg",
  },
];

const centerSlideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 340 : -340,
    opacity: 0,
    scale: 0.92,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.45 },
      scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      filter: { duration: 0.35 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -340 : 340,
    opacity: 0,
    scale: 0.92,
    filter: "blur(6px)",
    transition: {
      x: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.35 },
      scale: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
      filter: { duration: 0.3 },
    },
  }),
};

const leftSideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.76,
    rotateY: 28,
    filter: "blur(5px)",
  }),
  center: {
    x: 0,
    opacity: 0.32,
    scale: 0.82,
    rotateY: 28,
    filter: "blur(2.5px)",
    transition: {
      x: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.45 },
      scale: { duration: 0.5 },
      filter: { duration: 0.35 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.76,
    rotateY: 28,
    filter: "blur(5px)",
    transition: {
      x: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.35 },
      scale: { duration: 0.42 },
      filter: { duration: 0.3 },
    },
  }),
};

const rightSideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.76,
    rotateY: -28,
    filter: "blur(5px)",
  }),
  center: {
    x: 0,
    opacity: 0.32,
    scale: 0.82,
    rotateY: -28,
    filter: "blur(2.5px)",
    transition: {
      x: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.45 },
      scale: { duration: 0.5 },
      filter: { duration: 0.35 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.76,
    rotateY: -28,
    filter: "blur(5px)",
    transition: {
      x: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.35 },
      scale: { duration: 0.42 },
      filter: { duration: 0.3 },
    },
  }),
};

export default function TestimonialsSection({
  title,
  subtitle,
  items,
  ratingImage,
}: TestimonialsSectionProps = {}) {
  const list = items && items.length > 0 ? items : defaultTestimonials;
  const starsSrc = ratingImage || "/images/star.png";
  const displayTitle = title || "Voices of Our Sellers";
  const displaySubtitle = subtitle || "Testimonials";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const safeIndex = currentIndex >= list.length ? 0 : currentIndex;
  const prevIndex = (safeIndex - 1 + list.length) % list.length;
  const nextIndex = (safeIndex + 1) % list.length;

  const current = list[safeIndex];
  const prev = list[prevIndex];
  const next = list[nextIndex];

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((p) => (p - 1 + list.length) % list.length);
  }, [list.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((p) => (p + 1) % list.length);
  }, [list.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      id="homepage__testimonial"
      className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden select-none border-t border-white/10"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base font-normal text-[#D4FAE6] mb-2 font-montserrat tracking-wide"
          >
            {displaySubtitle}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-normal text-white font-montserrat tracking-tight"
          >
            {displayTitle}
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3.5 shrink-0"
        >
          <div className="text-xs text-white/50 font-mono tracking-widest mr-1 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={safeIndex}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="text-[#6CE8C3] font-semibold inline-block"
              >
                {String(safeIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span className="mx-1 text-white/30">/</span>
            <span>{String(list.length).padStart(2, "0")}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.15, rotate: -4 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              aria-label="Previous testimonial"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#6CE8C3] transition-colors shadow-lg group cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:-translate-x-0.5 transition-transform" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.15, rotate: 4 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              aria-label="Next testimonial"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#6CE8C3] transition-colors shadow-lg group cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="relative w-full px-6 sm:px-10 lg:px-14 xl:px-16 min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex items-center justify-center overflow-hidden">
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-16 xl:w-24 bg-gradient-to-r from-[#0A0D0E] to-transparent pointer-events-none z-30" />
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-16 xl:w-24 bg-gradient-to-l from-[#0A0D0E] to-transparent pointer-events-none z-30" />

        {/* LEFT SLIDE */}
        <div
          onClick={handlePrev}
          className="hidden md:flex flex-col items-center justify-center absolute left-6 sm:left-10 lg:left-14 xl:left-16 top-1/2 -translate-y-1/2 w-[380px] lg:w-[460px] xl:w-[500px] cursor-pointer select-none z-10"
          style={{ perspective: "1400px" }}
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`prev-${prev.id}`}
              custom={direction}
              variants={leftSideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              whileHover={{ opacity: 0.58, scale: 0.86 }}
              whileTap={{ scale: 0.8 }}
              className="w-full flex flex-col items-center"
              style={{ transformOrigin: "right center" }}
            >
              <p className="text-sm sm:text-base lg:text-[17px] text-white/90 leading-[1.8] font-montserrat text-left line-clamp-5">
                &ldquo;{prev.quote}&rdquo;
              </p>

              <div className="flex justify-center mt-6 mb-5">
                <img
                  src={starsSrc}
                  alt="5 stars"
                  className="h-9 sm:h-10 w-auto object-contain opacity-80"
                />
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center p-2.5 shadow shrink-0">
                  <img
                    src={prev.partnerLogo}
                    alt="Partner logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="h-10 sm:h-11 px-3.5 bg-white rounded-full flex items-center gap-2.5 shadow shrink-0">
                  <img
                    src={prev.avatar}
                    alt={prev.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="text-left pr-1">
                    <div className="text-xs sm:text-sm font-bold text-black leading-tight">
                      {prev.name}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-tight">
                      {prev.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER SLIDE */}
        <div className="relative z-20 w-full max-w-[760px] lg:max-w-[880px] xl:max-w-[940px] px-3 sm:px-6 min-h-[380px] sm:min-h-[340px] flex items-center justify-center">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={centerSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50 || info.velocity.x < -300) {
                  handleNext();
                } else if (info.offset.x > 50 || info.velocity.x > 300) {
                  handlePrev();
                }
              }}
              className="w-full text-center cursor-grab active:cursor-grabbing"
              style={{ perspective: "1400px" }}
            >
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="text-base sm:text-lg md:text-xl lg:text-[23px] xl:text-[24px] text-[#f7f7f7] font-normal leading-[1.85] sm:leading-[1.9] lg:leading-[1.95] font-montserrat text-left sm:text-center max-w-[880px] mx-auto tracking-normal"
              >
                &ldquo;{current.quote}&rdquo;
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -4, 0],
                }}
                transition={{
                  opacity: { duration: 0.35, delay: 0.12 },
                  scale: { duration: 0.35, delay: 0.12 },
                  y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                }}
                className="flex justify-center mt-7 sm:mt-9 mb-6 sm:mb-8"
              >
                <img
                  src={starsSrc}
                  alt="5 stars customer rating"
                  className="h-12 sm:h-14 lg:h-16 w-auto object-contain drop-shadow-xl select-none pointer-events-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                className="flex items-center justify-center gap-3.5 sm:gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center p-3 sm:p-3.5 shadow-xl shrink-0 cursor-pointer"
                >
                  <img
                    src={current.partnerLogo}
                    alt="Partner brand"
                    className="w-full h-full object-contain pointer-events-none"
                  />
                </motion.div>

                <motion.div
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 12px 28px rgba(108, 232, 195, 0.25)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="h-12 sm:h-14 px-4 sm:px-5 bg-white rounded-full flex items-center gap-3 sm:gap-3.5 shadow-xl shrink-0 cursor-pointer"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={current.avatar}
                    alt={current.name}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shrink-0 border border-black/10"
                  />
                  <div className="text-left pr-1.5 sm:pr-2.5">
                    <div className="text-sm sm:text-base font-bold text-black leading-tight">
                      {current.name}
                    </div>
                    <div className="text-xs sm:text-[13px] text-gray-500 font-medium leading-tight mt-0.5">
                      {current.subtitle}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT SLIDE */}
        <div
          onClick={handleNext}
          className="hidden md:flex flex-col items-center justify-center absolute right-6 sm:right-10 lg:right-14 xl:right-16 top-1/2 -translate-y-1/2 w-[380px] lg:w-[460px] xl:w-[500px] cursor-pointer select-none z-10"
          style={{ perspective: "1400px" }}
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`next-${next.id}`}
              custom={direction}
              variants={rightSideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              whileHover={{ opacity: 0.58, scale: 0.86 }}
              whileTap={{ scale: 0.8 }}
              className="w-full flex flex-col items-center"
              style={{ transformOrigin: "left center" }}
            >
              <p className="text-sm sm:text-base lg:text-[17px] text-white/90 leading-[1.8] font-montserrat text-left line-clamp-5">
                &ldquo;{next.quote}&rdquo;
              </p>

              <div className="flex justify-center mt-6 mb-5">
                <img
                  src={starsSrc}
                  alt="5 stars"
                  className="h-9 sm:h-10 w-auto object-contain opacity-80"
                />
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center p-2.5 shadow shrink-0">
                  <img
                    src={next.partnerLogo}
                    alt="Partner logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="h-10 sm:h-11 px-3.5 bg-white rounded-full flex items-center gap-2.5 shadow shrink-0">
                  <img
                    src={next.avatar}
                    alt={next.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="text-left pr-1">
                    <div className="text-xs sm:text-sm font-bold text-black leading-tight">
                      {next.name}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-tight">
                      {next.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
