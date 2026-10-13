'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Layers, ArrowRight, ExternalLink } from 'lucide-react';
import { Button, Badge, Card } from '@astryxdesign/core';
import type { HomeSectionModel } from '@/lib/services/home-section.service';

interface HomeSectionsGridClientProps {
  sections: HomeSectionModel[];
}

export default function HomeSectionsGridClient({
  sections,
}: HomeSectionsGridClientProps) {
  const router = useRouter();

  return (
    <div className="space-y-6 w-full pb-12">
      {/* =========================================================================
          PAGE HEADER
          (LƯU Ý: Tuyệt đối không có nút thêm section theo yêu cầu)
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Quản lý Section Trang chủ
            </h1>
            <Badge
              label={`${sections.length} section`}
              variant="neutral"
              className="h-8 px-4"
            />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Danh sách các khối nội dung và section hiển thị trên trang chủ E-GEAD
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            label="Xem trang chủ Live"
            variant="secondary"
            href="/"
            target="_blank"
            className="px-4 h-10"
          />
        </div>
      </div>

      {/* =========================================================================
          SECTIONS GRID
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const row1Count = section.data?.row1Partners?.length || 0;
          const row2Count = section.data?.row2Partners?.length || 0;
          const totalLogos = row1Count + row2Count;

          return (
            <Card
              key={section.id}
              variant="default"
              className="rounded-2xl p-6 bg-white border border-slate-200/90 hover:border-slate-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <Layers className="w-5 h-5" />
                  </div>
                  <Badge
                    label={section.isActive ? 'Đang kích hoạt' : 'Tạm ẩn'}
                    variant={section.isActive ? 'success' : 'neutral'}
                    className="h-7 px-3 text-xs"
                  />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {section.name}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    key: {section.key}
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {section.description ||
                    'Quản lý nội dung tiêu đề, lời dẫn và danh sách logo đối tác chạy marquee trên trang chủ.'}
                </p>

                {totalLogos > 0 && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Hàng 1: {row1Count} logos</span>
                    <span className="text-slate-300">•</span>
                    <span>Hàng 2: {row2Count} logos</span>
                  </div>
                )}

                {section.key === 'services-capabilities' && section.data?.items && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{section.data.items.length} thẻ dịch vụ</span>
                    <span className="text-slate-300">•</span>
                    <span>Nút: {section.data.buttonText || 'Xem tất cả'}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <Button
                  label="Chỉnh sửa nội dung section"
                  variant="primary"
                  href={`/admin/home/${section.key}`}
                  className="w-full h-10 px-4"
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
