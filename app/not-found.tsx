import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#0A0D0E] text-white flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      {/* Ambient lighting effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] -z-10"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,231,116,0.12)_0%,rgba(56,189,248,0.08)_35%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg text-center flex flex-col items-center">
        {/* Logo */}
        <Link href="/" className="mb-10 inline-block">
          <img
            src="/assets/logo/logo-color.png"
            alt="E-GEAD"
            className="h-12 w-auto object-contain mx-auto"
          />
        </Link>

        {/* 404 Visual Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#10E774] font-medium mb-6">
          <span>Lỗi 404</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Trang không tìm thấy
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md">
          Đường dẫn bạn đang truy cập không tồn tại, đã bị gỡ bỏ hoặc tạm thời không khả dụng.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#10E774] text-black font-semibold text-sm hover:bg-[#0fd268] transition cursor-pointer shadow-[0_0_20px_rgba(16,231,116,0.3)]"
          >
            Quay về trang chủ
          </Link>
          <Link
            href="/services/all-services"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition cursor-pointer"
          >
            Xem dịch vụ
          </Link>
        </div>
      </div>
    </div>
  );
}
