'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Send,
  Image as ImageIcon,
  Sparkles,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { BlogPost, BlogCategory, PostStatus } from '@/types/blog';
import { Card } from '@astryxdesign/core/Card';
import { Button } from '@astryxdesign/core/Button';

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
  const [contentParagraphs, setContentParagraphs] = useState<string[]>(
    initialPost?.content && initialPost.content.length > 0
      ? initialPost.content
      : ['']
  );
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
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

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

  const handleParagraphChange = (index: number, value: string) => {
    const updated = [...contentParagraphs];
    updated[index] = value;
    setContentParagraphs(updated);
  };

  const addParagraph = () => {
    setContentParagraphs([...contentParagraphs, '']);
  };

  const removeParagraph = (index: number) => {
    if (contentParagraphs.length === 1) {
      setContentParagraphs(['']);
      return;
    }
    const updated = contentParagraphs.filter((_, i) => i !== index);
    setContentParagraphs(updated);
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
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const validParagraphs = contentParagraphs
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

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
      content: validParagraphs.length > 0 ? validParagraphs : [excerpt.trim() || title.trim()],
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
    <div className="space-y-6 font-montserrat max-w-5xl mx-auto pb-16">
      {/* Top navigation & action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {isEditing ? 'Chỉnh sửa bài viết' : 'Soạn thảo bài viết mới'}
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              {isEditing
                ? `ID: ${initialPost?.id} — Cập nhật lần cuối: ${initialPost?.date}`
                : 'Điền thông tin và nội dung bài viết để xuất bản lên website'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            label="Lưu nháp"
            variant="secondary"
            size="md"
            icon={<Save className="w-3.5 h-3.5" />}
            isDisabled={isSubmitting}
            onClick={() => handleSubmit('draft')}
          />
          <Button
            label={status === 'published' ? 'Lưu & Xuất bản' : 'Xuất bản ngay'}
            variant="primary"
            size="md"
            icon={<Send className="w-3.5 h-3.5" />}
            isDisabled={isSubmitting}
            onClick={() => handleSubmit('published')}
          />
        </div>
      </div>

      {/* Feedback banner */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 border text-sm shadow-xs ${
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
          <Card variant="default" padding={5} className="space-y-5 bg-white border border-slate-200/90 shadow-xs rounded-xl">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Tiêu đề bài viết <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: The 2026 Global E-Commerce Playbook..."
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 font-semibold text-base placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
              />
            </div>

            {/* Slug input with auto button */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Đường dẫn tĩnh (Slug)
                </label>
                <button
                  type="button"
                  onClick={generateSlugFromTitle}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-700 hover:text-slate-900 font-semibold bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-slate-600" />
                  <span>Tự động tạo từ tiêu đề</span>
                </button>
              </div>
              <div className="flex items-center bg-white border border-slate-300 rounded-lg overflow-hidden focus-within:border-slate-800 focus-within:ring-1 focus-within:ring-slate-800 transition-colors">
                <span className="px-3 text-xs text-slate-500 font-mono select-none bg-slate-50 border-r border-slate-200 py-2.5">
                  /articles/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="expanding-cross-border-ecommerce-playbook"
                  className="w-full py-2.5 px-3 bg-transparent text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Phụ đề / Thông điệp nổi bật
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="VD: Strategic execution for cross-border retailers targeting Western markets"
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Tóm tắt ngắn (Excerpt)
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Tóm tắt ngắn gọn nội dung bài viết hiển thị ở danh sách bài và SEO meta..."
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors resize-y leading-relaxed"
              />
            </div>
          </Card>

          {/* Content Paragraphs Editor */}
          <Card variant="default" padding={5} className="space-y-4 bg-white border border-slate-200/90 shadow-xs rounded-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Nội dung chi tiết bài viết
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Từng đoạn văn bản hoặc phân đoạn nội dung
                </p>
              </div>
              <Button
                label="Thêm đoạn văn"
                variant="secondary"
                size="sm"
                icon={<Plus className="w-3.5 h-3.5" />}
                onClick={addParagraph}
              />
            </div>

            <div className="space-y-3">
              {contentParagraphs.map((paragraph, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-lg bg-slate-50/80 border border-slate-200 relative group space-y-2 focus-within:border-slate-400 focus-within:bg-white transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-bold text-slate-700">
                      Đoạn {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeParagraph(index)}
                      className="p-1 text-slate-400 hover:text-red-600 transition-colors rounded hover:bg-red-50"
                      title="Xoá đoạn này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={paragraph}
                    onChange={(e) => handleParagraphChange(index, e.target.value)}
                    placeholder={`Nội dung đoạn văn số ${index + 1}...`}
                    className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none resize-y leading-relaxed"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addParagraph}
              className="w-full py-2.5 border border-dashed border-slate-300 hover:border-slate-500 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm đoạn văn tiếp theo</span>
            </button>
          </Card>
        </div>

        {/* Right Column: Settings, Metadata, Cover Image */}
        <div className="space-y-6">
          {/* Publishing Settings */}
          <Card variant="default" padding={5} className="space-y-4 bg-white border border-slate-200/90 shadow-xs rounded-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3">
              Trạng thái &amp; Xuất bản
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Trạng thái bài viết
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
              >
                <option value="published">Xuất bản công khai (Published)</option>
                <option value="draft">Lưu bản nháp (Draft)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Chuyên mục / Thẻ chính (Tag)
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="VD: Market Expansion, Operations & SLA"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Thời gian đọc ước tính
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="VD: 5 mins read"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
              />
            </div>
          </Card>

          {/* Cover Image */}
          <Card variant="default" padding={5} className="space-y-4 bg-white border border-slate-200/90 shadow-xs rounded-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Ảnh bài viết (Hero Image)</span>
              <ImageIcon className="w-3.5 h-3.5 text-slate-600" />
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Đường dẫn ảnh (URL hoặc asset)
              </label>
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="/assets/case_brother.jpg"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
              />
            </div>

            {/* Quick asset selector */}
            <div>
              <span className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                Ảnh mẫu có sẵn trong hệ thống:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { name: 'Brother', path: '/assets/case_brother.jpg' },
                  { name: 'Suntory', path: '/assets/case_suntory.jpg' },
                  { name: 'Weir', path: '/assets/case_weir.jpg' },
                  { name: 'Manulife', path: '/assets/case_manulife.jpg' },
                ].map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => setHeroImage(item.path)}
                    className={`px-2.5 py-2 text-center rounded-lg border transition-all font-medium text-xs ${
                      heroImage === item.path
                        ? 'border-slate-900 bg-slate-900 text-white font-semibold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview image */}
            {heroImage && (
              <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-100 aspect-video relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroImage}
                  alt="Hero Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/600x400/f8fafc/0f172a?text=E-GEAD+Cover';
                  }}
                />
              </div>
            )}
          </Card>

          {/* Author Details */}
          <Card variant="default" padding={5} className="space-y-4 bg-white border border-slate-200/90 shadow-xs rounded-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3">
              Thông tin tác giả
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tên tác giả / Đơn vị
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="E-GEAD Research Team"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Chức vụ / Chuyên môn
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="Global Commerce Strategist"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
