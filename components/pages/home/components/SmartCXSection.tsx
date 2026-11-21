"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { SmartCXSectionData } from "@/lib/services/home-section.service";
import { getOptimizedImageUrl } from "@/lib/utils/image";

export interface SmartCXSectionProps {
  title?: string;
  data?: SmartCXSectionData | null;
}

type StatData = { brand: string; tagline: string; value: string; label: string };
type PhotoData = { image?: string; alt?: string };

/** Pick a font size from the longest word so long values ("Multi-Platform") never overflow the card. */
function statValueSize(value: string) {
  const longest = value
    .split(/[\s-]+/)
    .reduce((max, w) => Math.max(max, w.length), 0);
  if (longest <= 5) {
    return "text-5xl sm:text-6xl xl:text-[56px] 2xl:text-[84px]";
  }
  if (longest <= 8) {
    return "text-4xl sm:text-5xl xl:text-[40px] 2xl:text-[56px]";
  }
  return "text-3xl sm:text-4xl xl:text-[30px] 2xl:text-[40px]";
}

function PhotoCard({
  photo,
  fallback,
  fallbackAlt,
  delay = 0,
}: {
  photo: PhotoData;
  fallback: string;
  fallbackAlt: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6, scale: 1.015 }}
      className="relative aspect-square sm:aspect-auto sm:min-h-[340px] overflow-hidden bg-[#181d1f] border border-white/10 hover:border-[#6CE8C3]/50 rounded-xl group transition-all duration-300 shadow-lg cursor-pointer"
    >
      <img
        src={getOptimizedImageUrl(photo.image || fallback, { width: 800 })}
        alt={photo.alt || fallbackAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}

