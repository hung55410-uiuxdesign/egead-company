import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { bulkDeletePosts, bulkUpdatePosts } from '@/lib/services/blog.service';
import { PostStatus } from '@/types/blog';

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
      data?: { status?: PostStatus; category?: string };
    };

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng chọn ít nhất một bài viết' },
        { status: 400 }
      );
    }

    if (action === 'delete') {
      const count = await bulkDeletePosts(ids);
      return NextResponse.json({
        success: true,
        message: `Đã xóa thành công ${count} bài viết`,
        count,
      });
    }

    if (action === 'update') {
      if (!data || (!data.status && !data.category)) {
        return NextResponse.json(
          { success: false, error: 'Vui lòng chọn thông tin cần cập nhật (trạng thái hoặc chuyên mục)' },
          { status: 400 }
        );
      }

      const count = await bulkUpdatePosts(ids, data);
      return NextResponse.json({
        success: true,
        message: `Đã cập nhật thành công ${count} bài viết`,
        count,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Hành động không hợp lệ (hỗ trợ "delete" hoặc "update")' },
      { status: 400 }
    );
  } catch (error) {
    console.error('API POST /api/admin/blogs/bulk error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
