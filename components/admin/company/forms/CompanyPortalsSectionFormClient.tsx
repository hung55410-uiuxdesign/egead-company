'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Badge, Switch, TextInput } from '@astryxdesign/core';
import type { CompanySectionModel, CompanyPortalsData, CompanyPortalCard } from '@/lib/services/company-section.service';
import { useUploadMedia, useUpdateCompanySectionMutation } from '@/lib/hooks';

interface CompanyPortalsSectionFormClientProps {
  section: CompanySectionModel;
}

export default function CompanyPortalsSectionFormClient({
  section,
}: CompanyPortalsSectionFormClientProps) {
  const router = useRouter();

  const [isActive, setIsActive] = useState<boolean>(section.isActive ?? true);
  const rawData: CompanyPortalsData = section.data || {};

  // Banner
  const [bannerImage, setBannerImage] = useState(rawData.bannerImage || '/assets/company.png');
  const [bannerAlt, setBannerAlt] = useState(rawData.bannerAlt || 'E-GEAD People and Technology Hub');

  // People Card
  const [peopleSubtitle, setPeopleSubtitle] = useState(rawData.peopleCard?.subtitle || 'Our People');
  const [peopleTitle, setPeopleTitle] = useState(rawData.peopleCard?.title || 'Meet the people behind your success.');
  const [peopleIcon, setPeopleIcon] = useState(rawData.peopleCard?.icon || '/assets/icon31.svg');
  const [peopleHoverIcon, setPeopleHoverIcon] = useState(rawData.peopleCard?.hoverIcon || '/assets/icon32.svg');
  const [peopleBtnText, setPeopleBtnText] = useState(rawData.peopleCard?.buttonText || 'Our people');
  const [peopleBtnHref, setPeopleBtnHref] = useState(rawData.peopleCard?.buttonHref || '/people');

  // Careers Card
  const [careersSubtitle, setCareersSubtitle] = useState(rawData.careersCard?.subtitle || 'Job Opportunities');
  const [careersTitle, setCareersTitle] = useState(rawData.careersCard?.title || 'Be a Part of our wonderful team.');
  const [careersIcon, setCareersIcon] = useState(rawData.careersCard?.icon || '/assets/Name_Job_Opportunities__Color_BnW.svg');
  const [careersHoverIcon, setCareersHoverIcon] = useState(rawData.careersCard?.hoverIcon || '/assets/Name_Job_Opportunities__Color_Colorful.svg');
  const [careersBtnText, setCareersBtnText] = useState(rawData.careersCard?.buttonText || 'Careers');
  const [careersBtnHref, setCareersBtnHref] = useState(rawData.careersCard?.buttonHref || '/careers');

  const [uploadTarget, setUploadTarget] = useState<string | null>(null);

  const updateMutation = useUpdateCompanySectionMutation({
    redirectTo: '/admin/company',
  });
  const isSaving = updateMutation.isPending;

  const { uploadFile, isUploading } = useUploadMedia({
    defaultFolder: 'egead_cms/company/portals',
    successMessage: 'Tải ảnh thành công!',
    onSuccess: (data) => {
      if (uploadTarget === 'banner') setBannerImage(data.url);
      else if (uploadTarget === 'people-icon') setPeopleIcon(data.url);
      else if (uploadTarget === 'people-hover') setPeopleHoverIcon(data.url);
      else if (uploadTarget === 'careers-icon') setCareersIcon(data.url);
      else if (uploadTarget === 'careers-hover') setCareersHoverIcon(data.url);
      setUploadTarget(null);
    },
    onError: (err) => {
      alert(`Tải file thất bại: ${err.message}`);
      setUploadTarget(null);
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await updateMutation.mutateAsync({
        key: section.key,
        title: 'Meet the people & Explore opportunities',
        subtitle: 'Our Portals',
        description: section.description,
        isActive,
        data: {
          bannerImage: bannerImage.trim(),
          bannerAlt: bannerAlt.trim(),
          peopleCard: {
            subtitle: peopleSubtitle.trim(),
            title: peopleTitle.trim(),
            icon: peopleIcon.trim(),
            hoverIcon: peopleHoverIcon.trim(),
            buttonText: peopleBtnText.trim(),
            buttonHref: peopleBtnHref.trim(),
          },
          careersCard: {
            subtitle: careersSubtitle.trim(),
            title: careersTitle.trim(),
            icon: careersIcon.trim(),
            hoverIcon: careersHoverIcon.trim(),
            buttonText: careersBtnText.trim(),
            buttonHref: careersBtnHref.trim(),
          },
        },
      });
    } catch (err: any) {
      alert(`Lưu thất bại: ${err?.message || 'Có lỗi xảy ra'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full pb-12">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            label="Quay lại"
            variant="secondary"
            href="/admin/company"
            className="px-3 h-9 text-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{section.name}</h1>
              <Badge
                label={isActive ? 'Đang kích hoạt' : 'Tạm ẩn'}
                variant={isActive ? 'success' : 'neutral'}
                className="h-7 px-3 text-xs"
              />
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Cấu hình banner ảnh văn phòng và 2 cổng điều hướng (Nhân sự &amp; Tuyển dụng)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            label="Xem trang Live"
            variant="secondary"
            href="/company"
            target="_blank"
            className="px-4 h-10"
          />
          <Button
            type="submit"
            label={isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
            variant="primary"
            className="px-6 h-10"
            isDisabled={isSaving || isUploading}
          />
        </div>
      </div>

      {/* Visibility Status Card */}
      <Card variant="default" className="rounded-2xl p-5 bg-white border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Trạng thái hiển thị trên website</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Khi tạm ẩn, khối này sẽ hoàn toàn không xuất hiện trên trang Company của người dùng
          </p>
        </div>
        <div className="flex items-center">
          <Switch
            label={isActive ? 'Hiển thị trên website' : 'Tạm ẩn khỏi website'}
            value={isActive}
            onChange={(checked) => setIsActive(checked)}
            size="md"
          />
        </div>
      </Card>

      {/* Part 1: Big Banner */}
      <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Ảnh Banner lớn (People &amp; Technology Hub)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video flex items-center justify-center">
            {bannerImage ? (
              <img src={bannerImage} alt={bannerAlt} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-slate-400">Chưa có ảnh banner</span>
            )}
          </div>

          <div className="space-y-3">
            <TextInput
              label="Đường dẫn ảnh banner (URL)"
              value={bannerImage}
              onChange={(val) => setBannerImage(val)}
              placeholder="/assets/company.png hoặc URL ảnh"
              width="100%"
              className="border h-10"
            />

            <TextInput
              label="Mô tả ảnh (Alt)"
              value={bannerAlt}
              onChange={(val) => setBannerAlt(val)}
              placeholder="E-GEAD People and Technology Hub"
              width="100%"
              className="border h-10"
            />

            <div>
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={isUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadTarget('banner');
                      await uploadFile(file);
                      e.target.value = '';
                    }
                  }}
                />
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs">
                  {isUploading && uploadTarget === 'banner' ? 'Đang tải...' : 'Tải ảnh mới từ máy tính'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Part 2: 2 Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Our People */}
        <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Thẻ điều hướng 1: Our People
          </h3>

          <TextInput
            label="Nhãn phụ (Subtitle)"
            value={peopleSubtitle}
            onChange={(val) => setPeopleSubtitle(val)}
            placeholder="Our People"
            width="100%"
            className="border h-10"
          />

          <TextInput
            label="Tiêu đề thẻ"
            value={peopleTitle}
            onChange={(val) => setPeopleTitle(val)}
            placeholder="Meet the people behind your success."
            width="100%"
            className="border h-10"
          />

          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Icon chính"
              value={peopleIcon}
              onChange={(val) => setPeopleIcon(val)}
              placeholder="/assets/icon31.svg"
              width="100%"
              className="border h-10"
            />
            <TextInput
              label="Icon hover"
              value={peopleHoverIcon}
              onChange={(val) => setPeopleHoverIcon(val)}
              placeholder="/assets/icon32.svg"
              width="100%"
              className="border h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Nhãn nút"
              value={peopleBtnText}
              onChange={(val) => setPeopleBtnText(val)}
              placeholder="Our people"
              width="100%"
              className="border h-10"
            />
            <TextInput
              label="Đường dẫn nút"
              value={peopleBtnHref}
              onChange={(val) => setPeopleBtnHref(val)}
              placeholder="/people"
              width="100%"
              className="border h-10"
            />
          </div>
        </Card>

        {/* Card 2: Careers */}
        <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Thẻ điều hướng 2: Job Opportunities
          </h3>

          <TextInput
            label="Nhãn phụ (Subtitle)"
            value={careersSubtitle}
            onChange={(val) => setCareersSubtitle(val)}
            placeholder="Job Opportunities"
            width="100%"
            className="border h-10"
          />

          <TextInput
            label="Tiêu đề thẻ"
            value={careersTitle}
            onChange={(val) => setCareersTitle(val)}
            placeholder="Be a Part of our wonderful team."
            width="100%"
            className="border h-10"
          />

          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Icon chính"
              value={careersIcon}
              onChange={(val) => setCareersIcon(val)}
              placeholder="/assets/..."
              width="100%"
              className="border h-10"
            />
            <TextInput
              label="Icon hover"
              value={careersHoverIcon}
              onChange={(val) => setCareersHoverIcon(val)}
              placeholder="/assets/..."
              width="100%"
              className="border h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Nhãn nút"
              value={careersBtnText}
              onChange={(val) => setCareersBtnText(val)}
              placeholder="Careers"
              width="100%"
              className="border h-10"
            />
            <TextInput
              label="Đường dẫn nút"
              value={careersBtnHref}
              onChange={(val) => setCareersBtnHref(val)}
              placeholder="/careers"
              width="100%"
              className="border h-10"
            />
          </div>
        </Card>
      </div>
    </form>
  );
}
