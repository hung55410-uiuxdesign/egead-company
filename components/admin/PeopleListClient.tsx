'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, X, Users, AlertCircle } from 'lucide-react';
import { AdminTeamMember, PeopleStats } from '@/lib/services/people.service';
import { Button, Badge, Card, EmptyState } from '@astryxdesign/core';
import { DEPARTMENTS } from '@/lib/validations/people';

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
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleGroupFilter, setRoleGroupFilter] = useState<'all' | 'leaders' | 'experts'>('all');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

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
      departmentFilter === 'all' || member.department === departmentFilter;

    const matchesStatus =
      statusFilter === 'all' || member.status === statusFilter;

    const matchesRoleGroup =
      roleGroupFilter === 'all' ||
      (roleGroupFilter === 'leaders' && member.isLeader) ||
      (roleGroupFilter === 'experts' && !member.isLeader);

    return matchesSearch && matchesDepartment && matchesStatus && matchesRoleGroup;
  });

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa nhân sự "${name}"? Hành động này cũng sẽ xóa sơ đồ tổ chức liên quan (nếu có).`)) {
      return;
    }

    try {
      setIsDeleting(id);
      const res = await fetch(`/api/admin/people/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        setMembers((prev) => {
          const next = prev.filter((m) => m.id !== id);
          const total = next.length;
          const leaders = next.filter((m) => m.isLeader).length;
          const published = next.filter((m) => m.status === 'published').length;
          setStats({
            total,
            leaders,
            experts: total - leaders,
            published,
          });
          return next;
        });
        router.refresh();
      } else {
        alert(data.error || 'Có lỗi xảy ra khi xóa nhân sự');
      }
    } catch {
      alert('Không thể kết nối đến máy chủ');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Quản lý Đội ngũ &amp; Nhân sự
            </h1>
            <Badge label={`${members.length} nhân sự`} variant="neutral" />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Toàn bộ danh sách ban lãnh đạo cấp cao, sơ đồ squads và chuyên gia chuyên trách E-GEAD
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            label="Sơ đồ tổ chức &amp; Squads"
            variant="secondary"
            href="/admin/people/hierarchy"
          />
          <Button
            label="Thêm nhân sự mới"
            variant="primary"
            href="/admin/people/new"
          />
        </div>
      </div>

      {/* =========================================================================
          KEY STATS ROW (Astryx Cards - pure text, no icons before text)
          ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <Card variant="default" className="rounded-2xl p-4 bg-white border border-slate-200/80">
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

        <Card variant="default" className="rounded-2xl p-4 bg-white border border-slate-200/80">
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

        <Card variant="default" className="rounded-2xl p-4 bg-white border border-slate-200/80">
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

        <Card variant="default" className="rounded-2xl p-4 bg-white border border-slate-200/80">
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
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo tên, chức danh, kỹ năng, địa điểm..."
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

          {/* Department filter */}
          <div className="md:col-span-3">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors font-medium"
            >
              <option value="all">Tất cả phòng ban</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors font-medium"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="published">Đang hiển thị (Published)</option>
              <option value="draft">Bản nháp (Draft)</option>
              <option value="archived">Lưu trữ (Archived)</option>
            </select>
          </div>
        </div>

        {/* Quick filter buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100 text-xs flex-wrap">
          <span className="text-slate-400 font-semibold text-xs">
            Phân loại:
          </span>
          <Button
            label={`Tất cả (${members.length})`}
            variant={roleGroupFilter === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setRoleGroupFilter('all')}
          />
          <Button
            label={`Lãnh đạo (${members.filter((m) => m.isLeader).length})`}
            variant={roleGroupFilter === 'leaders' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setRoleGroupFilter('leaders')}
          />
          <Button
            label={`Chuyên gia (${members.filter((m) => !m.isLeader).length})`}
            variant={roleGroupFilter === 'experts' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setRoleGroupFilter('experts')}
          />
        </div>
      </Card>

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
                <Button
                  label="Thêm nhân sự mới"
                  variant="primary"
                  href="/admin/people/new"
                />
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold">
                  <th className="py-3.5 px-4">Thành viên</th>
                  <th className="py-3.5 px-4">Khối phòng ban</th>
                  <th className="py-3.5 px-4">Phân loại</th>
                  <th className="py-3.5 px-4">Địa điểm</th>
                  <th className="py-3.5 px-4 text-center">Thứ tự</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Name & Avatar */}
                    <td className="py-3.5 px-4">
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
                      <Badge label={member.department} variant="neutral" />
                    </td>

                    {/* Classification */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {member.isLeader ? (
                        <Badge label="Lãnh đạo" variant="purple" />
                      ) : (
                        <Badge label="Chuyên gia" variant="blue" />
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
                      {member.status === 'published' ? (
                        <Badge label="Đang hiển thị" variant="success" />
                      ) : member.status === 'draft' ? (
                        <Badge label="Bản nháp" variant="warning" />
                      ) : (
                        <Badge label="Lưu trữ" variant="neutral" />
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {member.isLeader && (
                          <Button
                            label="Sơ đồ"
                            variant="secondary"
                            size="sm"
                            href={`/admin/people/hierarchy?leaderId=${member.id}`}
                          />
                        )}
                        <Button
                          label="Chỉnh sửa"
                          variant="secondary"
                          size="sm"
                          href={`/admin/people/${member.id}`}
                        />
                        <Button
                          label={isDeleting === member.id ? 'Đang xóa...' : 'Xóa'}
                          variant="destructive"
                          size="sm"
                          isDisabled={isDeleting === member.id}
                          onClick={() => handleDelete(member.id, member.name)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
