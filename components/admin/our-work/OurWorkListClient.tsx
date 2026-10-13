'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, AlertCircle, MoreHorizontal, ExternalLink } from 'lucide-react';
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
  CaseStudyListItem,
  CaseStudyStats,
} from '@/lib/services/casestudy.service';
import { useCaseStudyMutations } from '@/lib/hooks';

interface OurWorkListClientProps {
  initialItems: CaseStudyListItem[];
  initialStats: CaseStudyStats;
}

export default function OurWorkListClient({
  initialItems,
  initialStats,
}: OurWorkListClientProps) {
  const router = useRouter();
  const [items, setItems] = useState<CaseStudyListItem[]>(initialItems);
  const [stats, setStats] = useState<CaseStudyStats>(initialStats);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // TanStack Query Mutations
  const { deleteCaseStudyAsync } = useCaseStudyMutations({
    onDeleteSuccess: (id) => {
      setItems((prev) => {
        const next = prev.filter((item) => item.id !== id);
        const total = next.length;
        const published = next.filter((item) => item.status === 'published').length;
        const draft = next.filter((item) => item.status === 'draft').length;
        setStats({ total, published, draft });
        return next;
      });
    },
  });

  // Calculate unique services from existing items
  const uniqueServices = React.useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      item.services?.forEach((s) => set.add(s));
    });
    return Array.from(set);
  }, [items]);

  // Unique clients count
  const uniqueClientsCount = React.useMemo(() => {
    const clients = new Set(items.map((i) => i.customer.toLowerCase().trim()));
    return clients.size;
  }, [items]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, serviceFilter]);

  // Filter items
  const filteredItems = items.filter((item) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.customer.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags?.some((t) => t.toLowerCase().includes(q)) ||
      item.services?.some((s) => s.toLowerCase().includes(q)) ||
      item.industries?.some((ind) => ind.toLowerCase().includes(q));

    const matchesStatus =
      statusFilter === 'all' || item.status === statusFilter;

    const matchesService =
      serviceFilter === 'all' || item.services?.includes(serviceFilter);

    return matchesSearch && matchesStatus && matchesService;
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
        `Bạn có chắc chắn muốn xóa dự án "${title}"? Thao tác này sẽ xóa toàn bộ nội dung các section của dự án.`
      )
    ) {
      return;
    }

    try {
      setIsDeleting(id);
      await deleteCaseStudyAsync({ id, title });
    } catch {
      // Toast notification handles error
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
              Quản lý Dự án &amp; Trang Our Work
            </h1>
            <Badge
              label={`${items.length} dự án`}
              variant="neutral"
              className="h-8 px-4"
            />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Quản lý danh sách case studies và thông tin chi tiết từng section hiển thị trên trang Our Work
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            label="Xem trang Our Work"
            variant="secondary"
            href="/our-work"
            target="_blank"
            className="px-4 h-10"
          />
          <Button
            label="Thêm dự án mới"
            variant="primary"
            href="/admin/our-work/new"
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
            Tổng số dự án
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {stats.total}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Case studies trong hệ thống
          </div>
        </Card>

        <Card
          variant="default"
          className="rounded-2xl p-4 bg-white border border-slate-200/80"
        >
          <div className="text-xs font-medium text-slate-500">
            Đang hiển thị công khai
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {stats.published}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Xuất bản trên trang Our Work
          </div>
        </Card>

        <Card
          variant="default"
          className="rounded-2xl p-4 bg-white border border-slate-200/80"
        >
          <div className="text-xs font-medium text-slate-500">
            Bản nháp
          </div>
          <div className="text-2xl font-black text-amber-700 mt-1">
            {stats.draft}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Chưa hiển thị ra bên ngoài
          </div>
        </Card>

        <Card
          variant="default"
          className="rounded-2xl p-4 bg-white border border-slate-200/80"
        >
          <div className="text-xs font-medium text-slate-500">
            Khách hàng doanh nghiệp
          </div>
          <div className="text-2xl font-black text-blue-700 mt-1">
            {uniqueClientsCount}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Đối tác và thương hiệu
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
              placeholder="Tìm theo tên dự án, đối tác khách hàng, dịch vụ, ngành nghề..."
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

          {/* Service filter */}
          <div className="md:col-span-3">
            <Selector
              label="Lọc theo dịch vụ"
              isLabelHidden
              className="h-10 border"
              value={serviceFilter}
              onChange={(val) => setServiceFilter(val)}
              options={[
                { value: 'all', label: 'Tất cả dịch vụ' },
                ...uniqueServices.map((srv) => ({ value: srv, label: srv })),
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
          CASE STUDIES TABLE (Astryx Card & EmptyState)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl overflow-hidden p-0">
        {filteredItems.length === 0 ? (
          <div className="py-12 px-4">
            <EmptyState
              icon={<AlertCircle className="w-8 h-8 text-slate-400" />}
              title="Không tìm thấy dự án nào"
              description="Không có dự án nào khớp với từ khóa tìm kiếm hoặc bộ lọc được chọn. Thử thay đổi tiêu chí lọc hoặc thêm dự án mới."
              actions={
                <Button
                  label="Thêm dự án mới"
                  variant="primary"
                  href="/admin/our-work/new"
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
                    <th className="py-3.5 px-3">Dự án &amp; Khách hàng</th>
                    <th className="py-3.5 px-3">Dịch vụ &amp; Ngành nghề</th>
                    <th className="py-3.5 px-3">Điểm nhấn</th>
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
                          {item.image ? (
                            <img
                              src={item.image}
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

                      {/* Title & Customer */}
                      <td className="py-3.5 px-3">
                        <div className="min-w-0 max-w-[240px] sm:max-w-xs">
                          <Link
                            href={`/admin/our-work/${item.id}`}
                            className="font-bold text-slate-900 hover:text-emerald-700 transition-colors block truncate"
                          >
                            {item.title}
                          </Link>
                          <div className="text-xs text-slate-500 truncate">
                            Khách hàng: <span className="font-medium text-slate-700">{item.customer}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono truncate">
                            /{item.slug}
                          </div>
                        </div>
                      </td>

                      {/* Services & Industries */}
                      <td className="py-3.5 px-3">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {item.services?.slice(0, 2).map((srv, idx) => (
                            <Badge
                              key={idx}
                              label={srv}
                              variant="neutral"
                              className="h-6 px-2 text-[11px]"
                            />
                          ))}
                          {item.industries?.slice(0, 1).map((ind, idx) => (
                            <Badge
                              key={idx}
                              label={ind}
                              variant="blue"
                              className="h-6 px-2 text-[11px]"
                            />
                          ))}
                        </div>
                      </td>

                      {/* Highlight */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {item.highlight ? (
                          <Badge
                            label={item.highlight}
                            variant="warning"
                            className="h-7 px-3 text-xs"
                          />
                        ) : (
                          <span className="text-slate-400 text-xs">-</span>
                        )}
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
                                  router.push(`/admin/our-work/${item.id}`),
                              },
                              {
                                label: 'Xem trang chi tiết',
                                onClick: () =>
                                  window.open(
                                    `/case-studies/${item.slug}`,
                                    '_blank'
                                  ),
                              },
                              {
                                label: 'Xóa dự án',
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
                  Hiển thị {startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)} trong tổng số {totalItems} dự án
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
