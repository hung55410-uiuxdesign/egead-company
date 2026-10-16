'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, X, ExternalLink, Trash2 } from 'lucide-react';
import { Button, Badge, Card, EmptyState, CheckboxInput, TextInput, Selector } from '@astryxdesign/core';
import type { PartnerItemModel, PartnerItemStats } from '@/lib/services/partner-item.service';
import type { HomeSectionModel } from '@/lib/services/home-section.service';
import { usePartnerMutations } from '@/lib/hooks';
import PartnerFormModal from './PartnerFormModal';
import PartnerBulkEditModal from './PartnerBulkEditModal';
import PartnerImportModal from './PartnerImportModal';

interface PartnerManagementSectionProps {
  initialPartners?: PartnerItemModel[];
  initialStats?: PartnerItemStats;
  headerMenuSection?: HomeSectionModel | null;
  onNavigateToMenuTab?: () => void;
}

export default function PartnerManagementSection({
  initialPartners = [],
  initialStats = { total: 0, published: 0, draft: 0 },
  headerMenuSection,
  onNavigateToMenuTab,
}: PartnerManagementSectionProps) {
  const [partners, setPartners] = useState<PartnerItemModel[]>(initialPartners);
  const [stats, setStats] = useState<PartnerItemStats>(initialStats);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [menuFilter, setMenuFilter] = useState<'all' | 'in_menu' | 'outside_menu'>('all');

  // Extract menu partners from header services menu
  const rawMenuData: any = headerMenuSection?.data || {};
  const unwrappedMenu =
    rawMenuData?.data && rawMenuData.data.partners ? rawMenuData.data : rawMenuData;
  const menuPartners: Array<{ name: string; href: string }> =
    unwrappedMenu?.partners || [];

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<PartnerItemModel | null>(null);

  // Bulk Actions State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // TanStack Query Mutations
  const {
    savePartnerAsync,
    isSaving,
    deletePartnerAsync,
    isDeleting,
    syncMenuAsync,
    isSyncingMenu,
    bulkDeletePartnersAsync,
    isBulkDeleting,
    bulkUpdatePartnersAsync,
    isBulkUpdating,
  } = usePartnerMutations({
    onSaveSuccess: (savedItem, isEditing) => {
      setPartners((prev) => {
        let next: PartnerItemModel[];
        if (isEditing) {
          next = prev.map((item) => (item.id === savedItem.id ? savedItem : item));
        } else {
          next = [savedItem, ...prev];
        }
        next.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        const total = next.length;
        const published = next.filter((item) => item.status === 'published').length;
        const draft = next.filter((item) => item.status === 'draft').length;
        setStats({ total, published, draft });
        return next;
      });
      setIsModalOpen(false);
      setEditingPartner(null);
    },
    onDeleteSuccess: (id) => {
      setPartners((prev) => {
        const next = prev.filter((item) => item.id !== id);
        const total = next.length;
        const published = next.filter((item) => item.status === 'published').length;
        const draft = next.filter((item) => item.status === 'draft').length;
        setStats({ total, published, draft });
        return next;
      });
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    },
    onBulkDeleteSuccess: (deletedIds) => {
      setPartners((prev) => {
        const next = prev.filter((item) => !deletedIds.includes(item.id));
        const total = next.length;
        const published = next.filter((item) => item.status === 'published').length;
        const draft = next.filter((item) => item.status === 'draft').length;
        setStats({ total, published, draft });
        return next;
      });
      setSelectedIds([]);
    },
    onBulkUpdateSuccess: (updatedIds, updateData) => {
      setPartners((prev) => {
        const next = prev.map((item) => {
          if (!updatedIds.includes(item.id)) return item;
          return {
            ...item,
            ...(updateData.status ? { status: updateData.status } : {}),
            ...(typeof updateData.badge === 'string'
              ? { badge: updateData.badge.trim() || null }
              : {}),
          };
        });
        const total = next.length;
        const published = next.filter((item) => item.status === 'published').length;
        const draft = next.filter((item) => item.status === 'draft').length;
        setStats({ total, published, draft });
        return next;
      });
      setSelectedIds([]);
      setIsBulkEditOpen(false);
    },
  });

  const handleSyncFromMenu = async () => {
    try {
      const res = await syncMenuAsync(menuPartners.length > 0 ? menuPartners : undefined);
      if (res?.items) {
        setPartners((prev) => {
          const map = new Map<string, PartnerItemModel>();
          for (const item of res.items) {
            map.set(item.slug, item);
          }
          for (const item of prev) {
            if (!map.has(item.slug)) {
              map.set(item.slug, item);
            }
          }
          const next = Array.from(map.values()).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          const total = next.length;
          const published = next.filter((item) => item.status === 'published').length;
          const draft = next.filter((item) => item.status === 'draft').length;
          setStats({ total, published, draft });
          return next;
        });
      }
    } catch {
      // Toast notification handles error
    }
  };

  // Helper to check if partner is in Menu Header
  const getPartnerMenuInfo = (partner: PartnerItemModel) => {
    const index = menuPartners.findIndex((mp) => {
      const s = mp.href.replace(/^\/partners\//, '').replace(/^\//, '').trim().toLowerCase();
      return s === partner.slug.toLowerCase() || mp.name.toLowerCase() === partner.name.toLowerCase();
    });
    return {
      isInMenu: index !== -1,
      menuIndex: index,
    };
  };

  // Filter partners
  const filteredPartners = partners.filter((item) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.slug.toLowerCase().includes(q) ||
      item.headline?.toLowerCase().includes(q) ||
      item.badge?.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    const { isInMenu } = getPartnerMenuInfo(item);
    const matchesMenuFilter =
      menuFilter === 'all' ||
      (menuFilter === 'in_menu' && isInMenu) ||
      (menuFilter === 'outside_menu' && !isInMenu);

    return matchesSearch && matchesStatus && matchesMenuFilter;
  });

  const handleOpenCreate = () => {
    setEditingPartner(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (partner: PartnerItemModel) => {
    setEditingPartner(partner);
    setIsModalOpen(true);
  };

  const handleDelete = async (partner: PartnerItemModel) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa đối tác "${partner.name}"? Thao tác này không thể hoàn tác.`)) {
      return;
    }
    await deletePartnerAsync({ id: partner.id, name: partner.name });
  };

  const isBulkLoading = isBulkDeleting || isBulkUpdating;

  const isAllSelected =
    filteredPartners.length > 0 &&
    filteredPartners.every((p) => selectedIds.includes(p.id));
  const isPartiallySelected =
    filteredPartners.some((p) => selectedIds.includes(p.id)) && !isAllSelected;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      const filteredIdSet = new Set(filteredPartners.map((p) => p.id));
      setSelectedIds((prev) => prev.filter((id) => !filteredIdSet.has(id)));
    } else {
      const nextIds = new Set(selectedIds);
      filteredPartners.forEach((p) => nextIds.add(p.id));
      setSelectedIds(Array.from(nextIds));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (
      !confirm(
        `Bạn có chắc chắn muốn xóa ${selectedIds.length} đối tác đã chọn? Thao tác này không thể hoàn tác.`
      )
    ) {
      return;
    }
    await bulkDeletePartnersAsync({ ids: selectedIds });
  };

  const handleBulkUpdateSubmit = async (data: {
    status?: 'published' | 'draft';
    badge?: string;
  }) => {
    if (selectedIds.length === 0) return;
    await bulkUpdatePartnersAsync({
      ids: selectedIds,
      data,
    });
  };

  const handleExportSelected = () => {
    const selectedPartners = partners.filter((p) => selectedIds.includes(p.id));
    if (selectedPartners.length === 0) return;

    const cleanList = selectedPartners.map((item) => ({
      name: item.name,
      slug: item.slug,
      badge: item.badge,
      headline: item.headline,
      description: item.description,
      bannerImage: item.bannerImage,
      bannerFallback: item.bannerFallback,
      ctaText: item.ctaText,
      ctaHref: item.ctaHref,
      advantagesSubtitle: item.advantagesSubtitle,
      advantagesHeadline: item.advantagesHeadline,
      advantagesItems: item.advantagesItems,
      expertiseSubtitle: item.expertiseSubtitle,
      expertiseHeadline: item.expertiseHeadline,
      expertiseItems: item.expertiseItems,
      whyTitlePrefix: item.whyTitlePrefix,
      whyHeadline: item.whyHeadline,
      whyDescription: item.whyDescription,
      whyItems: item.whyItems,
      casesSubtitle: item.casesSubtitle,
      casesHeadline: item.casesHeadline,
      casesItems: item.casesItems,
      ctaHeadingPart1: item.ctaHeadingPart1,
      ctaHighlight: item.ctaHighlight,
      ctaHeadingPart2: item.ctaHeadingPart2,
      ctaDescription: item.ctaDescription,
      ctaButtonText: item.ctaButtonText,
      ctaButtonHref: item.ctaButtonHref,
      metaTitle: item.metaTitle,
      metaDescription: item.metaDescription,
      order: item.order,
      status: item.status,
    }));

    const jsonString = JSON.stringify(cleanList, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `doi_tac_da_chon_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="space-y-6">
      {/* =========================================================================
          MENU HEADER LINKAGE BANNER
          ========================================================================= */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200/90 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-bold text-emerald-950">
              Menu Header là gốc dữ liệu đối tác chiến lược
            </span>
            <Badge
              label={`${menuPartners.length} đối tác trong Cột 3 Menu`}
              variant="purple"
              className="h-6 px-2.5 text-xs font-semibold"
            />
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Các trang đối tác tại đây liên kết trực tiếp với <strong>Cột 3 (Partners)</strong> trong Cấu hình Menu Header. Bấm "Đồng bộ từ Menu Header" để tự động cập nhật danh sách theo cấu hình menu mới nhất.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onNavigateToMenuTab && (
            <Button
              type="button"
              label="Cấu hình Menu Header"
              variant="secondary"
              onClick={onNavigateToMenuTab}
              className="px-3.5 h-9 text-xs font-semibold"
            />
          )}
          <Button
            type="button"
            label={isSyncingMenu ? 'Đang đồng bộ...' : 'Đồng bộ từ Menu Header'}
            variant="primary"
            isDisabled={isSyncingMenu}
            onClick={handleSyncFromMenu}
            className="px-4 h-9 text-xs font-semibold"
          />
        </div>
      </div>

      {/* =========================================================================
          KEY STATS ROW (Astryx Cards - pure text, no icons before text per AGENTS.md)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <Card variant="default" className="rounded-2xl p-4 bg-white border border-slate-200/80">
          <div className="text-xs font-medium text-slate-500">Tổng số đối tác</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.total}</div>
          <div className="text-xs text-slate-400 mt-1">Đối tác chiến lược trong hệ thống</div>
        </Card>

        <Card variant="default" className="rounded-2xl p-4 bg-white border border-slate-200/80">
          <div className="text-xs font-medium text-slate-500">Đang hiển thị công khai</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">{stats.published}</div>
          <div className="text-xs text-slate-400 mt-1">Sẵn sàng truy cập trên website</div>
        </Card>

        <Card variant="default" className="rounded-2xl p-4 bg-white border border-slate-200/80">
          <div className="text-xs font-medium text-slate-500">Bản nháp lưu tạm</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{stats.draft}</div>
          <div className="text-xs text-slate-400 mt-1">Chưa xuất bản ra bên ngoài</div>
        </Card>
      </div>

      {/* =========================================================================
          FILTER & ACTIONS BAR
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="flex-1 min-w-[200px] max-w-md">
              <TextInput
                label="Tìm kiếm đối tác"
                isLabelHidden
                placeholder="Tìm theo tên đối tác, slug, tiêu đề..."
                value={search}
                onChange={(val) => setSearch(val)}
                hasClear
                width="100%"
                className='h-10 border'
              />
            </div>

            {/* Menu Header Filter */}
            <div className="w-56">
              <Selector
                label="Lọc theo nguồn"
                isLabelHidden
                className="h-10 border"
                value={menuFilter}
                onChange={(val) => setMenuFilter(val as any)}
                options={[
                  { value: 'all', label: 'Tất cả nguồn' },
                  { value: 'in_menu', label: 'Trong Menu Header (Cột 3)' },
                  { value: 'outside_menu', label: 'Ngoài Menu Header' },
                ]}
              />
            </div>

            {/* Status Filter */}
            <div className="w-48">
              <Selector
                label="Lọc theo trạng thái"
                isLabelHidden
                className="h-10 border"
                value={statusFilter}
                onChange={(val) => setStatusFilter(val as any)}
                options={[
                  { value: 'all', label: 'Tất cả trạng thái' },
                  { value: 'published', label: 'Đang hiển thị' },
                  { value: 'draft', label: 'Bản nháp' },
                ]}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              label="Dữ liệu JSON"
              variant="secondary"
              onClick={() => setIsImportModalOpen(true)}
              className="px-4 h-10 border-slate-300 hover:border-slate-400"
            />
            <Button
              label="Thêm đối tác mới"
              variant="primary"
              onClick={handleOpenCreate}
              className="px-4 h-10"
            />
          </div>
        </div>
      </Card>

      {/* =========================================================================
          BULK ACTION BAR
          ========================================================================= */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 bg-emerald-50/90 border border-emerald-200/90 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <Badge
              label={`Đã chọn ${selectedIds.length} đối tác`}
              variant="success"
              className="h-8 px-4"
            />
            <span className="text-xs text-emerald-800 hidden sm:inline">
              Áp dụng thao tác đồng loạt trên các đối tác đã chọn
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              label="Chỉnh sửa hàng loạt"
              variant="secondary"
              className="px-4 h-10 border-emerald-300 hover:border-emerald-400"
              onClick={() => setIsBulkEditOpen(true)}
            />
            <Button
              label="Xuất JSON"
              variant="secondary"
              className="px-4 h-10 border-emerald-300 hover:border-emerald-400"
              onClick={handleExportSelected}
            />
            <Button
              label={
                isBulkLoading
                  ? 'Đang xử lý...'
                  : `Xóa ${selectedIds.length} đối tác`
              }
              variant="destructive"
              className="px-4 h-10"
              isDisabled={isBulkLoading}
              onClick={handleBulkDelete}
            />
            <Button
              label="Bỏ chọn"
              variant="ghost"
              className="px-4 h-10"
              onClick={() => setSelectedIds([])}
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          PARTNERS TABLE
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden">
        {filteredPartners.length === 0 ? (
          <div className="py-16 text-center">
            <EmptyState
              title="Không tìm thấy đối tác nào"
              description={
                search
                  ? `Không có kết quả khớp với từ khóa "${search}".`
                  : 'Chưa có đối tác chiến lược nào trong hệ thống.'
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/70 text-slate-600 font-semibold text-xs">
                  <th className="py-3 px-3 w-10 text-center">
                    <CheckboxInput
                      label="Chọn tất cả đối tác trong danh sách"
                      isLabelHidden
                      value={
                        isAllSelected
                          ? true
                          : isPartiallySelected
                            ? 'indeterminate'
                            : false
                      }
                      onChange={handleToggleSelectAll}
                    />
                  </th>
                  <th className="py-3 px-3 w-12 text-center">STT</th>
                  <th className="py-3 px-4">Tên &amp; Đường dẫn (Slug)</th>
                  <th className="py-3 px-4">Huy hiệu chứng nhận</th>
                  <th className="py-3 px-4 hidden md:table-cell">Tiêu đề Hero</th>
                  <th className="py-3 px-4 text-center">Vị trí Menu Header</th>
                  <th className="py-3 px-4 text-center w-20">Thứ tự</th>
                  <th className="py-3 px-4 text-center w-32">Trạng thái</th>
                  <th className="py-3 px-4 text-right w-40">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPartners.map((partner, index) => {
                  const { isInMenu, menuIndex } = getPartnerMenuInfo(partner);
                  const isChecked = selectedIds.includes(partner.id);
                  return (
                    <tr
                      key={partner.id}
                      className={`hover:bg-slate-50/60 transition-colors group ${isChecked ? 'bg-emerald-50/40' : ''
                        }`}
                    >
                      <td className="py-3.5 px-3 text-center">
                        <CheckboxInput
                          label={`Chọn đối tác ${partner.name}`}
                          isLabelHidden
                          size="sm"
                          value={isChecked}
                          onChange={() => handleToggleSelect(partner.id)}
                        />
                      </td>
                      <td className="py-3.5 px-3 text-center text-slate-400 font-mono text-xs">
                        {index + 1}
                      </td>

                      {/* Name & Slug */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(partner)}
                            className="font-bold text-slate-900 hover:text-emerald-700 transition-colors text-left"
                          >
                            {partner.name}
                          </button>
                          <div className="text-xs font-mono text-slate-500">
                            /partners/{partner.slug}
                          </div>
                        </div>
                      </td>

                      {/* Badge */}
                      <td className="py-3.5 px-4">
                        {partner.badge ? (
                          <span className="inline-block px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 border border-sky-200 text-xs font-medium">
                            {partner.badge}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs italic">Chưa đặt</span>
                        )}
                      </td>

                      {/* Hero Headline */}
                      <td className="py-3.5 px-4 hidden md:table-cell text-slate-600 max-w-xs truncate">
                        {partner.headline || partner.description || '-'}
                      </td>

                      {/* Menu Header Position */}
                      <td className="py-3.5 px-4 text-center">
                        {isInMenu ? (
                          <Badge
                            label={`Cột 3 (Vị trí #${menuIndex + 1})`}
                            variant="purple"
                            className="px-2.5 py-1 text-xs font-semibold"
                          />
                        ) : (
                          <Badge
                            label="Ngoài Menu"
                            variant="neutral"
                            className="px-2 py-0.5 text-xs text-slate-400"
                          />
                        )}
                      </td>

                      {/* Order */}
                      <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-600">
                        {partner.order ?? 0}
                      </td>

                      {/* Status: pure text, no icon before text per AGENTS.md */}
                      <td className="py-3.5 px-4 text-center">
                        {partner.status === 'published' ? (
                          <Badge label="Đang hiển thị" variant="success" className="px-2.5 py-1 text-xs font-semibold" />
                        ) : (
                          <Badge label="Bản nháp" variant="neutral" className="px-2.5 py-1 text-xs font-semibold" />
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            label="Sửa"
                            variant="secondary"
                            onClick={() => handleOpenEdit(partner)}
                            className="h-8 px-2.5 text-xs"
                          />
                          <Link
                            href={`/partners/${partner.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
                            title="Xem trang ngoài"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(partner)}
                            disabled={isDeleting}
                            className="p-1.5 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50 transition-colors"
                            title="Xóa đối tác"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Edit / Create Modal */}
      <PartnerFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPartner(null);
        }}
        partner={editingPartner}
        onSave={async (vars) => {
          await savePartnerAsync(vars);
        }}
        isSaving={isSaving}
      />
      {/* Bulk Edit Modal */}
      <PartnerBulkEditModal
        isOpen={isBulkEditOpen}
        selectedCount={selectedIds.length}
        isSubmitting={isBulkUpdating}
        onClose={() => setIsBulkEditOpen(false)}
        onSubmit={handleBulkUpdateSubmit}
      />
      {/* Import / Export JSON Modal */}
      <PartnerImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        allPartners={partners}
        onSuccess={(newItems) => {
          setPartners((prev) => {
            const map = new Map<string, PartnerItemModel>();
            for (const item of prev) {
              map.set(item.slug, item);
            }
            for (const item of newItems) {
              map.set(item.slug, item);
            }
            const next = Array.from(map.values()).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            const total = next.length;
            const published = next.filter((item) => item.status === 'published').length;
            const draft = next.filter((item) => item.status === 'draft').length;
            setStats({ total, published, draft });
            return next;
          });
        }}
      />
    </div>
  );
}
