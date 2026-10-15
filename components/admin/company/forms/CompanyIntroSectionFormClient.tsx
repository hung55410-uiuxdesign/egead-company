'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, MoveUp, MoveDown } from 'lucide-react';
import { Button, Card, Badge, Switch, TextInput, TextArea } from '@astryxdesign/core';
import type { CompanySectionModel, CompanyIntroData } from '@/lib/services/company-section.service';
import { useUpdateCompanySectionMutation } from '@/lib/hooks';

interface CompanyIntroSectionFormClientProps {
  section: CompanySectionModel;
}

export default function CompanyIntroSectionFormClient({
  section,
}: CompanyIntroSectionFormClientProps) {
  const router = useRouter();

  // Section base fields
  const [title, setTitle] = useState(
    section.title || 'We consult Customer Experience transformation across all business functions.'
  );
  const [subtitle, setSubtitle] = useState(
    section.subtitle || 'End-to-end enterprise commerce solutions'
  );
  const [isActive, setIsActive] = useState<boolean>(section.isActive ?? true);

  // Custom data
  const rawData: CompanyIntroData = section.data || {};
  const [paragraphs, setParagraphs] = useState<string[]>(
    rawData.paragraphs && rawData.paragraphs.length > 0
      ? rawData.paragraphs
      : [
          'With our hybrid operations and technology model, we fuse empathetic creative thinking, robust solution architecture capabilities, marketing abilities, and intelligence to drive operational efficiencies that help businesses scale and evolve rapidly.',
          'Our portfolio spans various verticals—from manufacturing, retail, distribution, and fast-moving consumer goods to custom print-on-demand and apparel—boasting collaborations with ambitious brands and sellers across more than 10 countries.',
          'Headquartered with our primary engineering hub in Buon Ma Thuot, Vietnam, paired with high-volume US fulfillment facilities guaranteeing sub-24h order dispatch, we eliminate 99% of manual fulfillment bottlenecks with automated precision.',
        ]
  );

  const updateMutation = useUpdateCompanySectionMutation({
    redirectTo: '/admin/company',
  });
  const isSaving = updateMutation.isPending;

  const handleAddParagraph = () => {
    setParagraphs((prev) => [...prev, '']);
  };

  const handleUpdateParagraph = (idx: number, val: string) => {
    setParagraphs((prev) => prev.map((p, i) => (i === idx ? val : p)));
  };

  const handleRemoveParagraph = (idx: number) => {
    setParagraphs((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleMoveParagraph = (idx: number, direction: 'up' | 'down') => {
    setParagraphs((prev) => {
      const next = [...prev];
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= next.length) return prev;
      const temp = next[idx];
      next[idx] = next[targetIdx];
      next[targetIdx] = temp;
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const cleanParagraphs = paragraphs.map((p) => p.trim()).filter(Boolean);

    try {
      await updateMutation.mutateAsync({
        key: section.key,
        title: title.trim(),
        subtitle: subtitle.trim(),
        description: section.description,
        isActive,
        data: {
          paragraphs: cleanParagraphs,
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
              Cấu hình nội dung giới thiệu, thông điệp định vị và các đoạn văn bản giải pháp
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
            isDisabled={isSaving}
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
            Tiêu đề và Thông điệp định vị
          </h3>

          <TextInput
            label="Nhãn phụ (Subtitle)"
            value={subtitle}
            onChange={(val) => setSubtitle(val)}
            placeholder="VD: End-to-end enterprise commerce solutions"
            width="100%"
            className="border h-10"
          />

          <TextArea
            label="Tiêu đề chính (Title)"
            rows={2}
            value={title}
            onChange={(val) => setTitle(val)}
            placeholder="VD: We consult Customer Experience transformation across all business functions."
            width="100%"
            className="border"
          />
        </Card>

        {/* Paragraphs List */}
        <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Các đoạn văn bản chi tiết ({paragraphs.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Các đoạn mô tả chi tiết hiển thị ở cột bên phải khối giới thiệu
              </p>
            </div>
            <Button
              type="button"
              label="Thêm đoạn văn"
              variant="secondary"
              onClick={handleAddParagraph}
              className="px-3 h-8 text-xs"
            />
          </div>

          <div className="space-y-4">
            {paragraphs.map((p, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative group hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Đoạn #{idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveParagraph(idx, 'up')}
                      className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 transition-colors"
                      title="Di chuyển lên"
                    >
                      <MoveUp className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === paragraphs.length - 1}
                      onClick={() => handleMoveParagraph(idx, 'down')}
                      className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 transition-colors"
                      title="Di chuyển xuống"
                    >
                      <MoveDown className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveParagraph(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-slate-200 rounded transition-colors ml-1"
                      title="Xóa đoạn này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <TextArea
                  label={`Nội dung đoạn #${idx + 1}`}
                  isLabelHidden
                  rows={3}
                  value={p}
                  onChange={(val) => handleUpdateParagraph(idx, val)}
                  placeholder="Nhập nội dung đoạn văn..."
                  width="100%"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </form>
  );
}
