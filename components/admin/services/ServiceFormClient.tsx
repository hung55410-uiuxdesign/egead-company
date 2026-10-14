'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { X, Trash2 } from 'lucide-react';
import { Button, Card, Badge, Field, Selector } from '@astryxdesign/core';
import type {
  ServiceItemDetailModel,
  ServicePrinciple,
} from '@/lib/services/service-item.service';
import { useUploadMedia, useServiceMutations } from '@/lib/hooks';

interface ServiceFormClientProps {
  mode: 'create' | 'edit';
  initialData?: ServiceItemDetailModel | null;
}

export default function ServiceFormClient({
  mode,
  initialData,
}: ServiceFormClientProps) {
  const router = useRouter();

  // Basic Information
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState<string>(
    initialData?.category || 'service'
  );
  const [order, setOrder] = useState<number>(initialData?.order ?? 0);
  const [status, setStatus] = useState<string>(
    initialData?.status || 'published'
  );

  // Hero Section
  const [tagline, setTagline] = useState(initialData?.tagline || '');
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || '');
  const [heroImage, setHeroImage] = useState(initialData?.heroImage || '');

  // Overview Section
  const [overviewSubTitle, setOverviewSubTitle] = useState(
    initialData?.overviewSubTitle || ''
  );
  const [overviewHeading, setOverviewHeading] = useState(
    initialData?.overviewHeading || ''
  );
  const [overviewParagraphs, setOverviewParagraphs] = useState<string[]>(
    initialData?.overviewParagraphs && initialData.overviewParagraphs.length > 0
      ? initialData.overviewParagraphs
      : [
          'Chuyển đổi số đang định hình lại toàn bộ chuỗi giá trị, tạo ra những cơ hội đột phá về năng suất và trải nghiệm khách hàng.',
          'Chúng tôi kết hợp kiến trúc công nghệ doanh nghiệp vững chắc với năng lực thực thi nhanh chóng để mang lại giá trị thương mại bền vững.',
        ]
  );

  // Visual Banner Section
  const [middleImage, setMiddleImage] = useState(
    initialData?.middleImage || ''
  );

  // Approach & Principles Section
  const [approachHeading, setApproachHeading] = useState(
    initialData?.approachHeading || 'Our approach'
  );
  const [approachIntro, setApproachIntro] = useState(
    initialData?.approachIntro ||
      'Phương pháp tiếp cận của chúng tôi tập trung vào các nguyên tắc nền tảng sau:'
  );
  const [principles, setPrinciples] = useState<ServicePrinciple[]>(
    Array.isArray(initialData?.principles) && initialData.principles.length > 0
      ? initialData.principles
      : [
          {
            title: 'Giải pháp may đo theo bài toán cốt lõi',
            description:
              'Thiết kế kiến trúc riêng biệt giải quyết trúng các điểm nghẽn vận hành và kinh doanh của doanh nghiệp.',
          },
          {
            title: 'Quyết định dựa trên dữ liệu thời gian thực',
            description:
              'Hệ thống telemetry đồng bộ chỉ số bán hàng, tồn kho và biên lợi nhuận ròng để ra quyết định chính xác.',
          },
        ]
  );

  // TanStack Query Mutations
  const { saveServiceAsync, isSaving } = useServiceMutations();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Cloudinary Upload for Hero Image
  const { uploadFile: uploadHeroFile, isUploading: isUploadingHero } =
    useUploadMedia({
      defaultFolder: 'egead_cms/services',
      successMessage: 'Tải ảnh hero thành công!',
      onSuccess: (data) => setHeroImage(data.url),
    });

  // Cloudinary Upload for Middle Visual Banner
  const { uploadFile: uploadMiddleFile, isUploading: isUploadingMiddle } =
    useUploadMedia({
      defaultFolder: 'egead_cms/services',
      successMessage: 'Tải ảnh banner thành công!',
      onSuccess: (data) => setMiddleImage(data.url),
    });

  // Generate slug helper
  const handleGenerateSlug = () => {
    if (!title.trim()) return;
    const generated = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setSlug(generated);
  };

  // Overview Paragraphs Handlers
  const handleAddParagraph = () => {
    setOverviewParagraphs((prev) => [
      ...prev,
      'Nội dung đoạn văn mới giải thích chi tiết về giải pháp...',
    ]);
  };

  const handleUpdateParagraph = (index: number, text: string) => {
    setOverviewParagraphs((prev) => {
      const next = [...prev];
      next[index] = text;
      return next;
    });
  };

  const handleRemoveParagraph = (index: number) => {
    setOverviewParagraphs((prev) => prev.filter((_, i) => i !== index));
  };

  // Principles Handlers
  const handleAddPrinciple = () => {
    setPrinciples((prev) => [
      ...prev,
      {
        title: 'Nguyên tắc / Năng lực mới',
        description: 'Mô tả chi tiết cách tiếp cận và giá trị mang lại...',
      },
    ]);
  };

  const handleUpdatePrinciple = (
    index: number,
    field: keyof ServicePrinciple,
    value: string
  ) => {
    setPrinciples((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleRemovePrinciple = (index: number) => {
    setPrinciples((prev) => prev.filter((_, i) => i !== index));
  };

  // Form Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tên dịch vụ / ngành nghề');
      return;
    }
    if (!slug.trim()) {
      setErrorMessage('Vui lòng nhập đường dẫn slug');
      return;
    }

    try {
      await saveServiceAsync({
        id: mode === 'edit' ? initialData?.id : undefined,
        title: title.trim(),
        slug: slug.trim(),
        category,
        order: Number(order) || 0,
        status,
        tagline: tagline.trim(),
        subtitle: subtitle.trim(),
        heroImage: heroImage.trim() || null,
        middleImage: middleImage.trim() || null,
        overviewSubTitle: overviewSubTitle.trim() || null,
        overviewHeading: overviewHeading.trim() || null,
        overviewParagraphs: overviewParagraphs.filter((p) => p.trim() !== ''),
        approachHeading: approachHeading.trim() || null,
        approachIntro: approachIntro.trim() || null,
        principles,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi lưu dữ liệu dịch vụ');
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
              label="Quay lại danh sách"
              variant="secondary"
              className="px-4 h-10"
              href="/admin/services"
            />
            {mode === 'edit' && initialData?.slug && (
              <Button
                label="Xem trang công khai"
                variant="secondary"
                className="px-4 h-10"
                href={`/services/all-services/${initialData.slug}`}
                target="_blank"
              />
            )}
            <Badge
              label={
                category === 'service' ? 'Dịch vụ trụ cột' : 'Ngành nghề'
              }
              variant={category === 'service' ? 'purple' : 'blue'}
              className="h-8 px-4"
            />
            <Badge
              label={status === 'published' ? 'Đang hiển thị' : 'Bản nháp'}
              variant={status === 'published' ? 'success' : 'warning'}
              className="h-8 px-4"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            {mode === 'create'
              ? 'Thêm dịch vụ / ngành nghề mới'
              : `Chỉnh sửa: ${initialData?.title}`}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Quản lý trực tiếp theo từng section chuyên biệt, không sử dụng trình soạn thảo tự do
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            label="Hủy bỏ"
            variant="ghost"
            className="px-4 h-10"
            href="/admin/services"
          />
          <Button
            label={
              isSaving
                ? 'Đang lưu dữ liệu...'
                : mode === 'create'
                ? 'Xuất bản dịch vụ mới'
                : 'Lưu thay đổi các section'
            }
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
          CARD 1: THÔNG TIN ĐỊNH DANH & PHÂN LOẠI
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            1. Định danh &amp; Phân loại hiển thị trên menu điều hướng
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Thông tin phân loại xác định mục này xuất hiện tại cột Our Services hay cột Industries trên thanh menu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <Field
            label="Tên dịch vụ / ngành nghề"
            inputID="service-title"
            isRequired
            description="Tên hiển thị trên menu và tiêu đề lớn của trang"
          >
            <input
              id="service-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Strategy & Design, Automotive..."
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
              required
            />
          </Field>

          {/* Category */}
          <div>
            <Selector
              label="Phân loại danh mục"
              description="Thuộc trụ cột dịch vụ (Our Services) hoặc ngành nghề (Industries)"
              value={category}
              className="h-10 border"
              onChange={(val) => setCategory(val)}
              options={[
                { value: 'service', label: 'Trụ cột Dịch vụ (Our Services)' },
                { value: 'industry', label: 'Ngành nghề chuyên sâu (Industries)' },
              ]}
            />
          </div>

          {/* Slug */}
          <div className="md:col-span-2">
            <Field
              label="Đường dẫn tĩnh (Slug)"
              inputID="service-slug"
              isRequired
              description="URL hiển thị (VD: /services/all-services/strategy-design)"
            >
              <div className="flex gap-2">
                <input
                  id="service-slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="strategy-design"
                  className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
                  required
                />
                <Button
                  type="button"
                  label="Tạo tự động từ tên"
                  variant="secondary"
                  className="px-4 h-10 shrink-0"
                  onClick={handleGenerateSlug}
                />
              </div>
            </Field>
          </div>

          {/* Order */}
          <Field
            label="Thứ tự hiển thị"
            inputID="service-order"
            description="Số thứ tự ưu tiên hiển thị trên menu và danh sách (số nhỏ hơn đứng trước)"
          >
            <input
              id="service-order"
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
            />
          </Field>

          {/* Status */}
          <div>
            <Selector
              label="Trạng thái hiển thị"
              description="Kiểm soát khả năng xuất bản ngoài trang web"
              value={status}
              className="h-10 border"
              onChange={(val) => setStatus(val)}
              options={[
                { value: 'published', label: 'Đang hiển thị (Published)' },
                { value: 'draft', label: 'Bản nháp (Draft)' },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* =========================================================================
          CARD 2: HERO SECTION (ĐẦU TRANG CHI TIẾT)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            2. Hero Section (Phần mở đầu trang chi tiết)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Khẩu hiệu định vị, đoạn tóm tắt mở đầu và ảnh nền Hero kích thước lớn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tagline */}
          <div className="md:col-span-2">
            <Field
              label="Khẩu hiệu định vị (Tagline)"
              inputID="service-tagline"
              description="Khẩu hiệu ngắn gọn xuất hiện ngay dưới tên dịch vụ"
            >
              <input
                id="service-tagline"
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Ví dụ: Enterprise Commerce Architecture & User Experience"
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
              />
            </Field>
          </div>

          {/* Subtitle */}
          <div className="md:col-span-2">
            <Field
              label="Đoạn văn mở đầu (Subtitle)"
              inputID="service-subtitle"
              description="Tuyên ngôn giá trị hoặc lời dẫn giải thích sứ mệnh của dịch vụ"
            >
              <textarea
                id="service-subtitle"
                rows={3}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ví dụ: Turn market opportunities into actionable commerce strategies and compelling experiences..."
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors resize-y"
              />
            </Field>
          </div>

          {/* Hero Image */}
          <div className="md:col-span-2 space-y-2">
            <Field
              label="Ảnh Hero Section"
              inputID="service-hero-image"
              description="Ảnh nền toàn cảnh mở đầu trang chi tiết"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="service-hero-image"
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder="https://... hoặc tải ảnh lên"
                  className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
                />
                <label className="cursor-pointer shrink-0">
                  <span className="inline-flex items-center justify-center px-4 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 transition-colors">
                    {isUploadingHero ? 'Đang tải lên...' : 'Tải ảnh lên'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploadingHero}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadHeroFile(file);
                    }}
                  />
                </label>
              </div>
            </Field>

            {heroImage && (
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <img
                  src={heroImage}
                  alt="Hero Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* =========================================================================
          CARD 3: OVERVIEW SECTION (TỔNG QUAN & BỐI CẢNH)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            3. Overview Section (Tổng quan &amp; Bối cảnh giải pháp)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tiêu đề lớn và các đoạn văn giải thích cách tiếp cận toàn diện của E-GEAD
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Field
              label="Phụ đề nhỏ Overview"
              inputID="overview-subtitle"
              description="Lời mở đầu ngắn phía trên tiêu đề chính"
            >
              <input
                id="overview-subtitle"
                type="text"
                value={overviewSubTitle}
                onChange={(e) => setOverviewSubTitle(e.target.value)}
                placeholder="Ví dụ: Great commerce starts with great strategy..."
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field
              label="Tiêu đề chính Overview Heading"
              inputID="overview-heading"
              description="Tiêu đề làm nổi bật thông điệp chính của khối tổng quan"
            >
              <input
                id="overview-heading"
                type="text"
                value={overviewHeading}
                onChange={(e) => setOverviewHeading(e.target.value)}
                placeholder="Ví dụ: Turn Market Opportunities into Actionable Commerce Strategies."
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
              />
            </Field>
          </div>
        </div>

        {/* Dynamic Paragraphs List */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-bold text-slate-700">
                Các đoạn văn chi tiết (Overview Paragraphs)
              </label>
              <p className="text-[11px] text-slate-400">
                Thêm một hoặc nhiều đoạn văn diễn giải chi tiết cho người đọc
              </p>
            </div>
            <Button
              type="button"
              label="Thêm đoạn văn"
              variant="secondary"
              className="px-3 h-9"
              onClick={handleAddParagraph}
            />
          </div>

          <div className="space-y-3">
            {overviewParagraphs.map((paragraph, index) => (
              <div
                key={index}
                className="p-3.5 bg-slate-50/80 border border-slate-200 rounded-xl space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">
                    Đoạn #{index + 1}
                  </span>
                  {overviewParagraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveParagraph(index)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Xóa đoạn này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={paragraph}
                  onChange={(e) => handleUpdateParagraph(index, e.target.value)}
                  placeholder="Nhập nội dung đoạn văn..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-800 resize-y"
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* =========================================================================
          CARD 4: VISUAL BANNER (ẢNH GIỮA TRANG)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            4. Visual Banner (Ảnh minh họa giữa trang)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ảnh banner toàn khổ tạo điểm nhấn thị giác ngăn cách giữa các khối nội dung
          </p>
        </div>

        <div className="space-y-2">
          <Field
            label="Ảnh Visual Banner"
            inputID="service-middle-image"
            description="Ảnh chất lượng cao (khuyến nghị tỷ lệ 16:9 hoặc ảnh ngang)"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="service-middle-image"
                type="text"
                value={middleImage}
                onChange={(e) => setMiddleImage(e.target.value)}
                placeholder="https://... hoặc tải ảnh lên"
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
              />
              <label className="cursor-pointer shrink-0">
                <span className="inline-flex items-center justify-center px-4 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 transition-colors">
                  {isUploadingMiddle ? 'Đang tải lên...' : 'Tải banner lên'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={isUploadingMiddle}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadMiddleFile(file);
                  }}
                />
              </label>
            </div>
          </Field>

          {middleImage && (
            <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <img
                src={middleImage}
                alt="Banner Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </Card>

      {/* =========================================================================
          CARD 5: APPROACH & PRINCIPLES (PHƯƠNG PHÁP & NĂNG LỰC CỐT LÕI)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            5. Approach &amp; Principles (Phương pháp tiếp cận &amp; Năng lực cốt lõi)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Danh sách các nguyên tắc hoặc dịch vụ thành phần cụ thể được triển khai
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Tiêu đề phần tiếp cận (Heading)"
            inputID="approach-heading"
            description="Mặc định: Our approach"
          >
            <input
              id="approach-heading"
              type="text"
              value={approachHeading}
              onChange={(e) => setApproachHeading(e.target.value)}
              placeholder="Our approach"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
            />
          </Field>

          <Field
            label="Lời dẫn mở đầu (Intro)"
            inputID="approach-intro"
            description="Đoạn văn ngắn dẫn dắt vào danh sách các năng lực"
          >
            <input
              id="approach-intro"
              type="text"
              value={approachIntro}
              onChange={(e) => setApproachIntro(e.target.value)}
              placeholder="We combine rigorous commercial modeling with world-class design..."
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
            />
          </Field>
        </div>

        {/* Dynamic Principles List */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-bold text-slate-700">
                Danh sách năng lực &amp; nguyên tắc cốt lõi (Principles)
              </label>
              <p className="text-[11px] text-slate-400">
                Thêm các thẻ dịch vụ thành phần kèm mô tả phương thức giải quyết
              </p>
            </div>
            <Button
              type="button"
              label="Thêm năng lực cốt lõi"
              variant="secondary"
              className="px-3 h-9"
              onClick={handleAddPrinciple}
            />
          </div>

          <div className="space-y-3">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    Nguyên tắc #{index + 1}
                  </span>
                  {principles.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePrinciple(index)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Xóa mục này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-1">
                    <input
                      type="text"
                      value={principle.title}
                      onChange={(e) =>
                        handleUpdatePrinciple(index, 'title', e.target.value)
                      }
                      placeholder="Tên năng lực / nguyên tắc"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <textarea
                      rows={2}
                      value={principle.description}
                      onChange={(e) =>
                        handleUpdatePrinciple(
                          index,
                          'description',
                          e.target.value
                        )
                      }
                      placeholder="Mô tả phương thức giải quyết và cam kết đầu ra..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-800 resize-y"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* =========================================================================
          BOTTOM ACTION BAR
          ========================================================================= */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <Button
          label="Quay lại danh sách"
          variant="secondary"
          className="px-4 h-10"
          href="/admin/services"
        />

        <div className="flex items-center gap-3">
          <Button
            label="Hủy bỏ"
            variant="ghost"
            className="px-4 h-10"
            href="/admin/services"
          />
          <Button
            label={
              isSaving
                ? 'Đang lưu dữ liệu...'
                : mode === 'create'
                ? 'Xuất bản dịch vụ mới'
                : 'Lưu thay đổi các section'
            }
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
