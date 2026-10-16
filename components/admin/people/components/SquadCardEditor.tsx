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
import { Button, Card, Badge, Field, Selector, TextInput, TextArea } from '@astryxdesign/core';
import { AdminTeamMember } from '@/lib/services/people.service';
import type { ChildNode, SubChildNode } from '@/components/pages/company/people/leaderTeamData';

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
          <Badge label={`Squad ${squadIndex + 1}`} variant="purple" className='h-8 px-4' />
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
            className="px-4 h-10"
            isDisabled={squadIndex === 0}
            onClick={onMoveUp}
          />
          <Button
            label="Xuống"
            variant="ghost"
            className="px-4 h-10"
            isDisabled={squadIndex === totalSquads - 1}
            onClick={onMoveDown}
          />

          <Button
            label={isExpanded ? 'Thu gọn' : 'Mở rộng'}
            variant="secondary"
            className="px-4 h-10"
            onClick={() => setIsExpanded(!isExpanded)}
          />

          <Button
            label="Xóa Squad"
            variant="destructive"
            className="px-4 h-10"
            onClick={onDelete}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Section 1: Squad Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Tên Squad"
              isRequired
              description="Ví dụ: AI & Machine Learning Squad, Cross-Border Architecture..."
              value={squad.squadName}
              onChange={(val) => updateField('squadName', val)}
              placeholder="Nhập tên Squad..."
              width="100%"
              className='h-10 border'
            />

            <TextInput
              label="Trọng tâm nghiệp vụ (Squad Focus)"
              description="Mô tả tóm tắt nhiệm vụ chính mà squad này giải quyết"
              value={squad.squadFocus}
              onChange={(val) => updateField('squadFocus', val)}
              placeholder="Ví dụ: Phát triển thuật toán gợi ý và tối ưu hóa chuyển đổi..."
              width="100%"
              className='h-10 border'
            />
          </div>

          {/* Section 2: Squad Lead */}
          <div className="p-4 rounded-xl border border-purple-200/70 bg-purple-50/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-purple-900">
                Chỉ huy Squad (Squad Lead / Sub-Node)
              </div>
              <Badge label="Trưởng nhóm Squad" variant="purple" className='h-8 px-4' />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Selector
                label="Chọn nhân sự làm Squad Lead"
                description="Chọn thành viên phụ trách chính nhóm này"
                value={squad.id}
                className='h-10 border'
                onChange={(val) => handleLeadChange(val)}
                options={[
                  { value: '', label: '-- Chọn thành viên phụ trách --' },
                  ...allMembers.map((m) => ({
                    value: m.id,
                    label: `${m.name} — ${m.role} (${m.department})`,
                  })),
                ]}
              />

              <TextInput
                label="Nhãn cấp bậc (Level Tag)"
                description="Tùy chỉnh nhãn cấp bậc hiển thị trên sơ đồ"
                value={squad.levelTag}
                onChange={(val) => updateField('levelTag', val)}
                placeholder="Ví dụ: Trưởng nhóm phụ trách / Squad Lead"
                width="100%"
                className='h-10 border'
              />
            </div>

            <TextArea
              label="Trách nhiệm trọng tâm của Squad Lead"
              description="Nhiệm vụ trực tiếp và vai trò dẫn dắt của trưởng nhóm"
              rows={2}
              value={squad.responsibility}
              onChange={(val) => updateField('responsibility', val)}
              placeholder="Mô tả vai trò dẫn dắt của trưởng nhóm trong squad..."
              width="100%"
              className="border"
            />
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
                <div className="w-56">
                  <Selector
                    label="Thêm thành viên"
                    isLabelHidden
                    className='h-10 border'
                    value={selectedNewMemberId}
                    onChange={(val) => setSelectedNewMemberId(val)}
                    options={[
                      { value: '', label: '-- Chọn thành viên thêm vào --' },
                      ...availableCandidates.map((m) => ({
                        value: m.id,
                        label: `${m.name} (${m.role})`,
                      })),
                    ]}
                  />
                </div>
                <Button
                  label="Thêm vào Squad"
                  variant="secondary"
                  className="px-4 h-10"
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
                      <TextInput
                        label="Phân công nhiệm vụ"
                        isLabelHidden
                        value={sub.responsibility}
                        onChange={(val) =>
                          handleUpdateSubResponsibility(subIdx, val)
                        }
                        placeholder="Phân công nhiệm vụ cụ thể cho thành viên này trong squad..."
                        width="100%"
                        className='h-10 border'
                      />
                    </div>

                    {/* Reorder and Delete controls */}
                    <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                      <Button
                        label="Lên"
                        variant="ghost"
                        className="px-4 h-10"
                        isDisabled={subIdx === 0}
                        onClick={() => handleMoveSubUp(subIdx)}
                      />
                      <Button
                        label="Xuống"
                        variant="ghost"
                        className="px-4 h-10"
                        isDisabled={subIdx === squad.children.length - 1}
                        onClick={() => handleMoveSubDown(subIdx)}
                      />
                      <Button
                        label="Xóa"
                        variant="destructive"
                        className="px-4 h-10"
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
