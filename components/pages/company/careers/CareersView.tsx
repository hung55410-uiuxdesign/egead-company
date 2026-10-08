"use client";

import type { JobOpening } from "@/lib/careers";
import ContactBlock from "@/components/ContactBlock";
import MotionSection, { MotionDiv } from "@/components/MotionSection";
import CareerHeroSection from "./components/CareerHeroSection";
import CareerLifeSection from "./components/CareerLifeSection";
import CareerMomentsBento from "./components/CareerMomentsBento";
import CareerJobsList from "./components/CareerJobsList";
import CareerCsrSection from "./components/CareerCsrSection";

type Props = {
  jobs: JobOpening[];
};

export default function CareersView({ jobs }: Props) {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-28 sm:pt-36 overflow-hidden">
      <CareerHeroSection />
      <CareerLifeSection />
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28 sm:mb-36">
        <CareerMomentsBento />
      </MotionSection>
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28 sm:mb-36">
        <CareerJobsList jobs={jobs} />
      </MotionSection>
      <CareerCsrSection />
      <MotionDiv threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </div>
  );
}
