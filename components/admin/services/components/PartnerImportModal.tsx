'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Button, Badge, Card, useToast } from '@astryxdesign/core';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { PartnerItemModel } from '@/lib/services/partner-item.service';
import { PARTNERS_QUERY_KEY } from '@/lib/hooks/usePartnerMutations';

export const SAMPLE_PARTNERS_JSON = [
  {
    name: 'Salesforce Commerce Cloud',
    slug: 'salesforce-commerce-cloud',
    badge: 'Salesforce Certified Ridge Partner',
    headline: 'Scale unified B2B and D2C commerce on Salesforce Cloud.',
    description: 'Empower global brands with intelligent merchandising, composable storefronts, and deep CRM integration.',
    bannerImage: '/images/services/enterprise_tech.jpg',
    bannerFallback: '/images/services/enterprise_tech.jpg',
    ctaText: 'Schedule demo',
    ctaHref: '/contact-us?subject=salesforce-demo',
    advantagesSubtitle: 'E-GEAD advantages',
    advantagesHeadline: 'Certified Salesforce Ridge Partner with enterprise retail expertise.',
    advantagesItems: [
      {
        title: 'Architectural Excellence',
        description: 'Certified Salesforce architects ensuring high performance, zero-downtime releases, and headless frontend scalability.',
        tag: 'Architecture'
      },
      {
        title: 'AI Merchandising Integration',
        description: 'Leverage Salesforce Einstein AI for personalized recommendations, search optimization, and predictive purchasing.',
        tag: 'Artificial Intelligence'
      }
    ],
    expertiseSubtitle: 'Our expertise',
    expertiseHeadline: 'We are fluent in',
    expertiseItems: [
      {
        title: 'B2B & D2C Unified Commerce',
        description: 'Single-source inventory, account-level pricing, quote management, and self-service purchasing portals.',
        tag: 'Platform'
      },
      {
        title: 'Order Management (SOM)',
        description: 'Orchestrating omnichannel inventory routing, store fulfillment, and seamless return management.',
        tag: 'Fulfillment'
      }
    ],
    whyTitlePrefix: 'Why Salesforce',
    whyHeadline: 'Trusted by the worlds largest brands for mission-critical commerce.',
    whyDescription: 'Salesforce Commerce Cloud provides unmatched cloud stability, global reach, and deeply integrated customer lifecycle data.',
    whyItems: [
      {
        title: '99.99% Cloud Uptime',
        description: 'Enterprise resilience capable of handling peak cyber week flash sale traffic effortlessly.'
      },
      {
        title: 'Global Multi-Currency & Locale',
        description: 'Operate across hundreds of storefronts in different countries from a centralized management console.'
      }
    ],
    casesSubtitle: 'Proven outcomes',
    casesHeadline: 'Read our cases',
    casesItems: [
      {
        title: 'Global Retailer Headless Migration',
        description: 'Replatformed from legacy monolith to Salesforce Composable Storefront, boosting mobile checkout conversion by 38%.',
        category: 'Fashion & Retail',
        badge: 'Enterprise Migration',
        image: '/assets/case_brother.jpg',
        href: '/contact-us'
      }
    ],
    ctaHeadingPart1: 'Accelerate your ',
    ctaHighlight: 'omnichannel growth',
    ctaHeadingPart2: ' with Salesforce & E-GEAD.',
    ctaDescription: 'Speak with our certified Salesforce practice leads to unlock personalized commerce and enterprise scalability.',
    ctaButtonText: "Let's talk",
    ctaButtonHref: '/contact-us?subject=salesforce-consultation',
    status: 'published'
  },
  {
    name: 'BigCommerce Enterprise',
    slug: 'bigcommerce-enterprise',
    badge: 'Certified BigCommerce Elite Partner',
    headline: 'Composable SaaS commerce with open APIs and zero transaction fees.',
    description: 'Modern, fast-to-market enterprise commerce architecture designed for rapid growth and lower total cost of ownership.',
    bannerImage: '/images/services/enterprise_tech.jpg',
    bannerFallback: '/images/services/enterprise_tech.jpg',
    ctaText: 'Explore platform',
    ctaHref: '/contact-us?subject=bigcommerce-demo',
    advantagesSubtitle: 'E-GEAD advantages',
    advantagesHeadline: 'Elite Partner delivering composable BigCommerce solutions.',
    advantagesItems: [
      {
        title: 'Multi-Storefront (MSF) Mastery',
        description: 'Launch and run multiple localized storefronts from a single BigCommerce control panel with shared catalogs.',
        tag: 'Multi-Storefront'
      }
    ],
    expertiseSubtitle: 'Our expertise',
    expertiseHeadline: 'We are fluent in',
    expertiseItems: [
      {
        title: 'B2B Edition Implementation',
        description: 'Corporate account hierarchies, invoice factoring, custom pricing tiers, and punchout catalog integrations.',
        tag: 'B2B Commerce'
      }
    ],
    whyTitlePrefix: 'Why BigCommerce',
    whyHeadline: 'Freedom to innovate without proprietary constraints.',
    whyDescription: 'BigCommerce combines the flexibility of headless open APIs with the stability and security of enterprise SaaS.',
    whyItems: [
      {
        title: 'Zero Platform Transaction Fees',
        description: 'Keep higher margins as your transaction volumes scale globally.'
      }
    ],
    casesSubtitle: 'Proven outcomes',
    casesHeadline: 'Read our cases',
    casesItems: [],
    ctaHeadingPart1: 'Transform your ',
    ctaHighlight: 'digital storefront',
    ctaHeadingPart2: ' with BigCommerce.',
    ctaDescription: 'Schedule a tailored architecture review to see how BigCommerce reduces maintenance overhead and accelerates deployment.',
    ctaButtonText: "Let's talk",
    ctaButtonHref: '/contact-us?subject=bigcommerce-consultation',
    status: 'published'
  }
];

