import { Quote } from 'lucide-react';
import MotionSection, { MotionCard } from '@/components/MotionSection';
import { ALL_TESTIMONIALS } from '../data/testimonials.data';

export default function TestimonialGridSection() {
  return (
    <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ALL_TESTIMONIALS.map((t, idx) => (
          <MotionCard
            key={idx}
            index={idx}
            className="p-8 sm:p-10 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#5EFC8D]/50 transition duration-300 flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_40px_rgba(94,252,141,0.12)]"
          >
            <div>
              <Quote className="w-8 h-8 text-[#5EFC8D] opacity-60 mb-6" />
              <p className="text-base text-[#b3b3b3] font-light leading-relaxed mb-8 font-montserrat">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0 border border-white/20">
                <img src={t.avatar} alt={t.role} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-base font-medium text-[#D4FAE6] font-montserrat">{t.role}</h4>
                <p className="text-xs text-[#5EFC8D] font-light mt-0.5 font-montserrat">{t.company}</p>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>
    </MotionSection>
  );
}
