'use client';

import React, { useState, useEffect } from 'react';
import { X, UserCheck, Shield } from 'lucide-react';
import { Button, Card, Badge, Field, Selector } from '@astryxdesign/core';
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
              <Badge label={currentMember.department} variant="neutral" />
            </div>
          )}

          {/* Squad Lead specific fields */}
          {target.type === 'squadLead' && (
            <>
              <Field
                label="Tên Squad (Branch Name)"
                inputID="modal-squad-name"
                isRequired
                description="Ví dụ: Development, Marketing, AI Architecture..."
              >
                <input
                  id="modal-squad-name"
                  type="text"
                  value={squadName}
                  onChange={(e) => setSquadName(e.target.value)}
                  placeholder="Nhập tên Squad..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                  required
                />
              </Field>

              <Field
                label="Trọng tâm nghiệp vụ (Squad Focus)"
                inputID="modal-squad-focus"
                description="Mô tả nhiệm vụ cốt lõi của nhánh này"
              >
                <input
                  id="modal-squad-focus"
                  type="text"
                  value={squadFocus}
                  onChange={(e) => setSquadFocus(e.target.value)}
                  placeholder="Ví dụ: Kiến trúc hệ thống headless, hạ tầng đa kênh..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </Field>

              <Field
                label="Nhãn cấp bậc (Level Tag)"
                inputID="modal-level-tag"
                description="Nhãn hiển thị bên dưới tên chức danh"
              >
                <input
                  id="modal-level-tag"
                  type="text"
                  value={levelTag}
                  onChange={(e) => setLevelTag(e.target.value)}
                  placeholder="Ví dụ: Trưởng nhóm phụ trách / Squad Lead"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </Field>
            </>
          )}

          {/* Responsibility field for leads and sub-members */}
          {(target.type === 'squadLead' || target.type === 'subMember') && (
            <Field
              label="Phân công nhiệm vụ cụ thể (Responsibility)"
              inputID="modal-responsibility"
              description="Nhiệm vụ trực tiếp và trọng trách được giao"
            >
              <textarea
                id="modal-responsibility"
                rows={3}
                value={responsibility}
                onChange={(e) => setResponsibility(e.target.value)}
                placeholder="Mô tả phân công công việc cụ thể..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
              />
            </Field>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 p-4 border-t border-slate-100 bg-slate-50/50">
          <Button
            label="Hủy bỏ"
            variant="ghost"
            onClick={onClose}
          />
          <Button
            label="Cập nhật vị trí"
            variant="primary"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
