import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { DEPARTMENTS, PEOPLE_STATUSES } from '@/lib/validations/people';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await requireAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Bạn không có quyền truy cập.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const rawItems = Array.isArray(body)
      ? body
      : Array.isArray(body.items)
      ? body.items
      : [body];
    const onDuplicate = body.onDuplicate || 'create'; // 'create' | 'update' | 'skip'

    if (!rawItems || rawItems.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dữ liệu JSON rỗng hoặc không chứa thông tin nhân sự hợp lệ.',
        },
        { status: 400 }
      );
    }

    // Get max order currently in database to append new items cleanly
    const maxOrderRecord = await prisma.teamMember.findFirst({
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

      const name = (raw.name || '').trim();
      if (!name) {
        errors.push(`Mục thứ ${i + 1} thiếu trường "name" (họ và tên).`);
        continue;
      }

      const role = (raw.role || 'Chuyên viên').trim();

      // Normalize department
      let department = raw.department;
      if (!DEPARTMENTS.includes(department)) {
        department = 'Commerce & Solutions';
      }

      const location = (raw.location || 'Vietnam / Global').trim();
      const quote = raw.quote ? String(raw.quote).trim() : null;
      const image = (raw.image || '/assets/team/alexandre.jpg').trim();
      const linkedin = raw.linkedin ? String(raw.linkedin).trim() : null;
      const bio = (
        raw.bio ||
        `${role} tại E-GEAD, phụ trách phát triển và vận hành các giải pháp chuyên sâu.`
      ).trim();

      const skills: string[] = Array.isArray(raw.skills)
        ? raw.skills.map((s: any) => String(s).trim()).filter(Boolean)
        : typeof raw.skills === 'string'
        ? raw.skills.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [];

      const isLeader = Boolean(raw.isLeader);

      let status = raw.status;
      if (!PEOPLE_STATUSES.includes(status)) {
        status = 'published';
      }

      currentMaxOrder += 1;
      const order = typeof raw.order === 'number' ? raw.order : currentMaxOrder;

      try {
        // Check if member exists by ID or by exact name
        let existing = null;
        if (raw.id) {
          existing = await prisma.teamMember.findUnique({
            where: { id: String(raw.id) },
          });
        }
        if (!existing) {
          existing = await prisma.teamMember.findFirst({
            where: { name: { equals: name, mode: 'insensitive' } },
          });
        }

        if (existing) {
          if (onDuplicate === 'skip') {
            continue;
          }

          if (onDuplicate === 'update') {
            const updated = await prisma.teamMember.update({
              where: { id: existing.id },
              data: {
                name,
                role,
                department,
                location,
                quote,
                image,
                linkedin,
                bio,
                skills,
                isLeader,
                order,
                status,
              },
            });
            importedItems.push(updated);
            continue;
          }
        }

        // Create new team member
        const created = await prisma.teamMember.create({
          data: {
            ...(raw.id ? { id: String(raw.id) } : {}),
            name,
            role,
            department,
            location,
            quote,
            image,
            linkedin,
            bio,
            skills,
            isLeader,
            order,
            status,
          },
        });
        importedItems.push(created);
      } catch (itemErr: any) {
        console.error(`Error importing person ${i + 1} (${name}):`, itemErr);
        errors.push(
          `Nhân sự "${name}": ${itemErr.message || 'Lỗi lưu vào cơ sở dữ liệu'}`
        );
      }
    }

    if (importedItems.length === 0 && errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Không thể import nhân sự: ${errors.join('; ')}`,
        },
        { status: 400 }
      );
    }

    try {
      revalidatePath('/admin/people');
      revalidatePath('/people');
    } catch {
      // Ignore in non-request test contexts
    }

    return NextResponse.json({
      success: true,
      count: importedItems.length,
      importedCount: importedItems.length,
      items: importedItems,
      message: `Đã thêm thành công ${importedItems.length} nhân sự vào hệ thống!`,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('API POST /api/admin/people/import error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Có lỗi xảy ra khi import file JSON',
      },
      { status: 500 }
    );
  }
}
