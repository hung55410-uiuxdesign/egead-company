'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  AlertCircle,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Move,
} from 'lucide-react';
import { Button, Card, Badge, Field, EmptyState, IconButton, Selector } from '@astryxdesign/core';
import { AdminTeamMember } from '@/lib/services/people.service';
import type { ChildNode, SubChildNode } from '@/components/pages/company/people/leaderTeamData';
import OrgNodeCard from '@/components/admin/OrgNodeCard';
import MemberPoolDrawer from '@/components/admin/MemberPoolDrawer';
import NodeEditModal, { EditTarget } from '@/components/admin/NodeEditModal';

interface PeopleHierarchyClientProps {
  leaders: AdminTeamMember[];
  allMembers: AdminTeamMember[];
  initialLeaderId?: string;
}

const SQUAD_COLORS = [
  { bg: 'bg-sky-500', border: 'border-sky-400', line: 'bg-sky-400', dot: 'bg-sky-500' },
  { bg: 'bg-purple-600', border: 'border-purple-500', line: 'bg-purple-500', dot: 'bg-purple-600' },
  { bg: 'bg-emerald-600', border: 'border-emerald-500', line: 'bg-emerald-500', dot: 'bg-emerald-600' },
  { bg: 'bg-amber-600', border: 'border-amber-500', line: 'bg-amber-500', dot: 'bg-amber-600' },
  { bg: 'bg-indigo-600', border: 'border-indigo-500', line: 'bg-indigo-500', dot: 'bg-indigo-600' },
  { bg: 'bg-rose-600', border: 'border-rose-500', line: 'bg-rose-500', dot: 'bg-rose-600' },
];

