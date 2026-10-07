import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';
import NextCaseStudyLink from '@/components/NextCaseStudyLink';
import { getCaseStudyBySlug } from '@/lib/case-studies-data';
import MotionSection, { MotionDiv, MotionHero, MotionCard } from '@/components/MotionSection';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  return {
    title: `${study.title} | Case Study | E-GEAD`,
    description: study.overview.description || study.challengeSolution.challengeTitle,
    openGraph: {
      title: `${study.title} - ${study.customer}`,
      description: study.overview.description || study.challengeSolution.challengeTitle,
      images: [study.bannerImage],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  return (
    <main className="ourwork__detail font-montserrat min-h-screen">
      {/* 1. TOP BREADCRUMB & BACK NAVIGATION */}
      <MotionDiv
        delay={0.05}
        className="pt-4 sm:pt-6 pb-2 px-6 md:px-16 max-w-[1440px] mx-auto"
      >
        <Link
          href="/our-work"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-[#7ceee0] hover:text-[#d3f9f5] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Our Work</span>
        </Link>
      </MotionDiv>

      {/* 2. HEADER BLOCK (Title, Customer, and Glassmorphic Highlight Info Box) */}
      <MotionHero className="ourwork__detail--header">
        <div className="info__container">
          {/* Customer & Main Headline */}
          <div className="info">
            <p className="subtitle">{study.customer}</p>
            <h1 className="title font-montserrat">
              <span className="bg-gradient-to-r from-[#d3f9f5] via-[#a3f7eb] to-[#7ceee0] bg-clip-text text-transparent">
                {study.title}
              </span>
            </h1>
          </div>

          {/* Highlight Spec Table */}
          <div className="highlight shadow-[0_20px_50px_rgba(0,104,117,0.18)]">
            <table>
              <tbody>
                <tr>
                  <td>
                    <span className="title">Industry</span>
                  </td>
                  <td>
                    <span className="content">{study.industry}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="title">Service</span>
                  </td>
                  <td>
                    <span className="content">{study.service}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="title">Tags</span>
                  </td>
                  <td>
                    <span className="content">{study.tags.join(', ')}</span>
                  </td>
                </tr>
                {study.highlight && (
                  <tr>
                    <td>
                      <span className="title">Highlight</span>
                    </td>
                    <td>
                      <span className="content font-semibold text-[#7ceee0]">
                        {study.highlight}
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </MotionHero>

      {/* 3. DETAIL BODY SECTIONS */}
      <div className="ourwork__detail--body">
        {/* Banner Media (Supports Auto-play Video or Crisp Image with rounded borders) */}
        <MotionDiv className="banner-media">
          <div className="media-inner shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
            {study.bannerVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={study.bannerImage}
                className="w-full h-auto max-h-[640px] object-cover"
              >
                <source src={study.bannerVideo} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={study.bannerImage}
                alt={study.title}
                width={1600}
                height={800}
                priority
                className="w-full h-auto max-h-[640px] object-cover"
              />
            )}
          </div>
        </MotionDiv>

        {/* Overview Section */}
        <MotionSection className="overview">
          <span className="subtitle font-montserrat">
            {study.overview.subtitle || 'OVERVIEW'}
          </span>
          <h2 className="title font-montserrat">{study.overview.title}</h2>

          {study.overview.image && (
            <div className="w-full max-w-[1100px] mt-4 rounded-[20px] md:rounded-[32px] overflow-hidden border border-white/10 bg-[#141718] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Image
                src={study.overview.image}
                alt="Strategic overview architecture"
                width={1400}
                height={700}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {study.overview.description && (
            <p className="text-[#b3b3b3] max-w-3xl text-center text-base md:text-lg mt-6 font-light leading-relaxed">
              {study.overview.description}
            </p>
          )}
        </MotionSection>

        {/* Challenge & Solution 2-Column Comparison */}
        <MotionSection className="challenge__solution">
          <div className="challenge">
            <span className="subtitle font-montserrat">CHALLENGE</span>
            <h3 className="title font-montserrat">
              {study.challengeSolution.challengeTitle}
            </h3>
            <p className="content font-montserrat">
              {study.challengeSolution.challengeContent}
            </p>
          </div>

          <div className="solution">
            <span className="subtitle font-montserrat">SOLUTION</span>
            <h3 className="title font-montserrat">
              {study.challengeSolution.solutionTitle}
            </h3>
            <p className="content font-montserrat">
              {study.challengeSolution.solutionContent}
            </p>
          </div>
        </MotionSection>

        {/* Strategic Task Section */}
        <MotionSection className="task">
          <span className="subtitle font-montserrat">
            {study.task.subtitle || 'TASK'}
          </span>
          <h2 className="title font-montserrat">{study.task.title}</h2>

          {/* Side-by-side Task Visuals */}
          {study.task.images && study.task.images.length > 0 && (
            <div className="image_container">
              {study.task.images.map((imgSrc, idx) => (
                <div key={idx} className="task-img-wrapper border border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.4)]">
                  <Image
                    src={imgSrc}
                    alt={`Task illustration ${idx + 1}`}
                    width={700}
                    height={440}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Numbered Strategic Execution Items */}
          <div className="task__list">
            {study.task.taskItems.map((item, idx) => (
              <MotionCard key={idx} index={idx} className="task__item">
                <div className="info">
                  <p className="task-num">0{idx + 1}</p>
                  <h3 className="title font-montserrat">{item.taskTitle}</h3>
                </div>
                <p className="description font-montserrat">{item.description}</p>
              </MotionCard>
            ))}
          </div>
        </MotionSection>

        {/* Next Case Study Link Banner */}
        {study.nextCaseStudy && (
          <MotionDiv className="next-case-study">
            <p className="label font-montserrat">NEXT CASE STUDY</p>
            <NextCaseStudyLink
              href={`/case-studies/${study.nextCaseStudy.slug}`}
              title={study.nextCaseStudy.title}
            />
          </MotionDiv>
        )}
      </div>

      {/* 4. SIGNATURE CONTACT BLOCK */}
      <MotionDiv
        id="contact"
        className="scroll-mt-28"
        threshold={0.15}
      >
        <ContactBlock />
      </MotionDiv>
    </main>
  );
}
