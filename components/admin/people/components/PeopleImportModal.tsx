'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle2,
  X,
  Download,
  Trash2,
  FileJson,
  UserCheck,
} from 'lucide-react';
import { Button, Badge, Card, useToast } from '@astryxdesign/core';
import { useImportPeopleMutation } from '@/lib/hooks/usePeopleMutations';
import type { AdminTeamMember } from '@/lib/services/people.service';

export const SAMPLE_PEOPLE_JSON = [
  {
    name: 'Alexandre Nguyễn',
    role: 'Chief Executive Officer & Founder',
    department: 'Executive Leadership',
    location: 'Singapore / Global',
    quote: 'Xây dựng hệ sinh thái thương mại và chuỗi cung ứng số toàn cầu chuẩn quốc tế.',
    image: '/assets/team/alexandre.jpg',
    linkedin: 'https://linkedin.com/in/alexandre-nguyen',
    bio: 'Hơn 15 năm kinh nghiệm dẫn dắt các nền tảng thương mại điện tử xuyên biên giới và giải pháp vận hành công nghệ quy mô lớn.',
    skills: ['Executive Strategy', 'Global E-Commerce', 'Venture Scaling', 'M&A'],
    isLeader: true,
    order: 1,
    status: 'published',
  },
  {
    name: 'David Trần',
    role: 'Head of Technology & AI Engineering',
    department: 'Technology & AI',
    location: 'Tokyo, Japan',
    quote: 'Tự động hóa chuỗi hoàn tất đơn hàng với trí tuệ nhân tạo và hệ thống vận hành thời gian thực.',
    image: '/assets/team/david.jpg',
    linkedin: 'https://linkedin.com/in/david-tran',
    bio: 'Chuyên gia kiến trúc hệ thống phân tán, WMS kho bãi thông minh và nền tảng đám mây chịu tải cao cho thương mại đa sàn.',
    skills: ['Cloud Architecture', 'Distributed Systems', 'WMS Tech', 'Microservices'],
    isLeader: true,
    order: 2,
    status: 'published',
  },
  {
    name: 'Linh Hoàng',
    role: 'Senior Growth & Commerce Strategist',
    department: 'Commerce & Solutions',
    location: 'Ho Chi Minh City, Vietnam',
    quote: 'Tối ưu hóa bán lẻ đa kênh và thúc đẩy tăng trưởng mạnh mẽ trên TikTok Shop US.',
    image: '/assets/team/linh.jpg',
    linkedin: 'https://linkedin.com/in/linh-hoang',
    bio: 'Phụ trách chiến lược niêm yết sản phẩm, ươm mầm thương hiệu và mở rộng doanh thu trên các sàn TMĐT quốc tế.',
    skills: ['TikTok Shop Ops', 'Marketplace Scaling', 'Omnichannel Commerce', 'Data Analytics'],
    isLeader: false,
    order: 3,
    status: 'published',
  },
  {
    name: 'Marcus Vũ',
    role: 'Head of Fulfillment & Logistics',
    department: 'Fulfillment & Operations',
    location: 'Los Angeles, USA',
    quote: 'Chuỗi cung ứng xuyên biên giới với cam kết giao hàng chuẩn SLA và kiểm soát thất thoát tuyệt đối.',
    image: '/assets/team/marcus.jpg',
    linkedin: 'https://linkedin.com/in/marcus-vu',
    bio: 'Quản lý hạ tầng kho vận tại Mỹ, chuẩn hóa quy trình xuất nhập khẩu và kết nối trực tiếp với mạng lưới bưu chính quốc tế.',
    skills: ['US Fulfillment', 'Logistics SLA', 'Supply Chain', 'Customs Clearance'],
    isLeader: true,
    order: 4,
    status: 'published',
  },
];

interface PeopleImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newItems: AdminTeamMember[]) => void;
}

