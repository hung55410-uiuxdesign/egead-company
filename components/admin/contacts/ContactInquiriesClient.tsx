'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import {
  ContactInquiry,
  ContactInquiryStatus,
} from '@/types/contact';
import {
  Button,
  Badge,
  Card,
  EmptyState,
  Selector,
  Pagination,
  TextInput,
  TextArea,
} from '@astryxdesign/core';
import { useContactInquiryMutations } from '@/lib/hooks';

interface ContactInquiriesClientProps {
  initialInquiries: ContactInquiry[];
}

const REGION_OPTIONS = [
  { value: 'all', label: 'Tất cả khu vực' },
  { value: 'Vietnam', label: 'Vietnam' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Hong Kong', label: 'Hong Kong' },
  { value: 'South Korea', label: 'South Korea' },
  { value: 'India', label: 'India' },
  { value: 'United States / Americas', label: 'United States / Americas' },
  { value: 'Europe / Global', label: 'Europe / Global' },
  { value: 'Other', label: 'Khác (Other)' },
];

export default function ContactInquiriesClient({
  initialInquiries,
}: ContactInquiriesClientProps) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(initialInquiries);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ContactInquiryStatus>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [editingNotes, setEditingNotes] = useState('');

  const {
    updateStatus,
    isUpdatingStatus,
    saveNotes,
    isSavingNotes,
    deleteInquiry,
    isDeleting,
  } = useContactInquiryMutations({
    onStatusChangeSuccess: (id, newStatus) => {
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    },
    onSaveNotesSuccess: (id, notes) => {
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, notes } : item))
      );
      setSelectedInquiry((prev) => (prev ? { ...prev, notes } : null));
    },
    onDeleteSuccess: (id) => {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    },
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, regionFilter]);

  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.fullName.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      (item.phone && item.phone.toLowerCase().includes(search.toLowerCase())) ||
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || item.status === statusFilter;

    const matchesRegion =
      regionFilter === 'all' || item.region === regionFilter;

    return matchesSearch && matchesStatus && matchesRegion;
  });

  const totalItems = filteredInquiries.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedInquiries = filteredInquiries.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  const handleStatusChange = (id: string, status: ContactInquiryStatus) => {
    const item = inquiries.find((i) => i.id === id);
    updateStatus({
      id,
      status,
      clientName: item?.fullName,
    });
  };

  const handleSaveNotes = () => {
    if (!selectedInquiry) return;
    saveNotes({
      id: selectedInquiry.id,
      notes: editingNotes,
      status: selectedInquiry.status,
      clientName: selectedInquiry.fullName,
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xoá yêu cầu liên hệ từ "${name}"?`)) {
      return;
    }
    deleteInquiry({ id, clientName: name });
  };

  const openDetailModal = (item: ContactInquiry) => {
    setSelectedInquiry(item);
    setEditingNotes(item.notes || '');
  };

  const getStatusBadge = (status: ContactInquiryStatus) => {
    switch (status) {
      case 'new':
        return <Badge label="Mới nhận" variant="info" className="h-8 px-4" />;
      case 'contacted':
        return <Badge label="Đã liên hệ" variant="warning" className="h-8 px-4" />;
      case 'resolved':
        return <Badge label="Đã xử lý" variant="success" className="h-8 px-4" />;
      case 'archived':
        return <Badge label="Lưu trữ" variant="neutral" className="h-8 px-4" />;
      default:
        return <Badge label={status} variant="neutral" className="h-8 px-4" />;
    }
  };

  // Metrics
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === 'new').length;
  const contactedCount = inquiries.filter((i) => i.status === 'contacted').length;
  const resolvedCount = inquiries.filter((i) => i.status === 'resolved').length;
  const archivedCount = inquiries.filter((i) => i.status === 'archived').length;

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6 font-open-sans w-full pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Yêu cầu liên hệ &amp; tư vấn
            </h1>
            <Badge
              label={`${inquiries.length} liên hệ`}
              variant="neutral"
              className="h-8 px-4"
            />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Thông tin khách hàng doanh nghiệp và đối tác gửi yêu cầu qua form Contact Us
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            label="Xem trang Contact Us"
            variant="secondary"
            href="/contact-us"
            target="_blank"
            className="h-10 px-4"
          />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div
          onClick={() => setStatusFilter('all')}
          className={`cursor-pointer rounded-2xl p-4 border transition-all ${statusFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
        >
          <span
            className={`text-xs font-bold block ${statusFilter === 'all' ? 'text-slate-300' : 'text-slate-500'
              }`}
          >
            Tất cả yêu cầu
          </span>
          <span className="text-2xl font-extrabold mt-1 block">
            {totalCount}
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('new')}
          className={`cursor-pointer rounded-2xl p-4 border transition-all ${statusFilter === 'new'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
        >
          <span
            className={`text-xs font-bold block ${statusFilter === 'new' ? 'text-blue-100' : 'text-slate-500'
              }`}
          >
            Mới nhận
          </span>
          <span className="text-2xl font-extrabold mt-1 block">
            {newCount}
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('contacted')}
          className={`cursor-pointer rounded-2xl p-4 border transition-all ${statusFilter === 'contacted'
              ? 'bg-amber-600 text-white border-amber-600 shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
        >
          <span
            className={`text-xs font-bold block ${statusFilter === 'contacted' ? 'text-amber-100' : 'text-slate-500'
              }`}
          >
            Đã liên hệ
          </span>
          <span className="text-2xl font-extrabold mt-1 block">
            {contactedCount}
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('resolved')}
          className={`cursor-pointer rounded-2xl p-4 border transition-all ${statusFilter === 'resolved'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
        >
          <span
            className={`text-xs font-bold block ${statusFilter === 'resolved' ? 'text-emerald-100' : 'text-slate-500'
              }`}
          >
            Đã xử lý
          </span>
          <span className="text-2xl font-extrabold mt-1 block">
            {resolvedCount}
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('archived')}
          className={`cursor-pointer rounded-2xl p-4 border transition-all ${statusFilter === 'archived'
              ? 'bg-slate-700 text-white border-slate-700 shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
        >
          <span
            className={`text-xs font-bold block ${statusFilter === 'archived' ? 'text-slate-300' : 'text-slate-500'
              }`}
          >
            Lưu trữ
          </span>
          <span className="text-2xl font-extrabold mt-1 block">
            {archivedCount}
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <Card variant="default" className="p-4 sm:p-5 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
          <div className="sm:col-span-6">
            <TextInput
              label="Tìm kiếm liên hệ"
              isLabelHidden
              value={search}
              onChange={setSearch}
              placeholder="Tìm theo tên khách hàng, email, công ty, nội dung..."
              hasClear
              width="100%"
              className='h-10 border'
            />
          </div>

          <div className="sm:col-span-4">
            <Selector
              label="Lọc theo khu vực"
              isLabelHidden
              value={regionFilter}
              onChange={(val) => setRegionFilter(val)}
              options={REGION_OPTIONS}
              width="100%"
              className="h-10 border"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            {(search || statusFilter !== 'all' || regionFilter !== 'all') && (
              <Button
                label="Đặt lại bộ lọc"
                variant="secondary"
                onClick={() => {
                  setSearch('');
                  setStatusFilter('all');
                  setRegionFilter('all');
                }}
                className="h-10 px-3 w-full sm:w-auto"
              />
            )}
          </div>
        </div>
      </Card>

      {/* Inquiries Table */}
      <Card variant="default" className="rounded-2xl overflow-hidden border border-slate-200">
        {filteredInquiries.length === 0 ? (
          <div className="p-12">
            <EmptyState
              title="Không tìm thấy yêu cầu liên hệ nào"
              description={
                search || statusFilter !== 'all' || regionFilter !== 'all'
                  ? 'Thử thay đổi từ khoá tìm kiếm hoặc đặt lại các bộ lọc hiện tại.'
                  : 'Hiện chưa có yêu cầu liên hệ nào được gửi từ khách hàng.'
              }
              actions={
                search || statusFilter !== 'all' || regionFilter !== 'all' ? (
                  <Button
                    label="Xoá bộ lọc"
                    variant="primary"
                    onClick={() => {
                      setSearch('');
                      setStatusFilter('all');
                      setRegionFilter('all');
                    }}
                    className="h-10 px-4 mt-3"
                  />
                ) : undefined
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-xs text-slate-500 font-semibold">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Khách hàng</th>
                  <th className="py-3.5 px-4">Doanh nghiệp</th>
                  <th className="py-3.5 px-4">Khu vực</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Lời nhắn</th>
                  <th className="py-3.5 px-4">Ngày gửi</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedInquiries.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                    onClick={() => openDetailModal(item)}
                  >
                    {/* Khách hàng */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-slate-900">
                        {item.fullName}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {item.email}
                      </div>
                      {item.phone && (
                        <div className="text-xs text-slate-400 mt-0.5">
                          {item.phone}
                        </div>
                      )}
                    </td>

                    {/* Doanh nghiệp */}
                    <td className="py-4 px-4 font-medium text-slate-900">
                      {item.company || <span className="text-slate-400 font-normal">Cá nhân</span>}
                    </td>

                    {/* Khu vực */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                        {item.region}
                      </span>
                    </td>

                    {/* Lời nhắn */}
                    <td className="py-4 px-4 hidden md:table-cell max-w-xs truncate text-xs text-slate-600">
                      {item.message}
                    </td>

                    {/* Ngày gửi */}
                    <td className="py-4 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {formatDate(item.createdAt)}
                    </td>

                    {/* Trạng thái */}
                    <td className="py-4 px-4">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Thao tác */}
                    <td
                      className="py-4 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        label="Chi tiết"
                        variant="secondary"
                        onClick={() => openDetailModal(item)}
                        className="h-8 px-3 text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalItems > pageSize && (
          <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Hiển thị {(safeCurrentPage - 1) * pageSize + 1} -{' '}
              {Math.min(safeCurrentPage * pageSize, totalItems)} trong tổng số{' '}
              {totalItems} yêu cầu
            </span>

            <Pagination
              page={safeCurrentPage}
              totalItems={totalItems}
              pageSize={pageSize}
              pageSizeOptions={[10, 20, 50]}
              onChange={(p: number) => setCurrentPage(p)}
              onPageSizeChange={(newSize: number) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
              variant="pages"
              size="sm"
            />
          </div>
        )}
      </Card>

      {/* DETAIL MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-6 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {selectedInquiry.fullName}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Doanh nghiệp:{' '}
                  <strong className="text-emerald-700">
                    {selectedInquiry.company || 'Cá nhân'}
                  </strong>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact & Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50 p-4 rounded-2xl text-xs">
              <div className="text-slate-700">
                <span className="text-slate-400 block text-[11px]">Email liên hệ:</span>
                <span className="font-semibold text-slate-900">{selectedInquiry.email}</span>
              </div>
              <div className="text-slate-700">
                <span className="text-slate-400 block text-[11px]">Số điện thoại:</span>
                <span className="font-semibold text-slate-900">
                  {selectedInquiry.phone || 'Chưa cung cấp'}
                </span>
              </div>
              <div className="text-slate-700">
                <span className="text-slate-400 block text-[11px]">Khu vực / Quốc gia:</span>
                <span className="font-semibold text-slate-900">{selectedInquiry.region}</span>
              </div>
              <div className="text-slate-700">
                <span className="text-slate-400 block text-[11px]">Thời gian gửi yêu cầu:</span>
                <span className="font-semibold text-slate-900">
                  {formatDate(selectedInquiry.createdAt)}
                </span>
              </div>
            </div>

            {/* Direct Action Links */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                label="Gửi email phản hồi"
                variant="primary"
                href={`mailto:${selectedInquiry.email}?subject=E-GEAD%20-%20Ph%E1%BA%A3n%20h%E1%BB%93i%20y%C3%AAu%20c%E1%BA%A7u%20t%C6%B0%20v%E1%BA%A5n`}
                className="h-10 px-4"
              />

              {selectedInquiry.phone && (
                <Button
                  label="Gọi điện trực tiếp"
                  variant="secondary"
                  href={`tel:${selectedInquiry.phone.replace(/\s+/g, '')}`}
                  className="h-10 px-4"
                />
              )}
            </div>

            {/* Inquiry Message */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 block">
                Nội dung yêu cầu / Lời nhắn từ khách hàng:
              </label>
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status Selector & Internal Notes */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div>
                <Selector
                  label="Trạng thái xử lý yêu cầu"
                  value={selectedInquiry.status}
                  className="h-10 border"
                  onChange={(val) =>
                    handleStatusChange(
                      selectedInquiry.id,
                      val as ContactInquiryStatus
                    )
                  }
                  options={[
                    { value: 'new', label: 'Mới nhận (New)' },
                    { value: 'contacted', label: 'Đã liên hệ (Contacted)' },
                    { value: 'resolved', label: 'Đã xử lý (Resolved)' },
                    { value: 'archived', label: 'Lưu trữ (Archived)' },
                  ]}
                />
              </div>

              <TextArea
                label="Ghi chú nội bộ"
                rows={3}
                value={editingNotes}
                onChange={setEditingNotes}
                placeholder="Ghi chú về tiến độ trao đổi, giải pháp tư vấn, nhu cầu ngân sách của khách hàng..."
                width="100%"
                className="border"
              />

              <div className="flex items-center justify-between pt-2">
                <Button
                  label="Xoá yêu cầu này"
                  variant="secondary"
                  onClick={() =>
                    handleDelete(selectedInquiry.id, selectedInquiry.fullName)
                  }
                  className="h-10 px-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                />

                <div className="flex items-center gap-2">
                  <Button
                    label="Lưu ghi chú"
                    variant="primary"
                    isDisabled={isSavingNotes}
                    onClick={handleSaveNotes}
                    className="h-10 px-4"
                  />
                  <Button
                    label="Đóng"
                    variant="secondary"
                    onClick={() => setSelectedInquiry(null)}
                    className="h-10 px-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
