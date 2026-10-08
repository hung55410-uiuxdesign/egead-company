import MotionSection, { MotionCard } from '@/components/MotionSection';
import { COMMUNITY_ACTIVITIES } from '../data/community-activities.data';

export default function CareerCsrSection() {
  return (
    <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28 sm:mb-36">
      <div className="mb-12">
        <span className="text-xs uppercase tracking-widest text-[#10E774] font-semibold block mb-2 font-montserrat">
          Social Responsibility
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#D4FAE6] font-montserrat mb-4">
          Giving Back to the Community
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl font-light">
          Empowering the next generation through digital literacy scholarships, tech vocational workshops, and local environmental stewardship in Buon Ma Thuot and beyond.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COMMUNITY_ACTIVITIES.map((c, idx) => (
          <MotionCard
            key={c.title}
            index={idx}
            className="rounded-3xl overflow-hidden bg-[#141718] border border-white/10 hover:border-white/20 transition flex flex-col justify-between shadow-xl group"
          >
            <div className="relative h-48 w-full overflow-hidden bg-black">
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 opacity-85"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1 font-montserrat">
                  {c.location}
                </span>
                <h3 className="text-lg font-bold text-[#D4FAE6] mb-2 font-montserrat leading-snug">
                  {c.title}
                </h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>
    </MotionSection>
  );
}
