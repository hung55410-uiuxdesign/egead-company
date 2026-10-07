import React from 'react';
import Link from 'next/link';
import { FolderTree, Plus, ArrowRight } from 'lucide-react';
import { getCategories, getAllPosts } from '@/lib/blogs';
import { Card } from '@astryxdesign/core/Card';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  const allPosts = await getAllPosts();

  return (
    <div className="space-y-6 font-montserrat max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản lý chuyên mục &amp; Thẻ
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Các chủ đề kiến thức phân loại cho hệ thống bài viết E-commerce E-GEAD
          </p>
        </div>

        <Button
          label="Gắn vào bài viết mới"
          variant="primary"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5 stroke-[2.5]" />}
          href="/admin/blogs/new"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const relatedPosts = allPosts.filter(
            (p) => p.tag === cat.name || p.category === cat.name
          );

          return (
            <Card
              key={cat.id}
              variant="default"
              padding={5}
              className="bg-white border border-slate-200/90 rounded-xl hover:border-slate-400 transition-all shadow-xs group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <FolderTree className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      slug: {cat.slug}
                    </span>
                  </div>
                </div>
                <Badge variant="purple" label={`${cat.count} bài`} />
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-bold">
                  Bài viết gần đây trong chuyên mục:
                </p>
                <div className="space-y-1.5">
                  {relatedPosts.slice(0, 2).map((p) => (
                    <Link
                      key={p.id}
                      href={`/admin/blogs/${p.id}`}
                      className="block text-xs text-slate-600 hover:text-emerald-700 truncate transition-colors font-medium"
                    >
                      • {p.title}
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
