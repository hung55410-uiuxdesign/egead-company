"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase, ArrowUpRight, Filter } from "lucide-react";
import { Pagination } from "@astryxdesign/core";
import type { JobOpening } from "@/lib/careers";

type Props = {
  jobs: JobOpening[];
};

export default function CareerJobsList({ jobs }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedLoc, setSelectedLoc] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const departments = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => set.add(j.department));
    return ["All", ...Array.from(set)];
  }, [jobs]);

  const locations = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => set.add(j.locationCountry));
    return ["All", ...Array.from(set)];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchesSearch =
        j.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept =
        selectedDept === "All" || j.department === selectedDept;
      const matchesLoc =
        selectedLoc === "All" || j.locationCountry === selectedLoc;
      return matchesSearch && matchesDept && matchesLoc;
    });
  }, [jobs, searchQuery, selectedDept, selectedLoc]);

  const totalItems = filteredJobs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedJobs = useMemo(() => {
    return filteredJobs.slice(startIndex, startIndex + pageSize);
  }, [filteredJobs, startIndex, pageSize]);

  return (
    <div
      id="job"
      className="w-full bg-white text-black rounded-[32px] sm:rounded-[48px] shadow-2xl p-8 sm:p-14 lg:p-18 border border-gray-100"
    >
      {/* Header */}
      <div className="mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#003D5B] font-montserrat leading-tight mb-4">
          Jobs Opening
        </h2>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-montserrat max-w-3xl">
          Are you driven by passion? Do you think you would thrive in an
          environment dedicated to building the future of e-commerce? Bring
          forward your authentic self and shine with our sustainable team.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-12 space-y-6">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search open positions by role, skill, or keyword..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-[#10E774] focus:ring-2 focus:ring-[#10E774]/20 outline-none text-sm sm:text-base text-gray-900 bg-gray-50/60 transition"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {/* Department Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1 flex items-center gap-1 font-montserrat">
              <Filter className="w-3.5 h-3.5" /> Department:
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => {
                  setSelectedDept(dept);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  selectedDept === dept
                    ? "bg-[#003D5B] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <span className="text-xs font-medium text-gray-500 font-montserrat shrink-0">
            Showing <strong className="text-black">{filteredJobs.length}</strong>{" "}
            {filteredJobs.length === 1 ? "position" : "positions"}
          </span>
        </div>
      </div>

      {/* Jobs List */}
      <div className="border-t border-gray-200">
        {filteredJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <Link
              key={job.slug}
              href={`/careers/${job.slug}`}
              className="group block py-7 sm:py-8 border-b border-gray-200 hover:border-[#003D5B] transition duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                <div className="md:w-1/2">
                  <span className="inline-block text-xs font-semibold text-[#007A3D] uppercase tracking-wider mb-1.5 font-montserrat">
                    {job.department}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#003D5B] group-hover:text-[#007A3D] transition-colors font-montserrat leading-snug">
                    {job.position}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-light mt-1 line-clamp-1">
                    {job.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 sm:gap-10 md:justify-end md:w-1/2">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 font-montserrat">
                    <MapPin className="w-4 h-4 text-gray-400 group-hover:text-[#10E774] transition" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 font-montserrat">
                    <Briefcase className="w-4 h-4 text-gray-400 group-hover:text-[#10E774] transition" />
                    <span>{job.jobType}</span>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[#10E774] flex items-center justify-center transition duration-300 shrink-0 text-black">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-500 text-base font-montserrat mb-4">
              No open positions found matching your criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedDept("All");
                setSelectedLoc("All");
                setCurrentPage(1);
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-semibold uppercase tracking-wider text-black transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {totalItems > pageSize && (
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-500 font-montserrat">
            Showing {startIndex + 1}–
            {Math.min(startIndex + pageSize, totalItems)} of {totalItems}{" "}
            positions
          </span>
          <Pagination
            page={safeCurrentPage}
            onChange={(p) => {
              setCurrentPage(p);
              const el = document.getElementById("job");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            totalItems={totalItems}
            pageSize={pageSize}
            size="sm"
            variant="pages"
          />
        </div>
      )}
    </div>
  );
}
