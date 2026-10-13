'use client';

import { motion, type Variants } from 'framer-motion';
import {
  HeroBanner,
  ServicesSection,
  SmartCXSection,
  TestimonialsSection,
  InsightsSection,
  CultureSection,
} from './components';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import ContactBlock from '@/components/ContactBlock';
import type {
  HomeSectionModel,
  CapabilitiesSectionData,
} from '@/lib/services/home-section.service';

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface HomeViewProps {
  marketplacesSection?: HomeSectionModel | null;
  servicesSection?: HomeSectionModel | null;
}

export default function HomeView({
  marketplacesSection,
  servicesSection,
}: HomeViewProps = {}) {
  const row1 = marketplacesSection?.data?.row1Partners;
  const row2 = marketplacesSection?.data?.row2Partners;

  const servicesData = servicesSection?.data as CapabilitiesSectionData | undefined;

  return (
    <div className="w-full overflow-hidden">
      {/* 1. Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroBanner />
      </motion.div>

      {/* 2. Services Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <ServicesSection
          subtitle={servicesSection?.subtitle || undefined}
          title={servicesSection?.title || undefined}
          buttonText={servicesData?.buttonText || undefined}
          buttonHref={servicesData?.buttonHref || undefined}
          backgroundImage={servicesData?.backgroundImage || undefined}
          items={
            servicesData?.items && servicesData.items.length > 0
              ? servicesData.items
              : undefined
          }
        />
      </motion.div>

      {/* 3. Case Studies Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <CaseStudiesSection
          title={marketplacesSection?.title || undefined}
          description={marketplacesSection?.description || undefined}
          row1Partners={row1 && row1.length > 0 ? row1 : undefined}
          row2Partners={row2 && row2.length > 0 ? row2 : undefined}
        />
      </motion.div>

      {/* 4. SmartCX Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <SmartCXSection />
      </motion.div>

      {/* 5. Testimonials Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <TestimonialsSection />
      </motion.div>

      {/* 6. Insights Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <InsightsSection />
      </motion.div>

      {/* 7. Culture Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <CultureSection />
      </motion.div>

      {/* 8. Contact Block CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
        variants={sectionVariants}
      >
        <ContactBlock />
      </motion.div>
    </div>
  );
}