export default function PeopleHierarchyClient({
  leaders,
  allMembers,
  initialLeaderId,
}: PeopleHierarchyClientProps) {
  const router = useRouter();

  const [selectedLeaderId, setSelectedLeaderId] = useState<string>(
    initialLeaderId || leaders[0]?.id || ''
  );
  const [departmentScope, setDepartmentScope] = useState('');
  const [overview, setOverview] = useState('');
  const [childNodes, setChildNodes] = useState<ChildNode[]>([]);

  // Canvas Pan & Zoom States
  const canvasRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);

  const [zoomScale, setZoomScale] = useState<number>(0.85);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ scrollLeft: number; scrollTop: number; mouseX: number; mouseY: number }>({
    scrollLeft: 0,
    scrollTop: 0,
    mouseX: 0,
    mouseY: 0,
  });

  const [isPoolOpen, setIsPoolOpen] = useState(true);
  const [isScopeOpen, setIsScopeOpen] = useState(false);

  // Status & modal states
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Edit Modal
  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const currentLeader = leaders.find((l) => l.id === selectedLeaderId);

  // Center the scroll view on root leader
  const handleCenterView = useCallback(() => {
    const container = canvasRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll > 0) {
      container.scrollTo({
        left: Math.round(maxScroll / 2),
        top: 0,
        behavior: 'smooth',
      });
    } else {
      container.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    }
  }, []);

  // Fit entire hierarchy tree inside container viewport
  const handleFitView = useCallback(() => {
    const container = canvasRef.current;
    const tree = treeRef.current;
    if (!container || !tree) return;

    const containerW = container.clientWidth;
    const treeW = (tree.offsetWidth || 2400) / (zoomScale || 1);
    if (treeW <= 0 || containerW <= 0) return;

    const fit = Math.min(1, Math.max(0.4, Math.round(((containerW - 80) / treeW) * 100) / 100));
    setZoomScale(fit);
    setTimeout(() => {
      handleCenterView();
    }, 60);
  }, [zoomScale, handleCenterView]);

  // Fetch hierarchy tree when selectedLeaderId changes
  const loadHierarchy = useCallback(async (leaderId: string) => {
    if (!leaderId) return;

    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await fetch(`/api/admin/people/hierarchy?leaderId=${leaderId}`);
      const data = await res.json();

      if (data.success && data.data) {
        setDepartmentScope(data.data.departmentScope || '');
        setOverview(data.data.overview || '');
        setChildNodes(Array.isArray(data.data.childNodes) ? data.data.childNodes : []);
      } else {
        setDepartmentScope('');
        setOverview('');
        setChildNodes([]);
      }
      setHasChanges(false);

      // Smoothly center the view on leader card after render
      setTimeout(() => {
        handleCenterView();
      }, 100);
    } catch {
      setErrorMessage('Không thể tải dữ liệu sơ đồ tổ chức');
    } finally {
      setIsLoading(false);
    }
  }, [handleCenterView]);

  useEffect(() => {
    loadHierarchy(selectedLeaderId);
  }, [selectedLeaderId, loadHierarchy]);

  // Global mouse handlers for Drag-to-Scroll canvas navigation
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      const container = canvasRef.current;
      if (!container) return;

      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;

      container.scrollLeft = dragStartRef.current.scrollLeft - dx;
      container.scrollTop = dragStartRef.current.scrollTop - dy;
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  // Start free drag-to-scroll on empty canvas background
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click

    const target = e.target as HTMLElement;
    // Don't drag-scroll if clicking an interactive control or draggable member
    if (target.closest('button, input, select, textarea, [draggable="true"], a')) {
      return;
    }

    const container = canvasRef.current;
    if (!container) return;

    setIsDragging(true);
    dragStartRef.current = {
      scrollLeft: container.scrollLeft,
      scrollTop: container.scrollTop,
      mouseX: e.clientX,
      mouseY: e.clientY,
    };
  };

  // Canvas wheel: zoom when holding Ctrl or pinch; normal scroll otherwise
  const handleCanvasWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoomScale((prev) => {
        const next = Math.min(1.5, Math.max(0.4, Math.round(prev * zoomFactor * 100) / 100));
        return next;
      });
    }
  };

  // Switch Leader with dirty guard
  const handleSelectLeader = (nextId: string) => {
    if (nextId === selectedLeaderId) return;
    if (hasChanges) {
      const confirmLeave = confirm(
        'Bạn có thay đổi chưa lưu trên sơ đồ hiện tại. Bạn có chắc chắn muốn chuyển sang Lãnh đạo khác và hủy các thay đổi?'
      );
      if (!confirmLeave) return;
    }
    setSelectedLeaderId(nextId);
  };

  // Add new Squad
  const handleAddSquad = (initialMember?: AdminTeamMember) => {
    const member = initialMember || allMembers[0];
    const newSquad: ChildNode = {
      id: member?.id || '',
      name: member?.name || '',
      role: member?.role || '',
      department: (member?.department as any) || (currentLeader?.department as any) || 'Executive Leadership',
      location: member?.location || currentLeader?.location || 'Singapore / Global',
      image: member?.image || '',
      skills: member?.skills || [],
      responsibility: '',
      squadName: `Squad ${childNodes.length + 1}`,
      squadFocus: '',
      levelTag: 'Trưởng nhóm phụ trách / Squad Lead',
      children: [],
    };

    setChildNodes([...childNodes, newSquad]);
    setHasChanges(true);
  };

  // Delete Squad
  const handleDeleteSquad = (squadIndex: number) => {
    const squad = childNodes[squadIndex];
    if (
      !confirm(
        `Bạn có chắc chắn muốn xóa "${squad?.squadName || 'Squad'}" cùng toàn bộ thành viên trực thuộc?`
      )
    ) {
      return;
    }
    setChildNodes(childNodes.filter((_, idx) => idx !== squadIndex));
    setHasChanges(true);
  };

  // Add Sub-member to Squad (Level 3 - direct child of Squad Lead)
  const handleAddSubMember = (squadIndex: number, memberToAdd?: AdminTeamMember) => {
    const candidate = memberToAdd || allMembers.find((m) => m.id !== childNodes[squadIndex].id);
    if (!candidate) return;

    if (childNodes[squadIndex].children.some((c) => c.id === candidate.id)) {
      alert(`Nhân sự ${candidate.name} đã có trong Squad này`);
      return;
    }

    const newSub: SubChildNode = {
      id: candidate.id,
      name: candidate.name,
      role: candidate.role,
      department: candidate.department as any,
      location: candidate.location,
      image: candidate.image,
      quote: candidate.quote ?? undefined,
      skills: candidate.skills,
      responsibility: '',
      linkedin: candidate.linkedin ?? undefined,
      children: [],
    };

    const nextSquads = [...childNodes];
    nextSquads[squadIndex] = {
      ...nextSquads[squadIndex],
      children: [...nextSquads[squadIndex].children, newSub],
    };
    setChildNodes(nextSquads);
    setHasChanges(true);
  };

  // Delete Sub-member
  const handleDeleteSubMember = (squadIndex: number, subIndex: number) => {
    const nextSquads = [...childNodes];
    nextSquads[squadIndex] = {
      ...nextSquads[squadIndex],
      children: nextSquads[squadIndex].children.filter((_, idx) => idx !== subIndex),
    };
    setChildNodes(nextSquads);
    setHasChanges(true);
  };

  // Add Sub-child (Level 4 - child of Sub-member)
  const handleAddSubChild = (squadIndex: number, subIndex: number, memberToAdd?: AdminTeamMember) => {
    const parentSub = childNodes[squadIndex]?.children[subIndex];
    if (!parentSub) return;

    const candidate =
      memberToAdd ||
      allMembers.find((m) => m.id !== parentSub.id && m.id !== childNodes[squadIndex].id);
    if (!candidate) return;

    const existingChildren = parentSub.children || [];
    if (existingChildren.some((c) => c.id === candidate.id)) {
      alert(`Nhân sự ${candidate.name} đã có trong nhánh này`);
      return;
    }

    const newSubChild: SubChildNode = {
      id: candidate.id,
      name: candidate.name,
      role: candidate.role,
      department: candidate.department as any,
      location: candidate.location,
      image: candidate.image,
      quote: candidate.quote ?? undefined,
      skills: candidate.skills,
      responsibility: '',
      linkedin: candidate.linkedin ?? undefined,
      children: [],
    };

    const nextSquads = [...childNodes];
    nextSquads[squadIndex].children[subIndex] = {
      ...parentSub,
      children: [...existingChildren, newSubChild],
    };
    setChildNodes(nextSquads);
    setHasChanges(true);
  };

  // Delete Sub-child
  const handleDeleteSubChild = (squadIndex: number, subIndex: number, childIndex: number) => {
    const nextSquads = [...childNodes];
    const parentSub = nextSquads[squadIndex]?.children[subIndex];
    if (!parentSub) return;

    nextSquads[squadIndex].children[subIndex] = {
      ...parentSub,
      children: (parentSub.children || []).filter((_, idx) => idx !== childIndex),
    };
    setChildNodes(nextSquads);
    setHasChanges(true);
  };

  // Drag and Drop Replacement handlers
  const handleDropOnSquadLead = (squadIndex: number, droppedData: any) => {
    const droppedMember: AdminTeamMember = droppedData?.member;
    if (!droppedMember) return;

    const nextSquads = [...childNodes];
    nextSquads[squadIndex] = {
      ...nextSquads[squadIndex],
      id: droppedMember.id,
      name: droppedMember.name,
      role: droppedMember.role,
      department: droppedMember.department as any,
      location: droppedMember.location,
      image: droppedMember.image,
      quote: droppedMember.quote ?? undefined,
      skills: droppedMember.skills,
      linkedin: droppedMember.linkedin ?? undefined,
    };
    setChildNodes(nextSquads);
    setHasChanges(true);
    setSuccessMessage(`Đã thay thế Trưởng nhóm ${nextSquads[squadIndex].squadName} thành ${droppedMember.name}`);
  };

  const handleDropOnSubMember = (squadIndex: number, subIndex: number, droppedData: any) => {
    const droppedMember: AdminTeamMember = droppedData?.member;
    if (!droppedMember) return;

    const nextSquads = [...childNodes];
    const prevSub = nextSquads[squadIndex].children[subIndex];

    nextSquads[squadIndex].children[subIndex] = {
      ...prevSub,
      id: droppedMember.id,
      name: droppedMember.name,
      role: droppedMember.role,
      department: droppedMember.department as any,
      location: droppedMember.location,
      image: droppedMember.image,
      quote: droppedMember.quote ?? undefined,
      skills: droppedMember.skills,
      linkedin: droppedMember.linkedin ?? undefined,
    };

    setChildNodes(nextSquads);
    setHasChanges(true);
    setSuccessMessage(`Đã thay thế thành viên vị trí số ${subIndex + 1} thành ${droppedMember.name}`);
  };

  const handleDropOnSubChild = (
    squadIndex: number,
    subIndex: number,
    childIndex: number,
    droppedData: any
  ) => {
    const droppedMember: AdminTeamMember = droppedData?.member;
    if (!droppedMember) return;

    const nextSquads = [...childNodes];
    const parentSub = nextSquads[squadIndex].children[subIndex];
    const prevChild = (parentSub.children || [])[childIndex];

    if (!prevChild) return;

    const updatedChildren = [...(parentSub.children || [])];
    updatedChildren[childIndex] = {
      ...prevChild,
      id: droppedMember.id,
      name: droppedMember.name,
      role: droppedMember.role,
      department: droppedMember.department as any,
      location: droppedMember.location,
      image: droppedMember.image,
      quote: droppedMember.quote ?? undefined,
      skills: droppedMember.skills,
      linkedin: droppedMember.linkedin ?? undefined,
    };

    nextSquads[squadIndex].children[subIndex] = {
      ...parentSub,
      children: updatedChildren,
    };

    setChildNodes(nextSquads);
    setHasChanges(true);
    setSuccessMessage(`Đã thay thế nhân sự cấp dưới thành ${droppedMember.name}`);
  };

  // Save hierarchy to DB
  const handleSave = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!selectedLeaderId) {
      setErrorMessage('Vui lòng chọn Lãnh đạo cấp cao');
      return;
    }

    if (!departmentScope.trim()) {
      setErrorMessage('Vui lòng thiết lập Phạm vi phòng ban (Department Scope)');
      setIsScopeOpen(true);
      return;
    }

    if (!overview.trim()) {
      setErrorMessage('Vui lòng thiết lập Tổng quan chiến lược (Overview)');
      setIsScopeOpen(true);
      return;
    }

    for (let i = 0; i < childNodes.length; i++) {
      const s = childNodes[i];
      if (!s.squadName.trim()) {
        setErrorMessage(`Squad số ${i + 1} chưa có Tên Squad`);
        return;
      }
      if (!s.id) {
        setErrorMessage(`Squad "${s.squadName}" chưa chọn Trưởng nhóm (Squad Lead)`);
        return;
      }
    }

    try {
      setIsSaving(true);
      const res = await fetch('/api/admin/people/hierarchy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leaderId: selectedLeaderId,
          departmentScope: departmentScope.trim(),
          overview: overview.trim(),
          childNodes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage('Đã lưu thành công Sơ đồ Tổ chức & Squads!');
        setHasChanges(false);
      } else {
        setErrorMessage(data.error || 'Có lỗi xảy ra khi lưu sơ đồ');
      }
    } catch {
      setErrorMessage('Lỗi kết nối khi lưu sơ đồ lên máy chủ');
    } finally {
      setIsSaving(false);
    }
  };

  const displayZoom = Math.round(zoomScale * 100);

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 space-y-3">
      {/* =========================================================================
          TOP TOOLBAR & LEADER PICKER
          ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        {/* Left: Title & Leader selector */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Button
                label="Danh sách"
                variant="secondary"
                size="sm"
                href="/admin/people"
              />
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900">
                Sơ đồ Tổ chức &amp; Squads
              </h1>
              {hasChanges && (
                <Badge label="Chưa lưu thay đổi" variant="warning" />
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Kéo thả nhân sự từ kho bên phải vào các vị trí trong sơ đồ để thay thế trực quan
            </p>
          </div>

          {/* Leader Select Dropdown */}
          <div className="sm:ml-4 min-w-[240px]">
            <Selector
              label="Chọn lãnh đạo"
              isLabelHidden
              size="sm"
              value={selectedLeaderId}
              onChange={(val) => handleSelectLeader(val)}
              options={leaders.map((lead) => ({
                value: lead.id,
                label: `${lead.name} — ${lead.role}`,
              }))}
            />
          </div>
        </div>

        {/* Right: Actions & View controls */}
        <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
            <IconButton
              label="Thu nhỏ"
              icon={<ZoomOut className="w-4 h-4" />}
              variant="secondary"
              size="sm"
              onClick={() => setZoomScale((z) => Math.max(0.4, Math.round((z - 0.1) * 10) / 10))}
            />
            <span className="text-[11px] font-bold text-slate-700 px-2 select-none min-w-[42px] text-center">
              {displayZoom}%
            </span>
            <IconButton
              label="Phóng to"
              icon={<ZoomIn className="w-4 h-4" />}
              variant="secondary"
              size="sm"
              onClick={() => setZoomScale((z) => Math.min(1.5, Math.round((z + 0.1) * 10) / 10))}
            />
            <IconButton
              label="Vừa màn hình"
              icon={<Maximize2 className="w-3.5 h-3.5" />}
              variant="secondary"
              size="sm"
              onClick={handleFitView}
            />
            <IconButton
              label="Căn giữa"
              icon={<Move className="w-3.5 h-3.5" />}
              variant="secondary"
              size="sm"
              onClick={handleCenterView}
            />
            <Button
              label="100%"
              variant="secondary"
              size="sm"
              onClick={() => {
                setZoomScale(1);
                setTimeout(() => handleCenterView(), 60);
              }}
            />
          </div>

          {/* Toggle Strategy Scope */}
          <Button
            label={isScopeOpen ? 'Ẩn phạm vi' : 'Phạm vi & Chiến lược'}
            variant="secondary"
            size="sm"
            onClick={() => setIsScopeOpen(!isScopeOpen)}
          />

          {/* Toggle Member Pool */}
          <Button
            label={isPoolOpen ? 'Đóng kho nhân sự' : 'Kho nhân sự'}
            variant="secondary"
            size="sm"
            onClick={() => setIsPoolOpen(!isPoolOpen)}
          />

          {/* Save Button */}
          <Button
            label={isSaving ? 'Đang lưu...' : 'Lưu sơ đồ'}
            variant="primary"
            isDisabled={isSaving || isLoading}
            onClick={handleSave}
          />
        </div>
      </div>

      {/* Notifications */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center justify-between shadow-sm">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-rose-500 hover:text-rose-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center justify-between shadow-sm">
          <span>{successMessage}</span>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-500 hover:text-emerald-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =========================================================================
          COLLAPSIBLE STRATEGIC SCOPE PANEL
          ========================================================================= */}
      {isScopeOpen && (
        <Card variant="default" className="rounded-2xl p-5 bg-white border border-slate-200/90 shadow-md space-y-4 animate-fade-in shrink-0">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Phạm vi Phụ trách &amp; Định hướng Chiến lược
              </h3>
              <p className="text-xs text-slate-500">
                Thông tin xuất hiện ở đầu sơ đồ nhánh của Lãnh đạo trên trang công khai /people
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsScopeOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Phạm vi phòng ban (Department Scope)"
              inputID="canvas-scope"
              isRequired
            >
              <input
                id="canvas-scope"
                type="text"
                value={departmentScope}
                onChange={(e) => {
                  setDepartmentScope(e.target.value);
                  setHasChanges(true);
                }}
                placeholder="Ví dụ: Global Digital Strategy, Cross-Border Logistics..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
              />
            </Field>

            <Field
              label="Tổng quan chiến lược (Overview)"
              inputID="canvas-overview"
              isRequired
            >
              <textarea
                id="canvas-overview"
                rows={2}
                value={overview}
                onChange={(e) => {
                  setOverview(e.target.value);
                  setHasChanges(true);
                }}
                placeholder="Tuyên ngôn sứ mệnh và định hướng điều hành..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
              />
            </Field>
          </div>
        </Card>
      )}

      {/* =========================================================================
          MAIN WORKSPACE: INTERACTIVE CANVAS (LEFT) + DOCKED MEMBER POOL (RIGHT)
          ========================================================================= */}
      <div className="flex-1 flex gap-3 min-h-[600px] relative overflow-hidden">
        {/* Left: Interactive Canvas with Drag-to-Scroll & Smooth Zoom */}
        <div
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          onWheel={handleCanvasWheel}
          className="flex-1 min-w-0 h-full rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-inner relative overflow-auto select-none cursor-grab active:cursor-grabbing scrollbar-thin"
          style={{
            backgroundColor: '#fafbfc',
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-24 text-slate-400 min-h-[400px]">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
              <span className="text-xs font-semibold">Đang tải sơ đồ tổ chức...</span>
            </div>
          ) : (
            /* The Tree Container: uses margin auto and max-content for zero clipping */
            <div
              ref={treeRef}
              className="p-12 sm:p-16 flex flex-col items-center select-none"
              style={{
                zoom: zoomScale,
                margin: '0 auto',
                width: 'max-content',
              }}
            >
              {/* ===================================================================
                  LEVEL 1: ROOT NODE (SELECTED LEADER - e.g. Suhas Hiwale / CEO)
                  =================================================================== */}
              {currentLeader && (
                <div className="flex flex-col items-center relative z-20">
                  <OrgNodeCard
                    member={currentLeader}
                    nodeType="root"
                    onEdit={() => {
                      setEditTarget({ type: 'leader', member: currentLeader });
                      setIsEditModalOpen(true);
                    }}
                  />

                  {/* Vertical connector stem leading down from Root Card */}
                  <div className="w-0.5 h-12 bg-indigo-500 relative flex items-center justify-center">
                    {/* Connector Dot at the split point */}
                    <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 ring-4 ring-indigo-200 shadow-md absolute bottom-0 -mb-1.5 z-20" />
                  </div>
                </div>
              )}

              {/* ===================================================================
                  LEVEL 2 & 3: SQUADS BUS BAR & HORIZONTAL BRANCHES
                  =================================================================== */}
              {childNodes.length === 0 ? (
                <div className="mt-8 p-8 max-w-md bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-md text-center">
                  <EmptyState
                    icon={<AlertCircle className="w-8 h-8 text-slate-400" />}
                    title="Chưa có Squads nào được tạo"
                    description="Kéo nhân sự từ kho bên phải vào đây hoặc bấm nút bên dưới để tạo Squad đầu tiên."
                    actions={
                      <Button
                        label="Thêm Squad đầu tiên"
                        variant="primary"
                        onClick={() => handleAddSquad()}
                      />
                    }
                  />
                </div>
              ) : (
                <div className="relative pt-6 flex items-start justify-center gap-12 sm:gap-16 min-w-max">
                  {/* Horizontal Bus Connector Bar spanning across all squads */}
                  {childNodes.length > 1 && (
                    <div
                      className="absolute top-6 h-0.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500"
                      style={{
                        left: '140px',
                        right: '140px',
                      }}
                    />
                  )}

                  {/* Render each Squad Branch */}
                  {childNodes.map((squad, squadIdx) => {
                    const colorTheme = SQUAD_COLORS[squadIdx % SQUAD_COLORS.length];

                    return (
                      <div
                        key={`${squad.id || 'squad'}-${squadIdx}`}
                        className="flex flex-col items-center relative min-w-[280px]"
                      >
                        {/* Vertical line from Bus bar down to Squad Badge */}
                        <div className={`w-0.5 h-6 ${colorTheme.line} relative`}>
                          <div className={`w-2.5 h-2.5 rounded-full ${colorTheme.dot} ring-2 ring-white shadow-sm absolute top-0 -mt-1 left-1/2 -translate-x-1/2`} />
                        </div>

                        {/* ---------------------------------------------------------
                            SQUAD BRANCH PILL BADGE (e.g. "Development", "Marketing")
                            --------------------------------------------------------- */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditTarget({ type: 'squadLead', squadIndex: squadIdx, squad });
                            setIsEditModalOpen(true);
                          }}
                          className={`group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${colorTheme.bg} text-white font-extrabold text-xs shadow-md hover:scale-105 transition-transform cursor-pointer relative z-10`}
                          title="Bấm để đổi tên Squad hoặc cấu hình vai trò"
                        >
                          <span>{squad.squadName || `Squad ${squadIdx + 1}`}</span>
                        </button>

                        {/* Vertical line from Squad Badge down to Squad Lead Card */}
                        <div className={`w-0.5 h-8 ${colorTheme.line} relative flex items-center justify-center`}>
                          <div className={`w-2.5 h-2.5 rounded-full ${colorTheme.dot} ring-2 ring-white shadow-sm absolute bottom-0 -mb-1 z-10`} />
                        </div>

                        {/* ---------------------------------------------------------
                            LEVEL 2: SQUAD LEAD CARD (e.g. Osamu Kamiya, Jerome Bell)
                            --------------------------------------------------------- */}
                        <div className="relative mt-2">
                          <OrgNodeCard
                            member={squad}
                            nodeType="squadLead"
                            squadBadgeText={squad.squadName}
                            onEdit={() => {
                              setEditTarget({ type: 'squadLead', squadIndex: squadIdx, squad });
                              setIsEditModalOpen(true);
                            }}
                            onDelete={() => handleDeleteSquad(squadIdx)}
                            onAddChild={() => handleAddSubMember(squadIdx)}
                            onDropMember={(data) => handleDropOnSquadLead(squadIdx, data)}
                          />
                        </div>

                        {/* ---------------------------------------------------------
                            LEVEL 3: DIRECT CHILDREN OF SQUAD LEAD (SIDE-BY-SIDE)
                            Each parent node branches into multiple direct children!
                            --------------------------------------------------------- */}
                        {squad.children.length === 0 ? (
                          /* Drop target when no children in squad */
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
                                  handleAddSubMember(squadIdx, data.member);
                                }
                              } catch {}
                            }}
                            className="mt-6 border-2 border-dashed border-slate-300 rounded-2xl p-2.5 w-[210px] text-center text-xs text-slate-400 hover:border-purple-400 hover:text-purple-700 transition-colors cursor-pointer select-none bg-white/60"
                            onClick={() => handleAddSubMember(squadIdx)}
                          >
                            <Plus className="w-3.5 h-3.5 mx-auto mb-1 text-slate-400" />
                            <span>Thả để thêm cấp dưới</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center w-full mt-0">
                            {/* Stem line coming down from Squad Lead */}
                            <div className="flex flex-col items-center">
                              <div className={`w-0.5 h-8 ${colorTheme.line}`} />
                              <div className={`w-2.5 h-2.5 rounded-full ${colorTheme.dot} ring-2 ring-white shadow-sm -mt-1 z-10`} />
                            </div>

                            {/* SIBLING CHILDREN ROW CONTAINER (SIDE-BY-SIDE) */}
                            <div className="flex items-start justify-center gap-6 pt-6">
                              {/* Actual children cards container */}
                              <div className="relative flex items-start justify-center gap-6">
                                {/* Horizontal Crossbar connecting all children if > 1 */}
                                {squad.children.length > 1 && (
                                  <div
                                    className={`absolute top-0 h-0.5 ${colorTheme.line}`}
                                    style={{
                                      left: '105px', // Exact center of first card (w-[210px] / 2)
                                      right: '105px', // Exact center of last card (w-[210px] / 2)
                                    }}
                                  />
                                )}

                                {/* Render each Child Card side-by-side */}
                                {squad.children.map((subMember, subIdx) => {
                                  const hasSubChildren =
                                    Array.isArray(subMember.children) && subMember.children.length > 0;

                                  return (
                                    <div
                                      key={`${subMember.id}-${subIdx}`}
                                      className="flex flex-col items-center relative"
                                    >
                                      {/* Drop line from horizontal crossbar */}
                                      {squad.children.length > 1 && (
                                        <div className={`w-0.5 h-6 ${colorTheme.line}`} />
                                      )}

                                      {/* Sub-member Card */}
                                      <div className="relative">
                                        <OrgNodeCard
                                          member={subMember}
                                          nodeType="subMember"
                                          onEdit={() => {
                                            setEditTarget({
                                              type: 'subMember',
                                              squadIndex: squadIdx,
                                              subIndex: subIdx,
                                              sub: subMember,
                                              squadName: squad.squadName,
                                            });
                                            setIsEditModalOpen(true);
                                          }}
                                          onDelete={() => handleDeleteSubMember(squadIdx, subIdx)}
                                          onAddChild={() => handleAddSubChild(squadIdx, subIdx)}
                                          onDropMember={(data) =>
                                            handleDropOnSubMember(squadIdx, subIdx, data)
                                          }
                                        />
                                      </div>

                                      {/* -----------------------------------------------------
                                          LEVEL 4: SUB-CHILDREN UNDER THIS CHILD
                                          (e.g. Courtney Henry under Leslie Alexander)
                                          ----------------------------------------------------- */}
                                      {hasSubChildren && (
                                        <div className="flex flex-col items-center w-full mt-0">
                                          {/* Vertical connector stem */}
                                          <div className={`w-0.5 h-6 ${colorTheme.line}`} />
                                          <div className={`w-2 h-2 rounded-full ${colorTheme.dot} ring-2 ring-white shadow-sm -mt-0.5 z-10`} />

                                          {/* Sub-children row */}
                                          <div className="relative pt-4 flex items-start justify-center gap-4">
                                            {subMember.children!.length > 1 && (
                                              <div
                                                className={`absolute top-4 h-0.5 ${colorTheme.line}`}
                                                style={{
                                                  left: '100px',
                                                  right: '100px',
                                                }}
                                              />
                                            )}

                                            {subMember.children!.map((subChild, childIdx) => (
                                              <div
                                                key={`${subChild.id}-${childIdx}`}
                                                className="flex flex-col items-center relative"
                                              >
                                                {subMember.children!.length > 1 && (
                                                  <div className={`w-0.5 h-4 ${colorTheme.line} -mt-4`} />
                                                )}
                                                <OrgNodeCard
                                                  member={subChild}
                                                  nodeType="subChild"
                                                  onEdit={() => {
                                                    setEditTarget({
                                                      type: 'subChild',
                                                      squadIndex: squadIdx,
                                                      subIndex: subIdx,
                                                      childIndex: childIdx,
                                                      child: subChild,
                                                      parentName: subMember.name,
                                                    });
                                                    setIsEditModalOpen(true);
                                                  }}
                                                  onDelete={() =>
                                                    handleDeleteSubChild(squadIdx, subIdx, childIdx)
                                                  }
                                                  onDropMember={(data) =>
                                                    handleDropOnSubChild(
                                                      squadIdx,
                                                      subIdx,
                                                      childIdx,
                                                      data
                                                    )
                                                  }
                                                />
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* Drop target to add Level 4 subordinate under this specific child */}
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
                                              handleAddSubChild(squadIdx, subIdx, data.member);
                                            }
                                          } catch {}
                                        }}
                                        onClick={() => handleAddSubChild(squadIdx, subIdx)}
                                        className="mt-3 border border-dashed border-slate-300 rounded-xl py-1.5 px-3 w-[180px] text-center text-[10px] text-slate-400 hover:border-indigo-400 hover:text-indigo-700 transition-colors cursor-pointer select-none bg-white/70"
                                        title="Kéo thả hoặc bấm để thêm cấp dưới cho nhân sự này"
                                      >
                                        <span>+ Thêm cấp dưới</span>
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
                                      handleAddSubMember(squadIdx, data.member);
                                    }
                                  } catch {}
                                }}
                                onClick={() => handleAddSubMember(squadIdx)}
                                className="border-2 border-dashed border-slate-300 rounded-2xl p-4 w-[160px] h-[190px] flex flex-col items-center justify-center text-center text-xs text-slate-400 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50/30 transition-all cursor-pointer select-none bg-white/50 shrink-0 self-start mt-6"
                              >
                                <Plus className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                                <span className="font-bold text-slate-600 text-xs">Thêm cấp dưới</span>
                                <span className="text-[10px] text-slate-400 mt-1">Kéo thả nhân sự vào đây</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

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
                          handleAddSquad(data.member);
                        }
                      } catch {}
                    }}
                    onClick={() => handleAddSquad()}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-3xl p-6 min-w-[220px] h-[260px] text-center text-xs text-slate-400 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/40 transition-all cursor-pointer bg-white/50 select-none shadow-sm mt-12"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div className="font-extrabold text-slate-800 text-sm">
                      Thêm Squad mới
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Kéo nhân sự thả vào đây để tạo nhánh mới
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Floating Canvas Navigation HUD (outside canvasRef so it always floats nicely) */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-5 z-30 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-2xl px-3 py-1.5 text-xs text-slate-600 pointer-events-auto">
          <IconButton
            label="Thu nhỏ"
            icon={<ZoomOut className="w-4 h-4" />}
            variant="secondary"
            size="sm"
            onClick={() => setZoomScale((z) => Math.max(0.4, Math.round((z - 0.1) * 10) / 10))}
          />
          <span className="font-bold text-slate-800 min-w-[42px] text-center select-none text-[11px]">
            {displayZoom}%
          </span>
          <IconButton
            label="Phóng to"
            icon={<ZoomIn className="w-4 h-4" />}
            variant="secondary"
            size="sm"
            onClick={() => setZoomScale((z) => Math.min(1.5, Math.round((z + 0.1) * 10) / 10))}
          />
          <div className="w-px h-4 bg-slate-200 mx-0.5" />
          <Button
            label="Vừa màn hình"
            variant="secondary"
            size="sm"
            onClick={handleFitView}
          />
          <Button
            label="Căn giữa"
            variant="secondary"
            size="sm"
            onClick={handleCenterView}
          />
          <Button
            label="100%"
            variant="secondary"
            size="sm"
            onClick={() => {
              setZoomScale(1);
              setTimeout(() => handleCenterView(), 60);
            }}
          />
        </div>

        {/* Floating usage hint at bottom-left */}
        <div className="hidden lg:block absolute bottom-5 left-5 z-20 pointer-events-none text-[11px] text-slate-500 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-sm">
          Kéo chuột để di chuyển canvas • Cuộn chuột để lướt • Kéo nhân sự từ kho bên phải để gán
        </div>

        {/* Floating Button to Re-open Member Pool when closed */}
        {!isPoolOpen && (
          <button
            type="button"
            onClick={() => setIsPoolOpen(true)}
            className="absolute right-4 top-4 z-20 bg-white/95 backdrop-blur-sm border border-slate-200/90 text-slate-800 shadow-md rounded-2xl px-3.5 py-2 flex items-center gap-2 hover:bg-slate-50 transition-all font-bold text-xs"
            title="Mở kho nhân sự"
          >
            <span>Kho nhân sự ({allMembers.length})</span>
          </button>
        )}

        {/* Right: Docked Member Pool Drawer */}
        <MemberPoolDrawer
          members={allMembers}
          isOpen={isPoolOpen}
          onToggle={() => setIsPoolOpen(!isPoolOpen)}
        />
      </div>

      {/* =========================================================================
          NODE EDIT MODAL (SWAP & SETTINGS)
          ========================================================================= */}
      <NodeEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        target={editTarget}
        allMembers={allMembers}
        onSaveLeader={(newLeaderId) => {
          setSelectedLeaderId(newLeaderId);
          setHasChanges(true);
        }}
        onSaveSquadLead={(squadIndex, updatedProps, newMemberId) => {
          const nextSquads = [...childNodes];
          let updatedLead = { ...nextSquads[squadIndex], ...updatedProps };

          if (newMemberId && newMemberId !== updatedLead.id) {
            const memberObj = allMembers.find((m) => m.id === newMemberId);
            if (memberObj) {
              updatedLead = {
                ...updatedLead,
                id: memberObj.id,
                name: memberObj.name,
                role: memberObj.role,
                department: memberObj.department as any,
                location: memberObj.location,
                image: memberObj.image,
                skills: memberObj.skills,
                linkedin: memberObj.linkedin ?? undefined,
              };
            }
          }

          nextSquads[squadIndex] = updatedLead;
          setChildNodes(nextSquads);
          setHasChanges(true);
        }}
        onSaveSubMember={(squadIndex, subIndex, resp, newMemberId) => {
          const nextSquads = [...childNodes];
          let sub = { ...nextSquads[squadIndex].children[subIndex], responsibility: resp };

          if (newMemberId && newMemberId !== sub.id) {
            const memberObj = allMembers.find((m) => m.id === newMemberId);
            if (memberObj) {
              sub = {
                ...sub,
                id: memberObj.id,
                name: memberObj.name,
                role: memberObj.role,
                department: memberObj.department as any,
                location: memberObj.location,
                image: memberObj.image,
                skills: memberObj.skills,
                linkedin: memberObj.linkedin ?? undefined,
              };
            }
          }

          nextSquads[squadIndex].children[subIndex] = sub;
          setChildNodes(nextSquads);
          setHasChanges(true);
        }}
        onSaveSubChild={(squadIndex, subIndex, childIndex, resp, newMemberId) => {
          const nextSquads = [...childNodes];
          const parentSub = nextSquads[squadIndex].children[subIndex];
          const childrenList = [...(parentSub.children || [])];
          let childItem = { ...childrenList[childIndex], responsibility: resp };

          if (newMemberId && newMemberId !== childItem.id) {
            const memberObj = allMembers.find((m) => m.id === newMemberId);
            if (memberObj) {
              childItem = {
                ...childItem,
                id: memberObj.id,
                name: memberObj.name,
                role: memberObj.role,
                department: memberObj.department as any,
                location: memberObj.location,
                image: memberObj.image,
                skills: memberObj.skills,
                linkedin: memberObj.linkedin ?? undefined,
              };
            }
          }

          childrenList[childIndex] = childItem;
          nextSquads[squadIndex].children[subIndex] = {
            ...parentSub,
            children: childrenList,
          };
          setChildNodes(nextSquads);
          setHasChanges(true);
        }}
      />
    </div>
  );
}
