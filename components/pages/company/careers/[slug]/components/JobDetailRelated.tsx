import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import MotionSection, { MotionCard } from "@/components/MotionSection";
import type { JobOpening } from "@/lib/careers";

type Props = {
  relatedJobs: JobOpening[];
};

export default function JobDetailRelated({ relatedJobs }: Props) {
  if (!relatedJobs || relatedJobs.length === 0) {
    return null;
  }

  return (
    <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-medium text-[#D4FAE6] font-montserrat">
          Other Open Positions
        </h2>
        <Link
          href="/careers#job"
          className="text-xs sm:text-sm font-semibold text-[#10E774] hover:underline inline-flex items-center gap-1"
        >
          <span>View all openings</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedJobs.map((r, idx) => (
          <MotionCard
            key={r.slug}
            index={idx}
            className="p-6 rounded-2xl bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition duration-300 flex flex-col justify-between shadow-xl group"
          >
            <div>
              <span className="text-[11px] font-semibold text-[#10E774] uppercase tracking-wider block mb-2 font-montserrat">
                {r.department}
              </span>
              <h3 className="text-lg font-medium text-[#D4FAE6] group-hover:text-[#10E774] transition mb-3 font-montserrat leading-snug">
                {r.position}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-[#10E774]" />
                <span>{r.location}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-light">
                {r.jobType}
              </span>
              <Link
                href={`/careers/${r.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#10E774] group-hover:underline"
              >
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </MotionCard>
        ))}
      </div>
    </MotionSection>
  );
}
