'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Badge, Switch, TextInput, TextArea } from '@astryxdesign/core';
import type {
  CompanySectionModel,
  Company4DMethodData,
  Company4DStep,
} from '@/lib/services/company-section.service';
import { DEFAULT_4D_METHOD_STEPS } from '@/lib/services/company-section.service';
import { useUpdateCompanySectionMutation } from '@/lib/hooks';
import Company4DMethodDiagram from '@/components/pages/company/company/components/Company4DMethodDiagram';

interface Company4DMethodSectionFormClientProps {
  section: CompanySectionModel;
}

export default function Company4DMethodSectionFormClient({
  section,
}: Company4DMethodSectionFormClientProps) {
  const router = useRouter();

  const [title, setTitle] = useState(
    section.title ||
      'End-to-end innovative and forward-thinking solutions to make digital commerce simpler to navigate.'
  );
  const [subtitle, setSubtitle] = useState(section.subtitle || 'Our 4D Method');
  const [isActive, setIsActive] = useState<boolean>(section.isActive ?? true);

  const rawData: Company4DMethodData = section.data || {};
  const initialSteps: Company4DStep[] =
    rawData.steps && rawData.steps.length > 0
      ? rawData.steps
      : DEFAULT_4D_METHOD_STEPS;

  const [steps, setSteps] = useState<Company4DStep[]>(initialSteps);

  const updateMutation = useUpdateCompanySectionMutation({
    redirectTo: '/admin/company',
  });
  const isSaving = updateMutation.isPending;

  const handleStepChange = (
    index: number,
    field: keyof Company4DStep,
    value: string | number
  ) => {
    setSteps((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [field]: value,
      };
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await updateMutation.mutateAsync({
        key: section.key,
        title: title.trim(),
        subtitle: subtitle.trim(),
        description: section.description,
        isActive,
        data: {
          ...rawData,
          steps,
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
              Cấu hình tiêu đề, nhãn phụ và dữ liệu 4 bước quy trình (Design - Build - Run - Grow)
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
            isDisabled={isSaving}
          />
        </div>
      </div>

      {/* Visibility Status Card */}
      <Card
        variant="default"
        className="rounded-2xl p-5 bg-white border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
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

      {/* General Title Info */}
      <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Thông tin tiêu đề khối
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <TextInput
              label="Nhãn phụ (Subtitle)"
              value={subtitle}
              onChange={(val) => setSubtitle(val)}
              placeholder="VD: Our 4D Method"
              width="100%"
              className="border h-10"
            />
          </div>
          <div className="md:col-span-2">
            <TextArea
              label="Tiêu đề chính (Title)"
              rows={2}
              value={title}
              onChange={(val) => setTitle(val)}
              placeholder="VD: End-to-end innovative and forward-thinking solutions..."
              width="100%"
              className="border"
            />
          </div>
        </div>
      </Card>

      {/* 4 Steps Management Grid */}
      <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">
            Dữ liệu 4 bước phương pháp luận 4D
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Mỗi bước tương ứng với một vòng lặp kết nối và hiển thị trực quan trên sơ đồ UI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, idx) => {
            const stepNumber = idx + 1;

            return (
              <div
                key={stepNumber}
                className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3.5"
              >
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                      {stepNumber}
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      Bước {stepNumber}
                    </span>
                  </div>
                  <Badge
                    label={step.name || `Step ${stepNumber}`}
                    variant="neutral"
                    className="text-xs font-semibold px-2.5 py-0.5"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TextInput
                    label="Tên bước trên sơ đồ"
                    value={step.name}
                    onChange={(val) => handleStepChange(idx, 'name', val)}
                    placeholder="VD: Design"
                    width="100%"
                    className="border h-10"
                  />

                  <TextInput
                    label="Tiêu đề nổi bật (Tagline)"
                    value={step.tagline}
                    onChange={(val) => handleStepChange(idx, 'tagline', val)}
                    placeholder="VD: Architect Strategies."
                    width="100%"
                    className="border h-10"
                  />
                </div>

                <TextArea
                  label="Nội dung mô tả chi tiết"
                  rows={3}
                  value={step.description}
                  onChange={(val) => handleStepChange(idx, 'description', val)}
                  placeholder="VD: We blueprint conversion using Concentrix TPS design and data insights."
                  width="100%"
                  className="border"
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Live Interactive Preview */}
      <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Xem trước trực quan khối 4D Method
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Giao diện thời gian thực như hiển thị trên trang Company khi người dùng tương tác
            </p>
          </div>
          <Badge label="Giao diện động" variant="success" className="text-xs" />
        </div>

        {/* Live Container with current Subtitle & Title */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#030607] border border-slate-800 space-y-6">
          <div>
            <p className="text-sm font-normal text-[#D4FAE6] mb-2 font-montserrat">
              {subtitle}
            </p>
            <h2 className="text-xl sm:text-2xl font-medium text-[#D4FAE6] font-montserrat leading-snug">
              {title}
            </h2>
          </div>

          <Company4DMethodDiagram steps={steps} isInteractive={true} />
        </div>
      </Card>
    </form>
  );
}
