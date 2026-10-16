"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, Users, AlertCircle, MoreHorizontal } from "lucide-react";
import { AdminTeamMember, PeopleStats } from "@/lib/services/people.service";
import {
  Button,
  Badge,
  Card,
  EmptyState,
  Field,
  Selector,
  DropdownMenu,
  Pagination,
  CheckboxInput,
  TextInput,
} from "@astryxdesign/core";
import { DEPARTMENTS } from "@/lib/validations/people";
import { usePeopleMutations } from "@/lib/hooks";
import { PeopleImportModal } from "./components";

interface PeopleListClientProps {
  initialMembers: AdminTeamMember[];
  initialStats: PeopleStats;
}

export default function PeopleListClient({
  initialMembers,
  initialStats,
}: PeopleListClientProps) {
  const router = useRouter();
  const [members, setMembers] = useState<AdminTeamMember[]>(initialMembers);
  const [stats, setStats] = useState<PeopleStats>(initialStats);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleGroupFilter, setRoleGroupFilter] = useState<
    "all" | "leaders" | "experts"
  >("all");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Selection & Bulk Actions State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<
    "published" | "draft" | "archived" | ""
  >("");
  const [bulkDepartment, setBulkDepartment] = useState<string>("");

  // People mutations hook with TanStack Query and Astryx Toast
  const {
    deletePersonAsync,
    bulkDeleteAsync,
    bulkUpdateAsync,
    isBulkDeleting,
    isBulkUpdating,
  } = usePeopleMutations({
    onDeleteSuccess: (id) => {
      setMembers((prev) => {
        const next = prev.filter((m) => m.id !== id);
        const total = next.length;
        const leaders = next.filter((m) => m.isLeader).length;
        const published = next.filter((m) => m.status === "published").length;
        setStats({
          total,
          leaders,
          experts: total - leaders,
          published,
        });
        return next;
      });
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    },
    onBulkDeleteSuccess: (ids) => {
      setMembers((prev) => {
        const next = prev.filter((m) => !ids.includes(m.id));
        const total = next.length;
        const leaders = next.filter((m) => m.isLeader).length;
        const published = next.filter((m) => m.status === "published").length;
        setStats({
          total,
          leaders,
          experts: total - leaders,
          published,
        });
        return next;
      });
      setSelectedIds([]);
    },
    onBulkUpdateSuccess: (ids, data) => {
      setMembers((prev) =>
        prev.map((m) => {
          if (ids.includes(m.id)) {
            return {
              ...m,
              ...(data.status ? { status: data.status } : {}),
              ...(data.department ? { department: data.department } : {}),
            };
          }
          return m;
        }),
      );
      setIsBulkEditOpen(false);
      setBulkStatus("");
      setBulkDepartment("");
      setSelectedIds([]);
    },
  });

  const isBulkLoading = isBulkDeleting || isBulkUpdating;

  // Import JSON Modal State
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handleImportSuccess = (newItems: AdminTeamMember[]) => {
    setMembers((prev) => {
      const existingIds = new Set(prev.map((m) => m.id));
      const filteredNew = newItems.filter((item) => !existingIds.has(item.id));
      const updated = [...filteredNew, ...prev];
      const total = updated.length;
      const leaders = updated.filter((m) => m.isLeader).length;
      const published = updated.filter((m) => m.status === "published").length;
      setStats({
        total,
        leaders,
        experts: total - leaders,
        published,
      });
      return updated;
    });
    router.refresh();
  };

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when search or filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, departmentFilter, statusFilter, roleGroupFilter]);

  const filteredMembers = members.filter((member) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      member.name.toLowerCase().includes(q) ||
      member.role.toLowerCase().includes(q) ||
      member.location.toLowerCase().includes(q) ||
      member.department.toLowerCase().includes(q) ||
      member.skills.some((s) => s.toLowerCase().includes(q));

    const matchesDepartment =
      departmentFilter === "all" || member.department === departmentFilter;

    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;

    const matchesRoleGroup =
      roleGroupFilter === "all" ||
      (roleGroupFilter === "leaders" && member.isLeader) ||
      (roleGroupFilter === "experts" && !member.isLeader);

    return (
      matchesSearch && matchesDepartment && matchesStatus && matchesRoleGroup
    );
  });

  const totalItems = filteredMembers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedMembers = filteredMembers.slice(
    startIndex,
    startIndex + pageSize
  );

  // Checkbox handlers
  const visibleIds = paginatedMembers.map((m) => m.id);
  const isAllSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedIds.includes(id));
  const isPartiallySelected =
    visibleIds.some((id) => selectedIds.includes(id)) && !isAllSelected;

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  // Bulk Delete Handler
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    const confirmed = confirm(
      `Bạn có chắc chắn muốn xóa ${selectedIds.length} nhân sự đã chọn? Hành động này cũng sẽ xóa sơ đồ tổ chức liên quan (nếu có).`,
    );
    if (!confirmed) return;

    try {
      await bulkDeleteAsync({ ids: selectedIds });
    } catch {
      // Toast notification handles error display
    }
  };

  // Bulk Update Submit Handler
  const handleBulkUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) return;
    if (!bulkStatus && !bulkDepartment) {
      alert("Vui lòng chọn trạng thái hoặc phòng ban để cập nhật");
      return;
    }

    try {
      await bulkUpdateAsync({
        ids: selectedIds,
        data: {
          ...(bulkStatus ? { status: bulkStatus } : {}),
          ...(bulkDepartment ? { department: bulkDepartment } : {}),
        },
      });
    } catch {
      // Toast notification handles error display
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `Bạn có chắc chắn muốn xóa nhân sự "${name}"? Hành động này cũng sẽ xóa sơ đồ tổ chức liên quan (nếu có).`,
      )
    ) {
      return;
    }

    try {
      setIsDeleting(id);
      await deletePersonAsync({ id, name });
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
              Quản lý Đội ngũ &amp; Nhân sự
            </h1>
            <Badge label={`${members.length} nhân sự`} variant="neutral" className='h-8 px-4' />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Toàn bộ danh sách ban lãnh đạo cấp cao, sơ đồ squads và chuyên gia
            chuyên trách E-GEAD
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            label="Thêm nhanh (JSON)"
            variant="secondary"
            onClick={() => setIsImportModalOpen(true)}
            className="px-4 h-10"
          />
          <Button
            label="Sơ đồ tổ chức &amp; Squads"
            variant="secondary"
            href="/admin/people/hierarchy"
            className="px-4 h-10"
          />
          <Button
            label="Thêm nhân sự mới"
            variant="primary"
            href="/admin/people/new"
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
            Tổng số nhân sự
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {stats.total}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Hồ sơ trong cơ sở dữ liệu
          </div>
        </Card>

        <Card
          variant="default"
          className="rounded-2xl p-4 bg-white border border-slate-200/80"
        >
          <div className="text-xs font-medium text-slate-500">
            Ban Lãnh đạo Cấp cao
          </div>
          <div className="text-2xl font-black text-purple-700 mt-1">
            {stats.leaders}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Có cấu hình sơ đồ squads
          </div>
        </Card>

        <Card
          variant="default"
          className="rounded-2xl p-4 bg-white border border-slate-200/80"
        >
          <div className="text-xs font-medium text-slate-500">
            Đội ngũ Chuyên gia
          </div>
          <div className="text-2xl font-black text-blue-700 mt-1">
            {stats.experts}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Chuyên trách các khối nghiệp vụ
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
            Trạng thái đã xuất bản
          </div>
        </Card>
      </div>

      {/* =========================================================================
          FILTERS & SEARCH BAR (Astryx Card)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="md:col-span-6">
            <TextInput
              label="Tìm kiếm nhân sự"
              isLabelHidden
              placeholder="Tìm kiếm theo tên, chức danh, kỹ năng, địa điểm..."
              value={search}
              onChange={(val) => setSearch(val)}
              hasClear
              width="100%"
              className="h-10 border"
            />
          </div>

          {/* Department filter */}
          <div className="md:col-span-3">
            <Selector
              label="Lọc theo phòng ban"
              className="h-10 border"
              isLabelHidden
              value={departmentFilter}
              onChange={(val) => setDepartmentFilter(val)}
              options={[
                { value: "all", label: "Tất cả phòng ban" },
                ...DEPARTMENTS.map((dept) => ({ value: dept, label: dept })),
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
                { value: "all", label: "Tất cả trạng thái" },
                { value: "published", label: "Đang hiển thị (Published)" },
                { value: "draft", label: "Bản nháp (Draft)" },
                { value: "archived", label: "Lưu trữ (Archived)" },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 bg-emerald-50/90 border border-emerald-200/90 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <Badge
              label={`Đã chọn ${selectedIds.length} nhân sự`}
              variant="success"
              className='h-8 px-4'
            />
            <span className="text-xs text-emerald-800 hidden sm:inline">
              Áp dụng thao tác đồng loạt trên các nhân sự đã chọn
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              label="Chỉnh sửa hàng loạt"
              variant="secondary"
              className="px-4 h-10"
              onClick={() => setIsBulkEditOpen(true)}
            />
            <Button
              label={
                isBulkLoading
                  ? "Đang xử lý..."
                  : `Xóa ${selectedIds.length} người`
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
          PEOPLE TABLE (Astryx Card & EmptyState)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl overflow-hidden p-0">
        {filteredMembers.length === 0 ? (
          <div className="py-12 px-4">
            <EmptyState
              icon={<AlertCircle className="w-8 h-8 text-slate-400" />}
              title="Không tìm thấy nhân sự nào"
              description="Không có nhân sự nào khớp với từ khóa hoặc bộ lọc bạn chọn. Thử thay đổi bộ lọc hoặc thêm nhân sự mới."
              actions={
                <div className="flex items-center gap-2">
                  <Button
                    label="Thêm nhanh (JSON)"
                    variant="secondary"
                    onClick={() => setIsImportModalOpen(true)}
                    className="px-4 h-10"
                  />
                  <Button
                    label="Thêm nhân sự mới"
                    variant="primary"
                    href="/admin/people/new"
                    className="px-4 h-10"
                  />
                </div>
              }
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold">
                    <th className="py-3.5 pl-4 sm:pl-6 pr-2 w-10">
                      <CheckboxInput
                        label="Chọn tất cả nhân sự"
                        isLabelHidden
                        value={
                          isAllSelected
                            ? true
                            : isPartiallySelected
                              ? "indeterminate"
                              : false
                        }
                        onChange={handleToggleAll}
                      />
                    </th>
                    <th className="py-3.5 px-3">Thành viên</th>
                    <th className="py-3.5 px-4">Khối phòng ban</th>
                    <th className="py-3.5 px-4">Phân loại</th>
                    <th className="py-3.5 px-4">Địa điểm</th>
                    <th className="py-3.5 px-4 text-center">Thứ tự</th>
                    <th className="py-3.5 px-4">Trạng thái</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedMembers.map((member) => {
                    const isChecked = selectedIds.includes(member.id);
                    return (
                      <tr
                        key={member.id}
                        className={`hover:bg-slate-50/50 transition-colors ${isChecked ? "bg-emerald-50/40" : ""
                          }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3.5 pl-4 sm:pl-6 pr-2">
                          <CheckboxInput
                            label={`Chọn nhân sự ${member.name}`}
                            isLabelHidden
                            size="sm"
                            value={isChecked}
                            onChange={() => handleToggleRow(member.id)}
                          />
                        </td>

                        {/* Name & Avatar */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                              {member.image ? (
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">
                                  {member.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <Link
                                href={`/admin/people/${member.id}`}
                                className="font-bold text-slate-900 hover:text-emerald-700 transition-colors block truncate max-w-[200px] sm:max-w-xs"
                              >
                                {member.name}
                              </Link>
                              <div className="text-xs text-slate-500 truncate max-w-[200px] sm:max-w-xs">
                                {member.role}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Department */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <Badge label={member.department} variant="neutral" className='h-8 px-4' />
                        </td>

                        {/* Classification */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {member.isLeader ? (
                            <Badge label="Lãnh đạo" variant="purple" className='h-8 px-4' />
                          ) : (
                            <Badge label="Chuyên gia" variant="blue" className='h-8 px-4' />
                          )}
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                          {member.location}
                        </td>

                        {/* Order */}
                        <td className="py-3.5 px-4 text-center font-medium text-slate-700">
                          {member.order}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {member.status === "published" ? (
                            <Badge label="Đang hiển thị" variant="success" className='h-8 px-4' />
                          ) : member.status === "draft" ? (
                            <Badge label="Bản nháp" variant="warning" className='h-8 px-4' />
                          ) : (
                            <Badge label="Lưu trữ" variant="neutral" className='h-8 px-4' />
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end">
                            <DropdownMenu
                              button={{
                                label: "Thao tác",
                                isIconOnly: true,
                                icon: <MoreHorizontal className="w-4 h-4" />,
                                size: "sm",
                                variant: "ghost",
                              }}
                              placement="below"
                              alignment="end"
                              items={[
                                ...(member.isLeader
                                  ? [
                                    {
                                      label: "Sơ đồ tổ chức & Squads",
                                      onClick: () =>
                                        router.push(
                                          `/admin/people/hierarchy?leaderId=${member.id}`,
                                        ),
                                    },
                                  ]
                                  : []),
                                {
                                  label: "Chỉnh sửa hồ sơ",
                                  onClick: () =>
                                    router.push(`/admin/people/${member.id}`),
                                },
                                {
                                  label: "Xóa nhân sự",
                                  variant: "destructive",
                                  isDisabled: isDeleting === member.id,
                                  onClick: () =>
                                    handleDelete(member.id, member.name),
                                },
                              ]}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            {totalItems > 0 && (
              <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                <span className="text-xs text-slate-500 font-medium">
                  Hiển thị {startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)} trong tổng số {totalItems} nhân sự
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

      {/* Bulk Edit Modal */}
      {isBulkEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Chỉnh sửa hàng loạt nhân sự
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Áp dụng cho {selectedIds.length} nhân sự đã chọn
                </p>
              </div>
              <Button
                label="Đóng"
                variant="ghost"
                className="px-4 h-10"
                onClick={() => setIsBulkEditOpen(false)}
              />
            </div>

            {/* Modal Body */}
            <form onSubmit={handleBulkUpdateSubmit} className="p-6 space-y-4">
              <div>
                <Selector
                  label="Trạng thái hiển thị mới"
                  description="Chọn trạng thái mới nếu muốn thay đổi đồng loạt"
                  value={bulkStatus || ""}
                  className='h-10 border'
                  onChange={(val) =>
                    setBulkStatus(
                      val as "published" | "draft" | "archived" | "",
                    )
                  }
                  options={[
                    {
                      value: "",
                      label: "-- Giữ nguyên trạng thái hiện tại --",
                    },
                    { value: "published", label: "Đang hiển thị (published)" },
                    { value: "draft", label: "Bản nháp (draft)" },
                    { value: "archived", label: "Lưu trữ (archived)" },
                  ]}
                />
              </div>

              <div>
                <Selector
                  label="Khối phòng ban mới"
                  className='h-10 border'
                  description="Chọn khối phòng ban mới nếu muốn thay đổi đồng loạt"
                  value={bulkDepartment || ""}
                  onChange={(val) => setBulkDepartment(val)}
                  options={[
                    { value: "", label: "-- Giữ nguyên phòng ban hiện tại --" },
                    ...DEPARTMENTS.map((dept) => ({
                      value: dept,
                      label: dept,
                    })),
                  ]}
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <Button
                  label="Hủy"
                  variant="ghost"
                  type="button"
                  className="px-4 h-10"
                  onClick={() => setIsBulkEditOpen(false)}
                  isDisabled={isBulkLoading}
                />
                <Button
                  label={
                    isBulkLoading ? "Đang cập nhật..." : "Áp dụng cập nhật"
                  }
                  className="px-4 h-10"
                  variant="primary"
                  type="submit"
                  isDisabled={isBulkLoading || (!bulkStatus && !bulkDepartment)}
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* People Import Modal */}
      <PeopleImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSuccess={handleImportSuccess}
      />
    </div>
  );
}
