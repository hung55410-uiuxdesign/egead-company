"use client";

import ContactBlock from "@/components/ContactBlock";
import { MotionDiv } from "@/components/MotionSection";
import type { InsightsHubData } from "@/lib/services/blog.service";
import InsightsHeroSection from "./components/InsightsHeroSection";
import InsightsFeaturedSection from "./components/InsightsFeaturedSection";
import InsightsCategorySections from "./components/InsightsCategorySections";

type Props = {
  hubData: InsightsHubData;
};

export default function InsightsHubView({ hubData }: Props) {
  const { featured, sections, categories } = hubData;

  return (
    <div className="w-full overflow-hidden scroll-smooth">
      <div className="w-full bg-black text-white pt-28 sm:pt-36 pb-20">
        <InsightsHeroSection categories={categories} />
        <InsightsFeaturedSection featured={featured} />
      </div>
      <InsightsCategorySections sections={sections} />
      <MotionDiv threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </div>
  );
}
