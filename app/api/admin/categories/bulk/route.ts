import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { bulkDeleteCategories, bulkUpdateCategories } from '@/lib/services/category.service';

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
    const { action, ids, data } = body as {
      action: 'delete' | 'update';
      ids: string[];
      data?: { description?: string; icon?: string | null };
    };

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng chọn ít nhất một chuyên mục' },
        { status: 400 }
      );
    }

    if (action === 'delete') {
      const count = await bulkDeleteCategories(ids);
      return NextResponse.json({
        success: true,
        message: `Đã xóa thành công ${count} chuyên mục`,
        count,
      });
    }

    if (action === 'update') {
      if (!data || (data.description === undefined && data.icon === undefined)) {
        return NextResponse.json(
          { success: false, error: 'Vui lòng nhập thông tin cần cập nhật (mô tả hoặc biểu tượng)' },
          { status: 400 }
        );
      }

      const count = await bulkUpdateCategories(ids, data);
      return NextResponse.json({
        success: true,
        message: `Đã cập nhật thành công ${count} chuyên mục`,
        count,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Hành động không hợp lệ (hỗ trợ "delete" hoặc "update")' },
      { status: 400 }
    );
  } catch (error) {
    console.error('API POST /api/admin/categories/bulk error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
