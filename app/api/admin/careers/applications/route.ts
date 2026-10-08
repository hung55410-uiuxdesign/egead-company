import { NextRequest, NextResponse } from 'next/server';
import { getAllApplications, submitApplication } from '@/lib/careers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId') || undefined;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    const applications = await getAllApplications({ jobId, status, search });
    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.fullName || !body.email || !body.phone || !body.cvUrl) {
      return NextResponse.json(
        {
          success: false,
          error: 'Vui lòng điền đầy đủ các thông tin bắt buộc: Họ tên, Email, Số điện thoại và Link CV.',
        },
        { status: 400 }
      );
    }

    const application = await submitApplication(body);
    return NextResponse.json(
      {
        success: true,
        message: 'Hồ sơ ứng tuyển đã được gửi thành công!',
        data: application,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
