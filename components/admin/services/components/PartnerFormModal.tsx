'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button, Badge, Card, Field, FieldLabel, TextInput, Selector, TextArea } from '@astryxdesign/core';
import type { PartnerItemModel } from '@/lib/services/partner-item.service';
import type { SavePartnerVariables } from '@/lib/hooks';

interface PartnerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner?: PartnerItemModel | null;
  onSave: (variables: SavePartnerVariables) => Promise<void>;
  isSaving: boolean;
}

type TabKey = 'hero' | 'advantages' | 'expertise' | 'why' | 'cases' | 'cta' | 'json';

export default function PartnerFormModal({
  isOpen,
  onClose,
  partner,
  onSave,
  isSaving,
}: PartnerFormModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('hero');

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [badge, setBadge] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [bannerFallback, setBannerFallback] = useState('');
  const [ctaText, setCtaText] = useState('Schedule demo');
  const [ctaHref, setCtaHref] = useState('/contact-us');

  // Advantages
  const [advantagesSubtitle, setAdvantagesSubtitle] = useState('E-GEAD advantages');
  const [advantagesHeadline, setAdvantagesHeadline] = useState('');
  const [advantagesItems, setAdvantagesItems] = useState<any[]>([]);

  // Expertise
  const [expertiseSubtitle, setExpertiseSubtitle] = useState('Our expertise');
  const [expertiseHeadline, setExpertiseHeadline] = useState('We are fluent in');
  const [expertiseItems, setExpertiseItems] = useState<any[]>([]);

  // Why
  const [whyTitlePrefix, setWhyTitlePrefix] = useState('');
  const [whyHeadline, setWhyHeadline] = useState('');
  const [whyDescription, setWhyDescription] = useState('');
  const [whyItems, setWhyItems] = useState<any[]>([]);

  // Cases
  const [casesSubtitle, setCasesSubtitle] = useState('Proven outcomes');
  const [casesHeadline, setCasesHeadline] = useState('Read our cases');
  const [casesItems, setCasesItems] = useState<any[]>([]);

  // CTA & SEO
  const [ctaHeadingPart1, setCtaHeadingPart1] = useState('Unleash your ');
  const [ctaHighlight, setCtaHighlight] = useState('growth potential');
  const [ctaHeadingPart2, setCtaHeadingPart2] = useState('');
  const [ctaDescription, setCtaDescription] = useState('');
  const [ctaButtonText, setCtaButtonText] = useState("Let's talk");
  const [ctaButtonHref, setCtaButtonHref] = useState('/contact-us');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState<'published' | 'draft'>('published');

  // JSON Raw Editor State
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonSuccessMsg, setJsonSuccessMsg] = useState<string | null>(null);

  // Populate data when partner prop changes
  useEffect(() => {
    if (partner) {
      setName(partner.name || '');
      setSlug(partner.slug || '');
      setBadge(partner.badge || '');
      setHeadline(partner.headline || '');
      setDescription(partner.description || '');
      setBannerImage(partner.bannerImage || '');
      setBannerFallback(partner.bannerFallback || '');
      setCtaText(partner.ctaText || 'Schedule demo');
      setCtaHref(partner.ctaHref || '/contact-us');

      setAdvantagesSubtitle(partner.advantagesSubtitle || 'E-GEAD advantages');
      setAdvantagesHeadline(partner.advantagesHeadline || '');
      setAdvantagesItems(Array.isArray(partner.advantagesItems) ? partner.advantagesItems : []);

      setExpertiseSubtitle(partner.expertiseSubtitle || 'Our expertise');
      setExpertiseHeadline(partner.expertiseHeadline || 'We are fluent in');
      setExpertiseItems(Array.isArray(partner.expertiseItems) ? partner.expertiseItems : []);

      setWhyTitlePrefix(partner.whyTitlePrefix || `Why ${partner.name}`);
      setWhyHeadline(partner.whyHeadline || '');
      setWhyDescription(partner.whyDescription || '');
      setWhyItems(Array.isArray(partner.whyItems) ? partner.whyItems : []);

      setCasesSubtitle(partner.casesSubtitle || 'Proven outcomes');
      setCasesHeadline(partner.casesHeadline || 'Read our cases');
      setCasesItems(Array.isArray(partner.casesItems) ? partner.casesItems : []);

      setCtaHeadingPart1(partner.ctaHeadingPart1 || 'Unleash your ');
      setCtaHighlight(partner.ctaHighlight || 'growth potential');
      setCtaHeadingPart2(partner.ctaHeadingPart2 || ` with ${partner.name} now.`);
      setCtaDescription(partner.ctaDescription || '');
      setCtaButtonText(partner.ctaButtonText || "Let's talk");
      setCtaButtonHref(partner.ctaButtonHref || '/contact-us');

      setMetaTitle(partner.metaTitle || '');
      setMetaDescription(partner.metaDescription || '');

      setOrder(partner.order ?? 0);
      setStatus((partner.status as 'published' | 'draft') || 'published');
    } else {
      // New Partner Defaults
      setName('');
      setSlug('');
      setBadge('');
      setHeadline('');
      setDescription('');
      setBannerImage('/images/services/enterprise_tech.jpg');
      setBannerFallback('/images/services/enterprise_tech.jpg');
      setCtaText('Schedule demo');
      setCtaHref('/contact-us');

      setAdvantagesSubtitle('E-GEAD advantages');
      setAdvantagesHeadline('Official Technical Integration & Certified Enterprise Architecture.');
      setAdvantagesItems([
        {
          id: 'years',
          metric: '10+ years',
          description: 'of experience building custom programmatic integrations.',
          iconName: 'years',
        },
        {
          id: 'delivery',
          metric: '100% delivery',
          description: 'rate across mission-critical enterprise implementations.',
          iconName: 'delivery',
        },
        {
          id: 'engineers',
          metric: '50+ engineers',
          description: 'Certified consultants and solution architects.',
          iconName: 'engineers',
        },
        {
          id: 'support',
          metric: '24/7 support',
          description: 'Continuous proactive monitoring and dedicated SLA support.',
          iconName: 'support',
        },
      ]);

      setExpertiseSubtitle('Our expertise');
      setExpertiseHeadline('We are fluent in');
      setExpertiseItems([
        {
          id: 'capability-1',
          title: 'Custom Integration & Architecture.',
          paragraphs: [
            'Tailored programmatic connections engineered to meet unique operational demands.',
            'Zero data loss, high throughput, and guaranteed message delivery.',
          ],
          image: '/images/services/enterprise_tech.jpg',
          imageFallback: '/images/services/enterprise_tech.jpg',
          alt: 'Custom Integration',
        },
      ]);

      setWhyTitlePrefix('Why choose us');
      setWhyHeadline('Empowering enterprise agility and multi-market scale.');
      setWhyDescription('Organizations worldwide trust us to streamline core business operations.');
      setWhyItems([
        {
          id: 'streamline',
          title: 'Streamline operations and eliminate friction',
          content: 'Automate end-to-end workflows and eliminate manual redundancies.',
        },
      ]);

      setCasesSubtitle('Proven outcomes');
      setCasesHeadline('Read our cases');
      setCasesItems([]);

      setCtaHeadingPart1('Unleash your ');
      setCtaHighlight('growth potential');
      setCtaHeadingPart2(' now.');
      setCtaDescription('Connect with our certified solutions team to explore bespoke architectures.');
      setCtaButtonText("Let's talk");
      setCtaButtonHref('/contact-us');

      setMetaTitle('');
      setMetaDescription('');

      setOrder(0);
      setStatus('published');
    }
    setActiveTab('hero');
  }, [partner, isOpen]);

  // Auto-generate slug when name changes for new partners
  const handleNameChange = (val: string) => {
    setName(val);
    if (!partner) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const getFormDataAsObject = () => ({
    name,
    slug,
    badge: badge.trim() || null,
    headline: headline.trim() || null,
    description: description.trim() || null,
    bannerImage: bannerImage.trim() || null,
    bannerFallback: bannerFallback.trim() || null,
    ctaText: ctaText.trim() || 'Schedule demo',
    ctaHref: ctaHref.trim() || '/contact-us',
    advantagesSubtitle: advantagesSubtitle.trim() || 'E-GEAD advantages',
    advantagesHeadline: advantagesHeadline.trim() || null,
    advantagesItems,
    expertiseSubtitle: expertiseSubtitle.trim() || 'Our expertise',
    expertiseHeadline: expertiseHeadline.trim() || 'We are fluent in',
    expertiseItems,
    whyTitlePrefix: whyTitlePrefix.trim() || `Why ${name || 'Partner'}`,
    whyHeadline: whyHeadline.trim() || null,
    whyDescription: whyDescription.trim() || null,
    whyItems,
    casesSubtitle: casesSubtitle.trim() || 'Proven outcomes',
    casesHeadline: casesHeadline.trim() || 'Read our cases',
    casesItems,
    ctaHeadingPart1: ctaHeadingPart1.trim() || 'Unleash your ',
    ctaHighlight: ctaHighlight.trim() || 'growth potential',
    ctaHeadingPart2: ctaHeadingPart2.trim() || null,
    ctaDescription: ctaDescription.trim() || null,
    ctaButtonText: ctaButtonText.trim() || "Let's talk",
    ctaButtonHref: ctaButtonHref.trim() || '/contact-us',
    metaTitle: metaTitle.trim() || null,
    metaDescription: metaDescription.trim() || null,
    order: Number(order) || 0,
    status,
  });

  // Keep JSON view fresh when switching to JSON tab
  useEffect(() => {
    if (isOpen && activeTab === 'json') {
      const obj = getFormDataAsObject();
      setJsonText(JSON.stringify(obj, null, 2));
      setJsonError(null);
    }
  }, [activeTab, isOpen]);

  const handleSyncFromForm = () => {
    const obj = getFormDataAsObject();
    setJsonText(JSON.stringify(obj, null, 2));
    setJsonError(null);
    setJsonSuccessMsg('Đã làm mới mã JSON từ các trường trên Form!');
    setTimeout(() => setJsonSuccessMsg(null), 3000);
  };

  const handleApplyJsonToForm = () => {
    if (!jsonText.trim()) {
      setJsonError('Mã JSON trống, vui lòng nhập dữ liệu JSON.');
      return;
    }
    try {
      const parsed = JSON.parse(jsonText);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        setJsonError('Dữ liệu JSON phải là một đối tượng chứa các trường của đối tác.');
        return;
      }

      if (parsed.name) setName(parsed.name);
      if (parsed.slug) setSlug(parsed.slug);
      if (typeof parsed.badge !== 'undefined') setBadge(parsed.badge || '');
      if (typeof parsed.headline !== 'undefined') setHeadline(parsed.headline || '');
      if (typeof parsed.description !== 'undefined') setDescription(parsed.description || '');
      if (typeof parsed.bannerImage !== 'undefined') setBannerImage(parsed.bannerImage || '');
      if (typeof parsed.bannerFallback !== 'undefined') setBannerFallback(parsed.bannerFallback || '');
      if (typeof parsed.ctaText !== 'undefined') setCtaText(parsed.ctaText || 'Schedule demo');
      if (typeof parsed.ctaHref !== 'undefined') setCtaHref(parsed.ctaHref || '/contact-us');

      if (typeof parsed.advantagesSubtitle !== 'undefined') setAdvantagesSubtitle(parsed.advantagesSubtitle || 'E-GEAD advantages');
      if (typeof parsed.advantagesHeadline !== 'undefined') setAdvantagesHeadline(parsed.advantagesHeadline || '');
      if (Array.isArray(parsed.advantagesItems)) setAdvantagesItems(parsed.advantagesItems);
      else if (Array.isArray(parsed.advantages?.items)) setAdvantagesItems(parsed.advantages.items);

      if (typeof parsed.expertiseSubtitle !== 'undefined') setExpertiseSubtitle(parsed.expertiseSubtitle || 'Our expertise');
      if (typeof parsed.expertiseHeadline !== 'undefined') setExpertiseHeadline(parsed.expertiseHeadline || 'We are fluent in');
      if (Array.isArray(parsed.expertiseItems)) setExpertiseItems(parsed.expertiseItems);
      else if (Array.isArray(parsed.expertise?.items)) setExpertiseItems(parsed.expertise.items);

      if (typeof parsed.whyTitlePrefix !== 'undefined') setWhyTitlePrefix(parsed.whyTitlePrefix || '');
      if (typeof parsed.whyHeadline !== 'undefined') setWhyHeadline(parsed.whyHeadline || '');
      if (typeof parsed.whyDescription !== 'undefined') setWhyDescription(parsed.whyDescription || '');
      if (Array.isArray(parsed.whyItems)) setWhyItems(parsed.whyItems);
      else if (Array.isArray(parsed.why?.items)) setWhyItems(parsed.why.items);

      if (typeof parsed.casesSubtitle !== 'undefined') setCasesSubtitle(parsed.casesSubtitle || 'Proven outcomes');
      if (typeof parsed.casesHeadline !== 'undefined') setCasesHeadline(parsed.casesHeadline || 'Read our cases');
      if (Array.isArray(parsed.casesItems)) setCasesItems(parsed.casesItems);
      else if (Array.isArray(parsed.caseStudies?.items)) setCasesItems(parsed.caseStudies.items);

      if (typeof parsed.ctaHeadingPart1 !== 'undefined') setCtaHeadingPart1(parsed.ctaHeadingPart1 || '');
      if (typeof parsed.ctaHighlight !== 'undefined') setCtaHighlight(parsed.ctaHighlight || '');
      if (typeof parsed.ctaHeadingPart2 !== 'undefined') setCtaHeadingPart2(parsed.ctaHeadingPart2 || '');
      if (typeof parsed.ctaDescription !== 'undefined') setCtaDescription(parsed.ctaDescription || '');
      if (typeof parsed.ctaButtonText !== 'undefined') setCtaButtonText(parsed.ctaButtonText || "Let's talk");
      if (typeof parsed.ctaButtonHref !== 'undefined') setCtaButtonHref(parsed.ctaButtonHref || '/contact-us');

      if (typeof parsed.metaTitle !== 'undefined') setMetaTitle(parsed.metaTitle || '');
      if (typeof parsed.metaDescription !== 'undefined') setMetaDescription(parsed.metaDescription || '');

      if (typeof parsed.order !== 'undefined') setOrder(Number(parsed.order) || 0);
      if (parsed.status === 'published' || parsed.status === 'draft') setStatus(parsed.status);

      setJsonError(null);
      setJsonSuccessMsg('Đã nạp và áp dụng dữ liệu JSON vào tất cả các trường form thành công!');
      setTimeout(() => setJsonSuccessMsg(null), 3500);
    } catch (err: any) {
      setJsonError(`Cú pháp JSON chưa đúng: ${err.message || 'Lỗi cú pháp'}`);
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonText);
    setJsonSuccessMsg('Đã sao chép mã JSON vào clipboard!');
    setTimeout(() => setJsonSuccessMsg(null), 3000);
  };

  const handleDownloadSingleJson = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `doi_tac_${slug || 'partner'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await onSave({
      id: partner?.id,
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      badge: badge.trim() || null,
      headline: headline.trim() || null,
      description: description.trim() || null,
      bannerImage: bannerImage.trim() || null,
      bannerFallback: bannerFallback.trim() || null,
      ctaText: ctaText.trim() || 'Schedule demo',
      ctaHref: ctaHref.trim() || '/contact-us',

      advantagesSubtitle,
      advantagesHeadline: advantagesHeadline.trim() || null,
      advantagesItems,

      expertiseSubtitle,
      expertiseHeadline: expertiseHeadline.trim() || null,
      expertiseItems,

      whyTitlePrefix: whyTitlePrefix.trim() || null,
      whyHeadline: whyHeadline.trim() || null,
      whyDescription: whyDescription.trim() || null,
      whyItems,

      casesSubtitle,
      casesHeadline: casesHeadline.trim() || null,
      casesItems,

      ctaHeadingPart1,
      ctaHighlight,
      ctaHeadingPart2: ctaHeadingPart2.trim() || null,
      ctaDescription: ctaDescription.trim() || null,
      ctaButtonText,
      ctaButtonHref,

      metaTitle: metaTitle.trim() || null,
      metaDescription: metaDescription.trim() || null,

      order: Number(order) || 0,
      status,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/60 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-montserrat">
              {partner ? `Chỉnh sửa đối tác: ${partner.name}` : 'Thêm đối tác chiến lược mới'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Quản lý toàn bộ 6 sections và SEO của trang chi tiết đối tác
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-200 overflow-x-auto bg-slate-50/30 shrink-0">
          {[
            { key: 'hero', label: '1. Thông tin chính & Hero' },
            { key: 'advantages', label: '2. Lợi thế (Advantages)' },
            { key: 'expertise', label: '3. Năng lực (Expertise)' },
            { key: 'why', label: '4. Lý do chọn (Why)' },
            { key: 'cases', label: '5. Case Studies' },
            { key: 'cta', label: '6. CTA & SEO' },
            { key: 'json', label: '7. Dữ liệu JSON' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as TabKey)}
              className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${activeTab === tab.key
                  ? 'border-emerald-600 text-emerald-800 bg-white shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: HERO & GENERAL */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Tên đối tác"
                  isRequired
                  value={name}
                  onChange={(val) => handleNameChange(val)}
                  placeholder="ví dụ: Shopify Plus, SAP, Stripe"
                  width="100%"
                  className='h-10 border'
                />

                <TextInput
                  label="Slug đường dẫn"
                  isRequired
                  value={slug}
                  onChange={(val) => setSlug(val)}
                  placeholder="ví dụ: shopify-plus"
                  width="100%"
                  className='h-10 border'
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div className="sm:col-span-2">
                  <TextInput
                    label="Huy hiệu chứng nhận (Badge)"
                    value={badge}
                    onChange={(val) => setBadge(val)}
                    placeholder="ví dụ: Qualified SAP Gold Partner"
                    width="100%"
                    className='h-10 border'
                  />
                </div>

                <Selector
                  label="Trạng thái hiển thị"
                  className="h-10 border"
                  value={status}
                  onChange={(val) => setStatus(val as any)}
                  options={[
                    { value: 'published', label: 'Đang hiển thị' },
                    { value: 'draft', label: 'Bản nháp' },
                  ]}
                  width="100%"
                />
              </div>

              <TextInput
                label="Tiêu đề Hero Headline"
                value={headline}
                onChange={(val) => setHeadline(val)}
                placeholder="ví dụ: Unlock enterprise operational excellence."
                width="100%"
                className='h-10 border'
              />

              <TextArea
                label="Mô tả giới thiệu Hero"
                rows={3}
                value={description}
                onChange={(val) => setDescription(val)}
                placeholder="Mô tả tóm tắt giải pháp đối tác mang lại cho doanh nghiệp..."
                width="100%"
                className="border"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="URL hình ảnh Banner Hero"
                  value={bannerImage}
                  onChange={(val) => setBannerImage(val)}
                  placeholder="URL ảnh banner hero (không bị crop)"
                  width="100%"
                  className='h-10 border'
                />

                <TextInput
                  label="URL ảnh Fallback (khi banner lỗi)"
                  value={bannerFallback}
                  onChange={(val) => setBannerFallback(val)}
                  placeholder="URL logo fallback"
                  width="100%"
                  className='h-10 border'
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <TextInput
                  label="Chữ nút Hero CTA"
                  value={ctaText}
                  onChange={(val) => setCtaText(val)}
                  placeholder="Schedule demo"
                  width="100%"
                  className='h-10 border'
                />

                <TextInput
                  label="Đường dẫn nút Hero CTA"
                  value={ctaHref}
                  onChange={(val) => setCtaHref(val)}
                  placeholder="/contact-us?subject=demo"
                  width="100%"
                  className='h-10 border'
                />

                <TextInput
                  label="Thứ tự sắp xếp"
                  value={String(order ?? 0)}
                  onChange={(val) => setOrder(Number(val) || 0)}
                  width="100%"
                  className='h-10 border'
                />
              </div>
            </div>
          )}

          {/* TAB 2: ADVANTAGES */}
          {activeTab === 'advantages' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Phụ đề Section Lợi thế"
                  value={advantagesSubtitle}
                  onChange={(val) => setAdvantagesSubtitle(val)}
                  placeholder="E-GEAD advantages"
                  width="100%"
                  className='h-10 border'
                />
                <TextInput
                  label="Tiêu đề chính Section Lợi thế"
                  value={advantagesHeadline}
                  onChange={(val) => setAdvantagesHeadline(val)}
                  placeholder="Qualified SAP Gold Partner Specializing in..."
                  width="100%"
                  className='h-10 border'
                />
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-semibold text-slate-700">
                    Danh sách 4 chỉ số / lợi thế nổi bật ({advantagesItems.length})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setAdvantagesItems((prev) => [
                        ...prev,
                        {
                          id: `adv-${Date.now()}`,
                          metric: '10+ years',
                          description: 'Mô tả lợi thế...',
                          iconName: 'years',
                        },
                      ])
                    }
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm thẻ lợi thế</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {advantagesItems.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-600">Thẻ 0{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setAdvantagesItems((prev) => prev.filter((_, i) => i !== idx))
                          }
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <TextInput
                          label="Chỉ số"
                          isLabelHidden
                          value={item.metric}
                          onChange={(val) => {
                            setAdvantagesItems((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, metric: val } : it))
                            );
                          }}
                          placeholder="Chỉ số (ví dụ: 10+ years)"
                          width="100%"
                          className='h-10 border'
                        />
                        <Selector
                          label="Icon chỉ số"
                          isLabelHidden
                          className="h-10 border"
                          value={item.iconName || 'years'}
                          onChange={(val) => {
                            setAdvantagesItems((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, iconName: val } : it))
                            );
                          }}
                          options={[
                            { value: 'years', label: 'Icon Số năm (years)' },
                            { value: 'delivery', label: 'Icon Dự án thành công (delivery)' },
                            { value: 'engineers', label: 'Icon Chuyên gia/Kỹ sư (engineers)' },
                            { value: 'support', label: 'Icon Hỗ trợ 24/7 (support)' },
                          ]}
                          width="100%"
                        />
                        <TextInput
                          label="Mô tả chỉ số"
                          isLabelHidden
                          value={item.description}
                          onChange={(val) => {
                            setAdvantagesItems((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, description: val } : it))
                            );
                          }}
                          placeholder="Mô tả ngắn gọn chỉ số..."
                          width="100%"
                          className='h-10 border'
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXPERTISE */}
          {activeTab === 'expertise' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Phụ đề Năng lực kỹ thuật"
                  value={expertiseSubtitle}
                  onChange={(val) => setExpertiseSubtitle(val)}
                  placeholder="Our expertise"
                  width="100%"
                  className='h-10 border'
                />
                <TextInput
                  label="Tiêu đề chính Năng lực kỹ thuật"
                  value={expertiseHeadline}
                  onChange={(val) => setExpertiseHeadline(val)}
                  placeholder="We are fluent in"
                  width="100%"
                  className='h-10 border'
                />
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-semibold text-slate-700">
                    Danh sách các khối năng lực kỹ thuật ({expertiseItems.length})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setExpertiseItems((prev) => [
                        ...prev,
                        {
                          id: `exp-${Date.now()}`,
                          title: 'Tên năng lực kỹ thuật...',
                          paragraphs: ['Đoạn văn 1', 'Đoạn văn 2'],
                          image: '/images/services/enterprise_tech.jpg',
                          imageFallback: '/images/services/enterprise_tech.jpg',
                          alt: 'Minh họa năng lực',
                        },
                      ])
                    }
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm khối năng lực</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {expertiseItems.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">
                          Năng lực 0{idx + 1}: {item.title || '(Chưa đặt tiêu đề)'}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setExpertiseItems((prev) => prev.filter((_, i) => i !== idx))
                          }
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <TextInput
                          label="Tiêu đề khối năng lực"
                          isLabelHidden
                          value={item.title}
                          onChange={(val) => {
                            setExpertiseItems((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, title: val } : it))
                            );
                          }}
                          placeholder="Tiêu đề khối năng lực..."
                          width="100%"
                          className='h-10 border'
                        />
                        <TextInput
                          label="URL ảnh minh họa"
                          isLabelHidden
                          value={item.image}
                          onChange={(val) => {
                            setExpertiseItems((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, image: val } : it))
                            );
                          }}
                          placeholder="URL ảnh minh họa năng lực..."
                          width="100%"
                          className='h-10 border'
                        />
                      </div>

                      <TextArea
                        label="Nội dung chi tiết (Mỗi dòng một đoạn văn)"
                        rows={3}
                        value={Array.isArray(item.paragraphs) ? item.paragraphs.join('\n') : ''}
                        onChange={(val) => {
                          const lines = val.split('\n');
                          setExpertiseItems((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, paragraphs: lines } : it))
                          );
                        }}
                        placeholder="Nhập các đoạn văn mô tả..."
                        width="100%"
                        className="border"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WHY CHOOSE */}
          {activeTab === 'why' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <TextInput
                  label="Tiền tố tiêu đề"
                  value={whyTitlePrefix}
                  onChange={(val) => setWhyTitlePrefix(val)}
                  placeholder={`Why ${name}`}
                  width="100%"
                  className='h-10 border'
                />
                <div className="sm:col-span-2">
                  <TextInput
                    label="Tiêu đề chính Why"
                    value={whyHeadline}
                    onChange={(val) => setWhyHeadline(val)}
                    placeholder="Join +404,000 enterprise businesses who trust..."
                    width="100%"
                    className='h-10 border'
                  />
                </div>
              </div>

              <TextArea
                label="Mô tả tóm tắt"
                rows={2}
                value={whyDescription}
                onChange={(val) => setWhyDescription(val)}
                placeholder="Mô tả lý do doanh nghiệp lựa chọn đối tác này..."
                width="100%"
                className="border"
              />

              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-semibold text-slate-700">
                    Các trụ cột giá trị cốt lõi ({whyItems.length})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setWhyItems((prev) => [
                        ...prev,
                        {
                          id: `why-${Date.now()}`,
                          title: 'Trụ cột giá trị mới...',
                          content: 'Nội dung chi tiết...',
                        },
                      ])
                    }
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm trụ cột giá trị</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {whyItems.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Trụ cột 0{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => setWhyItems((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <TextInput
                        label="Tiêu đề trụ cột"
                        isLabelHidden
                        value={item.title}
                        onChange={(val) => {
                          setWhyItems((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, title: val } : it))
                          );
                        }}
                        placeholder="Tiêu đề trụ cột..."
                        width="100%"
                        className='h-10 border'
                      />
                      <TextArea
                        label="Nội dung giải thích chi tiết"
                        isLabelHidden
                        rows={2}
                        value={item.content}
                        onChange={(val) => {
                          setWhyItems((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, content: val } : it))
                          );
                        }}
                        placeholder="Nội dung giải thích chi tiết..."
                        width="100%"
                        className="border"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CASE STUDIES */}
          {activeTab === 'cases' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Phụ đề Case Studies"
                  value={casesSubtitle}
                  onChange={(val) => setCasesSubtitle(val)}
                  placeholder="Proven outcomes"
                  width="100%"
                  className='h-10 border'
                />
                <TextInput
                  label="Tiêu đề chính Case Studies"
                  value={casesHeadline}
                  onChange={(val) => setCasesHeadline(val)}
                  placeholder="Read our cases"
                  width="100%"
                  className='h-10 border'
                />
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-semibold text-slate-700">
                    Danh sách dự án tiêu biểu ({casesItems.length})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setCasesItems((prev) => [
                        ...prev,
                        {
                          id: `case-${Date.now()}`,
                          slug: 'lumina-home-shopify-google-shopping',
                          customer: 'Tên khách hàng...',
                          title: 'Tiêu đề case study...',
                          tags: ['Technology', 'E-Commerce'],
                          image: '/images/services/Top_Automotive.jpg',
                        },
                      ])
                    }
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Case Study</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {casesItems.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Dự án 0{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => setCasesItems((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <TextInput
                          label="Tiêu đề case study"
                          isLabelHidden
                          value={item.title}
                          onChange={(val) => {
                            setCasesItems((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, title: val } : it))
                            );
                          }}
                          placeholder="Tiêu đề case study..."
                          width="100%"
                          className='h-10 border'
                        />
                        <TextInput
                          label="Tên khách hàng"
                          isLabelHidden
                          value={item.customer}
                          onChange={(val) => {
                            setCasesItems((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, customer: val } : it))
                            );
                          }}
                          placeholder="Tên khách hàng / tổ chức..."
                          width="100%"
                          className='h-10 border'
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <TextInput
                          label="Slug bài viết"
                          isLabelHidden
                          value={item.slug}
                          onChange={(val) => {
                            setCasesItems((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, slug: val } : it))
                            );
                          }}
                          placeholder="Slug bài viết (ví dụ: lumina-home-shopify-google-shopping)"
                          width="100%"
                          className='h-10 border'
                        />
                        <TextInput
                          label="URL ảnh đại diện"
                          isLabelHidden
                          value={item.image}
                          onChange={(val) => {
                            setCasesItems((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, image: val } : it))
                            );
                          }}
                          placeholder="URL ảnh đại diện case study..."
                          width="100%"
                          className='h-10 border'
                        />
                      </div>

                      <TextInput
                        label="Tags phân loại"
                        isLabelHidden
                        value={Array.isArray(item.tags) ? item.tags.join(', ') : ''}
                        onChange={(val) => {
                          const tags = val.split(',').map((t) => t.trim()).filter(Boolean);
                          setCasesItems((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, tags } : it))
                          );
                        }}
                        placeholder="Tags phân loại (phân cách bằng dấu phẩy: Technology, Headless, Omnichannel)"
                        width="100%"
                        className='h-10 border'
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CTA & SEO */}
          {activeTab === 'cta' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <TextInput
                  label="CTA Tiêu đề phần 1"
                  value={ctaHeadingPart1}
                  onChange={(val) => setCtaHeadingPart1(val)}
                  placeholder="Unleash your "
                  width="100%"
                  className='h-10 border'
                />
                <TextInput
                  label="CTA Chữ nổi bật (Gradient)"
                  value={ctaHighlight}
                  onChange={(val) => setCtaHighlight(val)}
                  placeholder="growth potential"
                  width="100%"
                  className='h-10 border'
                />
                <TextInput
                  label="CTA Tiêu đề phần 2"
                  value={ctaHeadingPart2}
                  onChange={(val) => setCtaHeadingPart2(val)}
                  placeholder={` with ${name} now.`}
                  width="100%"
                  className='h-10 border'
                />
              </div>

              <TextArea
                label="Mô tả kêu gọi hành động (CTA)"
                rows={2}
                value={ctaDescription}
                onChange={(val) => setCtaDescription(val)}
                placeholder="Connect with our certified team to explore bespoke architectures..."
                width="100%"
                className="border"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Chữ trên nút CTA"
                  value={ctaButtonText}
                  onChange={(val) => setCtaButtonText(val)}
                  placeholder="Let's talk"
                  width="100%"
                  className='h-10 border'
                />
                <TextInput
                  label="Đường dẫn nút CTA"
                  value={ctaButtonHref}
                  onChange={(val) => setCtaButtonHref(val)}
                  placeholder="/contact-us?subject=partner-consultation"
                  width="100%"
                  className='h-10 border'
                />
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div className="text-xs font-bold text-slate-900">
                  Cấu hình SEO &amp; Thẻ Meta
                </div>

                <TextInput
                  label="SEO Meta Title"
                  value={metaTitle}
                  onChange={(val) => setMetaTitle(val)}
                  placeholder={`${name} Partner Solutions & Enterprise Commerce | E-GEAD`}
                  width="100%"
                  className='h-10 border'
                />

                <TextArea
                  label="SEO Meta Description"
                  rows={2}
                  value={metaDescription}
                  onChange={(val) => setMetaDescription(val)}
                  placeholder="Mô tả SEO xuất hiện trên Google Search..."
                  width="100%"
                  className="border"
                />
              </div>
            </div>
          )}

          {/* TAB 7: JSON RAW DATA */}
          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Trình xem và chỉnh sửa JSON thô
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Trực tiếp xem, chỉnh sửa hoặc dán toàn bộ cấu trúc dữ liệu của đối tác này
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    label="Sao chép JSON"
                    variant="secondary"
                    onClick={handleCopyJson}
                    className="px-3 h-8 text-xs font-semibold"
                  />
                  <Button
                    type="button"
                    label="Tải file JSON"
                    variant="secondary"
                    onClick={handleDownloadSingleJson}
                    className="px-3 h-8 text-xs font-semibold"
                  />
                  <Button
                    type="button"
                    label="Làm mới từ Form"
                    variant="ghost"
                    onClick={handleSyncFromForm}
                    className="px-3 h-8 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  />
                  <Button
                    type="button"
                    label="Áp dụng vào Form"
                    variant="primary"
                    onClick={handleApplyJsonToForm}
                    className="px-4 h-8 text-xs font-semibold"
                  />
                </div>
              </div>

              {jsonSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium animate-in fade-in duration-200">
                  {jsonSuccessMsg}
                </div>
              )}

              {jsonError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                  {jsonError}
                </div>
              )}

              <div className="space-y-1">
                <textarea
                  rows={18}
                  value={jsonText}
                  onChange={(e) => {
                    setJsonText(e.target.value);
                    setJsonError(null);
                  }}
                  placeholder="Dán hoặc chỉnh sửa mã JSON của đối tác tại đây..."
                  className="w-full font-mono text-xs p-4 rounded-xl border border-slate-200 bg-slate-900 text-emerald-400 focus:outline-hidden focus:border-emerald-500 transition-colors leading-relaxed"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Mẹo: Bấm "Áp dụng vào Form" sau khi sửa JSON để đồng bộ sang 6 tabs còn lại trước khi bấm Lưu.
                </p>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-2">
            <Button
              type="button"
              label="Hủy bỏ"
              variant="secondary"
              onClick={onClose}
              isDisabled={isSaving}
              className="px-4"
            />
            <Button
              type="submit"
              label={isSaving ? 'Đang lưu...' : partner ? 'Cập nhật đối tác' : 'Tạo đối tác mới'}
              variant="primary"
              isDisabled={isSaving}
              className="px-6"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
