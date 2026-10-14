import { NextRequest, NextResponse } from 'next/server';
import {
  getServiceItemById,
  updateServiceItem,
  deleteServiceItem,
} from '@/lib/services/service-item.service';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const item = await getServiceItemById(id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy thông tin dịch vụ' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      item,
    });
  } catch (error) {
    console.error('Error fetching service item:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể tải thông tin dịch vụ' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateServiceItem(id, body);

    return NextResponse.json({
      success: true,
      item: updated,
    });
  } catch (error: any) {
    console.error('Error updating service item:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Đường dẫn slug này đã tồn tại, vui lòng chọn slug khác' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Không thể cập nhật dịch vụ' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    await deleteServiceItem(id);

    return NextResponse.json({
      success: true,
      message: 'Đã xóa dịch vụ thành công',
    });
  } catch (error) {
    console.error('Error deleting service item:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể xóa dịch vụ' },
      { status: 500 }
    );
  }
}
