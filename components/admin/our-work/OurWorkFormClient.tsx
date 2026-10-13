'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Plus, Trash2, ExternalLink } from 'lucide-react';
import { Button, Card, Badge, Field, Selector } from '@astryxdesign/core';
import type { CaseStudyDetailModel } from '@/lib/services/casestudy.service';
import { useUploadMedia, useCaseStudyMutations } from '@/lib/hooks';

interface TaskItem {
  taskTitle: string;
  description: string;
}

interface OurWorkFormClientProps {
  mode: 'create' | 'edit';
  initialData?: CaseStudyDetailModel | null;
}

const COMMON_SERVICES = [
  'Technology',
  'Operations',
  'Marketing',
  'Creative',
  'Strategy',
  'Experience',
];

const COMMON_INDUSTRIES = [
  'Fashion & Lifestyle',
  'Consumer Goods',
  'Health & Wellness',
  'Engineering & Manufacturing',
  'Marketplace & Ecommerce',
  'Fintech & Finance',
  'Education & Training',
  'Corporate & B2B',
];

export default function OurWorkFormClient({
  mode,
  initialData,
}: OurWorkFormClientProps) {
  const router = useRouter();

  // Basic Information & Card on /our-work
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [customer, setCustomer] = useState(initialData?.customer || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [highlight, setHighlight] = useState(initialData?.highlight || '');
  const [order, setOrder] = useState<number>(initialData?.order ?? 0);
  const [status, setStatus] = useState<string>(initialData?.status || 'published');
  const [services, setServices] = useState<string[]>(initialData?.services || ['Technology']);
  const [industries, setIndustries] = useState<string[]>(initialData?.industries || ['Corporate & B2B']);
  const [tags, setTags] = useState<string[]>(initialData?.tags || ['UI/UX', 'Web']);
  const [tagInput, setTagInput] = useState('');

  // Hero Banner Section
  const [bannerImage, setBannerImage] = useState(initialData?.bannerImage || '');
  const [bannerVideo, setBannerVideo] = useState(initialData?.bannerVideo || '');

  // Section 1: Overview
  const [overviewSubtitle, setOverviewSubtitle] = useState(
    initialData?.overviewSubtitle || 'OVERVIEW'
  );
  const [overviewTitle, setOverviewTitle] = useState(
    initialData?.overviewTitle || ''
  );
  const [overviewDescription, setOverviewDescription] = useState(
    initialData?.overviewDescription || ''
  );
  const [overviewImage, setOverviewImage] = useState(
    initialData?.overviewImage || ''
  );

  // Section 2: Challenge & Solution
  const [challengeTitle, setChallengeTitle] = useState(
    initialData?.challengeTitle || 'The Challenge'
  );
  const [challengeContent, setChallengeContent] = useState(
    initialData?.challengeContent || ''
  );
  const [solutionTitle, setSolutionTitle] = useState(
    initialData?.solutionTitle || 'The Solution'
  );
  const [solutionContent, setSolutionContent] = useState(
    initialData?.solutionContent || ''
  );

  // Section 3: Task & Implementation
  const [taskSubtitle, setTaskSubtitle] = useState(
    initialData?.taskSubtitle || 'TASK'
  );
  const [taskTitle, setTaskTitle] = useState(
    initialData?.taskTitle || 'Tasks of The Project'
  );
  const [taskImages, setTaskImages] = useState<string[]>(
    initialData?.taskImages || []
  );
  const [taskImageInput, setTaskImageInput] = useState('');
  const [taskItems, setTaskItems] = useState<TaskItem[]>(
    Array.isArray(initialData?.taskItems) && initialData.taskItems.length > 0
      ? initialData.taskItems
      : [
          {
            taskTitle: '01. Research & Analysis',
            description:
              'Phân tích hiện trạng, khảo sát hành vi người dùng và xác định các điểm nghẽn chính.',
          },
          {
            taskTitle: '02. System Architecture & UI/UX',
            description:
              'Xây dựng kiến trúc hệ thống hiện đại, tối ưu luồng trải nghiệm khách hàng và thiết kế wireframes.',
          },
        ]
  );

  // Section 4: Next Case Study
  const [nextStudySlug, setNextStudySlug] = useState(
    initialData?.nextStudySlug || ''
  );
  const [nextStudyTitle, setNextStudyTitle] = useState(
    initialData?.nextStudyTitle || ''
  );
  const [nextStudyCustomer, setNextStudyCustomer] = useState(
    initialData?.nextStudyCustomer || ''
  );

  // TanStack Query Mutation Hook
  const { saveCaseStudyAsync, isSaving } = useCaseStudyMutations();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Cloudinary Upload for Main Thumbnail
  const { uploadFile: uploadMainImage, isUploading: isUploadingMain } =
    useUploadMedia({
      defaultFolder: 'egead_cms/casestudies',
      successMessage: 'Tải ảnh đại diện thành công!',
      onSuccess: (data) => setImage(data.url),
    });

  // Cloudinary Upload for Banner
  const { uploadFile: uploadBannerFile, isUploading: isUploadingBanner } =
    useUploadMedia({
      defaultFolder: 'egead_cms/casestudies',
      successMessage: 'Tải ảnh banner thành công!',
      onSuccess: (data) => setBannerImage(data.url),
    });

  // Cloudinary Upload for Overview Image
  const { uploadFile: uploadOverviewFile, isUploading: isUploadingOverview } =
    useUploadMedia({
      defaultFolder: 'egead_cms/casestudies',
      successMessage: 'Tải ảnh tổng quan thành công!',
      onSuccess: (data) => setOverviewImage(data.url),
    });

  // Cloudinary Upload for Task Images
  const { uploadFile: uploadTaskFile, isUploading: isUploadingTaskImg } =
    useUploadMedia({
      defaultFolder: 'egead_cms/casestudies',
      successMessage: 'Tải ảnh nhiệm vụ thành công!',
      onSuccess: (data) => setTaskImages((prev) => [...prev, data.url]),
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

  // Toggle Services
  const handleToggleService = (srv: string) => {
    setServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  // Toggle Industries
  const handleToggleIndustry = (ind: string) => {
    setIndustries((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]
    );
  };

  // Tag Handlers
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const cleanTag = tagInput.trim();
    if (!tags.includes(cleanTag)) {
      setTags((prev) => [...prev, cleanTag]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  // Task Items Handlers
  const handleAddTaskItem = () => {
    setTaskItems((prev) => [
      ...prev,
      {
        taskTitle: `0${prev.length + 1}. Hạng mục mới`,
        description: 'Mô tả chi tiết công việc và kết quả đạt được...',
      },
    ]);
  };

  const handleUpdateTaskItem = (
    index: number,
    field: keyof TaskItem,
    value: string
  ) => {
    setTaskItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleRemoveTaskItem = (index: number) => {
    setTaskItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Task Images Handlers
  const handleAddTaskImageUrl = () => {
    if (!taskImageInput.trim()) return;
    setTaskImages((prev) => [...prev, taskImageInput.trim()]);
    setTaskImageInput('');
  };

  const handleRemoveTaskImage = (index: number) => {
    setTaskImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Form Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tiêu đề dự án');
      return;
    }
    if (!customer.trim()) {
      setErrorMessage('Vui lòng nhập tên khách hàng / đối tác');
      return;
    }
    if (!slug.trim()) {
      setErrorMessage('Vui lòng nhập đường dẫn slug');
      return;
    }

    try {
      await saveCaseStudyAsync({
        id: mode === 'edit' ? initialData?.id : undefined,
        title: title.trim(),
        slug: slug.trim(),
        customer: customer.trim(),
        description: description.trim(),
        image: image.trim(),
        highlight: highlight.trim() || null,
        order: Number(order) || 0,
        status,
        services,
        industries,
        tags,

        // Detail Sections
        bannerImage: bannerImage.trim() || null,
        bannerVideo: bannerVideo.trim() || null,
        overviewSubtitle: overviewSubtitle.trim() || null,
        overviewTitle: overviewTitle.trim() || null,
        overviewDescription: overviewDescription.trim() || null,
        overviewImage: overviewImage.trim() || null,
        challengeTitle: challengeTitle.trim() || null,
        challengeContent: challengeContent.trim() || null,
        solutionTitle: solutionTitle.trim() || null,
        solutionContent: solutionContent.trim() || null,
        taskSubtitle: taskSubtitle.trim() || null,
        taskTitle: taskTitle.trim() || null,
        taskImages,
        taskItems,
        nextStudySlug: nextStudySlug.trim() || null,
        nextStudyTitle: nextStudyTitle.trim() || null,
        nextStudyCustomer: nextStudyCustomer.trim() || null,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi lưu dữ liệu dự án');
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
              href="/admin/our-work"
            />
            {mode === 'edit' && initialData?.slug && (
              <Button
                label="Xem trang công khai"
                variant="secondary"
                className="px-4 h-10"
                href={`/case-studies/${initialData.slug}`}
                target="_blank"
              />
            )}
            <Badge
              label={status === 'published' ? 'Đang hiển thị' : 'Bản nháp'}
              variant={status === 'published' ? 'success' : 'warning'}
              className="h-8 px-4"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            {mode === 'create'
              ? 'Thêm dự án Case Study mới'
              : `Chỉnh sửa dự án: ${initialData?.title}`}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Quản lý trực tiếp theo từng section độc lập, không dùng trình soạn thảo tự do
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            label="Hủy bỏ"
            variant="ghost"
            className="px-4 h-10"
            href="/admin/our-work"
          />
          <Button
            label={
              isSaving
                ? 'Đang lưu dự án...'
                : mode === 'create'
                ? 'Xuất bản dự án mới'
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
          CARD 1: THÔNG TIN CƠ BẢN & CARD HIỂN THỊ (OUR WORK PAGE)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            1. Thông tin cơ bản &amp; Thẻ hiển thị trên Our Work
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dữ liệu này được hiển thị trên trang danh sách /our-work và là thông tin định danh của case study
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <Field
            label="Tiêu đề dự án"
            inputID="casestudy-title"
            isRequired
            description="Tên chiến dịch hoặc dự án triển khai"
          >
            <input
              id="casestudy-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Homecraft Studio E-commerce Transformation"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
              required
            />
          </Field>

          {/* Customer */}
          <Field
            label="Khách hàng / Đối tác"
            inputID="casestudy-customer"
            isRequired
            description="Thương hiệu hoặc doanh nghiệp triển khai"
          >
            <input
              id="casestudy-customer"
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="Ví dụ: Homecraft Studio, Nike, Toyota..."
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
              required
            />
          </Field>

          {/* Slug */}
          <div className="md:col-span-2">
            <Field
              label="Đường dẫn tĩnh (Slug)"
              inputID="casestudy-slug"
              isRequired
              description="Đường dẫn URL chi tiết (VD: /case-studies/homecraft-studio)"
            >
              <div className="flex gap-2">
                <input
                  id="casestudy-slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="homecraft-studio"
                  className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
                  required
                />
                <Button
                  type="button"
                  label="Tạo tự động từ tiêu đề"
                  variant="secondary"
                  className="px-4 h-10 shrink-0"
                  onClick={handleGenerateSlug}
                />
              </div>
            </Field>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <Field
              label="Mô tả tóm tắt"
              inputID="casestudy-desc"
              description="Đoạn văn ngắn giới thiệu về kết quả và phạm vi dự án (hiển thị trên thẻ card)"
            >
              <textarea
                id="casestudy-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả tóm tắt dự án..."
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors resize-y"
              />
            </Field>
          </div>

          {/* Highlight Badge */}
          <Field
            label="Điểm nhấn kết quả (Highlight)"
            inputID="casestudy-highlight"
            description="Chỉ số tăng trưởng hoặc kết quả then chốt (hiển thị badge nổi bật)"
          >
            <input
              id="casestudy-highlight"
              type="text"
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              placeholder="Ví dụ: +180% Revenue, 50K+ Monthly Users..."
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
            />
          </Field>

          {/* Order */}
          <Field
            label="Thứ tự hiển thị"
            inputID="casestudy-order"
            description="Số thứ tự ưu tiên (số nhỏ hơn đứng trước)"
          >
            <input
              id="casestudy-order"
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
            />
          </Field>

          {/* Status */}
          <div className="md:col-span-2">
            <Selector
              label="Trạng thái hiển thị"
              description="Kiểm soát khả năng hiển thị ngoài trang Our Work"
              value={status}
              className="h-10 border"
              onChange={(val) => setStatus(val)}
              options={[
                { value: 'published', label: 'Đang hiển thị (Published)' },
                { value: 'draft', label: 'Bản nháp (Draft)' },
              ]}
            />
          </div>

          {/* Card Image */}
          <div className="md:col-span-2 space-y-2">
            <Field
              label="Ảnh thẻ đại diện (Thumbnail)"
              inputID="casestudy-image"
              isRequired
              description="Ảnh đại diện hiển thị trên trang danh sách /our-work"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="casestudy-image"
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://... hoặc tải ảnh lên"
                  className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
                  required
                />
                <label className="cursor-pointer shrink-0">
                  <span className="inline-flex items-center justify-center px-4 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 transition-colors">
                    {isUploadingMain ? 'Đang tải lên...' : 'Tải ảnh từ máy tính'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploadingMain}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadMainImage(file);
                    }}
                  />
                </label>
              </div>
            </Field>

            {image && (
              <div className="relative w-40 h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <img
                  src={image}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Services & Industries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-slate-100">
          {/* Services */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Dịch vụ triển khai (Services)
            </label>
            <p className="text-[11px] text-slate-400 mb-2.5">
              Chọn một hoặc nhiều dịch vụ áp dụng trong dự án
            </p>
            <div className="flex flex-wrap gap-2">
              {COMMON_SERVICES.map((srv) => {
                const isSelected = services.includes(srv);
                return (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => handleToggleService(srv)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {srv}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Industries */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Ngành nghề (Industries)
            </label>
            <p className="text-[11px] text-slate-400 mb-2.5">
              Lĩnh vực hoạt động của khách hàng
            </p>
            <div className="flex flex-wrap gap-2">
              {COMMON_INDUSTRIES.map((ind) => {
                const isSelected = industries.includes(ind);
                return (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => handleToggleIndustry(ind)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {ind}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="pt-3 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Nhãn tag bổ sung (Tags)
          </label>
          <div className="flex flex-wrap gap-2 mb-2.5">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-700"
              >
                <span>{t}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(t)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="Thêm nhãn tag mới (VD: Next.js, Mobile App)..."
              className="w-full px-3.5 py-2 bg-slate-50/60 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
            />
            <Button
              type="button"
              label="Thêm nhãn"
              variant="secondary"
              className="px-3 h-9 shrink-0"
              onClick={handleAddTag}
            />
          </div>
        </div>
      </Card>

      {/* =========================================================================
          CARD 2: HERO BANNER (CASE STUDY DETAIL PAGE)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            2. Hero Banner (Đầu trang chi tiết dự án)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ảnh banner hoặc video hiển thị toàn màn hình tại đầu trang case study
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Field
              label="Ảnh Hero Banner"
              inputID="casestudy-banner"
              description="Ảnh banner kích thước lớn (khuyến nghị 1920x1080px hoặc 16:9)"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="casestudy-banner"
                  type="text"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  placeholder="https://... hoặc tải ảnh lên"
                  className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
                />
                <label className="cursor-pointer shrink-0">
                  <span className="inline-flex items-center justify-center px-4 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 transition-colors">
                    {isUploadingBanner ? 'Đang tải lên...' : 'Tải banner lên'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploadingBanner}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadBannerFile(file);
                    }}
                  />
                </label>
              </div>
            </Field>

            {bannerImage && (
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <img
                  src={bannerImage}
                  alt="Banner Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <Field
              label="Link Video Banner (Tùy chọn)"
              inputID="casestudy-banner-video"
              description="Đường dẫn video MP4 hoặc Youtube nhúng (nếu có video minh họa sản phẩm)"
            >
              <input
                id="casestudy-banner-video"
                type="text"
                value={bannerVideo}
                onChange={(e) => setBannerVideo(e.target.value)}
                placeholder="https://... (mp4 hoặc video stream)"
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
              />
            </Field>
          </div>
        </div>
      </Card>

      {/* =========================================================================
          CARD 3: SECTION 1 - TỔNG QUAN DỰ ÁN (OVERVIEW)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            3. Section Tổng quan dự án (Overview Section)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Phần giới thiệu câu chuyện, bối cảnh khởi đầu và ảnh minh họa toàn cảnh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Phụ đề Section (Subtitle)"
            inputID="overview-subtitle"
            description="Nhãn danh mục nhỏ phía trên tiêu đề"
          >
            <input
              id="overview-subtitle"
              type="text"
              value={overviewSubtitle}
              onChange={(e) => setOverviewSubtitle(e.target.value)}
              placeholder="OVERVIEW"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
            />
          </Field>

          <Field
            label="Tiêu đề chính Section (Title)"
            inputID="overview-title"
            description="Tiêu đề làm nổi bật thông điệp phần tổng quan"
          >
            <input
              id="overview-title"
              type="text"
              value={overviewTitle}
              onChange={(e) => setOverviewTitle(e.target.value)}
              placeholder="Ví dụ: Modernizing Interior Craftsmanship for the Digital Era"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
            />
          </Field>

          <div className="md:col-span-2">
            <Field
              label="Nội dung tổng quan (Description)"
              inputID="overview-desc"
              description="Đoạn văn chi tiết giới thiệu về dự án và tầm nhìn"
            >
              <textarea
                id="overview-desc"
                rows={4}
                value={overviewDescription}
                onChange={(e) => setOverviewDescription(e.target.value)}
                placeholder="Nhập nội dung tổng quan dự án..."
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors resize-y"
              />
            </Field>
          </div>

          <div className="md:col-span-2 space-y-2">
            <Field
              label="Ảnh minh họa Overview (Tùy chọn)"
              inputID="overview-image"
              description="Ảnh thiết kế hoặc mockup giới thiệu tổng quan"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="overview-image"
                  type="text"
                  value={overviewImage}
                  onChange={(e) => setOverviewImage(e.target.value)}
                  placeholder="https://... hoặc tải ảnh lên"
                  className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
                />
                <label className="cursor-pointer shrink-0">
                  <span className="inline-flex items-center justify-center px-4 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 transition-colors">
                    {isUploadingOverview ? 'Đang tải lên...' : 'Tải ảnh lên'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploadingOverview}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadOverviewFile(file);
                    }}
                  />
                </label>
              </div>
            </Field>

            {overviewImage && (
              <div className="relative w-48 h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <img
                  src={overviewImage}
                  alt="Overview Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* =========================================================================
          CARD 4: SECTION 2 - THÁCH THỨC & GIẢI PHÁP (CHALLENGE & SOLUTION)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            4. Section Thách thức &amp; Giải pháp (Challenge &amp; Solution)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Trình bày đối xứng bài toán khó khăn gặp phải và giải pháp công nghệ E-GEAD đưa ra
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Challenge Box */}
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-rose-700">
              Khối Thách thức (The Challenge)
            </div>
            <Field
              label="Tiêu đề thách thức"
              inputID="challenge-title"
              description="Tiêu đề cho khối khó khăn / bài toán"
            >
              <input
                id="challenge-title"
                type="text"
                value={challengeTitle}
                onChange={(e) => setChallengeTitle(e.target.value)}
                placeholder="The Challenge"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 transition-colors"
              />
            </Field>

            <Field
              label="Nội dung bài toán &amp; thách thức"
              inputID="challenge-content"
              description="Mô tả các vấn đề nghẽn, hiệu suất kém hoặc trải nghiệm chưa tốt"
            >
              <textarea
                id="challenge-content"
                rows={6}
                value={challengeContent}
                onChange={(e) => setChallengeContent(e.target.value)}
                placeholder="Trình bày những khó khăn khách hàng đối mặt..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 transition-colors resize-y"
              />
            </Field>
          </div>

          {/* Solution Box */}
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-emerald-700">
              Khối Giải pháp (The Solution)
            </div>
            <Field
              label="Tiêu đề giải pháp"
              inputID="solution-title"
              description="Tiêu đề cho khối giải pháp"
            >
              <input
                id="solution-title"
                type="text"
                value={solutionTitle}
                onChange={(e) => setSolutionTitle(e.target.value)}
                placeholder="The Solution"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 transition-colors"
              />
            </Field>

            <Field
              label="Nội dung giải pháp &amp; công nghệ áp dụng"
              inputID="solution-content"
              description="Mô tả kiến trúc, công nghệ và cách tiếp cận đột phá của E-GEAD"
            >
              <textarea
                id="solution-content"
                rows={6}
                value={solutionContent}
                onChange={(e) => setSolutionContent(e.target.value)}
                placeholder="Trình bày phương án giải quyết và kết quả đạt được..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 transition-colors resize-y"
              />
            </Field>
          </div>
        </div>
      </Card>

      {/* =========================================================================
          CARD 5: SECTION 3 - NHIỆM VỤ & TRIỂN KHAI THỰC TẾ (TASK SECTION)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            5. Section Nhiệm vụ &amp; Triển khai thực tế (Task &amp; Implementation)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Danh sách các hạng mục công việc cụ thể đã triển khai kèm hình ảnh minh họa thực tế
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Phụ đề Section (Subtitle)"
            inputID="task-subtitle"
            description="Nhãn danh mục nhỏ"
          >
            <input
              id="task-subtitle"
              type="text"
              value={taskSubtitle}
              onChange={(e) => setTaskSubtitle(e.target.value)}
              placeholder="TASK"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
            />
          </Field>

          <Field
            label="Tiêu đề chính Section (Title)"
            inputID="task-title"
            description="Tiêu đề phần nhiệm vụ"
          >
            <input
              id="task-title"
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Tasks of The Project"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
            />
          </Field>
        </div>

        {/* Task Images List */}
        <div className="pt-2 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-bold text-slate-700">
                Ảnh minh họa kết quả triển khai (Task Images)
              </label>
              <p className="text-[11px] text-slate-400">
                Hiển thị trong gallery hoặc bố cục ảnh của section Tasks
              </p>
            </div>
            <label className="cursor-pointer">
              <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors">
                {isUploadingTaskImg ? 'Đang tải ảnh...' : 'Tải thêm ảnh'}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isUploadingTaskImg}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadTaskFile(file);
                }}
              />
            </label>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={taskImageInput}
              onChange={(e) => setTaskImageInput(e.target.value)}
              placeholder="Nhập đường dẫn URL ảnh và nhấn Thêm..."
              className="w-full px-3.5 py-2 bg-slate-50/60 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
            />
            <Button
              type="button"
              label="Thêm URL ảnh"
              variant="secondary"
              className="px-3 h-9 shrink-0"
              onClick={handleAddTaskImageUrl}
            />
          </div>

          {taskImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {taskImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100"
                >
                  <img
                    src={imgUrl}
                    alt={`Task visual ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTaskImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/70 text-white hover:bg-rose-600 transition-colors opacity-90"
                    title="Xóa ảnh này"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Task Items Dynamic List */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-bold text-slate-700">
                Các hạng mục công việc chi tiết (Task Items)
              </label>
              <p className="text-[11px] text-slate-400">
                Thêm từng mục công việc với tiêu đề số thứ tự và mô tả chi tiết
              </p>
            </div>
            <Button
              type="button"
              label="Thêm hạng mục công việc"
              variant="secondary"
              className="px-3 h-9"
              onClick={handleAddTaskItem}
            />
          </div>

          <div className="space-y-3">
            {taskItems.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    Hạng mục #{index + 1}
                  </span>
                  {taskItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTaskItem(index)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Xóa hạng mục này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-1">
                    <input
                      type="text"
                      value={item.taskTitle}
                      onChange={(e) =>
                        handleUpdateTaskItem(index, 'taskTitle', e.target.value)
                      }
                      placeholder="01. Tiêu đề công việc"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) =>
                        handleUpdateTaskItem(
                          index,
                          'description',
                          e.target.value
                        )
                      }
                      placeholder="Mô tả công việc và giải pháp đạt được..."
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
          CARD 6: SECTION 4 - ĐỀ XUẤT DỰ ÁN KẾ TIẾP (NEXT CASE STUDY)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            6. Dự án kế tiếp (Next Case Study Recommendation)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dự án được đề xuất hiển thị ở cuối bài để người xem tiếp tục khám phá
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field
            label="Slug dự án kế tiếp"
            inputID="next-slug"
            description="Slug của dự án sẽ chuyển đến"
          >
            <input
              id="next-slug"
              type="text"
              value={nextStudySlug}
              onChange={(e) => setNextStudySlug(e.target.value)}
              placeholder="Ví dụ: eco-clean-revolution"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
            />
          </Field>

          <Field
            label="Tiêu đề dự án kế tiếp"
            inputID="next-title"
            description="Tên dự án hiển thị"
          >
            <input
              id="next-title"
              type="text"
              value={nextStudyTitle}
              onChange={(e) => setNextStudyTitle(e.target.value)}
              placeholder="Ví dụ: EcoClean Green Mobility"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
            />
          </Field>

          <Field
            label="Khách hàng dự án kế tiếp"
            inputID="next-customer"
            description="Tên thương hiệu khách hàng"
          >
            <input
              id="next-customer"
              type="text"
              value={nextStudyCustomer}
              onChange={(e) => setNextStudyCustomer(e.target.value)}
              placeholder="Ví dụ: EcoClean Global"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
            />
          </Field>
        </div>
      </Card>

      {/* =========================================================================
          BOTTOM ACTION BAR
          ========================================================================= */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <Button
          label="Quay lại danh sách dự án"
          variant="secondary"
          className="px-4 h-10"
          href="/admin/our-work"
        />

        <div className="flex items-center gap-3">
          <Button
            label="Hủy bỏ"
            variant="ghost"
            className="px-4 h-10"
            href="/admin/our-work"
          />
          <Button
            label={
              isSaving
                ? 'Đang lưu dự án...'
                : mode === 'create'
                ? 'Xuất bản dự án mới'
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
