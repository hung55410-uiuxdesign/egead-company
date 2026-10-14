"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useSubmitContactInquiry } from "@/lib/hooks";

type Props = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  articleTitle?: string;
};

export default function ArticleLeadForm({
  title = "Leave Us Your Information, and We'll Be in Touch.",
  subtitle = "Get in touch with E-GEAD specialists to discuss operations, automation, and scaling your business.",
  buttonText = "Submit Inquiry",
  articleTitle,
}: Props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const {
    submit: submitInquiry,
    isLoading,
    error,
    reset: resetMutation,
  } = useSubmitContactInquiry({
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      return;
    }

    const inquiryMessage = formData.message.trim()
      ? `${formData.message.trim()}\n\n[Nguồn gửi: Bài viết "${articleTitle || 'Chi tiết bài viết'}"]`
      : `Yêu cầu liên hệ / tư vấn từ bài viết: "${articleTitle || 'Chi tiết bài viết'}"`;

    submitInquiry({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      phone: formData.phone.trim() || undefined,
      region: "Vietnam",
      message: inquiryMessage,
    });
  };

  const errorMessage = error ? (error as Error).message : null;

  if (submitted) {
    return (
      <div className="w-full bg-[#FAFAFA] border border-gray-200/90 rounded-[20px] p-8 text-center shadow-sm">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h4 className="text-2xl font-bold text-slate-900 font-montserrat mb-2">
          Thank You for Reaching Out!
        </h4>
        <p className="text-sm text-slate-600 font-montserrat mb-6 leading-relaxed">
          We have received your message. One of our specialists will review your inquiry and get back to you shortly at{" "}
          <span className="font-semibold text-slate-900">{formData.email}</span>.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            resetMutation();
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              company: "",
              phone: "",
              message: "",
            });
          }}
          className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors font-montserrat cursor-pointer"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-gray-200/90 rounded-[20px] p-6 sm:p-8 shadow-sm">
      <style>{`
        .contact-sidebar-field:-webkit-autofill,
        .contact-sidebar-field:-webkit-autofill:hover,
        .contact-sidebar-field:-webkit-autofill:focus,
        .contact-sidebar-field:-webkit-autofill:active {
          -webkit-text-fill-color: #020617 !important;
          font-weight: 600 !important;
          -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
          box-shadow: 0 0 0px 1000px #ffffff inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      <h3 className="text-xl sm:text-2xl font-semibold text-slate-950 font-montserrat mb-2 leading-snug tracking-normal">
        {title}
      </h3>
      {subtitle && (
        <p className="text-xs sm:text-sm text-slate-500 font-montserrat mb-6 leading-relaxed">
          {subtitle}
        </p>
      )}

      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-800 font-montserrat mb-1.5 uppercase tracking-wider">
              FIRST NAME<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter your First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="contact-sidebar-field w-full border border-gray-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 placeholder:text-gray-400 placeholder:font-normal outline-none transition font-montserrat bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-800 font-montserrat mb-1.5 uppercase tracking-wider">
              LAST NAME<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter your Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="contact-sidebar-field w-full border border-gray-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 placeholder:text-gray-400 placeholder:font-normal outline-none transition font-montserrat bg-white"
            />
          </div>
        </div>

        {/* Business Email */}
        <div>
          <label className="block text-[11px] font-bold text-slate-800 font-montserrat mb-1.5 uppercase tracking-wider">
            BUSINESS EMAIL<span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="Enter your Business Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="contact-sidebar-field w-full border border-gray-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 placeholder:text-gray-400 placeholder:font-normal outline-none transition font-montserrat bg-white"
          />
        </div>

        {/* Company & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-800 font-montserrat mb-1.5 uppercase tracking-wider">
              COMPANY
            </label>
            <input
              type="text"
              placeholder="Enter your Company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="contact-sidebar-field w-full border border-gray-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 placeholder:text-gray-400 placeholder:font-normal outline-none transition font-montserrat bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-800 font-montserrat mb-1.5 uppercase tracking-wider">
              PHONE
            </label>
            <input
              type="tel"
              placeholder="Enter your Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="contact-sidebar-field w-full border border-gray-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 placeholder:text-gray-400 placeholder:font-normal outline-none transition font-montserrat bg-white"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-[11px] font-bold text-slate-800 font-montserrat mb-1.5 uppercase tracking-wider">
            MESSAGE
          </label>
          <textarea
            rows={3}
            placeholder="Tell us about your inquiry or requirements..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="contact-sidebar-field w-full border border-gray-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 placeholder:text-gray-400 placeholder:font-normal outline-none transition font-montserrat bg-white resize-none"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#10E774] hover:bg-[#0fd66b] active:bg-[#0bc260] text-black font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider font-montserrat transition-all shadow-sm hover:shadow cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Inquiry...</span>
              </>
            ) : (
              buttonText
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
