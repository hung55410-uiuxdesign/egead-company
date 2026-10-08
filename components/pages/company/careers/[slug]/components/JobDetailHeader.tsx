import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MotionHero } from "@/components/MotionSection";

type Props = {
  position: string;
  department: string;
  locationCountry: string;
  jobType: string;
};

export default function JobDetailHeader({
  position,
  department,
  locationCountry,
  jobType,
}: Props) {
  return (
    <MotionHero className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16">
      <Link
        href="/careers"
        className="inline-flex items-center gap-2 text-sm text-[#b3b3b3] hover:text-[#10E774] transition mb-8 group font-medium"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to careers</span>
      </Link>

      <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-medium text-[#D4FAE6] font-montserrat leading-tight mb-6">
        {position}
      </h1>

      <div className="flex flex-wrap items-center gap-2.5">
        <span className="px-3 py-1 rounded bg-[#1C1E24] border border-[#414348] text-[#b3b3b3] text-xs font-semibold uppercase tracking-wider">
          {department}
        </span>
        <span className="px-3 py-1 rounded bg-[#1C1E24] border border-[#414348] text-[#b3b3b3] text-xs font-semibold uppercase tracking-wider">
          {locationCountry}
        </span>
        <span className="px-3 py-1 rounded bg-[#1C1E24] border border-[#414348] text-[#b3b3b3] text-xs font-semibold uppercase tracking-wider">
          {jobType}
        </span>
      </div>
    </MotionHero>
  );
}
