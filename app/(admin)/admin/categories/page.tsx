import React from 'react';
import Link from 'next/link';
import {
  Plus,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { getCategories, getAllPosts } from '@/lib/blogs';
import { Card, Button, Badge } from '@astryxdesign/core';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  const allPosts = await getAllPosts();

  return (
    <div className="space-y-6 font-open-sans max-w-6xl mx-auto pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="mb-1.5">
            <Badge label={`${categories.length} chuyên mục kiến thức`} variant="success" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Quản lý chuyên mục &amp; Thẻ
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Các chủ đề kiến thức phân loại cho hệ thống bài viết E-commerce E-GEAD
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            label="Viết bài theo chuyên mục"
            variant="primary"
            href="/admin/blogs/new"
          />
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((cat) => {
          const relatedPosts = allPosts.filter(
            (p) => p.tag === cat.name || p.category === cat.name
          );

          return (
            <Card
              key={cat.id}
              variant="default"
              className="rounded-2xl p-6 hover:border-slate-300 transition-colors group flex flex-col justify-between"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] font-mono text-slate-400">
                        slug:
                      </span>
                      <code className="text-[11px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {cat.slug}
                      </code>
                    </div>
                  </div>

                  <Badge label={`${cat.count} bài viết`} variant="neutral" />
                </div>

                {/* Related Recent Posts */}
                <div className="mt-4 pt-3.5 border-t border-slate-100">
                  <p className="text-[11px] text-slate-500 mb-2.5 font-bold flex items-center justify-between">
                    <span>Bài viết gần đây trong chuyên mục:</span>
                    <span className="text-[10px] font-normal text-slate-400 lowercase">
                      {relatedPosts.length} liên kết
                    </span>
                  </p>

                  {relatedPosts.length > 0 ? (
                    <div className="space-y-2">
                      {relatedPosts.slice(0, 3).map((p) => (
                        <Link
                          key={p.id}
                          href={`/admin/blogs/${p.id}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 transition-colors group/link"
                        >
                          <span className="text-xs truncate font-medium flex-1 pr-2">
                            • {p.title}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover/link:text-emerald-600 group-hover/link:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic py-1">
                      Chưa có bài viết nào thuộc chuyên mục này.
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <Link
                  href={`/admin/blogs?category=${encodeURIComponent(cat.name)}`}
                  className="font-semibold text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
                >
                  <span>Lọc danh sách bài</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                <Link
                  href="/admin/blogs/new"
                  className="font-semibold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center"
                >
                  <span>Thêm bài viết mới</span>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Info Pro-Tip Box */}
      <div className="rounded-2xl border border-slate-200/80 bg-slate-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">
            Cơ chế phân loại và SEO Breadcrumb
          </h4>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Các chuyên mục này được tự động đồng bộ sang cấu trúc danh mục công khai tại trang Insights của E-GEAD. Khi xuất bản bài viết, thẻ chuyên mục sẽ đóng vai trò neo điều hướng ngữ cảnh cho độc giả B2B.
          </p>
        </div>

        <Link
          href="/insights"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors shrink-0"
        >
          <span>Xem trang Insights</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
        </Link>
      </div>
    </div>
  );
}
