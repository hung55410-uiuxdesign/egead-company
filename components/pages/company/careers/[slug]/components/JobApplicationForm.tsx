'use client';

import React, { useState } from 'react';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react';

interface JobApplicationFormProps {
  positionTitle: string;
  jobId?: string;
}

export default function JobApplicationForm({
  positionTitle,
  jobId,
}: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg('Dung lượng tệp không được vượt quá 15MB.');
        return;
      }
      setSelectedFile(file);
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setErrorMsg('Vui lòng điền đầy đủ các trường thông tin bắt buộc (*).');
      return;
    }

    if (!selectedFile) {
      setErrorMsg('Vui lòng tải lên tệp CV / Hồ sơ ứng tuyển (PDF, DOC, DOCX).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const body = new FormData();
      body.append('firstName', formData.firstName.trim());
      body.append('lastName', formData.lastName.trim());
      body.append(
        'fullName',
        `${formData.firstName.trim()} ${formData.lastName.trim()}`
      );
      body.append('email', formData.email.trim());
      body.append('phone', formData.phone.trim());
      if (jobId) {
        body.append('jobId', jobId);
      }
      body.append('jobTitle', positionTitle);
      if (formData.message.trim()) {
        body.append('coverLetter', formData.message.trim());
      }
      body.append('file', selectedFile);

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(
          result.error || 'Nộp hồ sơ thất bại. Vui lòng thử lại sau.'
        );
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMsg(
        err?.message || 'Có lỗi xảy ra trong quá trình nộp hồ sơ. Vui lòng thử lại.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl bg-white border border-emerald-200/80 p-6 sm:p-8 text-center shadow-xs">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Ứng tuyển thành công!
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm mx-auto">
          Cảm ơn bạn đã nộp hồ sơ cho vị trí{' '}
          <span className="font-semibold text-slate-900">{positionTitle}</span>.
          Đội ngũ tuyển dụng sẽ xem xét hồ sơ và liên hệ với bạn trong vòng 2-3 ngày làm việc.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              message: '',
            });
            setSelectedFile(null);
          }}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition"
        >
          Nộp hồ sơ khác
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 leading-snug">
          Ứng tuyển vị trí này
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Gửi thông tin và đính kèm CV của bạn để gia nhập đội ngũ The Human Inc
        </p>
      </div>

      {errorMsg && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-red-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Họ (First Name) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="VD: Alex"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition text-xs sm:text-sm text-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tên (Last Name) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="VD: Nguyễn"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition text-xs sm:text-sm text-slate-900 bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Địa chỉ Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="alex.nguyen@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition text-xs sm:text-sm text-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+84 90 123 4567"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition text-xs sm:text-sm text-slate-900 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Tải lên CV / Resume <span className="text-red-500">*</span>
            <span className="text-slate-400 font-normal ml-1">
              (PDF, DOC, DOCX tối đa 15MB)
            </span>
          </label>
          <div className="relative border-2 border-dashed border-slate-200 hover:border-slate-400 rounded-2xl p-4 text-center transition cursor-pointer bg-white">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center pointer-events-none">
              <Upload className="w-5 h-5 text-slate-400 mb-1.5" />
              <p className="text-xs font-semibold text-slate-800">
                {selectedFile
                  ? selectedFile.name
                  : 'Bấm hoặc kéo thả tệp CV vào đây'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {selectedFile
                  ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                  : 'Hỗ trợ định dạng PDF, DOCX'}
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Thư giới thiệu / Lời nhắn (Cover Letter)
          </label>
          <textarea
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Giới thiệu ngắn gọn về kinh nghiệm, thế mạnh hoặc lý do bạn muốn ứng tuyển..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition text-xs sm:text-sm text-slate-900 bg-white resize-y font-normal"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-medium text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Đang gửi hồ sơ...</span>
            </>
          ) : (
            <>
              <span>Nộp hồ sơ ứng tuyển</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
