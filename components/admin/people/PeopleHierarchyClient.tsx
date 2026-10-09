'use client';

import React, { useEffect, useCallback, useRef, useState } from 'react';
import { AdminTeamMember } from '@/lib/services/people.service';
import MemberPoolDrawer from './components/MemberPoolDrawer';
import NodeEditModal from './components/NodeEditModal';
import {
  HierarchyToolbar,
  StrategicScopeCard,
  HierarchyFloatingHud,
  HierarchyTree,
  useHierarchyStore,
} from './components/hierarchy';

interface PeopleHierarchyClientProps {
  leaders: AdminTeamMember[];
  allMembers: AdminTeamMember[];
  initialLeaderId?: string;
}

export default function PeopleHierarchyClient({
  leaders,
  allMembers,
  initialLeaderId,
}: PeopleHierarchyClientProps) {
  const init = useHierarchyStore((s) => s.init);
  const isLoading = useHierarchyStore((s) => s.isLoading);
  const zoomScale = useHierarchyStore((s) => s.zoomScale);
  const setZoomScale = useHierarchyStore((s) => s.setZoomScale);
  const isPoolOpen = useHierarchyStore((s) => s.isPoolOpen);
  const setIsPoolOpen = useHierarchyStore((s) => s.setIsPoolOpen);
  const togglePool = useHierarchyStore((s) => s.togglePool);

  const editTarget = useHierarchyStore((s) => s.editTarget);
  const isEditModalOpen = useHierarchyStore((s) => s.isEditModalOpen);
  const closeEditModal = useHierarchyStore((s) => s.closeEditModal);
  const saveLeaderModal = useHierarchyStore((s) => s.saveLeaderModal);
  const saveSquadLeadModal = useHierarchyStore((s) => s.saveSquadLeadModal);
  const saveSubMemberModal = useHierarchyStore((s) => s.saveSubMemberModal);
  const saveSubChildModal = useHierarchyStore((s) => s.saveSubChildModal);

  const canvasRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);

  const [, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ scrollLeft: number; scrollTop: number; mouseX: number; mouseY: number }>({
    scrollLeft: 0,
    scrollTop: 0,
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    init(leaders, allMembers, initialLeaderId);
  }, [leaders, allMembers, initialLeaderId, init]);

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
  }, [zoomScale, handleCenterView, setZoomScale]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('a') ||
      target.closest('[draggable="true"]') ||
      target.closest('.no-drag')
    ) {
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

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - dragStartRef.current.mouseX;
      const dy = moveEvent.clientY - dragStartRef.current.mouseY;
      container.scrollLeft = dragStartRef.current.scrollLeft - dx;
      container.scrollTop = dragStartRef.current.scrollTop - dy;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleCanvasWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      setZoomScale((z) => Math.min(1.5, Math.max(0.4, Math.round((z + delta) * 100) / 100)));
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full flex-1 min-h-0">
      {/* Hierarchy Header & Leader Switcher Toolbar */}
      <HierarchyToolbar />

      {/* Strategic Scope Collapsible Panel */}
      <StrategicScopeCard />

      {/* Main Interactive Canvas & Pool */}
      <div className="flex-1 flex gap-3 min-h-[600px] relative overflow-hidden">
        <MemberPoolDrawer
          members={allMembers}
          isOpen={isPoolOpen}
          onToggle={togglePool}
        />

        <div
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          onWheel={handleCanvasWheel}
          className="flex-1 min-w-0 h-full rounded-2xl relative overflow-auto select-none cursor-grab active:cursor-grabbing scrollbar-thin"
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
            <div
              ref={treeRef}
              className="p-12 sm:p-16 flex flex-col items-center select-none"
              style={{
                zoom: zoomScale,
                margin: '0 auto',
                width: 'max-content',
              }}
            >
              <HierarchyTree />
            </div>
          )}
        </div>

        {/* Floating Canvas Navigation HUD */}
        <HierarchyFloatingHud
          onFitView={handleFitView}
          onCenterView={handleCenterView}
        />

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
      </div>

      {/* Node Edit Modal */}
      <NodeEditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        target={editTarget}
        allMembers={allMembers}
        onSaveLeader={saveLeaderModal}
        onSaveSquadLead={saveSquadLeadModal}
        onSaveSubMember={saveSubMemberModal}
        onSaveSubChild={saveSubChildModal}
      />
    </div>
  );
}
