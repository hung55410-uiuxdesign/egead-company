"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  AlertCircle,
  X,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import { BlogPost, BlogCategory, PostStatus } from "@/types/blog";
import {
  Button,
  Badge,
  Card,
  EmptyState,
  Selector,
  DropdownMenu,
  Pagination,
} from "@astryxdesign/core";

interface BlogListClientProps {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogListClient({
  initialPosts,
  categories,
}: BlogListClientProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Selection & Bulk Actions State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<PostStatus | "">("");
  const [bulkCategory, setBulkCategory] = useState<string>("");
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when search or filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, categoryFilter]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.slug.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;

    const matchesCategory =
      categoryFilter === "all" ||
      post.tag === categoryFilter ||
      post.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalItems = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + pageSize);

  // Checkbox handlers
  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleToggleAll = () => {
    const visibleIds = paginatedPosts.map((p) => p.id);
    const allSelected =
      visibleIds.length > 0 &&
      visibleIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  // Bulk Delete Handler
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    const confirmed = confirm(
      `Bạn có chắc chắn muốn xóa ${selectedIds.length} bài viết đã chọn không? Thao tác này không thể hoàn tác.`,
    );
    if (!confirmed) return;

    setIsBulkLoading(true);
    try {
      const res = await fetch("/api/admin/blogs/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", ids: selectedIds }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Xóa hàng loạt thất bại");
      }

      setPosts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      setToastMessage(`Đã xóa thành công ${selectedIds.length} bài viết`);
      setSelectedIds([]);
      router.refresh();
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setIsBulkLoading(false);
    }
  };

  // Bulk Update Submit Handler
  const handleBulkUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) return;
    if (!bulkStatus && !bulkCategory) {
      alert("Vui lòng chọn trạng thái hoặc chuyên mục để cập nhật");
      return;
    }

    setIsBulkLoading(true);
    try {
      const res = await fetch("/api/admin/blogs/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          ids: selectedIds,
          data: {
            ...(bulkStatus ? { status: bulkStatus } : {}),
            ...(bulkCategory ? { category: bulkCategory } : {}),
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Cập nhật hàng loạt thất bại");
      }

      setPosts((prev) =>
        prev.map((p) => {
          if (selectedIds.includes(p.id)) {
            return {
              ...p,
              ...(bulkStatus ? { status: bulkStatus } : {}),
              ...(bulkCategory
                ? { category: bulkCategory, tag: bulkCategory }
                : {}),
            };
          }
          return p;
        }),
      );

      setToastMessage(`Đã cập nhật ${selectedIds.length} bài viết thành công`);
      setIsBulkEditOpen(false);
      setBulkStatus("");
      setBulkCategory("");
      setSelectedIds([]);
      router.refresh();
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setIsBulkLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xoá bài viết: "${title}"?`)) {
      return;
    }

    try {
      setIsDeleting(id);
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        router.refresh();
      } else {
        alert(data.error || "Có lỗi xảy ra khi xoá bài viết");
      }
    } catch {
      alert("Không thể kết nối đến máy chủ");
    } finally {
      setIsDeleting(null);
    }
  };

  const isAllSelected =
    paginatedPosts.length > 0 &&
    paginatedPosts.every((p) => selectedIds.includes(p.id));

  return (
    <div className="space-y-6 font-open-sans w-full pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between shadow-sm">
          <span>{toastMessage}</span>
          <Button
            label="Đóng"
            variant="ghost"
            onClick={() => setToastMessage(null)}
          />
        </div>
      )}
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Quản lý bài viết blog
            </h1>
            <Badge label={`${posts.length} bài`} variant="neutral" />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Toàn bộ danh sách các bài viết phân tích, cẩm nang chiến lược
            E-commerce và tin tức
          </p>
        </div>

        <Button
          label="Thêm bài viết mới"
          variant="primary"
          href="/admin/blogs/new"
        />
      </div>

      {/* =========================================================================
          FILTERS & SEARCH BAR (Astryx Card)
          ========================================================================= */}
      <Card variant="default" className="rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo tiêu đề bài viết, tóm tắt, slug..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200/50"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status filter */}
          <div className="md:col-span-3">
            <Selector
              label="Lọc theo trạng thái"
              className="h-10 border"
              isLabelHidden
              value={statusFilter}
              onChange={(val) =>
                setStatusFilter(val as "all" | "published" | "draft")
              }
              options={[
                { value: "all", label: "Tất cả trạng thái" },
                { value: "published", label: "Đã xuất bản (Published)" },
                { value: "draft", label: "Bản nháp (Draft)" },
              ]}
            />
          </div>

          {/* Category filter */}
          <div className="md:col-span-3">
            <Selector
              label="Lọc theo chuyên mục"
              isLabelHidden
              className="h-10 border"
              value={categoryFilter}
              onChange={(val) => setCategoryFilter(val)}
              options={[
                { value: "all", label: "Tất cả chuyên mục" },
                ...categories.map((cat) => ({
                  value: cat.name,
                  label: cat.name,
                })),
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 bg-emerald-50/90 border border-emerald-200/90 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <Badge
              label={`Đã chọn ${selectedIds.length} bài viết`}
              variant="success"
            />
            <span className="text-xs text-emerald-800 hidden sm:inline">
              Áp dụng thao tác đồng loạt trên các bài viết đã chọn
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              label="Chỉnh sửa hàng loạt"
              variant="secondary"
              size="sm"
              onClick={() => setIsBulkEditOpen(true)}
            />
            <Button
              label={
                isBulkLoading
                  ? "Đang xử lý..."
                  : `Xóa ${selectedIds.length} bài`
              }
              variant="ghost"
              size="sm"
              className="text-rose-600 hover:text-rose-700 hover:bg-rose-100/60"
              isDisabled={isBulkLoading}
              onClick={handleBulkDelete}
            />
            <Button
              label="Bỏ chọn"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedIds([])}
            />
          </div>
        </div>
      )}
      <Card variant="default" className="rounded-2xl overflow-hidden p-0">
        {filteredPosts.length === 0 ? (
          <div className="py-12 px-4">
            <EmptyState
              icon={<AlertCircle className="w-8 h-8 text-slate-400" />}
              title="Không tìm thấy bài viết nào"
              description="Không có bài viết nào khớp với từ khoá hoặc bộ lọc bạn chọn. Thử thay đổi bộ lọc hoặc thêm bài mới."
              actions={
                <Button
                  label="Tạo bài viết mới"
                  variant="primary"
                  href="/admin/blogs/new"
                />
              }
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/70 text-xs font-bold text-slate-500">
                  <th className="py-3.5 pl-4 sm:pl-6 pr-2 w-10">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleToggleAll}
                      className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer"
                      title="Chọn tất cả bài viết"
                    />
                  </th>
                  <th className="py-3.5 px-3">Bài viết</th>
                  <th className="py-3.5 px-4">Chuyên mục</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4">Lượt xem</th>
                  <th className="py-3.5 px-4">Ngày tạo</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedPosts.map((post) => {
                  const isChecked = selectedIds.includes(post.id);
                  return (
                    <tr
                      key={post.id}
                      className={`hover:bg-slate-50/70 transition-colors group ${
                        isChecked ? "bg-emerald-50/40" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 pl-4 sm:pl-6 pr-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleRow(post.id)}
                          className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer"
                        />
                      </td>

                      {/* Title, Thumbnail & Slug */}
                      <td className="py-4 px-3 max-w-md">
                        <div className="flex items-start gap-3">
                          {post.heroImage ? (
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0 hidden sm:block">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={post.heroImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 hidden sm:block">
                              <FileText className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <Link
                              href={`/admin/blogs/${post.id}`}
                              className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 text-sm"
                            >
                              {post.title}
                            </Link>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {post.excerpt || "Chưa có tóm tắt..."}
                            </p>
                            <span className="text-[11px] text-slate-400 font-mono block mt-0.5 truncate">
                              /articles/{post.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <Badge
                          label={post.tag || post.category || "General"}
                          variant="neutral"
                        />
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <Badge
                          label={
                            post.status === "published"
                              ? "Đã xuất bản"
                              : "Bản nháp"
                          }
                          variant={
                            post.status === "published" ? "success" : "warning"
                          }
                        />
                      </td>

                      {/* Views */}
                      <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                        <span>{(post.views || 0).toLocaleString()} lượt</span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500 font-medium">
                        <span>{post.date}</span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end">
                          <DropdownMenu
                            button={{
                              label: "Thao tác",
                              isIconOnly: true,
                              icon: <MoreHorizontal className="w-4 h-4" />,
                              size: "sm",
                              variant: "ghost",
                            }}
                            placement="below"
                            alignment="end"
                            items={[
                              {
                                label: "Chỉnh sửa bài viết",
                                onClick: () =>
                                  router.push(`/admin/blogs/${post.id}`),
                              },
                              {
                                label: "Xem trên website",
                                onClick: () =>
                                  window.open(`/articles/${post.slug}`, "_blank"),
                              },
                              {
                                label: "Xoá bài viết",
                                variant: "destructive",
                                isDisabled: isDeleting === post.id,
                                onClick: () =>
                                  handleDelete(post.id, post.title),
                              },
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalItems > 0 && (
            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
              <span className="text-xs text-slate-500 font-medium">
                Hiển thị {startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)} trong tổng số {totalItems} bài viết
              </span>
              <Pagination
                page={safeCurrentPage}
                onChange={(p) => setCurrentPage(p)}
                totalItems={totalItems}
                pageSize={pageSize}
                pageSizeOptions={[10, 20, 50]}
                onPageSizeChange={(newSize) => {
                  setPageSize(newSize);
                  setCurrentPage(1);
                }}
                variant="pages"
                size="sm"
              />
            </div>
          )}
        </>
      )}
      </Card>

      {/* Bulk Edit Modal */}
      {isBulkEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Chỉnh sửa hàng loạt bài viết
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Áp dụng cho {selectedIds.length} bài viết đã chọn
                </p>
              </div>
              <Button
                label="Đóng"
                variant="ghost"
                size="sm"
                onClick={() => setIsBulkEditOpen(false)}
              />
            </div>

            {/* Modal Body */}
            <form onSubmit={handleBulkUpdateSubmit} className="p-6 space-y-4">
              <div>
                <Selector
                  label="Trạng thái xuất bản mới"
                  description="Chọn trạng thái mới nếu muốn thay đổi đồng loạt"
                  value={bulkStatus || ""}
                  onChange={(val) => setBulkStatus(val as PostStatus | "")}
                  options={[
                    {
                      value: "",
                      label: "-- Giữ nguyên trạng thái hiện tại --",
                    },
                    { value: "published", label: "Đã xuất bản (published)" },
                    { value: "draft", label: "Bản nháp (draft)" },
                    { value: "archived", label: "Lưu trữ (archived)" },
                  ]}
                />
              </div>

              <div>
                <Selector
                  label="Chuyên mục mới"
                  description="Chọn chuyên mục mới nếu muốn thay đổi đồng loạt"
                  value={bulkCategory || ""}
                  onChange={(val) => setBulkCategory(val)}
                  options={[
                    {
                      value: "",
                      label: "-- Giữ nguyên chuyên mục hiện tại --",
                    },
                    ...categories.map((c) => ({
                      value: c.name,
                      label: c.name,
                    })),
                  ]}
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <Button
                  label="Hủy"
                  variant="ghost"
                  type="button"
                  onClick={() => setIsBulkEditOpen(false)}
                  isDisabled={isBulkLoading}
                />
                <Button
                  label={
                    isBulkLoading ? "Đang cập nhật..." : "Áp dụng cập nhật"
                  }
                  variant="primary"
                  type="submit"
                  isDisabled={isBulkLoading || (!bulkStatus && !bulkCategory)}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
