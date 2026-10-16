'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Plus, Trash2, ExternalLink } from 'lucide-react';
import { Button, Card, Badge, Field, Selector, TextInput, TextArea } from '@astryxdesign/core';
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

  // Cloudinary Upload for Banner Video
  const { uploadFile: uploadBannerVideoFile, isUploading: isUploadingBannerVideo } =
    useUploadMedia({
      defaultFolder: 'egead_cms/casestudies/videos',
      successMessage: 'Tải video banner thành công!',
      onSuccess: (data) => setBannerVideo(data.url),
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
          <TextInput
            label="Tiêu đề dự án"
            isRequired
            description="Tên chiến dịch hoặc dự án triển khai"
            value={title}
            onChange={setTitle}
            placeholder="Ví dụ: Homecraft Studio E-commerce Transformation"
            width="100%"
            className='h-10 border'
          />

          {/* Customer */}
          <TextInput
            label="Khách hàng / Đối tác"
            isRequired
            description="Thương hiệu hoặc doanh nghiệp triển khai"
            value={customer}
            onChange={setCustomer}
            placeholder="Ví dụ: Homecraft Studio, Nike, Toyota..."
            width="100%"
            className='h-10 border'
          />

          {/* Slug */}
          <div className="md:col-span-2">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <TextInput
                  label="Đường dẫn tĩnh (Slug)"
                  isRequired
                  description="Đường dẫn URL chi tiết (VD: /case-studies/homecraft-studio)"
                  value={slug}
                  onChange={setSlug}
                  placeholder="homecraft-studio"
                  width="100%"
                  className='h-10 border'
                />
              </div>
              <Button
                type="button"
                label="Tạo tự động từ tiêu đề"
                variant="secondary"
                className="px-4 h-10 shrink-0 mb-1"
                onClick={handleGenerateSlug}
              />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <TextArea
              label="Mô tả tóm tắt"
              description="Đoạn văn ngắn giới thiệu về kết quả và phạm vi dự án (hiển thị trên thẻ card)"
              rows={3}
              value={description}
              onChange={setDescription}
              placeholder="Nhập mô tả tóm tắt dự án..."
              width="100%"
              className="border"
            />
          </div>

          {/* Highlight Badge */}
          <TextInput
            label="Điểm nhấn kết quả (Highlight)"
            description="Chỉ số tăng trưởng hoặc kết quả then chốt (hiển thị badge nổi bật)"
            value={highlight}
            onChange={setHighlight}
            placeholder="Ví dụ: +180% Revenue, 50K+ Monthly Users..."
            width="100%"
            className='h-10 border'
          />

          {/* Order */}
          <TextInput
            label="Thứ tự hiển thị"
            description="Số thứ tự ưu tiên (số nhỏ hơn đứng trước)"
            value={String(order)}
            onChange={(val) => setOrder(parseInt(val, 10) || 0)}
            placeholder="0"
            width="100%"
            className='h-10 border'
          />

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
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <TextInput
                  label="Ảnh thẻ đại diện (Thumbnail)"
                  isRequired
                  description="Ảnh đại diện hiển thị trên trang danh sách /our-work"
                  value={image}
                  onChange={setImage}
                  placeholder="https://... hoặc tải ảnh lên"
                  width="100%"
                  className='h-10 border'
                />
              </div>
              <label className="cursor-pointer shrink-0 mb-1">
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${isSelected
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${isSelected
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
          <div className="flex items-center gap-2 max-w-md">
            <div className="flex-1">
              <TextInput
                label="Thêm nhãn tag mới"
                isLabelHidden
                value={tagInput}
                onChange={setTagInput}
                onEnter={handleAddTag}
                placeholder="Thêm nhãn tag mới (VD: Next.js, Mobile App)..."
                width="100%"
                className='h-10 border'
              />
            </div>
            <Button
              type="button"
              label="Thêm nhãn"
              variant="secondary"
              className="px-3 h-10 shrink-0"
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
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <TextInput
                  label="Ảnh Hero Banner"
                  description="Ảnh banner kích thước lớn (khuyến nghị 1920x1080px hoặc 16:9)"
                  value={bannerImage}
                  onChange={setBannerImage}
                  placeholder="https://... hoặc tải ảnh lên"
                  width="100%"
                  className='h-10 border'
                />
              </div>
              <label className="cursor-pointer shrink-0 mb-1">
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

          <div className="md:col-span-2 space-y-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
              <div className="flex-1">
                <TextInput
                  label="Link Video Banner (Tùy chọn)"
                  description="Đường dẫn video MP4 hoặc Youtube nhúng (tải tệp video từ máy tính hoặc dán link)"
                  value={bannerVideo}
                  onChange={setBannerVideo}
                  placeholder="https://... (mp4, webm hoặc link youtube)"
                  width="100%"
                  className="h-10 border"
                />
              </div>
              <label className="cursor-pointer shrink-0 mb-1">
                <span className="inline-flex items-center justify-center px-4 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 transition-colors">
                  {isUploadingBannerVideo ? 'Đang tải video...' : 'Tải video từ máy tính'}
                </span>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  className="hidden"
                  disabled={isUploadingBannerVideo}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadBannerVideoFile(file);
                  }}
                />
              </label>
            </div>

            {bannerVideo && (
              <div className="relative w-full max-w-xl rounded-xl overflow-hidden border border-slate-200 bg-slate-950 p-2 space-y-2">
                <div className="flex items-center justify-between px-2 pt-1">
                  <span className="text-xs font-medium text-slate-300">
                    Xem trước video banner
                  </span>
                  <button
                    type="button"
                    onClick={() => setBannerVideo('')}
                    className="text-xs text-rose-400 hover:text-rose-300 underline"
                  >
                    Xóa video
                  </button>
                </div>
                {bannerVideo.includes('youtube.com') || bannerVideo.includes('youtu.be') ? (
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <iframe
                      src={
                        bannerVideo.includes('watch?v=')
                          ? bannerVideo.replace('watch?v=', 'embed/')
                          : bannerVideo.replace('youtu.be/', 'www.youtube.com/embed/')
                      }
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <video
                    src={bannerVideo}
                    controls
                    className="w-full max-h-56 rounded-lg object-contain bg-black"
                  />
                )}
              </div>
            )}
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
          <TextInput
            label="Phụ đề Section (Subtitle)"
            description="Nhãn danh mục nhỏ phía trên tiêu đề"
            value={overviewSubtitle}
            onChange={setOverviewSubtitle}
            placeholder="OVERVIEW"
            width="100%"
            className='h-10 border'
          />

          <TextInput
            label="Tiêu đề chính Section (Title)"
            description="Tiêu đề làm nổi bật thông điệp phần tổng quan"
            value={overviewTitle}
            onChange={setOverviewTitle}
            placeholder="Ví dụ: Modernizing Interior Craftsmanship for the Digital Era"
            width="100%"
            className='h-10 border'
          />

          <div className="md:col-span-2">
            <TextArea
              label="Nội dung tổng quan (Description)"
              description="Đoạn văn chi tiết giới thiệu về dự án và tầm nhìn"
              rows={4}
              value={overviewDescription}
              onChange={setOverviewDescription}
              placeholder="Nhập nội dung tổng quan dự án..."
              width="100%"
              className="border"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <TextInput
                  label="Ảnh minh họa Overview (Tùy chọn)"
                  description="Ảnh thiết kế hoặc mockup giới thiệu tổng quan"
                  value={overviewImage}
                  onChange={setOverviewImage}
                  placeholder="https://... hoặc tải ảnh lên"
                  width="100%"
                  className='h-10 border'
                />
              </div>
              <label className="cursor-pointer shrink-0 mb-1">
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
            <TextInput
              label="Tiêu đề thách thức"
              description="Tiêu đề cho khối khó khăn / bài toán"
              value={challengeTitle}
              onChange={setChallengeTitle}
              placeholder="The Challenge"
              width="100%"
              className='h-10 border'
            />

            <TextArea
              label="Nội dung bài toán & thách thức"
              description="Mô tả các vấn đề nghẽn, hiệu suất kém hoặc trải nghiệm chưa tốt"
              rows={6}
              value={challengeContent}
              onChange={setChallengeContent}
              placeholder="Trình bày những khó khăn khách hàng đối mặt..."
              width="100%"
              className="border"
            />
          </div>

          {/* Solution Box */}
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-emerald-700">
              Khối Giải pháp (The Solution)
            </div>
            <TextInput
              label="Tiêu đề giải pháp"
              description="Tiêu đề cho khối giải pháp"
              value={solutionTitle}
              onChange={setSolutionTitle}
              placeholder="The Solution"
              width="100%"
              className='h-10 border'
            />

            <TextArea
              label="Nội dung giải pháp & công nghệ áp dụng"
              description="Mô tả kiến trúc, công nghệ và cách tiếp cận đột phá của E-GEAD"
              rows={6}
              value={solutionContent}
              onChange={setSolutionContent}
              placeholder="Trình bày phương án giải quyết và kết quả đạt được..."
              width="100%"
              className="border"
            />
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
          <TextInput
            label="Phụ đề Section (Subtitle)"
            description="Nhãn danh mục nhỏ"
            value={taskSubtitle}
            onChange={setTaskSubtitle}
            placeholder="TASK"
            width="100%"
            className='h-10 border'
          />

          <TextInput
            label="Tiêu đề chính Section (Title)"
            description="Tiêu đề phần nhiệm vụ"
            value={taskTitle}
            onChange={setTaskTitle}
            placeholder="Tasks of The Project"
            width="100%"
            className='h-10 border'
          />
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

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <TextInput
                label="Thêm URL ảnh nhiệm vụ"
                isLabelHidden
                value={taskImageInput}
                onChange={setTaskImageInput}
                onEnter={handleAddTaskImageUrl}
                placeholder="Nhập đường dẫn URL ảnh và nhấn Thêm..."
                width="100%"
                className='h-10 border'
              />
            </div>
            <Button
              type="button"
              label="Thêm URL ảnh"
              variant="secondary"
              className="px-3 h-10 shrink-0"
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
                    <TextInput
                      label="Tiêu đề công việc"
                      isLabelHidden
                      value={item.taskTitle}
                      onChange={(val) =>
                        handleUpdateTaskItem(index, 'taskTitle', val)
                      }
                      placeholder="01. Tiêu đề công việc"
                      width="100%"
                      className='h-10 border'
                    />
                  </div>
                  <div className="md:col-span-2">
                    <TextArea
                      label="Mô tả công việc"
                      isLabelHidden
                      rows={2}
                      value={item.description}
                      onChange={(val) =>
                        handleUpdateTaskItem(index, 'description', val)
                      }
                      placeholder="Mô tả công việc và giải pháp đạt được..."
                      width="100%"
                      className="border"
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
          <TextInput
            label="Slug dự án kế tiếp"
            description="Slug của dự án sẽ chuyển đến"
            value={nextStudySlug}
            onChange={setNextStudySlug}
            placeholder="Ví dụ: eco-clean-revolution"
            width="100%"
            className='h-10 border'
          />

          <TextInput
            label="Tiêu đề dự án kế tiếp"
            description="Tên dự án hiển thị"
            value={nextStudyTitle}
            onChange={setNextStudyTitle}
            placeholder="Ví dụ: EcoClean Green Mobility"
            width="100%"
            className='h-10 border'
          />

          <TextInput
            label="Khách hàng dự án kế tiếp"
            description="Tên thương hiệu khách hàng"
            value={nextStudyCustomer}
            onChange={setNextStudyCustomer}
            placeholder="Ví dụ: EcoClean Global"
            width="100%"
            className='h-10 border'
          />
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
