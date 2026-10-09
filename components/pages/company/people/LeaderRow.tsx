"use client";

import { useState, useRef, useEffect } from "react";
import { X, ChevronDown, MapPin, CheckCircle2, Users } from "lucide-react";
import { TeamMember } from "./peopleData";
import { LeaderTeamHierarchy } from "./leaderTeamData";
import LeaderTreeMap from "./LeaderTreeMap";

export function QuoteIcon({
  className = "w-[18px] h-[19px]",
}: {
  className?: string;
}) {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.3775 13.1331C5.76 13.1331 6.1125 12.9156 6.2775 12.5781L7.3425 10.4481C7.4475 10.2381 7.5 10.0131 7.5 9.78056V6.38306C7.5 5.97056 7.1625 5.63306 6.75 5.63306H3.75C3.3375 5.63306 3 5.97056 3 6.38306V9.38306C3 9.79556 3.3375 10.1331 3.75 10.1331H5.25L4.4775 11.6781C4.14 12.3456 4.6275 13.1331 5.3775 13.1331ZM12.8775 13.1331C13.26 13.1331 13.6125 12.9156 13.7775 12.5781L14.8425 10.4481C14.9475 10.2381 15 10.0131 15 9.78056V6.38306C15 5.97056 14.6625 5.63306 14.25 5.63306H11.25C10.8375 5.63306 10.5 5.97056 10.5 6.38306V9.38306C10.5 9.79556 10.8375 10.1331 11.25 10.1331H12.75L11.9775 11.6781C11.64 12.3456 12.1275 13.1331 12.8775 13.1331Z"
        fill="white"
      />
    </svg>
  );
}

export function LinkedInIcon({
  className = "w-4 h-4",
}: {
  className?: string;
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.82 0H1.18C0.53 0 0 0.51 0 1.15V14.85C0 15.49 0.53 16 1.18 16H14.82C15.47 16 16 15.49 16 14.85V1.15C16 0.51 15.47 0 14.82 0ZM4.75 13.63H2.37V6H4.75V13.63ZM3.56 4.96C2.8 4.96 2.18 4.34 2.18 3.57C2.18 2.8 2.8 2.18 3.56 2.18C4.32 2.18 4.94 2.8 4.94 3.57C4.94 4.34 4.32 4.96 3.56 4.96ZM13.63 13.63H11.26V9.91C11.26 9.02 11.24 7.88 10.02 7.88C8.78 7.88 8.59 8.85 8.59 9.85V13.63H6.22V6H8.5V7.04H8.53C8.85 6.43 9.64 5.79 10.81 5.79C13.25 5.79 13.63 7.4 13.63 9.48V13.63Z"
        fill="white"
      />
    </svg>
  );
}

type Props = {
  leaders: TeamMember[];
  activeLeaderId: string | null;
  hierarchies?: Record<string, LeaderTeamHierarchy>;
  onLeaderChange: (leaderId: string | null) => void;
  onSelectExpert?: (expert: TeamMember) => void;
};

