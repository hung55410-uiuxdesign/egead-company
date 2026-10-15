'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button, Card, Badge } from '@astryxdesign/core';
import type {
  HomeSectionModel,
  HeaderMenuItem,
  HeaderServicesMenuData,
} from '@/lib/services/home-section.service';
import { useUploadMedia, useUpdateHomeSectionMutation } from '@/lib/hooks';

interface HeaderMenuConfigSectionProps {
  initialSection?: HomeSectionModel | null;
  onSwitchToPartners?: () => void;
}

export default function HeaderMenuConfigSection({
  initialSection,
  onSwitchToPartners,
}: HeaderMenuConfigSectionProps) {
  const router = useRouter();

  const rawData: any = initialSection?.data || {};
  const unwrappedData: HeaderServicesMenuData =
    rawData?.data && (rawData.data?.services || rawData.data?.industries)
      ? rawData.data
      : rawData;

  const menuConfig: HeaderServicesMenuData = {
    ...unwrappedData,
    services:
      unwrappedData.services && unwrappedData.services.length > 0
        ? unwrappedData.services
        : [
            {
              name: 'Strategy & Design',
              href: '/services/all-services/strategy-design',
              icon: '/assets/icon_strategy_design.svg',
            },
            {
              name: 'Data & Analytics',
              href: '/services/all-services/data-analytics',
              icon: '/assets/icon_data_analytics.svg',
            },
            {
              name: 'Enterprise Technology',
              href: '/services/all-services/enterprise-technology',
              icon: '/assets/icon_enterprise_tech.svg',
            },
            {
              name: 'Commerce & CX Operations',
              href: '/services/all-services/commerce-cx--operations',
              icon: '/assets/icon_commerce_cx.svg',
            },
          ],
    industries:
      unwrappedData.industries && unwrappedData.industries.length > 0
        ? unwrappedData.industries
        : [
            {
              name: 'Automotive',
              href: '/services/all-services/automotive',
              icon: '/assets/icon_automotive.svg',
            },
            {
              name: 'Banking & Insurance',
              href: '/services/all-services/banking-insurance',
              icon: '/assets/icon_banking.svg',
            },
            {
              name: 'Chemicals',
              href: '/services/all-services/chemicals',
              icon: '/assets/icon_chemicals.svg',
            },
            {
              name: 'Consumer Goods',
              href: '/services/all-services/consumer-goods',
              icon: '/assets/icon_consumergoods.svg',
            },
            {
              name: 'Fashion & Lifestyle',
              href: '/services/all-services/fashion',
              icon: '/assets/icon_fashion.svg',
            },
            {
              name: 'Health & Science',
              href: '/services/all-services/health-science',
              icon: '/assets/icon_science.svg',
            },
          ],
    partners:
      unwrappedData.partners && unwrappedData.partners.length > 0
        ? unwrappedData.partners
        : [
            { name: 'SAP', href: '/partners/sap' },
            { name: 'Shopify Plus', href: '/partners/shopify-plus' },
            { name: 'Sitecore', href: '/partners/site-core' },
            { name: 'Stripe', href: '/partners/stripe' },
          ],
    allServicesText: unwrappedData.allServicesText || 'All Our Services',
    allServicesHref: unwrappedData.allServicesHref || '/services/all-services',
    allIndustriesText: unwrappedData.allIndustriesText || 'All Industries',
    allIndustriesHref: unwrappedData.allIndustriesHref || '/services/all-services',
    allPartnersText: unwrappedData.allPartnersText || 'All Partners',
    allPartnersHref: unwrappedData.allPartnersHref || '/partners',
  };

  const [services, setServices] = useState<HeaderMenuItem[]>(menuConfig.services || []);
  const [industries, setIndustries] = useState<HeaderMenuItem[]>(menuConfig.industries || []);
  const [partners, setPartners] = useState<HeaderMenuItem[]>(menuConfig.partners || []);

  const [allServicesText, setAllServicesText] = useState(menuConfig.allServicesText || 'All Our Services');
  const [allServicesHref, setAllServicesHref] = useState(menuConfig.allServicesHref || '/services/all-services');

  const [allIndustriesText, setAllIndustriesText] = useState(menuConfig.allIndustriesText || 'All Industries');
  const [allIndustriesHref, setAllIndustriesHref] = useState(menuConfig.allIndustriesHref || '/services/all-services');

  const [allPartnersText, setAllPartnersText] = useState(menuConfig.allPartnersText || 'All Partners');
  const [allPartnersHref, setAllPartnersHref] = useState(menuConfig.allPartnersHref || '/partners');

  const [activeColumn, setActiveColumn] = useState<'services' | 'industries' | 'partners'>('services');
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);

  // TanStack Query Mutation
  const updateMutation = useUpdateHomeSectionMutation();
  const isSaving = updateMutation.isPending;

  // Cloudinary Upload
  const { uploadFile, isUploading } = useUploadMedia({
    defaultFolder: 'egead_cms/header_menu',
    successMessage: 'Tải icon lên thành công!',
    onSuccess: (data) => {
      if (!uploadingTarget) return;
      if (uploadingTarget === 'new-services') {
        setServices((prev) => [
          ...prev,
          { name: 'Dịch vụ mới', href: '/services/all-services', icon: data.url },
        ]);
      } else if (uploadingTarget === 'new-industries') {
        setIndustries((prev) => [
          ...prev,
          { name: 'Ngành nghề mới', href: '/services/all-services', icon: data.url },
        ]);
      } else {
        const [col, indexStr] = uploadingTarget.split('-');
        const idx = parseInt(indexStr, 10);
        if (col === 'services') {
          setServices((prev) =>
            prev.map((item, i) => (i === idx ? { ...item, icon: data.url } : item))
          );
        } else if (col === 'industries') {
          setIndustries((prev) =>
            prev.map((item, i) => (i === idx ? { ...item, icon: data.url } : item))
          );
        }
      }
      setUploadingTarget(null);
    },
    onError: (err) => {
      alert(`Tải file thất bại: ${err.message}`);
      setUploadingTarget(null);
    },
  });

  const handleUploadItemIcon = async (
    column: 'services' | 'industries',
    index: number,
    file: File
  ) => {
    setUploadingTarget(`${column}-${index}`);
    await uploadFile(file);
  };

  const handleUploadNewItem = async (
    column: 'services' | 'industries',
    file: File
  ) => {
    setUploadingTarget(`new-${column}`);
    await uploadFile(file);
  };

  // Helper to normalize and convert name to slug
  const toSlug = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/&/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  // Services handlers
  const handleUpdateService = (index: number, field: keyof HeaderMenuItem, value: string) => {
    setServices((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };
  const handleUpdateServiceName = (index: number, name: string) => {
    setServices((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const isDefaultOrEmpty =
          !item.href ||
          item.href === '/services/all-services' ||
          item.href === '/services/all-services/dich-vu-moi';
        const newHref =
          isDefaultOrEmpty && name.trim()
            ? `/services/all-services/${toSlug(name)}`
            : item.href;
        return { ...item, name, href: newHref };
      })
    );
  };
  const handleGenerateServiceSlug = (index: number) => {
    const item = services[index];
    if (!item?.name?.trim()) return;
    const slug = toSlug(item.name);
    handleUpdateService(index, 'href', `/services/all-services/${slug}`);
  };
  const handleGenerateAllServiceSlugs = () => {
    setServices((prev) =>
      prev.map((item) => {
        if (!item.name?.trim()) return item;
        return {
          ...item,
          href: `/services/all-services/${toSlug(item.name)}`,
        };
      })
    );
  };
  const handleClearServiceIcon = (index: number) => {
    handleUpdateService(index, 'icon', '');
  };
  const handleAddService = () => {
    setServices((prev) => [
      ...prev,
      { name: 'Dịch vụ mới', href: '/services/all-services/dich-vu-moi', icon: '' },
    ]);
  };
  const handleRemoveService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  // Industries handlers
  const handleUpdateIndustry = (index: number, field: keyof HeaderMenuItem, value: string) => {
    setIndustries((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };
  const handleUpdateIndustryName = (index: number, name: string) => {
    setIndustries((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const isDefaultOrEmpty =
          !item.href ||
          item.href === '/services/all-services' ||
          item.href === '/services/all-services/nganh-nghe-moi';
        const newHref =
          isDefaultOrEmpty && name.trim()
            ? `/services/all-services/${toSlug(name)}`
            : item.href;
        return { ...item, name, href: newHref };
      })
    );
  };
  const handleGenerateIndustrySlug = (index: number) => {
    const item = industries[index];
    if (!item?.name?.trim()) return;
    const slug = toSlug(item.name);
    handleUpdateIndustry(index, 'href', `/services/all-services/${slug}`);
  };
  const handleGenerateAllIndustrySlugs = () => {
    setIndustries((prev) =>
      prev.map((item) => {
        if (!item.name?.trim()) return item;
        return {
          ...item,
          href: `/services/all-services/${toSlug(item.name)}`,
        };
      })
    );
  };
  const handleClearIndustryIcon = (index: number) => {
    handleUpdateIndustry(index, 'icon', '');
  };
  const handleAddIndustry = () => {
    setIndustries((prev) => [
      ...prev,
      { name: 'Ngành nghề mới', href: '/services/all-services/nganh-nghe-moi', icon: '' },
    ]);
  };
  const handleRemoveIndustry = (index: number) => {
    setIndustries((prev) => prev.filter((_, i) => i !== index));
  };

  // Partners handlers
  const handleUpdatePartner = (index: number, field: keyof HeaderMenuItem, value: string) => {
    setPartners((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };
  const handleUpdatePartnerName = (index: number, name: string) => {
    setPartners((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const isDefaultOrEmpty =
          !item.href ||
          item.href === '/partners' ||
          item.href === '/partners/doi-tac-moi';
        const newHref =
          isDefaultOrEmpty && name.trim()
            ? `/partners/${toSlug(name)}`
            : item.href;
        return { ...item, name, href: newHref };
      })
    );
  };
  const handleGeneratePartnerSlug = (index: number) => {
    const item = partners[index];
    if (!item?.name?.trim()) return;
    const slug = toSlug(item.name);
    handleUpdatePartner(index, 'href', `/partners/${slug}`);
  };
  const handleGenerateAllPartnerSlugs = () => {
    setPartners((prev) =>
      prev.map((item) => {
        if (!item.name?.trim()) return item;
        return {
          ...item,
          href: `/partners/${toSlug(item.name)}`,
        };
      })
    );
  };
  const handleAddPartner = () => {
    setPartners((prev) => [
      ...prev,
      { name: 'Đối tác mới', href: '/partners/doi-tac-moi' },
    ]);
  };
  const handleRemovePartner = (index: number) => {
    setPartners((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await updateMutation.mutateAsync({
        key: 'header-services-menu',
        title: 'Our Services Mega Menu',
        subtitle: 'Menu điều hướng Header',
        description:
          'Cấu hình 3 cột danh sách hiển thị trên thanh Menu dropdown Our Services: Services, Industries và Partners.',
        isActive: true,
        data: {
          services,
          industries,
          partners,
          allServicesText: allServicesText.trim(),
          allServicesHref: allServicesHref.trim(),
          allIndustriesText: allIndustriesText.trim(),
          allIndustriesHref: allIndustriesHref.trim(),
          allPartnersText: allPartnersText.trim(),
          allPartnersHref: allPartnersHref.trim(),
        },
      });

      // Auto synchronize partners in Column 3 to PartnerItem table
      try {
        await fetch('/api/admin/partners/sync-menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ partners }),
        });
      } catch (syncErr) {
        console.warn('[HeaderMenuConfigSection] Partner sync warning:', syncErr);
      }

      router.refresh();
    } catch (err: any) {
      alert(`Lưu thất bại: ${err?.message || 'Có lỗi xảy ra'}`);
    }
  };

  return (
    <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 shadow-sm space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold text-slate-900">
              Cấu hình Menu Header (Mega Menu Dropdown)
            </h2>
            <Badge
              label="Menu điều hướng"
              variant="neutral"
              className="h-7 px-3 text-xs"
            />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Quản lý trực tiếp 3 cột danh mục xuất hiện khi người dùng rê chuột vào mục &quot;Our Services&quot; trên thanh Menu Header
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            label={isSaving ? 'Đang lưu...' : 'Lưu cấu hình Menu'}
            variant="primary"
            className="px-5 h-10"
            isDisabled={isSaving || isUploading}
            onClick={handleSave}
          />
        </div>
      </div>

      {/* Guide notice */}
      <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>
          💡 <strong>Hướng dẫn quản lý icon:</strong> Bạn có thể bấm trực tiếp vào ô biểu tượng bên trái hoặc bấm nút <strong>Tải icon</strong> trên từng mục để chọn file ảnh/SVG từ máy tính. Bấm nút <strong>Xóa icon</strong> nếu muốn gỡ biểu tượng của mục đó.
        </span>
      </div>

      {/* Column Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100/80 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setActiveColumn('services')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeColumn === 'services'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Cột 1: Our Services ({services.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveColumn('industries')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeColumn === 'industries'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Cột 2: Industries ({industries.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveColumn('partners')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeColumn === 'partners'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Cột 3: Partners ({partners.length})
        </button>
      </div>

      {/* Tab 1: Our Services */}
      {activeColumn === 'services' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-600">
              Danh sách các dịch vụ hiển thị ở cột 1
            </span>
            <div className="flex items-center gap-2">
              <Button
                label="Tạo lại tất cả slug"
                variant="secondary"
                className="px-3 h-8 text-xs"
                onClick={handleGenerateAllServiceSlugs}
                tooltip="Tự động cập nhật lại toàn bộ đường dẫn cột 1 theo tên"
              />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*,.svg"
                  className="hidden"
                  disabled={isUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      await handleUploadNewItem('services', file);
                      e.target.value = '';
                    }
                  }}
                />
                <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors shadow-2xs">
                  {uploadingTarget === 'new-services' ? 'Đang tải...' : 'Tải icon mới từ máy tính'}
                </span>
              </label>
              <Button
                label="Thêm mục rỗng"
                variant="secondary"
                className="px-3 h-8 text-xs"
                onClick={handleAddService}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-slate-50/90 border border-slate-200 rounded-2xl flex items-start gap-3.5 relative group hover:border-slate-300 transition-colors"
              >
                {/* Clickable Icon Preview Box */}
                <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                  <label
                    className="cursor-pointer group/preview relative w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2.5 border border-slate-200/90 shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-all overflow-hidden"
                    title="Click để chọn icon thay thế từ máy tính"
                  >
                    <input
                      type="file"
                      accept="image/*,.svg"
                      className="hidden"
                      disabled={isUploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleUploadItemIcon('services', index, file);
                          e.target.value = '';
                        }
                      }}
                    />
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain transition-transform group-hover/preview:scale-105"
                        onError={(e) => {
                          (e.target as HTMLElement).style.opacity = '0.3';
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-300">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center text-[10px] text-white font-medium transition-opacity backdrop-blur-[0.5px]">
                      {uploadingTarget === `services-${index}` ? '...' : (item.icon ? 'Đổi icon' : 'Tải icon')}
                    </div>
                  </label>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {uploadingTarget === `services-${index}` ? 'Đang tải...' : (item.icon ? 'Icon' : 'Chưa có')}
                  </span>
                </div>

                {/* Form fields */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateServiceName(index, e.target.value)}
                      placeholder="Tên dịch vụ (ví dụ: Strategy & Design)"
                      className="flex-1 px-3 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveService(index)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
                      title="Xóa mục này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => handleUpdateService(index, 'href', e.target.value)}
                      placeholder="Đường dẫn (ví dụ: /services/all-services/strategy-design)"
                      className="flex-1 min-w-0 px-3 py-1.5 text-[11px] font-mono bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-slate-800"
                    />
                    <Button
                      type="button"
                      label="Tạo slug"
                      variant="secondary"
                      size="sm"
                      className="px-2.5 h-[29px] text-[11px] font-medium shrink-0"
                      onClick={() => handleGenerateServiceSlug(index)}
                      tooltip="Tự động tạo đường dẫn theo tên dịch vụ"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.icon || ''}
                      onChange={(e) => handleUpdateService(index, 'icon', e.target.value)}
                      placeholder="URL Icon (/assets/icon_...)"
                      className="flex-1 min-w-0 px-3 py-1.5 text-[11px] font-mono bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-slate-800"
                    />
                    <label className="cursor-pointer shrink-0">
                      <input
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        disabled={isUploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            await handleUploadItemIcon('services', index, file);
                            e.target.value = '';
                          }
                        }}
                      />
                      <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-2xs hover:border-slate-400">
                        {uploadingTarget === `services-${index}` ? 'Đang tải...' : 'Tải icon'}
                      </span>
                    </label>
                    <Button
                      type="button"
                      label="Xóa icon"
                      variant="secondary"
                      size="sm"
                      className="px-2.5 h-[29px] text-[11px] font-medium shrink-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                      onClick={() => handleClearServiceIcon(index)}
                      isDisabled={!item.icon?.trim()}
                      tooltip="Xóa icon của mục này"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Button CTA for Column 1 */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Nhãn nút xem thêm cột 1
              </label>
              <input
                type="text"
                value={allServicesText}
                onChange={(e) => setAllServicesText(e.target.value)}
                placeholder="All Our Services"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Đường dẫn nút xem thêm cột 1
              </label>
              <input
                type="text"
                value={allServicesHref}
                onChange={(e) => setAllServicesHref(e.target.value)}
                placeholder="/services/all-services"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Industries */}
      {activeColumn === 'industries' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-600">
              Danh sách các ngành nghề hiển thị ở cột 2
            </span>
            <div className="flex items-center gap-2">
              <Button
                label="Tạo lại tất cả slug"
                variant="secondary"
                className="px-3 h-8 text-xs"
                onClick={handleGenerateAllIndustrySlugs}
                tooltip="Tự động cập nhật lại toàn bộ đường dẫn cột 2 theo tên"
              />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*,.svg"
                  className="hidden"
                  disabled={isUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      await handleUploadNewItem('industries', file);
                      e.target.value = '';
                    }
                  }}
                />
                <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors shadow-2xs">
                  {uploadingTarget === 'new-industries' ? 'Đang tải...' : 'Tải icon mới từ máy tính'}
                </span>
              </label>
              <Button
                label="Thêm mục rỗng"
                variant="secondary"
                className="px-3 h-8 text-xs"
                onClick={handleAddIndustry}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industries.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-slate-50/90 border border-slate-200 rounded-2xl flex items-start gap-3.5 relative group hover:border-slate-300 transition-colors"
              >
                {/* Clickable Icon Preview Box */}
                <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                  <label
                    className="cursor-pointer group/preview relative w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2.5 border border-slate-200/90 shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-all overflow-hidden"
                    title="Click để chọn icon thay thế từ máy tính"
                  >
                    <input
                      type="file"
                      accept="image/*,.svg"
                      className="hidden"
                      disabled={isUploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleUploadItemIcon('industries', index, file);
                          e.target.value = '';
                        }
                      }}
                    />
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain transition-transform group-hover/preview:scale-105"
                        onError={(e) => {
                          (e.target as HTMLElement).style.opacity = '0.3';
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-300">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center text-[10px] text-white font-medium transition-opacity backdrop-blur-[0.5px]">
                      {uploadingTarget === `industries-${index}` ? '...' : (item.icon ? 'Đổi icon' : 'Tải icon')}
                    </div>
                  </label>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {uploadingTarget === `industries-${index}` ? 'Đang tải...' : (item.icon ? 'Icon' : 'Chưa có')}
                  </span>
                </div>

                {/* Form fields */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateIndustryName(index, e.target.value)}
                      placeholder="Tên ngành nghề (ví dụ: Automotive)"
                      className="flex-1 px-3 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveIndustry(index)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
                      title="Xóa mục này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => handleUpdateIndustry(index, 'href', e.target.value)}
                      placeholder="Đường dẫn (ví dụ: /services/all-services/automotive)"
                      className="flex-1 min-w-0 px-3 py-1.5 text-[11px] font-mono bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-slate-800"
                    />
                    <Button
                      type="button"
                      label="Tạo slug"
                      variant="secondary"
                      size="sm"
                      className="px-2.5 h-[29px] text-[11px] font-medium shrink-0"
                      onClick={() => handleGenerateIndustrySlug(index)}
                      tooltip="Tự động tạo đường dẫn theo tên ngành nghề"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.icon || ''}
                      onChange={(e) => handleUpdateIndustry(index, 'icon', e.target.value)}
                      placeholder="URL Icon (/assets/icon_...)"
                      className="flex-1 min-w-0 px-3 py-1.5 text-[11px] font-mono bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-slate-800"
                    />
                    <label className="cursor-pointer shrink-0">
                      <input
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        disabled={isUploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            await handleUploadItemIcon('industries', index, file);
                            e.target.value = '';
                          }
                        }}
                      />
                      <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-2xs hover:border-slate-400">
                        {uploadingTarget === `industries-${index}` ? 'Đang tải...' : 'Tải icon'}
                      </span>
                    </label>
                    <Button
                      type="button"
                      label="Xóa icon"
                      variant="secondary"
                      size="sm"
                      className="px-2.5 h-[29px] text-[11px] font-medium shrink-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                      onClick={() => handleClearIndustryIcon(index)}
                      isDisabled={!item.icon?.trim()}
                      tooltip="Xóa icon của mục này"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Button CTA for Column 2 */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Nhãn nút xem thêm cột 2
              </label>
              <input
                type="text"
                value={allIndustriesText}
                onChange={(e) => setAllIndustriesText(e.target.value)}
                placeholder="All Industries"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Đường dẫn nút xem thêm cột 2
              </label>
              <input
                type="text"
                value={allIndustriesHref}
                onChange={(e) => setAllIndustriesHref(e.target.value)}
                placeholder="/services/all-services"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Partners */}
      {activeColumn === 'partners' && (
        <div className="space-y-5">
          {/* Informative notice linking Menu with Partners management */}
          <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-900">
            <div>
              <p className="font-semibold text-slate-800">
                Menu Header là gốc dữ liệu cho các trang đối tác chiến lược
              </p>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Các mục đối tác ở Cột 3 này tự động đồng bộ và liên kết trực tiếp với bài viết chi tiết tại tab "Đối tác chiến lược".
              </p>
            </div>
            {onSwitchToPartners && (
              <Button
                type="button"
                label="Sang tab Quản lý nội dung bài viết đối tác"
                variant="secondary"
                size="sm"
                className="px-3 h-8 text-xs shrink-0 whitespace-nowrap bg-white hover:bg-blue-50 text-blue-800 border-blue-300"
                onClick={onSwitchToPartners}
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Danh sách đối tác hiển thị ở cột 3
            </span>
            <div className="flex items-center gap-2">
              <Button
                label="Tạo lại tất cả slug"
                variant="secondary"
                className="px-3 h-8 text-xs"
                onClick={handleGenerateAllPartnerSlugs}
                tooltip="Tự động cập nhật lại toàn bộ đường dẫn cột 3 theo tên"
              />
              <Button
                label="Thêm đối tác vào menu"
                variant="secondary"
                className="px-3 h-8 text-xs"
                onClick={handleAddPartner}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {partners.map((item, index) => (
              <div
                key={index}
                className="p-3.5 bg-slate-50/80 border border-slate-200 rounded-xl flex items-center gap-3 relative group"
              >
                <div className="flex-1 min-w-0 space-y-1.5">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdatePartnerName(index, e.target.value)}
                    placeholder="Tên đối tác (ví dụ: SAP, Shopify Plus...)"
                    className="w-full px-2.5 py-1 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => handleUpdatePartner(index, 'href', e.target.value)}
                      placeholder="/partners/..."
                      className="flex-1 min-w-0 px-2.5 py-1 text-[11px] font-mono bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-slate-800"
                    />
                    <Button
                      type="button"
                      label="Tạo slug"
                      variant="secondary"
                      size="sm"
                      className="px-2 h-6 text-[10px] font-medium shrink-0"
                      onClick={() => handleGeneratePartnerSlug(index)}
                      tooltip="Tự động tạo đường dẫn theo tên đối tác"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemovePartner(index)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-200/50"
                  title="Xóa mục này"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Button CTA for Column 3 */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Nhãn nút xem thêm cột 3
              </label>
              <input
                type="text"
                value={allPartnersText}
                onChange={(e) => setAllPartnersText(e.target.value)}
                placeholder="All Partners"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Đường dẫn nút xem thêm cột 3
              </label>
              <input
                type="text"
                value={allPartnersHref}
                onChange={(e) => setAllPartnersHref(e.target.value)}
                placeholder="/partners"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900"
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
