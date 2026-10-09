'use client';

import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Move } from 'lucide-react';
import { Button, IconButton } from '@astryxdesign/core';
import { useHierarchyStore } from './useHierarchyStore';

interface HierarchyFloatingHudProps {
  onFitView: () => void;
  onCenterView: () => void;
}

export default function HierarchyFloatingHud({
  onFitView,
  onCenterView,
}: HierarchyFloatingHudProps) {
  const zoomScale = useHierarchyStore((s) => s.zoomScale);
  const setZoomScale = useHierarchyStore((s) => s.setZoomScale);
  const displayZoom = Math.round(zoomScale * 100);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-5 z-30 flex gap-1 items-center bg-white/95 backdrop-blur-md rounded-xl p-1 border border-slate-200 shadow-xl pointer-events-auto">
      <IconButton
        label="Thu nhỏ"
        icon={<ZoomOut className="w-4 h-4" />}
        variant="secondary"
        className="w-10 h-10"
        onClick={() => setZoomScale((z) => Math.max(0.4, Math.round((z - 0.1) * 10) / 10))}
      />
      <span className="text-[11px] font-bold text-slate-700 px-2 select-none min-w-[42px] text-center">
        {displayZoom}%
      </span>
      <IconButton
        label="Phóng to"
        icon={<ZoomIn className="w-4 h-4" />}
        variant="secondary"
        className="w-10 h-10"
        onClick={() => setZoomScale((z) => Math.min(1.5, Math.round((z + 0.1) * 10) / 10))}
      />
      <IconButton
        label="Vừa màn hình"
        icon={<Maximize2 className="w-3.5 h-3.5" />}
        variant="secondary"
        className="w-10 h-10"
        onClick={onFitView}
      />
      <IconButton
        label="Căn giữa"
        icon={<Move className="w-3.5 h-3.5" />}
        variant="secondary"
        className="w-10 h-10"
        onClick={onCenterView}
      />
      <Button
        label="100%"
        variant="secondary"
        className="px-4 h-10"
        onClick={() => {
          setZoomScale(1);
          setTimeout(() => onCenterView(), 60);
        }}
      />
    </div>
  );
}
