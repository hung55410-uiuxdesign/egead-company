'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  Button,
  Badge,
  Card,
  useToast,
} from '@astryxdesign/core';
import { useImportCaseStudiesMutation } from '@/lib/hooks';

export const SAMPLE_CASE_STUDIES_JSON = [
  {
    title: 'Tăng trưởng doanh thu 250% với hệ thống Fulfillment tự động',
    customer: 'Apex Streetwear Co · Thương hiệu thời trang đường phố Mỹ',
    description: 'Tối ưu hóa quy trình xử lý đơn hàng và giao hàng nhanh Sub-24H cho chuỗi gian hàng TikTok Shop US, loại bỏ hoàn toàn vi phạm trễ hạn.',
    slug: 'apex-streetwear-fulfillment-sprint',
    image: '/assets/case_suntory.jpg',
    services: ['Technology', 'Operations'],
    industries: ['Fashion & Lifestyle', 'Consumer Goods'],
    tags: ['POD FULFILLMENT', 'TIKTOK SHOP US', 'SUB-24H SLA'],
    highlight: 'Tăng trưởng 250% doanh thu',
    order: 17,
    status: 'published',
    bannerImage: '/assets/case_suntory.jpg',
    overviewSubtitle: 'TỔNG QUAN DỰ ÁN',
    overviewTitle: 'Giải pháp Sub-24H SLA bứt phá mùa mua sắm cao điểm',
    overviewDescription: 'Apex Streetwear đã xử lý hơn 35,000 đơn hàng trong mùa lễ mà không có bất kỳ khiếu nại hay trễ hạn nào nhờ công nghệ routing tự động của E-GEAD.',
    overviewImage: '/assets/insight_dtf_tech.jpg',
    challengeTitle: 'Quy trình in và xuất kho truyền thống mất 3-4 ngày',
    challengeContent: 'Các nhà sản xuất truyền thống không kịp đáp ứng tốc độ đơn hàng flash sale, dẫn đến nguy cơ bị thuật toán sàn thương mại điện tử hạ bậc hiển thị.',
    solutionTitle: 'Triển khai dây chuyền DTF tự động với webhook API',
    solutionContent: 'E-GEAD tích hợp API tự động nhận đơn và in trực tiếp theo mã vạch, bàn giao đơn vị vận chuyển USPS chỉ trong vòng 24 giờ.',
    taskSubtitle: 'HẠNG MỤC TRIỂN KHAI',
    taskTitle: 'Kiến trúc hệ thống vận hành đa kênh liên tục',
    taskImages: [
      '/assets/insight_dtf_tech.jpg',
      '/assets/insight_wms_cloud.jpg',
    ],
    taskItems: [
      {
        taskTitle: 'Tích hợp API và tiếp nhận đơn hàng tức thì',
        description: 'Hệ thống RESTful API kết nối trực tiếp, phản hồi dưới 120ms.',
      },
      {
        taskTitle: 'Kiểm soát file in và quét barcode kho vận',
        description: 'Tỷ lệ chuẩn xác đạt 99.9%, lưu trữ thông tin đối soát tự động.',
      },
    ],
  },
  {
    title: 'Tự động hóa vận hành chuỗi bán lẻ đa kênh toàn cầu',
    customer: 'Nordic Living Decor · Chuỗi phân phối đồ gia dụng cao cấp',
    description: 'Đồng bộ hóa dữ liệu tồn kho theo thời gian thực và quản lý đơn hàng xuyên biên giới trên Amazon, Etsy và Shopify.',
    slug: 'nordic-living-omnichannel-automation',
    image: '/assets/case_brother.jpg',
    services: ['Technology', 'Creative'],
    industries: ['Consumer Goods'],
    tags: ['OMNICHANNEL', 'AUTOMATION', 'AMAZON US'],
    highlight: '99.9% Tồn kho chính xác',
    order: 18,
    status: 'published',
  },
];

interface CaseStudyImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newItems: any[]) => void;
}