export default function LeaderRow({
  leaders,
  activeLeaderId,
  hierarchies,
  onLeaderChange,
  onSelectExpert,
}: Props) {
  const listContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [slideOffset, setSlideOffset] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const activeLeader = leaders.find((l) => l.id === activeLeaderId) || null;

  const handleCardClick = (leader: TeamMember, index: number) => {
    const cardEl = cardRefs.current[index];
    const containerEl = listContainerRef.current;

    if (cardEl && containerEl) {
      const cardRect = cardEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const deltaX = cardCenterX - containerCenterX;
      setSlideOffset(deltaX);
    } else {
      setSlideOffset(0);
    }

    setIsTransitioning(true);
    onLeaderChange(leader.id);
  };

  useEffect(() => {
    if (activeLeader && isTransitioning) {
      const rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSlideOffset(0);
          const timer = setTimeout(() => {
            setIsTransitioning(false);
          }, 650);
          return () => clearTimeout(timer);
        });
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [activeLeaderId]);

  return (
    <div className="w-full relative z-10">
      {!activeLeader ? (
        <div ref={listContainerRef} className="people-block__list">
          {leaders.map((leader, index) => (
            <div
              key={leader.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => handleCardClick(leader, index)}
              className="people-card people-card--lead group"
              title={`Click to view leadership tree for ${leader.name}`}
            >
              <p className="people-card__thumb">
                <img src={leader.image} alt={leader.name} loading="lazy" />
              </p>

              <div className="people-card__info">
                <p className="people-card__name">{leader.name}</p>
                <p className="people-card__role">{leader.role}</p>
              </div>

              <div className="people-card__content">
                <span role="img" aria-label="quote" className="anticon">
                  <QuoteIcon />
                </span>
                <div>
                  <p>
                    {leader.quote ||
                      "Leading innovation and excellence in global commerce."}
                  </p>
                </div>
                {leader.linkedin && (
                  <div className="people-card__social">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={leader.linkedin}
                      onClick={(e) => e.stopPropagation()}
                      title={`${leader.name} LinkedIn`}
                    >
                      <LinkedInIcon />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-12 pb-16">
          <div
            style={{
              transform: `translateX(${slideOffset}px)`,
              transition: isTransitioning
                ? "transform 650ms cubic-bezier(0.16, 1, 0.3, 1)"
                : "transform 300ms ease-out",
            }}
            className="w-full max-w-5xl rounded-[28px] bg-gradient-to-b from-[#14191c]/90 via-[#0d1012]/95 to-[#080b0c]/98 border border-white/10 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(16,231,116,0.06)] relative overflow-hidden"
          >
            {/* Ambient subtle top edge sheen */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={() => onLeaderChange(null)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 z-30 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white flex items-center justify-center transition"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-5 flex flex-col items-center sm:items-start">
                <div className="relative w-full max-w-[280px] rounded-[20px] overflow-hidden bg-white/[0.02] shadow-2xl mb-5">
                  <img
                    src={activeLeader.image}
                    alt={activeLeader.name}
                    className="w-full h-[280px] object-cover object-top"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-montserrat text-gray-200 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-emerald-400/80" />
                    <span>{activeLeader.location}</span>
                  </div>
                </div>

                {activeLeader.quote && (
                  <div className="w-full max-w-[280px] rounded-[16px] bg-white/[0.025] p-4 relative mb-4">
                    <div className="mb-2">
                      <QuoteIcon className="w-4 h-4 text-emerald-400/70" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed">
                      "{activeLeader.quote}"
                    </p>
                  </div>
                )}

                {activeLeader.linkedin && (
                  <a
                    href={activeLeader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 w-full max-w-[280px] py-2.5 rounded-full bg-[#0077B5]/90 hover:bg-[#0077B5] text-white text-xs font-medium transition shadow-md"
                  >
                    <LinkedInIcon />
                    <span>Connect on LinkedIn</span>
                  </a>
                )}
              </div>

              <div className="md:col-span-7 flex flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-medium mb-3 self-start">
                  <span>Executive Leadership</span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-white/90 to-gray-400 bg-clip-text text-transparent leading-tight">
                  {activeLeader.name}
                </h3>
                <p className="text-base sm:text-lg text-emerald-400/90 font-medium mt-1 mb-6">
                  {activeLeader.role}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-emerald-400/80 mb-2">
                    Strategic Vision &amp; Leadership Role
                  </h4>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                    {activeLeader.bio}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-xs font-semibold text-emerald-400/80 mb-3">
                    Core Areas of Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeLeader.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.035] hover:bg-white/[0.06] text-xs text-gray-300 transition"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center w-full my-0">
            <div className="w-px h-10 bg-gradient-to-b from-white/20 via-emerald-500/40 to-emerald-400 mx-auto" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 shadow-[0_0_10px_rgba(16,231,116,0.3)] mx-auto -mt-1.5 z-20" />
          </div>

          <div className="w-full">
            <LeaderTreeMap
              leader={activeLeader}
              hierarchies={hierarchies}
              onSelectMember={onSelectExpert}
            />
          </div>
        </div>
      )}
    </div>
  );
}
