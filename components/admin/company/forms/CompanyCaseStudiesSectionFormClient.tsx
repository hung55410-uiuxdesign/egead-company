'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus } from 'lucide-react';
import { Button, Card, Badge, Switch, TextInput } from '@astryxdesign/core';
import type { CompanySectionModel, CompanyCaseStudiesData, CompanyCaseStudiesLogo } from '@/lib/services/company-section.service';
import { useUploadMedia, useUpdateCompanySectionMutation } from '@/lib/hooks';

interface CompanyCaseStudiesSectionFormClientProps {
  section: CompanySectionModel;
}

export default function CompanyCaseStudiesSectionFormClient({
  section,
}: CompanyCaseStudiesSectionFormClientProps) {
  const router = useRouter();

  const [isActive, setIsActive] = useState<boolean>(section.isActive ?? true);
  const rawData: CompanyCaseStudiesData = section.data || {};

  // Row 1: Clients
  const [clientsSubtitle, setClientsSubtitle] = useState(rawData.clientsSubtitle || 'Clients');
  const [clientsTitle, setClientsTitle] = useState(
    rawData.clientsTitle || 'We work with established global enterprises and ambitious brands.'
  );
  const [clients, setClients] = useState<CompanyCaseStudiesLogo[]>(
    rawData.clients && rawData.clients.length > 0
      ? rawData.clients
      : [
          { name: 'HRS', src: '/assets/logo_hrs.svg' },
          { name: 'Kashiwagi', src: '/assets/logo_kashiwagi.svg' },
          { name: 'Suntory', src: '/assets/logo_suntory.svg' },
          { name: 'Manulife', src: '/assets/logo_manulife.svg' },
          { name: 'Jim Thompson', src: '/assets/logo_jimthompson.svg' },
          { name: 'TCI', src: '/assets/logo_tci.svg' },
          { name: 'Toyota', src: '/assets/logo_toyota.svg' },
          { name: 'Brother', src: '/assets/logo_brother.svg' },
          { name: 'Beauty Garage', src: '/assets/logo_beautygarage.svg' },
          { name: 'Weir', src: '/assets/logo_weir.svg' },
          { name: 'Saitex', src: '/assets/logo_saitex.svg' },
          { name: 'Dinner Ladies', src: '/assets/logo_dinnerladies.svg' },
          { name: 'Edwin', src: '/assets/logo_edwin.svg' },
          { name: 'Beisia', src: '/assets/logo_beisia.svg' },
        ]
  );

  // Row 2: Services
  const [servicesSubtitle, setServicesSubtitle] = useState(rawData.servicesSubtitle || 'Services');
  const [servicesTitle, setServicesTitle] = useState(
    rawData.servicesTitle || 'We are partnering with leading tech providers.'
  );
  const [servicePartners, setServicePartners] = useState<CompanyCaseStudiesLogo[]>(
    rawData.servicePartners && rawData.servicePartners.length > 0
      ? rawData.servicePartners
      : [
          { name: 'SAP Silver', src: '/assets/logo_sapsilver.svg' },
          { name: 'Klaviyo', src: '/assets/logo_klaviyo.svg' },
          { name: 'Emarsys', src: '/assets/logo_emarsys.svg' },
          { name: 'Sitecore', src: '/assets/logo_Sitecore.png' },
          { name: 'Stripe', src: '/assets/logo_stripe.svg' },
          { name: 'Qualtrics', src: '/assets/logo_qualtrics.svg' },
          { name: 'Magento', src: '/assets/logo_magento.svg' },
          { name: 'Shopify', src: '/assets/logo_shopify.svg' },
          { name: 'Salesforce', src: '/assets/logo_salesforce.svg' },
          { name: 'CommerceTools', src: '/assets/logo_commercetools.svg' },
        ]
  );

  const [activeTab, setActiveTab] = useState<'clients' | 'services'>('clients');
  const [uploadTarget, setUploadTarget] = useState<{ list: 'clients' | 'services'; index: number } | null>(null);

  const updateMutation = useUpdateCompanySectionMutation({
    redirectTo: '/admin/company',
  });
  const isSaving = updateMutation.isPending;

  const { uploadFile, isUploading } = useUploadMedia({
    defaultFolder: 'egead_cms/company/logos',
    successMessage: 'Tải logo thành công!',
    onSuccess: (data) => {
      if (uploadTarget) {
        if (uploadTarget.list === 'clients') {
          setClients((prev) =>
            prev.map((c, i) => (i === uploadTarget.index ? { ...c, src: data.url } : c))
          );
        } else {
          setServicePartners((prev) =>
            prev.map((s, i) => (i === uploadTarget.index ? { ...s, src: data.url } : s))
          );
        }
      }
      setUploadTarget(null);
    },
    onError: (err) => {
      alert(`Tải logo thất bại: ${err.message}`);
      setUploadTarget(null);
    },
  });

  const handleAddClient = () => {
    setClients((prev) => [...prev, { name: 'Khách hàng mới', src: '' }]);
  };

  const handleAddService = () => {
    setServicePartners((prev) => [...prev, { name: 'Đối tác mới', src: '' }]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await updateMutation.mutateAsync({
        key: section.key,
        title: clientsTitle.trim(),
        subtitle: `${clientsSubtitle} & ${servicesSubtitle}`,
        description: section.description,
        isActive,
        data: {
          clientsSubtitle: clientsSubtitle.trim(),
          clientsTitle: clientsTitle.trim(),
          clients: clients.filter((c) => c.name.trim() || c.src.trim()),
          servicesSubtitle: servicesSubtitle.trim(),
          servicesTitle: servicesTitle.trim(),
          servicePartners: servicePartners.filter((s) => s.name.trim() || s.src.trim()),
        },
      });
    } catch (err: any) {
      alert(`Lưu thất bại: ${err?.message || 'Có lỗi xảy ra'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full pb-12">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            label="Quay lại"
            variant="secondary"
            href="/admin/company"
            className="px-3 h-9 text-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{section.name}</h1>
              <Badge
                label={isActive ? 'Đang kích hoạt' : 'Tạm ẩn'}
                variant={isActive ? 'success' : 'neutral'}
                className="h-7 px-3 text-xs"
              />
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Cấu hình 2 hàng marquee logo: Khách hàng (Clients) và Đối tác công nghệ (Services)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            label="Xem trang Live"
            variant="secondary"
            href="/company"
            target="_blank"
            className="px-4 h-10"
          />
          <Button
            type="submit"
            label={isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
            variant="primary"
            className="px-6 h-10"
            isDisabled={isSaving || isUploading}
          />
        </div>
      </div>

      {/* Visibility Status Card */}
      <Card variant="default" className="rounded-2xl p-5 bg-white border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Trạng thái hiển thị trên website</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Khi tạm ẩn, khối này sẽ hoàn toàn không xuất hiện trên trang Company của người dùng
          </p>
        </div>
        <div className="flex items-center">
          <Switch
            label={isActive ? 'Hiển thị trên website' : 'Tạm ẩn khỏi website'}
            value={isActive}
            onChange={(checked) => setIsActive(checked)}
            size="md"
          />
        </div>
      </Card>

      {/* Row Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('clients')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'clients' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Hàng 1: Khách hàng ({clients.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'services' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Hàng 2: Đối tác công nghệ ({servicePartners.length})
        </button>
      </div>

      {/* Tab 1: Clients */}
      {activeTab === 'clients' && (
        <div className="space-y-6">
          <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Tiêu đề hàng 1 (Khách hàng)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <TextInput
                label="Nhãn phụ (Subtitle)"
                value={clientsSubtitle}
                onChange={(val) => setClientsSubtitle(val)}
                placeholder="Clients"
                width="100%"
                className="border h-10"
              />

              <div className="sm:col-span-2">
                <TextInput
                  label="Tiêu đề chính (Title)"
                  value={clientsTitle}
                  onChange={(val) => setClientsTitle(val)}
                  placeholder="We work with established global enterprises and ambitious brands."
                  width="100%"
                  className="border h-10"
                />
              </div>
            </div>
          </Card>

          {/* Client Logos Grid */}
          <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Danh sách logo khách hàng</h3>
                <p className="text-xs text-slate-500 mt-0.5">Logo sẽ chạy marquee tự động ở hàng trên</p>
              </div>
              <Button
                type="button"
                label="Thêm logo khách hàng"
                variant="secondary"
                onClick={handleAddClient}
                className="px-3 h-8 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients.map((client, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 relative group hover:border-slate-400 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-12 rounded-lg bg-slate-900 flex items-center justify-center p-1.5 shrink-0 border border-slate-800">
                    {client.src ? (
                      <img src={client.src} alt={client.name} className="max-w-full max-h-full object-contain brightness-0 invert" />
                    ) : (
                      <span className="text-[10px] text-slate-500">Chưa có</span>
                    )}
                  </div>

                  {/* Form */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <input
                      type="text"
                      value={client.name}
                      onChange={(e) =>
                        setClients((prev) =>
                          prev.map((c, i) => (i === idx ? { ...c, name: e.target.value } : c))
                        )
                      }
                      placeholder="Tên khách hàng"
                      className="w-full px-2.5 py-1 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none"
                    />
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={client.src}
                        onChange={(e) =>
                          setClients((prev) =>
                            prev.map((c, i) => (i === idx ? { ...c, src: e.target.value } : c))
                          )
                        }
                        placeholder="/assets/logo_..."
                        className="flex-1 min-w-0 px-2 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-600 focus:outline-none"
                      />
                      <label className="cursor-pointer shrink-0">
                        <input
                          type="file"
                          accept="image/*,.svg"
                          className="hidden"
                          disabled={isUploading}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setUploadTarget({ list: 'clients', index: idx });
                              await uploadFile(file);
                              e.target.value = '';
                            }
                          }}
                        />
                        <span className="inline-flex items-center px-2 py-1 rounded border border-slate-300 bg-white hover:bg-slate-100 text-[10px] font-medium text-slate-700">
                          {isUploading && uploadTarget?.list === 'clients' && uploadTarget?.index === idx ? '...' : 'Tải ảnh'}
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setClients((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-slate-200"
                        title="Xóa logo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: Services / Tech Partners */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Tiêu đề hàng 2 (Đối tác công nghệ)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <TextInput
                label="Nhãn phụ (Subtitle)"
                value={servicesSubtitle}
                onChange={(val) => setServicesSubtitle(val)}
                placeholder="Services"
                width="100%"
                className="border h-10"
              />

              <div className="sm:col-span-2">
                <TextInput
                  label="Tiêu đề chính (Title)"
                  value={servicesTitle}
                  onChange={(val) => setServicesTitle(val)}
                  placeholder="We are partnering with leading tech providers."
                  width="100%"
                  className="border h-10"
                />
              </div>
            </div>
          </Card>

          {/* Service Logos Grid */}
          <Card variant="default" className="rounded-2xl p-6 bg-white border border-slate-200/90 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Danh sách logo đối tác</h3>
                <p className="text-xs text-slate-500 mt-0.5">Logo sẽ chạy marquee tự động ở hàng dưới (chiều ngược lại)</p>
              </div>
              <Button
                type="button"
                label="Thêm logo đối tác"
                variant="secondary"
                onClick={handleAddService}
                className="px-3 h-8 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicePartners.map((partner, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 relative group hover:border-slate-400 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-12 rounded-lg bg-slate-900 flex items-center justify-center p-1.5 shrink-0 border border-slate-800">
                    {partner.src ? (
                      <img src={partner.src} alt={partner.name} className="max-w-full max-h-full object-contain brightness-0 invert" />
                    ) : (
                      <span className="text-[10px] text-slate-500">Chưa có</span>
                    )}
                  </div>

                  {/* Form */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <input
                      type="text"
                      value={partner.name}
                      onChange={(e) =>
                        setServicePartners((prev) =>
                          prev.map((s, i) => (i === idx ? { ...s, name: e.target.value } : s))
                        )
                      }
                      placeholder="Tên đối tác"
                      className="w-full px-2.5 py-1 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none"
                    />
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={partner.src}
                        onChange={(e) =>
                          setServicePartners((prev) =>
                            prev.map((s, i) => (i === idx ? { ...s, src: e.target.value } : s))
                          )
                        }
                        placeholder="/assets/logo_..."
                        className="flex-1 min-w-0 px-2 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-600 focus:outline-none"
                      />
                      <label className="cursor-pointer shrink-0">
                        <input
                          type="file"
                          accept="image/*,.svg"
                          className="hidden"
                          disabled={isUploading}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setUploadTarget({ list: 'services', index: idx });
                              await uploadFile(file);
                              e.target.value = '';
                            }
                          }}
                        />
                        <span className="inline-flex items-center px-2 py-1 rounded border border-slate-300 bg-white hover:bg-slate-100 text-[10px] font-medium text-slate-700">
                          {isUploading && uploadTarget?.list === 'services' && uploadTarget?.index === idx ? '...' : 'Tải ảnh'}
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setServicePartners((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-slate-200"
                        title="Xóa logo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </form>
  );
}
