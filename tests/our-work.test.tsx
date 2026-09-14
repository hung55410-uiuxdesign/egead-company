import { describe, test, expect } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import OurWorkPage, { metadata } from '../app/our-work/page';
import {
  CaseStudiesPortfolio,
  TransformationMatrix,
  EfficiencyVisualizer,
  PlaybookDownloads,
} from '../components/sections';

describe('Phase 5 Our Work / Case Studies Page Verification', () => {
  const html = renderToStaticMarkup(<OurWorkPage />);

  describe('Page Metadata', () => {
    test('contains comprehensive SEO title, description, and keywords', () => {
      expect(metadata).toBeDefined();
      expect(metadata.title).toContain('E-Commerce Case Studies');
      expect(metadata.title).toContain('Battle-Tested Growth Proof');
      expect(metadata.description).toContain('sub-24h fulfillment');
      expect(metadata.description).toContain('99.8% SLA safety');
      expect(metadata.keywords).toBeDefined();
      const keywords = metadata.keywords as string[];
      expect(keywords).toBeArray();
      expect(keywords.length).toBeGreaterThanOrEqual(6);
      expect(keywords).toContain('ecommerce case studies');
      expect(keywords).toContain('tiktok shop us success story');
      expect(keywords).toContain('pod fulfillment case study');
      expect(keywords).toContain('cross-border scaling results');
      expect(keywords).toContain('sub 24h dispatch SLA proof');
    });
  });

  describe('All 10 Dedicated Sections Present and Rendered', () => {
    // 1. Hero Section & Aggregate Stats
    test('renders Section 1: Impact-Driven Hero & Aggregate Portfolio Metrics', () => {
      expect(html).toContain('id="work-hero"');
      expect(html).toContain('Measurable Growth.');
      expect(html).toContain('Battle-Tested Results.');
      expect(html).toContain('+$45M');
      expect(html).toContain('Gross Merchandise Value (GMV) Generated');
      expect(html).toContain('100+');
      expect(html).toContain('Brands Accelerated in 10+ Countries');
      expect(html).toContain('99.8%');
      expect(html).toContain('Aggregate On-Time Dispatch SLA Rate');
      expect(html).toContain('0%');
      expect(html).toContain('Account Health Violations Across Partners');
      expect(html).toContain('Explore Case Studies');
      expect(html).toContain('Book Operations Audit');
    });

    // 2. Interactive Filter Bar
    test('renders Section 2: Interactive Industry & Capability Filter Bar', () => {
      expect(html).toContain('id="case-study-filters"');
      expect(html).toContain('Filter By Capability &amp; Operational Domain');
      expect(html).toContain('All Success Stories');
      expect(html).toContain('POD US Fulfillment &amp; 24H SLA');
      expect(html).toContain('Multi-Channel Inventory Sync');
      expect(html).toContain('Performance Ads &amp; ROAS Scale');
      expect(html).toContain('Enterprise WMS &amp; API Integration');
    });

    // 3. Flagship Deep Dive
    test('renders Section 3: Flagship Case Study Deep Dive: UrbanVibe Apparel', () => {
      expect(html).toContain('id="flagship-case-study"');
      expect(html).toContain('Flagship Case Study Deep Dive');
      expect(html).toContain('How UrbanVibe Conquered TikTok Shop US: Zero LDR Strikes &amp; +180% Q4 Growth');
      expect(html).toContain('The Operational Bottleneck');
      expect(html).toContain('The E-GEAD Intervention');
      expect(html).toContain('The Quantitative Outcome');
      expect(html).toContain('Marcus Vance, Founder, UrbanVibe Apparel');
      expect(html).toContain('TikTok Fast Dispatch Badge Retained');
    });

    // 4. Case Studies Portfolio Grid
    test('renders Section 4: Comprehensive 6-Brand Case Study Portfolio Grid', () => {
      expect(html).toContain('id="case-studies-grid"');
      expect(html).toContain('Empirical Case Studies Portfolio');
      // 6 Brands:
      expect(html).toContain('UrbanVibe Apparel');
      expect(html).toContain('HomeCraft Studio');
      expect(html).toContain('Lumina DTC Brand');
      expect(html).toContain('PrintWave Enterprise Network');
      expect(html).toContain('Nordic Threads');
      expect(html).toContain('AuraGlow Custom Decor');
    });

    // 5. Transformation Matrix
    test('renders Section 5: Quantitative Before-vs-After Transformation Matrix', () => {
      expect(html).toContain('id="transformation-matrix"');
      expect(html).toContain('Quantitative Transformation Matrix');
      expect(html).toContain('TikTok Shop Late Dispatch Rate (LDR)');
      expect(html).toContain('Weekly Hours on Manual CSVs &amp; Routing');
      expect(html).toContain('Address-Related Return to Origin (RTO)');
      expect(html).toContain('Blended Advertising ROAS (Meta &amp; TikTok)');
      expect(html).toContain('-95.5%');
      expect(html).toContain('-93.5%');
      expect(html).toContain('-86.8%');
      expect(html).toContain('+128.6%');
    });

    // 6. Efficiency Visualizer
    test('renders Section 6: Interactive Operational Efficiency Visualizer', () => {
      expect(html).toContain('id="efficiency-visualizer"');
      expect(html).toContain('Calculate Headcount &amp; Cost Savings');
      expect(html).toContain('Monthly Order Volume');
      expect(html).toContain('Net Monthly Cash Saved');
      expect(html).toContain('Human Hours Reclaimed');
      expect(html).toContain('Headcount Avoidance');
    });

    // 7. Founder Voices
    test('renders Section 7: Verified Founder Voices & Audio/Video Quotes', () => {
      expect(html).toContain('id="founder-voices"');
      expect(html).toContain('Verified Founder Voices');
      expect(html).toContain('Marcus Vance');
      expect(html).toContain('Elena Rostova');
      expect(html).toContain('David Nguyen');
      expect(html).toContain('Audio Recording · 1m 18s');
      expect(html).toContain('Video Case · 2m 04s');
      expect(html).toContain('Audio Recording · 1m 45s');
    });

    // 8. Operational Playbooks
    test('renders Section 8: Operational Playbooks & Strategy Breakdowns', () => {
      expect(html).toContain('id="operational-playbooks"');
      expect(html).toContain('Operational Playbooks &amp; Strategy Guides');
      expect(html).toContain('The 2026 TikTok Shop US SLA Survival Guide');
      expect(html).toContain('The Omnichannel Inventory &amp; Safety Buffer Blueprint');
      expect(html).toContain('Unit Economics &amp; True Net Margin Master Sheet');
      expect(html).toContain('Download Free Guide');
    });

    // 9. Case Studies FAQ
    test('renders Section 9: Case Studies & Partnership FAQ Accordion', () => {
      expect(html).toContain('id="case-studies-faq"');
      expect(html).toContain('Frequently Asked Questions');
      expect(html).toContain('How quickly can our store replicate these results?');
      expect(html).toContain('Are these case study metrics verified by third-party platforms?');
      expect(html).toContain('Do you work with early-stage sellers or only established enterprise brands?');
      expect(html).toContain('What happens if our sales volume spikes 10x overnight during a viral campaign?');
      expect(html).toContain('Can we sign an NDA before sharing our storefront data?');
    });

    // 10. Growth Audit CTA & Contact
    test('renders Section 10: High-Conversion Growth Audit Booking CTA & Contact', () => {
      expect(html).toContain('id="work-cta"');
      expect(html).toContain('Ready to Write Your Own');
      expect(html).toContain('Growth Story?');
      expect(html).toContain('Claim Your Free Operations Audit');
      expect(html).toContain('Explore Technical Documentation');
      expect(html).toContain('id="contact"');
    });
  });

  describe('Interactive Section Island Accessibility and Mechanics', () => {
    test('EfficiencyVisualizer renders range slider, presets, and live region', () => {
      const visualizerHtml = renderToStaticMarkup(<EfficiencyVisualizer initialVolume={6000} />);
      expect(visualizerHtml).toContain('role="region"');
      expect(visualizerHtml).toContain('aria-label="Operational Efficiency &amp; Headcount Savings Visualizer"');
      expect(visualizerHtml).toContain('type="range"');
      expect(visualizerHtml).toContain('aria-valuemin="500"');
      expect(visualizerHtml).toContain('aria-valuemax="20000"');
      expect(visualizerHtml).toContain('aria-valuenow="6000"');
      expect(visualizerHtml).toContain('aria-valuetext="6,000 orders per month"');
      expect(visualizerHtml).toContain('aria-live="polite"');
      expect(visualizerHtml).toContain('Quick Presets:');
    });

    test('TransformationMatrix renders WAI-ARIA table with column headers and trend badges', () => {
      const matrixHtml = renderToStaticMarkup(<TransformationMatrix />);
      expect(matrixHtml).toContain('role="region"');
      expect(matrixHtml).toContain('role="table"');
      expect(matrixHtml).toContain('scope="col"');
      expect(matrixHtml).toContain('scope="row"');
      expect(matrixHtml).toContain('Before E-GEAD (Legacy)');
      expect(matrixHtml).toContain('With E-GEAD (Automated)');
      expect(matrixHtml).toContain('aria-live="polite"');
    });

    test('CaseStudiesPortfolio renders filter tabs and 6 brand case study articles', () => {
      const portfolioHtml = renderToStaticMarkup(<CaseStudiesPortfolio />);
      expect(portfolioHtml).toContain('role="tablist"');
      expect(portfolioHtml).toContain('role="tab"');
      expect(portfolioHtml).toContain('aria-controls="case-studies-grid"');
      expect(portfolioHtml).toContain('UrbanVibe Apparel');
      expect(portfolioHtml).toContain('HomeCraft Studio');
      expect(portfolioHtml).toContain('Lumina DTC Brand');
      expect(portfolioHtml).toContain('PrintWave Enterprise Network');
      expect(portfolioHtml).toContain('Nordic Threads');
      expect(portfolioHtml).toContain('AuraGlow Custom Decor');
    });

    test('PlaybookDownloads renders 3 executive resources and accessible download buttons', () => {
      const playbooksHtml = renderToStaticMarkup(<PlaybookDownloads />);
      expect(playbooksHtml).toContain('role="region"');
      expect(playbooksHtml).toContain('aria-label="Operational Playbooks &amp; Strategy Guides"');
      expect(playbooksHtml).toContain('The 2026 TikTok Shop US SLA Survival Guide');
      expect(playbooksHtml).toContain('The Omnichannel Inventory &amp; Safety Buffer Blueprint');
      expect(playbooksHtml).toContain('Unit Economics &amp; True Net Margin Master Sheet');
      expect(playbooksHtml).toContain('aria-live="polite"');
    });
  });
});
