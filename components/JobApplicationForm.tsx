'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface JobApplicationFormProps {
  positionTitle: string;
  jobId?: string;
}

export default function JobApplicationForm({ positionTitle, jobId }: JobApplicationFormProps) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg('File size must be under 15MB.');
        return;
      }
      setSelectedFile(file);
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please complete all required fields (*).');
      return;
    }

    if (!selectedFile) {
      setErrorMsg('Please upload your CV / Resume (PDF, DOC, DOCX).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const body = new FormData();
      body.append('firstName', formData.firstName.trim());
      body.append('lastName', formData.lastName.trim());
      body.append('fullName', `${formData.firstName.trim()} ${formData.lastName.trim()}`);
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
        throw new Error(result.error || 'Failed to submit application. Please try again.');
      }

      setIsSubmitted(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-3xl bg-[#F0FDF4] border border-[#10E774]/30 p-8 text-center sm:p-10">
        <div className="w-16 h-16 rounded-full bg-[#10E774]/20 flex items-center justify-center mx-auto mb-4 text-[#007A3D]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-montserrat">
          Application Received!
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6 font-montserrat max-w-md mx-auto">
          Thank you for applying for the <span className="font-semibold text-gray-900">{positionTitle}</span> role. Our People &amp; Culture team will review your profile and reach out within 2-3 business days.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
            setSelectedFile(null);
          }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#10E774] hover:bg-[#0ecb66] text-black font-semibold text-xs tracking-wider uppercase transition shadow-md"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-2xl sm:text-[26px] font-bold text-[#003D5B] mb-8 font-montserrat leading-snug">
        You will love to work with us. <br className="hidden sm:inline" />
        Please apply below:
      </p>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 font-montserrat">
              First Name <span className="text-[#10E774]">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="e.g. Alex"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#10E774] focus:ring-2 focus:ring-[#10E774]/20 outline-none transition text-sm text-gray-900 bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 font-montserrat">
              Last Name <span className="text-[#10E774]">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="e.g. Nguyen"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#10E774] focus:ring-2 focus:ring-[#10E774]/20 outline-none transition text-sm text-gray-900 bg-gray-50/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 font-montserrat">
              Email Address <span className="text-[#10E774]">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="alex.nguyen@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#10E774] focus:ring-2 focus:ring-[#10E774]/20 outline-none transition text-sm text-gray-900 bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 font-montserrat">
              Phone Number <span className="text-[#10E774]">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+84 90 123 4567"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#10E774] focus:ring-2 focus:ring-[#10E774]/20 outline-none transition text-sm text-gray-900 bg-gray-50/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 font-montserrat">
            Upload CV / Resume <span className="text-gray-400 font-normal">(PDF, DOC, DOCX up to 10MB)</span>
          </label>
          <div className="relative border-2 border-dashed border-gray-200 hover:border-[#10E774] rounded-2xl p-5 text-center transition cursor-pointer bg-gray-50/40">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center pointer-events-none">
              <Upload className="w-6 h-6 text-gray-400 mb-2" />
              <p className="text-xs font-semibold text-gray-800">
                {selectedFile ? selectedFile.name : 'Click or drag file to this area to upload'}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : 'Support single upload'}
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 font-montserrat">
            Cover Letter / Message
          </label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your background, relevant projects, or why you want to join E-GEAD..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#10E774] focus:ring-2 focus:ring-[#10E774]/20 outline-none transition text-sm text-gray-900 bg-gray-50/50 resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-full bg-[#10E774] hover:bg-[#0ecb66] disabled:opacity-50 text-black font-semibold text-sm tracking-wider uppercase transition shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting Application...</span>
            </>
          ) : (
            <>
              <span>Apply Now</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
