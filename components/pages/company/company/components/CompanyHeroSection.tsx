import { MotionHero, MotionDiv } from "@/components/MotionSection";
import type { CompanySectionModel, CompanyHeroData } from "@/lib/services/company-section.service";

interface CompanyHeroSectionProps {
  section?: CompanySectionModel | null;
}

export default function CompanyHeroSection({ section }: CompanyHeroSectionProps) {
  const data: CompanyHeroData = section?.data || {};

  const subtitle = section?.subtitle || data.subtitle || "Our Values";
  const titlePart1 = data.titlePart1 || "Transform today,";
  const titlePart2 = data.titlePart2 || "lead tomorrow.";
  const image = data.image || "/assets/Rectangle_539.jpg";
  const badgeText = data.badgeText || "Buon Ma Thuot HQ & US Fulfillment Network";
  const alt = data.alt || "E-GEAD Global Transformation";

  return (
    <>
      <MotionHero className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 pt-6 pb-12 sm:pb-16">
        <div className="w-full">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
            {subtitle}
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-medium leading-[1.15] font-montserrat text-[#D4FAE6]">
            <span className="block">{titlePart1}</span>
            <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-[#E0FCF4] bg-clip-text text-transparent block font-medium">
              {titlePart2}
            </span>
          </h1>
        </div>
      </MotionHero>
      <MotionDiv className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/10 shadow-2xl h-[360px] sm:h-[500px] lg:h-[620px]">
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0E]/80 via-transparent to-transparent pointer-events-none" />
          {badgeText && (
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 flex items-center gap-3">
              <span className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 font-montserrat text-xs text-white">
                {badgeText}
              </span>
            </div>
          )}
        </div>
      </MotionDiv>
    </>
  );
}
