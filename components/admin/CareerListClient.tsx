'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Trash2,
  X,
  AlertCircle,
} from 'lucide-react';
import { CareerPost, CareerStats } from '@/types/career';
import { Button, Badge, Card, EmptyState } from '@astryxdesign/core';

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
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'closed'>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      job.slug.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || job.status === statusFilter;

    const matchesDepartment =
      departmentFilter === 'all' || job.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xoá tin tuyển dụng: "${title}"?`)) {
      return;
    }

    try {
      setIsDeleting(id);
      const res = await fetch(`/api/admin/careers/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        setJobs((prev) => prev.filter((j) => j.id !== id));
        router.refresh();
      } else {
        alert(data.error || 'Có lỗi xảy ra khi xoá tin tuyển dụng');
      }
    } catch {
      alert('Không thể kết nối đến máy chủ');
    } finally {
      setIsDeleting(null);
    }
  };

  const getStatusBadge = (status: CareerPost['status']) => {
    switch (status) {
      case 'published':
        return <Badge label="Đang tuyển" variant="success" />;
      case 'draft':
        return <Badge label="Bản nháp" variant="neutral" />;
      case 'closed':
        return <Badge label="Đã đóng" variant="error" />;
      default:
        return <Badge label={status} variant="neutral" />;
    }
  };

  return (
    <div className="space-y-6 font-open-sans max-w-7xl mx-auto pb-12">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Quản lý tuyển dụng
            </h1>
            <Badge label={`${jobs.length} vị trí`} variant="neutral" />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Hệ thống đăng bài tuyển dụng, cấu hình biểu mẫu và quản lý hồ sơ ứng viên nộp về
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            label={`Hồ sơ ứng tuyển (${stats.totalApplications}${stats.pendingApplications > 0 ? ` - ${stats.pendingApplications} mới` : ''})`}
            variant="secondary"
            href="/admin/careers/applications"
          />
          <Button
            label="Biểu mẫu ứng tuyển"
            variant="secondary"
            href="/admin/careers/form-preview"
          />
          <Button
            label="Đăng tin tuyển dụng mới"
            variant="primary"
            href="/admin/careers/new"
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
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm vị trí tuyển dụng, phòng ban, địa điểm, từ khóa..."
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

          {/* Status filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as 'all' | 'published' | 'draft' | 'closed'
                )
              }
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors font-medium"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="published">Đang mở tuyển (Published)</option>
              <option value="draft">Bản nháp (Draft)</option>
              <option value="closed">Đã đóng tuyển (Closed)</option>
            </select>
          </div>

          {/* Department filter */}
          <div className="md:col-span-3">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors font-medium"
            >
              <option value="all">Tất cả phòng ban</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter tags info */}
        {(statusFilter !== 'all' ||
          departmentFilter !== 'all' ||
          search) && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span>
              Tìm thấy <strong className="text-slate-800">{filteredJobs.length}</strong> kết quả phù hợp
            </span>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
                setDepartmentFilter('all');
              }}
              className="text-emerald-700 hover:underline font-semibold"
            >
              Xoá bộ lọc
            </button>
          </div>
        )}
      </Card>

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
                  <th className="py-3.5 px-4 sm:px-6">Vị trí tuyển dụng</th>
                  <th className="py-3.5 px-4">Phòng ban</th>
                  <th className="py-3.5 px-4">Địa điểm &amp; Loại hình</th>
                  <th className="py-3.5 px-4">Mức lương &amp; Hạn nộp</th>
                  <th className="py-3.5 px-4 text-center">Hồ sơ ứng tuyển</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Job Title & Slug */}
                    <td className="py-4 px-4 sm:px-6 max-w-xs sm:max-w-md">
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
                            <Badge label="Nổi bật" variant="warning" />
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-4 px-4">
                      <Badge label={job.department} variant="neutral" />
                    </td>

                    {/* Location & Type */}
                    <td className="py-4 px-4 text-slate-700">
                      <span className="font-semibold block">{job.location}</span>
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
                          variant={job.applicationsCount > 0 ? 'success' : 'neutral'}
                        />
                      </Link>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      {getStatusBadge(job.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          label="Form"
                          variant="secondary"
                          size="sm"
                          href={`/admin/careers/form-preview?jobId=${job.id}`}
                        />
                        <Button
                          label="Chỉnh sửa"
                          variant="secondary"
                          size="sm"
                          href={`/admin/careers/${job.id}`}
                        />
                        <Button
                          label="Xoá"
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          icon={<Trash2 className="w-3.5 h-3.5 text-red-500" />}
                          isDisabled={isDeleting === job.id}
                          onClick={() => handleDelete(job.id, job.title)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
