'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import {
  Upload,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  ExternalLink,
  Globe,
  Clock,
  Layers,
  Share2,
  Mail,
  ShieldCheck,
  Check,
  FileJson,
  Download,
} from 'lucide-react';
import { Button, Card, Badge, Field, useToast } from '@astryxdesign/core';
import type { HomeSectionModel } from '@/lib/services/home-section.service';
import {
  DEFAULT_FOOTER_CONFIG,
  normalizeFooterConfig,
  type FooterConfigData,
  type FooterNavColumn,
  type FooterNavLink,
  type SocialLink,
  type TimezoneLocation,
} from '@/lib/services/footer-config.service';
import { useUploadMedia, useUpdateFooterConfigMutation } from '@/lib/hooks';

interface FooterConfigFormClientProps {
  section: HomeSectionModel;
}

type TabType = 'topbar' | 'navigation' | 'newsletter' | 'worldclocks' | 'json';

const POPULAR_TIMEZONES = [
  { name: 'Vietnam (HQ)', tz: 'Asia/Ho_Chi_Minh' },
  { name: 'US (Pacific)', tz: 'America/Los_Angeles' },
  { name: 'US (Eastern)', tz: 'America/New_York' },
  { name: 'London (UK)', tz: 'Europe/London' },
  { name: 'Frankfurt (DE)', tz: 'Europe/Berlin' },
  { name: 'Tokyo (JP)', tz: 'Asia/Tokyo' },
  { name: 'Singapore (SG)', tz: 'Asia/Singapore' },
  { name: 'Sydney (AU)', tz: 'Australia/Sydney' },
];

