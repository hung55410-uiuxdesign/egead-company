'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FaqAccordionProps {
  id?: string;
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  items: FaqItem[];
  categories?: string[];
  includeSchema?: boolean;
  className?: string;
}

export default function FaqAccordion({
  id = 'faq',
  badge = 'Frequently Asked Questions',
  title,
  subtitle,
  items,
  categories,
  includeSchema = true,
  className = '',
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  // Deduplicate categories and ensure single 'All' filter
  const categoryPills = categories
    ? ['All', ...categories.filter((c) => c !== 'All')]
    : [];

  // Structured Schema FAQ JSON-LD for Google Rich Results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id={id}
      className={`relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden ${className}`}
    >
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
          }}
        />
      )}

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#10E774]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {badge && (
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
              {badge}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Category Pills */}
        {categoryPills.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {categoryPills.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium font-montserrat transition-all duration-200 focus:outline-none ${
                  activeCategory === cat
                    ? 'bg-[#5EFC8D] text-black shadow-[0_0_20px_rgba(94, 252, 141, 0.3)]'
                    : 'bg-[#141718] text-[#b3b3b3] border border-white/10 hover:text-[#D4FAE6] hover:border-[#5EFC8D]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            const btnId = `faq-btn-${idx}`;
            const panelId = `faq-answer-${idx}`;

            return (
              <div
                key={idx}
                className={`rounded-[24px] border transition-all duration-300 overflow-hidden bg-[#141718]/90 backdrop-blur-sm ${
                  isOpen
                    ? 'border-[#5EFC8D]/40 shadow-[0_0_25px_rgba(94, 252, 141, 0.08)]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full text-left px-6 sm:px-8 py-6 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-medium text-[#D4FAE6] text-base sm:text-lg font-montserrat leading-snug group-hover:text-[#5EFC8D] transition-colors">
                      {item.question}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-[#5EFC8D] text-black rotate-180 shadow-[0_0_15px_rgba(94, 252, 141, 0.4)]'
                          : 'bg-[#1D2224] text-[#b3b3b3] border border-white/10'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                    </div>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="px-6 sm:px-8 pb-6 pt-1 border-t border-white/10 animate-fade-in-up"
                  >
                    <p className="text-sm sm:text-base text-[#b3b3b3] font-light font-montserrat leading-[1.75] whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
