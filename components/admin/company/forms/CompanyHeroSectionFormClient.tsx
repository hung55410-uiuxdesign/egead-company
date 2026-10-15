'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Check, ExternalLink } from 'lucide-react';
import { Button, Card, Badge, Switch, TextInput } from '@astryxdesign/core';
import type { CompanySectionModel, CompanyHeroData } from '@/lib/services/company-section.service';
import { useUploadMedia, useUpdateCompanySectionMutation } from '@/lib/hooks';

interface CompanyHeroSectionFormClientProps {
  section: CompanySectionModel;
}

export default function CompanyHeroSectionFormClient({
  section,
}: CompanyHeroSectionFormClientProps) {
  const router = useRouter();

  // Section base fields
  const [subtitle, setSubtitle] = useState(section.subtitle || 'Our Values');
  const [isActive, setIsActive] = useState<boolean>(section.isActive ?? true);

  // Custom data
  const rawData: CompanyHeroData = section.data || {};
  const [titlePart1, setTitlePart1] = useState(rawData.titlePart1 || 'Transform today,');
  const [titlePart2, setTitlePart2] = useState(rawData.titlePart2 || 'lead tomorrow.');
  const [image, setImage] = useState(rawData.image || '/assets/Rectangle_539.jpg');
  const [badgeText, setBadgeText] = useState(rawData.badgeText || 'Buon Ma Thuot HQ & US Fulfillment Network');
  const [alt, setAlt] = useState(rawData.alt || 'E-GEAD Global Transformation');

  // TanStack Query Mutation
  const updateMutation = useUpdateCompanySectionMutation({
    redirectTo: '/admin/company',
  });
  const isSaving = updateMutation.isPending;

  // Cloudinary media uploader for hero image
  const { uploadFile, isUploading } = useUploadMedia({
    defaultFolder: 'egead_cms/company',
    successMessage: 'Tải ảnh banner thành công!',
    onSuccess: (data) => {
      setImage(data.url);
    },
    onError: (err) => {
      alert(`Tải ảnh thất bại: ${err.message}`);
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fullTitle = `${titlePart1.trim()} ${titlePart2.trim()}`.trim();

    try {
      await updateMutation.mutateAsync({
        key: section.key,
        title: fullTitle,
        subtitle: subtitle.trim(),
        description: section.description,
        isActive,
        data: {
          subtitle: subtitle.trim(),
          titlePart1: titlePart1.trim(),
          titlePart2: titlePart2.trim(),
          image: image.trim(),
          badgeText: badgeText.trim(),
          alt: alt.trim(),
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
              Cấu hình tiêu đề mở đầu, slogan gradient và ảnh banner đại diện
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Text configurations */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Thông điệp tiêu đề
            </h3>

            <TextInput
              label="Nhãn phụ (Subtitle)"
              value={subtitle}
              onChange={(val) => setSubtitle(val)}
              placeholder="VD: Our Values"
              width="100%"
              className="border h-10"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="Tiêu đề chính dòng 1 (Chữ sáng)"
                value={titlePart1}
                onChange={(val) => setTitlePart1(val)}
                placeholder="VD: Transform today,"
                width="100%"
                className="border h-10"
              />

              <TextInput
                label="Tiêu đề chính dòng 2 (Gradient xanh)"
                value={titlePart2}
                onChange={(val) => setTitlePart2(val)}
                placeholder="VD: lead tomorrow."
                width="100%"
                className="border h-10"
              />
            </div>

            <TextInput
              label="Huy hiệu đính kèm trên ảnh (Badge text)"
              value={badgeText}
              onChange={(val) => setBadgeText(val)}
              placeholder="VD: Buon Ma Thuot HQ & US Fulfillment Network"
              width="100%"
              className="border h-10"
            />

            <TextInput
              label="Thẻ mô tả ảnh (Alt text)"
              value={alt}
              onChange={(val) => setAlt(val)}
              placeholder="VD: E-GEAD Global Transformation"
              width="100%"
              className="border h-10"
            />
          </Card>
        </div>

        {/* Right Column: Banner Image & Preview */}
        <div className="space-y-6">
          <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Ảnh Banner lớn
            </h3>

            {/* Preview Box */}
            <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt={alt || 'Banner Preview'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-slate-400">Chưa có ảnh</span>
              )}
              {badgeText && (
                <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-[10px] text-white">
                  {badgeText}
                </span>
              )}
            </div>

            <TextInput
              label="Đường dẫn ảnh (URL)"
              value={image}
              onChange={(val) => setImage(val)}
              placeholder="/assets/Rectangle_539.jpg hoặc https://res.cloudinary.com/..."
              width="100%"
              className="border h-10"
            />

            {/* Upload file button */}
            <div>
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={isUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      await uploadFile(file);
                      e.target.value = '';
                    }
                  }}
                />
                <span className="inline-flex w-full items-center justify-center px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs">
                  {isUploading ? 'Đang tải ảnh lên...' : 'Tải ảnh mới từ máy tính'}
                </span>
              </label>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}
