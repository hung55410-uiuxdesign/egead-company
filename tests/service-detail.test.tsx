import { describe, test, expect } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ServiceDetailPage, {
  generateMetadata,
} from '../app/(public)/(services)/services/all-services/[...slug]/page';

describe('Service Detail Page (100% Authentic SAI Digital Match)', () => {
  describe('Page Metadata for Automotive', () => {
    test('generates comprehensive SEO metadata for automotive', async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: ['automotive'] }),
      });
      expect(metadata).toBeDefined();
      expect(metadata.title).toContain('Automotive Solutions');
      expect(metadata.title).toContain('E-GEAD');
      expect(metadata.description).toContain('automotive industry');
      expect(metadata.keywords).toBeArray();
    });
  });

  describe('Automotive Service Page Layout & Sections', () => {
    test('renders Section 1: Hero with back link, title, subtitle, anchors, and visual', async () => {
      const Component = await ServiceDetailPage({
        params: Promise.resolve({ slug: ['automotive'] }),
      });
      const html = renderToStaticMarkup(Component);
      expect(html).toContain('Back to All Services');
      expect(html).toContain('Automotive');
      expect(html).toContain('The automotive industry is rapidly evolving');
      expect(html).toContain('href="#intro"');
      expect(html).toContain('href="#approach"');
      expect(html).toContain('href="#cases"');
      expect(html).toContain('/images/services/industries_automotive.jpg');
    });

    test('renders Section 2: Overview with 2-column layout and bold heading', async () => {
      const Component = await ServiceDetailPage({
        params: Promise.resolve({ slug: ['automotive'] }),
      });
      const html = renderToStaticMarkup(Component);
      expect(html).toContain('id="intro"');
      expect(html).toContain('Automate processes, analyze data, and make predictions');
      expect(html).toContain('AI is more than just a buzzword');
    });

    test('renders Section 3: Middle visual banner image', async () => {
      const Component = await ServiceDetailPage({
        params: Promise.resolve({ slug: ['automotive'] }),
      });
      const html = renderToStaticMarkup(Component);
      expect(html).toContain('/images/services/Btm_Automotive.jpg');
    });

    test('renders Section 4: Our Approach with principles and checkmarks', async () => {
      const Component = await ServiceDetailPage({
        params: Promise.resolve({ slug: ['automotive'] }),
      });
      const html = renderToStaticMarkup(Component);
      expect(html).toContain('id="approach"');
      expect(html).toContain('Our approach');
      expect(html).toContain('Customized solutions');
      expect(html).toContain('Data-driven insights');
      expect(html).toContain('Collaborative approach');
      expect(html).toContain('Continuous improvement');
    });

    test('renders Section 5: Other Industries stack of cards', async () => {
      const Component = await ServiceDetailPage({
        params: Promise.resolve({ slug: ['automotive'] }),
      });
      const html = renderToStaticMarkup(Component);
      expect(html).toContain('id="cases"');
      expect(html).toContain('Other industries');
      expect(html).toContain('Food &amp; Beverages');
      expect(html).toContain('Banking &amp; Insurance');
      expect(html).toContain('Fashion &amp; Lifestyle');
      expect(html).toContain('Consumer Goods');
      expect(html).toContain('/services/all-services/banking-insurance');
      expect(html).toContain('/services/all-services/fashion');
    });

    test('renders Section 6: Contact CTA block', async () => {
      const Component = await ServiceDetailPage({
        params: Promise.resolve({ slug: ['automotive'] }),
      });
      const html = renderToStaticMarkup(Component);
      expect(html).toContain('/contact-us');
    });
  });

  describe('Other Services & Fallback Routing', () => {
    test('renders Banking & Insurance detail page', async () => {
      const Component = await ServiceDetailPage({
        params: Promise.resolve({ slug: ['banking-insurance'] }),
      });
      const html = renderToStaticMarkup(Component);
      expect(html).toContain('Banking &amp; Insurance');
      expect(html).toContain('/images/services/industries_banking.jpg');
      expect(html).toContain('Robust data management');
    });

    test('renders Fashion & Lifestyle detail page', async () => {
      const Component = await ServiceDetailPage({
        params: Promise.resolve({ slug: ['fashion'] }),
      });
      const html = renderToStaticMarkup(Component);
      expect(html).toContain('Fashion &amp; Lifestyle');
      expect(html).toContain('/images/services/industries_fashion.jpg');
      expect(html).toContain('Hybrid model');
    });

    test('renders graceful fallback for arbitrary new service', async () => {
      const Component = await ServiceDetailPage({
        params: Promise.resolve({ slug: ['supply-chain-ai'] }),
      });
      const html = renderToStaticMarkup(Component);
      expect(html).toContain('Supply Chain Ai');
      expect(html).toContain('Our approach');
      expect(html).toContain('Other industries');
    });
  });
});
