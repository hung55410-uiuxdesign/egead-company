'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Trash2,
  AlertCircle,
  X,
  FileText,
  ArrowUpRight,
} from 'lucide-react';
import { BlogPost, BlogCategory } from '@/types/blog';
import { Button, Badge, Card, EmptyState } from '@astryxdesign/core';

interface BlogListClientProps {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogListClient({
  initialPosts,
  categories,
}: BlogListClientProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.slug.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || post.status === statusFilter;

    const matchesCategory =
      categoryFilter === 'all' ||
      post.tag === categoryFilter ||
      post.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xoá bài viết: "${title}"?`)) {
      return;
    }

    try {
      setIsDeleting(id);
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        router.refresh();
      } else {
        alert(data.error || 'Có lỗi xảy ra khi xoá bài viết');
      }
    } catch {
      alert('Không thể kết nối đến máy chủ');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-6 font-open-sans max-w-7xl mx-auto pb-12">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Quản lý bài viết blog
            </h1>
            <Badge label={`${posts.length} bài`} variant="neutral" />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Toàn bộ danh sách các bài viết phân tích, cẩm nang chiến lược E-commerce và tin tức
          </p>
        </div>

        <Button
          label="Thêm bài viết mới"
          variant="primary"
          href="/admin/blogs/new"
        />
      </div>

      {/* =========================================================================
          FILTERS & SEARCH BAR (Astryx Card)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo tiêu đề bài viết, tóm tắt, slug..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200/50"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors font-medium"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="published">Đã xuất bản (Published)</option>
              <option value="draft">Bản nháp (Draft)</option>
            </select>
          </div>

          {/* Category filter */}
          <div className="md:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors font-medium"
            >
              <option value="all">Tất cả chuyên mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick status filter pills */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100 text-xs flex-wrap">
          <span className="text-slate-400 font-semibold text-xs">
            Lọc nhanh:
          </span>
          <Button
            label={`Tất cả (${posts.length})`}
            variant={statusFilter === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setStatusFilter('all')}
          />
          <Button
            label={`Đã xuất bản (${posts.filter((p) => p.status === 'published').length})`}
            variant={statusFilter === 'published' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setStatusFilter('published')}
          />
          <Button
            label={`Bản nháp (${posts.filter((p) => p.status === 'draft').length})`}
            variant={statusFilter === 'draft' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setStatusFilter('draft')}
          />
        </div>
      </Card>

      {/* =========================================================================
          POSTS TABLE (Astryx Card & EmptyState)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl overflow-hidden p-0">
        {filteredPosts.length === 0 ? (
          <div className="py-12 px-4">
            <EmptyState
              icon={<AlertCircle className="w-8 h-8 text-slate-400" />}
              title="Không tìm thấy bài viết nào"
              description="Không có bài viết nào khớp với từ khoá hoặc bộ lọc bạn chọn. Thử thay đổi bộ lọc hoặc thêm bài mới."
              actions={
                <Button
                  label="Tạo bài viết mới"
                  variant="primary"
                  href="/admin/blogs/new"
                />
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/70 text-xs font-bold text-slate-500">
                  <th className="py-3.5 px-4 sm:px-6">Bài viết</th>
                  <th className="py-3.5 px-4">Chuyên mục</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4">Lượt xem</th>
                  <th className="py-3.5 px-4">Ngày tạo</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Title, Thumbnail & Slug */}
                    <td className="py-4 px-4 sm:px-6 max-w-md">
                      <div className="flex items-start gap-3">
                        {post.heroImage ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0 hidden sm:block">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={post.heroImage}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 hidden sm:block">
                            <FileText className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/admin/blogs/${post.id}`}
                            className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 text-sm"
                          >
                            {post.title}
                          </Link>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {post.excerpt || 'Chưa có tóm tắt...'}
                          </p>
                          <span className="text-[11px] text-slate-400 font-mono block mt-0.5 truncate">
                            /articles/{post.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <Badge
                        label={post.tag || post.category || 'General'}
                        variant="purple"
                      />
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <Badge
                        label={post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                        variant={post.status === 'published' ? 'success' : 'warning'}
                      />
                    </td>

                    {/* Views */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                      <span>{(post.views || 0).toLocaleString()} lượt</span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500 font-medium">
                      <span>{post.date}</span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/articles/${post.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors"
                          title="Xem trên trang website live"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                        <Button
                          label="Sửa"
                          variant="secondary"
                          size="sm"
                          href={`/admin/blogs/${post.id}`}
                        />
                        <Button
                          label="Xoá"
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          icon={<Trash2 className="w-3.5 h-3.5 text-red-500" />}
                          isDisabled={isDeleting === post.id}
                          onClick={() => handleDelete(post.id, post.title)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
