import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import {
  getCategoriesWithCount,
  createCategory,
  seedCategoriesFromPosts,
} from '@/lib/services/category.service';
import { categorySchema } from '@/lib/validations/category';

export async function GET() {
  try {
    const data = await getCategoriesWithCount();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API GET /api/admin/categories error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

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

    // Check if this is a sync/seed request
    if (body.action === 'sync') {
      const data = await seedCategoriesFromPosts();
      return NextResponse.json({
        success: true,
        message: 'Đồng bộ chuyên mục từ bài viết thành công',
        data,
      });
    }

    const parsed = categorySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dữ liệu không hợp lệ',
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const category = await createCategory(parsed.data);

    return NextResponse.json(
      {
        success: true,
        message: 'Tạo chuyên mục mới thành công',
        data: category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API POST /api/admin/categories error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
