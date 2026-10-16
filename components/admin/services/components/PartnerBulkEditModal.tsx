'use client';

import React, { useState } from 'react';
import { Button, Badge, Selector, TextInput } from '@astryxdesign/core';

interface PartnerBulkEditModalProps {
  isOpen: boolean;
  selectedCount: number;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: {
    status?: 'published' | 'draft';
    badge?: string;
  }) => Promise<void>;
}

export default function PartnerBulkEditModal({
  isOpen,
  selectedCount,
  isSubmitting,
  onClose,
  onSubmit,
}: PartnerBulkEditModalProps) {
  const [status, setStatus] = useState<'published' | 'draft' | ''>('');
  const [badgeAction, setBadgeAction] = useState<'keep' | 'set' | 'clear'>('keep');
  const [customBadge, setCustomBadge] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: { status?: 'published' | 'draft'; badge?: string } = {};

    if (status) {
      payload.status = status;
    }

    if (badgeAction === 'set' && customBadge.trim()) {
      payload.badge = customBadge.trim();
    } else if (badgeAction === 'clear') {
      payload.badge = '';
    }

    if (Object.keys(payload).length === 0) {
      return;
    }

    await onSubmit(payload);
  };

  const hasChanges =
    Boolean(status) ||
    badgeAction === 'clear' ||
    (badgeAction === 'set' && Boolean(customBadge.trim()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden font-open-sans flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                Chỉnh sửa hàng loạt đối tác
              </h3>
              <Badge
                label={`${selectedCount} đối tác`}
                variant="neutral"
                className="h-6 px-2.5 text-xs font-semibold"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Áp dụng thay đổi đồng loạt cho các đối tác chiến lược đã chọn
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
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Trạng thái hiển thị */}
          <div className="space-y-1">
            <Selector
              label="Trạng thái hiển thị mới"
              className="h-10 border"
              value={status}
              onChange={(val) => setStatus(val as any)}
              options={[
                { value: '', label: '-- Giữ nguyên trạng thái hiện tại --' },
                { value: 'published', label: 'Đang hiển thị công khai (published)' },
                { value: 'draft', label: 'Bản nháp lưu tạm (draft)' },
              ]}
              width="100%"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Chọn trạng thái mới nếu muốn cập nhật đồng loạt cho các đối tác đã chọn
            </p>
          </div>

          {/* Huy hiệu chứng nhận (Badge) */}
          <div>
            <Selector
              label="Huy hiệu chứng nhận (Badge)"
              className="h-10 border"
              value={badgeAction}
              onChange={(val) => setBadgeAction(val as any)}
              options={[
                { value: 'keep', label: '-- Giữ nguyên huy hiệu hiện tại --' },
                { value: 'set', label: 'Đặt huy hiệu mới cho tất cả đối tác đã chọn' },
                { value: 'clear', label: 'Xóa bỏ huy hiệu (để trống)' },
              ]}
              width="100%"
            />

            {badgeAction === 'set' && (
              <div className="mt-2.5">
                <TextInput
                  label="Huy hiệu mới"
                  isLabelHidden
                  value={customBadge}
                  onChange={(val) => setCustomBadge(val)}
                  placeholder="Ví dụ: Official Verified Partner, Certified Partner..."
                  width="100%"
                  className='h-10 border'
                />
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
              className="px-4 h-9"
            />
            <Button
              label={isSubmitting ? 'Đang lưu...' : 'Áp dụng thay đổi'}
              variant="primary"
              type="submit"
              isDisabled={!hasChanges || isSubmitting}
              className="px-5 h-9"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
