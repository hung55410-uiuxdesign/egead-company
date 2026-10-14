'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { X, Upload, Eye } from 'lucide-react';
import { Button, Card, Badge, Field } from '@astryxdesign/core';
import type {
  HomeSectionModel,
  SmartCXSectionData,
  BentoPhotoCard,
  BentoStatCard,
  BentoQuoteCard,
} from '@/lib/services/home-section.service';
import { useUploadMedia, useUpdateHomeSectionMutation } from '@/lib/hooks';

interface SmartCXSectionFormClientProps {
  section: HomeSectionModel;
}

const defaultData: SmartCXSectionData = {
  ctaText: 'Read Customer Stories',
  ctaHref: '/our-work',
  photo1: {
    image: '/assets/success_apparel.jpg',
    alt: 'E-GEAD precision industrial DTF print-on-demand streetwear apparel',
  },
  stat1: {
    brand: 'URBANVIBE',
    tagline: 'URBANVIBE\nACHIEVED SUB-24H DISPATCH\nON TIKTOK SHOP US',
    value: '<24H',
    label: 'Average Production SLA',
  },
  widePhoto: {
    image: '/assets/success_warehouse.jpg',
    alt: 'E-GEAD high-speed automated robotics fulfillment facility',
  },
  quote: {
    quote:
      '“Egead eliminated our fulfillment delays entirely. With sub-24h industrial DTF printing and automated TikTok Shop US compliance, we scaled to 28,000 peak holiday orders with a 0.18% late dispatch rate and zero algorithmic penalties.”',
    author: 'MARCUS VANCE',
    role: 'HEAD OF GLOBAL SUPPLY CHAIN & OPERATIONS',
    brand: 'URBANVIBE',
  },
  photo2: {
    image: '/assets/success_scanner.jpg',
    alt: 'Smart barcode scan warehouse management and error-free dispatch',
  },
  stat2: {
    brand: 'HOMECRAFT',
    tagline: 'HOMECRAFT\nELIMINATED OVERSELLING &\nCUT MANUAL OPS BY 85%',
    value: '99.9%',
    label: 'WMS Barcode Scan Accuracy',
  },
};