interface PartnerImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  allPartners?: PartnerItemModel[];
  onSuccess?: (newItems: PartnerItemModel[]) => void;
}

export default function PartnerImportModal({
  isOpen,
  onClose,
  allPartners = [],
  onSuccess,
}: PartnerImportModalProps) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rawJson, setRawJson] = useState<string>('');
  const [onDuplicate, setOnDuplicate] = useState<'rename' | 'update'>('rename');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState<boolean>(false);

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
        const name = (item.name || item.title || '').trim();
        if (!name) {
          return {
            parsedItems: [],
            parseError: `Mục thứ ${i + 1} thiếu trường "name" (tên đối tác chiến lược).`,
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
      const jsonString = JSON.stringify(SAMPLE_PARTNERS_JSON, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mau_doi_tac_egead.json';
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

  // 2. Xuất dữ liệu đối tác hiện có ra JSON
  const handleExportExistingPartners = () => {
    try {
      if (allPartners.length === 0) {
        toast({
          body: 'Hiện tại chưa có dữ liệu đối tác nào để xuất.',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 3000,
        });
        return;
      }

      const cleanList = allPartners.map((item) => ({
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
      link.download = `danh_sach_doi_tac_egead_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        body: `Đã xuất ${cleanList.length} đối tác thành công ra file JSON!`,
        type: 'info',
        isAutoHide: true,
        autoHideDuration: 4000,
      });
    } catch (error) {
      console.error('Error exporting partners:', error);
      toast({
        body: 'Có lỗi xảy ra khi xuất dữ liệu JSON.',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    }
  };

  // 3. Nạp dữ liệu mẫu vào ô soạn thảo
  const handleLoadSampleToEditor = () => {
    setRawJson(JSON.stringify(SAMPLE_PARTNERS_JSON, null, 2));
    setFileName('mau_doi_tac_egead.json');
    toast({
      body: 'Đã nạp 2 đối tác mẫu vào khung soạn thảo. Bạn có thể bấm xác nhận hoặc chỉnh sửa thêm.',
      type: 'info',
      isAutoHide: true,
      autoHideDuration: 3500,
    });
  };

  // 4. Đọc file JSON từ máy tính
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      toast({
        body: 'Vui lòng chọn file có định dạng .json',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setRawJson(text || '');
      toast({
        body: `Đã nạp nội dung file "${file.name}" thành công!`,
        type: 'info',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    };
    reader.onerror = () => {
      toast({
        body: 'Không thể đọc nội dung file đã chọn.',
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

  // 5. Gửi dữ liệu import lên server
  const handleConfirmImport = async () => {
    if (!parsedItems || parsedItems.length === 0) {
      toast({
        body: 'Vui lòng nạp hoặc dán dữ liệu JSON hợp lệ trước khi xác nhận.',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
      return;
    }

    try {
      setIsImporting(true);
      const res = await fetch('/api/admin/partners/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: parsedItems,
          onDuplicate,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Lỗi khi nhập dữ liệu đối tác.');
      }

      toast({
        body: `Đã nhập thành công ${json.count} đối tác vào hệ thống!`,
        type: 'info',
        isAutoHide: true,
        autoHideDuration: 4000,
      });

      queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY });
      router.refresh();

      if (onSuccess && json.items) {
        onSuccess(json.items);
      }

      handleClear();
      onClose();
    } catch (err: any) {
      console.error('Import error:', err);
      toast({
        body: err.message || 'Lỗi khi import đối tác, vui lòng thử lại.',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 4500,
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden font-open-sans">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-bold text-slate-900">
                Dữ liệu JSON Đối tác chiến lược (Import / Export JSON)
              </h3>
              <Badge
                label="Định dạng JSON"
                variant="purple"
                className="h-6 px-2.5 text-xs font-semibold"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Thêm mới, sao lưu hoặc cập nhật nhanh danh sách đối tác chiến lược bằng file .json hoặc dán trực tiếp
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

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Actions Bar: Template Download & Current Export */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Download Template */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-900">File JSON mẫu</span>
                <p className="text-xs text-slate-500 mt-1">
                  Tải file JSON mẫu chuẩn cấu trúc các trường của đối tác để chỉnh sửa và import nhanh
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  label="Tải file JSON mẫu"
                  variant="secondary"
                  onClick={handleDownloadSample}
                  className="px-3.5 h-8 text-xs font-semibold"
                />
                <Button
                  type="button"
                  label="Nạp mẫu vào khung"
                  variant="ghost"
                  onClick={handleLoadSampleToEditor}
                  className="px-3.5 h-8 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                />
              </div>
            </div>

            {/* Export Existing Partners */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/90 flex flex-col justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-950">Sao lưu dữ liệu hiện có</span>
                <p className="text-xs text-slate-600 mt-1">
                  Xuất toàn bộ {allPartners.length} đối tác hiện có trong hệ thống ra file .json để lưu trữ an toàn
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  label={`Xuất tất cả (${allPartners.length} đối tác) ra JSON`}
                  variant="primary"
                  onClick={handleExportExistingPartners}
                  className="px-3.5 h-8 text-xs font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Option 1: File Upload */}
          <Card variant="default" className="rounded-xl p-4 bg-white border border-slate-200/80">
            <span className="text-xs font-bold text-slate-800 mb-2 block">
              Cách 1: Tải lên file .json từ máy tính
            </span>
            <div className="relative border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl p-5 text-center transition-colors bg-slate-50/50">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-1 pointer-events-none">
                <div className="text-xs font-medium text-slate-700">
                  {fileName ? (
                    <span className="text-emerald-700 font-semibold">{fileName}</span>
                  ) : (
                    <span>Bấm vào đây hoặc kéo thả file .json từ thiết bị</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  Hỗ trợ file JSON chứa một đối tượng hoặc một danh sách mảng nhiều đối tác
                </p>
              </div>
            </div>
          </Card>

          {/* Option 2: Direct JSON Textarea */}
          <Card variant="default" className="rounded-xl p-4 bg-white border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">
                Cách 2: Hoặc dán trực tiếp mã JSON vào đây
              </span>
              {rawJson && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Xóa nội dung
                </button>
              )}
            </div>
            <textarea
              rows={8}
              value={rawJson}
              onChange={(e) => setRawJson(e.target.value)}
              placeholder="Dán mã JSON chứa một đối tượng hoặc mảng các đối tác tại đây..."
              className="w-full font-mono text-xs p-3 rounded-xl border border-slate-200 bg-slate-900 text-slate-100 focus:outline-hidden focus:border-emerald-500 transition-colors"
            />
          </Card>

          {/* Error Message if JSON syntax invalid */}
          {parseError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              <div className="font-bold">Lỗi định dạng JSON:</div>
              <div className="mt-0.5">{parseError}</div>
            </div>
          )}

          {/* Live Preview Table */}
          {parsedItems.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    Xem trước danh sách ({parsedItems.length} đối tác hợp lệ)
                  </span>
                  <Badge
                    label={`${parsedItems.length} mục sẵn sàng`}
                    variant="success"
                    className="h-5 px-2 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-600 sticky top-0 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3 w-10 text-center font-bold">STT</th>
                      <th className="py-2 px-3 font-bold">Tên đối tác</th>
                      <th className="py-2 px-3 font-bold">Đường dẫn (Slug)</th>
                      <th className="py-2 px-3 font-bold">Huy hiệu</th>
                      <th className="py-2 px-3 font-bold">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parsedItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="py-2 px-3 text-center text-slate-400 font-mono">
                          {idx + 1}
                        </td>
                        <td className="py-2 px-3 font-semibold text-slate-900">
                          {item.name || item.title}
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-500">
                          /partners/{item.slug || 'tu-dong-tao'}
                        </td>
                        <td className="py-2 px-3 text-slate-600">
                          {item.badge || item.hero?.badge || <span className="text-slate-400 italic">Không</span>}
                        </td>
                        <td className="py-2 px-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                              item.status === 'draft'
                                ? 'bg-slate-100 text-slate-600'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            {item.status === 'draft' ? 'Bản nháp' : 'Hiển thị'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Duplicate handling settings */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-800">
                Xử lý khi đối tác đã tồn tại (trùng Slug):
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Chọn phương thức xử lý khi đường dẫn (slug) trùng với đối tác đang có trong hệ thống
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs shrink-0">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="duplicateStrategy"
                  value="rename"
                  checked={onDuplicate === 'rename'}
                  onChange={() => setOnDuplicate('rename')}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Tự động tạo mới (thêm hậu tố -1, -2)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="duplicateStrategy"
                  value="update"
                  checked={onDuplicate === 'update'}
                  onChange={() => setOnDuplicate('update')}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Cập nhật ghi đè bản ghi cũ</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/70">
          <div className="text-xs text-slate-500">
            {parsedItems.length > 0 ? (
              <span>Sẵn sàng nạp {parsedItems.length} đối tác vào hệ thống</span>
            ) : (
              <span>Vui lòng tải file hoặc dán JSON để xem trước</span>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              label="Hủy bỏ"
              variant="ghost"
              onClick={onClose}
              isDisabled={isImporting}
              className="px-4 h-9 text-xs"
            />
            <Button
              type="button"
              label={
                isImporting
                  ? 'Đang nhập...'
                  : parsedItems.length > 0
                  ? `Xác nhận nhập (${parsedItems.length} đối tác)`
                  : 'Xác nhận nhập'
              }
              variant="primary"
              onClick={handleConfirmImport}
              isDisabled={parsedItems.length === 0 || isImporting || Boolean(parseError)}
              className="px-5 h-9 text-xs font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
