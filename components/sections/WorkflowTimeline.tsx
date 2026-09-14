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
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#25E2CC]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          {badge && (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141718] border border-[#262C30] text-[#25E2CC] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 font-montserrat">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#25E2CC]" aria-hidden="true" />
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-rubik leading-[1.2]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-[#8C8C8C] leading-relaxed font-montserrat max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Desktop Pipeline (Horizontal with glowing track and semantic <ol>) */}
        <div className="relative hidden lg:block">
          {/* Glowing connecting line */}
          <div className="absolute top-[42px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-[#25E2CC]/20 via-[#25E2CC] to-[#25E2CC]/20 z-0" aria-hidden="true" />

          <ol
            aria-label="Workflow pipeline sequential steps"
            className={`grid gap-6 relative z-10 list-none p-0 m-0 ${
              steps.length === 3
                ? 'grid-cols-3'
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
                <div className="relative w-20 h-20 rounded-full bg-[#141718] border-2 border-[#25E2CC] flex items-center justify-center shadow-[0_0_25px_rgba(37,226,204,0.25)] group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(37,226,204,0.4)] transition-all duration-300 mb-6">
                  {item.icon ? (
                    <div className="text-[#25E2CC]">{item.icon}</div>
                  ) : (
                    <span className="text-xl font-bold text-white font-rubik">
                      {item.step}
                    </span>
                  )}
                  {item.badge && (
                    <span className="absolute -bottom-2.5 px-2 py-0.5 rounded-full bg-[#25E2CC] text-black text-[9px] font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Card Info */}
                <div className="w-full p-6 rounded-[24px] bg-[#141718]/90 border border-[#262C30] group-hover:border-[#25E2CC]/40 transition-all duration-300 flex flex-col flex-grow">
                  <span className="text-xs font-bold text-[#25E2CC] uppercase tracking-widest font-montserrat mb-1">
                    Step {item.step}
                  </span>
                  <h3 className="text-lg font-bold text-white font-rubik mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8C8C8C] font-montserrat leading-relaxed mb-3">
                    {item.description}
                  </p>
                  {item.subtext && (
                    <div className="mt-auto pt-3 border-t border-[#262C30] text-[11px] text-[#D3F9F5] font-mono">
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
          className="lg:hidden relative pl-6 sm:pl-8 border-l-2 border-[#25E2CC]/40 space-y-8 ml-4 sm:ml-6 list-none p-0 m-0"
        >
          {steps.map((item, idx) => (
            <li key={idx} className="relative group">
              {/* Step indicator dot on the border line */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-10 h-10 rounded-full bg-[#141718] border-2 border-[#25E2CC] flex items-center justify-center text-xs font-bold text-white font-rubik shadow-[0_0_15px_rgba(37,226,204,0.3)]">
                {item.step}
              </div>

              {/* Card */}
              <div className="p-6 rounded-[22px] bg-[#141718] border border-[#262C30] hover:border-[#25E2CC]/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#25E2CC] uppercase tracking-wider font-montserrat">
                    Step {item.step}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-bold text-black bg-[#25E2CC] px-2 py-0.5 rounded font-montserrat">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white font-rubik mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#8C8C8C] font-montserrat leading-relaxed mb-3">
                  {item.description}
                </p>
                {item.subtext && (
                  <div className="text-xs text-[#D3F9F5] font-mono pt-2 border-t border-[#262C30]">
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
