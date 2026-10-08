'use client';

import { Users } from 'lucide-react';
import { TeamMember } from './peopleData';
import { leaderHierarchies, LeaderTeamHierarchy } from './leaderTeamData';
import { QuoteIcon, LinkedInIcon } from './LeaderRow';

type Props = {
  leader: TeamMember;
  hierarchies?: Record<string, LeaderTeamHierarchy>;
  onSelectMember?: (member: TeamMember) => void;
}

export default function LeaderTreeMap({
  leader,
  hierarchies,
  onSelectMember,
}: Props) {
  const hierarchy = (hierarchies && hierarchies[leader.id]) || leaderHierarchies[leader.id];

  if (!hierarchy || !hierarchy.childNodes || hierarchy.childNodes.length === 0) {
    return null;
  }

  const branches = hierarchy.childNodes;

  return (
    <div className="w-full relative pt-2 pb-16 animate-fade-in overflow-x-auto scrollbar-thin">
      <div className="min-w-fit mx-auto flex flex-col items-center px-6">
        <div className="flex items-start justify-center gap-12 lg:gap-16 pt-0">
          {branches.map((childNode, bIdx) => {
            const isFirst = bIdx === 0;
            const isLast = bIdx === branches.length - 1;
            const isOnly = branches.length === 1;

            return (
              <div
                key={childNode.id}
                className="relative flex flex-col items-center flex-shrink-0"
                style={{ width: childNode.children && childNode.children.length > 1 ? '700px' : '380px' }}
              >
                {!isOnly && (
                  <div
                    className={`absolute top-0 h-0.5 bg-[#5EFC8D] ${isFirst ?'w-1/2 right-0'
                        : isLast
                          ? 'w-1/2 left-0'
                          : 'w-full left-0'
                      }`}
                  />
                )}
                <div className="w-0.5 h-8 bg-[#5EFC8D] mx-auto relative z-10" />
                <div className="w-3 h-3 rounded-full bg-[#5EFC8D] ring-4 ring-[#5EFC8D]/20 shadow-[0_0_10px_#5EFC8D] mx-auto -mt-1.5 z-10 mb-2" />
                <div className="w-full flex justify-center mb-0">
                  <div className="w-[340px] min-w-[300px] max-w-[380px]">
                    <div
                      onClick={() =>
                        onSelectMember &&
                        onSelectMember(childNode as unknown as TeamMember)
                      }
                      className="tree-node-card group cursor-pointer mx-auto"
                      title={`Nhấp để xem chi tiết ${childNode.name}`}
                    >
                      <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-[#5EFC8D] text-black text-[10px] font-bold shadow-sm">
                        {childNode.levelTag.split(':')[0]}
                      </span>
                      <span className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-[#007A3D] text-[10px] font-montserrat text-[#5EFC8D]">
                        {childNode.location}
                      </span>
                      <div className="tree-node-card__thumb">
                        <img
                          src={childNode.image}
                          alt={childNode.name}
                          loading="lazy"
                        />
                      </div>
                      <div className="tree-node-card__info">
                        <span className="block px-5 text-[10px] font-bold text-[#5EFC8D] mb-0.5 truncate">
                          {childNode.squadName}
                        </span>
                        <p className="tree-node-card__name truncate">{childNode.name}</p>
                        <p className="tree-node-card__role truncate">{childNode.role}</p>
                      </div>
                      <div className="tree-node-card__content">
                        <span role="img" aria-label="quote" className="anticon mb-2">
                          <QuoteIcon />
                        </span>
                        <div>
                          <p className="line-clamp-2 text-xs mb-2 text-gray-200">
                            {childNode.quote || 'Leading excellence in technology and digital operations.'}
                          </p>
                          <div className="text-[11px] text-[#D4FAE6] border-t border-white/20 pt-1.5 mb-2 line-clamp-2">
                            <span className="text-[#5EFC8D] font-bold block text-[9px]">
                              Nhiệm vụ quản lý:
                            </span>
                            {childNode.responsibility}
                          </div>
                        </div>
                        {childNode.linkedin && (
                          <div className="flex items-center gap-3 mt-1">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={childNode.linkedin}
                              onClick={(e) => e.stopPropagation()}
                              title={`${childNode.name} LinkedIn`}
                              className="hover:opacity-80 transition"
                            >
                              <LinkedInIcon />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {childNode.children && childNode.children.length > 0 && (
                  <div className="w-full flex flex-col items-center mt-0">
                    <div className="w-0.5 h-10 bg-gradient-to-b from-[#5EFC8D] to-[#5EFC8D]/70 mx-auto" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#5EFC8D] ring-4 ring-[#5EFC8D]/20 shadow-[0_0_12px_#5EFC8D] mx-auto -mt-1.5 z-10" />
                    <div className="mt-3 mb-6 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-[#007A3D] text-[11px] font-montserrat text-gray-300 shadow-sm">
                        <Users className="w-3.5 h-3.5 text-[#5EFC8D]" />
                        <span>Trực thuộc {childNode.name.split(' ')[0]} ({childNode.children.length})</span>
                      </span>
                    </div>
                    {childNode.children.length <= 2 ? (
                      <div className="w-full relative">
                        {childNode.children.length > 1 && (
                          <div className="w-[50%] max-w-[340px] h-0.5 bg-[#5EFC8D] mx-auto mb-0" />
                        )}

                        <div className={`grid ${childNode.children.length === 1 ?'grid-cols-1 max-w-[340px]' : 'grid-cols-2 gap-8 max-w-[700px]'
                          } mx-auto justify-items-center`}>
                          {childNode.children.map((subChild) => (
                            <div
                              key={subChild.id}
                              className="w-[330px] min-w-[300px] max-w-[360px] flex flex-col items-center"
                            >
                              <div className="w-0.5 h-5 bg-[#5EFC8D] -mt-0 mb-2" />
                              <div
                                onClick={() =>
                                  onSelectMember &&
                                  onSelectMember(subChild as unknown as TeamMember)
                                }
                                className="tree-node-card group cursor-pointer mx-auto"
                                title={`Nhấp để xem chi tiết ${subChild.name}`}
                              >
                                <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-[#007A3D] text-[9px] font-montserrat text-gray-300">
                                  Thành viên
                                </span>
                                <span className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-[#007A3D] text-[10px] font-montserrat text-[#5EFC8D]">
                                  {subChild.location}
                                </span>
                                <div className="tree-node-card__thumb">
                                  <img
                                    src={subChild.image}
                                    alt={subChild.name}
                                    loading="lazy"
                                  />
                                </div>
                                <div className="tree-node-card__info">
                                  <p className="tree-node-card__name truncate">{subChild.name}</p>
                                  <p className="tree-node-card__role truncate">{subChild.role}</p>
                                </div>
                                <div className="tree-node-card__content">
                                  <span role="img" aria-label="quote" className="anticon mb-2">
                                    <QuoteIcon />
                                  </span>
                                  <div>
                                    <p className="line-clamp-2 text-xs mb-2 text-gray-200">
                                      {subChild.quote || 'Dedicated to delivering scalable e-commerce solutions.'}
                                    </p>
                                    <div className="text-[11px] text-[#D4FAE6] border-t border-white/20 pt-1.5 mb-2 line-clamp-2">
                                      {subChild.responsibility}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {subChild.skills.slice(0, 3).map((skill, sIdx) => (
                                        <span
                                          key={sIdx}
                                          className="px-1.5 py-0.5 rounded text-[9px] font-montserrat bg-white/10 text-gray-200"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  {subChild.linkedin && (
                                    <div className="flex items-center gap-3 mt-1">
                                      <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={subChild.linkedin}
                                        onClick={(e) => e.stopPropagation()}
                                        title={`${subChild.name} LinkedIn`}
                                        className="hover:opacity-80 transition"
                                      >
                                        <LinkedInIcon />
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full relative flex flex-col items-center">
                        <div className="w-[50%] max-w-[340px] h-0.5 bg-[#5EFC8D] mx-auto mb-0" />
                        <div className="grid grid-cols-2 gap-8 max-w-[700px] mx-auto justify-items-center mb-6">
                          {childNode.children.slice(0, 2).map((subChild) => (
                            <div
                              key={subChild.id}
                              className="w-[330px] min-w-[300px] max-w-[360px] flex flex-col items-center"
                            >
                              <div className="w-0.5 h-5 bg-[#5EFC8D] mb-2" />
                              <div
                                onClick={() =>
                                  onSelectMember &&
                                  onSelectMember(subChild as unknown as TeamMember)
                                }
                                className="tree-node-card group cursor-pointer mx-auto"
                                title={`Nhấp để xem chi tiết ${subChild.name}`}
                              >
                                <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-[#007A3D] text-[9px] font-montserrat text-gray-300">
                                  Thành viên
                                </span>
                                <span className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-[#007A3D] text-[10px] font-montserrat text-[#5EFC8D]">
                                  {subChild.location}
                                </span>
                                <div className="tree-node-card__thumb">
                                  <img
                                    src={subChild.image}
                                    alt={subChild.name}
                                    loading="lazy"
                                  />
                                </div>
                                <div className="tree-node-card__info">
                                  <p className="tree-node-card__name truncate">{subChild.name}</p>
                                  <p className="tree-node-card__role truncate">{subChild.role}</p>
                                </div>
                                <div className="tree-node-card__content">
                                  <span role="img" aria-label="quote" className="anticon mb-2">
                                    <QuoteIcon />
                                  </span>
                                  <div>
                                    <p className="line-clamp-2 text-xs mb-2 text-gray-200">
                                      {subChild.quote || 'Dedicated to delivering scalable e-commerce solutions.'}
                                    </p>
                                    <div className="text-[11px] text-[#D4FAE6] border-t border-white/20 pt-1.5 mb-2 line-clamp-2">
                                      {subChild.responsibility}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {subChild.skills.slice(0, 3).map((skill, sIdx) => (
                                        <span
                                          key={sIdx}
                                          className="px-1.5 py-0.5 rounded text-[9px] font-montserrat bg-white/10 text-gray-200"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  {subChild.linkedin && (
                                    <div className="flex items-center gap-3 mt-1">
                                      <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={subChild.linkedin}
                                        onClick={(e) => e.stopPropagation()}
                                        title={`${subChild.name} LinkedIn`}
                                        className="hover:opacity-80 transition"
                                      >
                                        <LinkedInIcon />
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="w-0.5 h-8 bg-[#5EFC8D] mx-auto -mt-6 mb-0" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#5EFC8D] mx-auto -mt-1 z-10 shadow-[0_0_8px_#5EFC8D] mb-0" />
                        <div className="w-[50%] max-w-[340px] h-0.5 bg-[#5EFC8D] mx-auto mb-0" />
                        <div className="grid grid-cols-2 gap-8 max-w-[700px] mx-auto justify-items-center">
                          {childNode.children.slice(2).map((subChild) => (
                            <div
                              key={subChild.id}
                              className="w-[330px] min-w-[300px] max-w-[360px] flex flex-col items-center"
                            >
                              <div className="w-0.5 h-5 bg-[#5EFC8D] mb-2" />
                              <div
                                onClick={() =>
                                  onSelectMember &&
                                  onSelectMember(subChild as unknown as TeamMember)
                                }
                                className="tree-node-card group cursor-pointer mx-auto"
                                title={`Nhấp để xem chi tiết ${subChild.name}`}
                              >
                                <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-[#007A3D] text-[9px] font-montserrat text-gray-300">
                                  Thành viên
                                </span>
                                <span className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-[#007A3D] text-[10px] font-montserrat text-[#5EFC8D]">
                                  {subChild.location}
                                </span>
                                <div className="tree-node-card__thumb">
                                  <img
                                    src={subChild.image}
                                    alt={subChild.name}
                                    loading="lazy"
                                  />
                                </div>
                                <div className="tree-node-card__info">
                                  <p className="tree-node-card__name truncate">{subChild.name}</p>
                                  <p className="tree-node-card__role truncate">{subChild.role}</p>
                                </div>
                                <div className="tree-node-card__content">
                                  <span role="img" aria-label="quote" className="anticon mb-2">
                                    <QuoteIcon />
                                  </span>
                                  <div>
                                    <p className="line-clamp-2 text-xs mb-2 text-gray-200">
                                      {subChild.quote || 'Dedicated to delivering scalable e-commerce solutions.'}
                                    </p>
                                    <div className="text-[11px] text-[#D4FAE6] border-t border-white/20 pt-1.5 mb-2 line-clamp-2">
                                      {subChild.responsibility}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {subChild.skills.slice(0, 3).map((skill, sIdx) => (
                                        <span
                                          key={sIdx}
                                          className="px-1.5 py-0.5 rounded text-[9px] font-montserrat bg-white/10 text-gray-200"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  {subChild.linkedin && (
                                    <div className="flex items-center gap-3 mt-1">
                                      <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={subChild.linkedin}
                                        onClick={(e) => e.stopPropagation()}
                                        title={`${subChild.name} LinkedIn`}
                                        className="hover:opacity-80 transition"
                                      >
                                        <LinkedInIcon />
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
