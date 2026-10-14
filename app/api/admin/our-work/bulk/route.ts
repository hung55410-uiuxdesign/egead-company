import { NextRequest, NextResponse } from 'next/server';
import {
  bulkDeleteCaseStudies,
  bulkUpdateCaseStudies,
} from '@/lib/services/casestudy.service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ids, data } = body as {
      action: 'delete' | 'update';
      ids: string[];
      data?: {
        status?: 'published' | 'draft';
        service?: string;
        industry?: string;
        serviceAction?: 'add' | 'replace';
        industryAction?: 'add' | 'replace';
      };
    };

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng chọn ít nhất một dự án' },
        { status: 400 }
      );
    }

    if (action === 'delete') {
      const count = await bulkDeleteCaseStudies(ids);
      return NextResponse.json({
        success: true,
        message: `Đã xóa thành công ${count} dự án`,
        count,
      });
    }

    if (action === 'update') {
      if (!data || (!data.status && !data.service && !data.industry)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Vui lòng chọn ít nhất một trường cần cập nhật (trạng thái, dịch vụ, hoặc ngành nghề)',
          },
          { status: 400 }
        );
      }

      const count = await bulkUpdateCaseStudies(ids, data);
      return NextResponse.json({
        success: true,
        message: `Đã cập nhật thành công ${count} dự án`,
        count,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Hành động không hợp lệ (hỗ trợ "delete" hoặc "update")' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('API POST /api/admin/our-work/bulk error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Có lỗi xảy ra khi thực hiện thao tác hàng loạt' },
      { status: 500 }
    );
  }
}
