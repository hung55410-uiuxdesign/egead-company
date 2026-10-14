'use client';

import React, { useState } from 'react';
import { Button, Badge, Selector } from '@astryxdesign/core';

interface ServiceBulkEditModalProps {
  isOpen: boolean;
  selectedCount: number;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: {
    status?: 'published' | 'draft';
    category?: 'service' | 'industry';
  }) => Promise<void>;
}

export default function ServiceBulkEditModal({
  isOpen,
  selectedCount,
  isSubmitting,
  onClose,
  onSubmit,
}: ServiceBulkEditModalProps) {
  const [status, setStatus] = useState<'published' | 'draft' | ''>('');
  const [category, setCategory] = useState<'service' | 'industry' | ''>('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!status && !category) return;

    await onSubmit({
      ...(status ? { status } : {}),
      ...(category ? { category } : {}),
    });
  };

  const hasChanges = Boolean(status || category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden font-open-sans flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                Chỉnh sửa hàng loạt
              </h3>
              <Badge
                label={`${selectedCount} mục`}
                variant="neutral"
                className="h-6 px-2.5 text-xs"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Áp dụng thay đổi đồng loạt cho các dịch vụ / ngành nghề đã chọn
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

          {/* Phân loại */}
          <div>
            <Selector
              label="Phân loại danh mục mới"
              description="Chuyển đồng loạt thành Trụ cột dịch vụ hoặc Ngành nghề"
              value={category}
              className="h-10 border"
              onChange={(val) => setCategory(val as 'service' | 'industry' | '')}
              options={[
                { value: '', label: '-- Giữ nguyên phân loại hiện tại --' },
                { value: 'service', label: 'Trụ cột Dịch vụ (Service)' },
                { value: 'industry', label: 'Ngành nghề (Industry)' },
              ]}
            />
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