export default function FooterConfigFormClient({
  section,
}: FooterConfigFormClientProps) {
  const initialConfig = normalizeFooterConfig(section.data);

  const [activeTab, setActiveTab] = useState<TabType>('topbar');
  const [isActive, setIsActive] = useState<boolean>(section.isActive ?? true);
  const [config, setConfig] = useState<FooterConfigData>(initialConfig);
  const [activeUploadIndex, setActiveUploadIndex] = useState<number | null>(null);

  // JSON Management State
  const toast = useToast();
  const jsonFileInputRef = React.useRef<HTMLInputElement>(null);
  const [jsonText, setJsonText] = useState<string>(() =>
    JSON.stringify(initialConfig, null, 2)
  );
  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleTabChange = (newTab: TabType) => {
    if (newTab === 'json') {
      setJsonText(JSON.stringify(config, null, 2));
      setJsonError(null);
    }
    setActiveTab(newTab);
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const normalized = normalizeFooterConfig(parsed);
      setConfig(normalized);
      setJsonError(null);
      toast({
        body: 'Đã nạp và áp dụng dữ liệu JSON vào form cấu hình thành công!',
        type: 'info',
        isAutoHide: true,
        autoHideDuration: 3500,
      });
    } catch (err: any) {
      setJsonError(err.message || 'Cú pháp JSON chưa hợp lệ');
      toast({
        body: 'Cú pháp JSON chưa hợp lệ, vui lòng kiểm tra lại.',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 3500,
      });
    }
  };

  const handleDownloadJson = () => {
    try {
      const blob = new Blob([jsonText], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cau_hinh_footer_egead_${new Date()
        .toISOString()
        .slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({
        body: 'Đã xuất file JSON cấu hình footer thành công!',
        type: 'info',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoadDefaultJson = () => {
    setJsonText(JSON.stringify(DEFAULT_FOOTER_CONFIG, null, 2));
    setJsonError(null);
    toast({
      body: 'Đã nạp cấu hình JSON mặc định vào khung soạn thảo.',
      type: 'info',
      isAutoHide: true,
      autoHideDuration: 3000,
    });
  };

  const handleJsonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setJsonText(text || '');
      setJsonError(null);
      toast({
        body: `Đã đọc thành công file "${file.name}"`,
        type: 'info',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    };
    reader.readAsText(file);
  };

  const updateMutation = useUpdateFooterConfigMutation();
  const isSaving = updateMutation.isPending;

  // Cloudinary uploader for Logo
  const { uploadFile: uploadLogoFile, isUploading: isUploadingLogo } =
    useUploadMedia({
      defaultFolder: 'egead_cms/footer',
      successMessage: 'Tải logo chân trang thành công!',
      onSuccess: (data) => {
        setConfig((prev) => ({
          ...prev,
          topBar: { ...prev.topBar, logoUrl: data.url },
        }));
      },
    });

  // Cloudinary uploader for Badge
  const { uploadFile: uploadBadgeFile, isUploading: isUploadingBadge } =
    useUploadMedia({
      defaultFolder: 'egead_cms/footer',
      successMessage: 'Tải huy hiệu chứng nhận thành công!',
      onSuccess: (data) => {
        setConfig((prev) => ({
          ...prev,
          certification: { ...prev.certification, badgeImage: data.url },
        }));
      },
    });

  // Cloudinary uploader for Social Icons
  const { uploadFile: uploadSocialIcon, isUploading: isUploadingSocial } =
    useUploadMedia({
      defaultFolder: 'egead_cms/footer/social',
      successMessage: 'Tải icon mạng xã hội thành công!',
      onSuccess: (data) => {
        if (activeUploadIndex !== null) {
          handleUpdateSocialLink(activeUploadIndex, 'icon', data.url);
          setActiveUploadIndex(null);
        }
      },
    });

  // Top Bar Handlers
  const handleUpdateTopBar = (field: keyof FooterConfigData['topBar'], value: any) => {
    setConfig((prev) => ({
      ...prev,
      topBar: { ...prev.topBar, [field]: value },
    }));
  };

  const handleUpdateSocialLink = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    setConfig((prev) => {
      const updated = [...prev.topBar.socialLinks];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        topBar: { ...prev.topBar, socialLinks: updated },
      };
    });
  };

  const handleAddSocialLink = () => {
    setConfig((prev) => ({
      ...prev,
      topBar: {
        ...prev.topBar,
        socialLinks: [
          ...prev.topBar.socialLinks,
          {
            name: 'Mạng xã hội mới',
            href: 'https://',
            icon: '/assets/Facebook_Black.svg',
          },
        ],
      },
    }));
  };

  const handleRemoveSocialLink = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      topBar: {
        ...prev.topBar,
        socialLinks: prev.topBar.socialLinks.filter((_, i) => i !== index),
      },
    }));
  };

  const handleMoveSocialLink = (index: number, direction: 'up' | 'down') => {
    setConfig((prev) => {
      const list = [...prev.topBar.socialLinks];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= list.length) return prev;
      const temp = list[index];
      list[index] = list[target];
      list[target] = temp;
      return {
        ...prev,
        topBar: { ...prev.topBar, socialLinks: list },
      };
    });
  };

  // Nav Columns Handlers
  const handleUpdateColumnTitle = (colIndex: number, title: string) => {
    setConfig((prev) => {
      const columns = [...prev.navColumns];
      columns[colIndex] = { ...columns[colIndex], title };
      return { ...prev, navColumns: columns };
    });
  };

  const handleAddColumn = () => {
    setConfig((prev) => ({
      ...prev,
      navColumns: [
        ...prev.navColumns,
        {
          title: `Cột ${prev.navColumns.length + 1}`,
          links: [{ label: 'Liên kết mới', href: '/' }],
        },
      ],
    }));
  };

  const handleRemoveColumn = (colIndex: number) => {
    if (config.navColumns.length <= 1) {
      alert('Chân trang cần tối thiểu 1 cột liên kết');
      return;
    }
    setConfig((prev) => ({
      ...prev,
      navColumns: prev.navColumns.filter((_, i) => i !== colIndex),
    }));
  };

  const handleAddLinkToColumn = (colIndex: number) => {
    setConfig((prev) => {
      const columns = [...prev.navColumns];
      columns[colIndex] = {
        ...columns[colIndex],
        links: [...columns[colIndex].links, { label: 'Liên kết mới', href: '/' }],
      };
      return { ...prev, navColumns: columns };
    });
  };

  const handleUpdateLinkInColumn = (
    colIndex: number,
    linkIndex: number,
    field: 'label' | 'href',
    value: string
  ) => {
    setConfig((prev) => {
      const columns = [...prev.navColumns];
      const links = [...columns[colIndex].links];
      links[linkIndex] = { ...links[linkIndex], [field]: value };
      columns[colIndex] = { ...columns[colIndex], links };
      return { ...prev, navColumns: columns };
    });
  };

  const handleRemoveLinkFromColumn = (colIndex: number, linkIndex: number) => {
    setConfig((prev) => {
      const columns = [...prev.navColumns];
      columns[colIndex] = {
        ...columns[colIndex],
        links: columns[colIndex].links.filter(
          (_: FooterNavLink, i: number) => i !== linkIndex
        ),
      };
      return { ...prev, navColumns: columns };
    });
  };

  const handleMoveLinkInColumn = (
    colIndex: number,
    linkIndex: number,
    direction: 'up' | 'down'
  ) => {
    setConfig((prev) => {
      const columns = [...prev.navColumns];
      const links = [...columns[colIndex].links];
      const target = direction === 'up' ? linkIndex - 1 : linkIndex + 1;
      if (target < 0 || target >= links.length) return prev;
      const temp = links[linkIndex];
      links[linkIndex] = links[target];
      links[target] = temp;
      columns[colIndex] = { ...columns[colIndex], links };
      return { ...prev, navColumns: columns };
    });
  };

  // Newsletter Handlers
  const handleUpdateNewsletter = (
    field: keyof FooterConfigData['newsletter'],
    value: string
  ) => {
    setConfig((prev) => ({
      ...prev,
      newsletter: { ...prev.newsletter, [field]: value },
    }));
  };

  // Certification Handlers
  const handleUpdateCertification = (
    field: keyof FooterConfigData['certification'],
    value: string
  ) => {
    setConfig((prev) => ({
      ...prev,
      certification: { ...prev.certification, [field]: value },
    }));
  };

  const handleClearCertification = () => {
    setConfig((prev) => ({
      ...prev,
      certification: {
        badgeImage: '',
        badgeAlt: '',
        badgeHref: '',
      },
    }));
  };

  const handleRestoreDefaultCertification = () => {
    setConfig((prev) => ({
      ...prev,
      certification: {
        badgeImage: DEFAULT_FOOTER_CONFIG.certification.badgeImage,
        badgeAlt: DEFAULT_FOOTER_CONFIG.certification.badgeAlt,
        badgeHref: DEFAULT_FOOTER_CONFIG.certification.badgeHref || '',
      },
    }));
  };

  // Timezones Handlers
  const handleUpdateTimezone = (
    index: number,
    field: keyof TimezoneLocation,
    value: string
  ) => {
    setConfig((prev) => {
      const updated = [...prev.timezones];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, timezones: updated };
    });
  };

  const handleAddTimezone = (item?: TimezoneLocation) => {
    setConfig((prev) => ({
      ...prev,
      timezones: [
        ...prev.timezones,
        item || { name: 'Múi giờ mới', tz: 'Asia/Ho_Chi_Minh' },
      ],
    }));
  };

  const handleRemoveTimezone = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      timezones: prev.timezones.filter((_, i) => i !== index),
    }));
  };

  const handleMoveTimezone = (index: number, direction: 'up' | 'down') => {
    setConfig((prev) => {
      const list = [...prev.timezones];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= list.length) return prev;
      const temp = list[index];
      list[index] = list[target];
      list[target] = temp;
      return { ...prev, timezones: list };
    });
  };

  // Bottom Bar Handlers
  const handleUpdateBottomBar = (
    field: keyof FooterConfigData['bottomBar'],
    value: any
  ) => {
    setConfig((prev) => ({
      ...prev,
      bottomBar: { ...prev.bottomBar, [field]: value },
    }));
  };

  // Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({
        data: config,
        isActive,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full pb-16">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <Link href="/admin/home" className="hover:text-slate-900 transition">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Quản lý Chân trang</span>
          </div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900">
              Cấu hình Chân trang (Footer)
            </h1>
            <Badge
              label={isActive ? 'Đang kích hoạt' : 'Tạm ẩn'}
              variant={isActive ? 'success' : 'neutral'}
              className="h-8 px-4"
            />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Quản lý logo, mạng xã hội, các cột menu điều hướng, form nhận bản tin, múi giờ thế giới và bản quyền chân trang.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            label="Xem trang chủ Live"
            variant="secondary"
            href="/"
            target="_blank"
            className="px-4 h-11"
          />
          <Button
            label={isSaving ? 'Đang lưu...' : 'Lưu cấu hình Footer'}
            variant="primary"
            type="submit"
            isDisabled={isSaving}
            className="px-6 h-11"
          />
        </div>
      </div>

      {/* =========================================================================
          NAVIGATION TABS
          ========================================================================= */}
      <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => handleTabChange('topbar')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'topbar'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Logo & Mạng xã hội ({config.topBar.socialLinks.length})
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('navigation')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'navigation'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Cột liên kết điều hướng ({config.navColumns.length})
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('newsletter')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'newsletter'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Bản tin & Chứng nhận
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('worldclocks')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'worldclocks'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Múi giờ & Bản quyền ({config.timezones.length})
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('json')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'json'
              ? 'bg-white text-purple-700 shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Dữ liệu JSON
        </button>
      </div>

      {/* =========================================================================
          TAB 1: LOGO & MẠNG XÃ HỘI
          ========================================================================= */}
      {activeTab === 'topbar' && (
        <div className="space-y-6">
          {/* Logo Brand Card */}
          <Card className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Thương hiệu & Logo Chân trang
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tùy chỉnh hình ảnh logo hiển thị trên cùng bên trái của chân trang
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Đường dẫn ảnh Logo (URL)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={config.topBar.logoUrl}
                      onChange={(e) => handleUpdateTopBar('logoUrl', e.target.value)}
                      placeholder="/assets/logo/logo-color.png"
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                    <label className="shrink-0 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadLogoFile(file);
                        }}
                      />
                      <span className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition">
                        {isUploadingLogo ? 'Đang tải...' : 'Tải ảnh lên'}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Văn bản thay thế (Alt text)
                    </label>
                    <input
                      type="text"
                      value={config.topBar.logoAlt}
                      onChange={(e) => handleUpdateTopBar('logoAlt', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Đường dẫn khi click (Href)
                    </label>
                    <input
                      type="text"
                      value={config.topBar.logoHref}
                      onChange={(e) => handleUpdateTopBar('logoHref', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Tiêu đề khối mạng xã hội (Callout title)
                  </label>
                  <input
                    type="text"
                    value={config.topBar.networkTitle}
                    onChange={(e) =>
                      handleUpdateTopBar('networkTitle', e.target.value)
                    }
                    placeholder="JOIN OUR NETWORK"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Logo Preview */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px]">
                <span className="text-xs font-semibold text-slate-400 mb-3">
                  Xem trước logo trên nền trắng
                </span>
                <div className="p-4 bg-white rounded-xl border border-slate-200/60 shadow-xs max-w-full">
                  <img
                    src={config.topBar.logoUrl || '/assets/logo/logo-color.png'}
                    alt={config.topBar.logoAlt}
                    className="h-16 w-auto object-contain max-w-[240px]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        '/assets/logo/logo-color.png';
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Social Links Card */}
          <Card className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Mạng xã hội (Social Media Links)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Danh sách biểu tượng và liên kết các kênh truyền thông của E-GEAD
                </p>
              </div>

              <Button
                label="Thêm mạng xã hội"
                variant="secondary"
                onClick={handleAddSocialLink}
                className="px-4 h-10 shrink-0"
              />
            </div>

            <div className="space-y-3">
              {config.topBar.socialLinks.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center p-2 shrink-0">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          '/assets/Facebook_Black.svg';
                      }}
                    />
                  </div>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleUpdateSocialLink(index, 'name', e.target.value)
                        }
                        placeholder="Tên kênh (e.g. Facebook)"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) =>
                          handleUpdateSocialLink(index, 'href', e.target.value)
                        }
                        placeholder="https://..."
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) =>
                          handleUpdateSocialLink(index, 'icon', e.target.value)
                        }
                        placeholder="/assets/Facebook_Black.svg"
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                      />
                      <label className="shrink-0 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setActiveUploadIndex(index);
                              uploadSocialIcon(file);
                            }
                          }}
                        />
                        <span className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-semibold text-slate-600 transition">
                          {isUploadingSocial && activeUploadIndex === index
                            ? '...'
                            : 'Tải'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 justify-end">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveSocialLink(index, 'up')}
                      className="p-2 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-slate-100 transition"
                      aria-label="Di chuyển lên"
                    >
                      <MoveUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === config.topBar.socialLinks.length - 1}
                      onClick={() => handleMoveSocialLink(index, 'down')}
                      className="p-2 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-slate-100 transition"
                      aria-label="Di chuyển xuống"
                    >
                      <MoveDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveSocialLink(index)}
                      className="p-2 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50 transition"
                      aria-label="Xóa mạng xã hội"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* =========================================================================
          TAB 2: CỘT ĐIỀU HƯỚNG LIÊN KẾT
          ========================================================================= */}
      {activeTab === 'navigation' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Các cột liên kết điều hướng (Navigation Columns)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tùy chỉnh tiêu đề cột, thêm bớt liên kết trang và URL dẫn người dùng
              </p>
            </div>

            <Button
              label="Thêm cột mới"
              variant="secondary"
              onClick={handleAddColumn}
              className="px-4 h-10 shrink-0"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {config.navColumns.map((col, colIndex) => (
              <Card
                key={colIndex}
                className="rounded-2xl p-5 bg-white border border-slate-200/90 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex-1">
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">
                        Tiêu đề cột #{colIndex + 1}
                      </label>
                      <input
                        type="text"
                        value={col.title}
                        onChange={(e) =>
                          handleUpdateColumnTitle(colIndex, e.target.value)
                        }
                        placeholder="Tiêu đề cột..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-500"
                      />
                    </div>
                    {config.navColumns.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveColumn(colIndex)}
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg mt-4 transition"
                        title="Xóa cột này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Links in this column */}
                  <div className="space-y-2.5">
                    {col.links.map((link: FooterNavLink, linkIndex: number) => (
                      <div
                        key={linkIndex}
                        className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/60 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-semibold text-slate-400">
                            Liên kết #{linkIndex + 1}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={linkIndex === 0}
                              onClick={() =>
                                handleMoveLinkInColumn(colIndex, linkIndex, 'up')
                              }
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-200 transition"
                            >
                              <MoveUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={linkIndex === col.links.length - 1}
                              onClick={() =>
                                handleMoveLinkInColumn(
                                  colIndex,
                                  linkIndex,
                                  'down'
                                )
                              }
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-200 transition"
                            >
                              <MoveDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveLinkFromColumn(colIndex, linkIndex)
                              }
                              className="p-1 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) =>
                              handleUpdateLinkInColumn(
                                colIndex,
                                linkIndex,
                                'label',
                                e.target.value
                              )
                            }
                            placeholder="Nhãn liên kết (Label)"
                            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                          />
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) =>
                              handleUpdateLinkInColumn(
                                colIndex,
                                linkIndex,
                                'href',
                                e.target.value
                              )
                            }
                            placeholder="Đường dẫn (URL /slug)"
                            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleAddLinkToColumn(colIndex)}
                    className="w-full py-2 px-3 border border-dashed border-slate-300 hover:border-emerald-500 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50 transition flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm liên kết vào cột</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: BẢN TIN & CHỨNG NHẬN
          ========================================================================= */}
      {activeTab === 'newsletter' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Newsletter Form Settings */}
          <Card className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Khối Đăng ký nhận bản tin (Newsletter)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Cấu hình tiêu đề, văn bản gợi ý và cam kết bảo vệ dữ liệu người đăng ký
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tiêu đề khối (Title)
                </label>
                <input
                  type="text"
                  value={config.newsletter.title}
                  onChange={(e) =>
                    handleUpdateNewsletter('title', e.target.value)
                  }
                  placeholder="Newsletter"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Placeholder ô nhập email
                </label>
                <input
                  type="text"
                  value={config.newsletter.placeholder}
                  onChange={(e) =>
                    handleUpdateNewsletter('placeholder', e.target.value)
                  }
                  placeholder="name@youremail.com"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Lời dẫn bảo mật / Điều khoản (Disclaimer text)
                </label>
                <textarea
                  rows={3}
                  value={config.newsletter.disclaimerText}
                  onChange={(e) =>
                    handleUpdateNewsletter('disclaimerText', e.target.value)
                  }
                  placeholder="This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Link Chính sách bảo mật
                  </label>
                  <input
                    type="text"
                    value={config.newsletter.privacyPolicyHref}
                    onChange={(e) =>
                      handleUpdateNewsletter('privacyPolicyHref', e.target.value)
                    }
                    placeholder="https://policies.google.com/privacy?hl=en"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Link Điều khoản dịch vụ
                  </label>
                  <input
                    type="text"
                    value={config.newsletter.termsHref}
                    onChange={(e) =>
                      handleUpdateNewsletter('termsHref', e.target.value)
                    }
                    placeholder="https://policies.google.com/terms?hl=en"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Certification Badge Settings */}
          <Card className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Huy hiệu chứng nhận (Certification Badge)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Chứng chỉ bảo mật, tiêu chuẩn SOC compliance hiển thị ở đáy chân trang
                </p>
              </div>

              {config.certification.badgeImage ? (
                <Button
                  label="Xóa huy hiệu"
                  variant="destructive"
                  type="button"
                  onClick={handleClearCertification}
                  className="text-xs h-9 px-3 shrink-0"
                />
              ) : (
                <Button
                  label="Khôi phục mặc định"
                  variant="secondary"
                  type="button"
                  onClick={handleRestoreDefaultCertification}
                  className="text-xs h-9 px-3 shrink-0"
                />
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Đường dẫn ảnh Huy hiệu (URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={config.certification.badgeImage}
                    onChange={(e) =>
                      handleUpdateCertification('badgeImage', e.target.value)
                    }
                    placeholder="/assets/Badges_SOC.svg (để trống nếu muốn xóa bỏ)"
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                  <label className="shrink-0 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadBadgeFile(file);
                      }}
                    />
                    <span className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition">
                      {isUploadingBadge ? 'Đang tải...' : 'Tải ảnh lên'}
                    </span>
                  </label>
                  {config.certification.badgeImage && (
                    <Button
                      label="Xóa"
                      variant="secondary"
                      type="button"
                      onClick={handleClearCertification}
                      className="text-xs h-10 px-3 text-red-600 hover:bg-red-50 hover:border-red-200"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Văn bản thay thế (Alt text)
                </label>
                <input
                  type="text"
                  value={config.certification.badgeAlt}
                  onChange={(e) =>
                    handleUpdateCertification('badgeAlt', e.target.value)
                  }
                  placeholder="Badges SOC"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Đường dẫn liên kết khi bấm vào (tùy chọn)
                </label>
                <input
                  type="text"
                  value={config.certification.badgeHref || ''}
                  onChange={(e) =>
                    handleUpdateCertification('badgeHref', e.target.value)
                  }
                  placeholder="https://..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Badge Preview */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[140px]">
                <span className="text-xs font-semibold text-slate-400 mb-2">
                  Xem trước huy hiệu
                </span>
                {config.certification.badgeImage ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                      <img
                        src={config.certification.badgeImage}
                        alt={config.certification.badgeAlt || 'Huy hiệu'}
                        className="h-10 w-auto object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/Badges_SOC.svg';
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleClearCertification}
                      className="text-xs text-red-600 hover:text-red-700 font-medium transition cursor-pointer"
                    >
                      Xóa bỏ huy hiệu này
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-3 space-y-2">
                    <p className="text-xs text-slate-500">
                      Chưa có huy hiệu chứng nhận. Huy hiệu sẽ không hiển thị ở chân trang.
                    </p>
                    <Button
                      label="Nạp lại huy hiệu SOC mặc định"
                      variant="ghost"
                      type="button"
                      onClick={handleRestoreDefaultCertification}
                      className="text-xs text-slate-600 hover:text-slate-900"
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* =========================================================================
          TAB 4: MÚI GIỜ & BẢN QUYỀN
          ========================================================================= */}
      {activeTab === 'worldclocks' && (
        <div className="space-y-6">
          {/* World Clocks Card */}
          <Card className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Múi giờ thế giới (Live World Clocks)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Hiển thị đồng hồ thời gian thực tại các văn phòng và trung tâm vận hành toàn cầu của E-GEAD
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  label="Thêm múi giờ mới"
                  variant="secondary"
                  onClick={() => handleAddTimezone()}
                  className="px-4 h-10 shrink-0"
                />
              </div>
            </div>

            {/* Quick Add Presets */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
              <span className="text-xs font-bold text-slate-600 block">
                Mẫu múi giờ phổ biến (Bấm để thêm nhanh):
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_TIMEZONES.map((preset) => {
                  const alreadyAdded = config.timezones.some(
                    (tz) => tz.name === preset.name || tz.tz === preset.tz
                  );
                  return (
                    <button
                      key={preset.tz}
                      type="button"
                      disabled={alreadyAdded}
                      onClick={() => handleAddTimezone(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                        alreadyAdded
                          ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed'
                          : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      {preset.name} ({preset.tz.split('/')[1]?.replace('_', ' ')})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timezone list */}
            <div className="space-y-3">
              {config.timezones.map((loc, index) => {
                let liveTimeStr = '--:--';
                try {
                  liveTimeStr = new Intl.DateTimeFormat('en-US', {
                    timeZone: loc.tz,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  }).format(new Date());
                } catch {
                  liveTimeStr = 'Sai múi giờ';
                }

                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all"
                  >
                    {/* Live Clock Badge Preview */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-[#10E774] text-xs font-bold text-black bg-white tabular-nums shadow-2xs">
                        {liveTimeStr}
                      </span>
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">
                          Tên hiển thị
                        </label>
                        <input
                          type="text"
                          value={loc.name}
                          onChange={(e) =>
                            handleUpdateTimezone(index, 'name', e.target.value)
                          }
                          placeholder="Vietnam (HQ)"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">
                          Mã IANA Timezone
                        </label>
                        <input
                          type="text"
                          value={loc.tz}
                          onChange={(e) =>
                            handleUpdateTimezone(index, 'tz', e.target.value)
                          }
                          placeholder="Asia/Ho_Chi_Minh"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 justify-end">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMoveTimezone(index, 'up')}
                        className="p-2 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-lg hover:bg-slate-100 transition"
                        aria-label="Di chuyển lên"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={index === config.timezones.length - 1}
                        onClick={() => handleMoveTimezone(index, 'down')}
                        className="p-2 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-lg hover:bg-slate-100 transition"
                        aria-label="Di chuyển xuống"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveTimezone(index)}
                        className="p-2 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50 transition"
                        aria-label="Xóa múi giờ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Bottom Bar & Copyright Card */}
          <Card className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Thanh đáy & Bản quyền (Bottom Bar)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Quản lý dòng bản quyền thương hiệu, nút cuộn trang và chọn ngôn ngữ
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Dòng chữ Bản quyền (Copyright)
                </label>
                <input
                  type="text"
                  value={config.bottomBar.copyright}
                  onChange={(e) =>
                    handleUpdateBottomBar('copyright', e.target.value)
                  }
                  placeholder="© 2026 E-Gead Company. All rights reserved."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Bộ chọn ngôn ngữ
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Hiển thị dropdown chọn ngôn ngữ góc dưới bên trái
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.bottomBar.showLanguageSelector}
                    onChange={(e) =>
                      handleUpdateBottomBar(
                        'showLanguageSelector',
                        e.target.checked
                      )
                    }
                    className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Nút cuộn lên đầu trang (Back to top)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Hiển thị nút mũi tên cuộn lên đầu trang ở giữa thanh đáy
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.bottomBar.showBackToTop}
                    onChange={(e) =>
                      handleUpdateBottomBar('showBackToTop', e.target.checked)
                    }
                    className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* =========================================================================
          TAB 5: DỮ LIỆU JSON
          ========================================================================= */}
      {activeTab === 'json' && (
        <div className="space-y-6">
          <Card className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Cấu hình nhanh Footer bằng dữ liệu JSON
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Xem trực tiếp, chỉnh sửa nhanh hoặc sao chép/dán toàn bộ dữ liệu cấu hình chân trang.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={jsonFileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleJsonFileUpload}
                  className="hidden"
                />
                <Button
                  label="Nhập từ file .json"
                  variant="secondary"
                  type="button"
                  onClick={() => jsonFileInputRef.current?.click()}
                  className="text-xs font-medium"
                />
                <Button
                  label="Tải file .json"
                  variant="secondary"
                  type="button"
                  onClick={handleDownloadJson}
                  className="text-xs font-medium"
                />
                <Button
                  label="Nạp JSON mặc định"
                  variant="ghost"
                  type="button"
                  onClick={handleLoadDefaultJson}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900"
                />
              </div>
            </div>

            {jsonError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                <p className="font-semibold mb-1">Lỗi cấu trúc JSON:</p>
                <p className="font-mono">{jsonError}</p>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Nội dung JSON (Hỗ trợ chỉnh sửa trực tiếp)
                </label>
                <span className="text-[11px] text-slate-400">
                  Định dạng JSON hợp lệ
                </span>
              </div>
              <textarea
                value={jsonText}
                onChange={(e) => {
                  setJsonText(e.target.value);
                  setJsonError(null);
                }}
                rows={20}
                spellCheck={false}
                placeholder="Dán mã JSON cấu hình footer vào đây..."
                className="w-full font-mono text-xs bg-slate-950 text-emerald-400 p-4 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 leading-relaxed resize-y selection:bg-emerald-900 selection:text-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 bg-slate-50/50 p-4 rounded-xl">
              <div className="text-xs text-slate-600">
                Sau khi sửa hoặc dán JSON mới, bấm nút bên phải để nạp vào form cấu hình.
              </div>
              <Button
                label="Áp dụng JSON vào form"
                variant="primary"
                type="button"
                onClick={handleApplyJson}
                className="px-5 text-xs font-semibold"
              />
            </div>
          </Card>
        </div>
      )}

      {/* =========================================================================
          STICKY BOTTOM SAVE BAR
          ========================================================================= */}
      <div className="sticky bottom-6 z-20 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-800">
              Kích hoạt hiển thị Chân trang (Footer) trên toàn bộ website
            </span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <Button
            label={isSaving ? 'Đang lưu...' : 'Lưu cấu hình Footer'}
            variant="primary"
            type="submit"
            isDisabled={isSaving}
            className="px-6 h-11"
          />
        </div>
      </div>
    </form>
  );
}
