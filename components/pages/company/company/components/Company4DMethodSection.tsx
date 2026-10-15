import MotionSection from '@/components/MotionSection';
import type { CompanySectionModel, Company4DMethodData } from '@/lib/services/company-section.service';
import Company4DMethodDiagram from './Company4DMethodDiagram';

interface Company4DMethodSectionProps {
  section?: CompanySectionModel | null;
}

export default function Company4DMethodSection({ section }: Company4DMethodSectionProps) {
  const methodData = (section?.data || {}) as Company4DMethodData;
  const subtitle = section?.subtitle || 'Our 4D Method';
  const title = section?.title || 'End-to-end innovative and forward-thinking solutions to make digital commerce simpler to navigate.';

  return (
    <MotionSection id="our-4d-method" className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32">
      <div className="w-full mb-8 sm:mb-12">
        <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
          {subtitle}
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
          {title}
        </h2>
      </div>

      <Company4DMethodDiagram steps={methodData.steps} isInteractive={true} />
    </MotionSection>
  );
}

