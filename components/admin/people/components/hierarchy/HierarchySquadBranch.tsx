'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import type { ChildNode } from '@/components/pages/company/people/leaderTeamData';
import OrgNodeCard from '../OrgNodeCard';
import { useHierarchyStore } from './useHierarchyStore';

export interface SquadColorTheme {
  bg: string;
  border: string;
  line: string;
  dot: string;
}

export const SQUAD_COLORS: SquadColorTheme[] = [
  { bg: 'bg-sky-500', border: 'border-sky-400', line: 'bg-sky-400', dot: 'bg-sky-500' },
  { bg: 'bg-purple-600', border: 'border-purple-500', line: 'bg-purple-500', dot: 'bg-purple-600' },
  { bg: 'bg-emerald-600', border: 'border-emerald-500', line: 'bg-emerald-500', dot: 'bg-emerald-600' },
  { bg: 'bg-amber-600', border: 'border-amber-500', line: 'bg-amber-500', dot: 'bg-amber-600' },
  { bg: 'bg-indigo-600', border: 'border-indigo-500', line: 'bg-indigo-500', dot: 'bg-indigo-600' },
  { bg: 'bg-rose-600', border: 'border-rose-500', line: 'bg-rose-500', dot: 'bg-rose-600' },
];

interface HierarchySquadBranchProps {
  squad: ChildNode;
  squadIdx: number;
  colorTheme: SquadColorTheme;
}

