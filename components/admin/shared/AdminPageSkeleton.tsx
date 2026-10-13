'use client';

import React from 'react';
import { Card, Skeleton } from '@astryxdesign/core';

interface AdminPageSkeletonProps {
  title?: string;
}

export default function AdminPageSkeleton({
  title = 'Đang tải dữ liệu trang quản trị...',
}: AdminPageSkeletonProps) {
  return (
    <div className="space-y-6 font-open-sans w-full pb-8 animate-fadeIn">
      {/* Page Header Skeleton */}
      <Card
        variant="default"
        className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200"
      >
        <div className="space-y-3">
          <Skeleton width={140} height={24} radius={2} index={0} />
          <div className="flex items-center justify-between gap-4">
            <Skeleton width={260} height={36} radius={2} index={1} />
            <Skeleton width={110} height={36} radius={2} index={2} />
          </div>
          <Skeleton width={420} height={16} radius={1} index={3} />
        </div>
      </Card>

      {/* Metrics Row Skeleton (4 stat cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <Card
            key={i}
            variant="default"
            className="p-5 rounded-xl bg-white border border-slate-200 space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton width={90} height={14} radius={1} index={i} />
              <Skeleton width={32} height={32} radius="rounded" index={i + 1} />
            </div>
            <Skeleton width={120} height={28} radius={2} index={i + 2} />
            <Skeleton width={80} height={12} radius={1} index={i + 3} />
          </Card>
        ))}
      </div>

      {/* Main Table / Content Skeleton */}
      <Card
        variant="default"
        className="p-6 rounded-2xl bg-white border border-slate-200 space-y-6"
      >
        {/* Table Toolbar Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <Skeleton width={280} height={38} radius={2} index={4} />
          <div className="flex items-center gap-2">
            <Skeleton width={100} height={36} radius={2} index={5} />
            <Skeleton width={120} height={36} radius={2} index={6} />
          </div>
        </div>

        {/* Table Rows Skeleton */}
        <div className="space-y-4">
          {[0, 1, 2, 3, 4].map((row) => (
            <div
              key={row}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50/60 border border-slate-100 gap-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <Skeleton width={40} height={40} radius={2} index={row} />
                <div className="space-y-1.5 flex-1 max-w-md">
                  <Skeleton width="80%" height={16} radius={1} index={row + 1} />
                  <Skeleton width="50%" height={12} radius={1} index={row + 2} />
                </div>
              </div>
              <Skeleton width={80} height={24} radius={2} index={row + 3} />
              <Skeleton width={70} height={32} radius={2} index={row + 4} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
