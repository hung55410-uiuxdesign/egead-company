'use client';

import { Plus, AlertCircle } from 'lucide-react';
import { Button, EmptyState } from '@astryxdesign/core';
import OrgNodeCard from '../OrgNodeCard';
import HierarchySquadBranch, { SQUAD_COLORS } from './HierarchySquadBranch';
import { useHierarchyStore } from './useHierarchyStore';

export { SQUAD_COLORS };

export default function HierarchyTree() {
  const leaders = useHierarchyStore((s) => s.leaders);
  const selectedLeaderId = useHierarchyStore((s) => s.selectedLeaderId);
  const childNodes = useHierarchyStore((s) => s.childNodes);
  const openEditModal = useHierarchyStore((s) => s.openEditModal);
  const addSquad = useHierarchyStore((s) => s.addSquad);

  const currentLeader = leaders.find((l) => l.id === selectedLeaderId);

  if (childNodes.length === 0) {
    return (
      <div className="flex flex-col items-center">
        {currentLeader && (
          <div className="flex flex-col items-center relative z-20">
            <OrgNodeCard
              member={currentLeader}
              nodeType="root"
              onEdit={() => openEditModal({ type: 'leader', member: currentLeader })}
            />
          </div>
        )}

        <div className="mt-8 p-8 max-w-md bg-white rounded-3xl border border-slate-200 text-center">
          <EmptyState
            icon={<AlertCircle className="w-8 h-8 text-slate-400" />}
            title="Chưa có Squads nào được tạo"
            description="Kéo nhân sự từ kho bên phải vào đây hoặc bấm nút bên dưới để tạo Squad đầu tiên."
            actions={
              <Button
                label="Thêm Squad đầu tiên"
                variant="primary"
                onClick={() => addSquad()}
                className="px-4 h-10"
              />
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center gap-12 sm:gap-16 min-w-max">
      {/* Central Org Tree Column (Root Leader + Active Squads always 100% aligned) */}
      <div className="flex flex-col items-center">
        {/* Root Leader Node */}
        {currentLeader && (
          <div className="flex flex-col items-center relative z-20">
            <OrgNodeCard
              member={currentLeader}
              nodeType="root"
              onEdit={() => openEditModal({ type: 'leader', member: currentLeader })}
            />

            {/* Vertical trunk connecting down to horizontal bus bar */}
            <div className="w-0.5 h-12 bg-indigo-500" />
          </div>
        )}

        {/* Active squads branch container with bus bar */}
        <div className="relative flex items-start justify-center gap-12 sm:gap-16">
          {/* Split Dot at the intersection of root trunk and bus line */}
          <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 ring-4 ring-indigo-200 shadow-md absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20" />

          {/* Horizontal Bus Connector Bar spanning across active squads */}
          {childNodes.length > 1 && (
            <div
              className="absolute top-0 h-0.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500"
              style={{
                left: '140px',
                right: '140px',
              }}
            />
          )}

          {childNodes.map((squad, squadIdx) => (
            <HierarchySquadBranch
              key={`${squad.id || 'squad'}-${squadIdx}`}
              squad={squad}
              squadIdx={squadIdx}
              colorTheme={SQUAD_COLORS[squadIdx % SQUAD_COLORS.length]}
            />
          ))}
        </div>
      </div>

      {/* Add New Squad Drop Target / Button */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add('border-emerald-500', 'bg-emerald-50');
        }}
        onDragLeave={(e) => {
          e.currentTarget.classList.remove('border-emerald-500', 'bg-emerald-50');
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove('border-emerald-500', 'bg-emerald-50');
          try {
            const data = JSON.parse(e.dataTransfer.getData('application/json'));
            if (data?.member) {
              addSquad(data.member);
            }
          } catch { }
        }}
        onClick={() => addSquad()}
        className="flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-2xl p-6 min-w-[220px] h-[260px] text-center text-xs text-gray-500 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/40 transition-all cursor-pointer bg-white/50 select-none shadow-sm self-start mt-[360px]"
      >
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400">
          <Plus className="w-6 h-6" />
        </div>
        <div className="font-extrabold text-slate-800 text-sm">
          Thêm Squad mới
        </div>
        <div className="text-xs text-slate-400 mt-1">
          Kéo nhân sự thả vào đây để tạo nhánh mới
        </div>
      </div>
    </div>
  );
}
