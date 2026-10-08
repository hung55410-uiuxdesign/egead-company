"use client";

import { motion } from "framer-motion";
import { SERVICE_OPTIONS, INDUSTRY_OPTIONS } from "../data/case-studies.data";

type Props = {
  selectedService: string;
  selectedIndustry: string;
  onSelectService: (service: string) => void;
  onSelectIndustry: (industry: string) => void;
  resultsCount: number;
};

export default function OurWorkFilters({
  selectedService,
  selectedIndustry,
  onSelectService,
  onSelectIndustry,
  resultsCount,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="ourwork__header--bottom"
      id="case-study-filters"
    >
      <div className="filter">
        <form
          className="flex flex-wrap items-center gap-3 sm:gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Service Filter Select */}
          <div className="relative min-w-[200px] sm:min-w-[260px]">
            <label htmlFor="service-filter" className="sr-only">
              Filter by Service
            </label>
            <select
              id="service-filter"
              value={selectedService}
              onChange={(e) => onSelectService(e.target.value)}
              className="w-full h-[46px] px-4 py-2.5 rounded-lg border border-[#444] bg-[#000000] text-white text-sm font-montserrat appearance-none cursor-pointer hover:border-[#7ceee0] transition-colors focus:outline-none focus:border-[#7ceee0] shadow-[0_2px_0_0_#2e2e2e]"
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option
                  key={opt}
                  value={opt}
                  className="bg-[#141718] text-white"
                >
                  {opt}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8C8C8C]">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 14 14">
                <path d="M4.3225 4.83789L7 7.50956L9.6775 4.83789L10.5 5.66039L7 9.16039L3.5 5.66039L4.3225 4.83789Z" />
              </svg>
            </div>
          </div>

          {/* Industry Filter Select */}
          <div className="relative min-w-[200px] sm:min-w-[260px]">
            <label htmlFor="industry-filter" className="sr-only">
              Filter by Industry
            </label>
            <select
              id="industry-filter"
              value={selectedIndustry}
              onChange={(e) => onSelectIndustry(e.target.value)}
              className="w-full h-[46px] px-4 py-2.5 rounded-lg border border-[#444] bg-[#000000] text-white text-sm font-montserrat appearance-none cursor-pointer hover:border-[#7ceee0] transition-colors focus:outline-none focus:border-[#7ceee0] shadow-[0_2px_0_0_#2e2e2e]"
            >
              {INDUSTRY_OPTIONS.map((opt) => (
                <option
                  key={opt}
                  value={opt}
                  className="bg-[#141718] text-white"
                >
                  {opt}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8C8C8C]">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 14 14">
                <path d="M4.3225 4.83789L7 7.50956L9.6775 4.83789L10.5 5.66039L7 9.16039L3.5 5.66039L4.3225 4.83789Z" />
              </svg>
            </div>
          </div>

          {/* Reset if active */}
          {(selectedService !== "All Services" ||
            selectedIndustry !== "All Industries") && (
            <button
              type="button"
              onClick={() => {
                onSelectService("All Services");
                onSelectIndustry("All Industries");
              }}
              className="text-xs text-[#7ceee0] hover:underline px-2 py-1 font-montserrat"
            >
              Reset filters
            </button>
          )}
        </form>
      </div>

      {/* Results count matching SAI Digital */}
      <div className="result flex items-center gap-2 text-sm text-[#8c8c8c] font-montserrat">
        <span className="w-2 h-2 rounded-full bg-[#7ceee0]" />
        <span>
          Showing{" "}
          <strong className="text-white font-medium">{resultsCount}</strong>{" "}
          Results
        </span>
      </div>
    </motion.div>
  );
}