export default function HierarchySquadBranch({
  squad,
  squadIdx,
  colorTheme,
}: HierarchySquadBranchProps) {
  const openEditModal = useHierarchyStore((s) => s.openEditModal);
  const deleteSquad = useHierarchyStore((s) => s.deleteSquad);
  const addSubMember = useHierarchyStore((s) => s.addSubMember);
  const deleteSubMember = useHierarchyStore((s) => s.deleteSubMember);
  const addSubChild = useHierarchyStore((s) => s.addSubChild);
  const deleteSubChild = useHierarchyStore((s) => s.deleteSubChild);
  const dropOnSquadLead = useHierarchyStore((s) => s.dropOnSquadLead);
  const dropOnSubMember = useHierarchyStore((s) => s.dropOnSubMember);
  const dropOnSubChild = useHierarchyStore((s) => s.dropOnSubChild);

  return (
    <div className="flex flex-col items-center relative min-w-[280px]">
      {/* Vertical line from Bus bar down to Squad Badge */}
      <div className={`w-0.5 h-6 ${colorTheme.line} relative flex items-center justify-center`}>
        <div
          className={`w-2.5 h-2.5 rounded-full ${colorTheme.dot} ring-2 ring-white shadow-sm absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10`}
        />
      </div>

      {/* SQUAD BRANCH PILL BADGE */}
      <button
        type="button"
        onClick={() => openEditModal({ type: 'squadLead', squadIndex: squadIdx, squad })}
        className={`group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${colorTheme.bg} text-white font-extrabold text-xs shadow-md hover:scale-105 transition-transform cursor-pointer relative z-10`}
        title="Bấm để đổi tên Squad hoặc cấu hình vai trò"
      >
        <span>{squad.squadName || `Squad ${squadIdx + 1}`}</span>
      </button>

      {/* Vertical line from Squad Badge down to Squad Lead Card */}
      <div className={`w-0.5 h-8 ${colorTheme.line} relative flex items-center justify-center`}>
        <div
          className={`w-2.5 h-2.5 rounded-full ${colorTheme.dot} ring-2 ring-white shadow-sm absolute bottom-0 -mb-1 z-10`}
        />
      </div>

      {/* LEVEL 2: SQUAD LEAD CARD */}
      <div className="relative mt-10">
        <OrgNodeCard
          member={squad}
          nodeType="squadLead"
          squadBadgeText={squad.squadName}
          onEdit={() => openEditModal({ type: 'squadLead', squadIndex: squadIdx, squad })}
          onDelete={() => deleteSquad(squadIdx)}
          onAddChild={() => addSubMember(squadIdx)}
          onDropMember={(data) => dropOnSquadLead(squadIdx, data.member)}
        />
      </div>

      {/* LEVEL 3: DIRECT CHILDREN OF SQUAD LEAD (SIDE-BY-SIDE) */}
      {squad.children.length === 0 ? (
        <div className="flex flex-col items-center mt-3">
          <div className={`w-0.5 h-6 ${colorTheme.line}`} />
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add('border-purple-500', 'bg-purple-50');
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('border-purple-500', 'bg-purple-50');
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('border-purple-500', 'bg-purple-50');
              try {
                const data = JSON.parse(e.dataTransfer.getData('application/json'));
                if (data?.member) {
                  addSubMember(squadIdx, data.member);
                }
              } catch { }
            }}
            className="border border-dashed border-gray-200 rounded-2xl p-2.5 w-[210px] text-center text-xs text-slate-400 hover:border-purple-400 hover:text-purple-700 transition-colors cursor-pointer select-none bg-white/60 shadow-sm"
            onClick={() => addSubMember(squadIdx)}
          >
            <Plus className="w-3.5 h-3.5 mx-auto mb-1 text-slate-400" />
            <span>Thả để thêm cấp dưới</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full mt-0">
          {/* Vertical line from Squad Lead card down to children container */}
          <div className={`w-0.5 h-10 ${colorTheme.line} relative flex items-center justify-center`}>
            {squad.children.length === 1 && (
              <div
                className={`w-2.5 h-2.5 rounded-full ${colorTheme.dot} ring-2 ring-white shadow-sm absolute bottom-0 -mb-1 z-10`}
              />
            )}
          </div>

          {/* SIBLING CHILDREN ROW CONTAINER (SIDE-BY-SIDE) */}
          <div className="flex items-start justify-center gap-6">
            <div className="relative flex items-start justify-center gap-6">
              {squad.children.length > 1 && (
                <>
                  <div
                    className={`absolute top-0 h-0.5 ${colorTheme.line}`}
                    style={{
                      left: '115px',
                      right: '115px',
                    }}
                  />
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${colorTheme.dot} ring-2 ring-white shadow-sm absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10`}
                  />
                </>
              )}

              {squad.children.map((subMember, subIdx) => {
                const hasSubChildren =
                  Array.isArray(subMember.children) && subMember.children.length > 0;

                return (
                  <div
                    key={`${subMember.id}-${subIdx}`}
                    className="flex flex-col items-center relative"
                  >
                    {squad.children.length > 1 && (
                      <div className={`w-0.5 h-8 ${colorTheme.line} relative flex items-center justify-center`}>
                        <div
                          className={`w-2 h-2 rounded-full ${colorTheme.dot} ring-2 ring-white shadow-sm absolute bottom-0 -mb-1 z-10`}
                        />
                      </div>
                    )}

                    <div className="relative mt-10">
                      <OrgNodeCard
                        member={subMember}
                        nodeType="subMember"
                        onEdit={() =>
                          openEditModal({
                            type: 'subMember',
                            squadIndex: squadIdx,
                            subIndex: subIdx,
                            sub: subMember,
                            squadName: squad.squadName,
                          })
                        }
                        onDelete={() => deleteSubMember(squadIdx, subIdx)}
                        onAddChild={() => addSubChild(squadIdx, subIdx)}
                        onDropMember={(data) =>
                          dropOnSubMember(squadIdx, subIdx, data.member)
                        }
                      />
                    </div>

                    {/* LEVEL 4: SUB-CHILDREN */}
                    {hasSubChildren && (
                      <div className="flex flex-col items-center w-full mt-0">
                        <div className={`w-0.5 h-10 ${colorTheme.line} relative flex items-center justify-center`}>
                          {subMember.children!.length === 1 && (
                            <div
                              className={`w-2 h-2 rounded-full ${colorTheme.dot} ring-2 ring-white shadow-sm absolute bottom-0 -mb-1 z-10`}
                            />
                          )}
                        </div>

                        <div className="relative flex items-start justify-center gap-4">
                          {subMember.children!.length > 1 && (
                            <>
                              <div
                                className={`absolute top-0 h-0.5 ${colorTheme.line}`}
                                style={{
                                  left: '105px',
                                  right: '105px',
                                }}
                              />
                              <div
                                className={`w-2 h-2 rounded-full ${colorTheme.dot} ring-2 ring-white shadow-sm absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10`}
                              />
                            </>
                          )}

                          {subMember.children!.map((subChild, childIdx) => (
                            <div
                              key={`${subChild.id}-${childIdx}`}
                              className="flex flex-col items-center relative"
                            >
                              {subMember.children!.length > 1 && (
                                <div className={`w-0.5 h-8 ${colorTheme.line} relative flex items-center justify-center`}>
                                  <div
                                    className={`w-2 h-2 rounded-full ${colorTheme.dot} ring-2 ring-white shadow-sm absolute bottom-0 -mb-1 z-10`}
                                  />
                                </div>
                              )}
                              <div className="relative mt-10">
                                <OrgNodeCard
                                  member={subChild}
                                  nodeType="subChild"
                                  onEdit={() =>
                                    openEditModal({
                                      type: 'subChild',
                                      squadIndex: squadIdx,
                                      subIndex: subIdx,
                                      childIndex: childIdx,
                                      child: subChild,
                                      parentName: subMember.name,
                                    })
                                  }
                                  onDelete={() =>
                                    deleteSubChild(squadIdx, subIdx, childIdx)
                                  }
                                  onDropMember={(data) =>
                                    dropOnSubChild(squadIdx, subIdx, childIdx, data.member)
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Drop target to add Level 4 subordinate */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add('border-indigo-500', 'bg-indigo-50');
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50');
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50');
                        try {
                          const data = JSON.parse(e.dataTransfer.getData('application/json'));
                          if (data?.member) {
                            addSubChild(squadIdx, subIdx, data.member);
                          }
                        } catch { }
                      }}
                      onClick={() => addSubChild(squadIdx, subIdx)}
                      className="mt-4 rounded-xl h-10 flex items-center justify-center w-[180px] text-center text-xs text-white hover:bg-gray-700 transition-colors cursor-pointer select-none bg-gray-800"
                      title="Kéo thả hoặc bấm để thêm cấp dưới cho nhân sự này"
                    >
                      <span>Thêm cấp dưới</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Drop Target: Thêm thành viên mới vào cùng hàng (sibling) */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('border-purple-500', 'bg-purple-50');
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('border-purple-500', 'bg-purple-50');
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('border-purple-500', 'bg-purple-50');
                try {
                  const data = JSON.parse(e.dataTransfer.getData('application/json'));
                  if (data?.member) {
                    addSubMember(squadIdx, data.member);
                  }
                } catch { }
              }}
              onClick={() => addSubMember(squadIdx)}
              className="border border-dashed border-gray-200 rounded-2xl p-4 w-[160px] h-[190px] flex flex-col items-center justify-center text-center text-xs text-slate-400 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50/30 transition-all cursor-pointer select-none bg-white/50 shrink-0 self-start mt-20"
            >
              <Plus className="w-4 h-4 mx-auto mb-1 text-slate-400" />
              <span className="font-bold text-gray-800 text-sm">Thêm cấp dưới</span>
              <span className="text-xs text-gray-700 mt-1">Kéo thả nhân sự vào đây</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