export default function CaseStudyImportModal({
  isOpen,
  onClose,
  onSuccess,
}: CaseStudyImportModalProps) {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rawJson, setRawJson] = useState<string>('');
  const [onDuplicate, setOnDuplicate] = useState<'rename' | 'update'>('rename');
  const [fileName, setFileName] = useState<string | null>(null);

  // TanStack Query Mutation
  const { mutateAsync: importCaseStudiesAsync, isPending: isImporting } =
    useImportCaseStudiesMutation({
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

      // Validate basic structure
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
            parseError: `Mục thứ ${i + 1} thiếu trường "title" (tiêu đề dự án).`,
          };
        }
        if (!item.customer || typeof item.customer !== 'string') {
          return {
            parsedItems: [],
            parseError: `Mục thứ ${i + 1} thiếu trường "customer" (tên đối tác / khách hàng).`,
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

  // 1. Tải file JSON mẫu về máy người dùng
  const handleDownloadSample = () => {
    try {
      const jsonString = JSON.stringify(SAMPLE_CASE_STUDIES_JSON, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mau_case_studies_egead.json';
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
    } catch {
      toast({
        body: 'Không thể tạo file tải về. Vui lòng thử lại.',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    }
  };

  // 2. Nạp dữ liệu mẫu vào ô soạn thảo
  const handleLoadSampleToEditor = () => {
    setRawJson(JSON.stringify(SAMPLE_CASE_STUDIES_JSON, null, 2));
    setFileName('mau_case_studies_egead.json');
    toast({
      body: 'Đã nạp 2 dự án mẫu vào ô nhập liệu.',
      type: 'info',
      isAutoHide: true,
      autoHideDuration: 3000,
    });
  };

  // 3. Xử lý đọc file từ máy tính
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
      await importCaseStudiesAsync({
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
        {/* =========================================================================
            MODAL HEADER
            ========================================================================= */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">
                Thêm nhanh dự án (Import JSON)
              </h3>
              <Badge
                label="Định dạng JSON"
                variant="neutral"
                className="h-6 px-2.5 text-xs"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Thêm một hoặc nhiều Case Studies vào hệ thống cùng lúc từ file .json hoặc dán dữ liệu trực tiếp
            </p>
          </div>
          <Button
            label="Đóng"
            variant="ghost"
            onClick={onClose}
            className="h-8 px-3 text-slate-500 hover:text-slate-800"
          />
        </div>

        {/* =========================================================================
            MODAL SCROLLABLE BODY
            ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Actions: Download Sample & Load Sample */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <div>
              <div className="text-sm font-semibold text-emerald-950">
                Chưa có file mẫu?
              </div>
              <div className="text-xs text-emerald-700 mt-0.5">
                Tải file JSON mẫu chuẩn cấu trúc các trường của dự án để chỉnh sửa và import nhanh
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

          {/* Option 1: File Upload Dropzone */}
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
                Hỗ trợ file JSON chứa một đối tượng hoặc một danh sách mảng nhiều dự án
              </p>
            </div>
          </div>

          {/* Option 2: Direct JSON Textarea */}
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
              rows={8}
              value={rawJson}
              onChange={(e) => setRawJson(e.target.value)}
              placeholder={`[\n  {\n    "title": "Tên dự án...",\n    "customer": "Tên khách hàng...",\n    "description": "Mô tả ngắn...",\n    "image": "/assets/case_suntory.jpg",\n    "services": ["Technology"],\n    "industries": ["Consumer Goods"],\n    "tags": ["FULFILLMENT"]\n  }\n]`}
              className="w-full font-mono text-xs sm:text-sm p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y leading-relaxed"
            />
          </div>

          {/* Error Message if JSON syntax invalid */}
          {parseError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm">
              <span className="font-bold">Lỗi định dạng:</span> {parseError}
            </div>
          )}

          {/* Validation Status & Live Preview */}
          {parsedItems.length > 0 && !parseError && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    Xem trước danh sách dự án hợp lệ:
                  </span>
                  <Badge
                    label={`${parsedItems.length} dự án`}
                    variant="neutral"
                    className="h-6 px-2.5 bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold"
                  />
                </div>

                {/* Slug collision option */}
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-medium">Nếu trùng Slug:</span>
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
                    <span>Cập nhật dự án cũ</span>
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
                      <div className="text-slate-500">
                        Khách hàng: <span className="text-slate-700 font-medium">{item.customer}</span>
                      </div>
                      {item.description && (
                        <div className="text-slate-600 line-clamp-1">
                          {item.description}
                        </div>
                      )}
                      {Array.isArray(item.tags) && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.tags.map((t: string) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded bg-slate-200/70 text-[10px] text-slate-600 font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <Badge
                        label={item.status === 'draft' ? 'Bản nháp' : 'Hiển thị'}
                        variant={item.status === 'draft' ? 'warning' : 'neutral'}
                        className="h-5 px-2 text-[10px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            MODAL FOOTER
            ========================================================================= */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            {parsedItems.length > 0 && !parseError ? (
              <span>Sẵn sàng import {parsedItems.length} dự án vào cơ sở dữ liệu</span>
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
                  : `Xác nhận thêm ${parsedItems.length > 0 ? `${parsedItems.length} dự án` : ''}`
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
