'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { X, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Button, Card, Badge, Field } from '@astryxdesign/core';
import type {
  HomeSectionModel,
  PartnerLogo,
} from '@/lib/services/home-section.service';
import { useUploadMedia, useUpdateHomeSectionMutation } from '@/lib/hooks';

interface MarketplacesSectionFormClientProps {
  section: HomeSectionModel;
}

const defaultRow1: PartnerLogo[] = [
  { name: 'Partner 01', src: '/assets/partners/01.svg' },
  { name: 'Partner 02', src: '/assets/partners/02.svg' },
  { name: 'Partner 03', src: '/assets/partners/03.svg' },
  { name: 'Partner 04', src: '/assets/partners/04.png' },
  { name: 'Partner 05', src: '/assets/partners/05.svg' },
  { name: 'Partner 06', src: '/assets/partners/06.svg' },
  { name: 'Partner 07', src: '/assets/partners/07.svg' },
  { name: 'Partner 08', src: '/assets/partners/08.svg' },
  { name: 'Partner 09', src: '/assets/partners/09.svg' },
  { name: 'Partner 10', src: '/assets/partners/10.svg' },
  { name: 'Partner 11', src: '/assets/partners/11.svg' },
  { name: 'Partner 12', src: '/assets/partners/12.svg' },
  { name: 'Partner 13', src: '/assets/partners/13.svg' },
  { name: 'Partner 14', src: '/assets/partners/14.svg' },
  { name: 'Partner 15', src: '/assets/partners/15.svg' },
];

