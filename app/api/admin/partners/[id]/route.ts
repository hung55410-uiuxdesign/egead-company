import { NextRequest, NextResponse } from 'next/server';
import {
  getPartnerItemById,
  updatePartnerItem,
  deletePartnerItem,
} from '@/lib/services/partner-item.service';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const item = await getPartnerItemById(id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy thông tin đối tác' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      item,
    });
  } catch (error) {
    console.error('[API /api/admin/partners/[id]] Error fetching partner:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể tải thông tin đối tác' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updatePartnerItem(id, body);

    return NextResponse.json({
      success: true,
      item: updated,
    });
  } catch (error: any) {
    console.error('[API /api/admin/partners/[id]] Error updating partner:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Đường dẫn slug này đã tồn tại, vui lòng chọn slug khác' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Không thể cập nhật đối tác' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    await deletePartnerItem(id);

    return NextResponse.json({
      success: true,
      message: 'Đã xóa đối tác thành công',
    });
  } catch (error: any) {
    console.error('[API /api/admin/partners/[id]] Error deleting partner:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Không thể xóa đối tác' },
      { status: 500 }
    );
  }
}
