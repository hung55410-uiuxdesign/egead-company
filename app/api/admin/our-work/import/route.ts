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
  let slug = baseSlug || 'case-study';
  let counter = 1;

  while (true) {
    const existing = await prisma.caseStudy.findUnique({
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
        { success: false, error: 'Dữ liệu JSON rỗng hoặc không có dự án hợp lệ để import.' },
        { status: 400 }
      );
    }

    // Get max order currently in database to append new items cleanly
    const maxOrderRecord = await prisma.caseStudy.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    let currentMaxOrder = maxOrderRecord?.order ?? 0;

    const importedItems: any[] = [];
    const errors: string[] = [];

    for (let i = 0; i < rawItems.length; i++) {
      const item = rawItems[i];
      const itemIndex = i + 1;

      // Validation
      if (!item || typeof item !== 'object') {
        errors.push(`Mục thứ ${itemIndex}: Dữ liệu không phải là object hợp lệ.`);
        continue;
      }

      const title = item.title?.trim();
      const customer = item.customer?.trim();

      if (!title || !customer) {
        errors.push(`Mục thứ ${itemIndex}: Thiếu "title" (tiêu đề) hoặc "customer" (khách hàng).`);
        continue;
      }

      try {
        const baseSlug = slugify(item.slug?.trim() || title);
        let finalSlug = baseSlug;

        const existingRecord = await prisma.caseStudy.findUnique({
          where: { slug: baseSlug },
        });

        if (existingRecord && onDuplicate === 'update') {
          // Update existing
          const updated = await prisma.caseStudy.update({
            where: { id: existingRecord.id },
            data: {
              title,
              customer,
              description: item.description?.trim() || existingRecord.description,
              image: item.image?.trim() || existingRecord.image,
              services: Array.isArray(item.services) ? item.services : existingRecord.services,
              industries: Array.isArray(item.industries) ? item.industries : existingRecord.industries,
              tags: Array.isArray(item.tags) ? item.tags : existingRecord.tags,
              highlight: item.highlight !== undefined ? item.highlight : existingRecord.highlight,
              status: item.status || existingRecord.status,
              order: typeof item.order === 'number' ? item.order : existingRecord.order,

              // Detail page fields
              bannerImage: item.bannerImage !== undefined ? item.bannerImage : existingRecord.bannerImage,
              bannerVideo: item.bannerVideo !== undefined ? item.bannerVideo : existingRecord.bannerVideo,
              overviewSubtitle: item.overviewSubtitle !== undefined ? item.overviewSubtitle : existingRecord.overviewSubtitle,
              overviewTitle: item.overviewTitle !== undefined ? item.overviewTitle : existingRecord.overviewTitle,
              overviewDescription: item.overviewDescription !== undefined ? item.overviewDescription : existingRecord.overviewDescription,
              overviewImage: item.overviewImage !== undefined ? item.overviewImage : existingRecord.overviewImage,
              challengeTitle: item.challengeTitle !== undefined ? item.challengeTitle : existingRecord.challengeTitle,
              challengeContent: item.challengeContent !== undefined ? item.challengeContent : existingRecord.challengeContent,
              solutionTitle: item.solutionTitle !== undefined ? item.solutionTitle : existingRecord.solutionTitle,
              solutionContent: item.solutionContent !== undefined ? item.solutionContent : existingRecord.solutionContent,
              taskSubtitle: item.taskSubtitle !== undefined ? item.taskSubtitle : existingRecord.taskSubtitle,
              taskTitle: item.taskTitle !== undefined ? item.taskTitle : existingRecord.taskTitle,
              taskImages: Array.isArray(item.taskImages) ? item.taskImages : existingRecord.taskImages,
              taskItems: item.taskItems !== undefined ? item.taskItems : (existingRecord.taskItems as Prisma.InputJsonValue),
              nextStudySlug: item.nextStudySlug !== undefined ? item.nextStudySlug : existingRecord.nextStudySlug,
              nextStudyTitle: item.nextStudyTitle !== undefined ? item.nextStudyTitle : existingRecord.nextStudyTitle,
              nextStudyCustomer: item.nextStudyCustomer !== undefined ? item.nextStudyCustomer : existingRecord.nextStudyCustomer,
            },
          });
          importedItems.push(updated);
        } else {
          // Create new record with unique slug
          finalSlug = await getUniqueSlug(baseSlug);
          currentMaxOrder++;

          const created = await prisma.caseStudy.create({
            data: {
              slug: finalSlug,
              title,
              customer,
              description: item.description?.trim() || `Tổng quan dự án ${title} cho ${customer}.`,
              image: item.image?.trim() || '/assets/case_suntory.jpg',
              services: Array.isArray(item.services) && item.services.length > 0 ? item.services : ['Technology'],
              industries: Array.isArray(item.industries) && item.industries.length > 0 ? item.industries : ['Consumer Goods'],
              tags: Array.isArray(item.tags) ? item.tags : ['CASE STUDY'],
              highlight: item.highlight?.trim() || null,
              order: typeof item.order === 'number' ? item.order : currentMaxOrder,
              status: item.status === 'draft' ? 'draft' : 'published',

              // Detail page fields
              bannerImage: item.bannerImage?.trim() || item.image?.trim() || '/assets/case_suntory.jpg',
              bannerVideo: item.bannerVideo?.trim() || null,
              overviewSubtitle: item.overviewSubtitle?.trim() || 'OVERVIEW',
              overviewTitle: item.overviewTitle?.trim() || title,
              overviewDescription: item.overviewDescription?.trim() || item.description?.trim() || null,
              overviewImage: item.overviewImage?.trim() || null,
              challengeTitle: item.challengeTitle?.trim() || null,
              challengeContent: item.challengeContent?.trim() || null,
              solutionTitle: item.solutionTitle?.trim() || null,
              solutionContent: item.solutionContent?.trim() || null,
              taskSubtitle: item.taskSubtitle?.trim() || 'TASK',
              taskTitle: item.taskTitle?.trim() || null,
              taskImages: Array.isArray(item.taskImages) ? item.taskImages : [],
              taskItems: item.taskItems && Array.isArray(item.taskItems) ? item.taskItems : [],
              nextStudySlug: item.nextStudySlug?.trim() || null,
              nextStudyTitle: item.nextStudyTitle?.trim() || null,
              nextStudyCustomer: item.nextStudyCustomer?.trim() || null,
            },
          });
          importedItems.push(created);
        }
      } catch (itemErr: any) {
        console.error(`Error importing item ${itemIndex}:`, itemErr);
        errors.push(`Mục thứ ${itemIndex} ("${title}"): ${itemErr.message || 'Lỗi lưu database'}`);
      }
    }

    if (importedItems.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Không thể import dự án nào. Vui lòng kiểm tra lại cấu trúc file JSON.',
          errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      count: importedItems.length,
      items: importedItems,
      errors: errors.length > 0 ? errors : undefined,
      message: `Đã thêm thành công ${importedItems.length} dự án vào hệ thống!`,
    });
  } catch (error: any) {
    console.error('Import case studies error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Đã có lỗi xảy ra khi xử lý import file JSON.',
      },
      { status: 500 }
    );
  }
}
