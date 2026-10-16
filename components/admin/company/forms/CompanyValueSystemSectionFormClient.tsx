'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, MoveUp, MoveDown } from 'lucide-react';
import { Button, Card, Badge, Switch, TextInput, TextArea } from '@astryxdesign/core';
import type { CompanySectionModel, CompanyValueSystemData, CompanyValueItem } from '@/lib/services/company-section.service';
import { useUploadMedia, useUpdateCompanySectionMutation } from '@/lib/hooks';

interface CompanyValueSystemSectionFormClientProps {
  section: CompanySectionModel;
}

export default function CompanyValueSystemSectionFormClient({
  section,
}: CompanyValueSystemSectionFormClientProps) {
  const router = useRouter();

  const [title, setTitle] = useState(
    section.title ||
    'We believe in building transformative experiences to empower individuals, businesses and communities.'
  );
  const [subtitle, setSubtitle] = useState(section.subtitle || 'Value System');
  const [isActive, setIsActive] = useState<boolean>(section.isActive ?? true);

  const rawData: CompanyValueSystemData = section.data || {};
  const [items, setItems] = useState<CompanyValueItem[]>(
    rawData.items && rawData.items.length > 0
      ? rawData.items
      : [
        {
          number: '01',
          icon: '/assets/icon1.png',
          title: 'Outperforming expectations.',
          description:
            'Our rigorous Project Excellence Assurance methodology (PEA) and sub-24h US fulfillment ensure order delivery within committed timelines, maintaining flawless marketplace SLA metrics.',
        },
        {
          number: '02',
          icon: '/assets/Icon_2.svg',
          title: 'Breaking new grounds.',
          description:
            'Our relentless focus leveraging AI address normalization, multi-channel catalog orchestration, and barcode WMS builds the fastest, most reliable path to market.',
        },
        {
          number: '03',
          icon: '/assets/Icon_3.svg',
          title: 'Giving back.',
          description:
            'Our focus is on building an exemplary engineering culture in Buon Ma Thuot that emphasizes diversity, software talent development, and transparent equal opportunity empowerment.',
        },
      ]
  );

  const [uploadingTargetIndex, setUploadingTargetIndex] = useState<number | null>(null);

  const updateMutation = useUpdateCompanySectionMutation({
    redirectTo: '/admin/company',
  });
  const isSaving = updateMutation.isPending;

  const { uploadFile, isUploading } = useUploadMedia({
    defaultFolder: 'egead_cms/company',
    successMessage: 'Tải icon thành công!',
    onSuccess: (data) => {
      if (uploadingTargetIndex !== null) {
        setItems((prev) =>
          prev.map((item, i) => (i === uploadingTargetIndex ? { ...item, icon: data.url } : item))
        );
      }
      setUploadingTargetIndex(null);
    },
    onError: (err) => {
      alert(`Tải file thất bại: ${err.message}`);
      setUploadingTargetIndex(null);
    },
  });

  const handleAddItem = () => {
    const nextNumber = String(items.length + 1).padStart(2, '0');
    setItems((prev) => [
      ...prev,
      {
        number: nextNumber,
        icon: '',
        title: 'Giá trị mới',
        description: 'Mô tả chi tiết về giá trị này...',
      },
    ]);
  };

  const handleUpdateItem = (index: number, field: keyof CompanyValueItem, val: string) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: val } : item))
    );
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    setItems((prev) => {
      const next = [...prev];
      const targetIdx = direction === 'up' ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= next.length) return prev;
      const temp = next[index];
      next[index] = next[targetIdx];
      next[targetIdx] = temp;
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await updateMutation.mutateAsync({
        key: section.key,
        title: title.trim(),
        subtitle: subtitle.trim(),
        description: section.description,
        isActive,
        data: {
          items,
        },
      });
    } catch (err: any) {
      alert(`Lưu thất bại: ${err?.message || 'Có lỗi xảy ra'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full pb-12">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            label="Quay lại"
            variant="secondary"
            href="/admin/company"
            className="px-3 h-9 text-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{section.name}</h1>
              <Badge
                label={isActive ? 'Đang kích hoạt' : 'Tạm ẩn'}
                variant={isActive ? 'success' : 'neutral'}
                className="h-7 px-3 text-xs"
              />
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Cấu hình tiêu đề và danh sách các thẻ hệ giá trị cốt lõi (Value System)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            label="Xem trang Live"
            variant="secondary"
            href="/company"
            target="_blank"
            className="px-4 h-10"
          />
          <Button
            type="submit"
            label={isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
            variant="primary"
            className="px-6 h-10"
            isDisabled={isSaving || isUploading}
          />
        </div>
      </div>

      {/* Visibility Status Card */}
      <Card variant="default" className="rounded-2xl p-5 bg-white border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Trạng thái hiển thị trên website</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Khi tạm ẩn, khối này sẽ hoàn toàn không xuất hiện trên trang Company của người dùng
          </p>
        </div>
        <div className="flex items-center">
          <Switch
            label={isActive ? 'Hiển thị trên website' : 'Tạm ẩn khỏi website'}
            value={isActive}
            onChange={(checked) => setIsActive(checked)}
            size="md"
          />
        </div>
      </Card>

      {/* Form Content */}
      <div className="space-y-6">
        <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Thông tin tiêu đề khối
          </h3>

          <TextInput
            label="Nhãn phụ (Subtitle)"
            value={subtitle}
            onChange={(val) => setSubtitle(val)}
            placeholder="VD: Value System"
            width="100%"
            className="border h-10"
          />

          <TextArea
            label="Tiêu đề chính (Title)"
            rows={2}
            value={title}
            onChange={(val) => setTitle(val)}
            placeholder="VD: We believe in building transformative experiences..."
            width="100%"
            className="border"
          />
        </Card>

        {/* Value Cards List */}
        <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Danh sách thẻ giá trị cốt lõi ({items.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Mỗi thẻ bao gồm số thứ tự, biểu tượng, tiêu đề và lời diễn giải
              </p>
            </div>
            <Button
              type="button"
              label="Thêm thẻ giá trị"
              variant="secondary"
              onClick={handleAddItem}
              className="px-3 h-8 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between space-y-4 relative group hover:border-slate-400 transition-colors"
              >
                {/* Header of card */}
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 font-mono">Thứ tự:</span>
                    <TextInput
                      label="Thứ tự"
                      isLabelHidden
                      value={item.number || ''}
                      onChange={(val) => handleUpdateItem(idx, 'number', val)}
                      placeholder="01"
                      width="64px"
                      className='h-10 border'
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveItem(idx, 'up')}
                      className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 transition-colors"
                      title="Di chuyển sang trái/trước"
                    >
                      <MoveUp className="w-3.5 h-3.5 text-slate-600 rotate-[-90deg]" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === items.length - 1}
                      onClick={() => handleMoveItem(idx, 'down')}
                      className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 transition-colors"
                      title="Di chuyển sang phải/sau"
                    >
                      <MoveDown className="w-3.5 h-3.5 text-slate-600 rotate-[-90deg]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-slate-200 rounded transition-colors ml-1"
                      title="Xóa thẻ này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Icon input & preview */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 shrink-0">
                    {item.icon ? (
                      <img src={item.icon} alt={item.title} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-[10px] text-slate-400 text-center">Chưa có</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <TextInput
                      label="URL Icon"
                      isLabelHidden
                      value={item.icon || ''}
                      onChange={(val) => handleUpdateItem(idx, 'icon', val)}
                      placeholder="URL Icon..."
                      width="100%"
                      className='h-10 border'
                    />
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer shrink-0">
                        <input
                          type="file"
                          accept="image/*,.svg"
                          className="hidden"
                          disabled={isUploading}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setUploadingTargetIndex(idx);
                              await uploadFile(file);
                              e.target.value = '';
                            }
                          }}
                        />
                        <span className="inline-flex items-center px-2 py-0.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-[11px] font-semibold text-slate-700 transition-colors">
                          {isUploading && uploadingTargetIndex === idx ? 'Đang tải...' : 'Tải icon'}
                        </span>
                      </label>
                      <Button
                        type="button"
                        label="Xóa icon"
                        variant="secondary"
                        size="sm"
                        className="px-2 h-[25px] text-[10px] font-medium shrink-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                        onClick={() => handleUpdateItem(idx, 'icon', '')}
                        isDisabled={!item.icon?.trim()}
                        tooltip="Xóa icon của thẻ này"
                      />
                    </div>
                  </div>
                </div>

                <TextInput
                  label="Tiêu đề thẻ"
                  value={item.title}
                  onChange={(val) => handleUpdateItem(idx, 'title', val)}
                  placeholder="VD: Outperforming expectations."
                  width="100%"
                  className="border h-10"
                />

                <TextArea
                  label="Lời diễn giải"
                  rows={4}
                  value={item.description}
                  onChange={(val) => handleUpdateItem(idx, 'description', val)}
                  placeholder="Mô tả giá trị cốt lõi..."
                  width="100%"
                  className="border"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </form>
  );
}
