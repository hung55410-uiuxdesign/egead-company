"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import { Button, IconButton, Breadcrumbs, BreadcrumbItem } from "@astryxdesign/core";

interface AdminNavbarProps {
  onOpenSidebar: () => void;
}

export default function AdminNavbar({ onOpenSidebar }: AdminNavbarProps) {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const items: Array<{ label: string; href?: string }> = [
      { label: "Admin", href: pathname === "/admin" ? undefined : "/admin" },
    ];

    if (pathname === "/admin") {
      items.push({ label: "Tổng quan bảng điều khiển" });
      return items;
    }

    if (pathname === "/admin/blogs") {
      items.push({ label: "Quản lý bài viết" });
    } else if (pathname === "/admin/blogs/new") {
      items.push({ label: "Bài viết", href: "/admin/blogs" });
      items.push({ label: "Tạo bài viết mới" });
    } else if (pathname?.startsWith("/admin/blogs/")) {
      items.push({ label: "Bài viết", href: "/admin/blogs" });
      items.push({ label: "Chỉnh sửa bài viết" });
    } else if (pathname === "/admin/categories") {
      items.push({ label: "Chuyên mục & Phân loại" });
    } else if (pathname === "/admin/people") {
      items.push({ label: "Quản lý nhân sự" });
    } else if (pathname === "/admin/people/new") {
      items.push({ label: "Nhân sự", href: "/admin/people" });
      items.push({ label: "Thêm nhân sự mới" });
    } else if (pathname === "/admin/people/hierarchy") {
      items.push({ label: "Nhân sự", href: "/admin/people" });
      items.push({ label: "Sơ đồ tổ chức" });
    } else if (pathname?.startsWith("/admin/people/")) {
      items.push({ label: "Nhân sự", href: "/admin/people" });
      items.push({ label: "Chỉnh sửa nhân sự" });
    } else if (pathname === "/admin/careers") {
      items.push({ label: "Quản lý tuyển dụng" });
    } else if (pathname === "/admin/careers/new") {
      items.push({ label: "Tuyển dụng", href: "/admin/careers" });
      items.push({ label: "Đăng tin mới" });
    } else if (pathname === "/admin/careers/applications") {
      items.push({ label: "Tuyển dụng", href: "/admin/careers" });
      items.push({ label: "Hồ sơ ứng tuyển" });
    } else if (pathname === "/admin/careers/form-preview") {
      items.push({ label: "Tuyển dụng", href: "/admin/careers" });
      items.push({ label: "Biểu mẫu ứng tuyển" });
    } else if (pathname?.startsWith("/admin/careers/")) {
      items.push({ label: "Tuyển dụng", href: "/admin/careers" });
      items.push({ label: "Chỉnh sửa tin tuyển dụng" });
    } else if (pathname === "/admin/settings") {
      items.push({ label: "Cấu hình hệ thống" });
    } else {
      items.push({ label: "Admin Portal" });
    }

    return items;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-[6%] sm:px-[7%] xl:px-[8%] flex items-center justify-between sticky top-0 z-30 font-open-sans shrink-0">
      <div className="flex items-center gap-3">
        <div className="lg:hidden">
          <IconButton
            label="Mở menu điều hướng"
            icon={<Menu className="w-5 h-5" />}
            variant="ghost"
            onClick={onOpenSidebar}
          />
        </div>

        <Breadcrumbs label="Điều hướng quản trị">
          {breadcrumbs.map((crumb, idx) => (
            <BreadcrumbItem
              key={idx}
              href={crumb.href}
              as={crumb.href ? Link : undefined}
              isCurrent={idx === breadcrumbs.length - 1}
            >
              {crumb.label}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          label="Xem trang live"
          variant="secondary"
          href="/insights"
          target="_blank"
        />

        <div className="relative inline-flex items-center">
          <IconButton
            label="Thông báo hệ thống"
            icon={<Bell className="w-4 h-4" />}
            variant="ghost"
          />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white pointer-events-none" />
        </div>

        {pathname !== "/admin/blogs/new" && (
          <Button
            label="Viết bài mới"
            variant="primary"
            href="/admin/blogs/new"
          />
        )}
      </div>
    </header>
  );
}
