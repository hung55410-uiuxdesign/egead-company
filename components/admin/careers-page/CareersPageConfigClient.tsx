'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { Button, Card, Badge, useToast, TextInput, Selector, TextArea } from '@astryxdesign/core';
import {
  DEFAULT_CAREERS_PAGE_CONFIG,
  type CareersPageConfigData,
  type CareersOfficeItem,
} from '@/lib/services/careers-page-config.service';
import {
  useUploadMedia,
  useUpdateCareersPageConfigMutation,
} from '@/lib/hooks';
import { getYouTubeEmbedInfo } from '@/lib/utils/media';
import { RenderColumnIcon } from '@/components/pages/company/careers/components/CareerWhyChooseUsSection';

function DefaultBenefitsSvg() {
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M16 7a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2c0 2-1 4-1 8a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4c0-4-1-6-1-8Z" />
      <path d="M9 5h6" />
      <path d="M12 10v4" />
      <path d="M10.5 11.5h3" />
      <path d="M10.5 13h3" />
    </svg>
  );
}

function DefaultLearningSvg() {
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect width="18" height="12" x="3" y="3" rx="2" />
      <path d="m7 11 3-3 3 2 4-4" />
      <path d="M9 19l-2 3" />
      <path d="M15 19l2 3" />
      <path d="M12 15v4" />
    </svg>
  );
}

function DefaultEnvironmentSvg() {
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a14.5 14.5 0 0 1 4 9 14.5 14.5 0 0 1-4 9 14.5 14.5 0 0 1-4-9 14.5 14.5 0 0 1 4-9z" />
      <path d="M3 12h18" />
    </svg>
  );
}

const PRESET_ICONS = [
  { value: '', label: 'Mặc định (Default SVG)' },
  { value: 'Gift', label: 'Hộp quà (Gift)' },
  { value: 'Heart', label: 'Trái tim (Heart)' },
  { value: 'Award', label: 'Giải thưởng (Award)' },
  { value: 'Coffee', label: 'Cà phê & Đồ ăn (Coffee)' },
  { value: 'GraduationCap', label: 'Đào tạo & Học tập (GraduationCap)' },
  { value: 'Rocket', label: 'Đột phá & Khởi nghiệp (Rocket)' },
  { value: 'TrendingUp', label: 'Tăng trưởng & Thăng tiến (TrendingUp)' },
  { value: 'Lightbulb', label: 'Sáng tạo & Ý tưởng (Lightbulb)' },
  { value: 'Globe', label: 'Toàn cầu & Đa quốc gia (Globe)' },
  { value: 'Users', label: 'Đội ngũ & Con người (Users)' },
  { value: 'Laptop', label: 'Thiết bị & Công nghệ (Laptop)' },
  { value: 'ShieldCheck', label: 'Bảo hiểm & Đảm bảo (ShieldCheck)' },
  { value: 'Clock', label: 'Thời gian linh hoạt (Clock)' },
];

