"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  Button,
  Badge,
  EmptyState,
  Field,
  Pagination,
  CheckboxInput,
  TextInput,
  TextArea,
} from "@astryxdesign/core";
import { CategoryItem, generateSlug } from "@/types/category";
import { BlogPost } from "@/types/blog";
import { useUploadMedia, useCategoryMutations } from "@/lib/hooks";

interface CategoryManagerClientProps {
  initialCategories: CategoryItem[];
  allPosts: BlogPost[];
}

export default function CategoryManagerClient({
  initialCategories,
  allPosts,
}: CategoryManagerClientProps) {
  const router = useRouter();
  const [categories, setCategories] =
    useState<CategoryItem[]>(initialCategories);

  // Sync state when server revalidates initialCategories
  React.useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(
    null,
  );
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);


  // Form error state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Selection & Bulk Actions State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [bulkDescription, setBulkDescription] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const totalItems = categories.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedCategories = categories.slice(
    startIndex,
    startIndex + pageSize,
  );

  // Selection handlers
  const isAllSelected =
    paginatedCategories.length > 0 &&
    paginatedCategories.every((c) => selectedIds.includes(c.id));
  const isPartiallySelected =
    paginatedCategories.some((c) => selectedIds.includes(c.id)) &&
    !isAllSelected;

  const handleToggleAll = () => {
    if (isAllSelected) {
      const pageIds = paginatedCategories.map((c) => c.id);
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      const pageIds = paginatedCategories.map((c) => c.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Upload icon hook with Astryx toast & SVG/PNG validation
  const {
    uploadFile: uploadIconFile,
    isUploading: isUploadingIcon,
    error: uploadIconError,
    reset: resetUploadIcon,
  } = useUploadMedia({
    defaultFolder: 'egead_cms/categories',
    successMessage: 'Tải biểu tượng chuyên mục lên Cloudinary thành công!',
    validate: (file) => {
      const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        return 'Vui lòng chọn tệp ảnh định dạng SVG hoặc PNG';
      }
      return null;
    },
    onSuccess: (data) => {
      setIcon(data.url);
    },
  });

  const handleIconFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadIconFile(file);
  };

  // Category mutations hook with TanStack Query and Astryx Toast
  const {
    saveCategoryAsync,
    isSaving: isSubmitting,
    deleteCategoryAsync,
    syncCategoriesAsync,
    isSyncing,
    bulkDeleteAsync,
    bulkUpdateAsync,
    isBulkDeleting,
    isBulkUpdating,
  } = useCategoryMutations({
    onSaveSuccess: (savedCategory, isEditing) => {
      if (isEditing) {
        setCategories((prev) =>
          prev.map((c) => (c.id === savedCategory.id ? savedCategory : c)),
        );
      } else {
        setCategories((prev) =>
          [...prev, savedCategory].sort((a, b) => a.name.localeCompare(b.name)),
        );
      }
      handleCloseModal();
    },
    onDeleteSuccess: (id) => {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    },
    onSyncSuccess: (syncedCategories) => {
      setCategories(syncedCategories);
    },
    onBulkDeleteSuccess: (ids) => {
      setCategories((prev) => prev.filter((c) => !ids.includes(c.id)));
      setSelectedIds([]);
    },
    onBulkUpdateSuccess: (ids, data) => {
      setCategories((prev) =>
        prev.map((c) =>
          ids.includes(c.id) ? { ...c, description: data.description ?? c.description } : c,
        ),
      );
      setIsBulkEditOpen(false);
      setBulkDescription("");
      setSelectedIds([]);
    },
  });

  const isBulkLoading = isBulkDeleting || isBulkUpdating;

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setDescription("");
    setIcon("");
    setAutoSlug(true);
    setErrorMessage(null);
    resetUploadIcon();
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (category: CategoryItem) => {
    setEditingCategory(category);
    setName(category.name);
    setSlug(category.slug);
    setDescription(category.description || "");
    setIcon(category.icon || "");
    setAutoSlug(false);
    setErrorMessage(null);
    resetUploadIcon();
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setIcon("");
    setErrorMessage(null);
    resetUploadIcon();
  };

  // Name change handler
  const handleNameChange = (val: string) => {
    setName(val);
    if (autoSlug) {
      setSlug(generateSlug(val));
    }
  };

  // Slug change handler
  const handleSlugChange = (val: string) => {
    setAutoSlug(false);
    setSlug(val.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  };

  // Save handler (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await saveCategoryAsync({
        id: editingCategory?.id,
        name,
        slug,
        description,
        icon: icon || null,
      });
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  };

  // Delete handler
  const handleDelete = async (category: CategoryItem) => {
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa chuyên mục "${category.name}" không? Các bài viết thuộc chuyên mục này sẽ không bị xóa mà được chuyển về trạng thái Chưa phân loại.`,
    );
    if (!confirmed) return;

    try {
      await deleteCategoryAsync({ id: category.id, name: category.name });
    } catch {
      // Toast notification handles error display
    }
  };

  // Sync from existing posts handler
  const handleSync = async () => {
    setErrorMessage(null);
    try {
      await syncCategoriesAsync();
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  };

  // Bulk Delete Handler
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa ${selectedIds.length} chuyên mục đã chọn không? Các bài viết thuộc các chuyên mục này sẽ không bị xóa mà được chuyển về trạng thái Chưa phân loại.`,
    );
    if (!confirmed) return;

    try {
      await bulkDeleteAsync({ ids: selectedIds });
    } catch {
      // Toast notification handles error display
    }
  };

  // Bulk Update Submit Handler
  const handleBulkUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) return;

    try {
      await bulkUpdateAsync({
        ids: selectedIds,
        data: { description: bulkDescription },
      });
    } catch {
      // Toast notification handles error display
    }
  };

  return (
    <div className="space-y-6 w-full pb-8">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="mb-1.5">
            <Badge
              label={`${categories.length} chuyên mục kiến thức`}
              variant="success"
              className='h-8 px-4'
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Quản lý chuyên mục &amp; Thẻ
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Các chủ đề kiến thức phân loại cho hệ thống bài viết E-commerce
            E-GEAD
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            label="Thêm chuyên mục"
            variant="primary"
            onClick={handleOpenCreate}
            className="px-4 h-10"
          />
          <Button
            label={isSyncing ? "Đang đồng bộ..." : "Đồng bộ từ bài viết"}
            variant="secondary"
            isDisabled={isSyncing}
            onClick={handleSync}
            className="px-4 h-10"
          />
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 bg-emerald-50/90 border border-emerald-200/90 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <Badge
              label={`Đã chọn ${selectedIds.length} chuyên mục`}
              variant="success"
              className='h-8 px-4'
            />
            <span className="text-xs text-emerald-800 hidden sm:inline">
              Áp dụng thao tác đồng loạt trên các chuyên mục đã chọn
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              label="Chỉnh sửa hàng loạt"
              variant="secondary"
              className="px-4 h-10"
              onClick={() => setIsBulkEditOpen(true)}
            />
            <Button
              label={
                isBulkLoading
                  ? "Đang xử lý..."
                  : `Xóa ${selectedIds.length} chuyên mục`
              }
              variant="destructive"
              className="px-4 h-10"
              isDisabled={isBulkLoading}
              onClick={handleBulkDelete}
            />
            <Button
              label="Bỏ chọn"
              variant="ghost"
              className="px-4 h-10"
              onClick={() => setSelectedIds([])}
            />
          </div>
        </div>
      )}

      {/* Categories Grid or Empty State */}
      {categories.length === 0 ? (
        <Card variant="default" className="p-12 text-center">
          <EmptyState
            title="Chưa có chuyên mục nào trong cơ sở dữ liệu"
            description="Hãy tạo chuyên mục đầu tiên hoặc bấm Đồng bộ từ bài viết để nạp tự động."
            actions={
              <Button
                label="Tạo chuyên mục đầu tiên"
                variant="primary" className="px-4 h-10"
                onClick={handleOpenCreate}
              />
            }
          />
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Select all & counts row */}
          <div className="flex items-center justify-between px-1">
            <CheckboxInput
              label={`Chọn tất cả trên trang này (${paginatedCategories.length})`}
              value={
                isAllSelected
                  ? true
                  : isPartiallySelected
                    ? "indeterminate"
                    : false
              }
              onChange={handleToggleAll}
            />
            {selectedIds.length > 0 && (
              <span className="text-xs text-slate-500">
                Đã chọn {selectedIds.length} / {categories.length} chuyên mục
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginatedCategories.map((cat) => {
              const relatedPosts = allPosts.filter(
                (p) => p.tag === cat.name || p.category === cat.name,
              );
              const isChecked = selectedIds.includes(cat.id);

              return (
                <Card
                  key={cat.id}
                  variant="default"
                  className={`rounded-2xl p-6 transition-colors flex flex-col justify-between ${isChecked
                    ? "border-emerald-500 bg-emerald-50/20"
                    : "hover:border-slate-300"
                    }`}
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="mt-0.5 shrink-0">
                          <CheckboxInput
                            label={`Chọn chuyên mục ${cat.name}`}
                            isLabelHidden
                            size="sm"
                            value={isChecked}
                            onChange={() => handleToggleRow(cat.id)}
                          />
                        </div>
                        {cat.icon && (
                          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                            <img
                              src={cat.icon}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-slate-900 truncate">
                            {cat.name}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[11px] font-mono text-slate-400">
                              slug:
                            </span>
                            <code className="text-[11px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                              {cat.slug}
                            </code>
                          </div>
                        </div>
                      </div>

                      <Badge
                        label={`${cat.count} bài viết`}
                        variant="neutral"
                        className='h-8 px-4'
                      />
                    </div>

                    {cat.description && (
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    )}

                    {/* Related Recent Posts */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100">
                      <p className="text-[11px] text-slate-500 mb-2.5 font-bold flex items-center justify-between">
                        <span>Bài viết gần đây trong chuyên mục:</span>
                        <span className="text-[10px] font-normal text-slate-400">
                          {relatedPosts.length} liên kết
                        </span>
                      </p>

                      {relatedPosts.length > 0 ? (
                        <div className="space-y-2">
                          {relatedPosts.slice(0, 3).map((p) => (
                            <Link
                              key={p.id}
                              href={`/admin/blogs/${p.id}`}
                              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 transition-colors"
                            >
                              <span className="text-xs truncate font-medium flex-1 pr-2">
                                • {p.title}
                              </span>
                              <span className="text-xs text-slate-400">→</span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic py-1">
                          Chưa có bài viết nào thuộc chuyên mục này.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <Link
                      href={`/admin/blogs?category=${encodeURIComponent(cat.name)}`}
                      className="font-semibold text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Lọc danh sách bài</span>
                      <span>→</span>
                    </Link>

                    <div className="flex items-center gap-2">
                      <Button
                        label="Sửa"
                        variant="ghost"
                        className="px-4 h-10"
                        onClick={() => handleOpenEdit(cat)}
                      />
                      <Button
                        label="Xóa"
                        variant="destructive"
                        className="px-4 h-10"
                        onClick={() => handleDelete(cat)}
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Pagination Footer */}
          {totalItems > 0 && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <span className="text-xs text-slate-500 font-medium">
                Hiển thị {startIndex + 1}–
                {Math.min(startIndex + pageSize, totalItems)} trong tổng số{" "}
                {totalItems} chuyên mục
              </span>
              <Pagination
                page={safeCurrentPage}
                onChange={(p) => setCurrentPage(p)}
                totalItems={totalItems}
                pageSize={pageSize}
                pageSizeOptions={[6, 9, 18]}
                onPageSizeChange={(newSize) => {
                  setPageSize(newSize);
                  setCurrentPage(1);
                }}
                variant="pages"
                size="sm"
              />
            </div>
          )}
        </div>
      )}

      {/* Info Pro-Tip Box */}
      <div className="rounded-2xl border border-slate-200/80 bg-slate-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">
            Cơ chế phân loại và lưu trữ Database
          </h4>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Các chuyên mục này được lưu trữ trực tiếp vào bảng PostgreSQL
            `category` và liên kết với bảng `post`. Khi xuất bản bài viết mới,
            bạn có thể chọn ngay chuyên mục từ danh sách này.
          </p>
        </div>

        <Link
          href="/insights"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors shrink-0"
        >
          <span>Xem trang Insights</span>
        </Link>
      </div>

      {/* Modal / Form Create & Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {editingCategory
                  ? "Chỉnh sửa chuyên mục"
                  : "Thêm chuyên mục mới"}
              </h3>
              <Button
                label="Đóng"
                variant="ghost"
                className="px-4 h-10"
                onClick={handleCloseModal}
              />
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Tên chuyên mục */}
              <TextInput
                label="Tên chuyên mục"
                isRequired
                value={name}
                onChange={handleNameChange}
                placeholder="Ví dụ: Supply Chain & Logistics"
                width="100%"
                className='h-10 border'
              />

              {/* Slug */}
              <TextInput
                label="Đường dẫn Slug"
                isRequired
                value={slug}
                onChange={handleSlugChange}
                placeholder="supply-chain-logistics"
                width="100%"
                className='h-10 border'
              />

              {/* Icon chuyên mục (Cloudinary) */}
              <div>
                <Field
                  label="Biểu tượng chuyên mục (Icon SVG / PNG)"
                  inputID="category-icon"
                >
                  <div className="mt-1 flex items-center gap-3.5 p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                    {/* Icon preview */}
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 shrink-0 overflow-hidden shadow-sm">
                      {icon ? (
                        <img
                          src={icon}
                          alt="Icon"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-[10px] text-slate-400 text-center font-medium leading-tight">
                          Chưa có icon
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 cursor-pointer shadow-sm transition-colors">
                          <span>{isUploadingIcon ? "Đang tải..." : "Tải lên icon"}</span>
                          <input
                            type="file"
                            accept=".svg,.png,image/svg+xml,image/png"
                            onChange={handleIconFileChange}
                            disabled={isUploadingIcon}
                            className="hidden"
                          />
                        </label>

                        {icon && (
                          <Button
                            label="Gỡ icon"
                            variant="ghost"
                            className="px-4 h-10"
                            type="button"
                            onClick={() => setIcon("")}
                          />
                        )}
                      </div>

                      {uploadIconError && (
                        <p className="text-[11px] text-rose-600 font-medium">
                          {uploadIconError}
                        </p>
                      )}

                      <p className="text-[11px] text-slate-400">
                        Khuyến nghị ảnh SVG hoặc PNG kích thước vuông (64x64px hoặc 128x128px)
                      </p>
                    </div>
                  </div>
                </Field>
              </div>

              {/* Mô tả */}
              <div>
                <TextArea
                  label="Mô tả chuyên mục"
                  rows={3}
                  value={description}
                  onChange={setDescription}
                  placeholder="Mô tả tóm tắt về phạm vi kiến thức của chuyên mục này..."
                  width="100%"
                  className="border"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <Button
                  label="Hủy"
                  variant="ghost"
                  type="button"
                  onClick={handleCloseModal}
                  isDisabled={isSubmitting}
                  className="px-4 h-10"
                />
                <Button
                  label={
                    isSubmitting
                      ? "Đang lưu..."
                      : editingCategory
                        ? "Cập nhật"
                        : "Tạo chuyên mục"
                  }
                  variant="primary"
                  type="submit"
                  className="px-4 h-10"
                  isDisabled={isSubmitting || !name.trim() || !slug.trim()}
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Edit Modal */}
      {isBulkEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Chỉnh sửa hàng loạt
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đang chọn {selectedIds.length} chuyên mục
                </p>
              </div>
              <Button
                label="Đóng"
                variant="ghost"
                className="px-4 h-10"
                onClick={() => setIsBulkEditOpen(false)}
              />
            </div>

            {/* Modal Form */}
            <form onSubmit={handleBulkUpdateSubmit} className="p-6 space-y-4">
              <div>
                <TextArea
                  label="Mô tả chuyên mục mới"
                  description="Cập nhật mô tả đồng loạt cho các chuyên mục đã chọn"
                  rows={4}
                  value={bulkDescription}
                  onChange={setBulkDescription}
                  placeholder="Nhập nội dung mô tả mới cho các chuyên mục..."
                  width="100%"
                  className="border"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <Button
                  label="Hủy"
                  variant="ghost"
                  className="px-4 h-10"
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
                  className="px-4 h-10"
                  isDisabled={isBulkLoading}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
