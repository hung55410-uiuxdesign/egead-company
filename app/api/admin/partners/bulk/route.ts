import { NextRequest, NextResponse } from 'next/server';
import {
  bulkDeletePartnerItems,
  bulkUpdatePartnerItems,
} from '@/lib/services/partner-item.service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ids, data } = body as {
      action: 'delete' | 'update';
      ids: string[];
      data?: {
        status?: 'published' | 'draft';
        badge?: string;
      };
    };

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng chọn ít nhất một đối tác chiến lược' },
        { status: 400 }
      );
    }

    if (action === 'delete') {
      const count = await bulkDeletePartnerItems(ids);
      return NextResponse.json({
        success: true,
        message: `Đã xóa thành công ${count} đối tác`,
        count,
      });
    }

    if (action === 'update') {
      if (!data || (!data.status && typeof data.badge === 'undefined')) {
        return NextResponse.json(
          {
            success: false,
            error: 'Vui lòng chọn trạng thái hoặc thông tin cần cập nhật',
          },
          { status: 400 }
        );
      }

      const count = await bulkUpdatePartnerItems(ids, data);
      return NextResponse.json({
        success: true,
        message: `Đã cập nhật thành công ${count} đối tác`,
        count,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Hành động không hợp lệ (hỗ trợ "delete" hoặc "update")' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('[API /api/admin/partners/bulk] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Không thể thực hiện thao tác hàng loạt trên đối tác',
      },
      { status: 500 }
    );
  }
}
