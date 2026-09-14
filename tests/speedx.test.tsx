import { describe, test, expect } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import SpeedXPage, { metadata } from '../app/speedx/page';
import {
  AddressDemo,
  PricingCalculator,
  ApiTerminal,
  LiveCountdownCard,
} from '../components/sections';

describe('Phase 3 SpeedX Page Verification', () => {
  const html = renderToStaticMarkup(<SpeedXPage />);

  describe('Page Metadata', () => {
    test('contains comprehensive SEO title, description, and keywords', () => {
      expect(metadata).toBeDefined();
      expect(metadata.title).toContain('SpeedX');
      expect(metadata.title).toContain('Eweb-character');
      expect(metadata.description).toContain('23-inch large-format DTF');
      expect(metadata.keywords).toBeDefined();
      const keywords = metadata.keywords as string[];
      expect(keywords).toBeArray();
      expect(keywords.length).toBeGreaterThanOrEqual(5);
      expect(keywords).toContain('24 hour POD fulfillment USA');
      expect(keywords).toContain('TikTok Shop compliant POD');
      expect(keywords).toContain('DTF print on demand US');
    });
  });

  describe('All 12 Dedicated Sections Present and Rendered', () => {
    // 1. Hero Section
    test('renders Section 1: Kinetic Hero with live 24H dispatch countdown card', () => {
      expect(html).toContain('id="speedx-hero"');
      expect(html).toContain('Eweb-character:');
      expect(html).toContain('AI Precision. Sub-24H POD.');
      expect(html).toContain('Propelled by Eweb-character AI');
      expect(html).toContain('24-Hour Production SLA Clock');
      expect(html).toContain('08:00 AM • Order Ingestion');
      expect(html).toContain('11:30 AM • 23&quot; DTF Printed');
      expect(html).toContain('03:45 PM • Carrier Physical Scan');
    });

    // 2. Metrics Ribbon
    test('renders Section 2: Production Metrics Strip with core KPIs', () => {
      expect(html).toContain('id="speedx-metrics"');
      expect(html).toContain('&lt; 18.4 Hours');
      expect(html).toContain('Median Order Turnaround');
      expect(html).toContain('23 Inches');
      expect(html).toContain('Maximum DTF Print Width');
      expect(html).toContain('0.2%');
      expect(html).toContain('Average Late Dispatch Rate');
      expect(html).toContain('-82%');
      expect(html).toContain('Drop in Address RTO');
    });

    // 3. Problem vs Solution
    test('renders Section 3: The Cross-Border POD Crisis vs E-GEAD Solution comparison', () => {
      expect(html).toContain('id="the-pod-crisis"');
      expect(html).toContain('The Legacy 3PL Crisis vs');
      expect(html).toContain('The Eweb-character Standard');
      expect(html).toContain('Production &amp; Carrier Dispatch SLA');
      expect(html).toContain('TikTok Shop US Account Health');
      expect(html).toContain('Address Normalization &amp; Validation');
      expect(html).toContain('Unit Pricing &amp; Cost Transparency');
    });

    // 4. Address Normalization Demo
    test('renders Section 4: AI Address Normalization Engine Visual Demo', () => {
      expect(html).toContain('id="ai-address-normalization"');
      expect(html).toContain('Watch AI');
      expect(html).toContain('Sanitize &amp; Fix');
      expect(html).toContain('Raw Marketplace Payload');
      expect(html).toContain('Eweb-character AI Sanitized');
      expect(html).toContain('USPS DPV Confirmed Delivery Point');
    });

    // 5. DTF Technology Deep Dive
    test('renders Section 5: 23-Inch Industrial DTF Printing Technology Deep Dive', () => {
      expect(html).toContain('id="dtf-technology"');
      expect(html).toContain('23-Inch Industrial DTF:');
      expect(html).toContain('Full-Coverage Streetwear Excellence');
      expect(html).toContain('Dual Epson i3200 Industrial Heads');
      expect(html).toContain('60+ Wash Cycle Durability');
      expect(html).toContain('Expanded Gamut: CMYK + White + Fluorescent');
    });

    // 6. WMS Production Flow
    test('renders Section 6: Barcode-Driven 6-Station WMS Production Flow', () => {
      expect(html).toContain('id="wms-production-flow"');
      expect(html).toContain('6-Station Barcode-Verified');
      expect(html).toContain('Production Flow');
      expect(html).toContain('API Intake &amp; Auto-Ganging');
      expect(html).toContain('High-Speed DTF Roll Printing');
      expect(html).toContain('Powder Shaker &amp; Oven Curing');
      expect(html).toContain('Carousel Heat Pressing');
      expect(html).toContain('Optical &amp; Barcode QC Inspection');
      expect(html).toContain('Automated Labeling &amp; Carrier Hand-Off');
    });

    // 7. Pricing Calculator
    test('renders Section 7: Transparent $6 All-In Pricing Breakdown & Calculator', () => {
      expect(html).toContain('id="pricing-calculator"');
      expect(html).toContain('Transparent');
      expect(html).toContain('$6 All-In Base Rate');
      expect(html).toContain('Classic Streetwear Tee (Gildan 5000)');
      expect(html).toContain('Your Retail Selling Price');
      expect(html).toContain('Per-Unit Profitability');
    });

    // 8. TikTok Shop SLA Shield
    test('renders Section 8: TikTok Shop US LDR Shield & Account Health Guardian', () => {
      expect(html).toContain('id="tiktok-sla-shield"');
      expect(html).toContain('TikTok Shop US LDR Shield:');
      expect(html).toContain('Never Risk an Account Strike');
      expect(html).toContain('TikTok Shop Policy Mandate (2026)');
      expect(html).toContain('0.2% LDR (Optimal)');
    });

    // 9. Blanks Catalog
    test('renders Section 9: Premium Blanks Catalog & Technical Specifications', () => {
      expect(html).toContain('id="blanks-catalog"');
      expect(html).toContain('Premium Blanks Catalog &amp;');
      expect(html).toContain('Classic Heavyweight Tee');
      expect(html).toContain('Vintage Garment-Dyed Tee');
      expect(html).toContain('Retail-Fit Unisex Tee');
      expect(html).toContain('Heavy Blend Fleece Hoodie');
      expect(html).toContain('Gildan 5000 / Shaka Wear');
    });

    // 10. Developer API Terminal
    test('renders Section 10: Developer RESTful API & Webhook Terminal', () => {
      expect(html).toContain('id="api-terminal"');
      expect(html).toContain('RESTful API &amp;');
      expect(html).toContain('Event-Driven Webhook');
      expect(html).toContain('/v1/orders/dispatch');
      expect(html).toContain('Carrier Dispatch Callback');
      expect(html).toContain('Real-time Blanks Stock');
    });

    // 11. FAQ Accordion
    test('renders Section 11: SpeedX & POD Production FAQ Accordion', () => {
      expect(html).toContain('id="speedx-faq"');
      expect(html).toContain('SpeedX Technical &amp;');
      expect(html).toContain('Fulfillment Inquiries');
      expect(html).toContain('What file formats do you accept for 23-inch DTF printing?');
      expect(html).toContain('What happens if an order is delayed past the 24-hour guarantee?');
      expect(html).toContain('application/ld+json');
    });

    // 12. Mega CTA & Contact Block
    test('renders Section 12: High-Octane Conversion CTA & Contact Block', () => {
      expect(html).toContain('id="speedx-cta"');
      expect(html).toContain('Stop Losing Money on');
      expect(html).toContain('Print Delays &amp; High RTO.');
      expect(html).toContain('Connect Your Storefront Now');
      expect(html).toContain('contact-block');
      expect(html).toContain('Get Free Consultation');
    });
  });

  describe('Interactive Section Island Accessibility and Mechanics', () => {
    test('AddressDemo renders with live region and sample test cases', () => {
      const demoHtml = renderToStaticMarkup(<AddressDemo />);
      expect(demoHtml).toContain('aria-live="polite"');
      expect(demoHtml).toContain('aria-atomic="true"');
      expect(demoHtml).toContain('Incomplete Zip &amp; Abbreviation');
      expect(demoHtml).toContain('Typo in Street &amp; City');
      expect(demoHtml).toContain('Missing Suite / Unit Number');
    });

    test('PricingCalculator renders live calculation breakdown and net margin elements', () => {
      const calcHtml = renderToStaticMarkup(<PricingCalculator />);
      expect(calcHtml).toContain('aria-live="polite"');
      expect(calcHtml).toContain('Gross Retail Revenue:');
      expect(calcHtml).toContain('(-) E-GEAD All-In Base Rate:');
      expect(calcHtml).toContain('(-) Est. Marketplace Fee (6%):');
      expect(calcHtml).toContain('(-) Est. US Domestic Shipping:');
      expect(calcHtml).toContain('Net Margin');
    });

    test('ApiTerminal tabs reference valid single terminal panel ID', () => {
      const apiHtml = renderToStaticMarkup(<ApiTerminal />);
      expect(apiHtml).toContain('aria-controls="api-terminal-panel"');
      expect(apiHtml).toContain('id="api-terminal-panel"');
      expect(apiHtml).toContain('role="tablist"');
      expect(apiHtml).toContain('role="tabpanel"');
    });

    test('LiveCountdownCard outputs semantic time tag and reduced motion guard', () => {
      const cardHtml = renderToStaticMarkup(<LiveCountdownCard />);
      expect(cardHtml).toContain('<time');
      expect(cardHtml).toContain('motion-reduce:animate-none');
      expect(cardHtml).toContain('TikTok Shop US Compliance');
    });
  });
});
