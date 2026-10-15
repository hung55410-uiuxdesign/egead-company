"use client";

import InsightsSection, {
  type InsightsSectionProps,
} from "@/components/pages/home/components/InsightsSection";

export default function CareerCsrSection(props: InsightsSectionProps) {
  return (
    <InsightsSection
      id="career__insights"
      tagline="Insights & Culture"
      title="Life & community at E-GEAD."
      className="border-t border-white/10 mb-16 sm:mb-24"
      {...props}
    />
  );
}
