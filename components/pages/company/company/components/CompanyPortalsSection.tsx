import Link from 'next/link';
import MotionSection, { MotionCard } from '@/components/MotionSection';
import type { CompanySectionModel, CompanyPortalsData } from '@/lib/services/company-section.service';

interface CompanyPortalsSectionProps {
  section?: CompanySectionModel | null;
}

export default function CompanyPortalsSection({ section }: CompanyPortalsSectionProps) {
  const portalData = (section?.data || {}) as CompanyPortalsData;

  const bannerImage = portalData.bannerImage || '/assets/company.png';
  const bannerAlt = portalData.bannerAlt || 'E-GEAD People and Technology Hub';

  const people = portalData.peopleCard || {
    subtitle: 'Our People',
    title: 'Meet the people behind your success.',
    icon: '/assets/icon31.svg',
    hoverIcon: '/assets/icon32.svg',
    buttonText: 'Our people',
    buttonHref: '/people',
  };

  const careers = portalData.careersCard || {
    subtitle: 'Job Opportunities',
    title: 'Be a Part of our wonderful team.',
    icon: '/assets/Name_Job_Opportunities__Color_BnW.svg',
    hoverIcon: '/assets/Name_Job_Opportunities__Color_Colorful.svg',
    buttonText: 'Careers',
    buttonHref: '/careers',
  };

  return (
    <>
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32">
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/10 shadow-2xl">
          <img
            src={bannerImage}
            alt={bannerAlt}
            className="w-full h-auto block"
          />
        </div>
      </MotionSection>
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28 sm:mb-36">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <MotionCard index={0} className="group p-8 sm:p-12 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[380px] shadow-2xl hover:shadow-[0_20px_40px_rgba(16,231,116,0.12)]">
            <div>
              <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
                {people.subtitle}
              </p>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8">
                <img
                  src={people.icon}
                  alt={people.title}
                  className={`w-full h-full object-contain transition-opacity duration-300 ${people.hoverIcon ? 'group-hover:opacity-0' : ''}`}
                />
                {people.hoverIcon && (
                  <img
                    src={people.hoverIcon}
                    alt={`${people.title} hover`}
                    className="w-full h-full object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] mb-6 font-montserrat leading-snug">
                {people.title}
              </h3>
            </div>

            <div>
              <Link
                href={people.buttonHref || '/people'}
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
                <span>{people.buttonText}</span>
              </Link>
            </div>
          </MotionCard>
          <MotionCard index={1} className="group p-8 sm:p-12 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[380px] shadow-2xl hover:shadow-[0_20px_40px_rgba(16,231,116,0.12)]">
            <div>
              <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
                {careers.subtitle}
              </p>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8">
                <img
                  src={careers.icon}
                  alt={careers.title}
                  className={`w-full h-full object-contain transition-opacity duration-300 ${careers.hoverIcon ? 'group-hover:opacity-0' : ''}`}
                />
                {careers.hoverIcon && (
                  <img
                    src={careers.hoverIcon}
                    alt={`${careers.title} hover`}
                    className="w-full h-full object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] mb-6 font-montserrat leading-snug">
                {careers.title}
              </h3>
            </div>

            <div>
              <Link
                href={careers.buttonHref || '/careers'}
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
                <span>{careers.buttonText}</span>
              </Link>
            </div>
          </MotionCard>
        </div>
      </MotionSection>
    </>
  );
}