export default function SmartCXSectionFormClient({
  section,
}: SmartCXSectionFormClientProps) {
  const router = useRouter();

  const rawData: any = section.data || {};
  const unwrappedData: any =
    rawData?.data && (rawData.data?.stat1 || rawData.data?.photo1 || rawData.data?.quote)
      ? rawData.data
      : rawData;

  const initialData: SmartCXSectionData = {
    ...defaultData,
    ...unwrappedData,
  };

  // General Fields
  const [title, setTitle] = useState(
    section.title || 'Why brands ship with Egead'
  );
  const [isActive, setIsActive] = useState<boolean>(section.isActive ?? true);

  // Block 1: Row 1 Left (Photo1 & Stat1)
  const [photo1, setPhoto1] = useState<BentoPhotoCard>(
    initialData.photo1 || defaultData.photo1!
  );
  const [stat1, setStat1] = useState<BentoStatCard>(
    initialData.stat1 || defaultData.stat1!
  );

  // Block 2: Row 1 Right (Wide Photo)
  const [widePhoto, setWidePhoto] = useState<BentoPhotoCard>(
    initialData.widePhoto || defaultData.widePhoto!
  );

  // Block 3: Row 2 Left (Quote)
  const [quote, setQuote] = useState<BentoQuoteCard>(
    initialData.quote || defaultData.quote!
  );

  // Block 4: Row 2 Right (Photo2 & Stat2)
  const [photo2, setPhoto2] = useState<BentoPhotoCard>(
    initialData.photo2 || defaultData.photo2!
  );
  const [stat2, setStat2] = useState<BentoStatCard>(
    initialData.stat2 || defaultData.stat2!
  );

  // CTA Button
  const [ctaText, setCtaText] = useState(
    initialData.ctaText || defaultData.ctaText!
  );
  const [ctaHref, setCtaHref] = useState(
    initialData.ctaHref || defaultData.ctaHref!
  );

  // Mutation & Notifications
  const updateMutation = useUpdateHomeSectionMutation();
  const isSaving = updateMutation.isPending;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Uploading state
  const [uploadTarget, setUploadTarget] = useState<string | null>(null);
  const { uploadFileAsync, isUploading } = useUploadMedia({
    defaultFolder: 'egead_cms/smartcx',
    successMessage: 'Tải ảnh lên thành công!',
  });

  const handleUploadImage = async (
    target: 'photo1' | 'widePhoto' | 'photo2',
    file: File
  ) => {
    setUploadTarget(target);
    try {
      const res = await uploadFileAsync(file);
      if (res?.url) {
        if (target === 'photo1') {
          setPhoto1((prev) => ({ ...prev, image: res.url }));
        } else if (target === 'widePhoto') {
          setWidePhoto((prev) => ({ ...prev, image: res.url }));
        } else if (target === 'photo2') {
          setPhoto2((prev) => ({ ...prev, image: res.url }));
        }
      }
    } catch {
      // Handled by toast
    } finally {
      setUploadTarget(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tiêu đề section');
      return;
    }

    const payloadData: SmartCXSectionData = {
      ctaText: ctaText.trim(),
      ctaHref: ctaHref.trim(),
      photo1,
      stat1,
      widePhoto,
      quote,
      photo2,
      stat2,
    };

    try {
      await updateMutation.mutateAsync({
        key: section.key,
        title: title.trim(),
        subtitle: 'Customer Success & SLA',
        description:
          'Khối bento grid hiển thị minh chứng thực tế: chỉ số sản xuất <24h, lời chứng thực từ UrbanVibe, cơ sở kho tự động và độ chính xác WMS 99.9%.',
        isActive,
        data: payloadData,
      });
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi lưu dữ liệu section');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full pb-16">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              label="Quay lại danh sách section"
              variant="secondary"
              className="px-4 h-10"
              href="/admin/home"
            />
            <Button
              label="Xem trang chủ Live"
              variant="secondary"
              className="px-4 h-10"
              href="/#homepage__customersuccess"
              target="_blank"
            />
            <Badge
              label={isActive ? 'Đang kích hoạt' : 'Tạm ẩn'}
              variant={isActive ? 'success' : 'neutral'}
              className="h-8 px-4"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            Chỉnh sửa: {section.name}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Quản lý nội dung khối Bento Grid minh chứng khách hàng, hình ảnh thực tế và các chỉ số SLA
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            label="Hủy bỏ"
            variant="ghost"
            className="px-4 h-10"
            href="/admin/home"
          />
          <Button
            label={isSaving ? 'Đang lưu...' : 'Lưu thay đổi section'}
            variant="primary"
            type="submit"
            className="px-4 h-10"
            isDisabled={isSaving}
          />
        </div>
      </div>

      {/* Notifications */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center justify-between">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-rose-500 hover:text-rose-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =========================================================================
          CARD 1: TIÊU ĐỀ SECTION
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-4 bg-white">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              1. Tiêu đề chính &amp; Trạng thái
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Dòng tiêu đề lớn hiển thị hiệu ứng chuyển sắc (gradient) ở đầu section
            </p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
            />
            <span>Hiển thị section này trên trang chủ</span>
          </label>
        </div>

        <Field
          label="Tiêu đề chính (Heading)"
          inputID="section-title"
          isRequired
          description="Tiêu đề lớn xuất hiện trên đầu khối Bento Grid"
        >
          <input
            id="section-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Why brands ship with Egead"
            className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
            required
          />
        </Field>
      </Card>

      {/* =========================================================================
          CARD 2: KHỐI 1 (HÀNG 1 BÊN TRÁI - 2 Ô VUÔNG)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white border border-slate-200/90">
        <div className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              2. Khối 1 (Hàng 1 bên trái - 2 ô vuông cạnh nhau)
            </h2>
            <Badge label="Góc trên bên trái" variant="neutral" className="h-6 px-2.5 text-xs" />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Bao gồm 1 ô vuông hình ảnh sản phẩm và 1 ô vuông chỉ số SLA sản xuất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Ô vuông 1: Ảnh sản phẩm */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Ô vuông 1A: Ảnh sản phẩm thực tế
              </span>
              <span className="text-[11px] text-slate-400">Tỉ lệ 1:1</span>
            </div>

            <div className="flex items-start gap-3">
              {/* Image Preview with Upload overlay */}
              <label className="cursor-pointer group/preview relative w-24 h-24 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 border border-slate-300 overflow-hidden shadow-2xs">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={isUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleUploadImage('photo1', file);
                      e.target.value = '';
                    }
                  }}
                />
                <img
                  src={photo1.image || '/assets/success_apparel.jpg'}
                  alt={photo1.alt}
                  className="w-full h-full object-cover group-hover/preview:opacity-30 transition-opacity"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = '0.3';
                  }}
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center text-[10px] text-white font-medium transition-opacity">
                  {uploadTarget === 'photo1' ? 'Đang tải...' : 'Đổi ảnh'}
                </div>
              </label>

              <div className="flex-1 min-w-0 space-y-2">
                <input
                  type="text"
                  value={photo1.image}
                  onChange={(e) =>
                    setPhoto1((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="/assets/success_apparel.jpg"
                  className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-slate-800"
                />
                <input
                  type="text"
                  value={photo1.alt}
                  onChange={(e) =>
                    setPhoto1((prev) => ({ ...prev, alt: e.target.value }))
                  }
                  placeholder="Mô tả alt ảnh..."
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-slate-800"
                />
                <label className="cursor-pointer inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUploadImage('photo1', file);
                        e.target.value = '';
                      }
                    }}
                  />
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors shadow-2xs">
                    {uploadTarget === 'photo1' ? 'Đang tải...' : 'Tải ảnh từ máy tính'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Ô vuông 2: Thẻ chỉ số thành công 1 */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Ô vuông 1B: Thẻ chỉ số thành công 1
              </span>
              <span className="text-[11px] text-slate-400">Tỉ lệ 1:1</span>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Huy hiệu thương hiệu
                  </label>
                  <input
                    type="text"
                    value={stat1.brand}
                    onChange={(e) =>
                      setStat1((prev) => ({ ...prev, brand: e.target.value }))
                    }
                    placeholder="URBANVIBE"
                    className="w-full px-2.5 py-1.5 text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Số liệu lớn
                  </label>
                  <input
                    type="text"
                    value={stat1.value}
                    onChange={(e) =>
                      setStat1((prev) => ({ ...prev, value: e.target.value }))
                    }
                    placeholder="<24H"
                    className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Khẩu hiệu / Thành tích (hỗ trợ xuống dòng)
                </label>
                <textarea
                  rows={2}
                  value={stat1.tagline}
                  onChange={(e) =>
                    setStat1((prev) => ({ ...prev, tagline: e.target.value }))
                  }
                  placeholder="URBANVIBE&#10;ACHIEVED SUB-24H DISPATCH&#10;ON TIKTOK SHOP US"
                  className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-slate-800 resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Nhãn giải thích chỉ số
                </label>
                <input
                  type="text"
                  value={stat1.label}
                  onChange={(e) =>
                    setStat1((prev) => ({ ...prev, label: e.target.value }))
                  }
                  placeholder="Average Production SLA"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* =========================================================================
          CARD 3: KHỐI 2 (HÀNG 1 BÊN PHẢI - ẢNH LỚN TOÀN CẢNH)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-4 bg-white border border-slate-200/90">
        <div className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              3. Khối 2 (Hàng 1 bên phải - Ảnh lớn toàn cảnh cơ sở vật chất / kho vận)
            </h2>
            <Badge label="Góc trên bên phải" variant="neutral" className="h-6 px-2.5 text-xs" />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Khối hình ảnh chữ nhật lớn minh chứng quy mô kho bãi, dây chuyền in ấn và tự động hóa
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200">
          <label className="cursor-pointer group/preview relative w-full sm:w-48 h-32 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 border border-slate-300 overflow-hidden shadow-2xs">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={isUploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleUploadImage('widePhoto', file);
                  e.target.value = '';
                }
              }}
            />
            <img
              src={widePhoto.image || '/assets/success_warehouse.jpg'}
              alt={widePhoto.alt}
              className="w-full h-full object-cover group-hover/preview:opacity-30 transition-opacity"
              onError={(e) => {
                (e.target as HTMLElement).style.opacity = '0.3';
              }}
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center text-xs text-white font-medium transition-opacity">
              {uploadTarget === 'widePhoto' ? 'Đang tải...' : 'Đổi ảnh lớn'}
            </div>
          </label>

          <div className="flex-1 w-full space-y-2.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Đường dẫn hình ảnh (URL / Asset Path)
              </label>
              <input
                type="text"
                value={widePhoto.image}
                onChange={(e) =>
                  setWidePhoto((prev) => ({ ...prev, image: e.target.value }))
                }
                placeholder="/assets/success_warehouse.jpg"
                className="w-full px-3 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mô tả hình ảnh (Alt text)
              </label>
              <input
                type="text"
                value={widePhoto.alt}
                onChange={(e) =>
                  setWidePhoto((prev) => ({ ...prev, alt: e.target.value }))
                }
                placeholder="E-GEAD high-speed automated robotics fulfillment facility"
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-slate-800"
              />
            </div>

            <label className="cursor-pointer inline-block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isUploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleUploadImage('widePhoto', file);
                    e.target.value = '';
                  }
                }}
              />
              <span className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors shadow-2xs">
                {uploadTarget === 'widePhoto' ? 'Đang tải...' : 'Tải ảnh lớn từ máy tính'}
              </span>
            </label>
          </div>
        </div>
      </Card>

      {/* =========================================================================
          CARD 4: KHỐI 3 (HÀNG 2 BÊN TRÁI - LỜI CHỨNG THỰC LỚN)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-4 bg-white border border-slate-200/90">
        <div className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              4. Khối 3 (Hàng 2 bên trái - Lời chứng thực khách hàng đối tác)
            </h2>
            <Badge label="Góc dưới bên trái" variant="neutral" className="h-6 px-2.5 text-xs" />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Khối chữ lớn trích dẫn lời nhận xét thực chiến từ khách hàng doanh nghiệp
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3.5">
          <Field
            label="Nội dung lời chứng thực (Quote)"
            inputID="quote-content"
            description="Đoạn văn trích dẫn phản hồi về dịch vụ và hiệu quả thực tế"
          >
            <textarea
              id="quote-content"
              rows={3}
              value={quote.quote}
              onChange={(e) =>
                setQuote((prev) => ({ ...prev, quote: e.target.value }))
              }
              placeholder="“Egead eliminated our fulfillment delays entirely...”"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 transition-colors resize-y"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên người phát biểu
              </label>
              <input
                type="text"
                value={quote.author}
                onChange={(e) =>
                  setQuote((prev) => ({ ...prev, author: e.target.value }))
                }
                placeholder="MARCUS VANCE"
                className="w-full px-3 py-1.5 text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Chức danh / Vai trò
              </label>
              <input
                type="text"
                value={quote.role}
                onChange={(e) =>
                  setQuote((prev) => ({ ...prev, role: e.target.value }))
                }
                placeholder="HEAD OF GLOBAL SUPPLY CHAIN & OPERATIONS"
                className="w-full px-3 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên thương hiệu
              </label>
              <input
                type="text"
                value={quote.brand}
                onChange={(e) =>
                  setQuote((prev) => ({ ...prev, brand: e.target.value }))
                }
                placeholder="URBANVIBE"
                className="w-full px-3 py-1.5 text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* =========================================================================
          CARD 5: KHỐI 4 (HÀNG 2 BÊN PHẢI - 2 Ô VUÔNG)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white border border-slate-200/90">
        <div className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              5. Khối 4 (Hàng 2 bên phải - 2 ô vuông cạnh nhau)
            </h2>
            <Badge label="Góc dưới bên phải" variant="neutral" className="h-6 px-2.5 text-xs" />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Bao gồm 1 ô vuông hình ảnh thiết bị quét mã/vận hành và 1 ô vuông chỉ số chính xác 99.9%
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Ô vuông 2A: Ảnh công nghệ */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Ô vuông 4A: Ảnh thiết bị &amp; công nghệ
              </span>
              <span className="text-[11px] text-slate-400">Tỉ lệ 1:1</span>
            </div>

            <div className="flex items-start gap-3">
              <label className="cursor-pointer group/preview relative w-24 h-24 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 border border-slate-300 overflow-hidden shadow-2xs">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={isUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleUploadImage('photo2', file);
                      e.target.value = '';
                    }
                  }}
                />
                <img
                  src={photo2.image || '/assets/success_scanner.jpg'}
                  alt={photo2.alt}
                  className="w-full h-full object-cover group-hover/preview:opacity-30 transition-opacity"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = '0.3';
                  }}
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center text-[10px] text-white font-medium transition-opacity">
                  {uploadTarget === 'photo2' ? 'Đang tải...' : 'Đổi ảnh'}
                </div>
              </label>

              <div className="flex-1 min-w-0 space-y-2">
                <input
                  type="text"
                  value={photo2.image}
                  onChange={(e) =>
                    setPhoto2((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="/assets/success_scanner.jpg"
                  className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-slate-800"
                />
                <input
                  type="text"
                  value={photo2.alt}
                  onChange={(e) =>
                    setPhoto2((prev) => ({ ...prev, alt: e.target.value }))
                  }
                  placeholder="Mô tả alt ảnh..."
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-slate-800"
                />
                <label className="cursor-pointer inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUploadImage('photo2', file);
                        e.target.value = '';
                      }
                    }}
                  />
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors shadow-2xs">
                    {uploadTarget === 'photo2' ? 'Đang tải...' : 'Tải ảnh từ máy tính'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Ô vuông 2B: Thẻ chỉ số thành công 2 */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Ô vuông 4B: Thẻ chỉ số thành công 2
              </span>
              <span className="text-[11px] text-slate-400">Tỉ lệ 1:1</span>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Huy hiệu thương hiệu
                  </label>
                  <input
                    type="text"
                    value={stat2.brand}
                    onChange={(e) =>
                      setStat2((prev) => ({ ...prev, brand: e.target.value }))
                    }
                    placeholder="HOMECRAFT"
                    className="w-full px-2.5 py-1.5 text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Số liệu lớn
                  </label>
                  <input
                    type="text"
                    value={stat2.value}
                    onChange={(e) =>
                      setStat2((prev) => ({ ...prev, value: e.target.value }))
                    }
                    placeholder="99.9%"
                    className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Khẩu hiệu / Thành tích (hỗ trợ xuống dòng)
                </label>
                <textarea
                  rows={2}
                  value={stat2.tagline}
                  onChange={(e) =>
                    setStat2((prev) => ({ ...prev, tagline: e.target.value }))
                  }
                  placeholder="HOMECRAFT&#10;ELIMINATED OVERSELLING &amp;&#10;CUT MANUAL OPS BY 85%"
                  className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-slate-800 resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Nhãn giải thích chỉ số
                </label>
                <input
                  type="text"
                  value={stat2.label}
                  onChange={(e) =>
                    setStat2((prev) => ({ ...prev, label: e.target.value }))
                  }
                  placeholder="WMS Barcode Scan Accuracy"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* =========================================================================
          CARD 6: NÚT LIÊN KẾT (CTA BUTTON)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-4 bg-white border border-slate-200/90">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            6. Nút liên kết ở chân khối (CTA Button)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Nút bo tròn điều hướng người dùng khám phá toàn bộ các câu chuyện khách hàng thực tế
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Nhãn nút (Button Text)"
            inputID="cta-text"
            description="Dòng chữ hiển thị trên nút bấm"
          >
            <input
              id="cta-text"
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="Read Customer Stories"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
            />
          </Field>

          <Field
            label="Đường dẫn liên kết (Button Href)"
            inputID="cta-href"
            description="Trang đích khi người dùng nhấp vào nút"
          >
            <input
              id="cta-href"
              type="text"
              value={ctaHref}
              onChange={(e) => setCtaHref(e.target.value)}
              placeholder="/our-work"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
            />
          </Field>
        </div>
      </Card>

      {/* =========================================================================
          BOTTOM ACTION BAR
          ========================================================================= */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <Button
          label="Quay lại danh sách section"
          variant="secondary"
          className="px-4 h-10"
          href="/admin/home"
        />

        <div className="flex items-center gap-3">
          <Button
            label="Hủy bỏ"
            variant="ghost"
            className="px-4 h-10"
            href="/admin/home"
          />
          <Button
            label={isSaving ? 'Đang lưu...' : 'Lưu thay đổi section'}
            variant="primary"
            type="submit"
            className="px-4 h-10"
            isDisabled={isSaving}
          />
        </div>
      </div>
    </form>
  );
}
