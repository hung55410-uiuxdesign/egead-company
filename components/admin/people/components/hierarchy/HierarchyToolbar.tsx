'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Button, Badge, Selector } from '@astryxdesign/core';
import { useHierarchyStore } from './useHierarchyStore';

export default function HierarchyToolbar() {
  const leaders = useHierarchyStore((s) => s.leaders);
  const selectedLeaderId = useHierarchyStore((s) => s.selectedLeaderId);
  const hasChanges = useHierarchyStore((s) => s.hasChanges);
  const isScopeOpen = useHierarchyStore((s) => s.isScopeOpen);
  const isPoolOpen = useHierarchyStore((s) => s.isPoolOpen);
  const isSaving = useHierarchyStore((s) => s.isSaving);
  const isLoading = useHierarchyStore((s) => s.isLoading);
  const errorMessage = useHierarchyStore((s) => s.errorMessage);
  const successMessage = useHierarchyStore((s) => s.successMessage);

  const selectLeader = useHierarchyStore((s) => s.selectLeader);
  const toggleScope = useHierarchyStore((s) => s.toggleScope);
  const togglePool = useHierarchyStore((s) => s.togglePool);
  const saveHierarchy = useHierarchyStore((s) => s.saveHierarchy);
  const setErrorMessage = useHierarchyStore((s) => s.setErrorMessage);
  const setSuccessMessage = useHierarchyStore((s) => s.setSuccessMessage);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        {/* Left: Title & Leader selector */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900">
                Sơ đồ Tổ chức &amp; Squads
              </h1>
              {hasChanges && (
                <Badge label="Chưa lưu thay đổi" variant="warning" className='h-8 px-4' />
              )}
            </div>
          </div>

          <div className="sm:ml-4 min-w-[240px]">
            <Selector
              label="Chọn lãnh đạo"
              className="h-10 border"
              isLabelHidden
              value={selectedLeaderId}
              onChange={(val) => selectLeader(val)}
              options={leaders.map((lead) => ({
                value: lead.id,
                label: `${lead.name} — ${lead.role}`,
              }))}
            />
          </div>
        </div>

        {/* Right: Actions & View controls */}
        <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
          <Button
            label={isScopeOpen ? 'Ẩn phạm vi' : 'Phạm vi & Chiến lược'}
            variant="secondary"
            className="h-10 px-4"
            onClick={toggleScope}
          />

          <Button
            label={isPoolOpen ? 'Đóng kho nhân sự' : 'Kho nhân sự'}
            variant="secondary"
            className="h-10 px-4"
            onClick={togglePool}
          />

          <Button
            label={isSaving ? 'Đang lưu...' : 'Lưu sơ đồ'}
            variant="primary"
            className="h-10 px-4"
            isDisabled={isSaving || isLoading}
            onClick={() => saveHierarchy()}
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
    </>
  );
}
