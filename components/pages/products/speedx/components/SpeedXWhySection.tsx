import Image from 'next/image';
import { MotionDiv, MotionCard } from '@/components/MotionSection';

export default function SpeedXWhySection() {
  return (
    <MotionDiv className="why-speedx relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-28">
      {/* Top Info */}
      <div className="top-info flex flex-col items-center text-center mb-16 lg:mb-20">
        <div className="why-speedx-subtitle mb-6">
          <span>WHY SPEEDX?</span>
        </div>

        <div className="why-speedx-title mx-auto">
          <p className="text-xl sm:text-2xl lg:text-[26px] leading-relaxed text-white font-normal">
            Sales teams struggle with lengthy CRM setups, complex customizations, and slow adoption, reducing productivity &amp; driving up costs.
          </p>
        </div>

        {/* Kinetic Typography - present in DOM for SEO/test suite */}
        <div className="why-speedx-text" aria-hidden="true">
          <div>
            <p><span>A</span><span>C</span><span>H</span><span>I</span><span>E</span><span>V</span><span>E</span></p>
            <p><span>C</span><span>R</span><span>M</span></p>
            <p><span>E</span><span>X</span><span>C</span><span>E</span><span>L</span><span>L</span><span>E</span><span>N</span><span>C</span><span>E</span></p>
            <p><span>I</span><span>N</span></p>
            <p><span>J</span><span>U</span><span>S</span><span>T</span></p>
            <p><span>9</span><span>8</span></p>
            <p><span>D</span><span>A</span><span>Y</span><span>S</span></p>
            <p><span>W</span><span>I</span><span>T</span><span>H</span></p>
            <p><span>S</span><span>P</span><span>E</span><span>E</span><span>D</span><span>X</span><span>​</span></p>
          </div>
        </div>
      </div>

      {/* Bottom Info: 3 Metric Cards */}
      <div className="bottom-info flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-[65px]">
        {/* Card 1 */}
        <MotionCard index={0} className="wsb-block1 wsb-block w-full md:w-1/3 hover:scale-[1.03] transition-transform duration-300">
          <div className="wsb-block-img">
            <Image
              src="/assets/speedx/metric-productivity.png"
              alt="35% Increase in Sale Productivity"
              width={396}
              height={405}
              unoptimized
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="wsb-block-text">
            <div className="wsb-block-text-inner text-center">
              <span className="wsb-block-text1">35% Increase </span>
              <span className="wsb-block-text2">in Sale Productivity</span>
            </div>
          </div>
        </MotionCard>

        {/* Card 2 */}
        <MotionCard index={1} className="wsb-block2 wsb-block w-full md:w-1/3 hover:scale-[1.03] transition-transform duration-300">
          <div className="wsb-block-img">
            <Image
              src="/assets/speedx/metric-cycle-length.png"
              alt="30% Reduction in Sale Cycle Length"
              width={396}
              height={405}
              unoptimized
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="wsb-block-text">
            <div className="wsb-block-text-inner text-center">
              <span className="wsb-block-text1">30% Reduction </span>
              <span className="wsb-block-text2">in Sale Cycle Length</span>
            </div>
          </div>
        </MotionCard>

        {/* Card 3 */}
        <MotionCard index={2} className="wsb-block3 wsb-block w-full md:w-1/3 hover:scale-[1.03] transition-transform duration-300">
          <div className="wsb-block-img">
            <Image
              src="/assets/speedx/metric-conversion.png"
              alt="25% Higher Lead Conversion Rate"
              width={396}
              height={405}
              unoptimized
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="wsb-block-text">
            <div className="wsb-block-text-inner text-center">
              <span className="wsb-block-text1">25% Higher </span>
              <span className="wsb-block-text2">Lead Conversion Rate</span>
            </div>
          </div>
        </MotionCard>
      </div>
    </MotionDiv>
  );
}
