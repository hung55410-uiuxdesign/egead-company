import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { bulkDeleteTeamMembers, bulkUpdateTeamMembers } from '@/lib/services/people.service';

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
      data?: { status?: 'published' | 'draft' | 'archived'; department?: string };
    };

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng chọn ít nhất một nhân sự' },
        { status: 400 }
      );
    }

    if (action === 'delete') {
      const count = await bulkDeleteTeamMembers(ids);
      return NextResponse.json({
        success: true,
        message: `Đã xóa thành công ${count} nhân sự`,
        count,
      });
    }

    if (action === 'update') {
      if (!data || (!data.status && !data.department)) {
        return NextResponse.json(
          { success: false, error: 'Vui lòng chọn thông tin cần cập nhật (trạng thái hoặc phòng ban)' },
          { status: 400 }
        );
      }

      const count = await bulkUpdateTeamMembers(ids, data);
      return NextResponse.json({
        success: true,
        message: `Đã cập nhật thành công ${count} nhân sự`,
        count,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Hành động không hợp lệ (hỗ trợ "delete" hoặc "update")' },
      { status: 400 }
    );
  } catch (error) {
    console.error('API POST /api/admin/people/bulk error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
