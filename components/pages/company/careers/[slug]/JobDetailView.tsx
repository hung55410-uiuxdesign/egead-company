'use client';

import React from 'react';
import type { JobOpening } from '@/lib/careers';
import type { CareerSibling } from '@/types/career';
import {
  JobDetailHeader,
  JobDetailContent,
  JobDetailRelated,
} from './index';

interface JobDetailViewProps {
  job: JobOpening;
  relatedJobs: JobOpening[];
  siblings?: CareerSibling[];
}

export default function JobDetailView({
  job,
  relatedJobs,
  siblings = [],
}: JobDetailViewProps) {
  return (
    <div
      lang={job.locale || 'en'}
      className="w-full bg-white text-slate-900 min-h-screen relative selection:bg-slate-900 selection:text-white"
    >
      {/* Top subtle dark gradient shield so fixed white header navigation remains crisp before scrolling */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-28 sm:h-32 bg-gradient-to-b from-[#0A0D0E]/85 via-[#0A0D0E]/45 to-transparent pointer-events-none z-40 transition-opacity duration-300"
      />

      {/* Main Page Content */}
      <main className="w-full pt-28 sm:pt-36 pb-16">
        <JobDetailHeader
          position={job.position}
          department={job.department}
          locationCountry={job.locationCountry}
          jobType={job.jobType}
          salary={job.salary}
          experience={job.experience}
          job={job}
          siblings={siblings}
        />
        <JobDetailContent job={job} />
        <JobDetailRelated relatedJobs={relatedJobs} />
      </main>
    </div>
  );
}
