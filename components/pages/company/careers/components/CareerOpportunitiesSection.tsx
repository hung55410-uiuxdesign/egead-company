'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, RotateCcw, ChevronDown, ArrowUpRight } from 'lucide-react';
import type { JobOpening } from '@/lib/careers';
import { useLocalizeHref } from '@/components/providers/LocaleProvider';

interface CareerOpportunitiesSectionProps {
  jobs?: JobOpening[];
}

// Helper: Phân tích và so khớp khoảng lương linh hoạt (hỗ trợ cả USD lẫn Triệu VND hoặc Thỏa thuận)
function matchSalaryRange(salaryStr?: string, filter?: string): boolean {
  if (!filter || filter === 'all') return true;
  if (!salaryStr) return false;

  const s = salaryStr.toLowerCase().trim();

  if (filter === 'negotiable') {
    return (
      s.includes('thỏa thuận') ||
      s.includes('thoa thuan') ||
      s.includes('negotiable') ||
      s.includes('cạnh tranh') ||
      s.includes('competitive')
    );
  }

  const isUSD = s.includes('usd') || s.includes('$');
  const cleanMatches = s.match(/\d+[\d,.]*/g) || [];
  const numbers: number[] = [];

  for (const m of cleanMatches) {
    const raw = m.replace(/,/g, '');
    const num = parseFloat(raw);
    if (!isNaN(num) && num > 0) {
      numbers.push(num);
    }
  }

  if (numbers.length === 0) return false;

  // Quy đổi về đơn vị tương đương Triệu VND (1,000 USD ~ 25.4 Triệu VND)
  const numbersInMillionVND = numbers.map((n) => {
    if (isUSD) {
      return (n * 25.4) / 1000;
    }
    if (n >= 1000000) {
      return n / 1000000;
    }
    return n;
  });

  const min = Math.min(...numbersInMillionVND);
  const max = Math.max(...numbersInMillionVND);

  switch (filter) {
    case 'under-15':
      return min < 15;
    case '15-25':
      return min <= 25 && max >= 15;
    case '25-40':
      return min <= 40 && max >= 24;
    case 'over-40':
      return max >= 38;
    default:
      return true;
  }
}

// Helper: So khớp loại hình làm việc
function matchJobType(jobType?: string, filterType?: string): boolean {
  if (!filterType || filterType === 'all') return true;
  if (!jobType) return false;
  const jt = jobType.toLowerCase();
  const ft = filterType.toLowerCase();

  if (ft === 'full-time') return jt.includes('full') || jt.includes('toàn thời gian');
  if (ft === 'part-time') return jt.includes('part') || jt.includes('bán thời gian');
  if (ft === 'contract') return jt.includes('contract') || jt.includes('hợp đồng');
  if (ft === 'internship') return jt.includes('intern') || jt.includes('thực tập');
  if (ft === 'remote') return jt.includes('remote') || jt.includes('từ xa');

  return jt.includes(ft);
}

// Helper: So khớp địa điểm làm việc
function matchLocation(jobLocation?: string, filterLoc?: string): boolean {
  if (!filterLoc || filterLoc === 'all') return true;
  if (!jobLocation) return false;
  const jl = jobLocation.toLowerCase();
  const fl = filterLoc.toLowerCase();
  return jl.includes(fl) || fl.includes(jl);
}

// Helper: So khớp phòng ban
function matchDepartment(jobDept?: string, filterDept?: string): boolean {
  if (!filterDept || filterDept === 'all') return true;
  if (!jobDept) return false;
  return jobDept.trim().toLowerCase() === filterDept.trim().toLowerCase();
}

