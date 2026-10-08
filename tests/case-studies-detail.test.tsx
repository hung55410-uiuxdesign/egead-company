import React from 'react';
import { describe, it, expect } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import CaseStudyDetailPage, { generateMetadata } from '@/app/(public)/(work)/case-studies/[slug]/page';
import { getCaseStudyBySlug, CASE_STUDIES_DETAILS } from '@/lib/case-studies-data';

describe('Case Study Detail Page - SAI Digital UI Fidelity', () => {
  const targetSlug = 'harnessing-data-for-streamlined-business-processes-and-decisions';

  it('retrieves authentic JSR case study data by exact slug', () => {
    const study = getCaseStudyBySlug(targetSlug);
    expect(study).toBeDefined();
    expect(study.slug).toBe(targetSlug);
    expect(study.customer).toContain('Japanese advanced materials');
    expect(study.title).toContain('Unleashing the power of data');
    expect(study.highlight).toBe('Deployment of 48 Business Sites');
    expect(study.tags).toContain('MARKETING');
    expect(study.tags).toContain('TECHNOLOGY');
    expect(study.task.taskItems.length).toBe(4);
  });

  it('supports alias by short ID jsr-materials', () => {
    const study = getCaseStudyBySlug('jsr-materials');
    expect(study).toBeDefined();
    expect(study.slug).toBe(targetSlug);
    expect(study.highlight).toBe('Deployment of 48 Business Sites');
  });

  it('generates rich SEO metadata with title and OpenGraph', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: targetSlug }),
    });

    expect(metadata.title).toContain('Unleashing the power of data');
    expect(metadata.openGraph?.title).toContain('Japanese advanced materials');
    expect(metadata.openGraph?.images).toBeDefined();
  });

  it('renders the 100% SAI Digital layout structure', async () => {
    const pageHtml = renderToStaticMarkup(
      await CaseStudyDetailPage({
        params: Promise.resolve({ slug: targetSlug }),
      })
    );

    // 1. Root container and header
    expect(pageHtml).toContain('ourwork__detail');
    expect(pageHtml).toContain('ourwork__detail--header');
    expect(pageHtml).toContain('info__container');
    expect(pageHtml).toContain('highlight');

    // 2. Customer and Title
    expect(pageHtml).toContain('A leading Japanese advanced materials manufacturer');
    expect(pageHtml).toContain('Unleashing the power of data to streamline business processes');

    // 3. Highlight Table
    expect(pageHtml).toContain('Industry');
    expect(pageHtml).toContain('Engineering/Manufacturing');
    expect(pageHtml).toContain('Service');
    expect(pageHtml).toContain('Technology');
    expect(pageHtml).toContain('Deployment of 48 Business Sites');

    // 4. Banner Media
    expect(pageHtml).toContain('banner-media');
    expect(pageHtml).toContain('media-inner');

    // 5. Overview Section
    expect(pageHtml).toContain('overview');
    expect(pageHtml).toContain('Optimizing operational efficiency using custom digital solutions');

    // 6. Challenge & Solution 2-column
    expect(pageHtml).toContain('challenge__solution');
    expect(pageHtml).toContain('CHALLENGE');
    expect(pageHtml).toContain('Uncertain sales pipelines and fragmented data impede global expansion');
    expect(pageHtml).toContain('SOLUTION');
    expect(pageHtml).toContain('Improved data sharing aids strategic, lifecycle-driven business decisions');

    // 7. Task section and items
    expect(pageHtml).toContain('task');
    expect(pageHtml).toContain('Leveraging the power of data to deliver an incomparable business experience');
    expect(pageHtml).toContain('image_container');
    expect(pageHtml).toContain('task__list');
    expect(pageHtml).toContain('Accelerating precision in information sharing');
    expect(pageHtml).toContain('Boosting business process visibility');
    expect(pageHtml).toContain('Securing long-term competitive advantage');
    expect(pageHtml).toContain('Aligning operations with financial objectives');

    // 8. Next Case Study
    expect(pageHtml).toContain('next-case-study');
    expect(pageHtml).toContain('NEXT CASE STUDY');

    // 9. Contact Block
    expect(pageHtml).toContain('id="contact"');
  });

  it('renders gracefully for arbitrary unknown slugs without throwing error', async () => {
    const pageHtml = renderToStaticMarkup(
      await CaseStudyDetailPage({
        params: Promise.resolve({ slug: 'custom-client-transformation' }),
      })
    );

    expect(pageHtml).toContain('ourwork__detail');
    expect(pageHtml).toContain('Custom Client Transformation');
    expect(pageHtml).toContain('CHALLENGE');
    expect(pageHtml).toContain('SOLUTION');
    expect(pageHtml).toContain('TASK');
  });
});
