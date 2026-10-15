import MotionSection from "@/components/MotionSection";
import type { CompanySectionModel, CompanyIntroData } from "@/lib/services/company-section.service";

interface CompanyIntroSectionProps {
  section?: CompanySectionModel | null;
}

const DEFAULT_PARAGRAPHS = [
  "With our hybrid operations and technology model, we fuse empathetic creative thinking, robust solution architecture capabilities, marketing abilities, and intelligence to drive operational efficiencies that help businesses scale and evolve rapidly.",
  "Our portfolio spans various verticals—from manufacturing, retail, distribution, and fast-moving consumer goods to custom print-on-demand and apparel—boasting collaborations with ambitious brands and sellers across more than 10 countries.",
  "Headquartered with our primary engineering hub in Buon Ma Thuot, Vietnam, paired with high-volume US fulfillment facilities guaranteeing sub-24h order dispatch, we eliminate 99% of manual fulfillment bottlenecks with automated precision."
];

export default function CompanyIntroSection({ section }: CompanyIntroSectionProps) {
  const introData = (section?.data || {}) as CompanyIntroData;
  const subtitle = section?.subtitle || "End-to-end enterprise commerce solutions";
  const title = section?.title || "We consult Customer Experience transformation across all business functions.";
  const paragraphs = (introData.paragraphs && introData.paragraphs.length > 0)
    ? introData.paragraphs
    : DEFAULT_PARAGRAPHS;

  return (
    <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-6 space-y-4">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] font-montserrat">
            {subtitle}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-[#D4FAE6] font-montserrat leading-[1.25]">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-6 space-y-6 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