export default function CareerOpportunitiesSection({
  jobs = [],
}: CareerOpportunitiesSectionProps) {
  const lh = useLocalizeHref();
  // Bộ lọc states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSalary, setSelectedSalary] = useState('all');

  // Danh sách phòng ban duy nhất từ dữ liệu jobs kết hợp danh mục chuẩn
  const departmentOptions = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((job) => {
      if (job.department && job.department.trim()) {
        set.add(job.department.trim());
      }
    });

    const defaultDepts = [
      'Engineering & Technology',
      'Growth & Marketing',
      'Logistics & Supply Chain',
      'E-Commerce Operations',
      'HR & Administration',
    ];
    defaultDepts.forEach((d) => set.add(d));

    return Array.from(set);
  }, [jobs]);

  // Danh sách địa điểm duy nhất từ dữ liệu jobs
  const locationOptions = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((job) => {
      if (job.location && job.location.trim()) {
        set.add(job.location.trim());
      }
    });
    return Array.from(set);
  }, [jobs]);

  // Danh sách các loại hình làm việc chuẩn
  const jobTypeOptions = [
    { value: 'all', label: 'All Employment Types' },
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Remote', label: 'Remote' },
  ];

  // Danh sách các khoảng lương
  const salaryOptions = [
    { value: 'all', label: 'All Salaries' },
    { value: 'under-15', label: 'Under $600 USD (< 15M VND)' },
    { value: '15-25', label: '$600 - $1,000 USD (15 - 25M VND)' },
    { value: '25-40', label: '$1,000 - $1,600 USD (25 - 40M VND)' },
    { value: 'over-40', label: 'Over $1,600 USD (> 40M VND)' },
    { value: 'negotiable', label: 'Negotiable / Competitive' },
  ];

  // Kiểm tra có filter nào đang áp dụng
  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedDepartment !== 'all' ||
    selectedType !== 'all' ||
    selectedLocation !== 'all' ||
    selectedSalary !== 'all';

  // Hàm đặt lại toàn bộ filter
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('all');
    setSelectedType('all');
    setSelectedLocation('all');
    setSelectedSalary('all');
  };

  // Lọc danh sách jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Tìm kiếm từ khóa
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesPosition = job.position?.toLowerCase().includes(q);
        const matchesDept = job.department?.toLowerCase().includes(q);
        const matchesLoc = job.location?.toLowerCase().includes(q);
        const matchesExcerpt = job.excerpt?.toLowerCase().includes(q);
        if (!matchesPosition && !matchesDept && !matchesLoc && !matchesExcerpt) {
          return false;
        }
      }

      // Lọc theo Phòng ban
      if (!matchDepartment(job.department, selectedDepartment)) {
        return false;
      }

      // Lọc theo Loại hình làm việc
      if (!matchJobType(job.jobType, selectedType)) {
        return false;
      }

      // Lọc theo Địa điểm
      if (!matchLocation(job.location, selectedLocation)) {
        return false;
      }

      // Lọc theo Mức lương
      if (!matchSalaryRange(job.salary, selectedSalary)) {
        return false;
      }

      return true;
    });
  }, [
    jobs,
    searchQuery,
    selectedDepartment,
    selectedType,
    selectedLocation,
    selectedSalary,
  ]);

  return (
    <section className="w-full py-16 sm:py-24" id="opportunities">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-slate-900 tracking-normal mb-3">
            Career Opportunities
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal">
            Discover open roles and join our team in architecting next-generation cross-border commerce infrastructure at E-GEAD.
          </p>
        </motion.div>

        {/* Khối Bộ lọc Tìm kiếm (Filter & Search Panel) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5 sm:p-7 mb-8 sm:mb-10"
        >
          {/* Hàng 1: Ô tìm kiếm từ khóa và Tóm tắt trạng thái */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            {/* Input tìm kiếm nhanh */}
            <div className="relative flex-1">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search open positions by role, skill, or keyword..."
                className="w-full pl-11 pr-10 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Thông tin số lượng kết quả & Nút đặt lại */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <span className="text-xs sm:text-sm font-medium text-slate-600">
                {filteredJobs.length} open position{filteredJobs.length === 1 ? '' : 's'}
              </span>

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Hàng 2: 4 Trường Bộ lọc tương ứng với form tuyển dụng (English) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
            {/* 1. Bộ lọc Department */}
            <div>
              <label
                htmlFor="filter-department"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Department
              </label>
              <div className="relative">
                <select
                  id="filter-department"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-3.5 py-2.5 pr-9 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition cursor-pointer"
                >
                  <option value="all">All Departments</option>
                  {departmentOptions.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* 2. Bộ lọc Employment Type */}
            <div>
              <label
                htmlFor="filter-job-type"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Employment Type
              </label>
              <div className="relative">
                <select
                  id="filter-job-type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-3.5 py-2.5 pr-9 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition cursor-pointer"
                >
                  {jobTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* 3. Bộ lọc Location */}
            <div>
              <label
                htmlFor="filter-location"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Location
              </label>
              <div className="relative">
                <select
                  id="filter-location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-3.5 py-2.5 pr-9 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition cursor-pointer"
                >
                  <option value="all">All Locations</option>
                  {locationOptions.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* 4. Bộ lọc Expected Salary */}
            <div>
              <label
                htmlFor="filter-salary"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Expected Salary
              </label>
              <div className="relative">
                <select
                  id="filter-salary"
                  value={selectedSalary}
                  onChange={(e) => setSelectedSalary(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-3.5 py-2.5 pr-9 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition cursor-pointer"
                >
                  {salaryOptions.map((sOpt) => (
                    <option key={sOpt.value} value={sOpt.value}>
                      {sOpt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Danh sách công việc hoặc Trạng thái rỗng */}
        {filteredJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-14 px-6 rounded-2xl sm:rounded-3xl bg-slate-50/80 border border-slate-100 max-w-xl mx-auto space-y-4"
          >
            <p className="text-base font-semibold text-slate-900">
              No open positions found
            </p>
            <p className="text-sm text-slate-500 font-normal leading-relaxed">
              {isFiltered
                ? 'No career opportunities matched your current filter criteria. Try adjusting or resetting filters to explore all openings.'
                : 'There are currently no new positions open. Please check back later or get in touch with our recruitment team via email.'}
            </p>
            {isFiltered && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-medium transition shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset all filters
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job, idx) => (
                <motion.div
                  key={job.id || job.slug || idx}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.2) }}
                >
                  <Link
                    href={lh(`/careers/${job.slug}`)}
                    className="group w-full bg-white rounded-2xl sm:rounded-[20px] p-5 sm:p-6 border border-slate-200/70 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_26px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-200 flex flex-col justify-between gap-4 block"
                  >
                    {/* Phần tiêu đề và nút Apply */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-[17px] font-semibold text-slate-900 group-hover:text-slate-800 transition">
                          {job.position}
                        </h3>
                        {job.excerpt && (
                          <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                            {job.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-500 group-hover:text-slate-900 underline underline-offset-4 decoration-slate-300 group-hover:decoration-slate-900 transition pt-0.5">
                        <span>Apply now</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-200" />
                      </div>
                    </div>

                    {/* Dãy Badges thông tin 4 trường tương ứng */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100/80">
                      {/* Phòng ban */}
                      {job.department && (
                        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                          {job.department}
                        </span>
                      )}

                      {/* Loại hình làm việc */}
                      {job.jobType && (
                        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100/60">
                          {job.jobType}
                        </span>
                      )}

                      {/* Địa điểm làm việc */}
                      {job.location && (
                        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100/60">
                          {job.location}
                        </span>
                      )}

                      {/* Mức lương dự kiến */}
                      {job.salary && (
                        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/60">
                          {job.salary}
                        </span>
                      )}

                      {/* Kinh nghiệm (nếu có) */}
                      {job.experience && (
                        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200/60">
                          {job.experience}
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

