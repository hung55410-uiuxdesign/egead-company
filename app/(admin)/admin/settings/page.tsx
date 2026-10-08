import React from 'react';
import { Card, Badge } from '@astryxdesign/core';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 font-open-sans w-full pb-8">
      {/* Header */}
      <div>
        <div className="mb-1.5">
          <Badge label="Hệ thống CMS trực tuyến · Light Mode" variant="success" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Cài đặt hệ thống Blog CMS
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Cấu hình cơ chế lưu trữ dữ liệu, hiển thị bài viết và thông số SEO mặc định
        </p>
      </div>

      <div className="space-y-5">
        {/* Storage Provider */}
        <Card variant="default" className="rounded-2xl p-6 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Nguồn lưu trữ dữ liệu (Data Source)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Hiện tại: Local JSON Flat-File Storage &amp; Prisma Adapter
              </p>
            </div>

            <Badge label="Đang kết nối" variant="success" />
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p className="font-medium">
              Dữ liệu bài viết blog được lưu trữ an toàn trong tệp cấu trúc JSON nội bộ{' '}
              <code className="text-emerald-800 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                data/blogs.json
              </code>
              . Toàn bộ logic tương tác đã được chuẩn hóa qua module abstraction{' '}
              <code className="text-emerald-800 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                lib/blogs.ts
              </code>
              .
            </p>
            <p className="text-slate-500">
              Hệ thống đã sẵn sàng kết nối sang cơ sở dữ liệu PostgreSQL cục bộ hoặc Supabase / Cloud SQL thông qua Prisma ORM khi khối lượng dữ liệu phát triển lớn.
            </p>
          </div>
        </Card>

        {/* Cloudinary CDN Media */}
        <Card variant="default" className="rounded-2xl p-6 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Dịch vụ đám mây CDN &amp; Hình ảnh
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Cloudinary Cloud Engine (Tối ưu hóa ảnh bìa &amp; nội dung TipTap)
              </p>
            </div>

            <Badge label="CDN Active" variant="info" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-slate-500 block mb-1 font-medium">Cloud Name:</span>
              <code className="text-slate-900 font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                dg63osquc
              </code>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-slate-500 block mb-1 font-medium">Thư mục Upload bài viết:</span>
              <code className="text-slate-900 font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                egead_cms/covers &amp; inline
              </code>
            </div>
          </div>
        </Card>

        {/* SEO Defaults */}
        <Card variant="default" className="rounded-2xl p-6 hover:border-slate-300 transition-colors">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900">
              Cấu hình SEO mặc định
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tự động gắn thẻ OpenGraph, Twitter Card và Schema.org khi xuất bản
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-slate-500 block mb-1 font-medium">Prefix URL bài viết:</span>
              <span className="text-slate-900 font-mono font-semibold">
                https://egeadcompany.com/articles/[slug]
              </span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-slate-500 block mb-1 font-medium">Đơn vị xuất bản mặc định:</span>
              <span className="text-slate-900 font-semibold">
                E-GEAD Company Global Research
              </span>
            </div>
          </div>
        </Card>

        {/* Security & Access */}
        <Card variant="default" className="rounded-2xl p-6 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Bảo mật &amp; Xác thực phiên làm việc
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Better Auth Framework với Cookie Session an toàn
              </p>
            </div>

            <Badge label="Được bảo vệ" variant="purple" />
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p className="font-medium">
              Toàn bộ khu vực <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">/admin/*</code> được bảo vệ bởi middleware xác thực Better Auth. Mọi thao tác biên tập và tạo mới bài viết đều được mã hóa và xác thực chữ ký phiên làm việc.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
