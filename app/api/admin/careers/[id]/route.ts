import { NextRequest, NextResponse } from 'next/server';
import { getJobById, saveJob, deleteJob } from '@/lib/careers';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = await getJobById(id);

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy tin tuyển dụng' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await getJobById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy tin tuyển dụng để cập nhật' },
        { status: 404 }
      );
    }

    const updated = await saveJob({ ...body, id });
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
    const deleted = await deleteJob(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy tin tuyển dụng để xoá' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Đã xoá tin tuyển dụng thành công' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
