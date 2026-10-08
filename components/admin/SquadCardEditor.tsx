'use client';

import React, { useState } from 'react';
import {
  ChevronUp,
  ChevronDown,
  Trash2,
  Plus,
  Users,
  UserCheck,
  ChevronRight,
} from 'lucide-react';
import { Button, Card, Badge, Field } from '@astryxdesign/core';
import { AdminTeamMember } from '@/lib/services/people.service';
import type { ChildNode, SubChildNode } from '@/app/(public)/people/leaderTeamData';

interface SquadCardEditorProps {
  squadIndex: number;
  totalSquads: number;
  squad: ChildNode;
  allMembers: AdminTeamMember[];
  onChange: (updatedSquad: ChildNode) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}

export default function SquadCardEditor({
  squadIndex,
  totalSquads,
  squad,
  allMembers,
  onChange,
  onMoveUp,
  onMoveDown,
  onDelete,
}: SquadCardEditorProps) {
  const [selectedNewMemberId, setSelectedNewMemberId] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  // Update top-level field of squad
  const updateField = (field: keyof ChildNode, value: any) => {
    onChange({
      ...squad,
      [field]: value,
    });
  };

  // Select Squad Lead from members pool
  const handleLeadChange = (memberId: string) => {
    const member = allMembers.find((m) => m.id === memberId);
    if (!member) return;

    onChange({
      ...squad,
      id: member.id,
      name: member.name,
      role: member.role,
      department: member.department as any,
      location: member.location,
      image: member.image,
      quote: member.quote ?? undefined,
      skills: member.skills,
      linkedin: member.linkedin ?? undefined,
    });
  };

  // Add a sub-member to this squad
  const handleAddSubMember = () => {
    if (!selectedNewMemberId) return;
    const member = allMembers.find((m) => m.id === selectedNewMemberId);
    if (!member) return;

    // Check if already in children
    if (squad.children.some((c) => c.id === member.id)) {
      alert('Thành viên này đã có trong Squad');
      return;
    }

    const newSubChild: SubChildNode = {
      id: member.id,
      name: member.name,
      role: member.role,
      department: member.department as any,
      location: member.location,
      image: member.image,
      quote: member.quote ?? undefined,
      skills: member.skills,
      responsibility: '',
      linkedin: member.linkedin ?? undefined,
    };

    onChange({
      ...squad,
      children: [...squad.children, newSubChild],
    });
    setSelectedNewMemberId('');
  };

  // Update responsibility for a sub-member
  const handleUpdateSubResponsibility = (subIndex: number, text: string) => {
    const nextChildren = [...squad.children];
    nextChildren[subIndex] = {
      ...nextChildren[subIndex],
      responsibility: text,
    };
    onChange({
      ...squad,
      children: nextChildren,
    });
  };

  // Move sub-member up
  const handleMoveSubUp = (subIndex: number) => {
    if (subIndex === 0) return;
    const nextChildren = [...squad.children];
    const temp = nextChildren[subIndex - 1];
    nextChildren[subIndex - 1] = nextChildren[subIndex];
    nextChildren[subIndex] = temp;
    onChange({
      ...squad,
      children: nextChildren,
    });
  };

  // Move sub-member down
  const handleMoveSubDown = (subIndex: number) => {
    if (subIndex === squad.children.length - 1) return;
    const nextChildren = [...squad.children];
    const temp = nextChildren[subIndex + 1];
    nextChildren[subIndex + 1] = nextChildren[subIndex];
    nextChildren[subIndex] = temp;
    onChange({
      ...squad,
      children: nextChildren,
    });
  };

  // Remove sub-member
  const handleRemoveSubMember = (subIndex: number) => {
    onChange({
      ...squad,
      children: squad.children.filter((_, idx) => idx !== subIndex),
    });
  };

  // Candidates for adding as sub-members
  const availableCandidates = allMembers.filter(
    (m) => m.id !== squad.id && !squad.children.some((c) => c.id === m.id)
  );

  return (
    <Card
      variant="default"
      className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-sm transition-all"
    >
      {/* Squad Header Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-50/80 border-b border-slate-200/80 gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Badge label={`Squad ${squadIndex + 1}`} variant="purple" />
          <div className="font-extrabold text-slate-900 text-sm truncate">
            {squad.squadName || 'Squad chưa đặt tên'}
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            ({squad.children.length} thành viên trực thuộc)
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Reorder Buttons */}
          <Button
            label="Lên"
            variant="ghost"
            size="sm"
            isDisabled={squadIndex === 0}
            onClick={onMoveUp}
          />
          <Button
            label="Xuống"
            variant="ghost"
            size="sm"
            isDisabled={squadIndex === totalSquads - 1}
            onClick={onMoveDown}
          />

          <Button
            label={isExpanded ? 'Thu gọn' : 'Mở rộng'}
            variant="secondary"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          />

          <Button
            label="Xóa Squad"
            variant="destructive"
            size="sm"
            onClick={onDelete}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Section 1: Squad Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Tên Squad"
              inputID={`squad-${squadIndex}-name`}
              isRequired
              description="Ví dụ: AI & Machine Learning Squad, Cross-Border Architecture..."
            >
              <input
                id={`squad-${squadIndex}-name`}
                type="text"
                value={squad.squadName}
                onChange={(e) => updateField('squadName', e.target.value)}
                placeholder="Nhập tên Squad..."
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
                required
              />
            </Field>

            <Field
              label="Trọng tâm nghiệp vụ (Squad Focus)"
              inputID={`squad-${squadIndex}-focus`}
              description="Mô tả tóm tắt nhiệm vụ chính mà squad này giải quyết"
            >
              <input
                id={`squad-${squadIndex}-focus`}
                type="text"
                value={squad.squadFocus}
                onChange={(e) => updateField('squadFocus', e.target.value)}
                placeholder="Ví dụ: Phát triển thuật toán gợi ý và tối ưu hóa chuyển đổi..."
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
              />
            </Field>
          </div>

          {/* Section 2: Squad Lead */}
          <div className="p-4 rounded-xl border border-purple-200/70 bg-purple-50/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-purple-900">
                Chỉ huy Squad (Squad Lead / Sub-Node)
              </div>
              <Badge label="Trưởng nhóm Squad" variant="purple" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Chọn nhân sự làm Squad Lead"
                inputID={`squad-${squadIndex}-lead`}
                isRequired
                description="Chọn thành viên phụ trách chính nhóm này"
              >
                <select
                  id={`squad-${squadIndex}-lead`}
                  value={squad.id}
                  onChange={(e) => handleLeadChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors font-medium"
                >
                  <option value="">-- Chọn thành viên phụ trách --</option>
                  {allMembers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} — {m.role} ({m.department})
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Nhãn cấp bậc (Level Tag)"
                inputID={`squad-${squadIndex}-tag`}
                description="Tùy chỉnh nhãn cấp bậc hiển thị trên sơ đồ"
              >
                <input
                  id={`squad-${squadIndex}-tag`}
                  type="text"
                  value={squad.levelTag}
                  onChange={(e) => updateField('levelTag', e.target.value)}
                  placeholder="Ví dụ: Trưởng nhóm phụ trách / Squad Lead"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                />
              </Field>
            </div>

            <Field
              label="Trách nhiệm trọng tâm của Squad Lead"
              inputID={`squad-${squadIndex}-lead-resp`}
              description="Nhiệm vụ trực tiếp và vai trò dẫn dắt của trưởng nhóm"
            >
              <textarea
                id={`squad-${squadIndex}-lead-resp`}
                rows={2}
                value={squad.responsibility}
                onChange={(e) => updateField('responsibility', e.target.value)}
                placeholder="Mô tả vai trò dẫn dắt của trưởng nhóm trong squad..."
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
              />
            </Field>
          </div>

          {/* Section 3: Sub-members */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Thành viên trực thuộc Squad ({squad.children.length})
                </h4>
                <p className="text-xs text-slate-500">
                  Phân công nhiệm vụ cụ thể cho từng thành viên trong nhóm
                </p>
              </div>

              {/* Add member controls */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedNewMemberId}
                  onChange={(e) => setSelectedNewMemberId(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 max-w-[220px]"
                >
                  <option value="">-- Chọn thành viên thêm vào --</option>
                  {availableCandidates.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.role})
                    </option>
                  ))}
                </select>
                <Button
                  label="Thêm vào Squad"
                  variant="secondary"
                  size="sm"
                  isDisabled={!selectedNewMemberId}
                  onClick={handleAddSubMember}
                />
              </div>
            </div>

            {squad.children.length === 0 ? (
              <div className="py-6 px-4 text-center rounded-xl border border-dashed border-slate-200 text-xs text-slate-400">
                Squad này hiện chưa có thành viên trực thuộc nào. Chọn thành viên ở trên để bổ sung.
              </div>
            ) : (
              <div className="space-y-2.5">
                {squad.children.map((sub, subIdx) => (
                  <div
                    key={`${sub.id}-${subIdx}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    {/* Avatar & Info */}
                    <div className="flex items-center gap-2.5 min-w-[200px] shrink-0">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                        {sub.image ? (
                          <img
                            src={sub.image}
                            alt={sub.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-xs">
                            {sub.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-xs truncate">
                          {sub.name}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {sub.role}
                        </div>
                      </div>
                    </div>

                    {/* Responsibility Input */}
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={sub.responsibility}
                        onChange={(e) =>
                          handleUpdateSubResponsibility(subIdx, e.target.value)
                        }
                        placeholder="Phân công nhiệm vụ cụ thể cho thành viên này trong squad..."
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800"
                      />
                    </div>

                    {/* Reorder and Delete controls */}
                    <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                      <Button
                        label="Lên"
                        variant="ghost"
                        size="sm"
                        isDisabled={subIdx === 0}
                        onClick={() => handleMoveSubUp(subIdx)}
                      />
                      <Button
                        label="Xuống"
                        variant="ghost"
                        size="sm"
                        isDisabled={subIdx === squad.children.length - 1}
                        onClick={() => handleMoveSubDown(subIdx)}
                      />
                      <Button
                        label="Xóa"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveSubMember(subIdx)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
