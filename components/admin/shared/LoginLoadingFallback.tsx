'use client';

import React from 'react';
import { Card, Spinner } from '@astryxdesign/core';

interface LoginLoadingFallbackProps {
  message?: string;
  subMessage?: string;
}

export default function LoginLoadingFallback({
  message = 'Đang kiểm tra phiên đăng nhập...',
  subMessage = 'Hệ thống quản trị nội dung và bài viết (CMS)',
}: LoginLoadingFallbackProps) {
  return (
    <div
      className="min-h-screen w-full text-slate-900 flex flex-col justify-center items-center lg:items-end px-6 sm:px-12 lg:pr-20 xl:pr-32 2xl:pr-40 py-12 relative overflow-hidden font-mona-sans selection:text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/admin/bg.png')",
      }}
    >
      <div className="w-full max-w-lg sm:max-w-[1100px] z-10 relative flex flex-col items-center">
        <Card
          variant="default"
          style={{ boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px' }}
          className="w-full max-w-[600px] py-16 px-8 flex flex-col items-center justify-center text-center rounded-2xl"
        >
          <div className="mb-6 flex items-center justify-center">
            <Spinner size="xl" />
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
            {message}
          </h2>

          <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
            {subMessage}
          </p>

          <span className="text-xs text-slate-400 mt-6 font-normal">
            E-GEAD Portal · Bảo mật dữ liệu quản trị
          </span>
        </Card>
      </div>
    </div>
  );
}
