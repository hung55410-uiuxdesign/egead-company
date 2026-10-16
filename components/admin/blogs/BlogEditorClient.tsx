'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  AlertCircle,
  UploadCloud,
  Loader2,
} from 'lucide-react';
import { BlogPost, BlogCategory, PostStatus } from '@/types/blog';
import TipTapEditor from '@/components/admin/shared/TipTapEditor';
import { Card, Button, Badge, Selector, IconButton, useToast, TextInput, TextArea } from '@astryxdesign/core';
import { useSaveBlogMutation, useUploadMedia } from '@/lib/hooks';
import AIBlogImportModal from './AIBlogImportModal';
import { ParsedBlogPost } from '@/lib/utils/aiBlogParser';

interface BlogEditorClientProps {
  initialPost?: BlogPost | null;
  categories: BlogCategory[];
}

export default function BlogEditorClient({
  initialPost,
  categories,
}: BlogEditorClientProps) {
  const isEditing = Boolean(initialPost?.id);
  const toast = useToast();
  const saveBlogMutation = useSaveBlogMutation();
  const isSubmitting = saveBlogMutation.isPending;

  // Initialize HTML content from string or legacy array
  const initialContentHtml = initialPost?.content
    ? Array.isArray(initialPost.content)
      ? initialPost.content.map((p) => (p.startsWith('<') ? p : `<p>${p}</p>`)).join('')
      : initialPost.content
    : '';

  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [subtitle, setSubtitle] = useState(initialPost?.subtitle || '');
  const [tag, setTag] = useState(initialPost?.tag || 'Market Expansion');
  const [category, setCategory] = useState(initialPost?.category || 'E-Commerce');
  const [readTime, setReadTime] = useState(initialPost?.readTime || '5 mins read');
  const [heroImage, setHeroImage] = useState(
    initialPost?.heroImage || '/assets/case_brother.jpg'
  );
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [contentHtml, setContentHtml] = useState<string>(initialContentHtml);
  const [authorName, setAuthorName] = useState(
    initialPost?.author?.name || 'E-GEAD Research Team'
  );
  const [authorRole, setAuthorRole] = useState(
    initialPost?.author?.role || 'Global Commerce Strategist'
  );
  const [status, setStatus] = useState<PostStatus>(
    initialPost?.status || 'published'
  );
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const {
    uploadFile: handleHeroFileUpload,
    isUploading: isUploadingHero,
    error: uploadHeroError,
  } = useUploadMedia({
    defaultFolder: 'egead_cms/covers',
    successMessage: 'Tải ảnh bìa lên Cloudinary thành công!',
    onSuccess: (data) => {
      setHeroImage(data.url);
    },
  });

  const generateSlugFromTitle = () => {
    if (!title) return;
    const generated = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    setSlug(generated);
  };

  const handleApplyFromAI = (data: ParsedBlogPost) => {
    if (data.title) setTitle(data.title);
    if (data.slug) setSlug(data.slug);
    if (data.subtitle !== undefined) setSubtitle(data.subtitle);
    if (data.tag) setTag(data.tag);
    if (data.category) setCategory(data.category);
    if (data.readTime) setReadTime(data.readTime);
    if (data.heroImage) setHeroImage(data.heroImage);
    if (data.excerpt) setExcerpt(data.excerpt);
    if (data.contentHtml) setContentHtml(data.contentHtml);
    if (data.authorName) setAuthorName(data.authorName);
    if (data.authorRole) setAuthorRole(data.authorRole);
    if (data.status) setStatus(data.status);
  };

  const handleSubmit = (targetStatus?: PostStatus) => {
    const submitStatus = targetStatus || status;

    if (!title.trim()) {
      toast({
        body: 'Vui lòng nhập tiêu đề bài viết.',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 4000,
      });
      return;
    }

    const finalSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const payload = {
      ...(initialPost?.id ? { id: initialPost.id } : {}),
      title: title.trim(),
      slug: finalSlug,
      subtitle: subtitle.trim(),
      tag: tag.trim(),
      category: category.trim(),
      readTime: readTime.trim(),
      heroImage: heroImage.trim(),
      excerpt: excerpt.trim(),
      content: contentHtml.trim() || `<p>${excerpt.trim() || title.trim()}</p>`,
      author: {
        name: authorName.trim(),
        role: authorRole.trim(),
      },
      status: submitStatus,
    };

    saveBlogMutation.mutate(payload);
  };

  return (
    <div className="space-y-6 font-open-sans w-full pb-16">
      {/* Top navigation & action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <IconButton
            label="Quay lại danh sách bài viết"
            icon={<ArrowLeft className="w-5 h-5 text-gray-700" />}
            href="/admin/blogs"
            className="w-10 h-10"
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {isEditing ? 'Chỉnh sửa bài viết' : 'Soạn thảo bài viết mới'}
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              {isEditing
                ? `Cập nhật lần cuối: ${initialPost?.date}`
                : 'Điền thông tin và soạn thảo nội dung với Rich Editor để xuất bản lên website'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <Button
            label="Nhập từ AI"
            variant="secondary"
            isDisabled={isSubmitting}
            onClick={() => setIsAIModalOpen(true)}
            className="h-10 px-4"
          />
          <Button
            label="Lưu nháp"
            variant="secondary"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={() => handleSubmit('draft')}
            className='h-10 px-4'
          />
          <Button
            label={status === 'published' ? 'Lưu & Xuất bản' : 'Xuất bản ngay'}
            variant="primary"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={() => handleSubmit('published')}
            className='h-10 px-4'
          />
        </div>
      </div>


      {/* Form sections - Standardized Astryx Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Main Editor Fields (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card variant="default" className="rounded-2xl p-6 space-y-5">
            <TextInput
              label="Tiêu đề bài viết"
              isRequired
              value={title}
              onChange={setTitle}
              placeholder="VD: The 2026 Global E-Commerce Playbook..."
              width="100%"
              className='h-10 border'
            />

            {/* Slug input with auto button */}
            <div className='w-full'>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">
                  Đường dẫn tĩnh (Slug)
                </label>
              </div>

              <div className="w-full flex flex-row items-center gap-2">
                <span className="px-3.5 py-2 text-xs text-slate-500 font-mono select-none bg-slate-50 border border-slate-200 rounded-lg">
                  /articles/
                </span>
                <div className="flex-1">
                  <TextInput
                    label="Đường dẫn tĩnh (Slug)"
                    isLabelHidden
                    value={slug}
                    onChange={setSlug}
                    placeholder="expanding-cross-border-ecommerce-playbook"
                    width="100%"
                    className='h-10 border'
                  />
                </div>
                <Button
                  label="Tự động tạo từ tiêu đề"
                  variant="secondary"
                  onClick={generateSlugFromTitle}
                  className='h-10 px-4 w-fit shrink-0'
                />
              </div>
            </div>

            {/* Subtitle */}
            <TextInput
              label="Phụ đề / Thông điệp nổi bật"
              value={subtitle}
              onChange={setSubtitle}
              placeholder="VD: Strategic execution for cross-border retailers targeting Western markets"
              width="100%"
              className='h-10 border'
            />

            {/* Excerpt */}
            <div>
              <TextArea
                label="Tóm tắt ngắn (Excerpt)"
                rows={3}
                value={excerpt}
                onChange={setExcerpt}
                placeholder="Tóm tắt ngắn gọn nội dung bài viết hiển thị ở danh sách bài và SEO meta..."
                width="100%"
                className="border"
              />
            </div>
          </Card>

          {/* TipTap Rich Text WYSIWYG Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">
                Nội dung chi tiết bài viết (Trình soạn thảo Editor) <span className="text-red-500">*</span>
              </label>
              <Badge label="TipTap Rich Text Active" variant="success" className='h-8 px-4' />
            </div>

            <TipTapEditor
              content={contentHtml}
              onChange={(newHtml) => setContentHtml(newHtml)}
              onReadTimeCalculated={(time) => setReadTime(time)}
              postTitle={title}
              placeholder="Soạn thảo bài viết của bạn tại đây... Hỗ trợ in đậm, nghiêng, tiêu đề H1-H4, bảng dữ liệu, danh sách checklist, trích dẫn, liên kết, chèn hình ảnh và nhúng video YouTube."
            />
          </div>
        </div>

        {/* Right Column: Settings, Metadata, Cover Image */}
        <div className="space-y-6">
          {/* Publishing Settings */}
          <Card variant="default" className="rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Trạng thái &amp; Xuất bản</span>
            </h3>

            <div>
              <Selector
                label="Trạng thái bài viết"
                value={status}
                onChange={(val) => setStatus(val as PostStatus)}
                options={[
                  { value: 'published', label: 'Xuất bản công khai (Published)' },
                  { value: 'draft', label: 'Lưu bản nháp (Draft)' },
                ]}
                className='h-10 border'
              />
            </div>

            <div>
              <TextInput
                label="Ước tính thời gian đọc"
                value={readTime}
                onChange={setReadTime}
                placeholder="5 mins read"
                width="100%"
                className='h-10 border'
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Tự động tính theo tốc độ đọc của người xem khi gõ nội dung.
              </p>
            </div>
          </Card>

          {/* Categorization */}
          <Card variant="default" className="rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-3">
              Phân loại &amp; Thẻ
            </h3>

            <div>
              <Selector
                label="Chuyên mục chính"
                className='h-10 border'
                value={category}
                onChange={(val) => setCategory(val)}
                options={
                  categories.length > 0
                    ? categories.map((c) => ({ value: c.name, label: c.name }))
                    : [
                      { value: 'E-Commerce Strategy', label: 'E-Commerce Strategy' },
                      { value: 'Operations', label: 'Operations' },
                      { value: 'Technology', label: 'Technology' },
                      { value: 'Market Expansion', label: 'Market Expansion' },
                    ]
                }
              />
            </div>

            <TextInput
              label="Thẻ hiển thị (Tag badge)"
              value={tag}
              onChange={setTag}
              placeholder="VD: Market Expansion, Technology & WMS..."
              width="100%"
              className='h-10 border'
            />
          </Card>

          {/* Hero Cover Image with Cloudinary Upload */}
          <Card variant="default" className="rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold text-slate-800">
                Hình ảnh tiêu đề (Hero Cover)
              </h3>
              <Badge label="Cloudinary CDN" variant="info" className='h-8 px-4' />
            </div>

            {/* Cloudinary Drag-Drop / Upload Box */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tải ảnh bìa lên Cloudinary
              </label>
              <label className="relative flex flex-col items-center justify-center p-5 border border-dashed border-gray-200 hover:border-gray-800 hover:bg-gray-50/30 rounded-2xl cursor-pointer transition-all bg-slate-50/50 group">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif"
                  disabled={isUploadingHero}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleHeroFileUpload(file);
                  }}
                  className="sr-only"
                />
                {isUploadingHero ? (
                  <div className="flex flex-col items-center gap-2 text-emerald-700 py-1">
                    <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                    <span className="text-xs font-semibold">Đang tải ảnh lên Cloudinary...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-gray-100/70 text-gray-700 group-hover:scale-105 group-hover:bg-gray-100 transition-all">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      Bấm để chọn ảnh từ máy tính
                    </span>
                    <span className="text-xs text-gray-700">
                      JPG, PNG, WebP tối đa 10MB • CDN tối ưu hóa tự động
                    </span>
                  </div>
                )}
              </label>

              {uploadHeroError && (
                <p className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-xl border border-red-200 mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{uploadHeroError}</span>
                </p>
              )}
            </div>

            <TextInput
              label="Đường dẫn hình ảnh (URL)"
              value={heroImage}
              onChange={setHeroImage}
              placeholder="/assets/case_brother.jpg hoặc https://res.cloudinary.com/..."
              width="100%"
              className='h-10 border'
            />

            {/* Image Preview thumbnail */}
            {heroImage && (
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 font-medium">Xem trước ảnh bìa:</span>
                  {heroImage.includes('cloudinary.com') && (
                    <span className="text-emerald-700 font-semibold">
                      Lưu trữ trên Cloudinary CDN
                    </span>
                  )}
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 aspect-video relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroImage}
                    alt="Hero Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Author Details */}
          <Card variant="default" className="rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-3">
              Tác giả bài viết
            </h3>

            <TextInput
              label="Tên tác giả"
              value={authorName}
              onChange={setAuthorName}
              placeholder="E-GEAD Research Team"
              width="100%"
              className='h-10 border'
            />

            <TextInput
              label="Chức danh / Vai trò"
              value={authorRole}
              onChange={setAuthorRole}
              placeholder="Global Commerce Strategist"
              width="100%"
              className='h-10 border'
            />
          </Card>
        </div>
      </div>

      {/* AI Blog Import Modal */}
      <AIBlogImportModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        categories={categories}
        onApplyToEditor={handleApplyFromAI}
      />
    </div>
  );
}
