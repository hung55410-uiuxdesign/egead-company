'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Briefcase,
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  FileInput,
  FileText,
} from 'lucide-react';
import { CareerPost, CareerSibling, JobStatus, JobType } from '@/types/career';
import type { Locale } from '@/lib/i18n/config';
import TipTapEditor from '@/components/admin/shared/TipTapEditor';
import { Card, Button, Badge, Selector, CheckboxInput, TextInput, TextArea } from '@astryxdesign/core';
import { useSaveJobMutation, useCreateJobTranslationMutation } from '@/lib/hooks';

interface CareerEditorClientProps {
  initialJob?: CareerPost | null;
  departments: string[];
  /** Các phiên bản ngôn ngữ của cùng tin tuyển dụng (gồm cả tin hiện tại) */
  siblings?: CareerSibling[];
}

const LANGUAGE_NAME: Record<Locale, string> = {
  en: 'Tiếng Anh (EN)',
  vi: 'Tiếng Việt (VI)',
};

export default function CareerEditorClient({
  initialJob,
  departments,
  siblings = [],
}: CareerEditorClientProps) {
  const router = useRouter();
  const isEditing = Boolean(initialJob?.id);

  const [title, setTitle] = useState(initialJob?.title || '');
  const [slug, setSlug] = useState(initialJob?.slug || '');
  const [department, setDepartment] = useState(
    initialJob?.department || 'Engineering & Technology'
  );
  const [customDepartment, setCustomDepartment] = useState('');
  const [location, setLocation] = useState(
    initialJob?.location || 'Hà Nội (Hybrid)'
  );
  const [type, setType] = useState<JobType | string>(
    initialJob?.type || 'Full-time'
  );
  const [experience, setExperience] = useState(
    initialJob?.experience || '2 - 4 năm kinh nghiệm'
  );
  const [salary, setSalary] = useState(
    initialJob?.salary || '25 - 40 Triệu VND'
  );
  const [quantity, setQuantity] = useState(initialJob?.quantity || '02 nhân sự');
  const [deadline, setDeadline] = useState(
    initialJob?.deadline || '2026-12-31'
  );
  const [excerpt, setExcerpt] = useState(initialJob?.excerpt || '');
  const [description, setDescription] = useState(
    initialJob?.description || ''
  );
  const [requirements, setRequirements] = useState(
    initialJob?.requirements || ''
  );
  const [benefits, setBenefits] = useState(
    initialJob?.benefits || ''
  );
  const [contactEmail, setContactEmail] = useState(
    initialJob?.contactEmail || 'hr@egead.com'
  );
  const [status, setStatus] = useState<JobStatus>(
    initialJob?.status || 'published'
  );
  const [featured, setFeatured] = useState<boolean>(
    initialJob?.featured || false
  );

  const [activeTab, setActiveTab] = useState<'desc' | 'req' | 'ben'>('desc');
  const saveJobMutation = useSaveJobMutation();
  const translationMutation = useCreateJobTranslationMutation();
  const [language, setLanguage] = useState<Locale>(initialJob?.locale || 'en');
  const isSubmitting = saveJobMutation.isPending;

  const generateSlugFromTitle = () => {
    if (!title) return;
    const generated = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    setSlug(generated);
  };

  const handleApplyTemplate = (tab: 'desc' | 'req' | 'ben') => {
    if (tab === 'desc') {
      setDescription(
        `<p><strong>Vai trò và sứ mệnh của bạn tại E-GEAD:</strong></p><p>Vị trí này chịu trách nhiệm trực tiếp tham gia xây dựng và mở rộng hệ thống vận hành thương mại điện tử xuyên biên giới của E-GEAD, đảm bảo chất lượng dịch vụ và tối ưu hóa trải nghiệm khách hàng toàn cầu.</p><h3>Trách nhiệm chính:</h3><ul><li>Lập kế hoạch và triển khai các nhiệm vụ trọng tâm theo định hướng của phòng ban.</li><li>Theo dõi, đo lường và tối ưu hóa các chỉ số hiệu suất định kỳ (KPIs).</li><li>Nghiên cứu áp dụng các công nghệ, công cụ tự động hóa mới để cải tiến quy trình.</li><li>Phối hợp cùng các nhóm chức năng khác (Tech, Ops, Marketing) để giải quyết các vấn đề phức tạp.</li></ul>`
      );
    } else if (tab === 'req') {
      setRequirements(
        `<h3>Yêu cầu ứng viên:</h3><ul><li>Tốt nghiệp Đại học chuyên ngành liên quan hoặc có kinh nghiệm tương đương.</li><li>Có ít nhất 2 - 3 năm kinh nghiệm thực chiến trong lĩnh vực tương đương.</li><li>Tư duy phản biện, khả năng tự học hỏi và cập nhật nhanh các xu hướng mới.</li><li>Khả năng đọc hiểu tài liệu tiếng Anh tốt là một lợi thế lớn.</li><li>Tinh thần trách nhiệm cao, chủ động trong công việc và kỹ năng làm việc nhóm tốt.</li></ul>`
      );
    } else if (tab === 'ben') {
      setBenefits(
        `<h3>Quyền lợi & Đãi ngộ:</h3><ul><li><strong>Mức thu nhập hấp dẫn:</strong> Lương cứng cạnh tranh + Thưởng doanh thu/thưởng dự án không giới hạn.</li><li><strong>Phúc lợi toàn diện:</strong> Đóng BHXH 100% lương, bảo hiểm sức khỏe VIP cho nhân viên.</li><li><strong>Cơ hội phát triển:</strong> Tham gia các khóa đào tạo chuyên sâu và lộ trình thăng tiến rõ ràng lên Leader/Manager.</li><li><strong>Môi trường làm việc:</strong> Trẻ trung, tôn trọng sự sáng tạo, chính sách Hybrid linh hoạt và trang thiết bị hiện đại.</li><li>Chế độ du lịch hàng năm, teambuilding định kỳ và các hoạt động thể thao phong trào.</li></ul>`
      );
    }
  };

  const handleSubmit = async (targetStatus?: JobStatus) => {
    const submitStatus = targetStatus || status;

    if (!title.trim()) {
      return;
    }

    const finalSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const finalDepartment =
      department === '__custom__'
        ? customDepartment.trim() || 'General'
        : department;

    const payload = {
      ...(initialJob?.id ? { id: initialJob.id } : {}),
      title: title.trim(),
      slug: finalSlug,
      department: finalDepartment,
      location: location.trim(),
      type,
      experience: experience.trim(),
      salary: salary.trim(),
      quantity: String(quantity).trim(),
      deadline,
      excerpt: excerpt.trim(),
      description,
      requirements,
      benefits,
      contactEmail: contactEmail.trim(),
      status: submitStatus,
      featured,
      locale: language,
    };

    try {
      await saveJobMutation.mutateAsync(payload);
    } catch {
      // Astryx Toast displays error automatically
    }
  };

  return (
    <div className="space-y-6 font-open-sans w-full pb-16">
      {/* =========================================================================
          TOP NAV & ACTIONS HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/careers"
            className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {isEditing ? 'Chỉnh sửa tin tuyển dụng' : 'Đăng tin tuyển dụng mới'}
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              {isEditing
                ? `ID: ${initialJob?.id} — Cập nhật lần cuối: ${initialJob?.updatedAt}`
                : 'Thiết lập tiêu đề, chế độ đãi ngộ, mô tả chi tiết và kích hoạt form nhận hồ sơ'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {isEditing && (
            <Button
              label="Xem Form"
              variant="secondary"
              href={`/admin/careers/form-preview?jobId=${initialJob?.id}`}
              className='h-10 px-4'
            />
          )}
          <Button
            label="Lưu bản nháp"
            className='h-10 px-4'
            variant="secondary"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={() => handleSubmit('draft')}
          />
          <Button
            label={status === 'published' ? 'Lưu & Đang tuyển' : 'Xuất bản ngay'}
            variant="primary"
            className='h-10 px-4'
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={() => handleSubmit('published')}
          />
        </div>
      </div>

      {/* Main 2-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Title, Slug, Excerpt, Rich Content Tabs (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Job Info Card */}
          <Card variant="default" className="rounded-2xl p-6 space-y-5">
            <TextInput
              label="Tiêu đề vị trí tuyển dụng"
              isRequired
              value={title}
              onChange={setTitle}
              placeholder="VD: Senior Fullstack Engineer (Next.js & Node.js)..."
              width="100%"
              className='h-10 border'
            />

            {/* Slug input with auto generate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">
                  Đường dẫn tĩnh (Slug)
                </label>
                <Button
                  label="Tự động tạo từ tiêu đề"
                  variant="secondary"
                  className='h-10 px-4'
                  onClick={generateSlugFromTitle}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-2 text-xs text-slate-500 font-mono select-none bg-slate-50 border border-slate-200 rounded-lg">
                  /careers/
                </span>
                <div className="flex-1">
                  <TextInput
                    label="Đường dẫn tĩnh (Slug)"
                    isLabelHidden
                    value={slug}
                    onChange={setSlug}
                    placeholder="senior-fullstack-engineer-nextjs-nodejs"
                    width="100%"
                    className='h-10 border'
                  />
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <TextArea
                label="Tóm tắt ngắn gọn vị trí (Excerpt)"
                rows={3}
                value={excerpt}
                onChange={setExcerpt}
                placeholder="Tóm tắt ngắn gọn mục tiêu công việc, hiển thị ở thẻ danh sách và meta SEO..."
                width="100%"
                className="border"
              />
            </div>
          </Card>

          {/* Detailed Job Content with Tabbed TipTap Rich Editors */}
          <Card variant="default" className="rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Nội dung chi tiết tin tuyển dụng
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chỉnh sửa 3 phần chính bằng trình soạn thảo Rich Text chuyên nghiệp
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('desc')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'desc'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Mô tả công việc
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('req')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'req'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Yêu cầu ứng viên
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('ben')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'ben'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Quyền lợi &amp; Đãi ngộ
                </button>
              </div>
            </div>

            {/* Quick Template Button for current tab */}
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl text-xs">
              <span className="text-slate-600">
                Đang soạn thảo: <strong>
                  {activeTab === 'desc' && 'Mô tả công việc (Job Description)'}
                  {activeTab === 'req' && 'Yêu cầu ứng viên (Job Requirements)'}
                  {activeTab === 'ben' && 'Quyền lợi & Đãi ngộ (Benefits)'}
                </strong>
              </span>
              <button
                type="button"
                onClick={() => handleApplyTemplate(activeTab)}
                className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
              >
                + Chèn mẫu chuẩn gợi ý
              </button>
            </div>

            {/* TipTap WYSIWYG for each tab */}
            {activeTab === 'desc' && (
              <TipTapEditor
                content={description}
                onChange={(html) => setDescription(html)}
                postTitle={`${title} - Mô tả công việc`}
                placeholder="Nhập mô tả công việc, trách nhiệm chính, phạm vi dự án..."
              />
            )}

            {activeTab === 'req' && (
              <TipTapEditor
                content={requirements}
                onChange={(html) => setRequirements(html)}
                postTitle={`${title} - Yêu cầu công việc`}
                placeholder="Nhập các yêu cầu về kỹ năng, số năm kinh nghiệm, phẩm chất cá nhân..."
              />
            )}

            {activeTab === 'ben' && (
              <TipTapEditor
                content={benefits}
                onChange={(html) => setBenefits(html)}
                postTitle={`${title} - Quyền lợi đãi ngộ`}
                placeholder="Nhập mức lương thưởng, bảo hiểm, trang thiết bị, lộ trình thăng tiến..."
              />
            )}
          </Card>
        </div>

        {/* Right Column: Key Attributes & Settings */}
        <div className="space-y-6">
          {/* Language versions */}
          {isEditing && (
            <Card variant="default" className="rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-3">
                Phiên bản ngôn ngữ
              </h3>

              <ul className="space-y-2.5">
                {(['en', 'vi'] as Locale[]).map((code) => {
                  const isCurrent = (initialJob?.locale || 'en') === code;
                  const version = isCurrent
                    ? null
                    : siblings.find((sib) => sib.locale === code);
                  return (
                    <li
                      key={code}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="font-semibold text-slate-800">
                        {LANGUAGE_NAME[code]}
                      </span>
                      {isCurrent ? (
                        <Badge label="Đang chỉnh sửa" variant="success" className="h-7 px-3" />
                      ) : version ? (
                        <Link
                          href={`/admin/careers/${version.id}`}
                          className="text-emerald-700 hover:underline font-medium"
                        >
                          {version.status === 'published' ? 'Mở bản đang tuyển' : 'Mở bản nháp'}
                        </Link>
                      ) : (
                        <Button
                          label={code === 'en' ? 'Tạo bản tiếng Anh' : 'Tạo bản tiếng Việt'}
                          variant="secondary"
                          isDisabled={translationMutation.isPending || isSubmitting}
                          isLoading={translationMutation.isPending}
                          onClick={() =>
                            translationMutation.mutate({ id: initialJob!.id, locale: code })
                          }
                          className="h-9 px-3"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Bản mới được tạo dưới dạng bản nháp (sao chép nội dung hiện tại) để bạn dịch rồi
                xuất bản. Hãy lưu tin này trước khi tạo bản dịch.
              </p>
            </Card>
          )}

          {/* Status & Priority */}
          <Card variant="default" className="rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-3">
              Trạng thái &amp; Hiển thị
            </h3>

            <div>
              <Selector
                label="Ngôn ngữ tin tuyển dụng"
                value={language}
                onChange={(val) => setLanguage(val as Locale)}
                options={[
                  { value: 'en', label: LANGUAGE_NAME.en },
                  { value: 'vi', label: LANGUAGE_NAME.vi },
                ]}
                className='h-10 border'
              />
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Nếu chỉ có một ngôn ngữ, tin hiển thị ở cả hai phiên bản website. Nếu có đủ hai
                ngôn ngữ, website chọn bản theo ngôn ngữ đang dùng và trong tin có nút chuyển EN/VI.
              </p>
            </div>

            <div>
              <Selector
                label="Trạng thái tuyển dụng"
                value={status}
                onChange={(val) => setStatus(val as JobStatus)}
                options={[
                  { value: 'published', label: 'Đang mở tuyển (Published)' },
                  { value: 'draft', label: 'Lưu bản nháp (Draft)' },
                  { value: 'closed', label: 'Đã đóng tuyển (Closed)' },
                ]}
                className='h-10 border'
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <CheckboxInput
                label="Vị trí ưu tiên (HOT)"
                description="Gắn nhãn HOT nổi bật trên website"
                value={featured}
                onChange={(checked) => setFeatured(checked)}
              />
            </div>
          </Card>

          {/* Department & Role Details */}
          <Card variant="default" className="rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-3">
              Phòng ban &amp; Vị trí
            </h3>

            <div>
              <Selector
                label="Phòng ban"
                className='h-10 border'
                value={department}
                onChange={(val) => setDepartment(val)}
                options={[
                  ...departments.map((d) => ({ value: d, label: d })),
                  ...(!departments.includes('Engineering & Technology')
                    ? [{ value: 'Engineering & Technology', label: 'Engineering & Technology' }]
                    : []),
                  ...(!departments.includes('E-Commerce Operations')
                    ? [{ value: 'E-Commerce Operations', label: 'E-Commerce Operations' }]
                    : []),
                  ...(!departments.includes('Logistics & Supply Chain')
                    ? [{ value: 'Logistics & Supply Chain', label: 'Logistics & Supply Chain' }]
                    : []),
                  ...(!departments.includes('Growth & Marketing')
                    ? [{ value: 'Growth & Marketing', label: 'Growth & Marketing' }]
                    : []),
                  ...(!departments.includes('HR & Administration')
                    ? [{ value: 'HR & Administration', label: 'HR & Administration' }]
                    : []),
                  { value: '__custom__', label: '+ Nhập phòng ban khác...' },
                ]}
              />

              {department === '__custom__' && (
                <div className="mt-2">
                  <TextInput
                    label="Tên phòng ban khác"
                    isLabelHidden
                    value={customDepartment}
                    onChange={(val) => setCustomDepartment(val)}
                    placeholder="Nhập tên phòng ban..."
                    width="100%"
                    className='h-10 border'
                  />
                </div>
              )}
            </div>

            <div>
              <Selector
                label="Loại hình làm việc"
                className='h-10 border'
                value={type}
                onChange={(val) => setType(val as JobType)}
                options={[
                  { value: 'Full-time', label: 'Toàn thời gian (Full-time)' },
                  { value: 'Part-time', label: 'Bán thời gian (Part-time)' },
                  { value: 'Contract', label: 'Hợp đồng (Contract)' },
                  { value: 'Internship', label: 'Thực tập sinh (Internship)' },
                  { value: 'Remote', label: 'Từ xa (Remote)' },
                ]}
              />
            </div>

            <TextInput
              label="Địa điểm làm việc"
              value={location}
              onChange={setLocation}
              placeholder="VD: Hà Nội (Hybrid), TP. HCM, On-site..."
              width="100%"
              className='h-10 border'
            />
          </Card>

          {/* Salary, Experience & Deadline */}
          <Card variant="default" className="rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-3">
              Mức lương &amp; Yêu cầu
            </h3>

            <TextInput
              label="Mức lương dự kiến"
              value={salary}
              onChange={setSalary}
              placeholder="VD: 25 - 40 Triệu VND, Thỏa thuận..."
              width="100%"
              className='h-10 border'
            />

            <TextInput
              label="Kinh nghiệm yêu cầu"
              value={experience}
              onChange={setExperience}
              placeholder="VD: 2+ năm kinh nghiệm, 3-5 năm..."
              width="100%"
              className='h-10 border'
            />

            <TextInput
              label="Số lượng tuyển dụng"
              value={String(quantity)}
              onChange={setQuantity}
              placeholder="VD: 02 nhân sự"
              width="100%"
              className='h-10 border'
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Hạn chót nhận hồ sơ
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition-all"
              />
            </div>

            <TextInput
              type="email"
              label="Email nhận thông báo CV"
              value={contactEmail}
              onChange={setContactEmail}
              placeholder="hr@egead.com"
              width="100%"
              className='h-10 border'
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
