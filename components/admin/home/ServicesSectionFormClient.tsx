'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { X, Trash2, Plus, Upload, MoveUp, MoveDown } from 'lucide-react';
import { Button, Card, Badge } from '@astryxdesign/core';
import type {
  HomeSectionModel,
  CapabilityItem,
  CapabilitiesSectionData,
} from '@/lib/services/home-section.service';
import { useUploadMedia, useUpdateHomeSectionMutation } from '@/lib/hooks';

interface ServicesSectionFormClientProps {
  section: HomeSectionModel;
}

export default function ServicesSectionFormClient({
  section,
}: ServicesSectionFormClientProps) {
  const router = useRouter();

  // Section Header Data
  const [title, setTitle] = useState(
    section.title || 'End-to-End E-Commerce Growth Ecosystem.'
  );
  const [subtitle, setSubtitle] = useState(
    section.subtitle || 'Our Capabilities'
  );
  const [isActive, setIsActive] = useState<boolean>(section.isActive ?? true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Custom Data Fields
  const initialData: CapabilitiesSectionData = section.data || {
    buttonText: 'Explore All Capabilities',
    buttonHref: '/services/all-services',
    backgroundImage: '/assets/bg_services.jpg',
    items: [],
  };

  const [buttonText, setButtonText] = useState(
    initialData.buttonText || 'Explore All Capabilities'
  );
  const [buttonHref, setButtonHref] = useState(
    initialData.buttonHref || '/services/all-services'
  );
  const [backgroundImage, setBackgroundImage] = useState(
    initialData.backgroundImage || '/assets/bg_services.jpg'
  );

  const [items, setItems] = useState<CapabilityItem[]>(
    initialData.items && initialData.items.length > 0
      ? initialData.items
      : [
          {
            num: '01',
            title: 'US Fulfillment & Logistics',
            desc: 'Fast production turnaround, reliable order processing, and full TikTok Shop US compliance for seamless cross-border delivery.',
            icon: '/assets/home-icon__1_.svg',
            href: '/speedx',
          },
          {
            num: '02',
            title: 'Multi-Channel Commerce',
            desc: 'End-to-end store operations and product listings across leading global platforms: TikTok Shop, Etsy, eBay, and Amazon.',
            icon: '/assets/home-icon__2_.svg',
            href: '/smartcommerce',
          },
          {
            num: '03',
            title: 'Digital Growth Marketing',
            desc: 'High-converting performance marketing powered by TikTok Ads, organic TikTok channels, and Google Ads to scale international sales.',
            icon: '/assets/home-icon__3_.svg',
            href: '/services/all-services',
          },
          {
            num: '04',
            title: 'Shopify Stores & Smart Tools',
            desc: 'Optimized D2C Shopify storefronts integrated with dedicated internal tools for automated order tracking, listing, and daily operations.',
            icon: '/assets/home-icon__4_.svg',
            href: '/services/all-services',
          },
        ]
  );

  // TanStack Query Mutation
  const updateMutation = useUpdateHomeSectionMutation();
  const isSaving = updateMutation.isPending;

  // Cloudinary media uploader for background
  const { uploadFile: uploadBgFile, isUploading: isUploadingBg } =
    useUploadMedia({
      defaultFolder: 'egead_cms/home',
      successMessage: 'Tải ảnh nền khối dịch vụ thành công!',
      onSuccess: (data) => {
        setBackgroundImage(data.url);
      },
    });

  // Track uploading index for item icons
  const [uploadingItemIndex, setUploadingItemIndex] = useState<number | null>(
    null
  );

  // Cloudinary media uploader for card icons
  const { uploadFile: uploadIconFile, isUploading: isUploadingIcon } =
    useUploadMedia({
      defaultFolder: 'egead_cms/home/icons',
      successMessage: 'Tải icon dịch vụ thành công!',
      onSuccess: (data) => {
        if (uploadingItemIndex !== null) {
          setItems((prev) =>
            prev.map((item, i) =>
              i === uploadingItemIndex ? { ...item, icon: data.url } : item
            )
          );
          setUploadingItemIndex(null);
        }
      },
    });

  const handleUpdateItem = (
    index: number,
    field: keyof CapabilityItem,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAddItem = () => {
    const nextNum = (items.length + 1).toString().padStart(2, '0');
    setItems((prev) => [
      ...prev,
      {
        num: nextNum,
        title: 'Dịch vụ mới',
        desc: 'Mô tả chi tiết nội dung dịch vụ...',
        icon: '/assets/home-icon__1_.svg',
        href: '/services/all-services',
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) {
      alert('Section cần có ít nhất 1 thẻ dịch vụ.');
      return;
    }
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    setItems((prev) => {
      const cloned = [...prev];
      const temp = cloned[index];
      cloned[index] = cloned[targetIndex];
      cloned[targetIndex] = temp;
      return cloned;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tiêu đề chính của section');
      return;
    }

    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: section.description || '',
      isActive,
      data: {
        buttonText: buttonText.trim(),
        buttonHref: buttonHref.trim(),
        backgroundImage: backgroundImage.trim(),
        items,
      },
    };

    try {
      await updateMutation.mutateAsync({
        key: section.key,
        data: payload,
      });
      alert('Đã lưu thành công nội dung Khối Dịch vụ & Năng lực lõi!');
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Có lỗi xảy ra khi lưu nội dung.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full pb-16">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
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
              href="/#block__items__with__button"
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
            Cập nhật tiêu đề, phụ đề, nút xem thêm và 4 thẻ dịch vụ năng lực lõi hiển thị trên trang chủ
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
            isDisabled={isSaving || isUploadingBg || isUploadingIcon}
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
          CARD 1: THÔNG TIN HEADER VÀ NÚT BẤM CỦA KHỐI
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              1. Tiêu đề và Cấu hình chung của Khối
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cấu hình phụ đề, tiêu đề chính, nút bấm xem thêm và ảnh nền của khối dịch vụ
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Phụ đề nhỏ (Subtitle)
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Our Capabilities"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Tiêu đề lớn (Heading) *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="End-to-End E-Commerce Growth Ecosystem."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Nút hành động: Nhãn nút (Button Text)
            </label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="Explore All Capabilities"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Nút hành động: Đường dẫn liên kết (Button Link)
            </label>
            <input
              type="text"
              value={buttonHref}
              onChange={(e) => setButtonHref(e.target.value)}
              placeholder="/services/all-services"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Đường dẫn ảnh nền khối (Background Image)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={backgroundImage}
              onChange={(e) => setBackgroundImage(e.target.value)}
              placeholder="/assets/bg_services.jpg"
              className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <label className="cursor-pointer shrink-0">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isUploadingBg}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    await uploadBgFile(file);
                    e.target.value = '';
                  }
                }}
              />
              <span className="inline-flex items-center justify-center px-4 h-10 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold cursor-pointer transition">
                {isUploadingBg ? 'Đang tải...' : 'Tải ảnh lên'}
              </span>
            </label>
          </div>
        </div>
      </Card>

      {/* =========================================================================
          CARD 2: QUẢN LÝ CÁC THẺ DỊCH VỤ / NĂNG LỰC LÕI (CAPABILITY CARDS)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-bold text-slate-900">
                2. Danh sách 4 Thẻ Năng lực &amp; Dịch vụ
              </h2>
              <Badge
                label={`${items.length} thẻ`}
                variant="neutral"
                className="h-7 px-3 text-xs"
              />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Quản lý số thứ tự, tiêu đề, mô tả, biểu tượng icon và liên kết của từng thẻ dịch vụ
            </p>
          </div>

          <Button
            label="Thêm thẻ mới"
            variant="secondary"
            className="px-4 h-9 text-xs"
            onClick={handleAddItem}
          />
        </div>

        {/* List of Capability Cards */}
        <div className="space-y-5">
          {items.map((item, index) => (
            <div
              key={`item-${index}`}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-all space-y-4"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {item.num || `0${index + 1}`}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Thẻ {index + 1}: {item.title || 'Chưa đặt tiêu đề'}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    label="Lên"
                    variant="ghost"
                    className="px-3 h-8 text-xs"
                    isDisabled={index === 0}
                    onClick={() => handleMoveItem(index, 'up')}
                  />
                  <Button
                    label="Xuống"
                    variant="ghost"
                    className="px-3 h-8 text-xs"
                    isDisabled={index === items.length - 1}
                    onClick={() => handleMoveItem(index, 'down')}
                  />
                  <Button
                    label="Xóa thẻ"
                    variant="ghost"
                    className="px-3 h-8 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Num & Title */}
                <div className="md:col-span-2 space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Số thứ tự
                  </label>
                  <input
                    type="text"
                    value={item.num}
                    onChange={(e) =>
                      handleUpdateItem(index, 'num', e.target.value)
                    }
                    placeholder="01"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div className="md:col-span-5 space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Tiêu đề thẻ dịch vụ *
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      handleUpdateItem(index, 'title', e.target.value)
                    }
                    placeholder="US Fulfillment & Logistics"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="md:col-span-5 space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Đường dẫn liên kết (Link)
                  </label>
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) =>
                      handleUpdateItem(index, 'href', e.target.value)
                    }
                    placeholder="/speedx"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                {/* Icon & Upload */}
                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Icon SVG / Ảnh biểu tượng
                  </label>
                  <div className="flex items-center gap-3">
                    {/* Icon preview */}
                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center p-2 shrink-0 border border-slate-200">
                      {item.icon ? (
                        <img
                          src={item.icon}
                          alt={item.title}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              '/assets/home-icon__1_.svg';
                          }}
                        />
                      ) : (
                        <span className="text-xs text-slate-400">Không có</span>
                      )}
                    </div>

                    <input
                      type="text"
                      value={item.icon}
                      onChange={(e) =>
                        handleUpdateItem(index, 'icon', e.target.value)
                      }
                      placeholder="/assets/home-icon__1_.svg"
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />

                    <label className="cursor-pointer shrink-0">
                      <input
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        disabled={isUploadingIcon}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadingItemIndex(index);
                            await uploadIconFile(file);
                            e.target.value = '';
                          }
                        }}
                      />
                      <span className="inline-flex items-center justify-center px-3.5 h-9 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition">
                        {isUploadingIcon && uploadingItemIndex === index
                          ? 'Đang tải...'
                          : 'Tải icon'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Nội dung mô tả (Content) *
                  </label>
                  <textarea
                    rows={3}
                    value={item.desc}
                    onChange={(e) =>
                      handleUpdateItem(index, 'desc', e.target.value)
                    }
                    placeholder="Fast production turnaround, reliable order processing, and full TikTok Shop US compliance for seamless cross-border delivery."
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 pt-3">
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
          isDisabled={isSaving || isUploadingBg || isUploadingIcon}
        />
      </div>
    </form>
  );
}
