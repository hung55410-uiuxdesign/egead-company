'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Badge, Switch, TextInput, TextArea } from '@astryxdesign/core';
import type { CompanySectionModel, CompanyContactData } from '@/lib/services/company-section.service';
import { useUpdateCompanySectionMutation } from '@/lib/hooks';

interface CompanyContactSectionFormClientProps {
  section: CompanySectionModel;
}

export default function CompanyContactSectionFormClient({
  section,
}: CompanyContactSectionFormClientProps) {
  const router = useRouter();

  const [title, setTitle] = useState(
    section.title || "Let's automate your e-commerce operations."
  );
  const [subtitle, setSubtitle] = useState(section.subtitle || 'Get in touch');
  const [isActive, setIsActive] = useState<boolean>(section.isActive ?? true);

  const rawData: CompanyContactData = section.data || {};
  const [buttonText, setButtonText] = useState(
    rawData.buttonText || 'Get Free Consultation'
  );
  const [buttonHref, setButtonHref] = useState(
    rawData.buttonHref || '/contact-us'
  );

  const updateMutation = useUpdateCompanySectionMutation({
    redirectTo: '/admin/company',
  });
  const isSaving = updateMutation.isPending;

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
          buttonText: buttonText.trim(),
          buttonHref: buttonHref.trim(),
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
              Cấu hình tiêu đề kêu gọi và nút liên kết tư vấn miễn phí ở chân trang
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
      <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4 max-w-2xl">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Thông tin khối kêu gọi
        </h3>

        <TextInput
          label="Nhãn phụ (Subtitle)"
          value={subtitle}
          onChange={(val) => setSubtitle(val)}
          placeholder="Get in touch"
          width="100%"
          className="border h-10"
        />

        <TextArea
          label="Tiêu đề chính (Title)"
          rows={2}
          value={title}
          onChange={(val) => setTitle(val)}
          placeholder="Let's automate your e-commerce operations."
          width="100%"
          className="border"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="Nhãn nút bấm (Button text)"
            value={buttonText}
            onChange={(val) => setButtonText(val)}
            placeholder="Get Free Consultation"
            width="100%"
            className="border h-10"
          />

          <TextInput
            label="Đường dẫn nút bấm (Href)"
            value={buttonHref}
            onChange={(val) => setButtonHref(val)}
            placeholder="/contact-us"
            width="100%"
            className="border h-10"
          />
        </div>
      </Card>
    </form>
  );
}
