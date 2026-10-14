"use client";

import Image from "next/image";
import MotionSection, { MotionCard } from "@/components/MotionSection";
import type { CaseStudyDetail } from "@/lib/case-studies-data";
import { getOptimizedImageUrl } from "@/lib/utils/image";

type Props = {
  task: CaseStudyDetail["task"];
};

export default function CaseStudyTaskSection({ task }: Props) {
  return (
    <MotionSection className="task">
      <span className="subtitle font-montserrat">
        {task.subtitle || "TASK"}
      </span>
      <h2 className="title font-montserrat">{task.title}</h2>

      {/* Side-by-side Task Visuals */}
      {task.images && task.images.length > 0 && (
        <div className="image_container">
          {task.images.map((imgSrc, idx) => {
            const optimizedSrc = getOptimizedImageUrl(imgSrc, { width: 2400 });
            return (
              <div
                key={idx}
                className="task-img-wrapper relative border border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.4)] bg-[#141718] overflow-hidden flex items-center justify-center group"
              >
                {/* Ambient glow backdrop */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <Image
                    src={optimizedSrc}
                    alt=""
                    aria-hidden="true"
                    fill
                    className="w-full h-full object-cover blur-2xl opacity-30 scale-110"
                  />
                </div>
                {/* Foreground visual mockup */}
                <Image
                  src={optimizedSrc}
                  alt={`Task illustration ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-3 sm:p-5 relative z-10 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Numbered Strategic Execution Items */}
      <div className="task__list">
        {task.taskItems.map((item, idx) => (
          <MotionCard key={idx} index={idx} className="task__item">
            <div className="info">
              <p className="task-num">0{idx + 1}</p>
              <h3 className="title font-montserrat">{item.taskTitle}</h3>
            </div>
            <p className="description font-montserrat">{item.description}</p>
          </MotionCard>
        ))}
      </div>
    </MotionSection>
  );
}
