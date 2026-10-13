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
}

export default function HeaderMenuConfigSection({
  initialSection,
}: HeaderMenuConfigSectionProps) {
  const router = useRouter();

  const menuConfig: HeaderServicesMenuData = initialSection?.data || {
    services: [
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
    industries: [
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
    partners: [
      { name: 'SAP', href: '/partners/sap' },
      { name: 'Shopify Plus', href: '/partners/shopify-plus' },
      { name: 'Sitecore', href: '/partners/site-core' },
      { name: 'Stripe', href: '/partners/stripe' },
    ],
    allServicesText: 'All Our Services',
    allServicesHref: '/services/all-services',
    allIndustriesText: 'All Industries',
    allIndustriesHref: '/services/all-services',
    allPartnersText: 'All Partners',
    allPartnersHref: '/partners',
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

  // Services handlers
  const handleUpdateService = (index: number, field: keyof HeaderMenuItem, value: string) => {
    setServices((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };
  const handleAddService = () => {
    setServices((prev) => [
      ...prev,
      { name: 'Dịch vụ mới', href: '/services/all-services', icon: '/assets/icon_strategy_design.svg' },
    ]);
  };
  const handleRemoveService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  // Industries handlers
  const handleUpdateIndustry = (index: number, field: keyof HeaderMenuItem, value: string) => {
    setIndustries((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };
  const handleAddIndustry = () => {
    setIndustries((prev) => [
      ...prev,
      { name: 'Ngành nghề mới', href: '/services/all-services', icon: '/assets/icon_automotive.svg' },
    ]);
  };
  const handleRemoveIndustry = (index: number) => {
    setIndustries((prev) => prev.filter((_, i) => i !== index));
  };

  // Partners handlers
  const handleUpdatePartner = (index: number, field: keyof HeaderMenuItem, value: string) => {
    setPartners((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };
  const handleAddPartner = () => {
    setPartners((prev) => [
      ...prev,
      { name: 'Đối tác mới', href: '/partners' },
    ]);
  };
  const handleRemovePartner = (index: number) => {
    setPartners((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      title: 'Our Services Mega Menu',
      subtitle: 'Menu điều hướng Header',
      description: 'Cấu hình 3 cột danh sách hiển thị trên thanh Menu dropdown Our Services: Services, Industries và Partners.',
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
    };

    try {
      await updateMutation.mutateAsync({
        key: 'header-services-menu',
        data: payload,
      });
      alert('Đã lưu thành công cấu hình Menu Header!');
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
          💡 <strong>Hướng dẫn tải icon:</strong> Bạn có thể bấm trực tiếp vào ô vuông biểu tượng màu đen bên trái hoặc bấm nút <strong>Tải icon</strong> trên từng mục để chọn file ảnh/SVG từ máy tính.
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
                    className="cursor-pointer group/preview relative w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center p-2.5 border border-slate-700 hover:border-emerald-500 transition-all overflow-hidden shadow-xs"
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
                    <img
                      src={item.icon || '/assets/icon_strategy_design.svg'}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover/preview:opacity-30 transition-opacity"
                      onError={(e) => {
                        (e.target as HTMLElement).style.opacity = '0.3';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center text-[10px] text-white font-medium transition-opacity">
                      {uploadingTarget === `services-${index}` ? '...' : 'Đổi icon'}
                    </div>
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {uploadingTarget === `services-${index}` ? 'Đang tải...' : 'Icon'}
                  </span>
                </div>

                {/* Form fields */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateService(index, 'name', e.target.value)}
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

                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => handleUpdateService(index, 'href', e.target.value)}
                    placeholder="Đường dẫn (ví dụ: /services/all-services/strategy-design)"
                    className="w-full px-3 py-1.5 text-[11px] font-mono bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-slate-800"
                  />

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
                    className="cursor-pointer group/preview relative w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center p-2.5 border border-slate-700 hover:border-emerald-500 transition-all overflow-hidden shadow-xs"
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
                    <img
                      src={item.icon || '/assets/icon_automotive.svg'}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover/preview:opacity-30 transition-opacity"
                      onError={(e) => {
                        (e.target as HTMLElement).style.opacity = '0.3';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center text-[10px] text-white font-medium transition-opacity">
                      {uploadingTarget === `industries-${index}` ? '...' : 'Đổi icon'}
                    </div>
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {uploadingTarget === `industries-${index}` ? 'Đang tải...' : 'Icon'}
                  </span>
                </div>

                {/* Form fields */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateIndustry(index, 'name', e.target.value)}
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

                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => handleUpdateIndustry(index, 'href', e.target.value)}
                    placeholder="Đường dẫn (ví dụ: /services/all-services/automotive)"
                    className="w-full px-3 py-1.5 text-[11px] font-mono bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-slate-800"
                  />

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
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Danh sách đối tác hiển thị ở cột 3
            </span>
            <Button
              label="Thêm đối tác vào menu"
              variant="secondary"
              className="px-3 h-8 text-xs"
              onClick={handleAddPartner}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {partners.map((item, index) => (
              <div
                key={index}
                className="p-3.5 bg-slate-50/80 border border-slate-200 rounded-xl flex items-center gap-3 relative group"
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdatePartner(index, 'name', e.target.value)}
                    placeholder="Tên đối tác (ví dụ: SAP, Shopify Plus...)"
                    className="w-full px-2.5 py-1 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => handleUpdatePartner(index, 'href', e.target.value)}
                    placeholder="/partners/..."
                    className="w-full px-2.5 py-1 text-[11px] font-mono bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-slate-800"
                  />
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
