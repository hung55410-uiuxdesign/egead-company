'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
} from 'lucide-react';
import { JobApplication, ApplicationStatus, CareerPost } from '@/types/career';
import { Button, Badge, Card, EmptyState, Selector, DropdownMenu, Pagination } from '@astryxdesign/core';

interface CareerApplicationsClientProps {
  initialApplications: JobApplication[];
  jobs: CareerPost[];
  initialSelectedJobId?: string;
}

export default function CareerApplicationsClient({
  initialApplications,
  jobs,
  initialSelectedJobId,
}: CareerApplicationsClientProps) {
  const router = useRouter();
  const [applications, setApplications] = useState<JobApplication[]>(
    initialApplications
  );
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ApplicationStatus>(
    'all'
  );
  const [jobFilter, setJobFilter] = useState<string>(
    initialSelectedJobId || 'all'
  );
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when search or filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, jobFilter]);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.phone.toLowerCase().includes(search.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || app.status === statusFilter;

    const matchesJob = jobFilter === 'all' || app.jobId === jobFilter;

    return matchesSearch && matchesStatus && matchesJob;
  });

  const totalItems = filteredApplications.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + pageSize
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStatusChange = async (
    id: string,
    newStatus: ApplicationStatus
  ) => {
    try {
      const res = await fetch(`/api/admin/careers/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (data.success) {
        setApplications((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        showToast('Đã cập nhật trạng thái hồ sơ thành công!');
        router.refresh();
      } else {
        alert(data.error || 'Có lỗi xảy ra khi cập nhật trạng thái');
      }
    } catch {
      alert('Không thể kết nối đến máy chủ');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedApp) return;

    try {
      setIsSavingNotes(true);
      const res = await fetch(
        `/api/admin/careers/applications/${selectedApp.id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: selectedApp.status,
            notes: editingNotes,
          }),
        }
      );
      const data = await res.json();

      if (data.success) {
        setApplications((prev) =>
          prev.map((a) =>
            a.id === selectedApp.id ? { ...a, notes: editingNotes } : a
          )
        );
        setSelectedApp((prev) =>
          prev ? { ...prev, notes: editingNotes } : null
        );
        showToast('Đã lưu ghi chú tuyển dụng!');
      } else {
        alert(data.error || 'Có lỗi xảy ra khi lưu ghi chú');
      }
    } catch {
      alert('Không thể kết nối đến máy chủ');
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc muốn xoá hồ sơ ứng tuyển của "${name}"?`)) {
      return;
    }

    try {
      setIsDeleting(id);
      const res = await fetch(`/api/admin/careers/applications/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
        if (selectedApp?.id === id) {
          setSelectedApp(null);
        }
        showToast('Đã xoá hồ sơ ứng tuyển thành công!');
        router.refresh();
      } else {
        alert(data.error || 'Có lỗi xảy ra khi xoá hồ sơ');
      }
    } catch {
      alert('Không thể kết nối đến máy chủ');
    } finally {
      setIsDeleting(null);
    }
  };

  const openDetailModal = (app: JobApplication) => {
    setSelectedApp(app);
    setEditingNotes(app.notes || '');
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending':
        return <Badge label="Chờ duyệt" variant="neutral" />;
      case 'reviewing':
        return <Badge label="Đang xem xét" variant="info" />;
      case 'interview':
        return <Badge label="Phỏng vấn" variant="warning" />;
      case 'offered':
        return <Badge label="Trúng tuyển" variant="success" />;
      case 'rejected':
        return <Badge label="Chưa phù hợp" variant="error" />;
      default:
        return <Badge label={status} variant="neutral" />;
    }
  };

  // Stats calculation
  const totalCount = applications.length;
  const pendingCount = applications.filter((a) => a.status === 'pending').length;
  const reviewingCount = applications.filter(
    (a) => a.status === 'reviewing'
  ).length;
  const interviewCount = applications.filter(
    (a) => a.status === 'interview'
  ).length;
  const offeredCount = applications.filter((a) => a.status === 'offered').length;

  return (
    <div className="space-y-6 font-open-sans w-full pb-12">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Hồ sơ ứng tuyển đã nhận
            </h1>
            <Badge label={`${applications.length} hồ sơ`} variant="neutral" />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Toàn bộ các đơn ứng tuyển và CV do ứng viên gửi về hệ thống
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            label="Quản lý tin tuyển dụng"
            variant="secondary"
            href="/admin/careers"
          />
          <Button
            label="Thử nghiệm gửi form mới"
            variant="primary"
            href="/admin/careers/form-preview"
          />
        </div>
      </div>

      {/* =========================================================================
          APPLICATION METRICS (Astryx Cards - 5 Pipelines)
          ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div
          onClick={() => setStatusFilter('all')}
          className={`cursor-pointer rounded-2xl p-4 border transition-all ${
            statusFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
          }`}
        >
          <span
            className={`text-xs font-bold block ${
              statusFilter === 'all' ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Tất cả hồ sơ
          </span>
          <span className="text-2xl font-extrabold mt-1 block">
            {totalCount}
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('pending')}
          className={`cursor-pointer rounded-2xl p-4 border transition-all ${
            statusFilter === 'pending'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300'
          }`}
        >
          <span
            className={`text-xs font-bold block ${
              statusFilter === 'pending' ? 'text-emerald-100' : 'text-slate-500'
            }`}
          >
            Mới / Chờ duyệt
          </span>
          <span className="text-2xl font-extrabold mt-1 block text-emerald-600">
            {pendingCount}
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('reviewing')}
          className={`cursor-pointer rounded-2xl p-4 border transition-all ${
            statusFilter === 'reviewing'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300'
          }`}
        >
          <span
            className={`text-xs font-bold block ${
              statusFilter === 'reviewing' ? 'text-blue-100' : 'text-slate-500'
            }`}
          >
            Đang xem xét
          </span>
          <span className="text-2xl font-extrabold mt-1 block text-blue-600">
            {reviewingCount}
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('interview')}
          className={`cursor-pointer rounded-2xl p-4 border transition-all ${
            statusFilter === 'interview'
              ? 'bg-amber-500 text-white border-amber-500 shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-amber-300'
          }`}
        >
          <span
            className={`text-xs font-bold block ${
              statusFilter === 'interview' ? 'text-amber-100' : 'text-slate-500'
            }`}
          >
            Mời phỏng vấn
          </span>
          <span className="text-2xl font-extrabold mt-1 block text-amber-600">
            {interviewCount}
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('offered')}
          className={`cursor-pointer rounded-2xl p-4 border transition-all ${
            statusFilter === 'offered'
              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-purple-300'
          }`}
        >
          <span
            className={`text-xs font-bold block ${
              statusFilter === 'offered' ? 'text-purple-100' : 'text-slate-500'
            }`}
          >
            Đã Offer / Đạt
          </span>
          <span className="text-2xl font-extrabold mt-1 block text-purple-600">
            {offeredCount}
          </span>
        </div>
      </div>

      {/* =========================================================================
          FILTERS & SEARCH
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên ứng viên, email, số điện thoại, vị trí..."
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

          {/* Job Filter */}
          <div className="md:col-span-3">
            <Selector
              label="Lọc theo vị trí tuyển dụng"
              isLabelHidden
              value={jobFilter}
              onChange={(val) => setJobFilter(val)}
              options={[
                { value: 'all', label: 'Tất cả vị trí tuyển dụng' },
                ...jobs.map((j) => ({ value: j.id, label: j.title })),
              ]}
            />
          </div>

          {/* Status filter */}
          <div className="md:col-span-3">
            <Selector
              label="Lọc theo trạng thái"
              isLabelHidden
              value={statusFilter}
              onChange={(val) =>
                setStatusFilter(val as 'all' | ApplicationStatus)
              }
              options={[
                { value: 'all', label: 'Tất cả trạng thái' },
                { value: 'pending', label: 'Chờ duyệt (Pending)' },
                { value: 'reviewing', label: 'Đang xem xét (Reviewing)' },
                { value: 'interview', label: 'Mời phỏng vấn (Interview)' },
                { value: 'offered', label: 'Trúng tuyển (Offered)' },
                { value: 'rejected', label: 'Chưa phù hợp (Rejected)' },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* =========================================================================
          APPLICATIONS TABLE
          ========================================================================= */}
      {filteredApplications.length === 0 ? (
        <Card variant="default" className="rounded-2xl p-12 text-center">
          <EmptyState
            icon={<AlertCircle className="w-8 h-8 text-slate-400" />}
            title="Chưa có hồ sơ ứng tuyển nào phù hợp"
            description="Hãy thử bỏ lọc hoặc điền mẫu form ứng tuyển để kiểm tra dữ liệu gửi về."
            actions={
              <Button
                label="Mở Form ứng tuyển để gửi thử"
                variant="primary"
                href="/admin/careers/form-preview"
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
                  <th className="py-3.5 px-4 sm:px-6">Ứng viên</th>
                  <th className="py-3.5 px-4">Vị trí ứng tuyển</th>
                  <th className="py-3.5 px-4">Tệp CV</th>
                  <th className="py-3.5 px-4">Lương kỳ vọng</th>
                  <th className="py-3.5 px-4">Ngày nộp</th>
                  <th className="py-3.5 px-4">Trạng thái hồ sơ</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                    onClick={() => openDetailModal(app)}
                  >
                    {/* Candidate Name & Contact */}
                    <td className="py-4 px-4 sm:px-6 max-w-xs">
                      <span className="font-bold text-slate-900 block text-sm group-hover:text-emerald-700 transition-colors">
                        {app.fullName}
                      </span>
                      <div className="text-xs text-slate-500 mt-0.5">
                        <span>{app.email}</span> • <span>{app.phone}</span>
                      </div>
                    </td>

                    {/* Job Title */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-800 line-clamp-1">
                        {app.jobTitle}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Mã: {app.jobId}
                      </span>
                    </td>

                    {/* CV Link using Astryx Button */}
                    <td
                      className="py-4 px-4 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        label="Xem CV"
                        variant="secondary"
                        size="sm"
                        href={app.cvUrl}
                        target="_blank"
                      />
                    </td>

                    {/* Salary & Experience */}
                    <td className="py-4 px-4">
                      <span className="font-semibold text-slate-800 block">
                        {app.expectedSalary || 'Thỏa thuận'}
                      </span>
                      {app.experienceYears && (
                        <span className="text-xs text-slate-400 block mt-0.5">
                          {app.experienceYears} kinh nghiệm
                        </span>
                      )}
                    </td>

                    {/* Submission Date */}
                    <td className="py-4 px-4 text-slate-500">
                      <span className="block font-medium">
                        {new Date(app.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(app.createdAt).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </td>

                    {/* Status inline selector */}
                    <td
                      className="py-4 px-4 whitespace-nowrap min-w-[160px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Selector
                        label="Trạng thái ứng viên"
                        isLabelHidden
                        size="sm"
                        value={app.status}
                        onChange={(val) =>
                          handleStatusChange(
                            app.id,
                            val as ApplicationStatus
                          )
                        }
                        options={[
                          { value: 'pending', label: 'Chờ duyệt' },
                          { value: 'reviewing', label: 'Đang xem xét' },
                          { value: 'interview', label: 'Mời phỏng vấn' },
                          { value: 'offered', label: 'Trúng tuyển' },
                          { value: 'rejected', label: 'Chưa phù hợp' },
                        ]}
                      />
                    </td>

                    {/* Actions */}
                    <td
                      className="py-4 px-4 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
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
                              label: 'Xem chi tiết hồ sơ',
                              onClick: () => openDetailModal(app),
                            },
                            ...(app.cvUrl
                              ? [
                                  {
                                    label: 'Mở CV / Portfolio',
                                    onClick: () =>
                                      window.open(app.cvUrl, '_blank'),
                                  },
                                ]
                              : []),
                            {
                              label: 'Xóa hồ sơ ứng viên',
                              variant: 'destructive',
                              isDisabled: isDeleting === app.id,
                              onClick: () =>
                                handleDelete(app.id, app.fullName),
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
                Hiển thị {startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)} trong tổng số {totalItems} hồ sơ ứng tuyển
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

      {/* =========================================================================
          APPLICATION DETAIL MODAL
          ========================================================================= */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-6 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {selectedApp.fullName}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Vị trí ứng tuyển: <strong className="text-emerald-700">{selectedApp.jobTitle}</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact & Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50 p-4 rounded-2xl text-xs">
              <div className="text-slate-700">
                <span className="text-slate-400 block text-[11px]">Email liên hệ:</span>
                <span className="font-semibold text-slate-900">{selectedApp.email}</span>
              </div>
              <div className="text-slate-700">
                <span className="text-slate-400 block text-[11px]">Số điện thoại:</span>
                <span className="font-semibold text-slate-900">{selectedApp.phone}</span>
              </div>
              <div className="text-slate-700">
                <span className="text-slate-400 block text-[11px]">Mức lương kỳ vọng:</span>
                <span className="font-semibold text-slate-900">{selectedApp.expectedSalary || 'Thỏa thuận'}</span>
              </div>
              <div className="text-slate-700">
                <span className="text-slate-400 block text-[11px]">Ngày có thể nhận việc:</span>
                <span className="font-semibold text-slate-900">{selectedApp.startDate || 'Ngay khi có thông báo'}</span>
              </div>
            </div>

            {/* Links Section: CV & Portfolio using Astryx Button */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                label="Mở xem tệp CV đính kèm"
                variant="primary"
                href={selectedApp.cvUrl}
                target="_blank"
              />

              {selectedApp.portfolioUrl && (
                <Button
                  label="Trang Portfolio / LinkedIn"
                  variant="secondary"
                  href={selectedApp.portfolioUrl}
                  target="_blank"
                />
              )}
            </div>

            {/* Cover Letter */}
            {selectedApp.coverLetter && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Thư giới thiệu / Lý do ứng tuyển:
                </label>
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedApp.coverLetter}
                </div>
              </div>
            )}

            {/* Status Selector & Internal HR Notes */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div>
                <Selector
                  label="Trạng thái đánh giá ứng viên"
                  value={selectedApp.status}
                  onChange={(val) =>
                    handleStatusChange(
                      selectedApp.id,
                      val as ApplicationStatus
                    )
                  }
                  options={[
                    { value: 'pending', label: 'Chờ duyệt (Pending)' },
                    { value: 'reviewing', label: 'Đang xem xét (Reviewing)' },
                    { value: 'interview', label: 'Mời phỏng vấn (Interview)' },
                    { value: 'offered', label: 'Trúng tuyển / Đạt (Offered)' },
                    { value: 'rejected', label: 'Chưa phù hợp (Rejected)' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Ghi chú nội bộ bộ phận HR / Tuyển dụng:
                </label>
                <textarea
                  rows={3}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Ghi lại nhận xét phỏng vấn, điểm mạnh/yếu, mức offer đề xuất..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  label="Xoá hồ sơ này"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(selectedApp.id, selectedApp.fullName)}
                />

                <Button
                  label="Lưu ghi chú nội bộ"
                  variant="primary"
                  size="sm"
                  isDisabled={isSavingNotes}
                  isLoading={isSavingNotes}
                  onClick={handleSaveNotes}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
