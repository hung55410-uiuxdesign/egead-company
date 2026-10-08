"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { CaseStudyItem } from "../types";

type Props = {
  studies: CaseStudyItem[];
  onResetFilters: () => void;
};

export default function OurWorkGrid({ studies, onResetFilters }: Props) {
  return (
    <>
      <div className="ourwork__body" id="case-studies-grid">
        <AnimatePresence mode="popLayout">
          {studies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{
                duration: 0.75,
                delay: (idx % 2) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="w-full"
            >
              <Link
                href={`/case-studies/${study.slug || study.id}`}
                className="ourwork__item group block"
              >
                {/* Visual Media Container */}
                <div className="image shadow-[0_12px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_40px_rgba(124,238,224,0.15)] transition-shadow duration-500">
                  <Image
                    src={study.image}
                    alt={study.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Information Block */}
                <div className="info">
                  {/* Category & Capability Tags */}
                  <div className="tag">
                    {study.tags.map((tag) => (
                      <span key={tag} className="tag--item">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Customer subtitle */}
                  <div className="customer font-montserrat">
                    {study.customer}
                  </div>

                  {/* Cyan highlighted Title */}
                  <h2 className="title font-montserrat group-hover:text-[#7ceee0] transition-colors duration-300">
                    {study.title}
                  </h2>

                  {/* Descriptive Overview */}
                  <p className="description font-montserrat">
                    {study.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State if filter yields 0 */}
      {studies.length === 0 && (
        <div className="ourwork__no__results text-center py-20 text-[#b3b3b3] font-montserrat">
          <p className="text-xl">No case studies match the selected filters.</p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#10E774] text-black font-semibold text-sm"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}
