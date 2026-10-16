'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Card, TextInput, TextArea } from '@astryxdesign/core';
import { useHierarchyStore } from './useHierarchyStore';

export default function StrategicScopeCard() {
  const isScopeOpen = useHierarchyStore((s) => s.isScopeOpen);
  const departmentScope = useHierarchyStore((s) => s.departmentScope);
  const overview = useHierarchyStore((s) => s.overview);
  const setDepartmentScope = useHierarchyStore((s) => s.setDepartmentScope);
  const setOverview = useHierarchyStore((s) => s.setOverview);
  const setIsScopeOpen = useHierarchyStore((s) => s.setIsScopeOpen);

  if (!isScopeOpen) return null;

  return (
    <Card
      variant="default"
      className="rounded-2xl p-5 bg-white border border-slate-200/90 shadow-md space-y-4 animate-fade-in shrink-0"
    >
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
        <TextInput
          label="Phạm vi phòng ban (Department Scope)"
          isRequired
          value={departmentScope}
          onChange={setDepartmentScope}
          placeholder="Ví dụ: Global Digital Strategy, Cross-Border Logistics..."
          width="100%"
          className='h-10 border'
        />

        <TextArea
          label="Tổng quan chiến lược (Overview)"
          isRequired
          rows={2}
          value={overview}
          onChange={setOverview}
          placeholder="Tuyên ngôn sứ mệnh và định hướng điều hành..."
          width="100%"
          className="border"
        />
      </div>
    </Card>
  );
}
