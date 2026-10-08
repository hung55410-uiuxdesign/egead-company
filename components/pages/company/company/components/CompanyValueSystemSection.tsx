import MotionSection, { MotionCard } from '@/components/MotionSection';

const VALUES = [
  {
    number: '01',
    icon: '/assets/icon1.png',
    title: 'Outperforming expectations.',
    description:
      'Our rigorous Project Excellence Assurance methodology (PEA) and sub-24h US fulfillment ensure order delivery within committed timelines, maintaining flawless marketplace SLA metrics.',
  },
  {
    number: '02',
    icon: '/assets/Icon_2.svg',
    title: 'Breaking new grounds.',
    description:
      'Our relentless focus leveraging AI address normalization, multi-channel catalog orchestration, and barcode WMS builds the fastest, most reliable path to market.',
  },
  {
    number: '03',
    icon: '/assets/Icon_3.svg',
    title: 'Giving back.',
    description:
      'Our focus is on building an exemplary engineering culture in Buon Ma Thuot that emphasizes diversity, software talent development, and transparent equal opportunity empowerment.',
  },
];

export default function CompanyValueSystemSection() {
  return (
    <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32">
      <div className="w-full mb-12 sm:mb-16">
        <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
          Value System
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
          We believe in building transformative experiences to empower individuals, businesses and communities.
        </h2>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {VALUES.map((val, idx) => (
          <MotionCard
            key={val.number}
            index={idx}
            className="group p-8 sm:p-10 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[360px] shadow-xl hover:shadow-[0_20px_40px_rgba(16,231,116,0.12)]"
          >
            <div>
              <p className="text-2xl sm:text-3xl font-medium text-white/50 font-montserrat mb-6 group-hover:text-[#5EFC8D] transition-colors">
                {val.number}
              </p>
              <div className="w-14 h-14 mb-6 flex items-center justify-center">
                <img
                  src={val.icon}
                  alt={val.title}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-3 font-montserrat leading-snug">
                {val.title}
              </h3>
              <p className="text-sm sm:text-[15px] text-[#b3b3b3] font-light leading-[1.7] font-montserrat">
                {val.description}
              </p>
            </div>
          </MotionCard>
        ))}
      </div>
    </MotionSection>
  );
}
