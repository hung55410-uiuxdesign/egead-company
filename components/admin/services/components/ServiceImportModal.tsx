'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Button, Badge, Card, useToast } from '@astryxdesign/core';
import { useImportServicesMutation } from '@/lib/hooks';

export const SAMPLE_SERVICES_JSON = [
  {
    title: 'Enterprise Digital Commerce & Platform Engineering',
    slug: 'enterprise-digital-commerce',
    category: 'service',
    tagline: 'Nền tảng thương mại điện tử cấp doanh nghiệp với kiến trúc microservices hiện đại',
    subtitle: 'Xây dựng và vận hành giải pháp thương mại quy mô lớn chuẩn quốc tế',
    heroImage: '/assets/solution_smartcommerce.png',
    middleImage: '/assets/insight_dtf_tech.jpg',
    overviewSubTitle: 'TỔNG QUAN GIẢI PHÁP',
    overviewHeading: 'Đồng bộ hạ tầng đa kênh xuyên biên giới',
    overviewParagraphs: [
      'Hệ thống thương mại số hiện đại cho phép kết nối linh hoạt giữa ERP, WMS kho bãi và các sàn thương mại điện tử lớn.',
      'Đảm bảo tốc độ xử lý hàng chục ngàn giao dịch mỗi giây trong các đợt flash sale cao điểm không bị gián đoạn.'
    ],
    approachHeading: 'Phương pháp tiếp cận chuyên sâu',
    approachIntro: 'Quy trình triển khai 4 giai đoạn chuẩn quốc tế từ nghiên cứu kiến trúc đến go-live và tối ưu hóa liên tục.',
    principles: [
      {
        title: 'Kiến trúc Modular mở rộng',
        description: 'Tách biệt frontend và backend (Headless Architecture) giúp nâng cấp giao diện mà không ảnh hưởng luồng dữ liệu trung tâm.'
      },
      {
        title: 'Bảo mật và chuẩn hóa dữ liệu',
        description: 'Bảo vệ dữ liệu khách hàng và giao dịch theo các tiêu chuẩn quốc tế nghiêm ngặt nhất.'
      }
    ],
    order: 14,
    status: 'published'
  },
  {
    title: 'Logistics & Supply Chain Operations',
    slug: 'logistics-supply-chain',
    category: 'industry',
    tagline: 'Tối ưu hóa chuỗi cung ứng và giao vận kho vận chặng cuối cho doanh nghiệp thương mại',
    subtitle: 'Giải pháp chuyển đổi số toàn diện cho doanh nghiệp vận tải kho bãi',
    heroImage: '/assets/case_brother.jpg',
    middleImage: null,
    overviewSubTitle: 'NGÀNH NGHỀ TRỌNG ĐIỂM',
    overviewHeading: 'Nâng cao năng lực cạnh tranh trong kỷ nguyên số',
    overviewParagraphs: [
      'Tự động hóa toàn diện từ quản lý định tuyến xe, kiểm đếm barcode tự động đến theo dõi vị trí kiện hàng theo thời gian thực.'
    ],
    order: 15,
    status: 'published'
  }
];

interface ServiceImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newItems: any[]) => void;
}

