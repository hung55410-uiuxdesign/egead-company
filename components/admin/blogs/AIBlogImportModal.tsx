'use client';

import React, { useState, useMemo } from 'react';
import {
  Card,
  Button,
  Badge,
  useToast,
} from '@astryxdesign/core';
import { BlogCategory } from '@/types/blog';
import {
  parseAIBlogContent,
  getAIBlogPromptTemplate,
  SAMPLE_AI_BLOG_MARKDOWN,
  ParsedBlogPost,
} from '@/lib/utils/aiBlogParser';

interface AIBlogImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: BlogCategory[];
  onApplyToEditor?: (data: ParsedBlogPost) => void;
  onSaveDirectly?: (data: ParsedBlogPost) => void;
  isSavingDirectly?: boolean;
}

export default function AIBlogImportModal({
  isOpen,
  onClose,
  categories,
  onApplyToEditor,
  onSaveDirectly,
  isSavingDirectly = false,
}: AIBlogImportModalProps) {
  const toast = useToast();
  const [rawText, setRawText] = useState<string>('');
  const [parseError, setParseError] = useState<string | null>(null);

  const categoryNames = useMemo(
    () => categories.map((c) => c.name),
    [categories]
  );

  // Parse result memoized
  const parsedData: ParsedBlogPost | null = useMemo(() => {
    if (!rawText.trim()) {
      setParseError(null);
      return null;
    }
    try {
      const result = parseAIBlogContent(rawText);
      setParseError(null);
      return result;
    } catch (err) {
      setParseError((err as Error).message);
      return null;
    }
  }, [rawText]);

  if (!isOpen) return null;

  const handleCopyPrompt = async () => {
    try {
      const template = getAIBlogPromptTemplate(categoryNames);
      await navigator.clipboard.writeText(template);
      toast({
        body: 'Đã sao chép Prompt mẫu vào Clipboard. Hãy dán sang ChatGPT hoặc Claude để tạo bài.',
        type: 'info',
        isAutoHide: true,
        autoHideDuration: 4000,
      });
    } catch {
      toast({
        body: 'Không thể sao chép tự động. Vui lòng thử lại.',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    }
  };

  const handleLoadSample = () => {
    setRawText(SAMPLE_AI_BLOG_MARKDOWN);
    toast({
      body: 'Đã nạp bài viết mẫu của E-GEAD. Bạn có thể kiểm tra nội dung bóc tách bên dưới.',
      type: 'info',
      isAutoHide: true,
      autoHideDuration: 3000,
    });
  };

  const handleClear = () => {
    setRawText('');
    setParseError(null);
  };

  const handleApply = () => {
    if (!parsedData) {
      toast({
        body: 'Vui lòng dán nội dung bài viết hợp lệ trước khi áp dụng.',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
      return;
    }
    if (onApplyToEditor) {
      onApplyToEditor(parsedData);
      toast({
        body: 'Đã điền thông tin bài viết vào trình soạn thảo thành công!',
        type: 'info',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
      onClose();
    }
  };

  const handleSave = () => {
    if (!parsedData) {
      toast({
        body: 'Vui lòng dán nội dung bài viết hợp lệ trước khi lưu.',
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 3000,
      });
      return;
    }
    if (onSaveDirectly) {
      onSaveDirectly(parsedData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden font-open-sans">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">
                Thêm nhanh bài viết từ AI
              </h3>
              <Badge label="Markdown & Frontmatter" variant="neutral" className="h-6 px-2.5 text-xs" />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Dán văn bản được AI (ChatGPT, Claude, Gemini) tạo theo cấu trúc chuẩn để tự động điền form hoặc lưu ngay
            </p>
          </div>
          <Button
            label="Đóng"
            variant="ghost"
            onClick={onClose}
            className="h-9 px-3.5"
          />
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Quick Action Helpers */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                label="Sao chép Prompt mẫu cho AI"
                variant="secondary"
                onClick={handleCopyPrompt}
                className="h-9 px-3.5"
              />
              <Button
                label="Dán dữ liệu mẫu thử nghiệm"
                variant="secondary"
                onClick={handleLoadSample}
                className="h-9 px-3.5"
              />
            </div>

            {rawText && (
              <Button
                label="Xóa nội dung"
                variant="ghost"
                onClick={handleClear}
                className="h-9 px-3 text-slate-500 hover:text-slate-800"
              />
            )}
          </div>

          {/* Main Input Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Nội dung văn bản từ AI
            </label>
            <textarea
              rows={8}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Dán toàn bộ văn bản bắt đầu từ khối --- hoặc mã Markdown / JSON vào đây..."
              className="w-full p-4 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all leading-relaxed"
            />
          </div>

          {/* Parsing Error notification */}
          {parseError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              Không thể phân tích dữ liệu: {parseError}
            </div>
          )}

          {/* Parsed Preview Card */}
          {parsedData && (
            <Card variant="default" className="rounded-xl p-4 sm:p-5 border border-emerald-100 bg-emerald-50/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800">
                  Đã phân tích thành công cấu trúc bài viết:
                </span>
                <Badge label={parsedData.category || 'Chưa phân loại'} variant="success" className="h-6 px-2.5 text-xs" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {parsedData.title}
                </h4>
                {parsedData.subtitle && (
                  <p className="text-xs text-slate-600 font-medium italic">
                    {parsedData.subtitle}
                  </p>
                )}
                {parsedData.excerpt && (
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {parsedData.excerpt}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-100/60 text-xs text-slate-600">
                <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  Đường dẫn: /{parsedData.slug}
                </span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  Thẻ: {parsedData.tag}
                </span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  Thời gian đọc: {parsedData.readTime}
                </span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  Tác giả: {parsedData.authorName}
                </span>
              </div>
            </Card>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 bg-slate-50/70">
          <span className="text-xs text-slate-500">
            {parsedData
              ? 'Dữ liệu đã sẵn sàng để chuyển vào hệ thống'
              : 'Hãy dán văn bản để xem kết quả phân tích'}
          </span>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <Button
              label="Hủy bỏ"
              variant="ghost"
              onClick={onClose}
              className="h-10 px-4"
            />

            {onApplyToEditor && (
              <Button
                label="Điền vào trình soạn thảo"
                variant="secondary"
                isDisabled={!parsedData}
                onClick={handleApply}
                className="h-10 px-4"
              />
            )}

            {onSaveDirectly && (
              <Button
                label={isSavingDirectly ? 'Đang lưu bài viết...' : 'Lưu nháp vào hệ thống ngay'}
                variant="primary"
                isDisabled={!parsedData || isSavingDirectly}
                isLoading={isSavingDirectly}
                onClick={handleSave}
                className="h-10 px-4"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
