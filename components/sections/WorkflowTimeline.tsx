import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  subtext?: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface WorkflowTimelineProps {
  id?: string;
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  steps: WorkflowStep[];
  className?: string;
}

export default function WorkflowTimeline({
  id = 'workflow',
  badge = 'End-to-End Pipeline',
  title,
  subtitle,
  steps,
  className = '',
}: WorkflowTimelineProps) {
  return (
    <section
      id={id}
      className={`relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden ${className}`}
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#10E774]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {badge && (
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
              {badge}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Desktop Pipeline (Horizontal with glowing track and semantic <ol>) */}
        <div className="relative hidden lg:block">
          {/* Glowing connecting line */}
          <div className="absolute top-[42px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-[#5EFC8D]/20 via-[#5EFC8D] to-[#5EFC8D]/20 z-0" aria-hidden="true" />

          <ol
            aria-label="Workflow pipeline sequential steps"
            className={`grid gap-6 relative z-10 list-none p-0 m-0 ${ steps.length === 3 ?'grid-cols-3'
                : steps.length === 4
                ? 'grid-cols-4'
                : steps.length === 5
                ? 'grid-cols-5'
                : 'grid-cols-4'
            }`}
          >
            {steps.map((item, idx) => (
              <li key={idx} className="flex flex-col items-center text-center group">
                {/* Step Circle Pin */}
                <div className="relative w-20 h-20 rounded-full bg-[#141718] border-2 border-[#5EFC8D] flex items-center justify-center shadow-[0_0_25px_rgba(94, 252, 141, 0.25)] group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(94, 252, 141, 0.4)] transition-all duration-300 mb-6">
                  {item.icon ? (
                    <div className="text-[#5EFC8D]">{item.icon}</div>
                  ) : (
                    <span className="text-xl font-medium text-[#D4FAE6] font-montserrat">
                      {item.step}
                    </span>
                  )}
                  {item.badge && (
                    <span className="absolute -bottom-2.5 px-2 py-0.5 rounded-full bg-[#5EFC8D] text-black text-[9px] font-medium font-montserrat">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Card Info */}
                <div className="w-full p-6 rounded-[24px] bg-[#141718]/90 border border-white/10 group-hover:border-[#5EFC8D]/40 transition-all duration-300 flex flex-col flex-grow">
                  <span className="text-xs font-medium text-[#5EFC8D] font-montserrat mb-1">
                    Step {item.step}
                  </span>
                  <h3 className="text-lg font-medium text-[#D4FAE6] font-montserrat mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b3b3b3] font-light font-montserrat leading-[1.75] mb-3">
                    {item.description}
                  </p>
                  {item.subtext && (
                    <div className="mt-auto pt-3 border-t border-white/10 text-[11px] text-[#D4FAE6] font-montserrat">
                      {item.subtext}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile / Tablet Pipeline (Vertical Chain with semantic <ol>) */}
        <ol
          aria-label="Workflow pipeline sequential steps mobile"
          className="lg:hidden relative pl-6 sm:pl-8 border-l-2 border-[#5EFC8D]/40 space-y-8 ml-4 sm:ml-6 list-none p-0 m-0"
        >
          {steps.map((item, idx) => (
            <li key={idx} className="relative group">
              {/* Step indicator dot on the border line */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-10 h-10 rounded-full bg-[#141718] border-2 border-[#5EFC8D] flex items-center justify-center text-xs font-medium text-[#D4FAE6] font-montserrat shadow-[0_0_15px_rgba(94, 252, 141, 0.3)]">
                {item.step}
              </div>

              {/* Card */}
              <div className="p-6 rounded-[22px] bg-[#141718] border border-white/10 hover:border-[#5EFC8D]/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#5EFC8D] font-montserrat">
                    Step {item.step}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-medium text-black bg-[#5EFC8D] px-2 py-0.5 rounded font-montserrat">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-medium text-[#D4FAE6] font-montserrat mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#b3b3b3] font-light font-montserrat leading-[1.75] mb-3">
                  {item.description}
                </p>
                {item.subtext && (
                  <div className="text-xs text-[#D4FAE6] font-montserrat pt-2 border-t border-white/10">
                    {item.subtext}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
