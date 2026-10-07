import React from 'react';
import { Shield, Globe, Database } from 'lucide-react';
import { Card } from '@astryxdesign/core/Card';
import { Badge } from '@astryxdesign/core/Badge';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 font-montserrat max-w-4xl mx-auto">
      <div>
        <div className="mb-2">
          <Badge variant="blue" label="Astryx Design System · Light Theme" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Cài đặt hệ thống Blog CMS
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Cấu hình cơ chế lưu trữ dữ liệu, hiển thị bài viết và thông số SEO mặc định
        </p>
      </div>

      <div className="space-y-6">
        {/* Storage Provider - Astryx Card */}
        <Card variant="default" padding={6} className="bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Nguồn lưu trữ dữ liệu (Data Source)</h3>
              <p className="text-xs text-slate-500">Hiện tại: Local JSON Flat-File Storage (`data/blogs.json`)</p>
            </div>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200 font-medium">
            Dữ liệu bài viết blog được lưu trữ an toàn trong tệp cấu trúc JSON nội bộ <code className="text-emerald-700 font-mono bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">data/blogs.json</code>. Hệ thống đã được thiết kế sẵn interface <code className="text-emerald-700 font-mono bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">lib/blogs.ts</code> để kết nối sang bất kỳ cơ sở dữ liệu nào (PostgreSQL, MongoDB, Supabase, Strapi) khi bạn cần mở rộng.
          </p>
        </Card>

        {/* SEO Defaults - Astryx Card */}
        <Card variant="default" padding={6} className="space-y-4 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Cấu hình SEO mặc định</h3>
              <p className="text-xs text-slate-500">Tự động gắn thẻ OpenGraph và Schema.org khi xuất bản</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block mb-1 font-medium">Prefix URL bài viết:</span>
              <span className="text-slate-900 font-mono font-semibold">https://egeadcompany.com/articles/[slug]</span>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block mb-1 font-medium">Đơn vị xuất bản mặc định:</span>
              <span className="text-slate-900 font-semibold">E-GEAD Company Global Research</span>
            </div>
          </div>
        </Card>

        {/* Security & Access - Astryx Card */}
        <Card variant="default" padding={6} className="bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Bảo mật &amp; Quyền truy cập</h3>
              <p className="text-xs text-slate-500">Route /admin hiện đang ở chế độ Development</p>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Sẵn sàng để tích hợp Middleware kiểm tra phiên đăng nhập (JWT, NextAuth, hoặc Better Auth) bất cứ lúc nào.
          </p>
        </Card>
      </div>
    </div>
  );
}
