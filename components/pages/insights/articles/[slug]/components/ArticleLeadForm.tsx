"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type Props = {
  title?: string;
  buttonText?: string;
};

export default function ArticleLeadForm({
  title = "Sign up to watch on demand now!",
  buttonText = "Watch On Demand Now",
}: Props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="w-full bg-[#FAFAFA] border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#10E774]/20 text-[#10E774] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-xl font-semibold text-black font-montserrat mb-2">
          Thank you!
        </h4>
        <p className="text-sm text-gray-600 font-montserrat">
          Your access link has been sent to {formData.email}. Enjoy watching!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <h3 className="text-xl sm:text-2xl font-normal text-black font-montserrat mb-6">
        {title}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 font-montserrat mb-1.5">
            FIRST NAME<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter your First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="w-full border border-gray-300 focus:border-black rounded-lg px-4 py-2.5 text-xs text-black placeholder-gray-400 outline-none transition font-montserrat bg-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 font-montserrat mb-1.5">
            LAST NAME<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter your Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="w-full border border-gray-300 focus:border-black rounded-lg px-4 py-2.5 text-xs text-black placeholder-gray-400 outline-none transition font-montserrat bg-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 font-montserrat mb-1.5">
            BUSINESS EMAIL<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="Enter your Business Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border border-gray-300 focus:border-black rounded-lg px-4 py-2.5 text-xs text-black placeholder-gray-400 outline-none transition font-montserrat bg-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 font-montserrat mb-1.5">
            COMPANY<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your Company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className="w-full border border-gray-300 focus:border-black rounded-lg px-4 py-2.5 text-xs text-black placeholder-gray-400 outline-none transition font-montserrat bg-white"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#10E774] hover:bg-[#0fd66b] text-black font-bold py-3 px-6 rounded-full text-xs uppercase tracking-wider font-montserrat transition shadow-sm hover:shadow cursor-pointer"
          >
            {loading ? "Processing..." : buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}
