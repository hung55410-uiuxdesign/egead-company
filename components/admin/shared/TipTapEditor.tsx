'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Youtube from '@tiptap/extension-youtube';
import { useUploadMedia } from '@/lib/hooks';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Pilcrow,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Minus,
  Highlighter,
  Palette,
  Table as TableIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  Info,
  Undo2,
  Redo2,
  RemoveFormatting,
  Eye,
  CodeXml,
  Sparkles,
  Maximize2,
  Minimize2,
  Check,
  X,
  UploadCloud,
  Loader2,
  ChevronDown,
  Columns,
  Rows,
  Trash2,
  Plus,
  ZoomIn,
  ZoomOut,
  FileCode,
} from 'lucide-react';

interface TipTapEditorProps {
  content: string;
  onChange: (htmlContent: string) => void;
  onReadTimeCalculated?: (readTime: string) => void;
  placeholder?: string;
  postTitle?: string;
}

const HIGHLIGHT_COLORS = [
  { name: 'Vàng tươi', hex: '#fef08a', bgClass: 'bg-yellow-200' },
  { name: 'Xanh lá', hex: '#bbf7d0', bgClass: 'bg-emerald-200' },
  { name: 'Xanh lam', hex: '#bfdbfe', bgClass: 'bg-blue-200' },
  { name: 'Tím nhạt', hex: '#e9d5ff', bgClass: 'bg-purple-200' },
  { name: 'Cam đào', hex: '#fed7aa', bgClass: 'bg-orange-200' },
  { name: 'Hồng phấn', hex: '#fbcfe8', bgClass: 'bg-pink-200' },
];

const TEXT_COLORS = [
  { name: 'Mặc định (Slate 900)', hex: '#0f172a' },
  { name: 'Xám đậm', hex: '#475569' },
  { name: 'Xanh E-GEAD', hex: '#059669' },
  { name: 'Xanh dương', hex: '#2563eb' },
  { name: 'Tím đậm', hex: '#9333ea' },
  { name: 'Đỏ nổi bật', hex: '#dc2626' },
  { name: 'Cam đất', hex: '#ea580c' },
];

