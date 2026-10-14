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
async function getUniqueSlug(baseSlug: string, currentId?: string): Promise<string> {
  let slug = baseSlug || 'service';
  let counter = 1;

  while (true) {
    const existing = await prisma.serviceItem.findUnique({
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
    const rawItems = Array.isArray(body) ? body : Array.isArray(body.items) ? body.items : [body];
    const onDuplicate = body.onDuplicate || 'rename'; // 'rename' | 'update'

    if (!rawItems || rawItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Dữ liệu JSON rỗng hoặc không có dịch vụ hợp lệ để import.' },
        { status: 400 }
      );
    }

    // Get max order currently in database to append new items cleanly
    const maxOrderRecord = await prisma.serviceItem.findFirst({
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

      const title = (raw.title || '').trim();
      if (!title) {
        errors.push(`Mục thứ ${i + 1} thiếu trường "title" (tên dịch vụ / ngành nghề).`);
        continue;
      }

      const baseSlug = (raw.slug ? slugify(raw.slug) : slugify(title)) || 'service';
      const category = raw.category === 'industry' ? 'industry' : 'service';
      const status = raw.status === 'draft' ? 'draft' : 'published';

      const tagline = (raw.tagline || raw.subtitle || title).trim();
      const subtitle = (raw.subtitle || raw.tagline || title).trim();
      const heroImage = raw.heroImage || raw.image || null;
      const middleImage = raw.middleImage || null;

      const overviewSubTitle = raw.overviewSubTitle || raw.overviewSubtitle || 'TỔNG QUAN';
      const overviewHeading = raw.overviewHeading || raw.overviewTitle || title;
      const overviewParagraphs: string[] = Array.isArray(raw.overviewParagraphs)
        ? raw.overviewParagraphs
        : typeof raw.overviewParagraphs === 'string'
        ? [raw.overviewParagraphs]
        : raw.description
        ? [raw.description]
        : [];

      const approachHeading = raw.approachHeading || 'Phương pháp tiếp cận của chúng tôi';
      const approachIntro = raw.approachIntro || null;
      const principles = Array.isArray(raw.principles)
        ? raw.principles.map((p: any) => ({
            title: p.title || '',
            description: p.description || '',
          }))
        : [];

      currentMaxOrder += 1;
      const order = typeof raw.order === 'number' ? raw.order : currentMaxOrder;

      try {
        const existingBySlug = await prisma.serviceItem.findUnique({
          where: { slug: baseSlug },
        });

        if (existingBySlug && onDuplicate === 'update') {
          // Update existing service item
          const updated = await prisma.serviceItem.update({
            where: { id: existingBySlug.id },
            data: {
              title,
              category,
              tagline,
              subtitle,
              heroImage: heroImage ?? existingBySlug.heroImage,
              middleImage: middleImage ?? existingBySlug.middleImage,
              overviewSubTitle,
              overviewHeading,
              overviewParagraphs,
              approachHeading,
              approachIntro,
              principles: principles as unknown as Prisma.InputJsonValue,
              order,
              status,
            },
          });
          importedItems.push(updated);
        } else {
          // Create new record with unique slug
          const finalSlug = await getUniqueSlug(baseSlug);
          const created = await prisma.serviceItem.create({
            data: {
              slug: finalSlug,
              title,
              category,
              tagline,
              subtitle,
              heroImage,
              middleImage,
              overviewSubTitle,
              overviewHeading,
              overviewParagraphs,
              approachHeading,
              approachIntro,
              principles: principles as unknown as Prisma.InputJsonValue,
              order,
              status,
            },
          });
          importedItems.push(created);
        }
      } catch (itemErr: any) {
        console.error(`Error importing item ${i + 1} (${title}):`, itemErr);
        errors.push(`Mục "${title}": ${itemErr.message || 'Lỗi lưu vào cơ sở dữ liệu'}`);
      }
    }

    if (importedItems.length === 0 && errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Không thể import dịch vụ: ${errors.join('; ')}`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      count: importedItems.length,
      items: importedItems,
      message: `Đã thêm thành công ${importedItems.length} dịch vụ & ngành nghề vào hệ thống!`,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('API POST /api/admin/services/import error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Có lỗi xảy ra khi import file JSON',
      },
      { status: 500 }
    );
  }
}
