'use client';

import React, { useState } from 'react';
import { Search, GripVertical, ChevronRight, Sparkles } from 'lucide-react';
import { Badge, Selector, TextInput } from '@astryxdesign/core';
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
    <aside className="w-80 xl:w-88 shrink-0 h-full bg-white rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-slate-900 text-sm">
              Kho nhân sự
            </h3>
            <Badge label={`${filteredMembers.length}`} variant="neutral" className='h-8 px-4' />
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
        <TextInput
          label="Tìm kiếm nhân sự"
          isLabelHidden
          value={search}
          onChange={(val) => setSearch(val)}
          placeholder="Tìm theo tên, chức danh, kỹ năng..."
          startIcon={<Search className="w-4 h-4 text-slate-400" />}
          hasClear
          width="100%"
          className="h-10 border text-xs font-semibile"
        />

        <Selector
          label="Lọc theo phòng ban"
          isLabelHidden
          className='h-10 border'
          value={departmentFilter}
          onChange={(val) => setDepartmentFilter(val)}
          options={[
            { value: 'all', label: `Tất cả phòng ban (${members.length})` },
            ...DEPARTMENTS.map((dept) => ({ value: dept, label: dept })),
          ]}
        />
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
                  <Badge label="Lãnh đạo" variant="purple" className='h-8 px-4' />
                ) : (
                  <Badge label={member.department.split('&')[0].trim()} variant="neutral" className='h-8 px-4' />
                )}
                <div className="text-slate-300 group-hover:text-purple-600 transition-colors p-1">
                  <GripVertical className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
