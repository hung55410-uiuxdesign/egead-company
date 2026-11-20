'use client';

import { Users } from 'lucide-react';
import { TeamMember } from './peopleData';
import { LeaderTeamHierarchy, SubChildNode } from './leaderTeamData';
import { QuoteIcon, LinkedInIcon } from './LeaderRow';

type Props = {
  leader: TeamMember;
  hierarchies?: Record<string, LeaderTeamHierarchy>;
  onSelectMember?: (member: TeamMember) => void;
};

function SubMemberCard({
  member,
  onSelect,
}: {
  member: SubChildNode;
  onSelect?: (member: TeamMember) => void;
}) {
  return (
    <div
      onClick={() => onSelect && onSelect(member as unknown as TeamMember)}
      className="tree-node-card group cursor-pointer mx-auto"
      title={`Click to view details for ${member.name}`}
    >
      <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-white/[0.08] backdrop-blur-md text-[9px] font-montserrat text-gray-300">
        Team Member
      </span>
      <span className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-montserrat text-gray-300">
        {member.location}
      </span>
      <div className="tree-node-card__thumb">
        <img src={member.image} alt={member.name} loading="lazy" />
      </div>
      <div className="tree-node-card__info">
        <p className="tree-node-card__name truncate">{member.name}</p>
        <p className="tree-node-card__role truncate">{member.role}</p>
      </div>
      <div className="tree-node-card__content">
        <span role="img" aria-label="quote" className="anticon mb-2">
          <QuoteIcon />
        </span>
        <div>
          <p className="line-clamp-2 text-xs mb-2 text-gray-300">
            {member.quote || 'Dedicated to delivering scalable e-commerce solutions.'}
          </p>
          <div className="text-[11px] text-gray-300 border-t border-white/10 pt-1.5 mb-2 line-clamp-2">
            <span className="text-emerald-400/80 font-medium block text-[9px]">
              Key Responsibility:
            </span>
            {member.responsibility}
          </div>
          <div className="flex flex-wrap gap-1">
            {member.skills.slice(0, 3).map((skill, sIdx) => (
              <span
                key={sIdx}
                className="px-2 py-0.5 rounded text-[9px] font-montserrat bg-white/[0.04] text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        {member.linkedin && (
          <div className="flex items-center gap-3 mt-1">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={member.linkedin}
              onClick={(e) => e.stopPropagation()}
              title={`${member.name} LinkedIn`}
              className="hover:opacity-80 transition"
            >
              <LinkedInIcon />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function SubMembersGroup({
  members,
  onSelectMember,
}: {
  members: SubChildNode[];
  onSelectMember?: (member: TeamMember) => void;
}) {
  if (members.length === 0) return null;

  if (members.length === 1) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-px h-6 bg-emerald-500/40 mx-auto" />
        <div className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20 mx-auto -mt-1 z-10 mb-2" />
        <div className="w-[330px]">
          <SubMemberCard member={members[0]} onSelect={onSelectMember} />
        </div>
      </div>
    );
  }

  const renderPair = (pair: SubChildNode[], keyPrefix: string) => {
    return (
      <div className="flex items-start justify-center">
        {pair.map((subChild, sIdx) => {
          const isFirstSub = sIdx === 0;
          const isLastSub = sIdx === pair.length - 1;

          return (
            <div
              key={`${keyPrefix}-${subChild.id}`}
              className="relative flex flex-col items-center px-3"
              style={{ width: '350px' }}
            >
              {/* Continuous horizontal connector between pair */}
              <div
                className="absolute top-0 h-px bg-emerald-500/40"
                style={{
                  left: isFirstSub ? '50%' : 0,
                  right: isLastSub ? '50%' : 0,
                }}
              />
              {/* Vertical connector dropping down from horizontal bar */}
              <div className="w-px h-6 bg-emerald-500/40 mx-auto" />
              <div className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20 mx-auto -mt-1 z-10 mb-2" />
              <div className="w-[330px]">
                <SubMemberCard member={subChild} onSelect={onSelectMember} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // 2 or 3 members: a single row so they all sit at the same level
  if (members.length <= 3) {
    return (
      <div className="flex flex-col items-center w-full">
        {/* Vertical stem from parent into the pair bus */}
        <div className="w-px h-6 bg-emerald-500/40 mx-auto" />
        {renderPair(members, 'row1')}
      </div>
    );
  }

  // 4+ members: wrap into rows (2 per row for exactly 4, otherwise 3 per row)
  // with a seamless vertical connection between rows
  const perRow = members.length === 4 ? 2 : 3;
  const rows: SubChildNode[][] = [];
  for (let i = 0; i < members.length; i += perRow) {
    rows.push(members.slice(i, i + perRow));
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Vertical stem from parent into row 1 bus */}
      <div className="w-px h-6 bg-emerald-500/40 mx-auto" />
      {rows.map((row, rIdx) => (
        <div key={`row-wrap-${rIdx}`} className="flex flex-col items-center w-full">
          {rIdx > 0 && (
            <>
              {/* Vertical stem connecting the previous row to this row's bus */}
              <div className="w-px h-8 bg-emerald-500/40 mx-auto mt-2" />
              <div className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20 mx-auto -mt-1 z-10" />
            </>
          )}
          {renderPair(row, `row${rIdx + 1}`)}
        </div>
      ))}
    </div>
  );
}

export default function LeaderTreeMap({
  leader,
  hierarchies,
  onSelectMember,
}: Props) {
  const hierarchy = hierarchies ? hierarchies[leader.id] : undefined;

  if (!hierarchy || !hierarchy.childNodes || hierarchy.childNodes.length === 0) {
    return null;
  }

  const branches = hierarchy.childNodes;
  const isOnly = branches.length === 1;

  return (
    <div className="w-full relative pb-16 animate-fade-in overflow-x-auto scrollbar-thin">
      <div className="min-w-fit mx-auto flex flex-col items-center px-6">
        {/* Entry stem connecting directly to the horizontal bus bar */}
        <div className="flex flex-col items-center">
          <div className="w-px h-6 bg-emerald-500/40 mx-auto" />
          {!isOnly && (
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 shadow-[0_0_8px_rgba(16,231,116,0.3)] mx-auto -mt-1 z-20" />
          )}
        </div>

        {/* Level 2: Squad Leads / Branches */}
        <div className="flex items-start justify-center gap-0 pt-0">
          {branches.map((childNode, bIdx) => {
            const isFirst = bIdx === 0;
            const isLast = bIdx === branches.length - 1;
            const childCount = childNode.children ? childNode.children.length : 0;
            // 1 child: 360px; 2 or 4 children (rows of 2): 720px; 3 or 5+ children (rows of 3): 1080px
            const columnWidth =
              childCount === 3 || childCount >= 5 ? 1080 : childCount > 1 ? 720 : 360;

            return (
              <div
                key={childNode.id}
                className="relative flex flex-col items-center flex-shrink-0 px-3 sm:px-4"
                style={{ width: `${columnWidth}px` }}
              >
                {/* Continuous horizontal bus bar across all branches */}
                {!isOnly && (
                  <div
                    className="absolute top-0 h-px bg-emerald-500/40"
                    style={{
                      left: isFirst ? '50%' : 0,
                      right: isLast ? '50%' : 0,
                    }}
                  />
                )}

                {/* Vertical drop line to Squad Lead Card */}
                <div className="w-px h-8 bg-emerald-500/40 mx-auto relative z-10" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20 shadow-[0_0_8px_rgba(16,231,116,0.3)] mx-auto -mt-1.5 z-10 mb-2" />

                {/* Squad Lead Card */}
                <div className="w-[340px] min-w-[300px] max-w-[380px]">
                  <div
                    onClick={() =>
                      onSelectMember &&
                      onSelectMember(childNode as unknown as TeamMember)
                    }
                    className="tree-node-card group cursor-pointer mx-auto"
                    title={`Click to view details for ${childNode.name}`}
                  >
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-emerald-500/15 backdrop-blur-md text-[10px] font-medium text-emerald-300">
                      {childNode.levelTag.split(':')[0]}
                    </span>
                    <span className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-montserrat text-gray-300">
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
                      <span className="block px-5 text-[10px] font-semibold text-emerald-400/80 mb-0.5 truncate">
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
                        <p className="line-clamp-2 text-xs mb-2 text-gray-300">
                          {childNode.quote || 'Leading excellence in technology and digital operations.'}
                        </p>
                        <div className="text-[11px] text-gray-300 border-t border-white/10 pt-1.5 mb-2 line-clamp-2">
                          <span className="text-emerald-400/80 font-medium block text-[9px]">
                            Management Scope:
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

                {/* Level 3: Sub-members underneath */}
                {childNode.children && childNode.children.length > 0 && (
                  <div className="w-full flex flex-col items-center mt-0">
                    {/* Stem from Squad Lead card down to the squad badge */}
                    <div className="w-px h-8 bg-gradient-to-b from-emerald-500/40 to-emerald-400/60 mx-auto" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20 shadow-[0_0_8px_rgba(16,231,116,0.3)] mx-auto -mt-1 z-10" />

                    {/* Squad Team Badge */}
                    <div className="mt-2 mb-2 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] text-[11px] font-medium text-gray-300">
                        <Users className="w-3.5 h-3.5 text-emerald-400/80" />
                        <span>Reporting to {childNode.name.split(' ')[0]} ({childNode.children.length})</span>
                      </span>
                    </div>

                    {/* Sub-members Tree Structure with 100% continuous connectors */}
                    <SubMembersGroup
                      members={childNode.children}
                      onSelectMember={onSelectMember}
                    />
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