function ColumnIconPicker({
  title,
  icon,
  defaultSvg,
  colKey,
  isUploading,
  onIconChange,
  onFileChange,
}: {
  title: string;
  icon?: string;
  defaultSvg: React.ReactNode;
  colKey: 'benefits' | 'learning' | 'environment';
  isUploading: boolean;
  onIconChange: (value: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="p-3.5 bg-white/80 rounded-xl border border-slate-200/80 space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700">
          Biểu tượng cột ({title})
        </label>
        {icon && (
          <button
            type="button"
            onClick={() => onIconChange('')}
            className="text-[11px] text-slate-500 hover:text-red-600 underline"
          >
            Đặt lại mặc định
          </button>
        )}
      </div>

      <div className="flex items-start gap-3">
        {/* Live Preview Circle */}
        <div className="w-12 h-12 rounded-full bg-[#189B8C] text-white flex items-center justify-center shrink-0 shadow-xs overflow-hidden p-2.5">
          <RenderColumnIcon icon={icon} defaultIcon={defaultSvg} />
        </div>

        {/* Picker and Uploader */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Preset Select */}
          <Selector
            label="Chọn biểu tượng"
            isLabelHidden
            value={
              PRESET_ICONS.some((p) => p.value === (icon || ''))
                ? icon || ''
                : 'custom'
            }
            onChange={(val) => {
              if (val !== 'custom') {
                onIconChange(val);
              }
            }}
            options={[
              ...PRESET_ICONS,
              ...(!PRESET_ICONS.some((p) => p.value === (icon || '')) && icon
                ? [{ value: 'custom', label: 'Icon tùy chỉnh (URL / Upload)' }]
                : []),
            ]}
            width="100%"
            className="h-10 border"
          />

          {/* URL Input + Upload button */}
          <div className="flex gap-1.5 items-center">
            <TextInput
              label="URL icon"
              isLabelHidden
              value={icon || ''}
              onChange={onIconChange}
              placeholder="URL icon hoặc tên Lucide..."
              width="100%"
              className='h-10 border'
            />
            <label className="cursor-pointer shrink-0">
              <input
                type="file"
                accept="image/*,.svg"
                onChange={onFileChange}
                className="hidden"
              />
              <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-medium transition">
                {isUploading ? 'Đang tải...' : 'Tải SVG/Ảnh'}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CareersPageConfigClientProps {
  initialConfig: CareersPageConfigData;
}

type TabType = 'hero' | 'about' | 'video' | 'whyChooseUs' | 'offices' | 'json';

export default function CareersPageConfigClient({
  initialConfig,
}: CareersPageConfigClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [config, setConfig] = useState<CareersPageConfigData>(initialConfig);
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(initialConfig, null, 2)
  );
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const toast = useToast();

  const updateMutation = useUpdateCareersPageConfigMutation();

  const { upload: uploadHeroImage, isUploading: isUploadingHero } =
    useUploadMedia({
      defaultFolder: 'careers',
      showToast: true,
      onSuccess: (res) => {
        if (res?.url) {
          setConfig((prev) => ({
            ...prev,
            hero: { ...prev.hero, image: res.url },
          }));
        }
      },
    });

  const { upload: uploadAboutImage, isUploading: isUploadingAbout } =
    useUploadMedia({
      defaultFolder: 'careers',
      showToast: true,
      onSuccess: (res) => {
        if (res?.url) {
          setConfig((prev) => ({
            ...prev,
            about: { ...prev.about, image: res.url },
          }));
        }
      },
    });

  // Switch tabs
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'json') {
      setJsonInput(JSON.stringify(config, null, 2));
      setJsonError(null);
    }
  };

  // Image Upload Handlers
  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadHeroImage({ file, folder: 'careers' });
    }
  };

  const handleAboutImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAboutImage({ file, folder: 'careers' });
    }
  };

  // Video Upload Hook and Handler
  const { uploadFile: uploadVideoFile, isUploading: isUploadingVideo } =
    useUploadMedia({
      defaultFolder: 'careers/videos',
      showToast: true,
      successMessage: 'Tải video thành công!',
      onSuccess: (res) => {
        if (res?.url) {
          setConfig((prev) => ({
            ...prev,
            video: {
              ...(prev.video || {}),
              videoUrl: res.url,
            },
          }));
        }
      },
    });

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadVideoFile(file);
    }
  };

  // Column Icon Upload Handler
  const [uploadingCol, setUploadingCol] = useState<'benefits' | 'learning' | 'environment' | null>(null);

  const { upload: uploadColumnIcon, isUploading: isUploadingColIcon } =
    useUploadMedia({
      defaultFolder: 'careers/icons',
      showToast: true,
      onSuccess: (res) => {
        if (res?.url && uploadingCol) {
          setConfig((prev) => ({
            ...prev,
            whyChooseUs: {
              ...prev.whyChooseUs,
              [uploadingCol]: {
                ...prev.whyChooseUs[uploadingCol],
                icon: res.url,
              },
            },
          }));
          setUploadingCol(null);
        }
      },
      onError: () => {
        setUploadingCol(null);
      },
    });

  const handleColumnIconFileChange = (
    colKey: 'benefits' | 'learning' | 'environment',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingCol(colKey);
      uploadColumnIcon({ file, folder: 'careers/icons' });
    }
  };

  // Save handler
  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({ data: config });
    } catch {
      // Toast handled by mutation hook
    }
  };

  // Apply JSON changes
  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setConfig(parsed);
      setJsonError(null);
      toast({
        body: 'Đã cập nhật dữ liệu cấu hình từ JSON. Nhấn "Lưu thay đổi" để hoàn tất.',
        type: 'info',
        isAutoHide: true,
      });
    } catch (err: any) {
      setJsonError(`Lỗi cú pháp JSON: ${err.message}`);
    }
  };

  // Copy JSON
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (confirm('Bạn có chắc muốn khôi phục về nội dung mẫu mặc định không?')) {
      setConfig(DEFAULT_CAREERS_PAGE_CONFIG);
      setJsonInput(JSON.stringify(DEFAULT_CAREERS_PAGE_CONFIG, null, 2));
      toast({
        body: 'Đã nạp lại nội dung mặc định. Nhấn "Lưu thay đổi" để áp dụng.',
        type: 'info',
        isAutoHide: true,
      });
    }
  };

  // Office handlers
  const handleAddOffice = () => {
    const newOffice: CareersOfficeItem = {
      id: `office-${Date.now()}`,
      country: 'vietnam',
      city: 'Văn phòng mới',
      addressLines: ['Địa chỉ dòng 1', 'Địa chỉ dòng 2'],
    };
    setConfig((prev) => ({
      ...prev,
      offices: [...prev.offices, newOffice],
    }));
  };

  const handleRemoveOffice = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      offices: prev.offices.filter((o) => o.id !== id),
    }));
  };

  const handleOfficeChange = (
    id: string,
    field: keyof CareersOfficeItem,
    value: any
  ) => {
    setConfig((prev) => ({
      ...prev,
      offices: prev.offices.map((o) =>
        o.id === id ? { ...o, [field]: value } : o
      ),
    }));
  };

  const handleOfficeAddressLineChange = (
    officeId: string,
    lineIndex: number,
    value: string
  ) => {
    setConfig((prev) => ({
      ...prev,
      offices: prev.offices.map((o) => {
        if (o.id !== officeId) return o;
        const nextLines = [...o.addressLines];
        nextLines[lineIndex] = value;
        return { ...o, addressLines: nextLines };
      }),
    }));
  };

  const handleAddOfficeAddressLine = (officeId: string) => {
    setConfig((prev) => ({
      ...prev,
      offices: prev.offices.map((o) => {
        if (o.id !== officeId) return o;
        return { ...o, addressLines: [...o.addressLines, ''] };
      }),
    }));
  };

  const handleRemoveOfficeAddressLine = (
    officeId: string,
    lineIndex: number
  ) => {
    setConfig((prev) => ({
      ...prev,
      offices: prev.offices.map((o) => {
        if (o.id !== officeId) return o;
        return {
          ...o,
          addressLines: o.addressLines.filter((_, idx) => idx !== lineIndex),
        };
      }),
    }));
  };

  // Benefit card items handlers
  const handleBenefitItemChange = (
    cardKey: 'benefits' | 'learning' | 'environment',
    itemIndex: number,
    value: string
  ) => {
    setConfig((prev) => {
      const nextItems = [...prev.whyChooseUs[cardKey].items];
      nextItems[itemIndex] = value;
      return {
        ...prev,
        whyChooseUs: {
          ...prev.whyChooseUs,
          [cardKey]: {
            ...prev.whyChooseUs[cardKey],
            items: nextItems,
          },
        },
      };
    });
  };

  const handleAddBenefitItem = (
    cardKey: 'benefits' | 'learning' | 'environment'
  ) => {
    setConfig((prev) => ({
      ...prev,
      whyChooseUs: {
        ...prev.whyChooseUs,
        [cardKey]: {
          ...prev.whyChooseUs[cardKey],
          items: [...prev.whyChooseUs[cardKey].items, 'Quyền lợi mới'],
        },
      },
    }));
  };

  const handleRemoveBenefitItem = (
    cardKey: 'benefits' | 'learning' | 'environment',
    itemIndex: number
  ) => {
    setConfig((prev) => ({
      ...prev,
      whyChooseUs: {
        ...prev.whyChooseUs,
        [cardKey]: {
          ...prev.whyChooseUs[cardKey],
          items: prev.whyChooseUs[cardKey].items.filter(
            (_, idx) => idx !== itemIndex
          ),
        },
      },
    }));
  };

  return (
    <div className="space-y-6 w-full pb-16">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900">
              Quản lý Trang Tuyển dụng (Careers)
            </h1>
            <Badge
              label="Đang hoạt động"
              variant="success"
              className="h-8 px-4"
            />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Quản lý toàn bộ nội dung Hero Banner, Giới thiệu văn hóa, Lợi ích và Văn phòng toàn cầu trên trang /careers
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            label="Xem trang Careers Live"
            variant="secondary"
            href="/careers"
            target="_blank"
            className="px-4 h-10"
          />

          <Button
            label={updateMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
            variant="primary"
            onClick={handleSave}
            isDisabled={updateMutation.isPending}
            className="px-6 h-10"
          />
        </div>
      </div>

      {/* =========================================================================
          TABS NAVIGATION
          ========================================================================= */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
        <button
          type="button"
          onClick={() => handleTabChange('hero')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'hero'
              ? 'border-slate-900 text-slate-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          Hero Banner
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('about')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'about'
              ? 'border-slate-900 text-slate-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          Giới thiệu văn hóa (About)
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('video')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'video'
              ? 'border-slate-900 text-slate-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          Video giới thiệu (Ở giữa)
          {config.video?.videoUrl ? (
            <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-emerald-500" />
          ) : null}
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('whyChooseUs')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'whyChooseUs'
              ? 'border-slate-900 text-slate-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          Lợi ích (Why Choose Us)
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('offices')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'offices'
              ? 'border-slate-900 text-slate-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          Văn phòng toàn cầu ({config.offices.length})
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('json')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'json'
              ? 'border-slate-900 text-slate-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          Dữ liệu JSON
        </button>
      </div>

      {/* =========================================================================
          TAB 1: HERO BANNER
          ========================================================================= */}
      {activeTab === 'hero' && (
        <Card className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900">
              Hero Banner Đầu Trang
            </h2>
            <p className="text-xs text-slate-500">
              Cấu hình hình ảnh tập thể đội ngũ và tiêu đề chào mừng
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <TextArea
                label="Tiêu đề chính (Hero Title)"
                description="Có thể nhấn Enter để chia dòng tiêu đề theo ý muốn"
                rows={3}
                value={config.hero.title}
                onChange={(val) =>
                  setConfig((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, title: val },
                  }))
                }
                width="100%"
                className="border"
                placeholder="Join The Human Inc to..."
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Đường dẫn ảnh tập thể (Hero Image URL)
              </label>
              <div className="flex gap-2">
                <TextInput
                  label="Đường dẫn ảnh tập thể"
                  isLabelHidden
                  value={config.hero.image}
                  onChange={(val) =>
                    setConfig((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, image: val },
                    }))
                  }
                  placeholder="/assets/careers/team-group.png"
                  width="100%"
                  className='h-10 border'
                />
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHeroImageChange}
                    className="hidden"
                  />
                  <span className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition">
                    {isUploadingHero ? 'Đang tải...' : 'Tải ảnh lên'}
                  </span>
                </label>
              </div>

              {config.hero.image && (
                <div className="pt-2">
                  <span className="text-xs font-medium text-slate-500 block mb-1.5">
                    Xem trước ảnh:
                  </span>
                  <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img
                      src={config.hero.image}
                      alt="Hero Preview"
                      className="w-full h-auto object-cover max-h-72"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* =========================================================================
          TAB 2: GIỚI THIỆU VĂN HÓA (ABOUT)
          ========================================================================= */}
      {activeTab === 'about' && (
        <Card className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900">
              Khối Giới Thiệu Văn Hóa (About The Human Inc)
            </h2>
            <p className="text-xs text-slate-500">
              Cấu hình tiêu đề, các đoạn giới thiệu và hình ảnh văn hóa làm việc
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left form inputs */}
            <div className="space-y-4">
              <div>
                <TextInput
                  label="Nhãn chuyên mục (Subtitle)"
                  value={config.about.subtitle}
                  onChange={(val) =>
                    setConfig((prev) => ({
                      ...prev,
                      about: { ...prev.about, subtitle: val },
                    }))
                  }
                  placeholder="About The Human Inc"
                  width="100%"
                  className='h-10 border'
                />
              </div>

              <div>
                <TextArea
                  label="Tiêu đề chính (Title)"
                  rows={2}
                  value={config.about.title}
                  onChange={(val) =>
                    setConfig((prev) => ({
                      ...prev,
                      about: { ...prev.about, title: val },
                    }))
                  }
                  width="100%"
                  className="border"
                  placeholder="Find your passion at The Human Inc"
                />
              </div>

              <div>
                <TextArea
                  label="Đoạn mô tả 1"
                  rows={3}
                  value={config.about.paragraphs[0] || ''}
                  onChange={(val) => {
                    const nextParas = [...config.about.paragraphs];
                    nextParas[0] = val;
                    setConfig((prev) => ({
                      ...prev,
                      about: { ...prev.about, paragraphs: nextParas },
                    }));
                  }}
                  width="100%"
                  className="border"
                  placeholder="At The Human Inc, we aim to create..."
                />
              </div>

              <div>
                <TextArea
                  label="Đoạn mô tả 2"
                  rows={3}
                  value={config.about.paragraphs[1] || ''}
                  onChange={(val) => {
                    const nextParas = [...config.about.paragraphs];
                    nextParas[1] = val;
                    setConfig((prev) => ({
                      ...prev,
                      about: { ...prev.about, paragraphs: nextParas },
                    }));
                  }}
                  width="100%"
                  className="border"
                  placeholder="Join us and you will become part of..."
                />
              </div>
            </div>

            {/* Right image upload */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Ảnh văn hóa / sinh hoạt (Culture Spotlight Image)
                </label>
                <div className="flex gap-2">
                  <TextInput
                    label="Ảnh văn hóa / sinh hoạt"
                    isLabelHidden
                    value={config.about.image}
                    onChange={(val) =>
                      setConfig((prev) => ({
                        ...prev,
                        about: { ...prev.about, image: val },
                      }))
                    }
                    placeholder="/assets/careers/culture-spotlight.png"
                    width="100%"
                    className='h-10 border'
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAboutImageChange}
                      className="hidden"
                    />
                    <span className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition">
                      {isUploadingAbout ? 'Đang tải...' : 'Tải ảnh lên'}
                    </span>
                  </label>
                </div>
              </div>

              {config.about.image && (
                <div className="pt-2">
                  <span className="text-xs font-medium text-slate-500 block mb-1.5">
                    Xem trước ảnh:
                  </span>
                  <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 max-h-80">
                    <img
                      src={config.about.image}
                      alt="About Preview"
                      className="w-full h-auto object-cover max-h-80"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* =========================================================================
          TAB VIDEO: VIDEO GIỚI THIỆU (Ở GIỮA)
          ========================================================================= */}
      {activeTab === 'video' && (
        <Card className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900">
              Video giới thiệu / văn hóa (Nằm ở giữa trang)
            </h2>
            <p className="text-xs text-slate-500">
              Video này sẽ xuất hiện ở giữa danh sách việc làm và khối Why choose us. Nếu không gắn video (để trống hoặc bấm Xóa), client sẽ tự động ẩn đi hoàn toàn.
            </p>
          </div>

          <div className="space-y-5">
            {/* Input Video URL + Upload Video File */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Đường dẫn Video (Link YouTube hoặc video tải lên)
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="flex-1">
                  <TextInput
                    label="Đường dẫn Video"
                    isLabelHidden
                    value={config.video?.videoUrl || ''}
                    onChange={(val) =>
                      setConfig((prev) => ({
                        ...prev,
                        video: {
                          ...(prev.video || {}),
                          videoUrl: val,
                        },
                      }))
                    }
                    placeholder="Dán link YouTube (vd: https://www.youtube.com/watch?v=... hoặc https://youtu.be/...) hoặc link video MP4/WebM"
                    width="100%"
                    className="h-10 border"
                  />
                </div>
                <label className="cursor-pointer shrink-0">
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={handleVideoFileChange}
                    disabled={isUploadingVideo}
                    className="hidden"
                  />
                  <span className="inline-flex items-center justify-center px-4 h-10 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-medium hover:bg-slate-800 transition">
                    {isUploadingVideo ? 'Đang tải video...' : 'Tải video từ máy tính'}
                  </span>
                </label>
              </div>
              <p className="text-[11px] text-slate-400">
                Hỗ trợ dán link video YouTube thông thường, Shorts, hoặc tải trực tiếp tệp video MP4/WebM lên hệ thống Cloudinary.
              </p>
            </div>

            {/* Optional Title & Subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <TextInput
                  label="Tiêu đề video (Tùy chọn)"
                  value={config.video?.title || ''}
                  onChange={(val) =>
                    setConfig((prev) => ({
                      ...prev,
                      video: {
                        ...(prev.video || {}),
                        title: val,
                      },
                    }))
                  }
                  placeholder="Ví dụ: Một ngày làm việc tại E-GEAD"
                  width="100%"
                  className="h-10 border"
                />
              </div>

              <div>
                <TextInput
                  label="Phụ đề / Tag nhỏ (Tùy chọn)"
                  value={config.video?.subtitle || ''}
                  onChange={(val) =>
                    setConfig((prev) => ({
                      ...prev,
                      video: {
                        ...(prev.video || {}),
                        subtitle: val,
                      },
                    }))
                  }
                  placeholder="Ví dụ: Văn hóa doanh nghiệp"
                  width="100%"
                  className="h-10 border"
                />
              </div>
            </div>

            {/* Preview Box */}
            <div className="pt-2">
              {config.video?.videoUrl ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      Xem trước video:
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          video: {
                            ...(prev.video || {}),
                            videoUrl: '',
                          },
                        }))
                      }
                      className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline"
                    >
                      Xóa video
                    </button>
                  </div>

                  <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-slate-950 aspect-video border border-slate-200">
                    {getYouTubeEmbedInfo(config.video.videoUrl) ? (
                      <iframe
                        src={getYouTubeEmbedInfo(config.video.videoUrl)?.previewUrl}
                        title="Xem trước video YouTube"
                        className="w-full h-full border-0 absolute inset-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={config.video.videoUrl}
                        controls
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 text-center space-y-1">
                  <p className="text-sm font-medium text-slate-600">
                    Chưa gắn video nào
                  </p>
                  <p className="text-xs text-slate-400">
                    Section video ở giữa trang tuyển dụng hiện đang được ẩn ở ngoài Client. Gắn link YouTube hoặc tải file video lên để kích hoạt hiển thị.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* =========================================================================
          TAB 3: LỢI ÍCH (WHY CHOOSE US)
          ========================================================================= */}
      {activeTab === 'whyChooseUs' && (
        <div className="space-y-6">
          <Card className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Tiêu Đề Khối Lợi Ích
            </h2>
            <div className="max-w-lg">
              <TextInput
                label="Tiêu đề khối"
                value={config.whyChooseUs.title}
                onChange={(val) =>
                  setConfig((prev) => ({
                    ...prev,
                    whyChooseUs: {
                      ...prev.whyChooseUs,
                      title: val,
                    },
                  }))
                }
                placeholder="Why choose us?"
                width="100%"
                className='h-10 border'
              />
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Great Benefits */}
            <Card className="p-6 bg-[#FAF6EE] rounded-2xl border border-[#F2ECE0] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Cột 1: Phúc lợi
                </span>
                <button
                  type="button"
                  onClick={() => handleAddBenefitItem('benefits')}
                  className="text-xs font-medium text-slate-800 hover:text-slate-900 underline"
                >
                  Thêm dòng
                </button>
              </div>

              {/* Icon selector & uploader */}
              <ColumnIconPicker
                title="Phúc lợi"
                icon={config.whyChooseUs.benefits.icon}
                defaultSvg={<DefaultBenefitsSvg />}
                colKey="benefits"
                isUploading={uploadingCol === 'benefits' && isUploadingColIcon}
                onIconChange={(val) =>
                  setConfig((prev) => ({
                    ...prev,
                    whyChooseUs: {
                      ...prev.whyChooseUs,
                      benefits: {
                        ...prev.whyChooseUs.benefits,
                        icon: val,
                      },
                    },
                  }))
                }
                onFileChange={(e) => handleColumnIconFileChange('benefits', e)}
              />

              <div>
                <TextInput
                  label="Tiêu đề cột"
                  value={config.whyChooseUs.benefits.title}
                  onChange={(val) =>
                    setConfig((prev) => ({
                      ...prev,
                      whyChooseUs: {
                        ...prev.whyChooseUs,
                        benefits: {
                          ...prev.whyChooseUs.benefits,
                          title: val,
                        },
                      },
                    }))
                  }
                  width="100%"
                  className='h-10 border'
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Danh sách quyền lợi ({config.whyChooseUs.benefits.items.length})
                </label>
                {config.whyChooseUs.benefits.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <TextInput
                      label={`Quyền lợi ${idx + 1}`}
                      isLabelHidden
                      value={item}
                      onChange={(val) =>
                        handleBenefitItemChange('benefits', idx, val)
                      }
                      width="100%"
                      className='h-10 border'
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefitItem('benefits', idx)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Column 2: Learning and self-improvement */}
            <Card className="p-6 bg-[#FAF6EE] rounded-2xl border border-[#F2ECE0] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Cột 2: Đào tạo & Phát triển
                </span>
                <button
                  type="button"
                  onClick={() => handleAddBenefitItem('learning')}
                  className="text-xs font-medium text-slate-800 hover:text-slate-900 underline"
                >
                  Thêm dòng
                </button>
              </div>

              {/* Icon selector & uploader */}
              <ColumnIconPicker
                title="Đào tạo & Phát triển"
                icon={config.whyChooseUs.learning.icon}
                defaultSvg={<DefaultLearningSvg />}
                colKey="learning"
                isUploading={uploadingCol === 'learning' && isUploadingColIcon}
                onIconChange={(val) =>
                  setConfig((prev) => ({
                    ...prev,
                    whyChooseUs: {
                      ...prev.whyChooseUs,
                      learning: {
                        ...prev.whyChooseUs.learning,
                        icon: val,
                      },
                    },
                  }))
                }
                onFileChange={(e) => handleColumnIconFileChange('learning', e)}
              />

              <div>
                <TextInput
                  label="Tiêu đề cột"
                  value={config.whyChooseUs.learning.title}
                  onChange={(val) =>
                    setConfig((prev) => ({
                      ...prev,
                      whyChooseUs: {
                        ...prev.whyChooseUs,
                        learning: {
                          ...prev.whyChooseUs.learning,
                          title: val,
                        },
                      },
                    }))
                  }
                  width="100%"
                  className='h-10 border'
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Danh sách quyền lợi ({config.whyChooseUs.learning.items.length})
                </label>
                {config.whyChooseUs.learning.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <TextInput
                      label={`Quyền lợi ${idx + 1}`}
                      isLabelHidden
                      value={item}
                      onChange={(val) =>
                        handleBenefitItemChange('learning', idx, val)
                      }
                      width="100%"
                      className='h-10 border'
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefitItem('learning', idx)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Column 3: Open working environment */}
            <Card className="p-6 bg-[#FAF6EE] rounded-2xl border border-[#F2ECE0] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Cột 3: Môi trường làm việc
                </span>
                <button
                  type="button"
                  onClick={() => handleAddBenefitItem('environment')}
                  className="text-xs font-medium text-slate-800 hover:text-slate-900 underline"
                >
                  Thêm dòng
                </button>
              </div>

              {/* Icon selector & uploader */}
              <ColumnIconPicker
                title="Môi trường làm việc"
                icon={config.whyChooseUs.environment.icon}
                defaultSvg={<DefaultEnvironmentSvg />}
                colKey="environment"
                isUploading={uploadingCol === 'environment' && isUploadingColIcon}
                onIconChange={(val) =>
                  setConfig((prev) => ({
                    ...prev,
                    whyChooseUs: {
                      ...prev.whyChooseUs,
                      environment: {
                        ...prev.whyChooseUs.environment,
                        icon: val,
                      },
                    },
                  }))
                }
                onFileChange={(e) => handleColumnIconFileChange('environment', e)}
              />

              <div>
                <TextInput
                  label="Tiêu đề cột"
                  value={config.whyChooseUs.environment.title}
                  onChange={(val) =>
                    setConfig((prev) => ({
                      ...prev,
                      whyChooseUs: {
                        ...prev.whyChooseUs,
                        environment: {
                          ...prev.whyChooseUs.environment,
                          title: val,
                        },
                      },
                    }))
                  }
                  width="100%"
                  className='h-10 border'
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Danh sách quyền lợi ({config.whyChooseUs.environment.items.length})
                </label>
                {config.whyChooseUs.environment.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <TextInput
                      label={`Quyền lợi ${idx + 1}`}
                      isLabelHidden
                      value={item}
                      onChange={(val) =>
                        handleBenefitItemChange('environment', idx, val)
                      }
                      width="100%"
                      className='h-10 border'
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefitItem('environment', idx)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: VĂN PHÒNG TOÀN CẦU (OFFICES)
          ========================================================================= */}
      {activeTab === 'offices' && (
        <Card className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Danh Sách Văn Phòng Toàn Cầu
              </h2>
              <p className="text-xs text-slate-500">
                Quản lý các địa điểm văn phòng hiển thị ở phần chân trang tuyển dụng
              </p>
            </div>

            <Button
              label="Thêm văn phòng"
              variant="secondary"
              onClick={handleAddOffice}
              className="px-4 h-9"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.offices.map((office, oIdx) => (
              <div
                key={office.id || oIdx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4 relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      label={`Văn phòng ${oIdx + 1}`}
                      variant="neutral"
                      className="text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOffice(office.id)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <Selector
                      label="Quốc gia / Biểu tượng cờ"
                      value={office.country}
                      onChange={(val) =>
                        handleOfficeChange(office.id, 'country', val)
                      }
                      options={[
                        { value: 'singapore', label: 'Singapore' },
                        { value: 'hongkong', label: 'HongKong' },
                        { value: 'vietnam', label: 'Việt Nam' },
                      ]}
                      width="100%"
                      className="h-10 border"
                    />
                  </div>

                  <div>
                    <TextInput
                      label="Tên văn phòng / Thành phố"
                      value={office.city}
                      onChange={(val) =>
                        handleOfficeChange(office.id, 'city', val)
                      }
                      placeholder="Singapore"
                      width="100%"
                      className='h-10 border'
                    />
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700">
                        Địa chỉ từng dòng ({office.addressLines.length})
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddOfficeAddressLine(office.id)}
                        className="text-xs text-slate-600 hover:text-slate-900 underline"
                      >
                        Thêm dòng
                      </button>
                    </div>

                    {office.addressLines.map((line, lIdx) => (
                      <div key={lIdx} className="flex items-center gap-1.5">
                        <TextInput
                          label={`Dòng địa chỉ ${lIdx + 1}`}
                          isLabelHidden
                          value={line}
                          onChange={(val) =>
                            handleOfficeAddressLineChange(
                              office.id,
                              lIdx,
                              val
                            )
                          }
                          placeholder={`Dòng địa chỉ ${lIdx + 1}`}
                          width="100%"
                          className='h-10 border'
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveOfficeAddressLine(office.id, lIdx)
                          }
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* =========================================================================
          TAB 5: DỮ LIỆU JSON
          ========================================================================= */}
      {activeTab === 'json' && (
        <Card className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Cấu Hình Dạng JSON
              </h2>
              <p className="text-xs text-slate-500">
                Cho phép xem, sao chép hoặc dán nhanh toàn bộ nội dung cấu hình trang tuyển dụng
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                label={copied ? 'Đã sao chép' : 'Sao chép JSON'}
                variant="secondary"
                onClick={handleCopyJson}
                className="px-4 h-9"
              />
              <Button
                label="Khôi phục mặc định"
                variant="secondary"
                onClick={handleResetToDefault}
                className="px-4 h-9"
              />
            </div>
          </div>

          {jsonError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs">
              {jsonError}
            </div>
          )}

          <textarea
            rows={18}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full p-4 rounded-xl border border-slate-300 text-xs font-mono bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 leading-relaxed"
          />

          <div className="flex justify-end">
            <Button
              label="Áp dụng JSON"
              variant="primary"
              onClick={handleApplyJson}
              className="px-5 h-9"
            />
          </div>
        </Card>
      )}
    </div>
  );
}
