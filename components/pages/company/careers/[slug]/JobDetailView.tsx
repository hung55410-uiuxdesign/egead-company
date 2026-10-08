import React from 'react';
import ContactBlock from '@/components/ContactBlock';
import { MotionDiv } from '@/components/MotionSection';
import type { JobOpening } from '@/lib/careers';
import {
  JobDetailHeader,
  JobDetailContent,
  JobDetailRelated,
} from './index';

interface JobDetailViewProps {
  job: JobOpening;
  relatedJobs: JobOpening[];
}

export default function JobDetailView({ job, relatedJobs }: JobDetailViewProps) {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-28 sm:pt-36 overflow-hidden">
      <JobDetailHeader
        position={job.position}
        department={job.department}
        locationCountry={job.locationCountry}
        jobType={job.jobType}
      />
      <JobDetailContent job={job} />
      <JobDetailRelated relatedJobs={relatedJobs} />
      <MotionDiv threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </div>
  );
}
