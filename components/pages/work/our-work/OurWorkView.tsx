"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ContactBlock from "@/components/ContactBlock";
import { CASE_STUDIES } from "./data/case-studies.data";
import OurWorkHeader from "./components/OurWorkHeader";
import OurWorkFilters from "./components/OurWorkFilters";
import OurWorkGrid from "./components/OurWorkGrid";
import type { CaseStudyItem } from "./types";

interface OurWorkViewProps {
  initialStudies?: CaseStudyItem[];
}

export default function OurWorkView({ initialStudies }: OurWorkViewProps) {
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");

  const allStudies = initialStudies && initialStudies.length > 0 ? initialStudies : CASE_STUDIES;

  const filteredStudies = useMemo(() => {
    return allStudies.filter((item) => {
      const matchService =
        selectedService === "All Services" ||
        item.services.includes(selectedService);
      const matchIndustry =
        selectedIndustry === "All Industries" ||
        item.industries.includes(selectedIndustry);
      return matchService && matchIndustry;
    });
  }, [allStudies, selectedService, selectedIndustry]);

  return (
    <div className="ourwork" id="ourwork">
      {/* 1. Header & Filter Bar */}
      <div className="ourwork__header" id="ourwork__header">
        <OurWorkHeader />
        <OurWorkFilters
          selectedService={selectedService}
          selectedIndustry={selectedIndustry}
          onSelectService={setSelectedService}
          onSelectIndustry={setSelectedIndustry}
          resultsCount={filteredStudies.length}
        />
      </div>

      {/* 2. Grid & Empty State */}
      <OurWorkGrid
        studies={filteredStudies}
        onResetFilters={() => {
          setSelectedService("All Services");
          setSelectedIndustry("All Industries");
        }}
      />

      {/* 3. Signature Contact Block */}
      <motion.div
        id="contact"
        className="scroll-mt-28"
        initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <ContactBlock />
      </motion.div>
    </div>
  );
}
