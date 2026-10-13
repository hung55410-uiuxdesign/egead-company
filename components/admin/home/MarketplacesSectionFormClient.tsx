'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { X, Trash2, Plus, Upload } from 'lucide-react';
import { Button, Card, Badge, Field } from '@astryxdesign/core';
import type {
  HomeSectionModel,
  PartnerLogo,
} from '@/lib/services/home-section.service';
import { useUploadMedia, useUpdateHomeSectionMutation } from '@/lib/hooks';

interface MarketplacesSectionFormClientProps {
  section: HomeSectionModel;
}

export default function MarketplacesSectionFormClient({
  section,
}: MarketplacesSectionFormClientProps) {
  const router = useRouter();

  // Heading & Text Fields
  const [title, setTitle] = useState(
    section.title ||
      "Operating Across the World's Leading Marketplaces & Platforms"
  );
  const [subtitle, setSubtitle] = useState(
    section.subtitle || 'LEADING PLATFORMS & MARKETPLACES'
  );
  const [description, setDescription] = useState(
    section.description ||
      'EGEAD drives cross-border e-commerce growth across major global platforms, including TikTok Shop, Shopify, Etsy, and eBay. Combining data-driven marketing via TikTok & Google Ads with streamlined fulfillment and dedicated operating tools, we help products reach international consumers efficiently.'
  );
  const [isActive, setIsActive] = useState<boolean>(section.isActive ?? true);

  // Marquee Rows
  const [row1Partners, setRow1Partners] = useState<PartnerLogo[]>(
    section.data?.row1Partners || []
  );
  const [row2Partners, setRow2Partners] = useState<PartnerLogo[]>(
    section.data?.row2Partners || []
  );

  // TanStack Query Mutation
  const updateMutation = useUpdateHomeSectionMutation();
  const isSaving = updateMutation.isPending;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Track specific item uploading index for Row 1 and Row 2
  const [targetRow1Index, setTargetRow1Index] = useState<number | null>(null);
  const [targetRow2Index, setTargetRow2Index] = useState<number | null>(null);

  // Cloudinary Upload for Row 1
  const { uploadFile: uploadRow1File, isUploading: isUploadingRow1 } =
    useUploadMedia({
      defaultFolder: 'egead_cms/partners',
      successMessage: 'Tải logo hàng 1 lên thành công!',
      onSuccess: (data) => {
        if (targetRow1Index !== null) {
          setRow1Partners((prev) =>
            prev.map((item, idx) =>
              idx === targetRow1Index ? { ...item, src: data.url } : item
            )
          );
          setTargetRow1Index(null);
        } else {
          setRow1Partners((prev) => [
            ...prev,
            {
              name: `Partner ${prev.length + 1}`,
              src: data.url,
            },
          ]);
        }
      },
    });

  // Cloudinary Upload for Row 2
  const { uploadFile: uploadRow2File, isUploading: isUploadingRow2 } =
    useUploadMedia({
      defaultFolder: 'egead_cms/partners',
      successMessage: 'Tải logo hàng 2 lên thành công!',
      onSuccess: (data) => {
        if (targetRow2Index !== null) {
          setRow2Partners((prev) =>
            prev.map((item, idx) =>
              idx === targetRow2Index ? { ...item, src: data.url } : item
            )
          );
          setTargetRow2Index(null);
        } else {
          setRow2Partners((prev) => [
            ...prev,
            {
              name: `Partner ${prev.length + 16}`,
              src: data.url,
            },
          ]);
        }
      },
    });

  // Row 1 Handlers
  const handleAddRow1Logo = () => {
    setRow1Partners((prev) => [
      ...prev,
      {
        name: `Partner ${prev.length + 1}`,
        src: '/assets/partners/01.svg',
      },
    ]);
  };

  const handleUpdateRow1Logo = (
    index: number,
    field: keyof PartnerLogo,
    value: string
  ) => {
    setRow1Partners((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleRemoveRow1Logo = (index: number) => {
    setRow1Partners((prev) => prev.filter((_, i) => i !== index));
  };

  // Row 2 Handlers
  const handleAddRow2Logo = () => {
    setRow2Partners((prev) => [
      ...prev,
      {
        name: `Partner ${prev.length + 16}`,
        src: '/assets/partners/16.svg',
      },
    ]);
  };

  const handleUpdateRow2Logo = (
    index: number,
    field: keyof PartnerLogo,
    value: string
  ) => {
    setRow2Partners((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleRemoveRow2Logo = (index: number) => {
    setRow2Partners((prev) => prev.filter((_, i) => i !== index));
  };

  // Form Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tiêu đề section');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        key: section.key,
        title: title.trim(),
        subtitle: subtitle.trim() || null,
        description: description.trim() || null,
        isActive,
        data: {
          row1Partners,
          row2Partners,
        },
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi lưu dữ liệu section');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full pb-16">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              label="Quay lại danh sách section"
              variant="secondary"
              className="px-4 h-10"
              href="/admin/home"
            />
            <Button
              label="Xem trang chủ Live"
              variant="secondary"
              className="px-4 h-10"
              href="/#homepage__customers"
              target="_blank"
            />
            <Badge
              label={isActive ? 'Đang kích hoạt' : 'Tạm ẩn'}
              variant={isActive ? 'success' : 'neutral'}
              className="h-8 px-4"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            Chỉnh sửa: {section.name}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Cập nhật tiêu đề, đoạn văn mô tả và 2 hàng logo đối tác chạy marquee trên trang chủ
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            label="Hủy bỏ"
            variant="ghost"
            className="px-4 h-10"
            href="/admin/home"
          />
          <Button
            label={isSaving ? 'Đang lưu...' : 'Lưu thay đổi section'}
            variant="primary"
            type="submit"
            className="px-4 h-10"
            isDisabled={isSaving}
          />
        </div>
      </div>

      {/* Notifications */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center justify-between">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-rose-500 hover:text-rose-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =========================================================================
          CARD 1: TIÊU ĐỀ & VĂN BẢN GIỚI THIỆU (HEADING & DESCRIPTION)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              1. Tiêu đề &amp; Đoạn văn giới thiệu Section
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Nội dung văn bản hiển thị ở đầu khối đối tác trên trang chủ
            </p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
            />
            <span>Hiển thị section này trên trang chủ</span>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Subtitle */}
          <Field
            label="Phụ đề nhỏ (Subtitle)"
            inputID="section-subtitle"
            description="Nhãn danh mục nhỏ xuất hiện trên tiêu đề chính"
          >
            <input
              id="section-subtitle"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="LEADING PLATFORMS & MARKETPLACES"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
            />
          </Field>

          {/* Heading */}
          <Field
            label="Tiêu đề chính (Heading)"
            inputID="section-title"
            isRequired
            description="Dòng chữ tiêu đề lớn của section"
          >
            <input
              id="section-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Operating Across the World's Leading Marketplaces & Platforms"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
              required
            />
          </Field>

          {/* Description */}
          <Field
            label="Đoạn văn mô tả (Description / Body text)"
            inputID="section-description"
            description="Đoạn văn chi tiết về việc kết nối và mở rộng quy mô trên các sàn thương mại điện tử"
          >
            <textarea
              id="section-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="EGEAD drives cross-border e-commerce growth across major global platforms..."
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors resize-y"
            />
          </Field>
        </div>
      </Card>

      {/* =========================================================================
          CARD 2: DANH SÁCH LOGO HÀNG 1 (ROW 1 MARQUEE - FLOWS LEFT)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                2. Danh sách Logo Hàng 1 (Cuộn sang trái)
              </h2>
              <Badge
                label={`${row1Partners.length} logo`}
                variant="neutral"
                className="h-6 px-2.5 text-xs"
              />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Hàng marquee phía trên, chạy liên tục từ phải sang trái
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="cursor-pointer">
              <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors">
                {isUploadingRow1 && targetRow1Index === null ? 'Đang tải lên...' : 'Thêm logo từ máy tính'}
              </span>
              <input
                type="file"
                accept="image/*,.svg"
                className="hidden"
                disabled={isUploadingRow1}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setTargetRow1Index(null);
                    uploadRow1File(file);
                    e.target.value = '';
                  }
                }}
              />
            </label>
            <Button
              type="button"
              label="Thêm logo rỗng"
              variant="secondary"
              className="px-3 h-8 text-xs"
              onClick={handleAddRow1Logo}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {row1Partners.map((partner, index) => (
            <div
              key={index}
              className="p-3 bg-slate-50/80 border border-slate-200 rounded-xl flex items-center gap-3 relative group"
            >
              {/* Logo Preview Box - Clickable to Upload */}
              <label
                className="cursor-pointer group/preview relative w-16 h-12 rounded-lg bg-[#0A0D0E] flex items-center justify-center p-1.5 shrink-0 border border-slate-700 hover:border-emerald-500 transition-all overflow-hidden"
                title="Click để chọn ảnh thay thế"
              >
                <input
                  type="file"
                  accept="image/*,.svg"
                  className="hidden"
                  disabled={isUploadingRow1}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setTargetRow1Index(index);
                      await uploadRow1File(file);
                      e.target.value = '';
                    }
                  }}
                />
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain invert group-hover/preview:opacity-30 transition-opacity"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = '0.3';
                  }}
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center text-[10px] text-white font-medium transition-opacity">
                  {isUploadingRow1 && targetRow1Index === index ? 'Đang tải...' : 'Đổi ảnh'}
                </div>
              </label>

              {/* Edit Inputs */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <input
                  type="text"
                  value={partner.name}
                  onChange={(e) =>
                    handleUpdateRow1Logo(index, 'name', e.target.value)
                  }
                  placeholder="Tên đối tác / sàn"
                  className="w-full px-2.5 py-1 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                />
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={partner.src}
                    onChange={(e) =>
                      handleUpdateRow1Logo(index, 'src', e.target.value)
                    }
                    placeholder="/assets/partners/01.svg"
                    className="flex-1 min-w-0 px-2.5 py-1 text-[11px] font-mono bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-slate-800"
                  />
                  <label className="cursor-pointer shrink-0">
                    <input
                      type="file"
                      accept="image/*,.svg"
                      className="hidden"
                      disabled={isUploadingRow1}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setTargetRow1Index(index);
                          await uploadRow1File(file);
                          e.target.value = '';
                        }
                      }}
                    />
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-[11px] font-medium text-slate-700 transition-colors shadow-2xs">
                      {isUploadingRow1 && targetRow1Index === index ? 'Đang tải...' : 'Tải ảnh'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemoveRow1Logo(index)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-slate-200/50"
                title="Xóa logo này"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* =========================================================================
          CARD 3: DANH SÁCH LOGO HÀNG 2 (ROW 2 MARQUEE - FLOWS RIGHT)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                3. Danh sách Logo Hàng 2 (Cuộn ngược sang phải)
              </h2>
              <Badge
                label={`${row2Partners.length} logo`}
                variant="neutral"
                className="h-6 px-2.5 text-xs"
              />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Hàng marquee phía dưới, chạy liên tục ngược chiều từ trái sang phải
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="cursor-pointer">
              <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors">
                {isUploadingRow2 && targetRow2Index === null ? 'Đang tải lên...' : 'Thêm logo từ máy tính'}
              </span>
              <input
                type="file"
                accept="image/*,.svg"
                className="hidden"
                disabled={isUploadingRow2}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setTargetRow2Index(null);
                    uploadRow2File(file);
                    e.target.value = '';
                  }
                }}
              />
            </label>
            <Button
              type="button"
              label="Thêm logo rỗng"
              variant="secondary"
              className="px-3 h-8 text-xs"
              onClick={handleAddRow2Logo}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {row2Partners.map((partner, index) => (
            <div
              key={index}
              className="p-3 bg-slate-50/80 border border-slate-200 rounded-xl flex items-center gap-3 relative group"
            >
              {/* Logo Preview Box - Clickable to Upload */}
              <label
                className="cursor-pointer group/preview relative w-16 h-12 rounded-lg bg-[#0A0D0E] flex items-center justify-center p-1.5 shrink-0 border border-slate-700 hover:border-emerald-500 transition-all overflow-hidden"
                title="Click để chọn ảnh thay thế"
              >
                <input
                  type="file"
                  accept="image/*,.svg"
                  className="hidden"
                  disabled={isUploadingRow2}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setTargetRow2Index(index);
                      await uploadRow2File(file);
                      e.target.value = '';
                    }
                  }}
                />
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain invert group-hover/preview:opacity-30 transition-opacity"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = '0.3';
                  }}
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center text-[10px] text-white font-medium transition-opacity">
                  {isUploadingRow2 && targetRow2Index === index ? 'Đang tải...' : 'Đổi ảnh'}
                </div>
              </label>

              {/* Edit Inputs */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <input
                  type="text"
                  value={partner.name}
                  onChange={(e) =>
                    handleUpdateRow2Logo(index, 'name', e.target.value)
                  }
                  placeholder="Tên đối tác / sàn"
                  className="w-full px-2.5 py-1 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                />
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={partner.src}
                    onChange={(e) =>
                      handleUpdateRow2Logo(index, 'src', e.target.value)
                    }
                    placeholder="/assets/partners/16.svg"
                    className="flex-1 min-w-0 px-2.5 py-1 text-[11px] font-mono bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-slate-800"
                  />
                  <label className="cursor-pointer shrink-0">
                    <input
                      type="file"
                      accept="image/*,.svg"
                      className="hidden"
                      disabled={isUploadingRow2}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setTargetRow2Index(index);
                          await uploadRow2File(file);
                          e.target.value = '';
                        }
                      }}
                    />
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-[11px] font-medium text-slate-700 transition-colors shadow-2xs">
                      {isUploadingRow2 && targetRow2Index === index ? 'Đang tải...' : 'Tải ảnh'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemoveRow2Logo(index)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-slate-200/50"
                title="Xóa logo này"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* =========================================================================
          BOTTOM ACTION BAR
          ========================================================================= */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <Button
          label="Quay lại danh sách section"
          variant="secondary"
          className="px-4 h-10"
          href="/admin/home"
        />

        <div className="flex items-center gap-3">
          <Button
            label="Hủy bỏ"
            variant="ghost"
            className="px-4 h-10"
            href="/admin/home"
          />
          <Button
            label={isSaving ? 'Đang lưu...' : 'Lưu thay đổi section'}
            variant="primary"
            type="submit"
            className="px-4 h-10"
            isDisabled={isSaving}
          />
        </div>
      </div>
    </form>
  );
}
