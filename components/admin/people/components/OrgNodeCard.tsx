'use client';

import React, { useState } from 'react';
import { Pencil, Mail, Trash2, Plus, GripVertical, CheckCircle2 } from 'lucide-react';
import { IconButton, Badge } from '@astryxdesign/core';
import { AdminTeamMember } from '@/lib/services/people.service';

interface OrgNodeCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    department?: string;
    image?: string;
    location?: string;
    responsibility?: string;
    quote?: string | null;
    linkedin?: string | null;
  };
  nodeType: 'root' | 'squadLead' | 'subMember' | 'subChild';
  squadBadgeText?: string;
  squadBadgeColor?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddChild?: () => void;
  onDropMember?: (memberData: any) => void;
  onDragStartNode?: (e: React.DragEvent) => void;
}

export default function OrgNodeCard({
  member,
  nodeType,
  squadBadgeText,
  squadBadgeColor = 'cyan',
  onEdit,
  onDelete,
  onAddChild,
  onDropMember,
  onDragStartNode,
}: OrgNodeCardProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    try {
      const raw = e.dataTransfer.getData('application/json');
      if (raw && onDropMember) {
        const parsed = JSON.parse(raw);
        onDropMember(parsed);
      }
    } catch (err) {
      console.error('Error handling drop on node:', err);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      draggable={nodeType !== 'root'}
      onDragStart={onDragStartNode}
      className={`relative group bg-white rounded-2xl border transition-all duration-200 select-none text-center ${
        isDragOver
          ? 'ring-4 ring-emerald-400 bg-emerald-50/90 border-emerald-500 scale-105 shadow-xl z-30'
          : 'border-slate-200/90 shadow-md hover:shadow-xl hover:border-slate-300'
      } ${
        nodeType === 'root'
          ? 'w-[260px] sm:w-[280px] pt-8 pb-3 px-4'
          : nodeType === 'squadLead'
          ? 'w-[230px] sm:w-[250px] pt-7 pb-3 px-3.5'
          : 'w-[210px] sm:w-[230px] pt-7 pb-3 px-3'
      }`}
    >
      {/* Drag Over Hint Overlay */}
      {isDragOver && (
        <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 backdrop-blur-[1px] flex items-center justify-center z-40 pointer-events-none">
          <div className="bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            Thả để thay thế nhân sự
          </div>
        </div>
      )}

      {/* Floating Circular Avatar - Exactly like reference photo */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 rounded-full overflow-hidden bg-white border-2 border-white ring-4 ring-slate-100 shadow-md shrink-0 transition-transform group-hover:scale-105 ${
          nodeType === 'root'
            ? 'w-16 h-16 -top-8'
            : nodeType === 'squadLead'
            ? 'w-14 h-14 -top-7'
            : 'w-12 h-12 -top-6'
        }`}
      >
        {member.image ? (
          <img
            src={member.image}
            alt={member.name || 'Member'}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 bg-slate-100">
            {member.name ? member.name.charAt(0) : '?'}
          </div>
        )}
      </div>

      {/* Member Name */}
      <div className="mt-1">
        <h4 className="font-extrabold text-slate-900 text-sm truncate px-1" title={member.name}>
          {member.name || 'Chưa gán nhân sự'}
        </h4>

        {/* Member Role / Title */}
        <p className="text-xs text-slate-500 font-medium truncate mt-0.5 px-1" title={member.role}>
          {member.role || 'Vị trí công tác'}
        </p>

        {/* Optional Responsibility or Location snippet */}
        {member.responsibility ? (
          <p
            className="text-[11px] text-slate-400 truncate mt-1 italic px-1"
            title={member.responsibility}
          >
            "{member.responsibility}"
          </p>
        ) : member.location ? (
          <p className="text-[11px] text-slate-400 truncate mt-1 px-1">
            {member.location}
          </p>
        ) : null}
      </div>

      {/* Bottom Action Footer - Exactly matching reference photo with icon buttons */}
      <div className="border-t border-slate-100 mt-3 pt-2.5 flex items-center justify-center gap-1.5">
        {onEdit && (
          <IconButton
            label="Chỉnh sửa vị trí & phân công"
            icon={<Pencil className="w-3.5 h-3.5 text-slate-600" />}
            variant="secondary"
            size="sm"
            onClick={onEdit}
          />
        )}

        {/* Info / Message button */}
        <IconButton
          label="Xem chi tiết & liên hệ"
          icon={<Mail className="w-3.5 h-3.5 text-sky-600" />}
          variant="secondary"
          size="sm"
          onClick={() => setShowInfoPopup(!showInfoPopup)}
        />

        {/* Add Child / Sub-member button (for Squad Leads) */}
        {onAddChild && (
          <IconButton
            label="Thêm thành viên cấp dưới"
            icon={<Plus className="w-3.5 h-3.5 text-purple-600" />}
            variant="secondary"
            size="sm"
            onClick={onAddChild}
          />
        )}

        {/* Delete button (for squad leads & sub-members) */}
        {onDelete && (
          <IconButton
            label="Xóa khỏi sơ đồ"
            icon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}
            variant="ghost"
            size="sm"
            onClick={onDelete}
          />
        )}
      </div>

      {/* Info Popover when clicking mail/info icon */}
      {showInfoPopup && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-slate-900 text-white text-xs rounded-xl p-3 shadow-2xl z-50 text-left animate-fade-in">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <span className="font-bold text-emerald-400">{member.name}</span>
            <button
              type="button"
              onClick={() => setShowInfoPopup(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="mt-2 space-y-1 text-slate-300">
            <div>
              <span className="text-slate-400">Chức danh: </span>
              {member.role}
            </div>
            {member.department && (
              <div>
                <span className="text-slate-400">Phòng ban: </span>
                {member.department}
              </div>
            )}
            {member.location && (
              <div>
                <span className="text-slate-400">Địa điểm: </span>
                {member.location}
              </div>
            )}
            {member.responsibility && (
              <div className="pt-1 text-slate-300 border-t border-slate-800 italic">
                {member.responsibility}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
