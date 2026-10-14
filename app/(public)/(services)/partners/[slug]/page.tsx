import React from 'react';
import type { Metadata } from 'next';
import { PartnerDetailView, getPartnerDetailData } from '@/components/pages/services/partners';
import {
  getPartnerItemBySlug,
  mapDbPartnerToPartnerDetailData,
} from '@/lib/services/partner-item.service';
import type { PartnerDetailData } from '@/components/pages/services/partners/sap/types';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getMergedPartnerItem(slug: string): Promise<PartnerDetailData> {
  const normalizedSlug = slug.trim().toLowerCase();
  try {
    const dbItem =
      (await getPartnerItemBySlug(normalizedSlug)) ||
      (normalizedSlug === 'site-core' ? await getPartnerItemBySlug('sitecore') : null);

    if (dbItem) {
      return mapDbPartnerToPartnerDetailData(dbItem);
    }
  } catch (error) {
    console.error('[partners/[slug]] Error fetching partner from DB, using fallback:', error);
  }

  return getPartnerDetailData(normalizedSlug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const partnerData = await getMergedPartnerItem(slug);

    return {
      title: partnerData?.metaTitle ?? `${partnerData?.name || 'Partner'} Solutions | E-GEAD`,
      description: partnerData?.metaDescription ?? partnerData?.hero?.description,
      openGraph: {
        title: partnerData?.metaTitle ?? `${partnerData?.name || 'Partner'} Solutions | E-GEAD`,
        description: partnerData?.metaDescription ?? partnerData?.hero?.description,
        images: partnerData?.hero?.bannerImage
          ? [
              {
                url: partnerData.hero.bannerImage,
                width: 1200,
                height: 630,
                alt: partnerData.hero.bannerAlt ?? `${partnerData.name} Partner - E-GEAD`,
              },
            ]
          : [],
      },
    };
  } catch (err) {
    console.error('[generateMetadata error]:', err);
    return { title: 'Partner Solutions | E-GEAD' };
  }
}

export default async function PartnerDetailPage({ params }: Props) {
  try {
    const { slug } = await params;
    const partnerData = await getMergedPartnerItem(slug);

    return <PartnerDetailView data={partnerData} />;
  } catch (err: any) {
    console.error('[PartnerDetailPage error]:', err);
    return (
      <div className="min-h-screen bg-[#0A0D0E] text-white p-10 flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Lỗi hiển thị đối tác</h1>
        <p className="text-red-400 mt-2">{err?.message || String(err)}</p>
      </div>
    );
  }
}
