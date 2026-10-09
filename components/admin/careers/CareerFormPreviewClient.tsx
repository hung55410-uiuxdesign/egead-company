'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  AlertCircle,
  Copy,
} from 'lucide-react';
import { CareerPost } from '@/types/career';
import { Card, Button, Badge, Selector } from '@astryxdesign/core';
import { useSubmitApplicationMutation } from '@/lib/hooks';

interface CareerFormPreviewClientProps {
  jobs: CareerPost[];
}

export default function CareerFormPreviewClient({
  jobs,
}: CareerFormPreviewClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultJobId = searchParams.get('jobId') || (jobs[0]?.id ?? 'general');

  const [jobId, setJobId] = useState<string>(defaultJobId);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [experienceYears, setExperienceYears] = useState('2 - 3 năm');
  const [startDate, setStartDate] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const selectedJob = jobs.find((j) => j.id === jobId);

  const submitMutation = useSubmitApplicationMutation({
    onSuccess: () => {
      setSubmitSuccess(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setCvUrl('');
      setPortfolioUrl('');
      setExpectedSalary('');
      setCoverLetter('');
    },
    onError: (error) => {
      setErrorMessage(error.message || 'Có lỗi xảy ra khi gửi form ứng tuyển.');
    },
  });

  const isSubmitting = submitMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Vui lòng nhập số điện thoại liên hệ.');
      return;
    }
    if (!cvUrl.trim()) {
      setErrorMessage('Vui lòng cung cấp link CV hoặc hồ sơ ứng tuyển.');
      return;
    }

    submitMutation.mutate({
      jobId,
      jobTitle: selectedJob ? selectedJob.title : 'Ứng tuyển tự do',
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      cvUrl: cvUrl.trim(),
      portfolioUrl: portfolioUrl.trim() || undefined,
      expectedSalary: expectedSalary.trim() || undefined,
      experienceYears: experienceYears.trim() || undefined,
      startDate: startDate || undefined,
      coverLetter: coverLetter.trim() || undefined,
    });
  };

  const handleCopyApiSnippet = () => {
    const snippet = `// Example POST request to submit an application
fetch('/api/admin/careers/applications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jobId: "${jobId}",
    jobTitle: "${selectedJob?.title || 'Senior Fullstack Engineer'}",
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0912345678",
    cvUrl: "https://drive.google.com/your-cv-file.pdf",
    portfolioUrl: "https://github.com/your-profile",
    expectedSalary: "35.000.000 VND",
    experienceYears: "3 năm",
    coverLetter: "Lý do ứng tuyển vào E-GEAD..."
  })
});`;
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 font-open-sans w-full pb-16">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Biểu mẫu ứng tuyển trực tuyến
            </h1>
            <Badge label="Trình thử nghiệm" variant="success" className='h-8 px-4' />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Biểu mẫu ứng tuyển để người ứng tuyển nộp CV về hệ thống quản trị E-GEAD Admin
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            label="Danh sách hồ sơ đã nhận"
            variant="secondary"
            className='h-10 px-4'
            href="/admin/careers/applications"
          />
        </div>
      </div>

      {/* =========================================================================
          SUCCESS BANNER AFTER FORM SUBMISSION
          ========================================================================= */}
      {submitSuccess && (
        <Card
          variant="default"
          className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-6 text-white shadow-xl animate-in zoom-in-95"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black">
                  Đã gửi hồ sơ ứng tuyển thành công!
                </h3>
                <p className="text-emerald-100 text-xs mt-0.5">
                  Dữ liệu ứng viên đã được lưu vào hệ thống và hiển thị trực tiếp trong trang Hồ sơ ứng tuyển.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Button
                label="Gửi thêm hồ sơ khác"
                variant="secondary"
                className='h-10 px-4'
                onClick={() => setSubmitSuccess(false)}
              />
              <Button
                label="Xem trong Quản trị"
                variant="primary"
                className='h-10 px-4'
                href="/admin/careers/applications"
              />
            </div>
          </div>
        </Card>
      )}

      {/* =========================================================================
          MAIN APPLICATION FORM
          ========================================================================= */}
      <Card variant="default" className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-extrabold text-slate-900">
            Mẫu đơn ứng tuyển trực tuyến E-GEAD
          </h2>
          <p className="text-slate-500 text-xs mt-1">
            Ứng viên điền thông tin cá nhân, đính kèm link CV và gửi trực tiếp về Ban tuyển dụng.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-2.5 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Position Selector */}
          <div>
            <Selector
              label="Vị trí ứng tuyển"
              className='h-10 border'
              value={jobId}
              onChange={(val) => setJobId(val)}
              options={[
                ...jobs.map((job) => ({
                  value: job.id,
                  label: `${job.title} — ${job.department} (${job.location})`,
                })),
                { value: 'general', label: 'Vị trí mở khác (General Application)' },
              ]}
            />

            {selectedJob && (
              <div className="mt-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex flex-wrap items-center gap-4 text-xs text-emerald-900">
                <span>Phòng ban: <strong>{selectedJob.department}</strong></span>
                <span>•</span>
                <span>Địa điểm: <strong>{selectedJob.location}</strong></span>
                <span>•</span>
                <span>Mức lương: <strong>{selectedJob.salary}</strong></span>
              </div>
            )}
          </div>

          {/* Grid 2 cols: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Họ và tên ứng viên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="VD: Nguyễn Hoàng Nam"
                className="w-full px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Địa chỉ email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="VD: hoangnam.nguyen@gmail.com"
                className="w-full px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
              />
            </div>
          </div>

          {/* Grid 2 cols: Phone & CV Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Số điện thoại liên hệ <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="VD: 0912 345 678"
                className="w-full px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Đường dẫn CV / Hồ sơ ứng tuyển <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={cvUrl}
                onChange={(e) => setCvUrl(e.target.value)}
                placeholder="https://drive.google.com/file/d/your-cv/view"
                className="w-full px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
              />
              <p className="text-xs text-slate-400 mt-1">
                Hỗ trợ link Google Drive, Dropbox, LinkedIn hoặc link tệp PDF trực tuyến.
              </p>
            </div>
          </div>

          {/* Grid 3 cols: Portfolio, Expected Salary, Start date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Portfolio / LinkedIn / GitHub
              </label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://github.com/username"
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mức lương mong muốn
              </label>
              <input
                type="text"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                placeholder="VD: 35.000.000 VND"
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Ngày sớm nhất nhận việc
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-slate-800 transition-colors"
              />
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Giới thiệu bản thân &amp; Lý do ứng tuyển
            </label>
            <textarea
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Chia sẻ ngắn gọn về kinh nghiệm, thế mạnh nổi bật và mục tiêu nghề nghiệp của bạn tại E-GEAD..."
              className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-slate-800 transition-colors resize-y leading-relaxed"
            />
          </div>

          {/* Submit Action using Astryx Button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-400">
              * Dữ liệu form sẽ lập tức được lưu vào hệ thống Admin
            </span>

            <Button
              label={isSubmitting ? 'Đang gửi hồ sơ...' : 'Gửi hồ sơ ứng tuyển'}
              variant="primary"
              className='h-10 px-4'
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </Card>

      {/* =========================================================================
          DEVELOPER / INTEGRATION GUIDE BOX
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-6 bg-slate-900 text-white space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">
            Tích hợp Form ứng tuyển vào Frontend / Website
          </h3>
          <Button
            label={copiedCode ? 'Đã sao chép!' : 'Sao chép mã API'}
            variant="secondary"
            className='h-10 px-4'
            onClick={handleCopyApiSnippet}
          />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Bất kỳ trang web nào (Landing Page, Popup, Trang tuyển dụng) đều có thể gửi hồ sơ ứng tuyển về hệ thống quản trị này bằng cách gửi POST request tới endpoint:
          <code className="text-emerald-400 font-mono ml-1.5 bg-black/40 px-2 py-0.5 rounded">
            /api/admin/careers/applications
          </code>
        </p>

        <pre className="p-3.5 rounded-xl bg-black/60 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed border border-slate-800">
          {`POST /api/admin/careers/applications
Content-Type: application/json

{
  "jobId": "${jobId}",
  "jobTitle": "${selectedJob?.title || 'Senior Fullstack Engineer'}",
  "fullName": "Nguyễn Văn A",
  "email": "nguyenvana@gmail.com",
  "phone": "0912345678",
  "cvUrl": "https://drive.google.com/file/d/cv.pdf/view"
}`}
        </pre>
      </Card>
    </div>
  );
}
