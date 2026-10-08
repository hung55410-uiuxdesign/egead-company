import Link from 'next/link';
import MotionSection, { MotionCard } from '@/components/MotionSection';

export default function CompanyPortalsSection() {
  return (
    <>
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32">
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/10 shadow-2xl h-[320px] sm:h-[460px] lg:h-[580px]">
          <img
            src="/assets/company.png"
            alt="E-GEAD People and Technology Hub"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        </div>
      </MotionSection>
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28 sm:mb-36">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <MotionCard index={0} className="group p-8 sm:p-12 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[380px] shadow-2xl hover:shadow-[0_20px_40px_rgba(16,231,116,0.12)]">
            <div>
              <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
                Our People
              </p>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8">
                <img
                  src="/assets/icon31.svg"
                  alt="Our people icon"
                  className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src="/assets/icon32.svg"
                  alt="Our people hover icon"
                  className="w-full h-full object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] mb-6 font-montserrat leading-snug">
                Meet the people behind your success.
              </h3>
            </div>

            <div>
              <Link
                href="/people"
                className="group/btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-[#10E774] transition-all duration-300"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-black group-hover/btn:rotate-45 transition-transform duration-300"
                >
                  <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                </svg>
                <span>Our people</span>
              </Link>
            </div>
          </MotionCard>
          <MotionCard index={1} className="group p-8 sm:p-12 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[380px] shadow-2xl hover:shadow-[0_20px_40px_rgba(16,231,116,0.12)]">
            <div>
              <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
                Job Opportunities
              </p>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8">
                <img
                  src="/assets/Name_Job_Opportunities__Color_BnW.svg"
                  alt="Job opportunities icon"
                  className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src="/assets/Name_Job_Opportunities__Color_Colorful.svg"
                  alt="Job opportunities colorful hover"
                  className="w-full h-full object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] mb-6 font-montserrat leading-snug">
                Be a Part of our wonderful team.
              </h3>
            </div>

            <div>
              <Link
                href="/careers"
                className="group/btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-[#10E774] transition-all duration-300"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-black group-hover/btn:rotate-45 transition-transform duration-300"
                >
                  <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                </svg>
                <span>Careers</span>
              </Link>
            </div>
          </MotionCard>
        </div>
      </MotionSection>
    </>
  );
}
