'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Badge, Field } from '@astryxdesign/core';
import type {
  HomeSectionModel,
  TestimonialItem,
  TestimonialsSectionData,
} from '@/lib/services/home-section.service';
import { useUploadMedia, useUpdateHomeSectionMutation } from '@/lib/hooks';

interface TestimonialsSectionFormClientProps {
  section: HomeSectionModel;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: 'shinosuke',
    quote:
      'The AI market intelligence platform continuously aggregates and analyzes consumer behavior across leading e-commerce marketplaces (Amazon, Etsy, eBay, TikTok Shop). Trends delivers pinpoint forecasts on high-potential product niches, automatically recommends real-time POD design ideas, and optimizes SEO listings to help sellers stay ahead of demand and scale revenue effortlessly.',
    name: 'Shinosuke',
    subtitle: 'In-depth resources to help you',
    avatar: '/assets/avatar_shinosuke.jpg',
    partnerLogo: '/assets/partners-short/01.svg',
  },
  {
    id: 'urbanvibe',
    quote:
      'Migrating our DTF printing and fulfillment operations to E-GEAD was the ultimate turning point for our brand. Sub-24h turnaround times and a 0.18% late dispatch rate across 28,000 peak holiday orders preserved our TikTok Shop US Fast Dispatch badge and drove a 180% surge in seasonal revenue.',
    name: 'Marcus Vance',
    subtitle: 'Head of Supply Chain, UrbanVibe',
    avatar: '/assets/avatar_marcus.jpg',
    partnerLogo: '/assets/partners-short/06.svg',
  },
  {
    id: 'homecraft',
    quote:
      "SmartCommerce's multi-channel automation completely eliminated overselling risks between Amazon, Etsy, and Shopify. The real-time safety buffer engine combined with 99.9% barcode scan WMS accuracy reduced manual operational overhead by 85%, saving our logistics team over 15 hours each week.",
    name: 'Elena Rostova',
    subtitle: 'Operations Director, HomeCraft',
    avatar: '/assets/avatar_elena.jpg',
    partnerLogo: '/assets/partners-short/11.svg',
  },
  {
    id: 'lumina',
    quote:
      "E-GEAD's performance marketing team transformed our unit economics, scaling blended ROAS to 4.8x while reducing acquisition costs to $8.40. Leveraging sub-24h fulfillment proof as authentic social proof in creative testing allowed us to scale daily ad spend to $25,000 profitably.",
    name: 'David Chen',
    subtitle: 'Growth Marketing Lead, Lumina DTC',
    avatar: '/assets/avatar_marcus.jpg',
    partnerLogo: '/assets/partners-short/15.svg',
  },
  {
    id: 'printwave',
    quote:
      "E-GEAD's open RESTful API infrastructure and real-time event webhooks connect directly to US production centers with under 120ms latency. From automated order routing and print file validation to carrier label injection, 100% of our order pipeline runs flawlessly with 99.9% uptime.",
    name: 'Sarah Jenkins',
    subtitle: 'VP of Engineering, PrintWave',
    avatar: '/assets/avatar_elena.jpg',
    partnerLogo: '/assets/partners-short/20.svg',
  },
];

