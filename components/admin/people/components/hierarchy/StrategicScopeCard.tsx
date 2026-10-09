'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Card, Field } from '@astryxdesign/core';
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
        <Field
          label="Phạm vi phòng ban (Department Scope)"
          inputID="canvas-scope"
          isRequired
        >
          <input
            id="canvas-scope"
            type="text"
            value={departmentScope}
            onChange={(e) => setDepartmentScope(e.target.value)}
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
            onChange={(e) => setOverview(e.target.value)}
            placeholder="Tuyên ngôn sứ mệnh và định hướng điều hành..."
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
          />
        </Field>
      </div>
    </Card>
  );
}
