import React from 'react';
import Link from 'next/link';
import {
  FileText,
  CheckCircle2,
  Clock,
  Eye,
  Plus,
  ArrowRight,
  TrendingUp,
  FolderTree,
  ExternalLink,
} from 'lucide-react';
import { getAllPosts, getBlogStats, getCategories } from '@/lib/blogs';
import { Card } from '@astryxdesign/core/Card';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const stats = await getBlogStats();
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 5);
  const categories = await getCategories();

  return (
    <div className="space-y-8 font-montserrat max-w-7xl mx-auto">
      {/* Welcome Banner - Astryx Card */}
      <Card variant="default" padding={6} className="overflow-hidden bg-white border border-slate-200/90 shadow-xs rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="mb-3">
              <Badge variant="neutral" label="Hệ thống quản trị Blog CMS · Astryx Design" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Xin chào, Quản trị viên
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl font-normal">
              Quản lý các bài viết, chuyên mục kiến thức E-commerce, chiến lược mở rộng thị trường và tin tức công ty.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              label="Tạo bài viết mới"
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4 stroke-[2.5]" />}
              href="/admin/blogs/new"
            />
            <Button
              label="Xem tất cả bài"
              variant="secondary"
              size="md"
              icon={<FileText className="w-4 h-4 text-slate-500" />}
              href="/admin/blogs"
            />
          </div>
        </div>
      </Card>

      {/* Stats Grid - Astryx Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card variant="default" padding={4} className="bg-white border border-slate-200/90 rounded-xl hover:border-slate-400 transition-colors shadow-xs group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tổng số bài viết
            </span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{stats.totalPosts}</span>
            <span className="text-xs text-slate-500">bài viết</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tất cả nội dung trong hệ thống</span>
          </div>
        </Card>

        <Card variant="default" padding={4} className="bg-white border border-slate-200/90 rounded-xl hover:border-slate-400 transition-colors shadow-xs group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Đã xuất bản
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">
              {stats.publishedPosts}
            </span>
            <span className="text-xs text-slate-500">công khai</span>
          </div>
          <div className="mt-3 text-xs text-slate-500">
            Hiển thị trên trang Insights
          </div>
        </Card>

        <Card variant="default" padding={4} className="bg-white border border-slate-200/90 rounded-xl hover:border-slate-400 transition-colors shadow-xs group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Bản nháp
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600">
              {stats.draftPosts}
            </span>
            <span className="text-xs text-slate-500">đang soạn</span>
          </div>
          <div className="mt-3 text-xs text-slate-500">
            Chưa xuất bản ra công chúng
          </div>
        </Card>

        <Card variant="default" padding={4} className="bg-white border border-slate-200/90 rounded-xl hover:border-slate-400 transition-colors shadow-xs group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tổng lượt xem
            </span>
            <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {stats.totalViews.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">lượt</span>
          </div>
          <div className="mt-3 text-xs text-slate-500">
            Lượt đọc ước tính
          </div>
        </Card>
      </div>

      {/* Main Content: Recent Posts & Quick Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts Table */}
        <Card variant="default" padding={0} className="lg:col-span-2 overflow-hidden bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Bài viết gần đây</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Các bài viết mới nhất đã tạo trong hệ thống
              </p>
            </div>
            <Link
              href="/admin/blogs"
              className="text-xs font-bold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1 transition-colors"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <Badge variant="purple" label={post.tag || 'General'} />
                    <Badge
                      variant={post.status === 'published' ? 'success' : 'warning'}
                      label={post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                    />
                    <span className="text-[11px] text-slate-400">
                      {post.date}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 truncate hover:text-slate-700 transition-colors">
                    <Link href={`/admin/blogs/${post.id}`}>{post.title}</Link>
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/articles/${post.slug}`}
                    target="_blank"
                    className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Xem trên web"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <Button
                    label="Chỉnh sửa"
                    variant="secondary"
                    size="sm"
                    href={`/admin/blogs/${post.id}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Sidebar: Categories & Quick Links */}
        <div className="space-y-6">
          {/* Categories Card */}
          <Card variant="default" padding={5} className="bg-white border border-slate-200/90 rounded-xl shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-slate-700" />
                <span>Chuyên mục ({categories.length})</span>
              </h3>
              <Link
                href="/admin/categories"
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Quản lý
              </Link>
            </div>

            <div className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <span className="text-xs font-semibold text-slate-700">
                    {cat.name}
                  </span>
                  <Badge variant="neutral" label={`${cat.count} bài`} />
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Info Box */}
          <Card variant="default" padding={5} className="bg-slate-50 border border-slate-200/90 rounded-xl shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 mb-2">
              Mẹo xuất bản bài viết
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Các bài viết có thời gian đọc từ 4 - 6 phút kèm ảnh minh hoạ có tỷ lệ giữ chân khách hàng B2B cao gấp 2.4 lần.
            </p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-slate-700 transition-colors"
            >
              <span>Viết bài mới ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