export default function TestimonialsSectionFormClient({
  section,
}: TestimonialsSectionFormClientProps) {
  const router = useRouter();

  // Section Header & State
  const [title, setTitle] = useState(
    section.title || 'Voices of Our Sellers'
  );
  const [subtitle, setSubtitle] = useState(
    section.subtitle || 'Testimonials'
  );
  const [isActive, setIsActive] = useState<boolean>(section.isActive ?? true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Custom Data Fields
  const rawData: any = section.data || {};
  const unwrappedData: TestimonialsSectionData =
    rawData?.data && rawData.data?.items ? rawData.data : rawData;

  const [ratingImage, setRatingImage] = useState<string>(
    unwrappedData.ratingImage || '/images/star.png'
  );

  const [items, setItems] = useState<TestimonialItem[]>(
    Array.isArray(unwrappedData.items) && unwrappedData.items.length > 0
      ? unwrappedData.items
      : defaultTestimonials
  );

  // Active preview index for WYSIWYG card preview
  const [previewIndex, setPreviewIndex] = useState<number>(0);

  // Upload state tracker
  const [uploadingTarget, setUploadingTarget] = useState<{
    type: 'ratingImage' | 'avatar' | 'partnerLogo';
    index?: number;
  } | null>(null);

  // TanStack Query Mutation
  const updateMutation = useUpdateHomeSectionMutation();
  const isSaving = updateMutation.isPending;

  // Cloudinary media uploader
  const { uploadFileAsync, isUploading } = useUploadMedia({
    defaultFolder: 'egead_cms/testimonials',
    successMessage: 'Tải tệp tin ảnh thành công!',
  });

  const handleUploadImage = async (
    target: { type: 'ratingImage' | 'avatar' | 'partnerLogo'; index?: number },
    file: File
  ) => {
    try {
      setUploadingTarget(target);
      const res = await uploadFileAsync(file, 'egead_cms/testimonials');
      if (res.success && res.url) {
        if (target.type === 'ratingImage') {
          setRatingImage(res.url);
        } else if (target.index !== undefined) {
          const idx = target.index;
          if (target.type === 'avatar') {
            handleUpdateItem(idx, 'avatar', res.url);
          } else if (target.type === 'partnerLogo') {
            handleUpdateItem(idx, 'partnerLogo', res.url);
          }
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi tải ảnh lên');
    } finally {
      setUploadingTarget(null);
    }
  };

  const handleUpdateItem = (
    index: number,
    field: keyof TestimonialItem,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAddItem = () => {
    const newId = `testimonial-${Date.now()}`;
    const newItem: TestimonialItem = {
      id: newId,
      quote:
        'Nhập trích dẫn đánh giá chi tiết của đối tác hoặc nhà bán hàng quốc tế về giải pháp và dịch vụ của E-GEAD...',
      name: 'Tên đối tác mới',
      subtitle: 'Chức danh, Tên thương hiệu',
      avatar: '/assets/avatar_marcus.jpg',
      partnerLogo: '/assets/partners-short/01.svg',
    };
    setItems((prev) => [...prev, newItem]);
    setPreviewIndex(items.length);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) {
      alert('Section cần có tối thiểu 1 lời chứng thực đánh giá.');
      return;
    }
    const nextItems = items.filter((_, i) => i !== index);
    setItems(nextItems);
    if (previewIndex >= nextItems.length) {
      setPreviewIndex(Math.max(0, nextItems.length - 1));
    }
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    setItems((prev) => {
      const cloned = [...prev];
      const temp = cloned[index];
      cloned[index] = cloned[targetIndex];
      cloned[targetIndex] = temp;
      return cloned;
    });

    if (previewIndex === index) {
      setPreviewIndex(targetIndex);
    } else if (previewIndex === targetIndex) {
      setPreviewIndex(index);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tiêu đề chính của section');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        key: section.key,
        title: title.trim(),
        subtitle: subtitle.trim() || null,
        description: section.description || null,
        isActive,
        data: {
          ratingImage: ratingImage.trim(),
          items,
        },
      });
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Có lỗi xảy ra khi lưu nội dung.');
    }
  };

  const activePreviewItem = items[previewIndex] || items[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full pb-16">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
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
              href="/#homepage__testimonial"
              target="_blank"
            />
            <Badge
              label={isActive ? 'Đang kích hoạt' : 'Tạm ẩn'}
              variant={isActive ? 'success' : 'neutral'}
              className="h-8 px-4 text-xs font-semibold"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            Chỉnh sửa: {section.name}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Cập nhật tiêu đề, phụ đề, ảnh đánh giá sao và danh sách các phản hồi khách hàng hiển thị trên 3D carousel trang chủ
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
            isDisabled={isSaving || isUploading}
          />
        </div>
      </div>

      {/* Alert Error Message */}
      {errorMessage && (
        <Card variant="default" className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl">
          {errorMessage}
        </Card>
      )}

      {/* =========================================================================
          CARD 1: CẤU HÌNH TIÊU ĐỀ & TRẠNG THÁI HIỂN THỊ
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white border border-slate-200/90 shadow-xs">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              1. Cấu hình tiêu đề & Trạng thái hiển thị
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cài đặt tiêu đề lớn và trạng thái bật hoặc tắt của section đánh giá trên trang chủ
            </p>
          </div>
          <Badge label="Header section" variant="neutral" className="h-6 px-2.5 text-xs" />
        </div>

        {/* Trạng thái kích hoạt */}
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 flex items-center justify-between">
          <div>
            <label className="text-sm font-semibold text-slate-900 block cursor-pointer">
              Trạng thái hiển thị trên website
            </label>
            <p className="text-xs text-slate-500 mt-0.5">
              Khi tắt, khối đánh giá khách hàng sẽ tạm ẩn hoàn toàn khỏi trang chủ
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        {/* Tiêu đề & Phụ đề */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Tiêu đề phụ (Subtitle)"
            inputID="section-subtitle"
            description="Dòng chữ nhỏ màu xanh nhạt phía trên tiêu đề chính"
          >
            <input
              id="section-subtitle"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Testimonials"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 transition-colors"
            />
          </Field>

          <Field
            label="Tiêu đề chính (Main Title) *"
            inputID="section-title"
            description="Dòng tiêu đề lớn của section đánh giá"
          >
            <input
              id="section-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Voices of Our Sellers"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 transition-colors"
              required
            />
          </Field>
        </div>

        {/* Ảnh xếp hạng sao (Rating stars image) */}
        <div className="pt-2 border-t border-slate-100">
          <Field
            label="Ảnh đánh giá sao (Rating Stars Image)"
            inputID="rating-stars-image"
            description="Ảnh 5 ngôi sao vàng hiển thị ngay dưới trích dẫn đánh giá (mặc định: /images/star.png)"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-1.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-32 h-12 bg-slate-900 rounded-lg flex items-center justify-center p-2 shrink-0 border border-slate-700">
                <img
                  src={ratingImage || '/images/star.png'}
                  alt="Rating stars preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex-1 space-y-2">
                <input
                  id="rating-stars-image"
                  type="text"
                  value={ratingImage}
                  onChange={(e) => setRatingImage(e.target.value)}
                  placeholder="/images/star.png"
                  className="w-full px-3 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-slate-800"
                />

                <label className="cursor-pointer inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUploadImage({ type: 'ratingImage' }, file);
                        e.target.value = '';
                      }
                    }}
                  />
                  <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors shadow-2xs">
                    {uploadingTarget?.type === 'ratingImage'
                      ? 'Đang tải ảnh...'
                      : 'Tải ảnh sao từ máy tính'}
                  </span>
                </label>
              </div>
            </div>
          </Field>
        </div>
      </Card>

      {/* =========================================================================
          CARD 2: XEM TRƯỚC TRỰC TIẾP (LIVE PREVIEW THEO GIAO DIỆN DARK TRANG CHỦ)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-4 bg-white border border-slate-200/90 shadow-xs">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              2. Xem trước trực quan (Live Preview)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Mô phỏng chân thực hiển thị của đánh giá trên nền tối chuẩn của trang chủ
            </p>
          </div>
          <Badge label="Mô phỏng 3D" variant="neutral" className="h-6 px-2.5 text-xs" />
        </div>

        {/* Carousel selector tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {items.map((item, idx) => (
            <button
              key={item.id || idx}
              type="button"
              onClick={() => setPreviewIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                previewIndex === idx
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              #{idx + 1}: {item.name || 'Đối tác'}
            </button>
          ))}
        </div>

        {/* Dark container mimicking the homepage */}
        <div className="relative w-full rounded-2xl bg-[#0A0D0E] text-white p-6 sm:p-10 border border-slate-800 flex flex-col items-center justify-center text-center shadow-inner">
          <div className="w-full flex items-center justify-between mb-6 text-left">
            <div>
              <p className="text-xs font-normal text-[#D4FAE6] mb-1 font-montserrat">
                {subtitle || 'Testimonials'}
              </p>
              <h3 className="text-lg sm:text-xl font-normal text-white font-montserrat">
                {title || 'Voices of Our Sellers'}
              </h3>
            </div>
            <div className="text-xs text-white/50 font-mono flex items-center">
              <span className="text-[#6CE8C3] font-semibold">
                {String(previewIndex + 1).padStart(2, '0')}
              </span>
              <span className="mx-1 text-white/30">/</span>
              <span>{String(items.length).padStart(2, '0')}</span>
            </div>
          </div>

          {activePreviewItem && (
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-sm sm:text-base md:text-lg text-[#f7f7f7] leading-relaxed font-normal">
                &ldquo;{activePreviewItem.quote}&rdquo;
              </p>

              <div className="flex justify-center my-2">
                <img
                  src={ratingImage || '/images/star.png'}
                  alt="Rating stars"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>

              <div className="flex items-center justify-center gap-3.5 flex-wrap">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center p-2.5 shadow-md shrink-0">
                  <img
                    src={activePreviewItem.partnerLogo || '/assets/partners-short/01.svg'}
                    alt="Partner brand logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="h-11 px-4 bg-white rounded-full flex items-center gap-3 shadow-md shrink-0">
                  <img
                    src={activePreviewItem.avatar || '/assets/avatar_marcus.jpg'}
                    alt={activePreviewItem.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0 border border-black/10"
                  />
                  <div className="text-left pr-1">
                    <div className="text-xs sm:text-sm font-bold text-black leading-tight">
                      {activePreviewItem.name || 'Tên đối tác'}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium leading-tight">
                      {activePreviewItem.subtitle || 'Chức vụ đối tác'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* =========================================================================
          CARD 3: DANH SÁCH CHI TIẾT CÁC LỜI ĐÁNH GIÁ (TESTIMONIALS LIST)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white border border-slate-200/90 shadow-xs">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                3. Danh sách đánh giá khách hàng
              </h2>
              <Badge
                label={`${items.length} đánh giá`}
                variant="neutral"
                className="h-6 px-2.5 text-xs font-semibold"
              />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Quản lý, sắp xếp thứ tự và nội dung từng lời trích dẫn hiển thị trong carousel
            </p>
          </div>

          <Button
            label="Thêm đánh giá mới"
            variant="secondary"
            className="px-4 h-9"
            onClick={handleAddItem}
            type="button"
          />
        </div>

        {/* Testimonial items list */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                previewIndex === index
                  ? 'border-slate-800 bg-slate-50/50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Item Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-2.5">
                  <Badge
                    label={`Vị trí #${index + 1}`}
                    variant={previewIndex === index ? 'success' : 'neutral'}
                    className="h-6 px-2.5 text-xs font-semibold"
                  />
                  <span className="text-sm font-bold text-slate-900">
                    {item.name || 'Chưa đặt tên'}
                  </span>
                  {item.subtitle && (
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      • {item.subtitle}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <Button
                    label="Xem mẫu"
                    variant="ghost"
                    className="h-8 px-2.5 text-xs"
                    type="button"
                    onClick={() => setPreviewIndex(index)}
                  />
                  <Button
                    label="Lên"
                    variant="secondary"
                    className="h-8 px-2.5 text-xs"
                    type="button"
                    isDisabled={index === 0}
                    onClick={() => handleMoveItem(index, 'up')}
                  />
                  <Button
                    label="Xuống"
                    variant="secondary"
                    className="h-8 px-2.5 text-xs"
                    type="button"
                    isDisabled={index === items.length - 1}
                    onClick={() => handleMoveItem(index, 'down')}
                  />
                  <Button
                    label="Xóa"
                    variant="destructive"
                    className="h-8 px-2.5 text-xs"
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>

              {/* Item Card Body */}
              <div className="pt-4 space-y-4">
                {/* Trích dẫn (Quote) */}
                <Field
                  label="Nội dung lời chứng thực (Quote) *"
                  inputID={`quote-${index}`}
                  description="Đoạn văn chia sẻ cảm nhận và kết quả đạt được khi hợp tác cùng E-GEAD"
                >
                  <textarea
                    id={`quote-${index}`}
                    rows={3}
                    value={item.quote}
                    onChange={(e) =>
                      handleUpdateItem(index, 'quote', e.target.value)
                    }
                    placeholder="Nhập nội dung trích dẫn đánh giá..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 transition-colors resize-y"
                    required
                  />
                </Field>

                {/* Tên & Chức vụ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Tên người đánh giá *"
                    inputID={`name-${index}`}
                    description="Họ tên hoặc bí danh của đối tác"
                  >
                    <input
                      id={`name-${index}`}
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        handleUpdateItem(index, 'name', e.target.value)
                      }
                      placeholder="Marcus Vance"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 transition-colors"
                      required
                    />
                  </Field>

                  <Field
                    label="Chức danh & Thương hiệu *"
                    inputID={`subtitle-${index}`}
                    description="Ví dụ: Head of Supply Chain, UrbanVibe"
                  >
                    <input
                      id={`subtitle-${index}`}
                      type="text"
                      value={item.subtitle}
                      onChange={(e) =>
                        handleUpdateItem(index, 'subtitle', e.target.value)
                      }
                      placeholder="Head of Supply Chain, UrbanVibe"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 transition-colors"
                      required
                    />
                  </Field>
                </div>

                {/* Ảnh đại diện (Avatar) & Logo thương hiệu (Partner Logo) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Avatar */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <label className="block text-xs font-semibold text-slate-900">
                      Ảnh đại diện tác giả (Avatar)
                    </label>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-300 bg-white shrink-0 flex items-center justify-center">
                        <img
                          src={item.avatar || '/assets/avatar_marcus.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <input
                          type="text"
                          value={item.avatar}
                          onChange={(e) =>
                            handleUpdateItem(index, 'avatar', e.target.value)
                          }
                          placeholder="/assets/avatar_marcus.jpg"
                          className="w-full px-2.5 py-1 text-xs font-mono bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-slate-800"
                        />

                        <label className="cursor-pointer inline-block">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={isUploading}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleUploadImage(
                                  { type: 'avatar', index },
                                  file
                                );
                                e.target.value = '';
                              }
                            }}
                          />
                          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-[11px] font-medium text-slate-700 transition-colors shadow-2xs">
                            {uploadingTarget?.type === 'avatar' &&
                            uploadingTarget?.index === index
                              ? 'Đang tải...'
                              : 'Tải ảnh avatar'}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Partner Logo */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <label className="block text-xs font-semibold text-slate-900">
                      Logo thương hiệu đối tác (Partner Logo)
                    </label>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-300 bg-white shrink-0 flex items-center justify-center p-2 shadow-2xs">
                        <img
                          src={item.partnerLogo || '/assets/partners-short/01.svg'}
                          alt="Logo đối tác"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <input
                          type="text"
                          value={item.partnerLogo}
                          onChange={(e) =>
                            handleUpdateItem(index, 'partnerLogo', e.target.value)
                          }
                          placeholder="/assets/partners-short/01.svg"
                          className="w-full px-2.5 py-1 text-xs font-mono bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-slate-800"
                        />

                        <label className="cursor-pointer inline-block">
                          <input
                            type="file"
                            accept="image/*,.svg"
                            className="hidden"
                            disabled={isUploading}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleUploadImage(
                                  { type: 'partnerLogo', index },
                                  file
                                );
                                e.target.value = '';
                              }
                            }}
                          />
                          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-[11px] font-medium text-slate-700 transition-colors shadow-2xs">
                            {uploadingTarget?.type === 'partnerLogo' &&
                            uploadingTarget?.index === index
                              ? 'Đang tải...'
                              : 'Tải logo đối tác'}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* =========================================================================
          FOOTER ACTIONS
          ========================================================================= */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/80">
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
          isDisabled={isSaving || isUploading}
        />
      </div>
    </form>
  );
}
