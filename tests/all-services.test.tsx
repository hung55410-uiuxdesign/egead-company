import { describe, test, expect } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import AllServicesPage, { metadata } from '../app/services/all-services/page';

describe('Phase 2 All Services Page Verification', () => {
  const html = renderToStaticMarkup(<AllServicesPage />);

  describe('Page Metadata', () => {
    test('contains comprehensive SEO title, description, and keywords', () => {
      expect(metadata).toBeDefined();
      expect(metadata.title).toContain('All Services & Capabilities');
      expect(metadata.title).toContain('E-GEAD');
      expect(metadata.description).toContain('Sub-24H US POD fulfillment');
      expect(metadata.keywords).toBeDefined();
      const keywords = metadata.keywords as string[];
      expect(keywords).toBeArray();
      expect(keywords.length).toBeGreaterThanOrEqual(5);
      expect(keywords).toContain('end-to-end ecommerce operations');
      expect(keywords).toContain('US POD fulfillment 24 hours');
      expect(keywords).toContain('TikTok Shop US compliant fulfillment');
    });
  });

  describe('All 11 Dedicated Sections Present and Rendered', () => {
    // 1. Hero Section
    test('renders Section 1: Hero with live dispatch HUD, ticker, and CTAs', () => {
      expect(html).toContain('id="services-hero"');
      expect(html).toContain('AUTOMATE OPERATIONS.');
      expect(html).toContain('SCALE');
      expect(html).toContain('GLOBAL COMMERCE.');
      expect(html).toContain('Live System: 10,000+ Daily Dispatches');
      expect(html).toContain('Live Dispatch HUD');
      expect(html).toContain('12,480 Units');
      expect(html).toContain('TikTok Shop LDR Status');
      expect(html).toContain('Safe Shield');
      expect(html).toContain('Active Production Facilities');
      expect(html).toContain('Explore Solutions Matrix');
      expect(html).toContain('Request Operations Audit');
    });

    // 2. Metrics Ribbon
    test('renders Section 2: Global Operations Metrics Ribbon with core KPIs', () => {
      expect(html).toContain('id="operations-metrics"');
      expect(html).toContain('Enterprise Performance');
      expect(html).toContain('Backed by Proven Operating Benchmarks');
      expect(html).toContain('&lt; 24h');
      expect(html).toContain('Average US Fulfillment SLA');
      expect(html).toContain('99.9%');
      expect(html).toContain('Barcode WMS Accuracy');
      expect(html).toContain('4.8x');
      expect(html).toContain('Average Blended ROAS');
      expect(html).toContain('$6 All-in');
      expect(html).toContain('Transparent Unit Base Rate');
      expect(html).toContain('No Hidden Fees');
    });

    // 3. Role Solutions
    test('renders Section 3: Interactive Role-Based Solutions Switcher', () => {
      expect(html).toContain('id="solutions-by-role"');
      expect(html).toContain('Tailored Ecosystem Solutions');
      expect(html).toContain('Your Exact Business Model');
      expect(html).toContain('role="tablist"');
      expect(html).toContain('role="tab"');
      expect(html).toContain('role="tabpanel"');
      expect(html).toContain('POD &amp; Marketplace Sellers');
      expect(html).toContain('DTC &amp; Omnichannel Brands');
      expect(html).toContain('Media Buyers &amp; Growth Marketers');
      expect(html).toContain('Technical Teams &amp; Developers');
      expect(html).toContain('Sub-24H Dispatch SLA &amp; TikTok Shop Compliance');
      expect(html).toContain('Explore SpeedX POD Engine');
      expect(html).toContain('Sub-24H SLA');
      expect(html).toContain('Zero Stockouts');
      expect(html).toContain('4.8x ROAS');
      expect(html).toContain('API-First');
    });

    // 4. Bento Pillars
    test('renders Section 4: The 6 Service Pillars Bento Grid Deep Dive', () => {
      expect(html).toContain('id="core-services-grid"');
      expect(html).toContain('Complete Capabilities Portfolio');
      expect(html).toContain('Complete Operational Spectrum');
      expect(html).toContain('01. Sales Automation');
      expect(html).toContain('02. POD Marketplace Integration');
      expect(html).toContain('03. Fulfillment Automation');
      expect(html).toContain('04. E-Commerce Platform');
      expect(html).toContain('05. Website &amp; Cloud Hosting');
      expect(html).toContain('06. Digital Advertising Services');
      expect(html).toContain('Learn About Order Sync');
      expect(html).toContain('Discover SpeedX POD');
      expect(html).toContain('Book Strategy Audit');
    });

    // 5. Workflow Timeline
    test('renders Section 5: End-to-End Automated Workflow Pipeline', () => {
      expect(html).toContain('id="workflow-pipeline"');
      expect(html).toContain('The Order Journey');
      expect(html).toContain('US Porch Delivery');
      expect(html).toContain('Order Ingestion');
      expect(html).toContain('AI Sanitization &amp; Verification');
      expect(html).toContain('Automated DTF Production');
      expect(html).toContain('Barcode QC &amp; Scan Injection');
      expect(html).toContain('Domestic Delivery Handshake');
      expect(html).toContain('Step 01');
      expect(html).toContain('Step 02');
      expect(html).toContain('Step 03');
      expect(html).toContain('Step 04');
      expect(html).toContain('Step 05');
      expect(html).toContain('Industrial DTF');
      expect(html).toContain('2-4 Days Domestic US Transit');
    });

    // 6. Comparison Table
    test('renders Section 6: Head-to-Head Comparison: E-GEAD vs Traditional 3PL', () => {
      expect(html).toContain('id="comparison-matrix"');
      expect(html).toContain('Head-to-Head Comparison');
      expect(html).toContain('Why Modern Sellers Switch from');
      expect(html).toContain('Legacy 3PL Vendors');
      expect(html).toContain('E-GEAD Ecosystem');
      expect(html).toContain('AI Precision &amp; Sub-24H US POD');
      expect(html).toContain('Legacy 3PL / Print Vendors');
      expect(html).toContain('Batch Manual Processing');
      expect(html).toContain('Fulfillment &amp; Carrier Dispatch Speed');
      expect(html).toContain('Print Format &amp; Garment Versatility');
      expect(html).toContain('Address Normalization &amp; RTO Prevention');
      expect(html).toContain('Multi-Channel Inventory Synchronization');
      expect(html).toContain('Pricing Model &amp; Cost Predictability');
      expect(html).toContain('Financial &amp; Net Margin Reporting');
      expect(html).toContain('&lt; 24 Hours dispatch guarantee');
      expect(html).toContain('3-5 Business Days');
      expect(html).toContain('$6 Flat All-In per unit base rate');
    });

    // 7. Margin Simulator
    test('renders Section 7: Interactive Fulfillment & Margin Simulator', () => {
      expect(html).toContain('id="margin-simulator"');
      expect(html).toContain('ROI &amp; Efficiency Simulator');
      expect(html).toContain('Estimate Your');
      expect(html).toContain('Operational Freedom');
      expect(html).toContain('Primary Sales Channel');
      expect(html).toContain('TikTok Shop US');
      expect(html).toContain('Amazon FBM');
      expect(html).toContain('Etsy Global');
      expect(html).toContain('Shopify DTC');
      expect(html).toContain('Monthly Order Volume');
      expect(html).toContain('orders/mo');
      expect(html).toContain('Verified Benchmark');
      expect(html).toContain('Monthly Efficiency Metrics');
      expect(html).toContain('Time Saved');
      expect(html).toContain('RTO Avoided');
      expect(html).toContain('Late Dispatch');
    });

    // 8. SLA Badges
    test('renders Section 8: Enterprise SLA Protection & Compliance Badges', () => {
      expect(html).toContain('id="sla-compliance"');
      expect(html).toContain('Account Safety &amp; SLAs');
      expect(html).toContain('Enterprise SLA Protection &amp; Compliance Badges');
      expect(html).toContain('TikTok Shop US LDR Shield');
      expect(html).toContain('Amazon FBM VTR Guarantee');
      expect(html).toContain('Bank-Grade Data Privacy');
      expect(html).toContain('99.9% Uptime Cloud SLA');
      expect(html).toContain('AES-256 encryption');
      expect(html).toContain('Cloudflare Edge');
    });

    // 9. Client Spotlight
    test('renders Section 9: Featured Client Transformation Spotlight', () => {
      expect(html).toContain('id="client-spotlight"');
      expect(html).toContain('Case Study Spotlight');
      expect(html).toContain('UrbanVibe Apparel');
      expect(html).toContain('4.2% LDR (Order Limit Strike)');
      expect(html).toContain('0.2% LDR (Sub-24H Dispatch)');
      expect(html).toContain('+180% ($420,000 GMV)');
      expect(html).toContain('E-GEAD eliminated our sleepless nights');
      expect(html).toContain('Marcus Vance');
      expect(html).toContain('Founder &amp; CEO, UrbanVibe Apparel');
      expect(html).toContain('Read Full Client Transformation Case Study');
    });

    // 10. Categorized FAQ Accordion
    test('renders Section 10: Categorized FAQ Accordion with JSON-LD Schema', () => {
      expect(html).toContain('id="services-faq"');
      expect(html).toContain('Frequently Answered Inquiries');
      expect(html).toContain('Got Questions?');
      expect(html).toContain('We Have Answers.');
      expect(html).toContain('Operations &amp; SLA');
      expect(html).toContain('Integrations &amp; API');
      expect(html).toContain('Pricing &amp; Economics');
      expect(html).toContain('Growth &amp; Ads');
      expect(html).toContain('How quickly does E-GEAD dispatch US print-on-demand orders?');
      expect(html).toContain('Can E-GEAD integrate with our existing custom ERP or Shopify store?');
      expect(html).toContain('What is included in the $6 all-in unit rate?');
      expect(html).toContain('How does E-GEAD safeguard our TikTok Shop seller account health?');
      expect(html).toContain('What advertising channels does your digital growth team manage?');
      expect(html).toContain('Is there any minimum order quantity (MOQ) to get started with E-GEAD?');
      expect(html).toContain('application/ld+json');
      expect(html).toContain('FAQPage');
    });

    // 11. Conversion Mega CTA
    test('renders Section 11: High-Velocity Conversion Mega CTA', () => {
      expect(html).toContain('id="services-cta"');
      expect(html).toContain('Scale Without Limits');
      expect(html).toContain('Ready to Automate Operations &amp;');
      expect(html).toContain('Dominate Global Commerce?');
      expect(html).toContain('Schedule Operations Consultation');
      expect(html).toContain('Explore SpeedX Tech Specs');
      expect(html).toContain('Zero Setup Fees');
      expect(html).toContain('14-Day Free API Sandbox');
      expect(html).toContain('Dedicated Account Architect');
    });

    // Global Contact Block Check
    test('renders ContactBlock component at the base of the page', () => {
      expect(html).toContain('contact-block');
      expect(html).toContain('Let&#x27;s');
      expect(html).toContain('automate');
      expect(html).toContain('e-commerce operations.');
      expect(html).toContain('Get Free Consultation');
    });
  });
});
