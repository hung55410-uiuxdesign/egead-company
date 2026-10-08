import { NextRequest, NextResponse } from 'next/server';
import {
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from '@/lib/careers';
import { ApplicationStatus } from '@/types/career';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const application = await getApplicationById(id);

    if (!application) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy hồ sơ ứng tuyển' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.status) {
      return NextResponse.json(
        { success: false, error: 'Trạng thái hồ sơ không hợp lệ' },
        { status: 400 }
      );
    }

    const updated = await updateApplicationStatus(
      id,
      body.status as ApplicationStatus,
      body.notes
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteApplication(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy hồ sơ để xoá' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Đã xoá hồ sơ ứng tuyển thành công',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
