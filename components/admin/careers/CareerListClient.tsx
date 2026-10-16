"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Trash2, X, AlertCircle, MoreHorizontal } from "lucide-react";
import { CareerPost, CareerStats, JobStatus } from "@/types/career";
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
import { useCareerMutations } from "@/lib/hooks";

interface CareerListClientProps {
  initialJobs: CareerPost[];
  stats: CareerStats;
  departments: string[];
}

export default function CareerListClient({
  initialJobs,
  stats,
  departments,
}: CareerListClientProps) {
  const router = useRouter();
  const [jobs, setJobs] = useState<CareerPost[]>(initialJobs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft" | "closed"
  >("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Selection & Bulk Actions State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<JobStatus | "">("");
  const [bulkDepartment, setBulkDepartment] = useState<string>("");

  // Career mutations hook with TanStack Query and Astryx Toast
  const {
    deleteJobAsync,
    bulkDeleteAsync,
    bulkUpdateAsync,
    isBulkDeleting,
    isBulkUpdating,
  } = useCareerMutations({
    onDeleteSuccess: (id) => {
      setJobs((prev) => prev.filter((j) => j.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    },
    onBulkDeleteSuccess: (ids) => {
      setJobs((prev) => prev.filter((j) => !ids.includes(j.id)));
      setSelectedIds([]);
    },
    onBulkUpdateSuccess: (ids, data) => {
      setJobs((prev) =>
        prev.map((j) => {
          if (ids.includes(j.id)) {
            return {
              ...j,
              ...(data.status ? { status: data.status } : {}),
              ...(data.department ? { department: data.department } : {}),
            };
          }
          return j;
        }),
      );
      setIsBulkEditOpen(false);
      setBulkStatus("");
      setBulkDepartment("");
      setSelectedIds([]);
    },
  });

  const isBulkLoading = isBulkDeleting || isBulkUpdating;

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when search or filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, departmentFilter]);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      job.slug.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || job.status === statusFilter;

    const matchesDepartment =
      departmentFilter === "all" || job.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const totalItems = filteredJobs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + pageSize);

  // Checkbox handlers
  const isAllSelected =
    paginatedJobs.length > 0 &&
    paginatedJobs.every((j) => selectedIds.includes(j.id));
  const isPartiallySelected =
    paginatedJobs.some((j) => selectedIds.includes(j.id)) && !isAllSelected;

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleToggleAll = () => {
    const visibleIds = paginatedJobs.map((j) => j.id);
    const allSelected =
      visibleIds.length > 0 &&
      visibleIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  // Bulk Delete Handler
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    const confirmed = confirm(
      `Bạn có chắc chắn muốn xóa ${selectedIds.length} tin tuyển dụng đã chọn không? Thao tác này không thể hoàn tác.`,
    );
    if (!confirmed) return;

    try {
      await bulkDeleteAsync({ ids: selectedIds });
    } catch {
      // Astryx Toast handles error
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
      // Astryx Toast handles error
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xoá tin tuyển dụng: "${title}"?`)) {
      return;
    }

    try {
      setIsDeleting(id);
      await deleteJobAsync({ id, title });
    } catch {
      // Astryx Toast handles error
    } finally {
      setIsDeleting(null);
    }
  };


  const getStatusBadge = (status: CareerPost["status"]) => {
    switch (status) {
      case "published":
        return <Badge label="Đang tuyển" variant="success" className='h-8 px-4' />;
      case "draft":
        return <Badge label="Bản nháp" variant="neutral" className='h-8 px-4' />;
      case "closed":
        return <Badge label="Đã đóng" variant="error" className='h-8 px-4' />;
      default:
        return <Badge label={status} variant="neutral" className='h-8 px-4' />;
    }
  };

  return (
    <div className="space-y-6 font-open-sans w-full pb-12">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Quản lý tuyển dụng
            </h1>
            <Badge label={`${jobs.length} vị trí`} variant="neutral" className='h-8 px-4' />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Hệ thống đăng bài tuyển dụng, cấu hình biểu mẫu và quản lý hồ sơ ứng
            viên nộp về
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            label={`Hồ sơ ứng tuyển (${stats.totalApplications}${stats.pendingApplications > 0 ? ` - ${stats.pendingApplications} mới` : ""})`}
            variant="secondary"
            href="/admin/careers/applications"
            className='h-10 px-4'
          />
          <Button
            label="Biểu mẫu ứng tuyển"
            variant="secondary"
            href="/admin/careers/form-preview"
            className='h-10 px-4'
          />
          <Button
            label="Đăng tin tuyển dụng mới"
            variant="primary"
            href="/admin/careers/new"
            className='h-10 px-4'
          />
        </div>
      </div>

      {/* =========================================================================
          METRICS CARDS (Astryx Cards - 4 Summary Stats)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default" className="rounded-2xl p-4 sm:p-5">
          <span className="text-xs font-bold text-slate-500 block">
            Tổng tin tuyển dụng
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {stats.totalJobs}
            </span>
            <span className="text-xs text-slate-400">vị trí</span>
          </div>
        </Card>

        <Card variant="default" className="rounded-2xl p-4 sm:p-5">
          <span className="text-xs font-bold text-slate-500 block">
            Đang mở tuyển dụng
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">
              {stats.activeJobs}
            </span>
            <span className="text-xs text-slate-400">vị trí active</span>
          </div>
        </Card>

        <Card variant="default" className="rounded-2xl p-4 sm:p-5">
          <span className="text-xs font-bold text-slate-500 block">
            Tổng hồ sơ ứng tuyển
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-purple-600">
              {stats.totalApplications}
            </span>
            <span className="text-xs text-slate-400">hồ sơ đã nộp</span>
          </div>
        </Card>

        <Card variant="default" className="rounded-2xl p-4 sm:p-5">
          <span className="text-xs font-bold text-slate-500 block">
            Hồ sơ mới chờ duyệt
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600">
              {stats.pendingApplications}
            </span>
            <span className="text-xs text-slate-400">hồ sơ cần xử lý</span>
          </div>
        </Card>
      </div>

      {/* =========================================================================
          FILTERS & SEARCH BAR
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="md:col-span-6">
            <TextInput
              label="Tìm kiếm tin tuyển dụng"
              isLabelHidden
              placeholder="Tìm kiếm vị trí tuyển dụng, phòng ban, địa điểm, từ khóa..."
              value={search}
              onChange={(val) => setSearch(val)}
              hasClear
              width="100%"
              className='h-10 border'
            />
          </div>

          {/* Status filter */}
          <div className="md:col-span-3">
            <Selector
              label="Lọc theo trạng thái"
              isLabelHidden
              className="h-10 border"
              value={statusFilter}
              onChange={(val) =>
                setStatusFilter(val as "all" | "published" | "draft" | "closed")
              }
              options={[
                { value: "all", label: "Tất cả trạng thái" },
                { value: "published", label: "Đang mở tuyển (Published)" },
                { value: "draft", label: "Bản nháp (Draft)" },
                { value: "closed", label: "Đã đóng tuyển (Closed)" },
              ]}
            />
          </div>

          {/* Department filter */}
          <div className="md:col-span-3">
            <Selector
              label="Lọc theo phòng ban"
              isLabelHidden
              className="h-10 border"
              value={departmentFilter}
              onChange={(val) => setDepartmentFilter(val)}
              options={[
                { value: "all", label: "Tất cả phòng ban" },
                ...departments.map((dept) => ({ value: dept, label: dept })),
              ]}
            />
          </div>
        </div>

        {/* Filter tags info */}
        {(statusFilter !== "all" || departmentFilter !== "all" || search) && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span>
              Tìm thấy{" "}
              <strong className="text-slate-800">{filteredJobs.length}</strong>{" "}
              kết quả phù hợp
            </span>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setDepartmentFilter("all");
              }}
              className="text-emerald-700 hover:underline font-semibold"
            >
              Xoá bộ lọc
            </button>
          </div>
        )}
      </Card>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 bg-emerald-50/90 border border-emerald-200/90 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <Badge
              label={`Đã chọn ${selectedIds.length} tin tuyển dụng`}
              variant="success"
              className='h-8 px-4'
            />
            <span className="text-xs text-emerald-800 hidden sm:inline">
              Áp dụng thao tác đồng loạt trên các tin tuyển dụng đã chọn
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              label="Chỉnh sửa hàng loạt"
              variant="secondary"
              className='h-10 px-4'
              onClick={() => setIsBulkEditOpen(true)}
            />
            <Button
              label={
                isBulkLoading
                  ? "Đang xử lý..."
                  : `Xóa ${selectedIds.length} tin`
              }
              variant="destructive"
              isDisabled={isBulkLoading}
              onClick={handleBulkDelete}
            />
            <Button
              label="Bỏ chọn"
              variant="secondary"
              className="px-4 h-10"
              onClick={() => setSelectedIds([])}
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          JOBS TABLE LIST
          ========================================================================= */}
      {filteredJobs.length === 0 ? (
        <Card variant="default" className="rounded-2xl p-12 text-center">
          <EmptyState
            icon={<AlertCircle className="w-8 h-8 text-slate-400" />}
            title="Không tìm thấy tin tuyển dụng nào"
            description="Hãy thử thay đổi từ khoá tìm kiếm hoặc tạo một bài đăng tuyển dụng mới."
            actions={
              <Button
                label="Đăng tin tuyển dụng mới"
                variant="primary"
                href="/admin/careers/new"
                className="px-4 h-10"
              />
            }
          />
        </Card>
      ) : (
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/80 text-xs font-bold text-slate-600">
                  <th className="py-3.5 pl-4 sm:pl-6 pr-2 w-10">
                    <CheckboxInput
                      label="Chọn tất cả tin tuyển dụng"
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
                  <th className="py-3.5 px-3">Vị trí tuyển dụng</th>
                  <th className="py-3.5 px-4">Phòng ban</th>
                  <th className="py-3.5 px-4">Địa điểm &amp; Loại hình</th>
                  <th className="py-3.5 px-4">Mức lương &amp; Hạn nộp</th>
                  <th className="py-3.5 px-4 text-center">Hồ sơ ứng tuyển</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedJobs.map((job) => {
                  const isChecked = selectedIds.includes(job.id);
                  return (
                    <tr
                      key={job.id}
                      className={`hover:bg-slate-50/70 transition-colors group ${isChecked ? "bg-emerald-50/40" : ""
                        }`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 pl-4 sm:pl-6 pr-2">
                        <CheckboxInput
                          label={`Chọn tin tuyển dụng ${job.title}`}
                          isLabelHidden
                          size="sm"
                          value={isChecked}
                          onChange={() => handleToggleRow(job.id)}
                        />
                      </td>

                      {/* Job Title & Slug */}
                      <td className="py-4 px-3 max-w-xs sm:max-w-md">
                        <div className="min-w-0">
                          <Link
                            href={`/admin/careers/${job.id}`}
                            className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 block text-sm"
                          >
                            {job.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-400 font-mono">
                              /{job.slug}
                            </span>
                            {job.featured && (
                              <Badge label="Nổi bật" variant="warning" className='h-8 px-4' />
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-4 px-4">
                        <Badge label={job.department} variant="neutral" className='h-8 px-4' />
                      </td>

                      {/* Location & Type */}
                      <td className="py-4 px-4 text-slate-700">
                        <span className="font-semibold block">
                          {job.location}
                        </span>
                        <span className="text-xs text-slate-400 block mt-0.5">
                          {job.type} • {job.experience}
                        </span>
                      </td>

                      {/* Salary & Deadline */}
                      <td className="py-4 px-4">
                        <span className="font-bold text-slate-900 block">
                          {job.salary}
                        </span>
                        <span className="text-xs text-slate-400 block mt-0.5">
                          Hạn nộp: {job.deadline}
                        </span>
                      </td>

                      {/* Applications Count - Astryx Badge (NO icon before text, NO line breaks) */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <Link
                          href={`/admin/careers/applications?jobId=${job.id}`}
                          className="inline-block transition-transform hover:scale-105"
                          title="Xem danh sách ứng viên nộp cho vị trí này"
                        >
                          <Badge
                            label={`${job.applicationsCount || 0} hồ sơ`}
                            variant={
                              job.applicationsCount > 0 ? "success" : "neutral"
                            }
                            className='h-8 px-4'
                          />
                        </Link>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        {getStatusBadge(job.status)}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
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
                              {
                                label: "Chỉnh sửa tin tuyển dụng",
                                onClick: () =>
                                  router.push(`/admin/careers/${job.id}`),
                              },
                              {
                                label: "Hồ sơ ứng viên",
                                onClick: () =>
                                  router.push(
                                    `/admin/careers/applications?jobId=${job.id}`,
                                  ),
                              },
                              {
                                label: "Biểu mẫu ứng tuyển",
                                onClick: () =>
                                  router.push(
                                    `/admin/careers/form-preview?jobId=${job.id}`,
                                  ),
                              },
                              {
                                label: "Xem trên website",
                                onClick: () =>
                                  window.open(`/careers/${job.slug}`, "_blank"),
                              },
                              {
                                label: "Xóa tin tuyển dụng",
                                variant: "destructive",
                                isDisabled: isDeleting === job.id,
                                onClick: () => handleDelete(job.id, job.title),
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
                Hiển thị {startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)} trong tổng số {totalItems} tin tuyển dụng
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
        </div>
      )}

      {/* Bulk Edit Modal */}
      {isBulkEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Chỉnh sửa hàng loạt tin tuyển dụng
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Áp dụng cho {selectedIds.length} tin đã chọn
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
                  label="Trạng thái tuyển dụng mới"
                  description="Chọn trạng thái mới nếu muốn thay đổi đồng loạt"
                  value={bulkStatus || ""}
                  onChange={(val) => setBulkStatus(val as JobStatus | "")}
                  options={[
                    {
                      value: "",
                      label: "-- Giữ nguyên trạng thái hiện tại --",
                    },
                    { value: "published", label: "Đang tuyển (published)" },
                    { value: "draft", label: "Bản nháp (draft)" },
                    { value: "closed", label: "Đã đóng (closed)" },
                  ]}
                  className='h-10 border'
                />
              </div>

              <div>
                <Selector
                  label="Phòng ban mới"
                  description="Chọn phòng ban mới nếu muốn thay đổi đồng loạt"
                  value={bulkDepartment || ""}
                  className='h-10 border'
                  onChange={(val) => setBulkDepartment(val)}
                  options={[
                    { value: "", label: "-- Giữ nguyên phòng ban hiện tại --" },
                    ...departments.map((dept) => ({
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
                  variant="primary"
                  type="submit"
                  className="px-4 h-10"
                  isDisabled={isBulkLoading || (!bulkStatus && !bulkDepartment)}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
