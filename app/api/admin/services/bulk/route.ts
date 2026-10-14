import { NextRequest, NextResponse } from 'next/server';
import {
  bulkDeleteServiceItems,
  bulkUpdateServiceItems,
} from '@/lib/services/service-item.service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ids, data } = body as {
      action: 'delete' | 'update';
      ids: string[];
      data?: {
        status?: 'published' | 'draft';
        category?: 'service' | 'industry';
      };
    };

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng chọn ít nhất một dịch vụ hoặc ngành nghề' },
        { status: 400 }
      );
    }

    if (action === 'delete') {
      const count = await bulkDeleteServiceItems(ids);
      return NextResponse.json({
        success: true,
        message: `Đã xóa thành công ${count} mục`,
        count,
      });
    }

    if (action === 'update') {
      if (!data || (!data.status && !data.category)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Vui lòng chọn trạng thái hoặc phân loại để cập nhật',
          },
          { status: 400 }
        );
      }

      const count = await bulkUpdateServiceItems(ids, data);
      return NextResponse.json({
        success: true,
        message: `Đã cập nhật thành công ${count} mục`,
        count,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Hành động không hợp lệ (hỗ trợ "delete" hoặc "update")' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('API POST /api/admin/services/bulk error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Có lỗi xảy ra khi thực hiện thao tác hàng loạt' },
      { status: 500 }
    );
  }
}