export default function PeopleImportModal({
  isOpen,
  onClose,
  onSuccess,
}: PeopleImportModalProps) {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rawJson, setRawJson] = useState<string>('');
  const [onDuplicate, setOnDuplicate] = useState<'create' | 'update' | 'skip'>(
    'create'
  );
  const [fileName, setFileName] = useState<string | null>(null);

  // TanStack Query Mutation
  const { mutateAsync: importPeopleAsync, isPending: isImporting } =
    useImportPeopleMutation({
      showToast: true,
      onSuccess: (data) => {
        onSuccess?.(data.items);
        handleClear();
        onClose();
      },
    });

  // Parse & Validation Memo
  const { parsedItems, parseError } = useMemo(() => {
    if (!rawJson.trim()) {
      return { parsedItems: [], parseError: null };
    }

    try {
      const parsed = JSON.parse(rawJson);
      const itemsArray = Array.isArray(parsed) ? parsed : [parsed];

      const validItems: any[] = [];
      for (let i = 0; i < itemsArray.length; i++) {
        const item = itemsArray[i];
        if (!item || typeof item !== 'object') {
          return {
            parsedItems: [],
            parseError: `Mục thứ ${i + 1} không phải là đối tượng JSON hợp lệ.`,
          };
        }
        if (!item.name || typeof item.name !== 'string' || !item.name.trim()) {
          return {
            parsedItems: [],
            parseError: `Mục thứ ${i + 1} thiếu trường "name" (họ và tên).`,
          };
        }
        validItems.push(item);
      }

      return { parsedItems: validItems, parseError: null };
    } catch (err: any) {
      return {
        parsedItems: [],
        parseError: `Cú pháp JSON chưa hợp lệ: ${err.message || 'Lỗi phân tích cú pháp'}`,
      };
    }
  }, [rawJson]);

  if (!isOpen) return null;

  // 1. Tải file JSON mẫu về máy
  const handleDownloadSample = () => {
    try {
      const jsonString = JSON.stringify(SAMPLE_PEOPLE_JSON, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mau_nhan_su_egead.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        body: 'Đã tải xuống file JSON mẫu thành công! Bạn có thể mở file để xem cấu trúc và nhập dữ liệu.',
        type: 'info',
        isAutoHide: true,
        autoHideDuration: 4000,
      });
    } catch (error) {
      console.error('Error downloading sample:', error);
      toast({
        body: 'Không thể tải file mẫu. Vui lòng thử lại.',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    }
  };

  // 2. Nạp dữ liệu mẫu vào ô soạn thảo
  const handleLoadSampleToEditor = () => {
    setRawJson(JSON.stringify(SAMPLE_PEOPLE_JSON, null, 2));
    setFileName('mau_nhan_su_egead.json');
    toast({
      body: `Đã nạp ${SAMPLE_PEOPLE_JSON.length} nhân sự mẫu vào khung soạn thảo. Bạn có thể bấm xác nhận hoặc chỉnh sửa thêm.`,
      type: 'info',
      isAutoHide: true,
      autoHideDuration: 3500,
    });
  };

  // 3. Xử lý tải file từ máy tính
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      toast({
        body: 'Vui lòng chọn file có định dạng .json',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 3500,
      });
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setRawJson(text || '');
      toast({
        body: `Đã đọc thành công file "${file.name}"`,
        type: 'info',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    };
    reader.onerror = () => {
      toast({
        body: 'Lỗi khi đọc file từ máy tính. Vui lòng thử lại.',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    setRawJson('');
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 4. Submit import dữ liệu
  const handleImportSubmit = async () => {
    if (parsedItems.length === 0) {
      toast({
        body: 'Vui lòng nạp hoặc dán dữ liệu JSON hợp lệ trước khi xác nhận.',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 3500,
      });
      return;
    }

    try {
      await importPeopleAsync({
        items: parsedItems,
        onDuplicate,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Thêm nhanh nhân sự (Import JSON)
                </h3>
                <Badge
                  label="Định dạng JSON"
                  variant="neutral"
                  className="h-6 px-2.5 text-[11px]"
                />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Thêm một hoặc nhiều nhân sự vào hệ thống cùng lúc từ file .json hoặc dán trực tiếp
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Quick Actions Bar */}
          <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-purple-900 block">
                Chưa có sẵn file dữ liệu nhân sự?
              </span>
              <span className="text-xs text-purple-700">
                Tải file JSON mẫu chuẩn cấu trúc của ban lãnh đạo và chuyên gia để chỉnh sửa và import nhanh
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                label="Tải file JSON mẫu"
                variant="secondary"
                onClick={handleDownloadSample}
                className="h-9 px-3 text-xs"
              />
              <Button
                label="Nạp dữ liệu mẫu nhanh"
                variant="primary"
                onClick={handleLoadSampleToEditor}
                className="h-9 px-3 text-xs bg-purple-600 hover:bg-purple-700 text-white"
              />
            </div>
          </div>

          {/* Upload Method 1: File Upload */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              Cách 1: Tải lên file .json từ máy tính
            </span>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`p-5 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition text-center ${
                fileName
                  ? 'border-purple-500 bg-purple-50/30'
                  : 'border-slate-200 hover:border-purple-400 hover:bg-slate-50/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={handleFileChange}
              />
              <Upload
                className={`w-7 h-7 mb-2 ${
                  fileName ? 'text-purple-600' : 'text-slate-400'
                }`}
              />
              {fileName ? (
                <div className="space-y-1">
                  <span className="text-xs font-bold text-purple-900 block">
                    Đã chọn: {fileName}
                  </span>
                  <span className="text-[11px] text-purple-600">
                    Bấm để chọn file khác thay thế
                  </span>
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800 block">
                    Bấm vào đây để chọn file .json từ thiết bị của bạn
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Hỗ trợ file JSON chứa một đối tượng hoặc mảng nhiều nhân sự
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Upload Method 2: Paste Raw JSON */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 block">
                Cách 2: Hoặc dán trực tiếp mã JSON vào đây
              </span>
              {rawJson && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa nội dung</span>
                </button>
              )}
            </div>
            <textarea
              rows={8}
              value={rawJson}
              onChange={(e) => setRawJson(e.target.value)}
              placeholder={`[\n  {\n    "name": "Alexandre Nguyễn",\n    "role": "Chief Executive Officer & Founder",\n    "department": "Executive Leadership",\n    "location": "Singapore / Global",\n    "image": "/assets/team/alexandre.jpg",\n    "bio": "Hơn 15 năm kinh nghiệm dẫn dắt các nền tảng thương mại...",\n    "skills": ["Executive Strategy", "Global E-Commerce"],\n    "isLeader": true,\n    "status": "published"\n  }\n]`}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-mono text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 leading-relaxed resize-y"
            />
          </div>

          {/* JSON Validation & Preview State */}
          {parseError ? (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-800">
                <span className="font-bold block">Phát hiện lỗi cú pháp:</span>
                <span>{parseError}</span>
              </div>
            </div>
          ) : parsedItems.length > 0 ? (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-emerald-900">
                    Dữ liệu JSON hợp lệ! Sẵn sàng import {parsedItems.length} nhân sự
                  </span>
                </div>
                <Badge
                  label={`${parsedItems.length} hồ sơ`}
                  variant="success"
                  className="h-6 px-2.5 text-[11px]"
                />
              </div>

              {/* Items Preview Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Họ và tên</th>
                      <th className="py-2.5 px-3">Chức danh / Vai trò</th>
                      <th className="py-2.5 px-3">Khối phòng ban</th>
                      <th className="py-2.5 px-3">Nhóm</th>
                      <th className="py-2.5 px-3">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {parsedItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-2 px-3 text-slate-400 font-mono">
                          {idx + 1}
                        </td>
                        <td className="py-2 px-3 font-semibold text-slate-900">
                          {item.name}
                        </td>
                        <td className="py-2 px-3 text-slate-600">
                          {item.role || '—'}
                        </td>
                        <td className="py-2 px-3 text-slate-600">
                          {item.department || 'Commerce & Solutions'}
                        </td>
                        <td className="py-2 px-3">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.isLeader
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {item.isLeader ? 'Lãnh đạo' : 'Chuyên gia'}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.status || 'published'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {/* Duplicate Strategy Option */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-slate-800 block">
              Xử lý khi nhân sự đã tồn tại (trùng Tên hoặc ID):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-white cursor-pointer hover:border-purple-400 transition">
                <input
                  type="radio"
                  name="onDuplicate"
                  value="create"
                  checked={onDuplicate === 'create'}
                  onChange={() => setOnDuplicate('create')}
                  className="accent-purple-600"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Tạo mới tất cả
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Thêm bản ghi mới độc lập
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-white cursor-pointer hover:border-purple-400 transition">
                <input
                  type="radio"
                  name="onDuplicate"
                  value="update"
                  checked={onDuplicate === 'update'}
                  onChange={() => setOnDuplicate('update')}
                  className="accent-purple-600"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Cập nhật (Ghi đè)
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Cập nhật lại thông tin mới
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-white cursor-pointer hover:border-purple-400 transition">
                <input
                  type="radio"
                  name="onDuplicate"
                  value="skip"
                  checked={onDuplicate === 'skip'}
                  onChange={() => setOnDuplicate('skip')}
                  className="accent-purple-600"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Bỏ qua
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Không ghi đè dữ liệu cũ
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/80">
          <div className="text-xs text-slate-500 font-medium">
            {parsedItems.length > 0 ? (
              <span>Đã sẵn sàng thêm {parsedItems.length} hồ sơ nhân sự</span>
            ) : (
              <span>Vui lòng tải file hoặc dán JSON để xem trước</span>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <Button
              label="Hủy bỏ"
              variant="secondary"
              onClick={onClose}
              className="h-10 px-4"
            />
            <Button
              label={
                isImporting
                  ? 'Đang nhập...'
                  : `Xác nhận import (${parsedItems.length})`
              }
              variant="primary"
              onClick={handleImportSubmit}
              isDisabled={isImporting || parsedItems.length === 0}
              className="h-10 px-5 bg-purple-600 hover:bg-purple-700 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
