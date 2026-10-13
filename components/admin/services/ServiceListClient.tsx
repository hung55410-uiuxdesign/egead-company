'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, AlertCircle, MoreHorizontal } from 'lucide-react';
import {
  Button,
  Badge,
  Card,
  EmptyState,
  Selector,
  DropdownMenu,
  Pagination,
} from '@astryxdesign/core';
import type {
  ServiceItemListItem,
  ServiceItemStats,
} from '@/lib/services/service-item.service';
import { useServiceMutations } from '@/lib/hooks';

interface ServiceListClientProps {
  initialItems: ServiceItemListItem[];
  initialStats: ServiceItemStats;
}

export default function ServiceListClient({
  initialItems,
  initialStats,
}: ServiceListClientProps) {
  const router = useRouter();
  const [items, setItems] = useState<ServiceItemListItem[]>(initialItems);
  const [stats, setStats] = useState<ServiceItemStats>(initialStats);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // TanStack Query Mutations
  const { deleteServiceAsync } = useServiceMutations({
    onDeleteSuccess: (id) => {
      setItems((prev) => {
        const next = prev.filter((item) => item.id !== id);
        const total = next.length;
        const services = next.filter((item) => item.category === 'service').length;
        const industries = next.filter((item) => item.category === 'industry').length;
        const published = next.filter((item) => item.status === 'published').length;
        const draft = next.filter((item) => item.status === 'draft').length;
        setStats({ total, services, industries, published, draft });
        return next;
      });
    },
  });

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, statusFilter]);

  // Filter items
  const filteredItems = items.filter((item) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.slug.toLowerCase().includes(q) ||
      item.tagline?.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q);

    const matchesCategory =
      categoryFilter === 'all' || item.category === categoryFilter;

    const matchesStatus =
      statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + pageSize
  );

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `Bạn có chắc chắn muốn xóa dịch vụ "${title}"? Thao tác này sẽ xóa toàn bộ các section liên quan.`
      )
    ) {
      return;
    }

    try {
      setIsDeleting(id);
      await deleteServiceAsync({ id, title });
    } catch {
      // Toast notification handles error display
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-6 w-full pb-12">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Quản lý Dịch vụ &amp; Ngành nghề
            </h1>
            <Badge
              label={`${items.length} dịch vụ & ngành nghề`}
              variant="neutral"
              className="h-8 px-4"
            />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Quản lý các trụ cột dịch vụ công nghệ và ngành nghề chuyên sâu hiển thị trên menu điều hướng và trang All Services
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            label="Xem trang All Services"
            variant="secondary"
            href="/services/all-services"
            target="_blank"
            className="px-4 h-10"
          />
          <Button
            label="Thêm dịch vụ mới"
            variant="primary"
            href="/admin/services/new"
            className="px-4 h-10"
          />
        </div>
      </div>

      {/* =========================================================================
          KEY STATS ROW (Astryx Cards - pure text, no icons before text)
          ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <Card
          variant="default"
          className="rounded-2xl p-4 bg-white border border-slate-200/80"
        >
          <div className="text-xs font-medium text-slate-500">
            Tổng số danh mục
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {stats.total}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Dịch vụ &amp; ngành nghề trong hệ thống
          </div>
        </Card>

        <Card
          variant="default"
          className="rounded-2xl p-4 bg-white border border-slate-200/80"
        >
          <div className="text-xs font-medium text-slate-500">
            Trụ cột Dịch vụ (Services)
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {stats.services}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Strategy, Data, Tech, CX Operations
          </div>
        </Card>

        <Card
          variant="default"
          className="rounded-2xl p-4 bg-white border border-slate-200/80"
        >
          <div className="text-xs font-medium text-slate-500">
            Ngành nghề (Industries)
          </div>
          <div className="text-2xl font-black text-blue-700 mt-1">
            {stats.industries}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Automotive, Banking, Chemicals, Fashion...
          </div>
        </Card>

        <Card
          variant="default"
          className="rounded-2xl p-4 bg-white border border-slate-200/80"
        >
          <div className="text-xs font-medium text-slate-500">
            Đang hiển thị công khai
          </div>
          <div className="text-2xl font-black text-purple-700 mt-1">
            {stats.published}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Đã xuất bản ngoài website
          </div>
        </Card>
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
              placeholder="Tìm theo tên dịch vụ, đường dẫn slug, khẩu hiệu..."
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

          {/* Category filter */}
          <div className="md:col-span-3">
            <Selector
              label="Lọc theo phân loại"
              isLabelHidden
              className="h-10 border"
              value={categoryFilter}
              onChange={(val) => setCategoryFilter(val)}
              options={[
                { value: 'all', label: 'Tất cả phân loại' },
                { value: 'service', label: 'Trụ cột Dịch vụ (Service)' },
                { value: 'industry', label: 'Ngành nghề (Industry)' },
              ]}
            />
          </div>

          {/* Status filter */}
          <div className="md:col-span-3">
            <Selector
              label="Lọc theo trạng thái"
              isLabelHidden
              className="h-10 border"
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              options={[
                { value: 'all', label: 'Tất cả trạng thái' },
                { value: 'published', label: 'Đang hiển thị (Published)' },
                { value: 'draft', label: 'Bản nháp (Draft)' },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* =========================================================================
          SERVICES TABLE (Astryx Card & EmptyState)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl overflow-hidden p-0">
        {filteredItems.length === 0 ? (
          <div className="py-12 px-4">
            <EmptyState
              icon={<AlertCircle className="w-8 h-8 text-slate-400" />}
              title="Không tìm thấy dịch vụ nào"
              description="Không có dịch vụ hoặc ngành nghề nào khớp với từ khóa tìm kiếm. Thử đổi bộ lọc hoặc thêm mới."
              actions={
                <Button
                  label="Thêm dịch vụ mới"
                  variant="primary"
                  href="/admin/services/new"
                  className="px-4 h-10"
                />
              }
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold">
                    <th className="py-3.5 pl-4 sm:pl-6 pr-3 w-16">Ảnh</th>
                    <th className="py-3.5 px-3">Tên &amp; Đường dẫn</th>
                    <th className="py-3.5 px-3">Phân loại</th>
                    <th className="py-3.5 px-3">Khẩu hiệu (Tagline)</th>
                    <th className="py-3.5 px-3 text-center">Thứ tự</th>
                    <th className="py-3.5 px-3">Trạng thái</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Thumbnail */}
                      <td className="py-3.5 pl-4 sm:pl-6 pr-3">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          {item.heroImage ? (
                            <img
                              src={item.heroImage}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">
                              {item.title.charAt(0)}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Title & Slug */}
                      <td className="py-3.5 px-3">
                        <div className="min-w-0 max-w-[240px] sm:max-w-xs">
                          <Link
                            href={`/admin/services/${item.id}`}
                            className="font-bold text-slate-900 hover:text-emerald-700 transition-colors block truncate"
                          >
                            {item.title}
                          </Link>
                          <div className="text-[11px] text-slate-400 font-mono truncate">
                            /services/all-services/{item.slug}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {item.category === 'service' ? (
                          <Badge
                            label="Dịch vụ trụ cột"
                            variant="purple"
                            className="h-7 px-3 text-xs"
                          />
                        ) : (
                          <Badge
                            label="Ngành nghề"
                            variant="blue"
                            className="h-7 px-3 text-xs"
                          />
                        )}
                      </td>

                      {/* Tagline */}
                      <td className="py-3.5 px-3">
                        <div className="text-xs text-slate-600 truncate max-w-[260px]">
                          {item.tagline || item.subtitle || '-'}
                        </div>
                      </td>

                      {/* Order */}
                      <td className="py-3.5 px-3 text-center font-medium text-slate-700">
                        {item.order}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {item.status === 'published' ? (
                          <Badge
                            label="Đang hiển thị"
                            variant="success"
                            className="h-8 px-4"
                          />
                        ) : (
                          <Badge
                            label="Bản nháp"
                            variant="warning"
                            className="h-8 px-4"
                          />
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end">
                          <DropdownMenu
                            button={{
                              label: 'Thao tác',
                              isIconOnly: true,
                              icon: <MoreHorizontal className="w-4 h-4" />,
                              size: 'sm',
                              variant: 'ghost',
                            }}
                            placement="below"
                            alignment="end"
                            items={[
                              {
                                label: 'Chỉnh sửa nội dung sections',
                                onClick: () =>
                                  router.push(`/admin/services/${item.id}`),
                              },
                              {
                                label: 'Xem trang công khai',
                                onClick: () =>
                                  window.open(
                                    `/services/all-services/${item.slug}`,
                                    '_blank'
                                  ),
                              },
                              {
                                label: 'Xóa dịch vụ',
                                variant: 'destructive',
                                isDisabled: isDeleting === item.id,
                                onClick: () =>
                                  handleDelete(item.id, item.title),
                              },
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            {totalItems > 0 && (
              <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                <span className="text-xs text-slate-500 font-medium">
                  Hiển thị {startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)} trong tổng số {totalItems} danh mục
                </span>
                <Pagination
                  page={safeCurrentPage}
                  onChange={(p) => setCurrentPage(p)}
                  totalItems={totalItems}
                  pageSize={pageSize}
                  pageSizeOptions={[10, 20, 50]}
                  onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setCurrentPage(1);
                  }}
                  variant="pages"
                  size="sm"
                />
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
