'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Upload,
  X,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Camera,
  Layers,
} from 'lucide-react';
import { Button, Card, Badge, Field, Selector } from '@astryxdesign/core';
import { AdminTeamMember } from '@/lib/services/people.service';
import { DEPARTMENTS, PEOPLE_STATUSES } from '@/lib/validations/people';
import SkillTagInput from './components/SkillTagInput';

interface PeopleFormClientProps {
  mode: 'create' | 'edit';
  initialData?: AdminTeamMember | null;
}

export default function PeopleFormClient({
  mode,
  initialData,
}: PeopleFormClientProps) {
  const router = useRouter();

  // Form states
  const [name, setName] = useState(initialData?.name || '');
  const [role, setRole] = useState(initialData?.role || '');
  const [department, setDepartment] = useState<string>(
    initialData?.department || DEPARTMENTS[0]
  );
  const [location, setLocation] = useState(
    initialData?.location || 'Singapore / Global'
  );
  const [quote, setQuote] = useState(initialData?.quote || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [linkedin, setLinkedin] = useState(initialData?.linkedin || '');
  const [bio, setBio] = useState(initialData?.bio || '');
  const [skills, setSkills] = useState<string[]>(initialData?.skills || []);
  const [isLeader, setIsLeader] = useState<boolean>(initialData?.isLeader ?? false);
  const [order, setOrder] = useState<number>(initialData?.order ?? 0);
  const [status, setStatus] = useState<string>(
    initialData?.status || 'published'
  );

  // Status & loading states
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle Cloudinary upload via /api/admin/upload
  const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'egead_cms/people');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setImage(data.url);
      } else {
        setUploadError(data.error || 'Tải ảnh thất bại');
      }
    } catch {
      setUploadError('Không thể kết nối đến máy chủ khi tải ảnh');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Client validation
    if (!name.trim()) {
      setErrorMessage('Vui lòng nhập họ và tên nhân sự');
      return;
    }
    if (!role.trim()) {
      setErrorMessage('Vui lòng nhập chức danh / vai trò');
      return;
    }
    if (!location.trim()) {
      setErrorMessage('Vui lòng nhập địa điểm làm việc');
      return;
    }
    if (!image.trim()) {
      setErrorMessage('Vui lòng tải lên ảnh chân dung hoặc nhập URL ảnh');
      return;
    }
    if (!bio.trim()) {
      setErrorMessage('Vui lòng nhập tóm tắt tiểu sử');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        name: name.trim(),
        role: role.trim(),
        department,
        location: location.trim(),
        quote: quote.trim() || null,
        image: image.trim(),
        linkedin: linkedin.trim() || null,
        bio: bio.trim(),
        skills,
        isLeader,
        order: Number(order) || 0,
        status,
      };

      const url =
        mode === 'create'
          ? '/api/admin/people'
          : `/api/admin/people/${initialData?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        setSuccessMessage(
          mode === 'create'
            ? 'Đã tạo hồ sơ nhân sự thành công!'
            : 'Đã cập nhật hồ sơ nhân sự thành công!'
        );
        setTimeout(() => {
          router.push('/admin/people');
          router.refresh();
        }, 800);
      } else {
        setErrorMessage(result.error || 'Có lỗi xảy ra khi lưu thông tin');
      }
    } catch {
      setErrorMessage('Lỗi kết nối khi gửi dữ liệu lên máy chủ');
    } finally {
      setIsSubmitting(false);
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
              label="Quay lại danh sách"
              variant="secondary"
              size="sm"
              href="/admin/people"
            />
            {isLeader && (
              <Badge label="Ban Lãnh đạo Cấp cao" variant="purple" />
            )}
            <Badge label={department} variant="neutral" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            {mode === 'create'
              ? 'Thêm nhân sự mới'
              : `Chỉnh sửa hồ sơ: ${initialData?.name}`}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            {mode === 'create'
              ? 'Tạo mới thành viên đội ngũ lãnh đạo hoặc chuyên gia E-GEAD'
              : `Cập nhật thông tin chi tiết, chức danh và kỹ năng chuyên môn của ${initialData?.name}`}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            label="Hủy bỏ"
            variant="ghost"
            href="/admin/people"
          />
          <Button
            label={
              isSubmitting
                ? 'Đang lưu dữ liệu...'
                : mode === 'create'
                ? 'Tạo nhân sự mới'
                : 'Lưu thay đổi'
            }
            variant="primary"
            type="submit"
            isDisabled={isSubmitting}
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

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center justify-between">
          <span>{successMessage}</span>
        </div>
      )}

      {/* =========================================================================
          CARD 1: THÔNG TIN CHÍNH
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            Thông tin định danh &amp; Tổ chức
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Các trường thông tin cơ bản về chức danh, khối phòng ban và định vị nhân sự
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Field
            label="Họ và tên nhân sự"
            inputID="people-name"
            isRequired
            description="Tên đầy đủ hiển thị trên thẻ nhân sự và sơ đồ"
          >
            <input
              id="people-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Suhas Hiwale, Kenneth Kong..."
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
              required
            />
          </Field>

          {/* Role */}
          <Field
            label="Chức danh / Vai trò"
            inputID="people-role"
            isRequired
            description="Chức vụ đảm nhiệm tại tập đoàn E-GEAD"
          >
            <input
              id="people-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Ví dụ: Chief Executive Officer, Head of AI..."
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
              required
            />
          </Field>

          {/* Department */}
          <div>
            <Selector
              label="Khối phòng ban"
              isRequired
              description="Khối nghiệp vụ chính trực thuộc"
              value={department}
              onChange={(val) => setDepartment(val)}
              options={DEPARTMENTS.map((dept) => ({ value: dept, label: dept }))}
            />
          </div>

          {/* Location */}
          <Field
            label="Địa điểm làm việc"
            inputID="people-location"
            isRequired
            description="Thành phố / Quốc gia hoặc trung tâm điều hành"
          >
            <input
              id="people-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ví dụ: Singapore / Global, Tokyo, Japan..."
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
              required
            />
          </Field>

          {/* Order */}
          <Field
            label="Thứ tự sắp xếp"
            inputID="people-order"
            description="Số thứ tự ưu tiên khi hiển thị trên danh sách (số nhỏ hơn đứng trước)"
          >
            <input
              id="people-order"
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
            />
          </Field>

          {/* Status */}
          <div>
            <Selector
              label="Trạng thái hiển thị"
              description="Kiểm soát khả năng hiển thị ngoài trang công khai"
              value={status}
              onChange={(val) => setStatus(val)}
              options={[
                { value: 'published', label: 'Đang hiển thị (Published)' },
                { value: 'draft', label: 'Bản nháp (Draft)' },
                { value: 'archived', label: 'Lưu trữ (Archived)' },
              ]}
            />
          </div>
        </div>

        {/* Leadership Toggle */}
        <div className="pt-2">
          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={isLeader}
              onChange={(e) => setIsLeader(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
            />
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                Nhân sự thuộc Ban Lãnh đạo Cấp cao (Leadership Team)
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Khi được đánh dấu là Lãnh đạo, nhân sự sẽ xuất hiện tại tab Lãnh đạo và có thể cấu hình sơ đồ các Squads cấp dưới tại màn hình Sơ đồ Tổ chức.
              </div>
            </div>
          </label>
        </div>
      </Card>

      {/* =========================================================================
          CARD 2: TRUYỀN THÔNG & KỸ NĂNG
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-5 sm:p-6 space-y-5 bg-white">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            Truyền thông, Hình ảnh &amp; Kỹ năng
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ảnh chân dung chuyên nghiệp, mạng xã hội, câu châm ngôn và các năng lực cốt lõi
          </p>
        </div>

        {/* Avatar Upload */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700">
            Ảnh đại diện chân dung <span className="text-rose-500">*</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-slate-200/80 bg-slate-50/50">
            {/* Image preview */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-slate-200 border-2 border-slate-300/80 shrink-0">
              {image ? (
                <img
                  src={image}
                  alt={name || 'Avatar'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <Camera className="w-6 h-6" />
                </div>
              )}
            </div>

            {/* Upload actions */}
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 cursor-pointer shadow-sm transition-colors">
                  <span>{isUploadingImage ? 'Đang tải ảnh...' : 'Chọn tệp ảnh mới'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    disabled={isUploadingImage}
                    className="hidden"
                  />
                </label>

                {image && (
                  <Button
                    label="Xóa ảnh"
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => setImage('')}
                  />
                )}
              </div>

              {uploadError && (
                <div className="text-xs text-rose-600 font-medium">
                  {uploadError}
                </div>
              )}

              {/* URL Direct Input fallback */}
              <div className="pt-1">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Hoặc dán URL ảnh trực tiếp (Cloudinary / CDN)..."
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-800"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LinkedIn */}
          <Field
            label="Đường dẫn LinkedIn"
            inputID="people-linkedin"
            isOptional
            description="Liên kết tới hồ sơ LinkedIn cá nhân"
          >
            <input
              id="people-linkedin"
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://www.linkedin.com/in/..."
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
            />
          </Field>

          {/* Quote */}
          <Field
            label="Trích dẫn triết lý làm việc (Quote)"
            inputID="people-quote"
            isOptional
            description="Câu nói đại diện hoặc thông điệp cốt lõi của nhân sự"
          >
            <input
              id="people-quote"
              type="text"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Ví dụ: No matter when or where, always bring your ‘A’ game..."
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
            />
          </Field>
        </div>

        {/* Skills Tag Input */}
        <div>
          <Field
            label="Danh sách kỹ năng chuyên môn (Skills)"
            inputID="people-skills"
            description="Nhập từ khóa kỹ năng và nhấn Enter hoặc Thêm để gắn thẻ"
          >
            <SkillTagInput
              skills={skills}
              onChange={setSkills}
              placeholder="Nhập kỹ năng (ví dụ: Next.js, AI, Global Scaling...)"
            />
          </Field>
        </div>

        {/* Bio Textarea */}
        <div>
          <Field
            label="Tiểu sử tóm tắt (Bio)"
            inputID="people-bio"
            isRequired
            description="Mô tả quá trình công tác, năng lực và đóng góp chuyên môn"
          >
            <textarea
              id="people-bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Mô tả kinh nghiệm, năng lực nổi bật và vai trò thực tiễn..."
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
              required
            />
          </Field>
        </div>
      </Card>

      {/* =========================================================================
          BOTTOM ACTIONS
          ========================================================================= */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          label="Hủy bỏ"
          variant="ghost"
          href="/admin/people"
        />
        <Button
          label={
            isSubmitting
              ? 'Đang lưu dữ liệu...'
              : mode === 'create'
              ? 'Tạo nhân sự mới'
              : 'Lưu thay đổi'
          }
          variant="primary"
          type="submit"
          isDisabled={isSubmitting}
        />
      </div>
    </form>
  );
}
