'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  Calendar,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { BlogPost, BlogCategory } from '@/types/blog';
import { Card } from '@astryxdesign/core/Card';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';

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
    <div className="space-y-6 font-montserrat max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản lý bài viết blog
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Danh sách tất cả các bài viết, cẩm nang và báo cáo phân tích ({posts.length} bài)
          </p>
        </div>

        <Button
          label="Thêm bài viết mới"
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4 stroke-[2.5]" />}
          href="/admin/blogs/new"
        />
      </div>

      {/* Filters and Search Bar - Astryx Card */}
      <Card variant="default" padding={4} className="space-y-4 bg-white border border-slate-200/90 rounded-xl shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo tiêu đề, từ khoá, slug..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
            />
          </div>

          {/* Status filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors font-medium"
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
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors font-medium"
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

        {/* Quick status tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-semibold">Lọc nhanh:</span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded-md transition-colors ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Tất cả ({posts.length})
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-3 py-1 rounded-md transition-colors ${
              statusFilter === 'published'
                ? 'bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Đã xuất bản ({posts.filter((p) => p.status === 'published').length})
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={`px-3 py-1 rounded-md transition-colors ${
              statusFilter === 'draft'
                ? 'bg-amber-100 text-amber-800 font-semibold border border-amber-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Bản nháp ({posts.filter((p) => p.status === 'draft').length})
          </button>
        </div>
      </Card>

      {/* Posts Table - Astryx Card Container */}
      <Card variant="default" padding={0} className="overflow-hidden bg-white border border-slate-200/90 rounded-xl shadow-xs">
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center px-4">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">
              Không tìm thấy bài viết nào
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
              Không có bài viết nào khớp với từ khoá hoặc bộ lọc bạn chọn. Thử thay đổi bộ lọc hoặc thêm bài mới.
            </p>
            <div className="mt-5">
              <Button
                label="Tạo bài viết mới"
                variant="primary"
                size="sm"
                icon={<Plus className="w-3.5 h-3.5" />}
                href="/admin/blogs/new"
              />
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <th className="py-3.5 px-4 sm:px-6">Tiêu đề bài viết</th>
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
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Title & Excerpt */}
                    <td className="py-4 px-4 sm:px-6 max-w-md">
                      <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        <Link href={`/admin/blogs/${post.id}`}>
                          {post.title}
                        </Link>
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {post.excerpt}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-1">
                        /{post.slug}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <Badge variant="purple" label={post.tag || 'General'} />
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <Badge
                        variant={post.status === 'published' ? 'success' : 'warning'}
                        label={post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                      />
                    </td>

                    {/* Views */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>{(post.views || 0).toLocaleString()}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{post.date}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/articles/${post.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                          title="Xem trên web live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Button
                          label="Sửa"
                          variant="secondary"
                          size="sm"
                          icon={<Edit3 className="w-3.5 h-3.5 text-slate-500" />}
                          href={`/admin/blogs/${post.id}`}
                        />
                        <button
                          type="button"
                          disabled={isDeleting === post.id}
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Xoá bài"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
