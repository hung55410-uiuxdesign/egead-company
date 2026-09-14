'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  X,
  MapPin,
  CheckCircle2,
  Search,
} from 'lucide-react';
import LeaderRow, { QuoteIcon, LinkedInIcon } from './LeaderRow';
import {
  TeamMember,
  leadershipTeam,
  allExperts,
  DepartmentFilter,
} from './peopleData';
import './people.css';

export { leadershipTeam, allExperts };
export type { TeamMember, DepartmentFilter };

export default function PeopleClientView() {
  const [activeFilter, setActiveFilter] = useState<DepartmentFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeLeaderId, setActiveLeaderId] = useState<string | null>(null);

  // Filtered experts based on search and department
  const filteredExperts = useMemo(() => {
    return allExperts.filter((member) => {
      const matchesDept =
        activeFilter === 'All' ||
        activeFilter === 'Executive Leadership' ||
        member.department === activeFilter;

      const matchesSearch =
        searchQuery.trim() === '' ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesDept && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Display 8 experts initially or all when expanded or filtering
  const visibleExperts = useMemo(() => {
    if (isExpanded || searchQuery.trim() !== '' || activeFilter !== 'All') {
      return filteredExperts;
    }
    return filteredExperts.slice(0, 8);
  }, [filteredExperts, isExpanded, searchQuery, activeFilter]);

  const departments: DepartmentFilter[] = [
    'All',
    'Technology & AI',
    'Commerce & Solutions',
    'Fulfillment & Operations',
    'Delivery & Growth',
  ];

  return (
    <div className="sai-people-page w-full pt-20 sm:pt-28">
      {/* ==================================================================== */}
      {/* 1. HERO SECTION (100% SAI DIGITAL FIDELITY)                          */}
      {/* ==================================================================== */}
      <section>
        <p className="hero-label">Our People</p>
      </section>

      <div className="sai-heading-text">
        <div className="hidden" itemScope itemType="https://schema.org/Organization" />
        <h1>
          <span>Meet the People</span>
          <span>Behind (Y)our Success.</span>
        </h1>
      </div>

      {/* ==================================================================== */}
      {/* 2. LEADERSHIP TEAM SECTION (HORIZONTAL TRACK + SLIDE-TO-CENTER TREE) */}
      {/* ==================================================================== */}
      <div className="people-block">
        <p className="people-block__title px-5 sm:px-0">Leadership Team</p>

        {/* Leadership Row: Default horizontal track of all 8 leaders / Centered Tree */}
        <LeaderRow
          leaders={leadershipTeam}
          activeLeaderId={activeLeaderId}
          onLeaderChange={setActiveLeaderId}
          onSelectExpert={(expert) => setSelectedMember(expert)}
        />

        {/* Looping Culture Video in background (exact SAI Digital) */}
        <div className="people-block__video">
          <video autoPlay muted loop playsInline>
            <source
              src="https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/d981ca6c-4f19-4e94-a4d8-3cd4403683af:c6915fb33cecb8aae1ec4b8b312965665d10c1bf/people_bg2_new.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. OUR TEAM OF EXPERTS SECTION (WHITE CONTAINER, .people-card--more)  */}
      {/* ==================================================================== */}
      <div className="people-block people-block--white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-200">
          <div>
            <p className="people-block__title mb-1">Our Team of Experts</p>
            <p className="text-sm text-gray-500 font-medium">
              Đội ngũ chuyên gia kỹ thuật, kiến trúc sư giải pháp và vận hành thương mại điện tử toàn cầu
            </p>
          </div>

          {/* Search & Department Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search experts, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-9 rounded-full border border-gray-300 bg-gray-50 text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007380] focus:bg-white transition"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Department Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => {
                    setActiveFilter(dept);
                    setIsExpanded(true);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    activeFilter === dept
                      ? 'bg-[#003d5b] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Experts Grid (Exact SAI Digital layout: .people-card--more) */}
        {visibleExperts.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            <p className="text-base font-medium">No team members found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('All');
              }}
              className="mt-4 px-6 py-2 rounded-full bg-[#003d5b] text-white text-xs font-semibold hover:bg-[#002b40] transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
            {visibleExperts.map((expert) => (
              <div
                key={expert.id}
                onClick={() => setSelectedMember(expert)}
                className="people-card people-card--more group cursor-pointer"
                title={`Nhấp để xem hồ sơ ${expert.name}`}
              >
                {/* Photo Thumbnail */}
                <div className="people-card__thumb">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    loading="lazy"
                  />
                </div>

                {/* Normal State: Name & Role */}
                <div className="people-card__info">
                  <p className="people-card__name">{expert.name}</p>
                  <p className="people-card__role">{expert.role}</p>
                </div>

                {/* Hover State: Slide up Quote & LinkedIn */}
                <div className="people-card__content">
                  <span role="img" aria-label="quote" className="anticon">
                    <QuoteIcon />
                  </span>
                  <div>
                    <p>{expert.quote || 'Believe you can & you are halfway there.'}</p>
                  </div>
                  {expert.linkedin && (
                    <div className="people-card__social">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={expert.linkedin}
                        onClick={(e) => e.stopPropagation()}
                        title={`${expert.name} LinkedIn`}
                      >
                        <LinkedInIcon />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expand / Show More Button */}
        {activeFilter === 'All' && searchQuery.trim() === '' && filteredExperts.length > 8 && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-8 py-3.5 rounded-full bg-[#000000] hover:bg-[#7ceee0] text-white hover:text-black font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {isExpanded
                ? 'Show Fewer Members'
                : `View Full Team Directory (+${filteredExperts.length - 8} more specialists)`}
            </button>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* 4. CONTACT BLOCK (100% SAI DIGITAL FIDELITY)                         */}
      {/* ==================================================================== */}
      <div className="contact-block">
        <div className="contact-block__title">
          <p>
            Let's <strong>boost</strong> your&nbsp;<br />
            commerce outcomes.
          </p>
        </div>
        <span className="text-sm text-gray-400 mb-8 block font-normal tracking-wide text-center">
          E-GEAD Digital Commerce Ecosystem, Powered by Cross-Border Innovation
        </span>
        <Link className="ant-btn-primary" href="/contact-us">
          Let's talk
        </Link>
      </div>

      {/* ==================================================================== */}
      {/* 5. EXPERT MEMBER DETAILS MODAL (FOR DETAILED READING)                 */}
      {/* ==================================================================== */}
      {selectedMember && (
        <div
          onClick={() => setSelectedMember(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-[#000000] border border-[#007380] p-6 sm:p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,115,128,0.3)]"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-[#7ceee0] hover:text-black flex items-center justify-center transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center border-b border-[#007380]/40 pb-6 mb-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[16px] overflow-hidden bg-black/50 shrink-0 border border-[#007380]">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#7ceee0]/10 border border-[#7ceee0]/30 text-[#7ceee0] text-xs font-semibold mb-2">
                  {selectedMember.department}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#d3f9f5]">
                  {selectedMember.name}
                </h3>
                <p className="text-sm sm:text-base text-[#7ceee0] font-medium">
                  {selectedMember.role}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-[#7ceee0]" />
                  <span>{selectedMember.location}</span>
                </div>
              </div>
            </div>

            {/* Quote Block */}
            {selectedMember.quote && (
              <div className="rounded-[16px] bg-white/[0.04] border border-[#007380]/40 p-4 mb-6 relative">
                <div className="mb-2">
                  <QuoteIcon className="w-4 h-4 text-[#7ceee0]" />
                </div>
                <p className="text-sm sm:text-base text-gray-200 italic leading-relaxed">
                  "{selectedMember.quote}"
                </p>
              </div>
            )}

            {/* Biography */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Thông Tin &amp; Chuyên Môn
              </h4>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                {selectedMember.bio}
              </p>
            </div>

            {/* Core Skills & Expertise */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Lĩnh Vực Trọng Tâm
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedMember.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-gray-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7ceee0]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#007380]/40">
              {selectedMember.linkedin ? (
                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0077B5] hover:bg-[#005c8a] text-white text-xs font-semibold transition"
                >
                  <LinkedInIcon />
                  <span>Connect on LinkedIn</span>
                </a>
              ) : (
                <div />
              )}

              <button
                onClick={() => setSelectedMember(null)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
