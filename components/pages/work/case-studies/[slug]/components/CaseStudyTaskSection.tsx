"use client";

import Image from "next/image";
import MotionSection, { MotionCard } from "@/components/MotionSection";
import type { CaseStudyDetail } from "@/lib/case-studies-data";

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
          {task.images.map((imgSrc, idx) => (
            <div
              key={idx}
              className="task-img-wrapper border border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.4)]"
            >
              <Image
                src={imgSrc}
                alt={`Task illustration ${idx + 1}`}
                width={700}
                height={440}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
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
