'use client';

import React from 'react';
import { Card, Spinner } from '@astryxdesign/core';

interface AdminLoadingFallbackProps {
  message?: string;
  subMessage?: string;
}

export default function AdminLoadingFallback({
  message = 'Đang tải dữ liệu trang quản trị...',
  subMessage = 'Vui lòng chờ trong giây lát trong khi hệ thống đồng bộ dữ liệu.',
}: AdminLoadingFallbackProps) {
  return (
    <div className="w-full min-h-[420px] flex items-center justify-center p-8">
      <Card
        variant="default"
        className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center text-center max-w-md w-full shadow-sm"
      >
        <div className="mb-4">
          <Spinner size="lg" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
          {message}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
          {subMessage}
        </p>
      </Card>
    </div>
  );
}
