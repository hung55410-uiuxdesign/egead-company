"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ALL_INDUSTRIES, type ServiceDetailItem } from "@/data/services-data";

export type RelatedServiceItem = { slug: string; name: string; desc: string };

type Props = {
  currentSlug: string;
  /** Published services from the DB. Falls back to the static industry list when omitted. */
  items?: RelatedServiceItem[];
};

const SaiArrow = ({
  className = "w-[19px] h-[18px]",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
      fill="currentColor"
    />
  </svg>
);

export default function ServiceDetailOtherIndustries({ currentSlug, items }: Props) {
  const otherIndustries: RelatedServiceItem[] = (
    items && items.length > 0
      ? items
      : ALL_INDUSTRIES.map((ind) => ({ slug: ind.slug, name: ind.name, desc: ind.desc }))
  ).filter((ind) => ind.slug !== currentSlug);
  const hasDbItems = Boolean(items && items.length > 0);

  return (
    <section
      id="cases"
      className="service-detail__other w-full bg-[#0A0D0E] py-20 sm:py-28 px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 text-white"
    >
      <motion.p
        className="service-detail__other-title text-2xl sm:text-3xl lg:text-[32px] font-normal text-white mb-10 font-montserrat"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {hasDbItems ? 'Explore more services' : 'Other industries'}
      </motion.p>

      <div className="service-block__list space-y-5 sm:space-y-6">
        {otherIndustries.map((ind, idx) => (
          <motion.div
            key={ind.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: "0px 0px -30px 0px" }}
            transition={{
              duration: 0.6,
              delay: Math.min(idx * 0.08, 0.4),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={`/services/all-services/${ind.slug}`}
              className="service-card normal-service group relative block w-full rounded-[20px] bg-[#12131C] border border-white/10 hover:border-[#10E774]/50 p-6 sm:p-9 lg:p-11 transition-all duration-300 shadow-xl overflow-hidden hover:bg-[#161722]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
                {/* Left: Industry Title in #7CEEE0 */}
                <div className="lg:col-span-5 flex items-center justify-between">
                  <p className="service-card__title text-2xl sm:text-3xl font-semibold text-[#7CEEE0] group-hover:text-[#10E774] transition-colors font-montserrat">
                    {ind.name}
                  </p>
                </div>

                {/* Right: Value proposition and Discover More CTA button */}
                <div className="service-card__content lg:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <p className="service-card__desc text-base sm:text-lg text-[#b3b3b3] leading-relaxed font-light flex-1">
                    {ind.desc}
                  </p>
                  <div className="hidden sm:inline-flex items-center gap-2 bg-[#25E2CC] hover:bg-[#10E774] text-[#003D5B] font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 shrink-0">
                    <SaiArrow className="w-4 h-4 text-[#003D5B]" />
                    <span>Discover More</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
