import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  CheckCircle2,
  Clock,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import { getAllPosts, getBlogStats, getCategories } from "@/lib/blogs";
import { getCareerStats } from "@/lib/careers";
import { getAllContactInquiries, getContactStats } from "@/lib/contacts";
import { Card, Button, Badge, EmptyState } from "@astryxdesign/core";
import DashboardPromoCarousel from "@/components/admin/dashboard/DashboardPromoCarousel";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, allPosts, categories, careerStats, contactStats, recentInquiries] =
    await Promise.all([
      getBlogStats(),
      getAllPosts(),
      getCategories(),
      getCareerStats(),
      getContactStats(),
      getAllContactInquiries(),
    ]);

  const recentPosts = [...allPosts]
    .sort((a, b) => {
      const timeA = new Date(a.createdAt || a.date).getTime() || 0;
      const timeB = new Date(b.createdAt || b.date).getTime() || 0;
      return timeB - timeA;
    })
    .slice(0, 5);

  const topCategories = [...categories]
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6 font-open-sans w-full pb-8">
      <Card
        variant="default"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-emerald-50/30 p-6 sm:p-8"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div>
              <Badge
                label="Hệ thống quản trị nội dung E-GEAD CMS"
                variant="success"
                className="h-8 px-4"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Xin chào, Quản trị viên 👋
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              Quản lý và xuất bản các bài viết chuyên sâu, báo cáo thương mại
              điện tử xuyên biên giới và tài liệu doanh nghiệp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              label="Tạo bài viết mới"
              variant="primary"
              href="/admin/blogs/new"
              className="h-10 px-4"
            />
            <Button
              label={`Quản lý tất cả (${stats.totalPosts})`}
              variant="secondary"
              href="/admin/blogs"
              className="h-10 px-4"
            />
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <Card
          variant="default"
          className="rounded-2xl p-5 hover:border-slate-300 transition-colors"
        >
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
            <Badge label="Toàn bộ hệ thống" variant="info" className="h-8 px-4" />
          </div>
        </Card>

        <Card
          variant="default"
          className="rounded-2xl p-5 hover:border-slate-300 transition-colors"
        >
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
            <span className="text-xs font-medium text-slate-400">
              công khai
            </span>
          </div>
          <div className="mt-3">
            <Badge label="Phát hành Insights" variant="success" className="h-8 px-4" />
          </div>
        </Card>

        <Card
          variant="default"
          className="rounded-2xl p-5 hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Bản nháp</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600">
              {stats.draftPosts}
            </span>
            <span className="text-xs font-medium text-slate-400">
              đang soạn
            </span>
          </div>
          <div className="mt-3">
            <Badge label="Chưa công khai" variant="warning" className="h-8 px-4" />
          </div>
        </Card>

        <Card
          variant="default"
          className="rounded-2xl p-5 hover:border-slate-300 transition-colors"
        >
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
            <Badge label="Độc giả B2B" variant="purple" className="h-8 px-4" />
          </div>
        </Card>
      </div>
      <DashboardPromoCarousel
        careerStats={careerStats}
        blogStats={stats}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card
            variant="default"
            className="rounded-2xl overflow-hidden p-0 h-fit"
          >
            <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Bài viết gần đây
                </h2>
                <p className="text-xs text-gray-700 mt-0.5">
                  Các bài viết mới nhất đã tạo hoặc chỉnh sửa trong hệ thống
                </p>
              </div>
              <Button
                label="Xem tất cả bài viết"
                variant="primary"
                size="sm"
                href="/admin/blogs"
                className="px-4 h-10"
              />
            </div>

            <div className="divide-y divide-slate-100">
              {recentPosts.length === 0 ? (
                <div className="py-10 px-4">
                  <EmptyState
                    title="Chưa có bài viết nào"
                    description="Hệ thống chưa có bài viết nào. Hãy tạo bài viết đầu tiên của bạn."
                    actions={
                      <Button
                        label="Tạo bài viết mới"
                        variant="primary"
                        href="/admin/blogs/new"
                        className="h-10 px-4"
                      />
                    }
                  />
                </div>
              ) : (
                recentPosts.slice(0, 5).map((post) => (
                  <div
                    key={post.id}
                    className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    {/* Post details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge
                          label={post.tag || post.category || "General"}
                          variant="purple"
                          className="px-4 h-8"
                        />
                        <Badge
                          label={
                            post.status === "published"
                              ? "Đã xuất bản"
                              : "Bản nháp"
                          }
                          variant={
                            post.status === "published" ? "success" : "warning"
                          }
                          className="px-4 h-8"
                        />
                        <span className="text-xs text-gray-600">
                          {post.date}
                        </span>
                      </div>

                      <h3 className="px-4 text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                        <Link href={`/admin/blogs/${post.id}`}>{post.title}</Link>
                      </h3>
                      <p className="px-4 text-xs text-slate-500 line-clamp-1 mt-1">
                        {post.excerpt || "Chưa có mô tả tóm tắt..."}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <Button
                        label="Xem trên website"
                        isIconOnly
                        icon={<ArrowUpRight className="w-5 h-5 text-gray-700" />}
                        href={`/articles/${post.slug}`}
                        target="_blank"
                        className="h-10 w-10"
                      />
                      <Button
                        label="Chỉnh sửa"
                        variant="primary"
                        href={`/admin/blogs/${post.id}`}
                        className="h-10 px-4"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Recent Contact Inquiries */}
          <Card
            variant="default"
            className="rounded-2xl overflow-hidden p-0 h-fit"
          >
            <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    Yêu cầu liên hệ &amp; tư vấn mới
                  </h2>
                  {contactStats.newCount > 0 && (
                    <Badge
                      label={`${contactStats.newCount} mới`}
                      variant="info"
                      className="h-8 px-4"
                    />
                  )}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">
                  Khách hàng doanh nghiệp và đối tác liên hệ gần đây
                </p>
              </div>
              <Button
                label={`Xem tất cả (${contactStats.total})`}
                variant="primary"
                size="sm"
                href="/admin/contacts"
                className="px-4 h-10"
              />
            </div>

            <div className="divide-y divide-slate-100">
              {recentInquiries.length === 0 ? (
                <div className="py-10 px-4">
                  <EmptyState
                    title="Chưa có yêu cầu liên hệ nào"
                    description="Hiện tại chưa có khách hàng gửi yêu cầu tư vấn mới."
                  />
                </div>
              ) : (
                recentInquiries.slice(0, 4).map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm">
                          {inq.fullName}
                        </span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-emerald-700 font-semibold text-xs">
                          {inq.company}
                        </span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-slate-500 text-xs">
                          {inq.region}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 max-w-xl">
                        {inq.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge
                        label={
                          inq.status === 'new'
                            ? 'Mới nhận'
                            : inq.status === 'contacted'
                            ? 'Đã liên hệ'
                            : inq.status === 'resolved'
                            ? 'Đã xử lý'
                            : 'Lưu trữ'
                        }
                        variant={
                          inq.status === 'new'
                            ? 'info'
                            : inq.status === 'contacted'
                            ? 'warning'
                            : inq.status === 'resolved'
                            ? 'success'
                            : 'neutral'
                        }
                        className="h-8 px-4"
                      />
                      <Button
                        label="Chi tiết"
                        variant="secondary"
                        href="/admin/contacts"
                        className="h-10 px-4"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card variant="default" className="rounded-2xl p-0">
            <div className="flex items-center justify-between mb-4 border-b px-6 py-4 border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Chuyên mục nổi bật
                </h2>
                <p className="text-xs text-gray-700 mt-0.5">
                  5 chuyên mục có nhiều bài viết nhất
                </p>
              </div>
              <Button
                label={`Quản lý (${categories.length})`}
                variant="primary"
                href="/admin/categories"
                className="px-4 h-10"
              />
            </div>

            <div className="space-y-2 pb-4">
              {topCategories.length === 0 ? (
                <div className="py-4 px-2 mx-6">
                  <EmptyState
                    isCompact
                    title="Chưa có chuyên mục nào"
                    description="Hệ thống chưa có chuyên mục bài viết nào. Hãy tạo chuyên mục để phân loại bài viết."
                    actions={
                      <Button
                        label="Tạo chuyên mục mới"
                        variant="primary"
                        href="/admin/categories"
                        className="h-10 px-4"
                      />
                    }
                  />
                </div>
              ) : (
                topCategories.map((cat, index) => (
                  <div
                    key={cat.id}
                    className={`flex items-center justify-between p-3 mx-6 transition-colors ${index !== topCategories.length - 1 ? "border-b border-slate-100" : ""
                      }`}
                  >
                    <span className="text-sm font-semibold text-gray-800">
                      {cat.name}
                    </span>
                    <Badge label={`${cat.count || 0} bài`} variant="neutral" className="h-8 px-4" />
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Publishing Tips Card */}
          <Card
            variant="default"
            className="rounded-2xl border border-slate-200/90 bg-[#fbfaf8] overflow-hidden p-0"
          >
            {/* Top Visual Banner */}
            <div className="relative w-full h-48 sm:h-52 flex items-center justify-center">
              <Image
                src="/admin/book.png"
                alt="Mẹo tối ưu bài viết & độc giả B2B"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain p-4 transition-transform duration-700 hover:scale-105 absolute top-0 right-0"
              />
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 bg-[#fbfaf8]">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="cyan" label="Mới" className="h-8 px-4" />
                <Badge
                  variant="neutral"
                  label="Thịnh hành"
                  className="h-8 px-4 bg-white border border-slate-200 text-slate-700 font-medium"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#212b10] leading-tight mb-2.5">
                Mẹo tối ưu
                <br />
                Bài viết &amp; Độc giả B2B
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Khám phá bí quyết nâng cao tỷ lệ chuyển đổi từ nội dung mới, tối ưu thời gian đọc 4–6 phút giúp giữ chân đối tác B2B cao gấp 2.4 lần.
              </p>

              {/* CTA Button */}
              <Button
                variant="primary"
                label="Viết bài mới ngay"
                href="/admin/blogs/new"
                className="h-10 px-4"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
