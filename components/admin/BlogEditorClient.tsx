'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  UploadCloud,
  Loader2,
} from 'lucide-react';
import { BlogPost, BlogCategory, PostStatus } from '@/types/blog';
import TipTapEditor from './TipTapEditor';
import { Card, Button, Badge } from '@astryxdesign/core';

interface BlogEditorClientProps {
  initialPost?: BlogPost | null;
  categories: BlogCategory[];
}

export default function BlogEditorClient({
  initialPost,
  categories,
}: BlogEditorClientProps) {
  const router = useRouter();
  const isEditing = Boolean(initialPost?.id);

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [uploadHeroError, setUploadHeroError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleHeroFileUpload = async (file: File) => {
    try {
      setIsUploadingHero(true);
      setUploadHeroError(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'egead_cms/covers');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setHeroImage(data.url);
      } else {
        setUploadHeroError(data.error || 'Tải ảnh bìa thất bại');
      }
    } catch {
      setUploadHeroError('Lỗi kết nối khi tải ảnh lên Cloudinary');
    } finally {
      setIsUploadingHero(false);
    }
  };

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

  const handleSubmit = async (targetStatus?: PostStatus) => {
    const submitStatus = targetStatus || status;

    if (!title.trim()) {
      setFeedbackMessage({
        type: 'error',
        text: 'Vui lòng nhập tiêu đề bài viết.',
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

    try {
      setIsSubmitting(true);
      setFeedbackMessage(null);

      const url = isEditing
        ? `/api/admin/blogs/${initialPost?.id}`
        : '/api/admin/blogs';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setFeedbackMessage({
          type: 'success',
          text: isEditing
            ? 'Cập nhật bài viết thành công!'
            : 'Đã tạo bài viết mới thành công!',
        });
        setTimeout(() => {
          router.push('/admin/blogs');
          router.refresh();
        }, 1000);
      } else {
        setFeedbackMessage({
          type: 'error',
          text: data.error || 'Có lỗi xảy ra khi lưu bài viết',
        });
      }
    } catch {
      setFeedbackMessage({
        type: 'error',
        text: 'Lỗi kết nối máy chủ, vui lòng thử lại.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-open-sans max-w-5xl mx-auto pb-16">
      {/* Top navigation & action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {isEditing ? 'Chỉnh sửa bài viết' : 'Soạn thảo bài viết mới'}
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              {isEditing
                ? `ID: ${initialPost?.id} — Cập nhật lần cuối: ${initialPost?.date}`
                : 'Điền thông tin và soạn thảo nội dung với Rich Editor để xuất bản lên website'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <Button
            label="Lưu nháp"
            variant="secondary"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={() => handleSubmit('draft')}
          />
          <Button
            label={status === 'published' ? 'Lưu & Xuất bản' : 'Xuất bản ngay'}
            variant="primary"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={() => handleSubmit('published')}
          />
        </div>
      </div>

      {/* Feedback banner */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 border text-sm ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          )}
          <span className="font-medium">{feedbackMessage.text}</span>
        </div>
      )}

      {/* Form sections - Standardized Astryx Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Main Editor Fields (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card variant="default" className="rounded-2xl p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Tiêu đề bài viết <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: The 2026 Global E-Commerce Playbook..."
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold text-base placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition-all"
              />
            </div>

            {/* Slug input with auto button */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">
                  Đường dẫn tĩnh (Slug)
                </label>
                <Button
                  label="Tự động tạo từ tiêu đề"
                  variant="secondary"
                  size="sm"
                  onClick={generateSlugFromTitle}
                />
              </div>
              <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:border-slate-800 focus-within:ring-2 focus-within:ring-slate-800/10 transition-all">
                <span className="px-3.5 text-xs text-slate-500 font-mono select-none bg-slate-50 border-r border-slate-200 py-2.5 font-medium">
                  /articles/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="expanding-cross-border-ecommerce-playbook"
                  className="w-full py-2.5 px-3.5 bg-transparent text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Phụ đề / Thông điệp nổi bật
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="VD: Strategic execution for cross-border retailers targeting Western markets"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition-all"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Tóm tắt ngắn (Excerpt)
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Tóm tắt ngắn gọn nội dung bài viết hiển thị ở danh sách bài và SEO meta..."
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition-all resize-y leading-relaxed"
              />
            </div>
          </Card>

          {/* TipTap Rich Text WYSIWYG Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">
                Nội dung chi tiết bài viết (Trình soạn thảo Editor) <span className="text-red-500">*</span>
              </label>
              <Badge label="TipTap Rich Text Active" variant="success" />
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
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Trạng thái bài viết
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition-all cursor-pointer"
              >
                <option value="published">Xuất bản công khai (Published)</option>
                <option value="draft">Lưu bản nháp (Draft)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Ước tính thời gian đọc
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 mins read"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition-all"
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
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Chuyên mục chính
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition-all cursor-pointer"
              >
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="E-Commerce Strategy">E-Commerce Strategy</option>
                    <option value="Operations">Operations</option>
                    <option value="Technology">Technology</option>
                    <option value="Market Expansion">Market Expansion</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Thẻ hiển thị (Tag badge)
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="VD: Market Expansion, Technology & WMS..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition-all"
              />
            </div>
          </Card>

          {/* Hero Cover Image with Cloudinary Upload */}
          <Card variant="default" className="rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold text-slate-800">
                Hình ảnh tiêu đề (Hero Cover)
              </h3>
              <Badge label="Cloudinary CDN" variant="info" />
            </div>

            {/* Cloudinary Drag-Drop / Upload Box */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tải ảnh bìa lên Cloudinary
              </label>
              <label className="relative flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 rounded-2xl cursor-pointer transition-all bg-slate-50/50 group">
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
                    <div className="p-2.5 rounded-xl bg-emerald-100/70 text-emerald-700 group-hover:scale-105 group-hover:bg-emerald-100 transition-all">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">
                      Bấm để chọn ảnh từ máy tính
                    </span>
                    <span className="text-[11px] text-slate-400">
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

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Đường dẫn hình ảnh (URL)
              </label>
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="/assets/case_brother.jpg hoặc https://res.cloudinary.com/..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition-all"
              />
            </div>

            {/* Quick preset selector */}
            <div className="space-y-2">
              <span className="text-[11px] text-slate-500 font-semibold block">
                Hoặc chọn ảnh mẫu có sẵn:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Brother Case', path: '/assets/case_brother.jpg' },
                  { name: 'Suntory Case', path: '/assets/case_suntory.jpg' },
                  { name: 'Weir Case', path: '/assets/case_weir.jpg' },
                  { name: 'Manulife Case', path: '/assets/case_manulife.jpg' },
                ].map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => setHeroImage(item.path)}
                    className={`p-2.5 rounded-xl border text-left transition-all text-xs font-medium cursor-pointer ${
                      heroImage === item.path
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate block">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Preview thumbnail */}
            {heroImage && (
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">Xem trước ảnh bìa:</span>
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

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tên tác giả
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="E-GEAD Research Team"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Chức danh / Vai trò
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="Global Commerce Strategist"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition-all"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