export default function TipTapEditor({
  content,
  onChange,
  onReadTimeCalculated,
  placeholder = 'Bắt đầu soạn thảo nội dung bài viết chuyên sâu của bạn...',
  postTitle = '',
}: TipTapEditorProps) {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'html'>('editor');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<'90%' | '100%' | '115%' | '130%'>('100%');
  const [focusWidth, setFocusWidth] = useState<'compact' | 'standard' | 'wide' | 'full'>('standard');
  const [rawHtml, setRawHtml] = useState(content);

  // Dialog & dropdown states
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [youtubeModalOpen, setYoutubeModalOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [highlightMenuOpen, setHighlightMenuOpen] = useState(false);
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [tableMenuOpen, setTableMenuOpen] = useState(false);

  const highlightRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse w-full my-4 border border-slate-200 rounded-lg overflow-hidden',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'bg-slate-100 border border-slate-200 p-2 font-bold text-slate-800 text-left text-sm',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-slate-200 p-2 text-slate-700 text-sm align-top',
        },
      }),
      Youtube.configure({
        inline: false,
        HTMLAttributes: {
          class: 'rounded-xl overflow-hidden aspect-video my-4 w-full border border-slate-200 max-w-3xl mx-auto',
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-emerald-600 underline font-medium hover:text-emerald-700 cursor-pointer',
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: 'rounded-xl max-w-full my-4 border border-slate-200 mx-auto object-cover',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content || '<p></p>',
    editorProps: {
      attributes: {
        class:
          'prose prose-slate max-w-none focus:outline-none min-h-[380px] p-6 text-slate-800 leading-relaxed font-open-sans',
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      const html = currentEditor.getHTML();
      setRawHtml(html);
      onChange(html);

      // Calculate read time based on word count
      const text = currentEditor.getText();
      const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      const minutes = Math.max(1, Math.ceil(wordCount / 180));
      onReadTimeCalculated?.(`${minutes} mins read`);
    },
  });

  // Keep editor content synchronized if external content changes
  useEffect(() => {
    if (editor && content !== editor.getHTML() && content !== rawHtml) {
      editor.commands.setContent(content || '<p></p>');
      setRawHtml(content || '<p></p>');
    }
  }, [content, editor, rawHtml]);

  // Handle Fullscreen Escape key listener & Body overflow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  // Click outside to close dropdown popovers
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (highlightRef.current && !highlightRef.current.contains(e.target as Node)) {
        setHighlightMenuOpen(false);
      }
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) {
        setColorMenuOpen(false);
      }
      if (tableRef.current && !tableRef.current.contains(e.target as Node)) {
        setTableMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!editor) {
    return (
      <div className="p-8 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 text-xs font-open-sans">
        <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mr-2" />
        Đang khởi động trình soạn thảo TipTap...
      </div>
    );
  }

  // Link actions
  const openLinkModal = () => {
    const previousUrl = editor.getAttributes('link').href || '';
    setLinkUrl(previousUrl);
    setLinkModalOpen(true);
  };

  const applyLink = () => {
    if (!linkUrl.trim()) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      let finalUrl = linkUrl.trim();
      if (!/^https?:\/\//i.test(finalUrl) && !finalUrl.startsWith('/') && !finalUrl.startsWith('#')) {
        finalUrl = `https://${finalUrl}`;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: finalUrl, target: '_blank' })
        .run();
    }
    setLinkModalOpen(false);
    setLinkUrl('');
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    setLinkModalOpen(false);
  };

  // Upload content image hook with Astryx toast
  const {
    uploadFile: handleFileUpload,
    isUploading: isUploadingImage,
    error: uploadImageError,
    reset: resetUploadImage,
  } = useUploadMedia({
    defaultFolder: 'egead_cms/content',
    successMessage: 'Tải và chèn ảnh vào bài viết thành công!',
    onSuccess: (data) => {
      editor.chain().focus().setImage({ src: data.url }).run();
      setImageUrl('');
      setImageModalOpen(false);
    },
  });

  // Image action
  const applyImage = () => {
    if (imageUrl.trim()) {
      editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
      setImageUrl('');
      setImageModalOpen(false);
      resetUploadImage();
    }
  };

  // YouTube action
  const applyYoutube = () => {
    if (youtubeUrl.trim()) {
      editor.commands.setYoutubeVideo({ src: youtubeUrl.trim() });
      setYoutubeUrl('');
      setYoutubeModalOpen(false);
    }
  };

  // Callout Box insertion
  const insertCallout = (type: 'tip' | 'info' | 'warning') => {
    const configs = {
      tip: {
        title: 'MẸO THỰC THI (PRO TIP)',
        border: 'border-emerald-500 bg-emerald-50 text-emerald-900',
      },
      info: {
        title: 'THÔNG TIN BỔ SUNG',
        border: 'border-blue-500 bg-blue-50 text-blue-900',
      },
      warning: {
        title: 'LƯU Ý QUAN TRỌNG',
        border: 'border-amber-500 bg-amber-50 text-amber-900',
      },
    };
    const c = configs[type];
    editor
      .chain()
      .focus()
      .insertContent(
        `<div class="p-4 my-4 rounded-xl border-l-4 ${c.border}"><strong>${c.title}:</strong> Nhập nội dung chia sẻ hoặc khuyến nghị chuyên sâu tại đây...</div><p></p>`
      )
      .run();
  };

  // Analytics counts
  const currentText = editor.getText();
  const currentWords = currentText.trim().split(/\s+/).filter(Boolean).length;
  const currentChars = currentText.length;
  const estimatedReadTime = Math.max(1, Math.ceil(currentWords / 180));

  // Determine width constraint for Zen Focus mode
  const getFocusWidthClass = () => {
    switch (focusWidth) {
      case 'compact':
        return 'max-w-3xl';
      case 'standard':
        return 'max-w-4xl';
      case 'wide':
        return 'max-w-6xl';
      case 'full':
        return 'max-w-none';
      default:
        return 'max-w-4xl';
    }
  };

  // Determine font zoom scale
  const getZoomClass = () => {
    switch (zoomLevel) {
      case '90%':
        return 'text-sm';
      case '100%':
        return 'text-base';
      case '115%':
        return 'text-lg';
      case '130%':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  return (
    <div
      className={`bg-white font-open-sans transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 flex flex-col h-screen w-screen overflow-hidden'
          : 'border border-slate-200 rounded-xl overflow-hidden flex flex-col'
      }`}
    >
      {/* =========================================================================
          TOP BAR: Modes, Focus Controls, Zoom & Fullscreen
          ========================================================================= */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between flex-wrap gap-3">
        {/* Left: Tabs Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'editor'
                  ? 'bg-white text-slate-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Trực quan (WYSIWYG)
            </button>
            <button
              type="button"
              onClick={() => {
                if (editor) {
                  setRawHtml(editor.getHTML());
                }
                setActiveTab('preview');
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'preview'
                  ? 'bg-white text-slate-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Xem trước
            </button>
            <button
              type="button"
              onClick={() => {
                if (editor) {
                  setRawHtml(editor.getHTML());
                }
                setActiveTab('html');
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'html'
                  ? 'bg-white text-slate-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mã HTML
            </button>
          </div>

          {activeTab === 'preview' && (
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              Đang xem trước nội dung hiển thị thực tế
            </span>
          )}

          {isFullscreen && (
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                Chế độ tập trung (Zen Mode)
              </span>
              {postTitle && (
                <span className="text-xs font-semibold text-slate-700 truncate max-w-xs" title={postTitle}>
                  {postTitle}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right: Zoom controls, Fullscreen Toggle & Stats */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Zoom Level & Width Controls (Visible in Fullscreen or normal) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            {isFullscreen && (
              <>
                {/* Width Picker */}
                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
                  {(['compact', 'standard', 'wide', 'full'] as const).map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setFocusWidth(w)}
                      className={`px-2 py-0.5 text-[11px] font-medium rounded transition ${
                        focusWidth === w ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                      title={`Độ rộng khung soạn: ${w}`}
                    >
                      {w === 'compact' ? 'Gọn' : w === 'standard' ? 'Chuẩn' : w === 'wide' ? 'Rộng' : 'Tràn'}
                    </button>
                  ))}
                </div>

                <div className="h-4 w-px bg-slate-200" />
              </>
            )}

            {/* Font Zoom Controls */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1">
              <button
                type="button"
                onClick={() => {
                  if (zoomLevel === '130%') setZoomLevel('115%');
                  else if (zoomLevel === '115%') setZoomLevel('100%');
                  else if (zoomLevel === '100%') setZoomLevel('90%');
                }}
                className="hover:text-slate-900 p-0.5 rounded hover:bg-slate-100"
                title="Thu nhỏ cỡ chữ"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-semibold text-slate-700 w-9 text-center select-none font-mono">
                {zoomLevel}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (zoomLevel === '90%') setZoomLevel('100%');
                  else if (zoomLevel === '100%') setZoomLevel('115%');
                  else if (zoomLevel === '115%') setZoomLevel('130%');
                }}
                className="hover:text-slate-900 p-0.5 rounded hover:bg-slate-100"
                title="Phóng to cỡ chữ"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            <span>{currentWords} từ</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">{estimatedReadTime} phút đọc</span>
          </div>

          {/* Fullscreen / Focus Mode Toggle Button */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              isFullscreen
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
            }`}
            title={isFullscreen ? 'Thu nhỏ về màn hình quản trị (Esc)' : 'Phóng to tập trung soạn thảo (Zen Mode)'}
          >
            {isFullscreen ? (
              <span>Thu nhỏ (Esc)</span>
            ) : (
              <span>Phóng to tập trung</span>
            )}
          </button>
        </div>
      </div>

      {/* =========================================================================
          TOOLBAR (When in WYSIWYG Editor mode)
          ========================================================================= */}
      {activeTab === 'editor' && (
        <div className="border-b border-slate-200 bg-white p-2 flex items-center flex-wrap gap-1 sticky top-0 z-20">
          {/* Group 1: Text Structure */}
          <div className="flex items-center gap-0.5 pr-1.5 border-r border-slate-200">
            <button
              type="button"
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={`p-1.5 rounded text-xs font-medium ${
                editor.isActive('paragraph') ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Đoạn văn bình thường (Paragraph)"
            >
              <Pilcrow className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`p-1.5 rounded text-xs font-bold ${
                editor.isActive('heading', { level: 1 })
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Tiêu đề H1"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-1.5 rounded text-xs font-bold ${
                editor.isActive('heading', { level: 2 })
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Tiêu đề H2"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`p-1.5 rounded text-xs font-bold ${
                editor.isActive('heading', { level: 3 })
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Tiêu đề H3"
            >
              <Heading3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={`p-1.5 rounded text-xs font-bold ${
                editor.isActive('heading', { level: 4 })
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Tiêu đề H4"
            >
              <Heading4 className="w-4 h-4" />
            </button>
          </div>

          {/* Group 2: Inline Typography Marks */}
          <div className="flex items-center gap-0.5 px-1.5 border-r border-slate-200">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1.5 rounded ${
                editor.isActive('bold') ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="In đậm (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1.5 rounded ${
                editor.isActive('italic') ? 'bg-emerald-100 text-emerald-800 italic' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="In nghiêng (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-1.5 rounded ${
                editor.isActive('underline') ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Gạch chân (Ctrl+U)"
            >
              <UnderlineIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-1.5 rounded ${
                editor.isActive('strike') ? 'bg-emerald-100 text-emerald-800 line-through' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Gạch ngang chữ"
            >
              <Strikethrough className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`p-1.5 rounded ${
                editor.isActive('code') ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Mã nội dòng (Inline Code)"
            >
              <Code className="w-4 h-4" />
            </button>

            {/* Highlight with Color Picker */}
            <div className="relative" ref={highlightRef}>
              <button
                type="button"
                onClick={() => setHighlightMenuOpen(!highlightMenuOpen)}
                className={`p-1.5 rounded flex items-center gap-0.5 ${
                  editor.isActive('highlight') ? 'bg-amber-100 text-amber-800' : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Tô màu nền chữ (Highlight)"
              >
                <Highlighter className="w-4 h-4" />
                <ChevronDown className="w-2.5 h-2.5 opacity-60" />
              </button>
              {highlightMenuOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-slate-300 rounded-lg p-2 z-30 w-44 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 block px-1">
                    Màu Highlight
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    {HIGHLIGHT_COLORS.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => {
                          editor.chain().focus().toggleHighlight({ color: c.hex }).run();
                          setHighlightMenuOpen(false);
                        }}
                        className={`w-full h-6 rounded flex items-center justify-center border border-slate-300/80 ${c.bgClass} hover:scale-105 transition`}
                        title={c.name}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      editor.chain().focus().unsetHighlight().run();
                      setHighlightMenuOpen(false);
                    }}
                    className="w-full text-left text-[11px] text-red-600 hover:bg-red-50 p-1.5 rounded transition mt-1"
                  >
                    Bỏ màu highlight
                  </button>
                </div>
              )}
            </div>

            {/* Text Color Picker */}
            <div className="relative" ref={colorRef}>
              <button
                type="button"
                onClick={() => setColorMenuOpen(!colorMenuOpen)}
                className="p-1.5 rounded flex items-center gap-0.5 text-slate-600 hover:bg-slate-100"
                title="Màu sắc phông chữ"
              >
                <Palette className="w-4 h-4" />
                <ChevronDown className="w-2.5 h-2.5 opacity-60" />
              </button>
              {colorMenuOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-slate-300 rounded-lg p-2 z-30 w-48 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 block px-1">
                    Chọn màu chữ
                  </span>
                  <div className="space-y-1 pt-1">
                    {TEXT_COLORS.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => {
                          editor.chain().focus().setColor(c.hex).run();
                          setColorMenuOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-100 text-xs text-slate-700"
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        editor.chain().focus().unsetColor().run();
                        setColorMenuOpen(false);
                      }}
                      className="w-full text-left text-[11px] text-slate-500 hover:bg-slate-100 p-1.5 rounded mt-1"
                    >
                      Khôi phục màu mặc định
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Group 3: Text Alignment */}
          <div className="flex items-center gap-0.5 px-1.5 border-r border-slate-200">
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`p-1.5 rounded ${
                editor.isActive({ textAlign: 'left' }) ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Căn lề trái"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`p-1.5 rounded ${
                editor.isActive({ textAlign: 'center' }) ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Căn giữa"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`p-1.5 rounded ${
                editor.isActive({ textAlign: 'right' }) ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Căn lề phải"
            >
              <AlignRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={`p-1.5 rounded ${
                editor.isActive({ textAlign: 'justify' }) ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Căn đều hai bên"
            >
              <AlignJustify className="w-4 h-4" />
            </button>
          </div>

          {/* Group 4: Lists & Tasks */}
          <div className="flex items-center gap-0.5 px-1.5 border-r border-slate-200">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-1.5 rounded ${
                editor.isActive('bulletList') ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Danh sách gạch đầu dòng"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-1.5 rounded ${
                editor.isActive('orderedList') ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Danh sách đánh số thứ tự"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              className={`p-1.5 rounded ${
                editor.isActive('taskList') ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Danh sách việc cần làm (Task List)"
            >
              <ListTodo className="w-4 h-4" />
            </button>
          </div>

          {/* Group 5: Blocks & Layout */}
          <div className="flex items-center gap-0.5 px-1.5 border-r border-slate-200">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-1.5 rounded ${
                editor.isActive('blockquote') ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Khối trích dẫn nổi bật (Quote)"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-1.5 rounded ${
                editor.isActive('codeBlock') ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Khối mã lập trình (Code Block)"
            >
              <FileCode className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="p-1.5 rounded text-slate-600 hover:bg-slate-100"
              title="Đường phân cách ngang (Divider)"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Group 6: Table Management Dropdown */}
          <div className="relative px-1.5 border-r border-slate-200" ref={tableRef}>
            <button
              type="button"
              onClick={() => setTableMenuOpen(!tableMenuOpen)}
              className={`p-1.5 rounded flex items-center gap-0.5 ${
                editor.isActive('table') ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Chèn & Quản lý bảng dữ liệu (Table)"
            >
              <TableIcon className="w-4 h-4" />
              <ChevronDown className="w-2.5 h-2.5 opacity-60" />
            </button>
            {tableMenuOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-slate-300 rounded-lg p-2 z-30 w-48 space-y-1 text-xs">
                <span className="text-[11px] font-bold text-slate-500 block px-1">
                  Công cụ bảng
                </span>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
                    setTableMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 text-slate-700"
                >
                  Tạo bảng 3x3 mới
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().addColumnAfter().run();
                    setTableMenuOpen(false);
                  }}
                  disabled={!editor.can().addColumnAfter()}
                  className="w-full text-left px-2 py-1 rounded hover:bg-slate-100 text-slate-700 disabled:opacity-40"
                >
                  Thêm cột tiếp theo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().addRowAfter().run();
                    setTableMenuOpen(false);
                  }}
                  disabled={!editor.can().addRowAfter()}
                  className="w-full text-left px-2 py-1 rounded hover:bg-slate-100 text-slate-700 disabled:opacity-40"
                >
                  Thêm hàng tiếp theo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().deleteColumn().run();
                    setTableMenuOpen(false);
                  }}
                  disabled={!editor.can().deleteColumn()}
                  className="w-full text-left px-2 py-1 rounded hover:bg-slate-100 text-red-600 disabled:opacity-40"
                >
                  Xoá cột hiện tại
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().deleteRow().run();
                    setTableMenuOpen(false);
                  }}
                  disabled={!editor.can().deleteRow()}
                  className="w-full text-left px-2 py-1 rounded hover:bg-slate-100 text-red-600 disabled:opacity-40"
                >
                  Xoá hàng hiện tại
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().deleteTable().run();
                    setTableMenuOpen(false);
                  }}
                  disabled={!editor.can().deleteTable()}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-red-50 text-red-600 font-semibold disabled:opacity-40"
                >
                  Xoá toàn bộ bảng
                </button>
              </div>
            )}
          </div>

          {/* Group 7: Media & Insertions */}
          <div className="flex items-center gap-0.5 px-1.5 border-r border-slate-200">
            <button
              type="button"
              onClick={openLinkModal}
              className={`p-1.5 rounded ${
                editor.isActive('link') ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Chèn liên kết URL (Link)"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setImageModalOpen(true)}
              className="p-1.5 rounded text-slate-600 hover:bg-slate-100"
              title="Chèn hình ảnh (Image)"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setYoutubeModalOpen(true)}
              className="p-1.5 rounded text-slate-600 hover:bg-slate-100"
              title="Nhúng video YouTube"
            >
              <Video className="w-4 h-4 text-red-600" />
            </button>
            <button
              type="button"
              onClick={() => insertCallout('tip')}
              className="p-1.5 rounded text-slate-600 hover:bg-slate-100"
              title="Chèn hộp Callout (Khuyến nghị chuyên gia)"
            >
              <Info className="w-4 h-4 text-emerald-600" />
            </button>
          </div>

          {/* Group 8: Undo / Redo & Clear */}
          <div className="flex items-center gap-0.5 pl-1.5 ml-auto">
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="p-1.5 rounded text-slate-600 hover:bg-slate-100 disabled:opacity-30"
              title="Hoàn tác (Undo - Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="p-1.5 rounded text-slate-600 hover:bg-slate-100 disabled:opacity-30"
              title="Làm lại (Redo - Ctrl+Y)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
              className="p-1.5 rounded text-slate-600 hover:bg-slate-100"
              title="Xoá toàn bộ định dạng văn bản"
            >
              <RemoveFormatting className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODALS / INLINE ACTION BARS
          ========================================================================= */}

      {/* Link Bar */}
      {linkModalOpen && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2.5 flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-emerald-700 shrink-0" />
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Nhập đường dẫn URL (vd: https://egeadcompany.com hoặc /our-work)"
            className="flex-1 bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                applyLink();
              }
            }}
          />
          <button
            type="button"
            onClick={applyLink}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center"
          >
            <span>Áp dụng</span>
          </button>
          {editor.isActive('link') && (
            <button
              type="button"
              onClick={removeLink}
              className="px-2.5 py-1.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded text-xs font-medium"
            >
              Gỡ link
            </button>
          )}
          <button
            type="button"
            onClick={() => setLinkModalOpen(false)}
            className="p-1 text-slate-500 hover:text-slate-800 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Image Insertion Modal with Cloudinary Upload */}
      {imageModalOpen && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900">
              Chèn hình ảnh vào bài viết
            </span>
            <button
              type="button"
              onClick={() => {
                setImageModalOpen(false);
                resetUploadImage();
              }}
              className="p-1 text-slate-500 hover:text-slate-800 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
            {/* Option A: Upload directly to Cloudinary */}
            <div className="bg-white p-3 rounded-lg border border-emerald-200 flex flex-col justify-center items-center text-center">
              <label className="cursor-pointer w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center transition-colors">
                {isUploadingImage ? (
                  <span>Đang tải lên Cloudinary...</span>
                ) : (
                  <span>Tải ảnh từ máy tính (Cloudinary)</span>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif"
                  disabled={isUploadingImage}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="sr-only"
                />
              </label>
              <span className="text-[10px] text-slate-500 mt-1.5">
                Tự động lưu trữ trên Cloudinary &amp; chèn tức thì vào vị trí con trỏ
              </span>
            </div>

            {/* Option B: Direct URL / Presets */}
            <div className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col justify-between space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Hoặc dán URL ảnh trực tiếp..."
                  className="flex-1 bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      applyImage();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={applyImage}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-semibold flex items-center"
                >
                  <span>Chèn</span>
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 overflow-x-auto">
                <span className="shrink-0 text-slate-600 font-medium">Ảnh mẫu:</span>
                {[
                  { label: 'Brother', url: '/assets/case_brother.jpg' },
                  { label: 'Suntory', url: '/assets/case_suntory.jpg' },
                  { label: 'Weir', url: '/assets/case_weir.jpg' },
                  { label: 'Manulife', url: '/assets/case_manulife.jpg' },
                ].map((p) => (
                  <button
                    key={p.url}
                    type="button"
                    onClick={() => {
                      setImageUrl(p.url);
                      editor.chain().focus().setImage({ src: p.url }).run();
                      setImageModalOpen(false);
                    }}
                    className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px]"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {uploadImageError && (
            <p className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded border border-red-200">
              {uploadImageError}
            </p>
          )}
        </div>
      )}

      {/* YouTube Modal */}
      {youtubeModalOpen && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2.5 flex items-center gap-2">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Dán link video YouTube (vd: https://www.youtube.com/watch?v=... hoặc https://youtu.be/...)"
            className="flex-1 bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-red-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                applyYoutube();
              }
            }}
          />
          <button
            type="button"
            onClick={applyYoutube}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold flex items-center"
          >
            <span>Nhúng video</span>
          </button>
          <button
            type="button"
            onClick={() => setYoutubeModalOpen(false)}
            className="p-1 text-slate-500 hover:text-slate-800 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =========================================================================
          MAIN EDITING / PREVIEW CANVAS (100% VISUAL PARITY)
          ========================================================================= */}
      {(activeTab === 'editor' || activeTab === 'preview') && (
        <div
          className={`flex-1 bg-white overflow-y-auto ${
            activeTab === 'editor' ? 'cursor-text' : 'cursor-default'
          } ${isFullscreen ? 'p-6 sm:p-12' : 'min-h-[420px]'}`}
          onClick={() => {
            if (activeTab === 'editor') {
              editor.commands.focus();
            }
          }}
        >
          <div className={`mx-auto transition-all ${isFullscreen ? getFocusWidthClass() : 'max-w-none'}`}>
            <div className={getZoomClass()}>
              {activeTab === 'editor' ? (
                <EditorContent editor={editor} />
              ) : (
                <div
                  className="tiptap tiptap-content focus:outline-none min-h-[380px] p-6 text-slate-800 leading-relaxed font-open-sans select-text"
                  dangerouslySetInnerHTML={{
                    __html:
                      rawHtml && rawHtml.trim() !== '<p></p>' && rawHtml.trim() !== ''
                        ? rawHtml
                        : '<p class="text-slate-400 italic">Chưa có nội dung bài viết để xem trước...</p>',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* HTML Code View - Clean Light Mode with Action Buttons */}
      {activeTab === 'html' && (
        <div
          className={`flex-1 bg-slate-50 text-slate-800 font-mono text-xs overflow-y-auto border-t border-slate-200 flex flex-col ${
            isFullscreen ? 'p-8' : 'p-4 min-h-[420px]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600">Trình chỉnh sửa mã HTML nguồn</span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(rawHtml);
                alert('Đã sao chép toàn bộ mã HTML vào bộ nhớ tạm!');
              }}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded text-slate-700 text-xs font-semibold"
            >
              Sao chép mã HTML
            </button>
          </div>
          <textarea
            value={rawHtml}
            onChange={(e) => {
              const val = e.target.value;
              setRawHtml(val);
              editor.commands.setContent(val);
              onChange(val);
            }}
            className="flex-1 w-full min-h-[360px] bg-white border border-slate-300 rounded-lg p-4 text-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-y leading-relaxed"
            placeholder="<html>...</html>"
          />
        </div>
      )}

      {/* =========================================================================
          BOTTOM STATUS BAR
          ========================================================================= */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-3">
          <span>{currentWords} từ</span>
          <span>•</span>
          <span>{currentChars} ký tự</span>
          <span>•</span>
          <span className="text-emerald-700 font-semibold">{estimatedReadTime} phút đọc</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-slate-400">
            {isFullscreen ? 'Nhấn Esc hoặc nút Thu nhỏ để thoát Zen Mode' : 'Hỗ trợ phím tắt: Ctrl+B (Đậm), Ctrl+I (Nghiêng), Ctrl+U (Gạch chân)'}
          </span>
          {activeTab === 'preview' ? (
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
              <Eye className="w-3 h-3 text-emerald-600" />
              <span>Chế độ xem trước (Chỉ đọc)</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Tự động đồng bộ</span>
            </span>
          )}
        </div>
      </div>

      {/* =========================================================================
          CUSTOM STYLES FOR RICH ELEMENTS (100% Visual Parity for Editor & Preview)
          ========================================================================= */}
      <style jsx global>{`
        .tiptap,
        .tiptap-content {
          outline: none;
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #334155;
        }
        .tiptap p,
        .tiptap-content p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
          color: #334155;
        }
        .tiptap h1,
        .tiptap-content h1 {
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .tiptap h2,
        .tiptap-content h2 {
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 1.625rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          line-height: 1.35;
        }
        .tiptap h3,
        .tiptap-content h3 {
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 1.325rem;
          font-weight: 600;
          color: #1e293b;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        .tiptap h4,
        .tiptap-content h4 {
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #334155;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .tiptap strong,
        .tiptap b,
        .tiptap-content strong,
        .tiptap-content b {
          font-weight: 700;
          color: #0f172a;
        }
        .tiptap em,
        .tiptap-content em {
          font-style: italic;
        }
        .tiptap u,
        .tiptap-content u {
          text-decoration: underline;
        }
        .tiptap s,
        .tiptap-content s {
          text-decoration: line-through;
        }
        .tiptap mark,
        .tiptap-content mark {
          border-radius: 0.25rem;
          padding: 0.1rem 0.25rem;
        }
        .tiptap a,
        .tiptap-content a {
          color: #059669;
          text-decoration: underline;
          font-weight: 500;
          transition: color 0.15s ease;
        }
        .tiptap a:hover,
        .tiptap-content a:hover {
          color: #047857;
        }
        .tiptap ul:not([data-type='taskList']),
        .tiptap-content ul:not([data-type='taskList']) {
          list-style-type: disc;
          padding-left: 1.75rem;
          margin-bottom: 1.25rem;
          color: #334155;
        }
        .tiptap ol,
        .tiptap-content ol {
          list-style-type: decimal;
          padding-left: 1.75rem;
          margin-bottom: 1.25rem;
          color: #334155;
        }
        .tiptap li,
        .tiptap-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        /* Task List Checklist */
        .tiptap ul[data-type='taskList'],
        .tiptap-content ul[data-type='taskList'] {
          list-style: none;
          padding-left: 0;
          margin-bottom: 1.25rem;
        }
        .tiptap ul[data-type='taskList'] li,
        .tiptap-content ul[data-type='taskList'] li {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          margin-bottom: 0.5rem;
        }
        .tiptap ul[data-type='taskList'] li > label,
        .tiptap-content ul[data-type='taskList'] li > label {
          margin-top: 0.25rem;
          cursor: pointer;
        }
        .tiptap ul[data-type='taskList'] li > label input[type='checkbox'],
        .tiptap-content ul[data-type='taskList'] li > label input[type='checkbox'] {
          accent-color: #059669;
          width: 1.15rem;
          height: 1.15rem;
          border-radius: 4px;
        }
        .tiptap-content ul[data-type='taskList'] li > label input[type='checkbox'] {
          pointer-events: none;
        }
        .tiptap ul[data-type='taskList'] li > div,
        .tiptap-content ul[data-type='taskList'] li > div {
          flex: 1;
        }
        /* Blockquote */
        .tiptap blockquote,
        .tiptap-content blockquote {
          border-left: 4px solid #10b981;
          padding: 0.85rem 1.25rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #475569;
          background: #f8fafc;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        /* Inline code */
        .tiptap code,
        .tiptap-content code {
          background-color: #f1f5f9;
          color: #0f172a;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.875em;
          border: 1px solid #e2e8f0;
        }
        /* Code block */
        .tiptap pre,
        .tiptap-content pre {
          background-color: #0f172a;
          color: #e2e8f0;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .tiptap pre code,
        .tiptap-content pre code {
          background: transparent;
          color: inherit;
          padding: 0;
          border: none;
          font-size: 0.875rem;
        }
        /* Horizontal rule */
        .tiptap hr,
        .tiptap-content hr {
          border: none;
          border-top: 2px dashed #cbd5e1;
          margin: 2rem 0;
        }
        /* Tables */
        .tiptap table,
        .tiptap-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1.5rem 0;
          overflow: hidden;
          border: 1px solid #cbd5e1;
          border-radius: 0.5rem;
        }
        .tiptap th,
        .tiptap td,
        .tiptap-content th,
        .tiptap-content td {
          border: 1px solid #cbd5e1;
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
        }
        .tiptap th,
        .tiptap-content th {
          background-color: #f8fafc;
          font-weight: 700;
          color: #0f172a;
        }
        /* Images */
        .tiptap img,
        .tiptap-content img {
          border-radius: 0.75rem;
          max-width: 100%;
          height: auto;
          margin: 1.25rem auto;
          display: block;
          border: 1px solid #e2e8f0;
        }
        /* YouTube Videos */
        .tiptap div[data-youtube-video],
        .tiptap-content div[data-youtube-video] {
          width: 100%;
          margin: 1.25rem 0;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .tiptap div[data-youtube-video] iframe,
        .tiptap-content div[data-youtube-video] iframe {
          width: 100%;
          aspect-ratio: 16 / 9;
          border: none;
        }
        /* Placeholder */
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #94a3b8;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}
