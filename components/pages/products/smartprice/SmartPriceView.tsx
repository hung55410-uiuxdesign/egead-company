'use client';

import { motion } from 'framer-motion';
import './smartprice.css';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import SmartPriceHeroSection from './components/SmartPriceHeroSection';
import SmartPriceOverviewSection from './components/SmartPriceOverviewSection';
import SmartPriceStrategySection from './components/SmartPriceStrategySection';
import SmartPriceHowItWorksSection from './components/SmartPriceHowItWorksSection';
import SmartPriceSapStoreSection from './components/SmartPriceSapStoreSection';
import SmartPriceCtaSection from './components/SmartPriceCtaSection';

export default function SmartPriceView() {
  return (
    <div id="main-home" className="catalyzer/smartprice catalyzer-smartprice">
      <div className="service-detail partner">
        <SmartPriceHeroSection />
        <SmartPriceOverviewSection />
        <SmartPriceStrategySection />
        <SmartPriceHowItWorksSection />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <CaseStudiesSection variant="smartprice" />
        </motion.div>
        <SmartPriceSapStoreSection />
        <SmartPriceCtaSection />
      </div>
    </div>
  );
}
