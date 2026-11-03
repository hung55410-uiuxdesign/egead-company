'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, Mail, AlertCircle } from 'lucide-react';
import { useSubmitContactInquiry } from '@/lib/hooks';

const REGIONS = [
  'Singapore',
  'Japan',
  'Australia',
  'Hong Kong',
  'Vietnam',
  'South Korea',
  'India',
  'United States / Americas',
  'Europe / Global',
  'Other',
];

interface ContactFormSectionProps {
  primaryEmail?: string;
}

export default function ContactFormSection({
  primaryEmail = 'contact@egeadcompany.com',
}: ContactFormSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    region: '',
    message: '',
  });

  const {
    submit: submitInquiry,
    isLoading: isSubmitting,
    error,
    reset: resetMutation,
  } = useSubmitContactInquiry({
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry(formData);
  };

  const errorMessage = error ? (error as Error).message : null;

  return (
    <section className="relative w-full bg-white text-slate-900 py-16 sm:py-24 lg:py-28 overflow-hidden">
      {/* Global override for autofill to ensure typed/autofilled text stays bold and deep black */}
      <style>{`
        .contact-form-field:-webkit-autofill,
        .contact-form-field:-webkit-autofill:hover,
        .contact-form-field:-webkit-autofill:focus,
        .contact-form-field:-webkit-autofill:active {
          -webkit-text-fill-color: #020617 !important;
          font-weight: 600 !important;
          -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
          box-shadow: 0 0 0px 1000px #ffffff inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Title Column */}
          <div className="lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#0A1C2A] font-montserrat leading-snug sticky top-32"
            >
              Leave Us Your Information, <br className="hidden sm:inline" />
              and We&apos;ll Be in Touch.
            </motion.h2>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-12 rounded-2xl bg-slate-50 border border-slate-200 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-montserrat mb-2">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed font-montserrat">
                  We have received your message. One of our regional directors will review your inquiry and get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    resetMutation();
                    setFormData({
                      firstName: '',
                      lastName: '',
                      company: '',
                      email: '',
                      phone: '',
                      region: '',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Row 1: First Name, Last Name, Company */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-2 font-montserrat">
                      First Name<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your First Name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="contact-form-field w-full bg-white border border-slate-300 rounded-lg px-3.5 py-3 text-sm sm:text-base font-semibold text-slate-950 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-2 font-montserrat">
                      Last Name<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your Last Name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="contact-form-field w-full bg-white border border-slate-300 rounded-lg px-3.5 py-3 text-sm sm:text-base font-semibold text-slate-950 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-2 font-montserrat">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Company (Optional)"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="contact-form-field w-full bg-white border border-slate-300 rounded-lg px-3.5 py-3 text-sm sm:text-base font-semibold text-slate-950 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Email, Phone, Region */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-2 font-montserrat">
                      Email<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="contact-form-field w-full bg-white border border-slate-300 rounded-lg px-3.5 py-3 text-sm sm:text-base font-semibold text-slate-950 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-2 font-montserrat">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="contact-form-field w-full bg-white border border-slate-300 rounded-lg px-3.5 py-3 text-sm sm:text-base font-semibold text-slate-950 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-2 font-montserrat">
                      Region
                    </label>
                    <div className="relative">
                      <select
                        value={formData.region}
                        onChange={(e) =>
                          setFormData({ ...formData, region: e.target.value })
                        }
                        className="contact-form-field w-full appearance-none bg-white border border-slate-300 rounded-lg px-3.5 py-3 pr-9 text-sm sm:text-base font-semibold text-slate-950 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors cursor-pointer"
                      >
                        <option value="" className="text-slate-400 font-normal">
                          Select a Region (Optional)
                        </option>
                        {REGIONS.map((r) => (
                          <option key={r} value={r} className="text-slate-950 font-semibold">
                            {r}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-2 font-montserrat">
                    Message<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Enter a Message..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="contact-form-field w-full bg-white border border-slate-300 rounded-lg p-3.5 text-sm sm:text-base font-semibold text-slate-950 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                  />
                </div>

                {/* Privacy note */}
                <p className="text-sm text-gray-800 font-light leading-relaxed font-montserrat">
                  This site is protected by reCAPTCHA and the{' '}
                  <a
                    href="https://policies.google.com/privacy?hl=en"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-slate-700 hover:text-black"
                  >
                    Google Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://policies.google.com/terms?hl=en"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-slate-700 hover:text-black"
                  >
                    Terms of Service
                  </a>{' '}
                  apply.
                </p>

                {/* Submit Pill Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-2.5 bg-black hover:bg-slate-800 text-white font-medium text-sm px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                    </svg>
                    <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Direct Email block */}
            <div className="mt-16 pt-10 border-t border-slate-200">
              <span className="block text-xs font-medium text-slate-500 mb-2 font-montserrat">
                Or email us at
              </span>
              <a
                href={`mailto:${primaryEmail}`}
                className="inline-flex items-center gap-3 text-lg sm:text-2xl font-bold text-slate-900 hover:text-emerald-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>{primaryEmail}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
