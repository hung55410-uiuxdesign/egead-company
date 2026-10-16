'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button, Badge, Field, Selector, TextInput, TextArea } from '@astryxdesign/core';
import { AdminTeamMember } from '@/lib/services/people.service';
import type { ChildNode, SubChildNode } from '@/components/pages/company/people/leaderTeamData';

export type EditTarget =
  | { type: 'leader'; member: AdminTeamMember }
  | { type: 'squadLead'; squadIndex: number; squad: ChildNode }
  | { type: 'subMember'; squadIndex: number; subIndex: number; sub: SubChildNode; squadName: string }
  | { type: 'subChild'; squadIndex: number; subIndex: number; childIndex: number; child: SubChildNode; parentName: string };

interface NodeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: EditTarget | null;
  allMembers: AdminTeamMember[];
  onSaveLeader?: (updatedLeaderId: string) => void;
  onSaveSquadLead?: (squadIndex: number, updatedSquad: Partial<ChildNode>, newMemberId?: string) => void;
  onSaveSubMember?: (squadIndex: number, subIndex: number, responsibility: string, newMemberId?: string) => void;
  onSaveSubChild?: (squadIndex: number, subIndex: number, childIndex: number, responsibility: string, newMemberId?: string) => void;
}

export default function NodeEditModal({
  isOpen,
  onClose,
  target,
  allMembers,
  onSaveLeader,
  onSaveSquadLead,
  onSaveSubMember,
  onSaveSubChild,
}: NodeEditModalProps) {
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [squadName, setSquadName] = useState('');
  const [squadFocus, setSquadFocus] = useState('');
  const [levelTag, setLevelTag] = useState('');
  const [responsibility, setResponsibility] = useState('');

  useEffect(() => {
    if (!target) return;

    if (target.type === 'leader') {
      setSelectedMemberId(target.member.id);
    } else if (target.type === 'squadLead') {
      setSelectedMemberId(target.squad.id);
      setSquadName(target.squad.squadName || '');
      setSquadFocus(target.squad.squadFocus || '');
      setLevelTag(target.squad.levelTag || '');
      setResponsibility(target.squad.responsibility || '');
    } else if (target.type === 'subMember') {
      setSelectedMemberId(target.sub.id);
      setResponsibility(target.sub.responsibility || '');
    } else if (target.type === 'subChild') {
      setSelectedMemberId(target.child.id);
      setResponsibility(target.child.responsibility || '');
    }
  }, [target]);

  if (!isOpen || !target) return null;

  const currentMember = allMembers.find((m) => m.id === selectedMemberId);

  const handleSave = () => {
    if (target.type === 'leader') {
      if (onSaveLeader && selectedMemberId) {
        onSaveLeader(selectedMemberId);
      }
    } else if (target.type === 'squadLead') {
      if (onSaveSquadLead) {
        onSaveSquadLead(
          target.squadIndex,
          {
            squadName: squadName.trim() || 'Squad',
            squadFocus: squadFocus.trim(),
            levelTag: levelTag.trim() || 'Trưởng nhóm phụ trách / Squad Lead',
            responsibility: responsibility.trim(),
          },
          selectedMemberId !== target.squad.id ? selectedMemberId : undefined
        );
      }
    } else if (target.type === 'subMember') {
      if (onSaveSubMember) {
        onSaveSubMember(
          target.squadIndex,
          target.subIndex,
          responsibility.trim(),
          selectedMemberId !== target.sub.id ? selectedMemberId : undefined
        );
      }
    } else if (target.type === 'subChild') {
      if (onSaveSubChild) {
        onSaveSubChild(
          target.squadIndex,
          target.subIndex,
          target.childIndex,
          responsibility.trim(),
          selectedMemberId !== target.child.id ? selectedMemberId : undefined
        );
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {target.type === 'leader'
                ? 'Thông tin Lãnh đạo Cấp cao'
                : target.type === 'squadLead'
                  ? `Cấu hình ${target.squad.squadName || 'Squad'}`
                  : target.type === 'subMember'
                    ? `Thành viên Squad: ${target.squadName}`
                    : `Thành viên trực thuộc: ${target.parentName}`}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Thay đổi nhân sự phụ trách hoặc điều chỉnh thông số vai trò
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Member assignment */}
          <Selector
            label="Nhân sự được phân bổ vào vị trí này"
            description="Chọn nhân sự thay thế từ kho thành viên"
            className='h-10 border'
            value={selectedMemberId}
            onChange={(val) => setSelectedMemberId(val)}
            options={allMembers.map((m) => ({
              value: m.id,
              label: `${m.name} — ${m.role} (${m.department})`,
            }))}
          />

          {/* Member preview pill */}
          {currentMember && (
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                {currentMember.image ? (
                  <img
                    src={currentMember.image}
                    alt={currentMember.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">
                    {currentMember.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-slate-900 text-sm truncate">
                  {currentMember.name}
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {currentMember.role}
                </div>
              </div>
              <Badge label={currentMember.department} variant="neutral" className='h-8 px-4' />
            </div>
          )}

          {/* Squad Lead specific fields */}
          {target.type === 'squadLead' && (
            <>
              <TextInput
                label="Tên Squad (Branch Name)"
                isRequired
                description="Ví dụ: Development, Marketing, AI Architecture..."
                value={squadName}
                onChange={setSquadName}
                placeholder="Nhập tên Squad..."
                width="100%"
                className='h-10 border'
              />

              <TextInput
                label="Trọng tâm nghiệp vụ (Squad Focus)"
                description="Mô tả nhiệm vụ cốt lõi của nhánh này"
                value={squadFocus}
                onChange={setSquadFocus}
                placeholder="Ví dụ: Kiến trúc hệ thống headless, hạ tầng đa kênh..."
                width="100%"
                className='h-10 border'
              />

              <TextInput
                label="Nhãn cấp bậc (Level Tag)"
                description="Nhãn hiển thị bên dưới tên chức danh"
                value={levelTag}
                onChange={setLevelTag}
                placeholder="Ví dụ: Trưởng nhóm phụ trách / Squad Lead"
                width="100%"
                className='h-10 border'
              />
            </>
          )}

          {/* Responsibility field for leads and sub-members */}
          {(target.type === 'squadLead' || target.type === 'subMember') && (
            <TextArea
              label="Phân công nhiệm vụ cụ thể (Responsibility)"
              description="Nhiệm vụ trực tiếp và trọng trách được giao"
              rows={3}
              value={responsibility}
              onChange={setResponsibility}
              placeholder="Mô tả phân công công việc cụ thể..."
              width="100%"
              className="border"
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 p-4 border-t border-slate-100 bg-slate-50/50">
          <Button
            label="Hủy bỏ"
            variant="ghost"
            onClick={onClose}
            className="px-4 h-10"
          />
          <Button
            label="Cập nhật vị trí"
            variant="primary"
            className="px-4 h-10"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
