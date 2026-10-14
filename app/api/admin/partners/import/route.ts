import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Generate unique slug if collision occurs
 */
async function getUniquePartnerSlug(baseSlug: string, currentId?: string): Promise<string> {
  let slug = baseSlug || 'partner';
  let counter = 1;

  while (true) {
    const existing = await prisma.partnerItem.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || existing.id === currentId) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawItems = Array.isArray(body)
      ? body
      : Array.isArray(body.items)
      ? body.items
      : [body];
    const onDuplicate = body.onDuplicate || 'rename'; // 'rename' | 'update'

    if (!rawItems || rawItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Dữ liệu JSON rỗng hoặc không có đối tác hợp lệ để import.' },
        { status: 400 }
      );
    }

    // Get max order currently in database to append new items cleanly
    const maxOrderRecord = await prisma.partnerItem.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    let currentMaxOrder = maxOrderRecord?.order ?? 0;

    const importedItems: any[] = [];
    const errors: string[] = [];

    for (let i = 0; i < rawItems.length; i++) {
      const raw = rawItems[i];

      if (!raw || typeof raw !== 'object') {
        errors.push(`Mục thứ ${i + 1} không phải là đối tượng JSON hợp lệ.`);
        continue;
      }

      const name = (raw.name || raw.title || '').trim();
      if (!name) {
        errors.push(`Mục thứ ${i + 1} thiếu trường "name" (tên đối tác chiến lược).`);
        continue;
      }

      const baseSlug = (raw.slug ? slugify(raw.slug) : slugify(name)) || 'partner';
      const status = raw.status === 'draft' ? 'draft' : 'published';

      const badge = raw.badge || raw.hero?.badge || null;
      const headline = raw.headline || raw.hero?.headline || null;
      const description = raw.description || raw.hero?.description || null;
      const bannerImage = raw.bannerImage || raw.hero?.bannerImage || null;
      const bannerFallback = raw.bannerFallback || raw.hero?.bannerFallback || null;
      const ctaText = raw.ctaText || raw.hero?.ctaText || 'Schedule demo';
      const ctaHref = raw.ctaHref || raw.hero?.ctaHref || '/contact-us';

      const advantagesSubtitle =
        raw.advantagesSubtitle || raw.advantages?.subtitle || 'E-GEAD advantages';
      const advantagesHeadline =
        raw.advantagesHeadline || raw.advantages?.headline || null;
      const advantagesItems = Array.isArray(raw.advantagesItems)
        ? raw.advantagesItems
        : Array.isArray(raw.advantages?.items)
        ? raw.advantages.items
        : [];

      const expertiseSubtitle =
        raw.expertiseSubtitle || raw.expertise?.subtitle || 'Our expertise';
      const expertiseHeadline =
        raw.expertiseHeadline || raw.expertise?.headline || 'We are fluent in';
      const expertiseItems = Array.isArray(raw.expertiseItems)
        ? raw.expertiseItems
        : Array.isArray(raw.expertise?.items)
        ? raw.expertise.items
        : [];

      const whyTitlePrefix =
        raw.whyTitlePrefix || raw.why?.titlePrefix || `Why ${name}`;
      const whyHeadline = raw.whyHeadline || raw.why?.headline || null;
      const whyDescription = raw.whyDescription || raw.why?.description || null;
      const whyItems = Array.isArray(raw.whyItems)
        ? raw.whyItems
        : Array.isArray(raw.why?.items)
        ? raw.why.items
        : [];

      const casesSubtitle =
        raw.casesSubtitle || raw.caseStudies?.subtitle || raw.cases?.subtitle || 'Proven outcomes';
      const casesHeadline =
        raw.casesHeadline || raw.caseStudies?.headline || raw.cases?.headline || 'Read our cases';
      const casesItems = Array.isArray(raw.casesItems)
        ? raw.casesItems
        : Array.isArray(raw.caseStudies?.items)
        ? raw.caseStudies.items
        : Array.isArray(raw.cases?.items)
        ? raw.cases.items
        : [];

      const ctaHeadingPart1 =
        raw.ctaHeadingPart1 || raw.cta?.headingPart1 || 'Unleash your ';
      const ctaHighlight =
        raw.ctaHighlight || raw.cta?.headingHighlight || 'growth potential';
      const ctaHeadingPart2 =
        raw.ctaHeadingPart2 || raw.cta?.headingPart2 || ` with ${name} now.`;
      const ctaDescription =
        raw.ctaDescription || raw.cta?.description || null;
      const ctaButtonText =
        raw.ctaButtonText || raw.cta?.buttonText || "Let's talk";
      const ctaButtonHref =
        raw.ctaButtonHref || raw.cta?.buttonHref || '/contact-us';

      const metaTitle =
        raw.metaTitle || `${name} Partner Solutions & Enterprise Commerce | E-GEAD`;
      const metaDescription =
        raw.metaDescription || description || null;

      currentMaxOrder += 1;
      const order = typeof raw.order === 'number' ? raw.order : currentMaxOrder;

      try {
        const existingBySlug = await prisma.partnerItem.findUnique({
          where: { slug: baseSlug },
        });

        if (existingBySlug && onDuplicate === 'update') {
          // Update existing partner record
          const updated = await prisma.partnerItem.update({
            where: { id: existingBySlug.id },
            data: {
              name,
              badge,
              headline,
              description,
              bannerImage: bannerImage ?? existingBySlug.bannerImage,
              bannerFallback: bannerFallback ?? existingBySlug.bannerFallback,
              ctaText,
              ctaHref,
              advantagesSubtitle,
              advantagesHeadline,
              advantagesItems: advantagesItems as unknown as Prisma.InputJsonValue,
              expertiseSubtitle,
              expertiseHeadline,
              expertiseItems: expertiseItems as unknown as Prisma.InputJsonValue,
              whyTitlePrefix,
              whyHeadline,
              whyDescription,
              whyItems: whyItems as unknown as Prisma.InputJsonValue,
              casesSubtitle,
              casesHeadline,
              casesItems: casesItems as unknown as Prisma.InputJsonValue,
              ctaHeadingPart1,
              ctaHighlight,
              ctaHeadingPart2,
              ctaDescription,
              ctaButtonText,
              ctaButtonHref,
              metaTitle,
              metaDescription,
              order,
              status,
            },
          });
          importedItems.push(updated);
        } else {
          // Create new record with unique slug
          const finalSlug = await getUniquePartnerSlug(baseSlug);
          const created = await prisma.partnerItem.create({
            data: {
              slug: finalSlug,
              name,
              badge,
              headline,
              description,
              bannerImage,
              bannerFallback,
              ctaText,
              ctaHref,
              advantagesSubtitle,
              advantagesHeadline,
              advantagesItems: advantagesItems as unknown as Prisma.InputJsonValue,
              expertiseSubtitle,
              expertiseHeadline,
              expertiseItems: expertiseItems as unknown as Prisma.InputJsonValue,
              whyTitlePrefix,
              whyHeadline,
              whyDescription,
              whyItems: whyItems as unknown as Prisma.InputJsonValue,
              casesSubtitle,
              casesHeadline,
              casesItems: casesItems as unknown as Prisma.InputJsonValue,
              ctaHeadingPart1,
              ctaHighlight,
              ctaHeadingPart2,
              ctaDescription,
              ctaButtonText,
              ctaButtonHref,
              metaTitle,
              metaDescription,
              order,
              status,
            },
          });
          importedItems.push(created);
        }
      } catch (itemErr: any) {
        console.error(`Error importing partner ${i + 1} (${name}):`, itemErr);
        errors.push(`Mục "${name}": ${itemErr.message || 'Lỗi lưu vào cơ sở dữ liệu'}`);
      }
    }

    if (importedItems.length === 0 && errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Không thể import đối tác: ${errors.join('; ')}`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Đã import thành công ${importedItems.length} đối tác!`,
      count: importedItems.length,
      items: importedItems,
      warnings: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('[API /api/admin/partners/import] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Không thể xử lý dữ liệu import JSON.',
      },
      { status: 500 }
    );
  }
}