const defaultRow2: PartnerLogo[] = [
  { name: 'Partner 16', src: '/assets/partners/16.svg' },
  { name: 'Partner 17', src: '/assets/partners/17.svg' },
  { name: 'Partner 18', src: '/assets/partners/18.svg' },
  { name: 'Partner 19', src: '/assets/partners/19.svg' },
  { name: 'Partner 20', src: '/assets/partners/20.svg' },
  { name: 'Partner 21', src: '/assets/partners/21.svg' },
  { name: 'Partner 22', src: '/assets/partners/22.svg' },
  { name: 'Partner 23', src: '/assets/partners/23.svg' },
  { name: 'Partner 24', src: '/assets/partners/24.svg' },
  { name: 'Partner 25', src: '/assets/partners/25.svg' },
  { name: 'Partner 26', src: '/assets/partners/26.svg' },
  { name: 'Partner 27', src: '/assets/partners/27.svg' },
  { name: 'Partner 28', src: '/assets/partners/28.svg' },
  { name: 'Partner 29', src: '/assets/partners/29.svg' },
];

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

  // Dynamic Marquee Rows
  const initialRows: PartnerLogo[][] = (() => {
    const rawData: any = section.data || {};
    const unwrappedData: any =
      rawData?.data && (rawData.data?.rows || rawData.data?.row1Partners)
        ? rawData.data
        : rawData;

    if (Array.isArray(unwrappedData?.rows) && unwrappedData.rows.length > 0) {
      return unwrappedData.rows;
    }
    const r1 = unwrappedData?.row1Partners;
    const r2 = unwrappedData?.row2Partners;
    if (
      (Array.isArray(r1) && r1.length > 0) ||
      (Array.isArray(r2) && r2.length > 0)
    ) {
      return [r1 || defaultRow1, r2 || defaultRow2];
    }
    return [defaultRow1, defaultRow2];
  })();

  const [rows, setRows] = useState<PartnerLogo[][]>(initialRows);

  // TanStack Query Mutation
  const updateMutation = useUpdateHomeSectionMutation();
  const isSaving = updateMutation.isPending;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Upload state
  const [uploadTarget, setUploadTarget] = useState<{
    rowIndex: number;
    logoIndex?: number;
  } | null>(null);

  const { uploadFileAsync, isUploading } = useUploadMedia({
    defaultFolder: 'egead_cms/partners',
    successMessage: 'Tải logo lên thành công!',
  });

  // Row Management Handlers
  const handleAddRow = () => {
    setRows((prev) => {
      const nextIndex = prev.length + 1;
      return [
        ...prev,
        [
          {
            name: `Partner ${nextIndex}-01`,
            src: '/assets/partners/01.svg',
          },
        ],
      ];
    });
  };

  const handleRemoveRow = (rowIndex: number) => {
    if (rows.length <= 1) {
      alert('Cần giữ lại ít nhất 1 hàng logo!');
      return;
    }
    const count = rows[rowIndex]?.length || 0;
    if (count > 0) {
      const confirmed = window.confirm(
        `Bạn có chắc chắn muốn xóa Hàng ${rowIndex + 1} (${count} logo)?`
      );
      if (!confirmed) return;
    }
    setRows((prev) => prev.filter((_, idx) => idx !== rowIndex));
  };

  const handleMoveRowUp = (rowIndex: number) => {
    if (rowIndex === 0) return;
    setRows((prev) => {
      const next = [...prev];
      const temp = next[rowIndex];
      next[rowIndex] = next[rowIndex - 1];
      next[rowIndex - 1] = temp;
      return next;
    });
  };

  const handleMoveRowDown = (rowIndex: number) => {
    if (rowIndex >= rows.length - 1) return;
    setRows((prev) => {
      const next = [...prev];
      const temp = next[rowIndex];
      next[rowIndex] = next[rowIndex + 1];
      next[rowIndex + 1] = temp;
      return next;
    });
  };

  // Logo Handlers
  const handleAddLogo = (rowIndex: number) => {
    setRows((prev) => {
      const next = [...prev];
      const currentRow = next[rowIndex] || [];
      next[rowIndex] = [
        ...currentRow,
        {
          name: `Partner ${currentRow.length + 1}`,
          src: '/assets/partners/01.svg',
        },
      ];
      return next;
    });
  };

  const handleUpdateLogo = (
    rowIndex: number,
    logoIndex: number,
    field: keyof PartnerLogo,
    value: string
  ) => {
    setRows((prev) => {
      const next = [...prev];
      const currentRow = [...(next[rowIndex] || [])];
      currentRow[logoIndex] = {
        ...currentRow[logoIndex],
        [field]: value,
      };
      next[rowIndex] = currentRow;
      return next;
    });
  };

  const handleRemoveLogo = (rowIndex: number, logoIndex: number) => {
    setRows((prev) => {
      const next = [...prev];
      next[rowIndex] = (next[rowIndex] || []).filter(
        (_, idx) => idx !== logoIndex
      );
      return next;
    });
  };

  const handleUploadNewLogoToRow = async (rowIndex: number, file: File) => {
    setUploadTarget({ rowIndex });
    try {
      const res = await uploadFileAsync(file);
      if (res?.url) {
        setRows((prev) => {
          const next = [...prev];
          const currentRow = next[rowIndex] || [];
          next[rowIndex] = [
            ...currentRow,
            {
              name: `Partner ${currentRow.length + 1}`,
              src: res.url,
              invert: false,
            },
          ];
          return next;
        });
      }
    } catch {
      // Handled by toast
    } finally {
      setUploadTarget(null);
    }
  };

  const handleReplaceLogo = async (
    rowIndex: number,
    logoIndex: number,
    file: File
  ) => {
    setUploadTarget({ rowIndex, logoIndex });
    try {
      const res = await uploadFileAsync(file);
      if (res?.url) {
        setRows((prev) => {
          const next = [...prev];
          const currentRow = [...(next[rowIndex] || [])];
          currentRow[logoIndex] = {
            ...currentRow[logoIndex],
            src: res.url,
            invert: false,
          };
          next[rowIndex] = currentRow;
          return next;
        });
      }
    } catch {
      // Handled by toast
    } finally {
      setUploadTarget(null);
    }
  };

  const handleToggleInvert = (rowIndex: number, logoIndex: number) => {
    setRows((prev) => {
      const next = [...prev];
      const currentRow = [...(next[rowIndex] || [])];
      const item = currentRow[logoIndex];
      const currentInvert =
        item.invert ?? item.src?.startsWith('/assets/partners/');
      currentRow[logoIndex] = {
        ...item,
        invert: !currentInvert,
      };
      next[rowIndex] = currentRow;
      return next;
    });
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
          rows,
          row1Partners: rows[0] || [],
          row2Partners: rows[1] || [],
        },
      });
      router.refresh();
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
            Cập nhật tiêu đề, đoạn văn mô tả và danh sách các hàng logo đối tác chạy marquee xen kẽ chiều cuộn
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
          CONTROL BAR: QUẢN LÝ CÁC HÀNG MARQUEE
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-100/80 rounded-2xl border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">
              Danh sách các Hàng Logo Marquee
            </h3>
            <Badge
              label={`${rows.length} hàng`}
              variant="neutral"
              className="h-6 px-2.5 text-xs"
            />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Các hàng tự động xen kẽ chiều: Hàng lẻ (1, 3, 5...) cuộn sang trái, Hàng chẵn (2, 4, 6...) cuộn ngược sang phải
          </p>
        </div>

        <Button
          type="button"
          label="Thêm hàng logo mới"
          variant="primary"
          className="px-4 h-9 text-xs"
          onClick={handleAddRow}
        />
      </div>

      {/* =========================================================================
          DYNAMIC MARQUEE ROWS LIST
          ========================================================================= */}
      {rows.map((row, rowIndex) => {
        const isLeft = rowIndex % 2 === 0;
        const isCurrentRowUploadingNew =
          isUploading &&
          uploadTarget?.rowIndex === rowIndex &&
          uploadTarget?.logoIndex === undefined;

        return (
          <Card
            key={rowIndex}
            variant="default"
            className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white border border-slate-200/90 shadow-2xs"
          >
            {/* Row Card Header */}
            <div className="border-b border-slate-100 pb-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-slate-900">
                    {rowIndex + 2}. Danh sách Logo Hàng {rowIndex + 1}
                  </h2>
                  <Badge
                    label={`${row.length} logo`}
                    variant="neutral"
                    className="h-6 px-2.5 text-xs"
                  />
                  <Badge
                    label={isLeft ? 'Cuộn sang trái' : 'Cuộn ngược sang phải'}
                    variant={isLeft ? 'neutral' : 'warning'}
                    className="h-6 px-2.5 text-xs"
                  />
                </div>
                <p className="text-xs text-slate-500">
                  {isLeft
                    ? 'Hàng marquee chạy liên tục từ phải sang trái (mặc định cho các hàng lẻ: 1, 3, 5...)'
                    : 'Hàng marquee chạy liên tục ngược chiều từ trái sang phải (cho các hàng chẵn: 2, 4, 6...)'}
                </p>
              </div>

              {/* Row Header Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Move Row Up */}
                <button
                  type="button"
                  onClick={() => handleMoveRowUp(rowIndex)}
                  disabled={rowIndex === 0}
                  className={`p-1.5 rounded-lg border border-slate-200 transition-colors ${
                    rowIndex === 0
                      ? 'text-slate-300 border-slate-100 cursor-not-allowed'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  title="Di chuyển hàng lên trên"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                {/* Move Row Down */}
                <button
                  type="button"
                  onClick={() => handleMoveRowDown(rowIndex)}
                  disabled={rowIndex === rows.length - 1}
                  className={`p-1.5 rounded-lg border border-slate-200 transition-colors ${
                    rowIndex === rows.length - 1
                      ? 'text-slate-300 border-slate-100 cursor-not-allowed'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  title="Di chuyển hàng xuống dưới"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                {/* Delete Row Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveRow(rowIndex)}
                  disabled={rows.length <= 1}
                  className={`p-1.5 rounded-lg border border-slate-200 transition-colors ${
                    rows.length <= 1
                      ? 'text-slate-300 border-slate-100 cursor-not-allowed'
                      : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50 border-slate-200'
                  }`}
                  title="Xóa cả hàng này"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Upload logo from file */}
                <label className="cursor-pointer">
                  <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors shadow-2xs">
                    {isCurrentRowUploadingNew
                      ? 'Đang tải lên...'
                      : 'Thêm logo từ máy tính'}
                  </span>
                  <input
                    type="file"
                    accept="image/*,.svg"
                    className="hidden"
                    disabled={isUploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUploadNewLogoToRow(rowIndex, file);
                        e.target.value = '';
                      }
                    }}
                  />
                </label>

                {/* Add blank logo */}
                <Button
                  type="button"
                  label="Thêm logo rỗng"
                  variant="secondary"
                  className="px-3 h-8 text-xs"
                  onClick={() => handleAddLogo(rowIndex)}
                />
              </div>
            </div>

            {/* Logo Items Grid */}
            {row.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                Chưa có logo nào trong hàng này. Bấm &quot;Thêm logo từ máy tính&quot; hoặc &quot;Thêm logo rỗng&quot; ở trên.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {row.map((partner, logoIndex) => {
                  const isCurrentItemReplacing =
                    isUploading &&
                    uploadTarget?.rowIndex === rowIndex &&
                    uploadTarget?.logoIndex === logoIndex;

                  const shouldInvert =
                    partner.invert ?? partner.src?.startsWith('/assets/partners/');

                  return (
                    <div
                      key={logoIndex}
                      className="p-3 bg-slate-50/80 border border-slate-200 rounded-xl flex items-center gap-3 relative group hover:border-slate-300 transition-colors"
                    >
                      {/* Logo Preview Box - Clickable to Upload */}
                      <label
                        className="cursor-pointer group/preview relative w-16 h-12 rounded-lg bg-[#0A0D0E] flex items-center justify-center p-1.5 shrink-0 border border-slate-700 hover:border-emerald-500 transition-all overflow-hidden"
                        title="Click để chọn ảnh thay thế từ máy tính"
                      >
                        <input
                          type="file"
                          accept="image/*,.svg"
                          className="hidden"
                          disabled={isUploading}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              await handleReplaceLogo(
                                rowIndex,
                                logoIndex,
                                file
                              );
                              e.target.value = '';
                            }
                          }}
                        />
                        <img
                          src={partner.src}
                          alt={partner.name}
                          className={`max-h-full max-w-full object-contain group-hover/preview:opacity-30 transition-opacity ${
                            shouldInvert ? 'invert' : ''
                          }`}
                          onError={(e) => {
                            (e.target as HTMLElement).style.opacity = '0.3';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center text-[10px] text-white font-medium transition-opacity">
                          {isCurrentItemReplacing ? '...' : 'Đổi ảnh'}
                        </div>
                      </label>

                      {/* Edit Inputs */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <input
                          type="text"
                          value={partner.name}
                          onChange={(e) =>
                            handleUpdateLogo(
                              rowIndex,
                              logoIndex,
                              'name',
                              e.target.value
                            )
                          }
                          placeholder="Tên đối tác / sàn"
                          className="w-full px-2.5 py-1 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                        />
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={partner.src}
                            onChange={(e) =>
                              handleUpdateLogo(
                                rowIndex,
                                logoIndex,
                                'src',
                                e.target.value
                              )
                            }
                            placeholder="/assets/partners/01.svg"
                            className="flex-1 min-w-0 px-2.5 py-1 text-[11px] font-mono bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-slate-800"
                          />
                          <label className="cursor-pointer shrink-0">
                            <input
                              type="file"
                              accept="image/*,.svg"
                              className="hidden"
                              disabled={isUploading}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  await handleReplaceLogo(
                                    rowIndex,
                                    logoIndex,
                                    file
                                  );
                                  e.target.value = '';
                                }
                              }}
                            />
                            <span className="inline-flex items-center justify-center px-2 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-[11px] font-medium text-slate-700 transition-colors shadow-2xs">
                              {isCurrentItemReplacing
                                ? 'Đang tải...'
                                : 'Tải ảnh'}
                            </span>
                          </label>
                          <button
                            type="button"
                            onClick={() => handleToggleInvert(rowIndex, logoIndex)}
                            className={`shrink-0 px-2 py-1 rounded-md border text-[11px] font-medium transition-colors ${
                              shouldInvert
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                            title={
                              shouldInvert
                                ? 'Đang bật đảo màu (đen thành trắng). Bấm nếu logo của bạn vốn đã màu trắng.'
                                : 'Đang dùng màu gốc. Bấm để đảo màu nếu logo của bạn màu đen.'
                            }
                          >
                            {shouldInvert ? 'Đang đảo màu' : 'Màu gốc'}
                          </button>
                        </div>
                      </div>

                      {/* Remove logo button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveLogo(rowIndex, logoIndex)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-slate-200/50 transition-colors"
                        title="Xóa logo này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        );
      })}

      {/* Button to add another row at bottom */}
      <div className="flex justify-center pt-2">
        <Button
          type="button"
          label="Thêm hàng logo mới"
          variant="secondary"
          className="px-6 h-10 text-xs font-semibold"
          onClick={handleAddRow}
        />
      </div>

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
