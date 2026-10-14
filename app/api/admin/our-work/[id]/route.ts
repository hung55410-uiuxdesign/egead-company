import { NextRequest, NextResponse } from 'next/server';
import {
  getCaseStudyById,
  updateCaseStudy,
  deleteCaseStudy,
} from '@/lib/services/casestudy.service';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const item = await getCaseStudyById(id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy Case Study' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      item,
    });
  } catch (error) {
    console.error('Error fetching case study:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể tải thông tin Case Study' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateCaseStudy(id, body);

    return NextResponse.json({
      success: true,
      item: updated,
    });
  } catch (error: any) {
    console.error('Error updating case study:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Đường dẫn slug này đã tồn tại, vui lòng chọn slug khác' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Không thể cập nhật Case Study' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    await deleteCaseStudy(id);

    return NextResponse.json({
      success: true,
      message: 'Đã xóa Case Study thành công',
    });
  } catch (error) {
    console.error('Error deleting case study:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể xóa Case Study' },
      { status: 500 }
    );
  }
}
