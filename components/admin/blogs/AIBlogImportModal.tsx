'use client';

import React, { useState, useMemo } from 'react';
import {
  Card,
  Button,
  Badge,
  Selector,
  useToast,
  TextArea,
} from '@astryxdesign/core';
import { BlogCategory } from '@/types/blog';
import {
  parseAIBlogContent,
  AI_BLOG_TEMPLATES,
  BlogPromptTemplate,
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
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('culture-events');
  const [rawText, setRawText] = useState<string>('');
  const [parseError, setParseError] = useState<string | null>(null);

  const categoryNames = useMemo(
    () => categories.map((c) => c.name),
    [categories]
  );

  const activeTemplate: BlogPromptTemplate = useMemo(() => {
    return (
      AI_BLOG_TEMPLATES.find((t) => t.id === selectedTemplateId) ||
      AI_BLOG_TEMPLATES[0]
    );
  }, [selectedTemplateId]);

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
      const templateText = activeTemplate.prompt(categoryNames);
      await navigator.clipboard.writeText(templateText);
      toast({
        body: `Đã sao chép Prompt mẫu "${activeTemplate.name}" vào Clipboard!`,
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
    setRawText(activeTemplate.sampleMarkdown);
    toast({
      body: `Đã nạp bài viết mẫu "${activeTemplate.name}". Bạn có thể kiểm tra nội dung bóc tách bên dưới.`,
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
            </div>
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
          {/* Template Selection Box */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <label className="text-xs font-bold text-slate-800">
                Chọn mẫu chủ đề &amp; định dạng bài viết:
              </label>
            </div>

            <Selector
              label=""
              value={selectedTemplateId}
              onChange={(val) => setSelectedTemplateId(val)}
              options={AI_BLOG_TEMPLATES.map((t) => ({
                value: t.id,
                label: t.name,
              }))}
              className="h-10 border bg-white"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <p className="text-sm text-slate-900">
                {activeTemplate.description}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  label="Sao chép"
                  variant="secondary"
                  onClick={handleCopyPrompt}
                  className="h-9 px-3.5 text-xs"
                />
                <Button
                  label="Dán dữ liệu"
                  variant="secondary"
                  onClick={handleLoadSample}
                  className="h-9 px-3.5 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Textarea Header & Clear button */}
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700">
              Nội dung văn bản từ AI
            </label>
            {rawText && (
              <Button
                label="Xóa nội dung"
                variant="ghost"
                onClick={handleClear}
                className="h-7 px-2 text-xs text-slate-500 hover:text-slate-800"
              />
            )}
          </div>

          {/* Main Input Textarea */}
          <div>
            <TextArea
              label="Nội dung bài viết AI (Markdown / JSON)"
              isLabelHidden
              rows={8}
              value={rawText}
              onChange={setRawText}
              placeholder="Dán toàn bộ văn bản bắt đầu từ khối --- hoặc mã Markdown / JSON vào đây..."
              width="100%"
              className="border font-mono text-xs sm:text-sm"
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
                label={isSavingDirectly ? 'Đang lưu bài viết...' : 'Lưu bản nháp'}
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