function StatCard({ stat, delay = 0 }: { stat: StatData; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -6,
        scale: 1.015,
        borderColor: "rgba(108, 232, 195, 0.5)",
      }}
      className="flex min-w-0 min-h-[340px] flex-col justify-between gap-8 p-6 sm:p-7 xl:p-8 bg-[#141718] border border-white/10 transition-all duration-300 rounded-xl shadow-lg group cursor-pointer"
    >
      <div className="flex min-w-0 flex-col items-start gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="max-w-full border border-[#6CE8C3]/70 bg-[#6CE8C3]/10 px-2.5 py-1 inline-flex items-center rounded group-hover:border-[#6CE8C3]"
        >
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#6CE8C3] font-mono break-words transition-colors">
            {stat.brand}
          </span>
        </motion.div>
        <p className="w-full border-l border-white/20 pl-3 text-xs sm:text-sm font-mono uppercase tracking-wide text-[#d1d5db] group-hover:text-white leading-relaxed whitespace-pre-line break-words transition-colors">
          {stat.tagline}
        </p>
      </div>

      <div className="min-w-0">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`${statValueSize(stat.value)} origin-left font-light text-white group-hover:text-[#6CE8C3] leading-[1.05] font-montserrat break-words transition-colors`}
        >
          {stat.value}
        </motion.div>
        <p className="text-[11px] sm:text-xs text-[#5EFC8D] font-mono uppercase tracking-wide mt-3 font-medium break-words">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function SmartCXSection({
  title,
  data,
}: SmartCXSectionProps = {}) {
  const displayTitle = title || "Why brands ship with Egead";
  const ctaText = data?.ctaText || "Read Customer Stories";
  const ctaHref = data?.ctaHref || "/our-work";

  const photo1 = data?.photo1 || {
    image: "/assets/success_apparel.jpg",
    alt: "E-GEAD precision industrial DTF print-on-demand streetwear apparel",
  };
  const stat1 = data?.stat1 || {
    brand: "URBANVIBE",
    tagline: "URBANVIBE\nACHIEVED SUB-24H DISPATCH\nON TIKTOK SHOP US",
    value: "<24H",
    label: "Average Production SLA",
  };
  const widePhoto = data?.widePhoto || {
    image: "/assets/success_warehouse.jpg",
    alt: "E-GEAD high-speed automated robotics fulfillment facility",
  };
  const quote = data?.quote || {
    quote:
      "“Egead eliminated our fulfillment delays entirely. With sub-24h industrial DTF printing and automated TikTok Shop US compliance, we scaled to 28,000 peak holiday orders with a 0.18% late dispatch rate and zero algorithmic penalties.”",
    author: "MARCUS VANCE",
    role: "HEAD OF GLOBAL SUPPLY CHAIN & OPERATIONS",
    brand: "URBANVIBE",
  };
  const photo2 = data?.photo2 || {
    image: "/assets/success_scanner.jpg",
    alt: "Smart barcode scan warehouse management and error-free dispatch",
  };
  const stat2 = data?.stat2 || {
    brand: "HOMECRAFT",
    tagline: "HOMECRAFT\nELIMINATED OVERSELLING &\nCUT MANUAL OPS BY 85%",
    value: "99.9%",
    label: "WMS Barcode Scan Accuracy",
  };

  return (
    <section
      id="homepage__customersuccess"
      className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white border-t border-white/10 overflow-hidden select-none"
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 sm:mb-16">
          <div className="lg:col-span-8 xl:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-semibold font-montserrat leading-[1.2] tracking-tight"
            >
              <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                {displayTitle}
              </span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
          {/* Row 1 Left: photo + stat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <PhotoCard
              photo={photo1}
              fallback="/assets/success_apparel.jpg"
              fallbackAlt="Product apparel"
            />
            <StatCard stat={stat1} delay={0.1} />
          </div>

          {/* Row 1 Right: Wide Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.015 }}
            className="relative w-full h-[280px] sm:h-[340px] xl:h-full min-h-[260px] overflow-hidden bg-[#181d1f] border border-white/10 hover:border-[#6CE8C3]/50 rounded-xl group transition-all duration-300 shadow-lg cursor-pointer"
          >
            <img
              src={getOptimizedImageUrl(widePhoto.image || "/assets/success_warehouse.jpg", { width: 1400 })}
              alt={widePhoto.alt || "Warehouse fulfillment"}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Row 2 Left: Wide Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{
              y: -6,
              scale: 1.015,
              borderColor: "rgba(108, 232, 195, 0.5)",
            }}
            className="flex min-w-0 flex-col justify-between gap-8 p-7 sm:p-9 xl:p-10 bg-[#141718] border border-white/10 transition-all duration-300 min-h-[300px] xl:min-h-full rounded-xl shadow-lg group cursor-pointer"
          >
            <p className="text-lg sm:text-xl xl:text-[22px] font-normal text-white font-montserrat leading-[1.55] break-words">
              {quote.quote}
            </p>

            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 pt-6 border-t border-white/10">
              <div className="min-w-0 flex-1 basis-56">
                <h4 className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-white font-mono break-words">
                  {quote.author}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#a3a3a3] font-mono uppercase tracking-wide mt-1 break-words">
                  {quote.role}
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.08 }} className="shrink-0">
                <span className="inline-block whitespace-nowrap text-xs sm:text-sm font-bold tracking-wide text-white/90 group-hover:text-[#6CE8C3] font-mono uppercase border border-white/30 group-hover:border-[#6CE8C3] px-2.5 py-1 rounded bg-white/5 transition-colors">
                  {quote.brand}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Row 2 Right: photo + stat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <PhotoCard
              photo={photo2}
              fallback="/assets/success_scanner.jpg"
              fallbackAlt="Scanner management"
              delay={0.25}
            />
            <StatCard stat={stat2} delay={0.3} />
          </div>
        </div>

        <div className="w-full flex justify-center mt-12 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/20 hover:border-[#5EFC8D] hover:text-[#5EFC8D] hover:bg-white/5 text-[#D4FAE6] font-medium text-sm transition duration-300 shrink-0 font-montserrat shadow-lg"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#D4FAE6] group-hover:fill-[#5EFC8D] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
              <span>{ctaText}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