export default function ServiceImportModal({
  isOpen,
  onClose,
  onSuccess,
}: ServiceImportModalProps) {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rawJson, setRawJson] = useState<string>('');
  const [onDuplicate, setOnDuplicate] = useState<'rename' | 'update'>('rename');
  const [fileName, setFileName] = useState<string | null>(null);

  // TanStack Query Mutation
  const { mutateAsync: importServicesAsync, isPending: isImporting } =
    useImportServicesMutation({
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
        if (!item.title || typeof item.title !== 'string') {
          return {
            parsedItems: [],
            parseError: `Mục thứ ${i + 1} thiếu trường "title" (tên dịch vụ / ngành nghề).`,
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
      const jsonString = JSON.stringify(SAMPLE_SERVICES_JSON, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mau_dich_vu_egead.json';
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
    setRawJson(JSON.stringify(SAMPLE_SERVICES_JSON, null, 2));
    setFileName('mau_dich_vu_egead.json');
    toast({
      body: 'Đã nạp 2 bài viết mẫu vào khung soạn thảo. Bạn có thể bấm xác nhận hoặc chỉnh sửa thêm.',
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
      await importServicesAsync({
        items: parsedItems,
        onDuplicate,
      });
    } catch {
      // Toast handles error in mutation
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden font-open-sans">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">
                Thêm nhanh dịch vụ &amp; ngành nghề (Import JSON)
              </h3>
              <Badge
                label="Định dạng JSON"
                variant="neutral"
                className="h-6 px-2.5 text-xs"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Thêm một hoặc nhiều dịch vụ vào hệ thống cùng lúc từ file .json hoặc dán trực tiếp
            </p>
          </div>
          <Button
            label="Đóng"
            variant="ghost"
            onClick={onClose}
            isDisabled={isImporting}
            className="h-8 px-3 text-slate-500 hover:text-slate-800"
          />
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top banner: Sample download & 1-click test fill */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <div>
              <div className="text-sm font-semibold text-emerald-950">
                Chưa có file mẫu?
              </div>
              <div className="text-xs text-emerald-700 mt-0.5">
                Tải file JSON mẫu chuẩn cấu trúc của dịch vụ và ngành nghề để chỉnh sửa và import nhanh
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                label="Tải file JSON mẫu"
                variant="secondary"
                onClick={handleDownloadSample}
                className="h-9 px-4 text-xs font-semibold bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50"
              />
              <Button
                label="Nạp dữ liệu mẫu vào ô"
                variant="ghost"
                onClick={handleLoadSampleToEditor}
                className="h-9 px-3 text-xs text-emerald-800 hover:bg-emerald-100/60"
              />
            </div>
          </div>

          {/* Option 1: File dropzone */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Cách 1: Tải lên file .json từ máy tính
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-slate-400 rounded-xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="text-sm font-medium text-slate-700">
                {fileName ? (
                  <span className="text-emerald-700 font-bold">
                    Đã chọn file: {fileName}
                  </span>
                ) : (
                  <span>
                    Bấm vào đây để chọn file .json từ thiết bị của bạn
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Hỗ trợ file JSON chứa một đối tượng hoặc mảng nhiều dịch vụ
              </p>
            </div>
          </div>

          {/* Option 2: Direct textarea */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800">
                Cách 2: Hoặc dán trực tiếp mã JSON vào đây
              </label>
              {rawJson && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-slate-500 hover:text-red-600 transition"
                >
                  Xóa nội dung
                </button>
              )}
            </div>
            <textarea
              value={rawJson}
              onChange={(e) => setRawJson(e.target.value)}
              placeholder={`[\n  {\n    "title": "Tên dịch vụ",\n    "category": "service",\n    "tagline": "Khẩu hiệu ngắn",\n    "status": "published"\n  }\n]`}
              rows={8}
              className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 selection:bg-emerald-900"
            />
          </div>

          {/* Parse error alert */}
          {parseError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <span className="font-bold">Lỗi cú pháp:</span>
              <span>{parseError}</span>
            </div>
          )}

          {/* Live Preview & Options */}
          {parsedItems.length > 0 && !parseError && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>Xem trước danh sách ({parsedItems.length} mục)</span>
                  <Badge
                    label="Hợp lệ"
                    variant="neutral"
                    className="h-5 px-2 text-[10px]"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Khi trùng slug:</span>
                  <label className="inline-flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="onDuplicate"
                      value="rename"
                      checked={onDuplicate === 'rename'}
                      onChange={() => setOnDuplicate('rename')}
                      className="accent-slate-900"
                    />
                    <span>Tự đổi slug mới</span>
                  </label>
                  <label className="inline-flex items-center gap-1 cursor-pointer ml-2">
                    <input
                      type="radio"
                      name="onDuplicate"
                      value="update"
                      checked={onDuplicate === 'update'}
                      onChange={() => setOnDuplicate('update')}
                      className="accent-slate-900"
                    />
                    <span>Cập nhật mục cũ</span>
                  </label>
                </div>
              </div>

              {/* Preview Cards */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {parsedItems.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{index + 1}. {item.title}</span>
                        {item.slug && (
                          <span className="text-slate-400 font-mono font-normal">
                            /{item.slug}
                          </span>
                        )}
                      </div>
                      {item.tagline && (
                        <div className="text-slate-600 line-clamp-1">
                          {item.tagline}
                        </div>
                      )}
                      <div className="flex items-center gap-2 pt-1">
                        <Badge
                          label={item.category === 'industry' ? 'Ngành nghề' : 'Trụ cột Dịch vụ'}
                          variant={item.category === 'industry' ? 'blue' : 'purple'}
                          className="h-5 px-2 text-[10px]"
                        />
                        <Badge
                          label={item.status === 'draft' ? 'Bản nháp' : 'Hiển thị'}
                          variant={item.status === 'draft' ? 'warning' : 'neutral'}
                          className="h-5 px-2 text-[10px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            {parsedItems.length > 0 && !parseError ? (
              <span>Sẵn sàng import {parsedItems.length} mục vào cơ sở dữ liệu</span>
            ) : (
              <span>Vui lòng tải file hoặc dán JSON để xem trước</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              label="Hủy bỏ"
              variant="ghost"
              onClick={onClose}
              isDisabled={isImporting}
              className="h-10 px-4 text-xs font-semibold"
            />
            <Button
              label={
                isImporting
                  ? 'Đang nhập dữ liệu...'
                  : `Xác nhận thêm ${parsedItems.length > 0 ? `${parsedItems.length} mục` : ''}`
              }
              variant="primary"
              onClick={handleImportSubmit}
              isDisabled={isImporting || parsedItems.length === 0 || Boolean(parseError)}
              className="h-10 px-5 text-xs font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
