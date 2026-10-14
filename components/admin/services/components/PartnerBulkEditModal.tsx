'use client';

import React, { useState } from 'react';
import { Button, Badge, Selector } from '@astryxdesign/core';

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
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Trạng thái hiển thị mới
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
            >
              <option value="">-- Giữ nguyên trạng thái hiện tại --</option>
              <option value="published">Đang hiển thị công khai (published)</option>
              <option value="draft">Bản nháp lưu tạm (draft)</option>
            </select>
            <p className="text-[11px] text-slate-400 mt-1">
              Chọn trạng thái mới nếu muốn cập nhật đồng loạt cho các đối tác đã chọn
            </p>
          </div>

          {/* Huy hiệu chứng nhận (Badge) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Huy hiệu chứng nhận (Badge)
            </label>
            <select
              value={badgeAction}
              onChange={(e) => setBadgeAction(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
            >
              <option value="keep">-- Giữ nguyên huy hiệu hiện tại --</option>
              <option value="set">Đặt huy hiệu mới cho tất cả đối tác đã chọn</option>
              <option value="clear">Xóa bỏ huy hiệu (để trống)</option>
            </select>

            {badgeAction === 'set' && (
              <div className="mt-2.5">
                <input
                  type="text"
                  value={customBadge}
                  onChange={(e) => setCustomBadge(e.target.value)}
                  placeholder="Ví dụ: Official Verified Partner, Certified Partner..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-emerald-500 focus:outline-hidden"
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
