'use client';

import React, { useState } from 'react';
import { Button, Badge, Selector } from '@astryxdesign/core';

interface CaseStudyBulkEditModalProps {
  isOpen: boolean;
  selectedCount: number;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: {
    status?: 'published' | 'draft';
    service?: string;
    industry?: string;
    serviceAction?: 'add' | 'replace';
    industryAction?: 'add' | 'replace';
  }) => Promise<void>;
}

const COMMON_SERVICES = [
  'Technology',
  'Operations',
  'Marketing',
  'Creative',
  'Strategy',
  'Experience',
];

const COMMON_INDUSTRIES = [
  'Fashion & Lifestyle',
  'Consumer Goods',
  'Health & Wellness',
  'Engineering & Manufacturing',
  'Marketplace & Ecommerce',
  'Fintech & Finance',
  'Education & Training',
  'Corporate & B2B',
];

export default function CaseStudyBulkEditModal({
  isOpen,
  selectedCount,
  isSubmitting,
  onClose,
  onSubmit,
}: CaseStudyBulkEditModalProps) {
  const [status, setStatus] = useState<'published' | 'draft' | ''>('');
  const [service, setService] = useState<string>('');
  const [serviceAction, setServiceAction] = useState<'add' | 'replace'>('add');
  const [industry, setIndustry] = useState<string>('');
  const [industryAction, setIndustryAction] = useState<'add' | 'replace'>('add');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!status && !service && !industry) return;

    await onSubmit({
      ...(status ? { status } : {}),
      ...(service ? { service, serviceAction } : {}),
      ...(industry ? { industry, industryAction } : {}),
    });
  };

  const hasChanges = Boolean(status || service || industry);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden font-open-sans flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                Chỉnh sửa hàng loạt dự án
              </h3>
              <Badge
                label={`${selectedCount} dự án`}
                variant="neutral"
                className="h-6 px-2.5 text-xs"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Áp dụng thay đổi đồng loạt cho các dự án đang được chọn
            </p>
          </div>
          <Button
            label="Đóng"
            variant="ghost"
            onClick={onClose}
            isDisabled={isSubmitting}
            className="h-8 px-3 text-slate-500 hover:text-slate-800"
          />
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Trạng thái hiển thị */}
          <div>
            <Selector
              label="Trạng thái hiển thị mới"
              description="Chọn trạng thái mới nếu muốn thay đổi đồng loạt"
              value={status}
              className="h-10 border"
              onChange={(val) => setStatus(val as 'published' | 'draft' | '')}
              options={[
                { value: '', label: '-- Giữ nguyên trạng thái hiện tại --' },
                { value: 'published', label: 'Đang hiển thị công khai (published)' },
                { value: 'draft', label: 'Bản nháp (draft)' },
              ]}
            />
          </div>

          {/* Dịch vụ */}
          <div className="space-y-2">
            <Selector
              label="Gán dịch vụ mới"
              description="Chọn một dịch vụ để cập nhật cho các dự án đã chọn"
              value={service}
              className="h-10 border"
              onChange={(val) => setService(val)}
              options={[
                { value: '', label: '-- Giữ nguyên dịch vụ hiện tại --' },
                ...COMMON_SERVICES.map((s) => ({ value: s, label: s })),
              ]}
            />
            {service && (
              <div className="flex items-center gap-4 pt-1 pl-1 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">Cách áp dụng:</span>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="serviceAction"
                    value="add"
                    checked={serviceAction === 'add'}
                    onChange={() => setServiceAction('add')}
                    className="accent-slate-900"
                  />
                  <span>Thêm vào danh sách hiện tại</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="serviceAction"
                    value="replace"
                    checked={serviceAction === 'replace'}
                    onChange={() => setServiceAction('replace')}
                    className="accent-slate-900"
                  />
                  <span>Thay thế toàn bộ dịch vụ</span>
                </label>
              </div>
            )}
          </div>

          {/* Ngành nghề */}
          <div className="space-y-2">
            <Selector
              label="Gán ngành nghề mới"
              description="Chọn một ngành nghề để cập nhật cho các dự án đã chọn"
              value={industry}
              className="h-10 border"
              onChange={(val) => setIndustry(val)}
              options={[
                { value: '', label: '-- Giữ nguyên ngành nghề hiện tại --' },
                ...COMMON_INDUSTRIES.map((ind) => ({ value: ind, label: ind })),
              ]}
            />
            {industry && (
              <div className="flex items-center gap-4 pt-1 pl-1 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">Cách áp dụng:</span>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="industryAction"
                    value="add"
                    checked={industryAction === 'add'}
                    onChange={() => setIndustryAction('add')}
                    className="accent-slate-900"
                  />
                  <span>Thêm vào danh sách hiện tại</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="industryAction"
                    value="replace"
                    checked={industryAction === 'replace'}
                    onChange={() => setIndustryAction('replace')}
                    className="accent-slate-900"
                  />
                  <span>Thay thế toàn bộ ngành nghề</span>
                </label>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Button
              label="Hủy bỏ"
              variant="ghost"
              type="button"
              onClick={onClose}
              isDisabled={isSubmitting}
              className="h-10 px-4 text-xs font-semibold"
            />
            <Button
              label={isSubmitting ? 'Đang cập nhật...' : 'Áp dụng cập nhật'}
              variant="primary"
              type="submit"
              isDisabled={isSubmitting || !hasChanges}
              className="h-10 px-5 text-xs font-bold"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
