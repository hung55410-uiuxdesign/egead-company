'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Layers, Building2, Eye, EyeOff } from 'lucide-react';
import { Button, Badge, Card, Switch } from '@astryxdesign/core';
import type { CompanySectionModel } from '@/lib/services/company-section.service';
import { useUpdateCompanySectionMutation } from '@/lib/hooks';

interface CompanySectionsGridClientProps {
  sections: CompanySectionModel[];
}

export default function CompanySectionsGridClient({
  sections,
}: CompanySectionsGridClientProps) {
  const router = useRouter();
  const updateMutation = useUpdateCompanySectionMutation();

  const handleToggleActive = async (section: CompanySectionModel, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await updateMutation.mutateAsync({
        key: section.key,
        isActive: !section.isActive,
      });
    } catch (err: any) {
      alert(`Thao tác thất bại: ${err?.message || 'Có lỗi xảy ra'}`);
    }
  };

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900">
              Quản lý Section Trang Company
            </h1>
            <Badge
              label={`${sections.length} section`}
              variant="neutral"
              className="h-8 px-4"
            />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Quản lý nội dung, hình ảnh, video và cấu hình ẩn/hiện các khối trên trang Giới thiệu (Company)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            label="Xem trang Company Live"
            variant="secondary"
            href="/company"
            target="_blank"
            className="px-4 h-10"
          />
        </div>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const rawData = section.data || {};
          const isPending = updateMutation.isPending && updateMutation.variables?.key === section.key;

          return (
            <Card
              key={section.id}
              variant="default"
              className="rounded-2xl p-6 bg-white border border-slate-200/90 hover:border-slate-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Switch
                      label={section.isActive ? 'Hiển thị' : 'Tạm ẩn'}
                      value={section.isActive}
                      size="sm"
                      isLoading={isPending}
                      onChange={async (checked) => {
                        try {
                          await updateMutation.mutateAsync({
                            key: section.key,
                            isActive: checked,
                          });
                        } catch (err: any) {
                          alert(`Thao tác thất bại: ${err?.message || 'Có lỗi xảy ra'}`);
                        }
                      }}
                    />
                  </div>
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
                    'Quản lý nội dung, hình ảnh và hiển thị của khối này trên trang Company.'}
                </p>

                {/* Specific Section Info Snippets */}
                {section.key === 'company-hero' && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Banner &amp; Badge</span>
                    <span className="text-slate-300">•</span>
                    <span className="truncate max-w-[140px]">{rawData.badgeText || 'Buon Ma Thuot HQ'}</span>
                  </div>
                )}

                {section.key === 'company-intro' && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{rawData.paragraphs?.length || 3} đoạn văn bản</span>
                    <span className="text-slate-300">•</span>
                    <span>Định vị giải pháp</span>
                  </div>
                )}

                {section.key === 'company-4d-method' && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{rawData.steps?.length || 4} bước quy trình</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-600">Design - Build - Run - Grow</span>
                  </div>
                )}

                {section.key === 'company-value-system' && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{rawData.items?.length || 3} thẻ giá trị cốt lõi</span>
                    <span className="text-slate-300">•</span>
                    <span>Hệ giá trị E-GEAD</span>
                  </div>
                )}

                {section.key === 'company-case-studies' && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{rawData.clients?.length || 14} logo khách hàng</span>
                    <span className="text-slate-300">•</span>
                    <span>{rawData.servicePartners?.length || 10} đối tác</span>
                  </div>
                )}

                {section.key === 'company-portals' && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>2 cổng điều hướng</span>
                    <span className="text-slate-300">•</span>
                    <span>Our People &amp; Careers</span>
                  </div>
                )}

                {section.key === 'company-contact' && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Nút: {rawData.buttonText || 'Get Free Consultation'}</span>
                    <span className="text-slate-300">•</span>
                    <span>Liên hệ cuối trang</span>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <Button
                  label="Chỉnh sửa nội dung section"
                  variant="primary"
                  href={`/admin/company/${section.key}`}
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
