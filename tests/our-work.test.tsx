import { describe, test, expect } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import OurWorkPage, { metadata } from '../app/(public)/our-work/page';
import { CASE_STUDIES, SERVICE_OPTIONS, INDUSTRY_OPTIONS } from '../components/OurWorkClient';

describe('Our Work Page 100% SAI Digital Fidelity Verification', () => {
  const html = renderToStaticMarkup(<OurWorkPage />);

  describe('Page Metadata', () => {
    test('contains comprehensive SEO title, description, and keywords', () => {
      expect(metadata).toBeDefined();
      expect(metadata.title).toContain('Explore Our Innovative Projects and Success Stories');
      expect(metadata.description).toContain('Discover our innovative projects and success stories');
      expect(metadata.keywords).toBeDefined();
      const keywords = metadata.keywords as string[];
      expect(keywords).toBeArray();
      expect(keywords.length).toBeGreaterThanOrEqual(5);
      expect(keywords).toContain('ecommerce case studies');
      expect(keywords).toContain('tiktok shop us success story');
      expect(keywords).toContain('pod fulfillment case study');
      expect(keywords).toContain('cross-border scaling results');
      expect(keywords).toContain('sub 24h dispatch SLA proof');
    });
  });

  describe('SAI Digital Signature Sections 100% Present and Rendered', () => {
    // 1. Header Top
    test('renders Section 1: Header Top with Our Work subtitle and Impactful Experiences title', () => {
      expect(html).toContain('id="ourwork__header"');
      expect(html).toContain('Our Work');
      expect(html).toContain('Impactful Experiences');
      expect(html).toContain('Strategy to Deployment.');
    });

    // 2. Interactive Filter Bar
    test('renders Section 2: Interactive Filter Bar matching SAI Digital with Service & Industry selectors', () => {
      expect(html).toContain('id="case-study-filters"');
      expect(html).toContain('id="service-filter"');
      expect(html).toContain('id="industry-filter"');
      expect(html).toContain('All Services');
      expect(html).toContain('Technology');
      expect(html).toContain('Marketing');
      expect(html).toContain('Creative');
      expect(html).toContain('Experience');
      expect(html).toContain('All Industries');
      expect(html).toContain('Engineering/Manufacturing');
      expect(html).toContain('Consumer Goods');
      expect(html).toContain('Fashion &amp; Lifestyle');
      expect(html).toContain('Showing');
      expect(html).toContain('Results');
    });

    // 3. 2-Column Case Studies Grid
    test('renders Section 3: Signature 2-Column Projects Showcase Grid', () => {
      expect(html).toContain('id="case-studies-grid"');
      expect(html).toContain('ourwork__body');
      expect(html).toContain('ourwork__item');

      // Key representative case studies
      expect(html).toContain('UrbanVibe Apparel');
      expect(html).toContain('Unleashing the power of data to streamline business processes and decision making.');
      expect(html).toContain('A 150% increase in customer acquisition with omnichannel digital experience.');
      expect(html).toContain('Scaling ad spend from $5,000 to $25,000/day with unit economics assurance.');
      expect(html).toContain('Digitizing a B2B legacy across 14 markets.');
      expect(html).toContain('Multi-channel experience and optimized customer engagement.');
      expect(html).toContain('Zero overselling incidents across 4 channels during peak holiday rush.');
      expect(html).toContain('SAP Marketing Cloud revolutionizes international connector operations.');
    });

    // 4. Contact Block at bottom
    test('renders Section 4: Signature Contact Block at bottom', () => {
      expect(html).toContain('id="contact"');
      expect(html).toContain('contact-block');
      expect(html).toContain('Get Free Consultation');
    });
  });

  describe('Data and Filter Options Contract Verification', () => {
    test('CASE_STUDIES dataset has valid items with tags, industries, services and images', () => {
      expect(CASE_STUDIES.length).toBeGreaterThanOrEqual(10);
      CASE_STUDIES.forEach((study) => {
        expect(study.id).toBeDefined();
        expect(study.title).toBeDefined();
        expect(study.customer).toBeDefined();
        expect(study.description).toBeDefined();
        expect(study.image).toBeDefined();
        expect(study.services).toBeArray();
        expect(study.industries).toBeArray();
        expect(study.tags).toBeArray();
      });
    });

    test('SERVICE_OPTIONS and INDUSTRY_OPTIONS provide full category coverage', () => {
      expect(SERVICE_OPTIONS).toContain('All Services');
      expect(SERVICE_OPTIONS).toContain('Technology');
      expect(SERVICE_OPTIONS).toContain('Marketing');

      expect(INDUSTRY_OPTIONS).toContain('All Industries');
      expect(INDUSTRY_OPTIONS).toContain('Engineering/Manufacturing');
      expect(INDUSTRY_OPTIONS).toContain('Consumer Goods');
      expect(INDUSTRY_OPTIONS).toContain('Fashion & Lifestyle');
    });
  });
});
