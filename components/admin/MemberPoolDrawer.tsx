'use client';

import React, { useState } from 'react';
import { Search, GripVertical, ChevronRight, Sparkles } from 'lucide-react';
import { Badge } from '@astryxdesign/core';
import { AdminTeamMember } from '@/lib/services/people.service';
import { DEPARTMENTS } from '@/lib/validations/people';

interface MemberPoolDrawerProps {
  members: AdminTeamMember[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function MemberPoolDrawer({
  members,
  isOpen,
  onToggle,
}: MemberPoolDrawerProps) {
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  if (!isOpen) return null;

  const filteredMembers = members.filter((m) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.department.toLowerCase().includes(q) ||
      m.skills.some((s) => s.toLowerCase().includes(q));

    const matchesDept =
      departmentFilter === 'all' || m.department === departmentFilter;

    return matchesSearch && matchesDept;
  });

  const handleDragStart = (e: React.DragEvent, member: AdminTeamMember) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        source: 'pool',
        member: {
          id: member.id,
          name: member.name,
          role: member.role,
          department: member.department,
          location: member.location,
          image: member.image,
          quote: member.quote,
          skills: member.skills,
          linkedin: member.linkedin,
          isLeader: member.isLeader,
        },
      })
    );
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <aside className="w-80 xl:w-88 shrink-0 h-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-slate-900 text-sm">
              Kho nhân sự kéo &amp; thả
            </h3>
            <Badge label={`${filteredMembers.length}`} variant="neutral" />
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Kéo thẻ bất kỳ thả vào sơ đồ để thay thế vị trí
          </p>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          title="Đóng khay"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Search & Department Filters */}
      <div className="p-3 border-b border-slate-100 space-y-2.5 bg-white">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, chức danh, kỹ năng..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800"
          />
        </div>

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:border-slate-800"
        >
          <option value="all">Tất cả phòng ban ({members.length})</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Draggable Members List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
        {filteredMembers.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            Không tìm thấy nhân sự phù hợp
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div
              key={member.id}
              draggable
              onDragStart={(e) => handleDragStart(e, member)}
              className="group p-2.5 rounded-xl border border-slate-200/90 bg-white hover:border-purple-300 hover:shadow-md cursor-grab active:cursor-grabbing transition-all flex items-center justify-between gap-2.5 select-none"
            >
              {/* Left: Avatar + Details */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-xs">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-xs truncate">
                    {member.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {member.role}
                  </div>
                </div>
              </div>

              {/* Right: Badge + Drag Grip Handle */}
              <div className="flex items-center gap-1.5 shrink-0">
                {member.isLeader ? (
                  <Badge label="Lãnh đạo" variant="purple" />
                ) : (
                  <Badge label={member.department.split('&')[0].trim()} variant="neutral" />
                )}
                <div className="text-slate-300 group-hover:text-purple-600 transition-colors p-1">
                  <GripVertical className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tip footer */}
      <div className="p-3 bg-purple-50/60 border-t border-purple-100 text-[11px] text-purple-900 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
        <span>
          Kéo thả nhân sự vào bất kỳ vị trí nào để thay thế ngay lập tức.
        </span>
      </div>
    </aside>
  );
}
