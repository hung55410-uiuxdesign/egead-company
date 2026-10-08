import React from 'react';
import Link from 'next/link';
import {
  FileText,
  CheckCircle2,
  Clock,
  Eye,
  Plus,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Users,
  FileInput,
} from 'lucide-react';
import { getAllPosts, getBlogStats, getCategories } from '@/lib/blogs';
import { getCareerStats } from '@/lib/careers';
import { Card, Button, Badge } from '@astryxdesign/core';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [stats, allPosts, categories, careerStats] = await Promise.all([
    getBlogStats(),
    getAllPosts(),
    getCategories(),
    getCareerStats(),
  ]);
  const recentPosts = allPosts.slice(0, 5);

  return (
    <div className="space-y-6 font-open-sans max-w-7xl mx-auto pb-8">
      {/* =========================================================================
          HERO WELCOME BANNER (Astryx Card)
          ========================================================================= */}
      <Card variant="default" className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-emerald-50/30 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div>
              <Badge label="Hệ thống quản trị nội dung E-GEAD CMS" variant="success" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Xin chào, Quản trị viên 👋
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              Quản lý và xuất bản các bài viết chuyên sâu, báo cáo thương mại điện tử xuyên biên giới và tài liệu doanh nghiệp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              label="Tạo bài viết mới"
              variant="primary"
              href="/admin/blogs/new"
            />
            <Button
              label={`Quản lý tất cả (${stats.totalPosts})`}
              variant="secondary"
              href="/admin/blogs"
            />
          </div>
        </div>
      </Card>

      {/* =========================================================================
          KEY STATS CARDS (Astryx Cards - 4 Visual Metrics)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Metric 1: Total Posts */}
        <Card variant="default" className="rounded-2xl p-5 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Tổng số bài viết
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {stats.totalPosts}
            </span>
            <span className="text-xs font-medium text-slate-400">bài viết</span>
          </div>
          <div className="mt-3">
            <Badge label="Toàn bộ hệ thống" variant="info" />
          </div>
        </Card>

        {/* Metric 2: Published */}
        <Card variant="default" className="rounded-2xl p-5 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Đã xuất bản
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">
              {stats.publishedPosts}
            </span>
            <span className="text-xs font-medium text-slate-400">công khai</span>
          </div>
          <div className="mt-3">
            <Badge label="Phát hành Insights" variant="success" />
          </div>
        </Card>

        {/* Metric 3: Drafts */}
        <Card variant="default" className="rounded-2xl p-5 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Bản nháp
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600">
              {stats.draftPosts}
            </span>
            <span className="text-xs font-medium text-slate-400">đang soạn</span>
          </div>
          <div className="mt-3">
            <Badge label="Chưa công khai" variant="warning" />
          </div>
        </Card>

        {/* Metric 4: Total Views */}
        <Card variant="default" className="rounded-2xl p-5 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Tổng lượt xem
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {stats.totalViews.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-400">lượt đọc</span>
          </div>
          <div className="mt-3">
            <Badge label="Độc giả B2B" variant="purple" />
          </div>
        </Card>
      </div>

      {/* =========================================================================
          CAREER & RECRUITMENT QUICK HUB (Astryx Card)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400">
                Tuyển dụng &amp; Thu hút nhân tài
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              Cổng tuyển dụng E-GEAD Careers
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Đang có <strong className="text-emerald-300 font-bold">{careerStats.activeJobs} vị trí mở</strong> và{' '}
              <strong className="text-emerald-300 font-bold">{careerStats.totalApplications} hồ sơ ứng tuyển</strong> đã nộp về hệ thống
              {careerStats.pendingApplications > 0 && ` (${careerStats.pendingApplications} hồ sơ mới chờ duyệt)`}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              label="Quản lý tuyển dụng"
              variant="secondary"
              href="/admin/careers"
            />
            <Button
              label={`Hồ sơ ứng tuyển (${careerStats.totalApplications})`}
              variant="secondary"
              href="/admin/careers/applications"
            />
            <Button
              label="Biểu mẫu ứng tuyển"
              variant="secondary"
              href="/admin/careers/form-preview"
            />
          </div>
        </div>
      </Card>

      {/* =========================================================================
          MAIN CONTENT AREA (Recent Posts Astryx Card + Side Widgets)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Recent Articles Table */}
        <Card variant="default" className="lg:col-span-2 rounded-2xl overflow-hidden p-0">
          <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-base font-bold text-slate-900">Bài viết gần đây</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Các bài viết mới nhất đã tạo hoặc chỉnh sửa trong hệ thống
              </p>
            </div>
            <Link
              href="/admin/blogs"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
            >
              <span>Xem tất cả bài</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                {/* Post details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge
                      label={post.tag || post.category || 'General'}
                      variant="purple"
                    />
                    <Badge
                      label={post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                      variant={post.status === 'published' ? 'success' : 'warning'}
                    />
                    <span className="text-[11px] text-slate-400">
                      {post.date}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    <Link href={`/admin/blogs/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                    {post.excerpt || 'Chưa có mô tả tóm tắt...'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <Link
                    href={`/articles/${post.slug}`}
                    target="_blank"
                    className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors"
                    title="Xem trên trang website live"
                  >
                    <ArrowUpRight className="w-4 h-4" />
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

        {/* Right Column (1 Col): Categories & Publishing Tips */}
        <div className="space-y-6">
          {/* Categories Card */}
          <Card variant="default" className="rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">
                Chuyên mục ({categories.length})
              </h2>
              <Link
                href="/admin/categories"
                className="text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
              >
                Quản lý
              </Link>
            </div>

            <div className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/70 border border-slate-200/60 transition-colors"
                >
                  <span className="text-xs font-semibold text-slate-800">
                    {cat.name}
                  </span>
                  <Badge label={`${cat.count} bài`} variant="neutral" />
                </div>
              ))}
            </div>
          </Card>

          {/* Publishing Tips Card */}
          <Card variant="green" className="rounded-2xl p-5 relative overflow-hidden">
            <h3 className="text-sm font-bold text-emerald-900 mb-2">
              Mẹo tối ưu bài viết
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Các bài viết có thời gian đọc từ 4 - 6 phút kèm ảnh minh hoạ có tỷ lệ giữ chân khách hàng B2B cao gấp 2.4 lần.
            </p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 transition-colors"
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
